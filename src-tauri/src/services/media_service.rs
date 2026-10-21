use super::DatabaseService;
use crate::{error::AppError, repositories::MediaSettingsRepository, utils::log_and_wrap_error};
use entity::{
    media::{Media, MediaType},
    media_settings::MediaPlatformSettings,
    messages::MessageType,
};
#[cfg(test)]
use mockall::predicate::*;
use regex::Regex;
use reqwest::Client;
use rusty_ytdl::{Video, search::SearchResult};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use tauri::{AppHandle, Manager};
use url::Url;

#[derive(Debug)]
pub struct YoutubeInfo {
    pub video_id: String,
    pub title: String,
    pub url: String,
    pub thumbnail_url: Option<String>,
    pub duration: Option<u64>,
    pub view_count: Option<u64>,
}

struct UrlMedia {
    url: String,
    media_type: MediaType,
}
struct TikTokInfo {
    pub id: String,
    pub play_count: u64,
    pub title: String,
    pub duration: Option<u64>,
}

#[allow(dead_code)]
#[derive(Deserialize)]
struct KickClipInfo {
    pub playback_url: String,
    pub title: String,
    pub views_count: u64,
    pub thumbnail_url: Option<String>,
    pub duration: u64,
    pub creator: KickClipCreator,
    pub is_mature: bool,
}

#[allow(dead_code)]
#[derive(Deserialize)]
struct KickClipCreator {
    pub id: u64,
    pub slug: String,
    pub username: String,
}

#[derive(Serialize)]
struct PersistedQuery {
    version: i32,
    #[serde(rename = "sha256Hash")]
    sha256_hash: String,
}

#[derive(Serialize)]
struct Extensions {
    #[serde(rename = "persistedQuery")]
    persisted_query: PersistedQuery,
}

#[derive(Serialize)]
struct Variables {
    slug: String,
    platform: String,
}

