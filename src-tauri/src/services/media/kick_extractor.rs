use async_trait::async_trait;
use serde::Deserialize;
use thiserror::Error;
use url::Url;

const KICK_API: &str = "https://kick.com/api/v2";

#[derive(Debug, Error)]
pub enum KickClipError {
    #[error("request failed: {0}")]
    Request(#[from] reqwest::Error),

    #[error("invalid Kick clip URL")]
    InvalidUrl,

    #[error("clip id was not found")]
    MissingClipId,

    #[error("clip is unavailable")]
    Unavailable,
}

#[derive(Debug, Deserialize)]
struct KickClipResponse {
    clip: KickClip,
}

#[derive(Debug, Deserialize)]
struct KickClip {
    id: Option<String>,
    clip_url: String,
    title: Option<String>,

    channel: Option<KickChannel>,
    creator: Option<KickCreator>,
    category: Option<KickCategory>,

    thumbnail_url: Option<String>,
    duration: Option<f64>,
    created_at: Option<String>,
    views: Option<u64>,
    likes: Option<u64>,
    is_mature: Option<bool>,
}

#[derive(Debug, Deserialize)]
struct KickChannel {
    id: Option<u64>,
    slug: Option<String>,
}

#[derive(Debug, Deserialize)]
struct KickCreator {
    id: Option<u64>,
    username: Option<String>,
}

#[derive(Debug, Deserialize)]
struct KickCategory {
    name: Option<String>,
}

#[derive(Debug)]
#[allow(dead_code)]
pub struct KickClipInfo {
    pub id: String,
    pub title: Option<String>,
    pub clip_url: String,
    pub thumbnail_url: Option<String>,
    pub duration: Option<f64>,
    pub created_at: Option<String>,
    pub view_count: Option<u64>,
    pub like_count: Option<u64>,
    pub channel: Option<String>,
    pub channel_id: Option<String>,
    pub uploader: Option<String>,
    pub uploader_id: Option<String>,
    pub category: Option<String>,
    pub age_limit: Option<u8>,
}

#[async_trait]
pub trait KickClipExtractor {
    fn reqwest_client(&self) -> &reqwest::Client;

    async fn get_kick_clip_info(&self, input_url: &str) -> Result<KickClipInfo, KickClipError> {
        let clip_id = Self::extract_clip_id(input_url)?;

        let response = self
            .reqwest_client()
            .get(format!("{KICK_API}/clips/{clip_id}/play"))
            .header(
                "User-Agent",
                "Mozilla/5.0 (X11; Linux x86_64) \
                 AppleWebKit/537.36 Chrome/131.0 Safari/537.36",
            )
            .header("Accept", "application/json")
            .send()
            .await?
            .error_for_status()?
            .json::<KickClipResponse>()
            .await?;

        let clip = response.clip;

        Ok(KickClipInfo {
            id: clip.id.unwrap_or(clip_id),
            title: clip.title,
            clip_url: clip.clip_url,
            thumbnail_url: clip.thumbnail_url,
            duration: clip.duration,
            created_at: clip.created_at,
            view_count: clip.views,
            like_count: clip.likes,

            channel: clip.channel.as_ref().and_then(|v| v.slug.clone()),
            channel_id: clip
                .channel
                .as_ref()
                .and_then(|v| v.id.map(|id| id.to_string())),

            uploader: clip.creator.as_ref().and_then(|v| v.username.clone()),
            uploader_id: clip
                .creator
                .as_ref()
                .and_then(|v| v.id.map(|id| id.to_string())),

            category: clip.category.and_then(|v| v.name),

            age_limit: clip.is_mature.map(|mature| if mature { 18 } else { 0 }),
        })
    }

    fn extract_clip_id(input: &str) -> Result<String, KickClipError> {
        let url = Url::parse(input).map_err(|_| KickClipError::InvalidUrl)?;

        let segments: Vec<_> = url
            .path_segments()
            .ok_or(KickClipError::InvalidUrl)?
            .collect();

        // https://kick.com/channel/clips/clip_01ABC...
        if let Some(index) = segments.iter().position(|v| *v == "clips") {
            if let Some(id) = segments.get(index + 1) {
                if id.starts_with("clip_") {
                    return Ok((*id).to_owned());
                }
            }
        }

        // https://kick.com/channel?clip=clip_01ABC...
        if let Some((_, id)) = url
            .query_pairs()
            .find(|(key, value)| key == "clip" && value.starts_with("clip_"))
        {
            return Ok(id.into_owned());
        }

        Err(KickClipError::MissingClipId)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    struct TestExtractor;

    impl KickClipExtractor for TestExtractor {
        fn reqwest_client(&self) -> &reqwest::Client {
            unreachable!("URL parsing does not use an HTTP client")
        }
    }

    fn extract_clip_id(input: &str) -> Result<String, KickClipError> {
        <TestExtractor as KickClipExtractor>::extract_clip_id(input)
    }

    #[test]
    fn extracts_clip_id_from_channel_clip_url() {
        assert_eq!(
            extract_clip_id("https://kick.com/channel/clips/clip_01ABC").unwrap(),
            "clip_01ABC"
        );
    }

    #[test]
    fn extracts_clip_id_after_additional_path_segments() {
        assert_eq!(
            extract_clip_id("https://kick.com/channel/featured/clips/clip_01ABC").unwrap(),
            "clip_01ABC"
        );
    }

    #[test]
    fn prefers_path_clip_id_over_query_parameter() {
        assert_eq!(
            extract_clip_id("https://kick.com/channel/clips/clip_path?clip=clip_query").unwrap(),
            "clip_path"
        );
    }

    #[test]
    fn extracts_clip_id_from_query_parameter() {
        assert_eq!(
            extract_clip_id("https://kick.com/channel?clip=clip_01ABC").unwrap(),
            "clip_01ABC"
        );
    }

    #[test]
    fn skips_unrelated_query_parameters() {
        assert_eq!(
            extract_clip_id("https://kick.com/channel?ref=clip_other&clip=clip_01ABC").unwrap(),
            "clip_01ABC"
        );
    }

    #[test]
    fn rejects_query_parameter_without_clip_prefix() {
        assert!(matches!(
            extract_clip_id("https://kick.com/channel?clip=01ABC"),
            Err(KickClipError::MissingClipId)
        ));
    }

    #[test]
    fn decodes_clip_id_in_query_parameter() {
        assert_eq!(
            extract_clip_id("https://kick.com/channel?clip=clip_01ABC%2FDEF").unwrap(),
            "clip_01ABC/DEF"
        );
    }

    #[test]
    fn rejects_invalid_url() {
        assert!(matches!(
            extract_clip_id("not a URL"),
            Err(KickClipError::InvalidUrl)
        ));
    }

    #[test]
    fn rejects_url_without_clip_id() {
        assert!(matches!(
            extract_clip_id("https://kick.com/channel/clips/not-a-clip"),
            Err(KickClipError::MissingClipId)
        ));
    }
}
