use async_trait::async_trait;
use http::{
    HeaderMap, HeaderValue,
    header::{ACCEPT, ACCEPT_LANGUAGE, USER_AGENT},
};
use scraper::{Html, Selector};
use serde::Serialize;
use serde_json::Value;
use thiserror::Error;
use url::Url;

#[allow(dead_code)]
#[derive(Debug, Error)]
pub enum TikTokError {
    #[error("HTTP request failed: {0}")]
    Http(#[from] reqwest::Error),

    #[error("invalid TikTok URL")]
    InvalidUrl,

    #[error("TikTok video id was not found")]
    MissingVideoId,

    #[error("TikTok metadata script was not found")]
    MissingMetadata,

    #[error("invalid TikTok JSON: {0}")]
    Json(#[from] serde_json::Error),

    #[error("video metadata is unavailable")]
    MissingVideoData,
}

#[derive(Debug, Serialize)]
pub struct TikTokInfo {
    pub id: String,
    pub url: String,
    pub title: Option<String>,
    pub description: Option<String>,
    pub uploader: Option<String>,
    pub uploader_id: Option<String>,
    pub channel: Option<String>,
    pub timestamp: Option<i64>,
    pub duration: Option<f64>,
    pub view_count: Option<i64>,
    pub like_count: Option<i64>,
    pub comment_count: Option<i64>,
    pub share_count: Option<i64>,
    pub collect_count: Option<i64>,
    pub track: Option<String>,
    pub artist: Option<String>,
    pub thumbnails: Vec<String>,
    pub formats: Vec<VideoFormat>,
}

#[derive(Debug, Serialize)]
pub struct VideoFormat {
    pub id: String,
    pub url: String,
    pub width: Option<i64>,
    pub height: Option<i64>,
    pub mime_type: String,
    pub has_watermark: bool,
}

#[async_trait]
pub trait TikTokExtractor {
    fn reqwest_client(&self) -> &reqwest::Client;

    async fn get_tiktok_info(&self, input_url: &str) -> Result<TikTokInfo, TikTokError> {
        let response = self
            .reqwest_client()
            .get(input_url)
            .headers(Self::default_headers())
            .send()
            .await?
            .error_for_status()?;

        let final_url = response.url().clone();
        let html = response.text().await?;

        let video_id = Self::extract_video_id(&final_url)
            .or_else(|| Self::extract_video_id_from_text(input_url))
            .ok_or(TikTokError::MissingVideoId)?;

        let data = Self::extract_script_json(&html, "__UNIVERSAL_DATA_FOR_REHYDRATION__")?;

        let item = data
            .get("__DEFAULT_SCOPE__")
            .and_then(|v| v.get("webapp.video-detail"))
            .and_then(|v| v.get("itemInfo"))
            .and_then(|v| v.get("itemStruct"))
            .ok_or(TikTokError::MissingVideoData)?;

        Self::parse_video(&video_id, &final_url, item)
    }

    fn default_headers() -> HeaderMap {
        let mut headers = HeaderMap::new();

        headers.insert(
            USER_AGENT,
            HeaderValue::from_static(
                "Mozilla/5.0 (X11; Linux x86_64) \
                 AppleWebKit/537.36 Chrome/131.0 Safari/537.36",
            ),
        );

        headers.insert(
            ACCEPT,
            HeaderValue::from_static(
                "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            ),
        );

        headers.insert(ACCEPT_LANGUAGE, HeaderValue::from_static("en-US,en;q=0.9"));

        headers
    }

    fn extract_video_id(url: &Url) -> Option<String> {
        let segments: Vec<_> = url.path_segments()?.collect();

        segments
            .windows(2)
            .find(|parts| parts[0] == "video")
            .and_then(|parts| {
                let id = parts[1];

                if id.chars().all(|c| c.is_ascii_digit()) {
                    Some(id.to_string())
                } else {
                    None
                }
            })
    }

    fn extract_video_id_from_text(input: &str) -> Option<String> {
        let parts: Vec<_> = input.split('/').collect();

        parts
            .windows(2)
            .find(|parts| parts[0] == "video")
            .map(|parts| parts[1])
            .and_then(|id| id.split(['?', '#']).next())
            .filter(|id| id.chars().all(|c| c.is_ascii_digit()))
            .map(str::to_owned)
    }

    fn extract_script_json(html: &str, script_id: &str) -> Result<Value, TikTokError> {
        let document = Html::parse_document(html);

        let selector = Selector::parse(&format!("script#{script_id}"))
            .map_err(|_| TikTokError::MissingMetadata)?;

        let script = document
            .select(&selector)
            .next()
            .ok_or(TikTokError::MissingMetadata)?;

        let json = script.text().collect::<String>();

        Ok(serde_json::from_str(&json)?)
    }

    fn parse_video(
        video_id: &str,
        final_url: &Url,
        item: &Value,
    ) -> Result<TikTokInfo, TikTokError> {
        let video = item.get("video").unwrap_or(&Value::Null);
        let author = item.get("author").unwrap_or(&Value::Null);
        let stats = item.get("stats").unwrap_or(&Value::Null);
        let music = item.get("music").unwrap_or(&Value::Null);

        let width = Self::int(video, "width");
        let height = Self::int(video, "height");

        let mut formats = Vec::new();

        Self::add_url_list(
            &mut formats,
            video.get("playAddr"),
            "play",
            width,
            height,
            false,
        );

        Self::add_url_list(
            &mut formats,
            video.get("downloadAddr"),
            "download",
            width,
            height,
            true,
        );

        Ok(TikTokInfo {
            id: video_id.to_string(),
            url: final_url.to_string(),
            title: Self::string(item, "desc"),
            description: Self::string(item, "desc"),
            uploader: Self::string(author, "uniqueId"),
            uploader_id: Self::string(author, "id"),
            channel: Self::string(author, "nickname"),
            timestamp: Self::int(item, "createTime"),
            duration: Self::int(video, "duration").map(|v| v as f64 / 1000.0),
            view_count: Self::int(stats, "playCount"),
            like_count: Self::int(stats, "diggCount"),
            comment_count: Self::int(stats, "commentCount"),
            share_count: Self::int(stats, "shareCount"),
            collect_count: Self::int(stats, "collectCount"),
            track: Self::string(music, "title"),
            artist: Self::string(music, "authorName"),
            thumbnails: Self::thumbnails(video),
            formats,
        })
    }

    fn add_url_list(
        formats: &mut Vec<VideoFormat>,
        object: Option<&Value>,
        format_id: &str,
        width: Option<i64>,
        height: Option<i64>,
        has_watermark: bool,
    ) {
        let Some(urls) = object
            .and_then(|v| v.get("urlList"))
            .and_then(Value::as_array)
        else {
            return;
        };

        for (index, url) in urls.iter().filter_map(Value::as_str).enumerate() {
            formats.push(VideoFormat {
                id: format!("{format_id}-{index}"),
                url: url.to_owned(),
                width,
                height,
                mime_type: "video/mp4".to_owned(),
                has_watermark,
            });
        }
    }

    fn thumbnails(video: &Value) -> Vec<String> {
        ["cover", "originCover", "dynamicCover", "aiDynamicCover"]
            .iter()
            .flat_map(|key| {
                video
                    .get(*key)
                    .and_then(|v| v.get("urlList"))
                    .and_then(Value::as_array)
                    .into_iter()
                    .flatten()
                    .filter_map(Value::as_str)
                    .map(str::to_owned)
            })
            .collect()
    }

    fn string(value: &Value, key: &str) -> Option<String> {
        value.get(key).and_then(Value::as_str).map(str::to_owned)
    }

    fn int(value: &Value, key: &str) -> Option<i64> {
        value
            .get(key)
            .and_then(|v| v.as_i64().or_else(|| v.as_str()?.parse().ok()))
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    struct TestExtractor;

    impl TikTokExtractor for TestExtractor {
        fn reqwest_client(&self) -> &reqwest::Client {
            unreachable!("parser tests do not use an HTTP client")
        }
    }

    fn extract_video_id(url: &Url) -> Option<String> {
        <TestExtractor as TikTokExtractor>::extract_video_id(url)
    }

    fn extract_video_id_from_text(input: &str) -> Option<String> {
        <TestExtractor as TikTokExtractor>::extract_video_id_from_text(input)
    }

    #[test]
    fn extracts_video_id_from_video_path() {
        let url = Url::parse("https://www.tiktok.com/@creator/video/1234567890").unwrap();
        assert_eq!(extract_video_id(&url).as_deref(), Some("1234567890"));
    }

    #[test]
    fn rejects_non_numeric_video_id() {
        let url = Url::parse("https://www.tiktok.com/@creator/video/not-a-number").unwrap();
        assert_eq!(extract_video_id(&url), None);
    }

    #[test]
    fn extracts_video_id_from_text_with_query_and_fragment() {
        assert_eq!(
            extract_video_id_from_text("https://www.tiktok.com/@creator/video/123456?share=1#top")
                .as_deref(),
            Some("123456")
        );
    }

    #[test]
    fn rejects_non_numeric_video_id_in_text() {
        assert_eq!(
            extract_video_id_from_text("https://www.tiktok.com/@creator/video/abc"),
            None
        );
    }

    #[test]
    fn extracts_universal_data_script_json() {
        let html = r#"<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__">{"video":{"id":"123"}}</script>"#;
        let data = <TestExtractor as TikTokExtractor>::extract_script_json(
            html,
            "__UNIVERSAL_DATA_FOR_REHYDRATION__",
        )
        .unwrap();
        assert_eq!(data["video"]["id"], "123");
    }

    #[test]
    fn returns_missing_metadata_when_script_is_absent() {
        let result = <TestExtractor as TikTokExtractor>::extract_script_json(
            "<html></html>",
            "__UNIVERSAL_DATA_FOR_REHYDRATION__",
        );
        assert!(matches!(result, Err(TikTokError::MissingMetadata)));
    }

    #[test]
    fn parses_video_fields_formats_and_thumbnails() {
        let final_url = Url::parse("https://www.tiktok.com/@creator/video/123").unwrap();
        let item = json!({
            "desc": "A sample video",
            "createTime": 1710000000,
            "author": {
                "uniqueId": "creator",
                "id": "42",
                "nickname": "Creator"
            },
            "stats": {
                "playCount": "100",
                "diggCount": 25,
                "commentCount": 5,
                "shareCount": 2,
                "collectCount": 3
            },
            "music": {
                "title": "Track",
                "authorName": "Artist"
            },
            "video": {
                "width": 1080,
                "height": 1920,
                "duration": 15000,
                "playAddr": {"urlList": ["https://cdn.example/play.mp4"]},
                "downloadAddr": {"urlList": ["https://cdn.example/download.mp4"]},
                "cover": {"urlList": ["https://cdn.example/cover.jpg"]},
                "originCover": {"urlList": ["https://cdn.example/original.jpg"]}
            }
        });

        let info = <TestExtractor as TikTokExtractor>::parse_video("123", &final_url, &item)
            .unwrap();

        assert_eq!(info.id, "123");
        assert_eq!(info.title.as_deref(), Some("A sample video"));
        assert_eq!(info.uploader.as_deref(), Some("creator"));
        assert_eq!(info.uploader_id.as_deref(), Some("42"));
        assert_eq!(info.channel.as_deref(), Some("Creator"));
        assert_eq!(info.duration, Some(15.0));
        assert_eq!(info.view_count, Some(100));
        assert_eq!(info.like_count, Some(25));
        assert_eq!(info.track.as_deref(), Some("Track"));
        assert_eq!(info.artist.as_deref(), Some("Artist"));
        assert_eq!(info.thumbnails.len(), 2);
        assert_eq!(info.formats.len(), 2);
        assert!(!info.formats[0].has_watermark);
        assert!(info.formats[1].has_watermark);
        assert_eq!(info.formats[0].width, Some(1080));
        assert_eq!(info.formats[0].height, Some(1920));
    }
}