#[derive(Serialize)]
struct Operation {
    #[serde(rename = "operationName")]
    operation_name: String,
    variables: Variables,
    extensions: Extensions,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
struct TwitchClipInfo {
    pub data: TwitchData,
    pub extensions: TwitchExtensions,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct TwitchData {
    pub clip: Clip,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct Clip {
    pub id: String,
    #[serde(rename = "playbackAccessToken")]
    pub playback_access_token: PlaybackAccessToken,
    #[serde(rename = "videoQualities")]
    pub video_qualities: Vec<VideoQuality>,
    #[serde(rename = "__typename")]
    pub typename: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct PlaybackAccessToken {
    pub signature: String,
    pub value: String,
    #[serde(rename = "__typename")]
    pub typename: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct Token {
    pub authorization: Authorization,
    pub clip_slug: String,
    pub clip_uri: String,
    pub user_id: String,
    pub device_id: Option<String>,
    pub expires: u64,
    pub version: u64,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
struct Authorization {
    pub forbidden: bool,
    pub reason: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct VideoQuality {
    #[serde(rename = "frameRate")]
    pub frame_rate: f64,
    pub quality: String,
    #[serde(rename = "sourceURL")]
    pub source_url: String,
    #[serde(rename = "__typename")]
    pub typename: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct TwitchExtensions {
    #[serde(rename = "durationMilliseconds")]
    pub duration_milliseconds: i64,
    #[serde(rename = "operationName")]
    pub operation_name: String,
    #[serde(rename = "requestID")]
    pub request_id: String,
}
pub struct MediaService {}

impl MediaService {
    pub fn new() -> Self {
        Self {}
    }

    pub async fn get_media(
        &self,
        text: &Option<String>,
        amount: &f64,
        app: &AppHandle,
        message_type: MessageType,
    ) -> Option<Media> {
        let database_service = app.state::<DatabaseService>();
        let media_settings = match database_service.get_media_settings().await {
            Ok(Some(media_settings)) => media_settings,
            Ok(None) => return None,
            Err(e) => {
                log::error!("{}", e.to_string());
                return None;
            }
        };

        let url_media = self.get_url_media(text.as_ref()?)?;

        match url_media.media_type {
            MediaType::Twitch => {
                if !media_settings.twitch.enabled {
                    return None;
                }
                self.check_donation_min_amount(amount, &message_type, &media_settings.twitch)?;

                let twitch_clip_info = self.get_twitch_clip_info(&url_media.url, app).await?;
                let token = match serde_json::from_str::<Token>(
                    &twitch_clip_info.data.clip.playback_access_token.value,
                ) {
                    Ok(token) => token,
                    Err(e) => {
                        log::error!("Parse twitch clip token error: {}", e.to_string());
                        return None;
                    }
                };

                let temporary_src = self.get_twitch_temporary_src(&twitch_clip_info)?;

                return Some(Media {
                    url: url_media.url,
                    media_type: url_media.media_type,
                    expires: Some(token.expires),
                    temporary_src: Some(temporary_src),
                    ..Default::default()
                });
            }
            MediaType::TikTok => {
                if !media_settings.tiktok.enabled {
                    return None;
                }
                self.check_donation_min_amount(amount, &message_type, &media_settings.tiktok)?;

                let tiktok_info = self.get_tiktok_info(&url_media.url, app).await?;

                if media_settings.tiktok.min_views > tiktok_info.play_count {
                    return None;
                }

                return Some(Media {
                    url: url_media.url,
                    media_type: url_media.media_type,
                    expires: None,
                    temporary_src: Some(tiktok_info.id),
                    thumbnail_url: None,
                    duration: tiktok_info.duration,
                    title: Some(tiktok_info.title),
                });
            }
            MediaType::Youtube => {
                if !media_settings.youtube.enabled {
                    return None;
                }
                self.check_donation_min_amount(amount, &message_type, &media_settings.youtube)?;

                let video = Video::new(&url_media.url)
                    .map_err(|e| log_and_wrap_error("Video instance", e))
                    .ok()?;
                let video_info = video
                    .get_info()
                    .await
                    .map_err(|e| log_and_wrap_error("Get youtube video", e))
                    .ok()?;
                let view_count = video_info
                    .video_details
                    .view_count
                    .parse::<u64>()
                    .unwrap_or(0);
                if media_settings.youtube.min_views > view_count {
                    return None;
                }
                let thumbnail_url = match video_info.video_details.thumbnails.last() {
                    Some(thumbnail) => Some(thumbnail.url.clone()),
                    None => None,
                };
                let duration = video_info
                    .formats
                    .first()?
                    .approx_duration_ms
                    .clone()
                    .unwrap_or("0".to_string())
                    .parse::<u64>()
                    .unwrap_or(0)
                    / 1000;
                return Some(Media {
                    url: video_info.video_details.video_url,
                    media_type: url_media.media_type,
                    expires: None,
                    temporary_src: Some(video_info.video_details.video_id),
                    thumbnail_url,
                    title: Some(video_info.video_details.title),
                    duration: Some(duration),
                });
            }
            MediaType::Kick => {
                if !media_settings.kick.enabled {
                    return None;
                }
                self.check_donation_min_amount(amount, &message_type, &media_settings.kick)?;

                let kick_clip_info = self
                    .get_kick_clip_info(&url_media.url, app)
                    .await
                    .map_err(|e| log_and_wrap_error("Get kick info", e))
                    .ok()?;

                if media_settings.kick.min_views > kick_clip_info.views_count {
                    return None;
                }

                return Some(Media {
                    url: url_media.url,
                    media_type: url_media.media_type,
                    expires: None,
                    temporary_src: Some(kick_clip_info.playback_url),
                    thumbnail_url: kick_clip_info.thumbnail_url,
                    duration: Some(kick_clip_info.duration),
                    title: Some(format!(
                        "{} - {}",
                        kick_clip_info.creator.username, kick_clip_info.title
                    )),
                });
            }
        }
    }

    fn check_donation_min_amount(
        &self,
        amount: &f64,
        message_type: &MessageType,
        media_platform_settings: &MediaPlatformSettings,
    ) -> Option<bool> {
        if let MessageType::Donation = message_type {
            if media_platform_settings.min_amount as f64 > *amount {
                return None;
            }
        }
        Some(true)
    }

    async fn get_tiktok_info(&self, url: &str, app: &AppHandle) -> Option<TikTokInfo> {
        let reqwest_client = app.state::<reqwest::Client>();
        let response = match reqwest_client
            .get(url)
            .header("Accept-Language", "en-US,en;q=0.9")
            .send()
            .await
        {
            Ok(response) => response,
            Err(e) => {
                log::error!("Failed to get tiktok info: {}", e.to_string());
                return None;
            }
        };
        let html = match response.text().await {
            Ok(html) => html,
            Err(e) => {
                log::error!("Failed to get tiktok html: {}", e.to_string());
                return None;
            }
        };

        let re = Regex::new(
            r#"<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__" type="application/json">(.*?)</script>"#).expect("Wrong script element regex");

        let captures: regex::Captures<'_> = re.captures(&html)?;

        let json_str = captures.get(1)?;

        let json_data: Value = match serde_json::from_str(json_str.as_str()) {
            Ok(json_data) => json_data,
            Err(e) => {
                log::error!("Parse tiktok page error: {}", e.to_string());
                return None;
            }
        };
        let item =
            json_data.pointer("/__DEFAULT_SCOPE__/webapp.video-detail/itemInfo/itemStruct")?;

        let id = item.get("id")?.as_str()?.to_string();

        let play_count = item
            .pointer("/stats/playCount")
            .and_then(|v| v.as_u64())
            .or_else(|| {
                item.pointer("/statsV2/playCount")
                    .and_then(|v| v.as_str())
                    .and_then(|s| s.parse().ok())
            })
            .unwrap_or(0);

        let title = item
            .get("desc")
            .and_then(|v| v.as_str())
            .unwrap_or("")
            .to_string();

        let duration = item
            .pointer("/video/duration")
            .and_then(|v| v.as_u64())
            .or_else(|| item.pointer("/music/duration").and_then(|v| v.as_u64()));

        Some(TikTokInfo {
            id,
            play_count,
            title,
            duration,
        })
    }

    async fn get_twitch_clip_info(
        &self,
        clip_url: &str,
        app: &AppHandle,
    ) -> Option<TwitchClipInfo> {
        let twitch_gql_endpoint = "https://gql.twitch.tv/gql";
        let slug = clip_url.split('/').last().unwrap_or_default().to_string();
        let payload = vec![Operation {
            operation_name: "VideoAccessToken_Clip".to_string(),
            variables: Variables {
                slug: slug.clone(),
                platform: "web".to_string(),
            },
            extensions: Extensions {
                persisted_query: PersistedQuery {
                    version: 1,
                    sha256_hash: "4f35f1ac933d76b1da008c806cd5546a7534dfaff83e033a422a81f24e5991b3"
                        .to_string(),
                },
            },
        }];

        let reqwest_client: tauri::State<'_, Client> = app.state::<reqwest::Client>();

        let response = match reqwest_client
            .post(twitch_gql_endpoint)
            .header("Client-Id", "kimne78kx3ncx6brgo4mv6wki5h1ko")
            .header("Content-Type", "text/plain;charset=UTF-8")
            .header("Origin", "https://clips.twitch.tv")
            .header("Referer", format!("https://clips.twitch.tv/{}", slug))
            .json(&payload)
            .send()
            .await
        {
            Ok(resp) => resp,
            Err(e) => {
                log::error!("Failed to send request to Twitch GQL endpoint: {}", e);
                return None;
            }
        };
        match response.json::<Vec<TwitchClipInfo>>().await {
            Ok(vec_response) => return vec_response.first().cloned(),
            Err(e) => {
                log::error!("Parse twitch clip info error: {}", e.to_string());
                return None;
            }
        }
    }

    fn get_twitch_temporary_src(&self, twitch_clip_info: &TwitchClipInfo) -> Option<String> {
        let clip_url = twitch_clip_info
            .data
            .clip
            .video_qualities
            .first()?
            .source_url
            .clone();
        let sig = twitch_clip_info
            .data
            .clip
            .playback_access_token
            .signature
            .clone();
        let token = twitch_clip_info
            .data
            .clip
            .playback_access_token
            .value
            .replace("\\", "");

        let mut url: Url = match Url::parse(&clip_url) {
            Ok(url) => url,
            Err(_) => {
                return None;
            }
        };
        url.query_pairs_mut()
            .append_pair("sig", &sig)
            .append_pair("token", &token);
        Some(url.to_string())
    }

    pub async fn search_youtube(&self, query: &str) -> Result<YoutubeInfo, AppError> {
        let youtube = rusty_ytdl::search::YouTube::new()?;
        let result = youtube.search_one(query, None).await?;
        if let Some(SearchResult::Video(video)) = result {
            let thumbnail = video
                .thumbnails
                .last()
                .ok_or(AppError::Youtube("Not found thumbnail".to_string()))?;
            return Ok(YoutubeInfo {
                video_id: video.id,
                title: video.title,
                url: video.url,
                thumbnail_url: Some(thumbnail.url.clone()),
                duration: Some(video.duration),
                view_count: Some(video.views),
            });
        }
        Err(AppError::Youtube("Not found video".to_string()))
    }

    async fn get_kick_clip_info(
        &self,
        url: &str,
        app: &AppHandle,
    ) -> Result<KickClipInfo, AppError> {
        let reqwest_client = app.state::<reqwest::Client>();
        let response = reqwest_client.get(url).send().await?;
        let html = response.text().await?;
        const START: &str = r#"self.__next_f.push([1,""#;

        for part in html.split(START).skip(1) {
            // end of the JS string literal
            let Some(end) = part.find(r#""])"#) else {
                continue;
            };

            // unescape the JS string (its escapes are JSON-compatible)
            let literal = format!("\"{}\"", &part[..end]);
            let Ok(text) = serde_json::from_str::<String>(&literal) else {
                continue;
            };

            // props object: ...,null,{"state":{...},"children":"$L10b"}
            const MARK: &str = r#",null,{"state":"#;
            let Some(pos) = text.find(MARK) else { continue };
            let json = &text[pos + ",null,".len()..];

            // stream parser reads the first JSON value and ignores trailing data
            let Some(Ok(props)) = serde_json::Deserializer::from_str(json)
                .into_iter::<Value>()
                .next()
            else {
                continue;
            };

            let Some(queries) = props["state"]["queries"].as_array() else {
                continue;
            };

            for q in queries {
                let key = &q["queryKey"];
                if key[1] == "details" && key[2] == "getClip" {
                    let clip = q["state"]["data"]["data"].clone();
                    return Ok(serde_json::from_value::<KickClipInfo>(clip)?);
                }
            }
        }

        Err(AppError::Custom("clip data not found in HTML".to_string()))
    }
}

trait MediaParser {
    fn get_url_media(&self, text: &str) -> Option<UrlMedia>;
    fn get_media_type(&self, text: &str) -> Option<MediaType>;
}

impl MediaParser for MediaService {
    fn get_url_media(&self, text: &str) -> Option<UrlMedia> {
        let url_pattern = r"https?://[^\s<>]+";
        let url_regex = Regex::new(url_pattern).expect("Wrong url regex");

        let url_match = url_regex.find(text)?;
        let url = url_match.as_str().to_string();

        let media_type = self.get_media_type(&url)?;

        Some(UrlMedia { url, media_type })
    }

    fn get_media_type(&self, url: &str) -> Option<MediaType> {
        let youtube_patterns = [
            r"youtube\.com/watch\?v=",
            r"youtu\.be/",
            r"youtube\.com/shorts/",
        ];

        let twitch_patterns = [r"twitch\.tv/\w+/clip/", r"clips\.twitch\.tv/"];

        let tiktok_patterns = [r"tiktok\.com/", r"vm\.tiktok\.com/"];

        let kick_patterns = [r"kick\.com/"];

        for pattern in youtube_patterns.iter() {
            if Regex::new(pattern)
                .expect("Wrong youtube regex")
                .is_match(url)
            {
                return Some(MediaType::Youtube);
            }
        }

        for pattern in twitch_patterns.iter() {
            if Regex::new(pattern)
                .expect("Wrong twitch regex")
                .is_match(url)
            {
                return Some(MediaType::Twitch);
            }
        }

        for pattern in tiktok_patterns.iter() {
            if Regex::new(pattern)
                .expect("Wrong tiktok regex")
                .is_match(url)
            {
                return Some(MediaType::TikTok);
            }
        }

        for pattern in kick_patterns.iter() {
            if Regex::new(pattern).expect("Wrong kick regex").is_match(url) {
                return Some(MediaType::Kick);
            }
        }

        None
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    fn media_service() -> MediaService {
        MediaService::new()
    }

    // URL extraction

    #[test]
    fn extracts_youtube_url_from_message() {
        let service = media_service();
        let text = "Check out this video https://www.youtube.com/watch?v=dQw4w9WgXcQ";

        let result = service.get_url_media(text).expect("URL should be found");

        assert_eq!(result.url, "https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        assert_eq!(result.media_type, MediaType::Youtube);
    }

    #[test]
    fn extracts_first_supported_url_from_message() {
        let service = media_service();
        let text = concat!(
            "First: https://www.youtube.com/watch?v=123 ",
            "Second: https://clips.twitch.tv/456"
        );

        let result = service.get_url_media(text).expect("URL should be found");

        assert_eq!(result.url, "https://www.youtube.com/watch?v=123");
        assert_eq!(result.media_type, MediaType::Youtube);
    }

    #[test]
    fn returns_none_when_message_has_no_url() {
        let service = media_service();

        assert!(
            service
                .get_url_media("This message contains no URL")
                .is_none()
        );
    }

    #[test]
    fn returns_none_when_url_is_from_unsupported_platform() {
        let service = media_service();

        assert!(service.get_url_media("https://example.com/video").is_none());
    }

    #[test]
    fn returns_none_when_message_contains_only_unsupported_urls() {
        let service = media_service();
        let text = "https://example.com https://example.org/video";

        assert!(service.get_url_media(text).is_none());
    }

    // Media type detection

    #[test]
    fn identifies_youtube_url_variants() {
        let service = media_service();

        let urls = [
            "https://www.youtube.com/watch?v=123",
            "https://youtube.com/watch?v=123",
            "https://youtu.be/123",
            "https://youtube.com/shorts/123",
            "https://www.youtube.com/watch?v=123&t=30s",
        ];

        for url in urls {
            assert_eq!(
                service.get_media_type(url),
                Some(MediaType::Youtube),
                "Failed to recognize YouTube URL: {url}"
            );
        }
    }

    #[test]
    fn identifies_twitch_clip_url_variants() {
        let service = media_service();

        let urls = [
            "https://clips.twitch.tv/ExampleClip",
            "https://twitch.tv/streamer/clip/ExampleClip",
            "https://www.twitch.tv/streamer/clip/ExampleClip",
        ];

        for url in urls {
            assert_eq!(
                service.get_media_type(url),
                Some(MediaType::Twitch),
                "Failed to recognize Twitch URL: {url}"
            );
        }
    }

    #[test]
    fn identifies_tiktok_url_variants() {
        let service = media_service();

        let urls = [
            "https://tiktok.com/video/123",
            "https://www.tiktok.com/@user/video/123",
            "https://vm.tiktok.com/123",
        ];

        for url in urls {
            assert_eq!(
                service.get_media_type(url),
                Some(MediaType::TikTok),
                "Failed to recognize TikTok URL: {url}"
            );
        }
    }

    #[test]
    fn returns_none_for_unsupported_media_types() {
        let service = media_service();

        let urls = [
            "https://example.com/video",
            "https://vimeo.com/123",
            "not-a-url",
            "",
        ];

        for url in urls {
            assert_eq!(
                service.get_media_type(url),
                None,
                "Unexpected media type for: {url}"
            );
        }
    }

    // Twitch temporary source URL

    fn twitch_clip_info(source_url: &str, signature: &str, token: &str) -> TwitchClipInfo {
        TwitchClipInfo {
            data: TwitchData {
                clip: Clip {
                    id: "test-clip".to_string(),
                    playback_access_token: PlaybackAccessToken {
                        signature: signature.to_string(),
                        value: token.to_string(),
                        typename: "PlaybackAccessToken".to_string(),
                    },
                    video_qualities: vec![VideoQuality {
                        frame_rate: 30.0,
                        quality: "1080".to_string(),
                        source_url: source_url.to_string(),
                        typename: "VideoQuality".to_string(),
                    }],
                    typename: "Clip".to_string(),
                },
            },
            extensions: TwitchExtensions {
                duration_milliseconds: 1000,
                operation_name: "VideoAccessToken_Clip".to_string(),
                request_id: "test-request".to_string(),
            },
        }
    }

    #[test]
    fn builds_twitch_temporary_source_url() {
        let service = media_service();
        let info = twitch_clip_info(
            "https://production.example.com/video.mp4",
            "test-signature",
            "test-token",
        );

        let result = service
            .get_twitch_temporary_src(&info)
            .expect("Temporary source URL should be created");

        let url = Url::parse(&result).expect("Result should be a valid URL");

        assert_eq!(url.scheme(), "https");
        assert_eq!(url.host_str(), Some("production.example.com"));
        assert_eq!(url.path(), "/video.mp4");

        let query: std::collections::HashMap<String, String> =
            url.query_pairs().into_owned().collect();

        assert_eq!(query.get("sig").map(String::as_str), Some("test-signature"));
        assert_eq!(query.get("token").map(String::as_str), Some("test-token"));
    }

    #[test]
    fn preserves_existing_twitch_url_query_parameters() {
        let service = media_service();
        let info = twitch_clip_info(
            "https://production.example.com/video.mp4?existing=value",
            "signature",
            "token",
        );

        let result = service
            .get_twitch_temporary_src(&info)
            .expect("Temporary source URL should be created");

        let url = Url::parse(&result).expect("Result should be a valid URL");
        let query: std::collections::HashMap<String, String> =
            url.query_pairs().into_owned().collect();

        assert_eq!(query.get("existing").map(String::as_str), Some("value"));
        assert_eq!(query.get("sig").map(String::as_str), Some("signature"));
        assert_eq!(query.get("token").map(String::as_str), Some("token"));
    }

    #[test]
    fn returns_none_when_twitch_clip_has_no_video_qualities() {
        let service = media_service();
        let mut info = twitch_clip_info(
            "https://production.example.com/video.mp4",
            "signature",
            "token",
        );

        info.data.clip.video_qualities.clear();

        assert!(service.get_twitch_temporary_src(&info).is_none());
    }

    #[test]
    fn returns_none_when_twitch_source_url_is_invalid() {
        let service = media_service();
        let info = twitch_clip_info("not a valid URL", "signature", "token");

        assert!(service.get_twitch_temporary_src(&info).is_none());
    }

    // Twitch response deserialization

    #[test]
    fn deserializes_twitch_clip_response() {
        let response = json!({
            "data": {
                "clip": {
                    "id": "test-clip",
                    "playbackAccessToken": {
                        "signature": "signature",
                        "value": "token-value",
                        "__typename": "PlaybackAccessToken"
                    },
                    "videoQualities": [{
                        "frameRate": 30.0,
                        "quality": "1080",
                        "sourceURL": "https://example.com/video.mp4",
                        "__typename": "VideoQuality"
                    }],
                    "__typename": "Clip"
                }
            },
            "extensions": {
                "durationMilliseconds": 100,
                "operationName": "VideoAccessToken_Clip",
                "requestID": "request-1"
            }
        });

        let parsed: TwitchClipInfo =
            serde_json::from_value(response).expect("Response should deserialize");

        assert_eq!(parsed.data.clip.id, "test-clip");
        assert_eq!(
            parsed.data.clip.playback_access_token.signature,
            "signature"
        );
        assert_eq!(
            parsed.data.clip.video_qualities[0].source_url,
            "https://example.com/video.mp4"
        );
        assert_eq!(parsed.extensions.operation_name, "VideoAccessToken_Clip");
    }

    #[test]
    fn rejects_incomplete_twitch_clip_response() {
        let response = json!({
            "data": {
                "clip": {
                    "id": "test-clip"
                }
            }
        });

        let result = serde_json::from_value::<TwitchClipInfo>(response);

        assert!(result.is_err());
    }
}
