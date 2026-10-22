use async_trait::async_trait;
use serde::{Deserialize, Serialize};
use serde_json::json;
use thiserror::Error;
use url::Url;

const GQL_URL: &str = "https://gql.twitch.tv/gql";

// Public web client ID used by yt-dlp.
const TWITCH_CLIENT_ID: &str = "ue6666qo983tsx6so1t0vnawi233wa";

const SHARE_CLIP_RENDER_STATUS_HASH: &str =
    "2db6a3b20eabf510bd3cf465ae2408834b59eb6b8af89ca73ab1486cacecfb63";

#[derive(Debug, Error)]
pub enum TwitchClipError {
    #[error("request failed: {0}")]
    Request(#[from] reqwest::Error),

    #[error("invalid Twitch clip URL")]
    InvalidUrl,

    #[error("clip slug not found")]
    MissingSlug,

    #[error("clip is unavailable")]
    Unavailable,

    #[error("invalid response: {0}")]
    Response(String),
}

#[derive(Debug, Serialize)]
pub struct TwitchClipInfo {
    pub id: String,
    pub slug: String,
    pub title: Option<String>,
    pub duration: Option<f64>,
    pub view_count: Option<u64>,
    pub created_at: Option<String>,
    pub thumbnail_url: Option<String>,
    pub broadcaster: Option<String>,
    pub broadcaster_id: Option<String>,
    pub curator: Option<String>,
    pub curator_id: Option<String>,
    pub game: Option<String>,
    pub formats: Vec<TwitchClipFormat>,
}

#[derive(Debug, Serialize)]
pub struct TwitchClipFormat {
    pub format_id: String,
    pub url: String,
    pub height: Option<u32>,
    pub fps: Option<f64>,
    pub aspect_ratio: Option<f64>,
}

#[derive(Debug, Deserialize)]
struct GraphQlResponse {
    data: Option<GraphQlData>,
}

#[derive(Debug, Deserialize)]
struct GraphQlData {
    clip: Option<Clip>,
}

#[derive(Debug, Deserialize)]
struct Clip {
    id: Option<String>,
    title: Option<String>,
    #[serde(rename = "durationSeconds")]
    duration_seconds: Option<f64>,
    #[serde(rename = "viewCount")]
    view_count: Option<u64>,
    #[serde(rename = "createdAt")]
    created_at: Option<String>,
    #[serde(rename = "thumbnailURL")]
    thumbnail_url: Option<String>,

    broadcaster: Option<Channel>,
    curator: Option<Channel>,
    game: Option<Game>,

    #[serde(rename = "playbackAccessToken")]
    playback_access_token: PlaybackToken,

    assets: Vec<Asset>,
}

#[derive(Debug, Clone, Deserialize)]
struct PlaybackToken {
    value: String,
    signature: String,
}

#[derive(Debug, Deserialize)]
struct Channel {
    id: Option<String>,

    #[serde(rename = "displayName")]
    display_name: Option<String>,
}

#[derive(Debug, Deserialize)]
struct Game {
    #[serde(rename = "displayName")]
    display_name: Option<String>,
}

#[derive(Debug, Deserialize)]
struct Asset {
    #[serde(rename = "aspectRatio")]
    aspect_ratio: Option<f64>,

    #[serde(rename = "videoQualities")]
    video_qualities: Vec<VideoQuality>,
}

#[derive(Debug, Deserialize)]
struct VideoQuality {
    #[serde(rename = "sourceURL")]
    source_url: String,

    quality: Option<String>,

    #[serde(rename = "frameRate")]
    frame_rate: Option<f64>,
}

#[async_trait]
pub trait TwitchClipExtractor {
    fn reqwest_client(&self) -> &reqwest::Client;

    async fn get_twitch_clip_info(
        &self,
        input_url: &str,
    ) -> Result<TwitchClipInfo, TwitchClipError> {
        let slug = Self::extract_slug(input_url)?;

        let request = json!({
            "operationName": "ShareClipRenderStatus",
            "variables": {
                "slug": slug
            },
            "extensions": {
                "persistedQuery": {
                    "version": 1,
                    "sha256Hash": SHARE_CLIP_RENDER_STATUS_HASH
                }
            }
        });

        let response = self
            .reqwest_client()
            .post(GQL_URL)
            .header("Client-ID", TWITCH_CLIENT_ID)
            .header("Content-Type", "text/plain;charset=UTF-8")
            .json(&request)
            .send()
            .await?
            .error_for_status()?
            .json::<GraphQlResponse>()
            .await?;

        let clip = response
            .data
            .and_then(|data| data.clip)
            .ok_or(TwitchClipError::Unavailable)?;

        let token = clip.playback_access_token;

        let formats = clip
            .assets
            .iter()
            .enumerate()
            .flat_map(|(asset_index, asset)| {
                let token_clone = token.clone();
                asset.video_qualities.iter().filter_map(move |quality| {
                    let mut video_url = Url::parse(&quality.source_url).ok()?;

                    video_url
                        .query_pairs_mut()
                        .append_pair("sig", &token_clone.signature)
                        .append_pair("token", &token_clone.value);

                    Some(TwitchClipFormat {
                        format_id: format!(
                            "{}-{}",
                            asset_index,
                            quality.quality.as_deref().unwrap_or("unknown")
                        ),
                        url: video_url.to_string(),
                        height: quality.quality.as_deref().and_then(|v| v.parse().ok()),
                        fps: quality.frame_rate,
                        aspect_ratio: asset.aspect_ratio,
                    })
                })
            })
            .collect();

        Ok(TwitchClipInfo {
            id: clip.id.unwrap_or_else(|| slug.clone()),
            slug,
            title: clip.title,
            duration: clip.duration_seconds,
            view_count: clip.view_count,
            created_at: clip.created_at,
            thumbnail_url: clip.thumbnail_url,

            broadcaster: clip
                .broadcaster
                .as_ref()
                .and_then(|v| v.display_name.clone()),

            broadcaster_id: clip.broadcaster.as_ref().and_then(|v| v.id.clone()),

            curator: clip.curator.as_ref().and_then(|v| v.display_name.clone()),

            curator_id: clip.curator.as_ref().and_then(|v| v.id.clone()),

            game: clip.game.and_then(|v| v.display_name),
            formats,
        })
    }

    fn extract_slug(input: &str) -> Result<String, TwitchClipError> {
        let url = Url::parse(input).map_err(|_| TwitchClipError::InvalidUrl)?;

        let host = url
            .host_str()
            .ok_or(TwitchClipError::InvalidUrl)?
            .to_ascii_lowercase();

        let segments: Vec<_> = url
            .path_segments()
            .ok_or(TwitchClipError::InvalidUrl)?
            .collect();

        // https://clips.twitch.tv/ClipSlug
        if host == "clips.twitch.tv" {
            return segments
                .first()
                .filter(|slug| !slug.is_empty())
                .map(|slug| (*slug).to_owned())
                .ok_or(TwitchClipError::MissingSlug);
        }

        // https://clips.twitch.tv/embed?clip=ClipSlug
        if host == "clips.twitch.tv" {
            if let Some((_, slug)) = url.query_pairs().find(|(key, _)| key == "clip") {
                return Ok(slug.into_owned());
            }
        }

        // https://www.twitch.tv/channel/clip/ClipSlug
        segments
            .windows(2)
            .find(|parts| parts[0].eq_ignore_ascii_case("clip"))
            .map(|parts| parts[1].to_owned())
            .filter(|slug| !slug.is_empty())
            .ok_or(TwitchClipError::MissingSlug)
    }
}
