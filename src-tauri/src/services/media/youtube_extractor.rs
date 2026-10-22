use async_trait::async_trait;
use serde_json::Value;
use thiserror::Error;
use url::Url;

#[derive(Debug, Error)]
pub enum YoutubeError {
    #[error("HTTP request failed: {0}")]
    Request(#[from] reqwest::Error),

    #[error("invalid YouTube URL")]
    InvalidUrl,

    #[error("video id was not found")]
    MissingVideoId,

    #[error("player response was not found")]
    MissingPlayerResponse,

    #[error("video is unavailable")]
    Unavailable,

    #[error("invalid JSON: {0}")]
    Json(#[from] serde_json::Error),
}

#[derive(Debug)]
#[allow(dead_code)]
pub struct YoutubeVideoInfo {
    pub id: String,
    pub url: String,
    pub title: Option<String>,
    pub description: Option<String>,
    pub channel: Option<String>,
    pub channel_id: Option<String>,
    pub duration: Option<f64>,
    pub view_count: Option<u64>,
    pub upload_date: Option<String>,
    pub thumbnail: Option<String>,
    pub is_live: bool,
    pub formats: Vec<YoutubeFormat>,
}

#[derive(Debug)]
#[allow(dead_code)]
pub struct YoutubeFormat {
    pub itag: Option<u64>,
    pub url: String,
    pub mime_type: Option<String>,
    pub width: Option<u64>,
    pub height: Option<u64>,
    pub bitrate: Option<u64>,
    pub fps: Option<u64>,
    pub has_audio: bool,
    pub has_video: bool,
    pub signature_cipher: bool,
}

#[async_trait]
pub trait YoutubeExtractor {
    fn reqwest_client(&self) -> &reqwest::Client;

    async fn get_youtube_video_info(
        &self,
        input_url: &str,
    ) -> Result<YoutubeVideoInfo, YoutubeError> {
        let video_id = Self::extract_video_id(input_url)?;

        let canonical_url = format!("https://www.youtube.com/watch?v={video_id}");

        let html = self
            .reqwest_client()
            .get(&canonical_url)
            .header(
                "User-Agent",
                "Mozilla/5.0 (X11; Linux x86_64) \
                 AppleWebKit/537.36 Chrome/131.0 Safari/537.36",
            )
            .header("Accept-Language", "en-US,en;q=0.9")
            .send()
            .await?
            .error_for_status()?
            .text()
            .await?;

        let player_response = Self::extract_player_response(&html)?;

        Self::parse_player_response(&video_id, &canonical_url, &player_response)
    }

    fn extract_video_id(input: &str) -> Result<String, YoutubeError> {
        let url = Url::parse(input).map_err(|_| YoutubeError::InvalidUrl)?;

        let host = url
            .host_str()
            .ok_or(YoutubeError::InvalidUrl)?
            .to_ascii_lowercase();

        let segments: Vec<_> = url.path_segments().map(|v| v.collect()).unwrap_or_default();

        let id: Option<String> = if host == "youtu.be" {
            segments.first().map(|value| (*value).to_owned())
        } else if host.ends_with("youtube.com") {
            match segments.first().copied() {
                Some("watch") => url
                    .query_pairs()
                    .find(|(key, _)| key == "v")
                    .map(|(_, value)| value.into_owned()),

                Some("shorts" | "embed" | "live") => {
                    segments.get(1).map(|value| (*value).to_owned())
                }

                _ => None,
            }
        } else {
            None
        };

        id.filter(|id| !id.is_empty() && id.len() <= 20)
            .ok_or(YoutubeError::MissingVideoId)
    }

    fn extract_player_response(html: &str) -> Result<Value, YoutubeError> {
        let markers = [
            "ytInitialPlayerResponse = ",
            "ytInitialPlayerResponse=",
            "\"PLAYER_RESPONSE\":",
        ];

        for marker in markers {
            if let Some(start) = html.find(marker) {
                let json_start = html[start + marker.len()..]
                    .find('{')
                    .map(|offset| start + marker.len() + offset);

                if let Some(json_start) = json_start {
                    if let Some(json_end) = Self::find_json_end(html, json_start) {
                        let json = &html[json_start..=json_end];

                        if let Ok(value) = serde_json::from_str(json) {
                            return Ok(value);
                        }
                    }
                }
            }
        }

        Err(YoutubeError::MissingPlayerResponse)
    }

    fn find_json_end(input: &str, start: usize) -> Option<usize> {
        let bytes = input.as_bytes();
        let mut depth = 0usize;
        let mut in_string = false;
        let mut escaped = false;

        for index in start..bytes.len() {
            let byte = bytes[index];

            if in_string {
                if escaped {
                    escaped = false;
                } else if byte == b'\\' {
                    escaped = true;
                } else if byte == b'"' {
                    in_string = false;
                }

                continue;
            }

            match byte {
                b'"' => in_string = true,
                b'{' => depth += 1,
                b'}' => {
                    depth = depth.checked_sub(1)?;

                    if depth == 0 {
                        return Some(index);
                    }
                }
                _ => {}
            }
        }

        None
    }

    fn parse_player_response(
        video_id: &str,
        page_url: &str,
        response: &Value,
    ) -> Result<YoutubeVideoInfo, YoutubeError> {
        let playability = response
            .get("playabilityStatus")
            .and_then(|v| v.get("status"))
            .and_then(Value::as_str)
            .unwrap_or("OK");

        if playability != "OK" {
            return Err(YoutubeError::Unavailable);
        }

        let details = response
            .get("videoDetails")
            .ok_or(YoutubeError::Unavailable)?;

        let streaming = response
            .get("streamingData")
            .cloned()
            .unwrap_or(Value::Null);

        let mut formats = Vec::new();

        for key in ["formats", "adaptiveFormats"] {
            if let Some(items) = streaming.get(key).and_then(Value::as_array) {
                for item in items {
                    if let Some(format) = Self::parse_format(item) {
                        formats.push(format);
                    }
                }
            }
        }

        let thumbnails = details
            .get("thumbnail")
            .and_then(|v| v.get("thumbnails"))
            .and_then(Value::as_array)
            .and_then(|items| items.last())
            .and_then(|v| v.get("url"))
            .and_then(Value::as_str)
            .map(str::to_owned);

        Ok(YoutubeVideoInfo {
            id: video_id.to_owned(),
            url: page_url.to_owned(),

            title: details
                .get("title")
                .and_then(Value::as_str)
                .map(str::to_owned),

            description: details
                .get("shortDescription")
                .and_then(Value::as_str)
                .map(str::to_owned),

            channel: details
                .get("author")
                .and_then(Value::as_str)
                .map(str::to_owned),

            channel_id: details
                .get("channelId")
                .and_then(Value::as_str)
                .map(str::to_owned),

            duration: details.get("lengthSeconds").and_then(Self::value_to_f64),

            view_count: details.get("viewCount").and_then(Self::value_to_u64),

            upload_date: response
                .get("microformat")
                .and_then(|v| v.get("playerMicroformatRenderer"))
                .and_then(|v| v.get("uploadDate"))
                .and_then(Value::as_str)
                .map(str::to_owned),

            thumbnail: thumbnails,

            is_live: details
                .get("isLiveContent")
                .and_then(Value::as_bool)
                .unwrap_or(false),

            formats,
        })
    }

    fn parse_format(value: &Value) -> Option<YoutubeFormat> {
        let direct_url = value.get("url").and_then(Value::as_str).map(str::to_owned);

        let cipher = value
            .get("signatureCipher")
            .or_else(|| value.get("cipher"))
            .is_some();

        // Cipher URLs require JavaScript signature deciphering.
        let url = direct_url?;

        let mime_type = value
            .get("mimeType")
            .and_then(Value::as_str)
            .map(|v| v.split(';').next().unwrap_or(v).to_owned());

        let has_audio = mime_type
            .as_deref()
            .map(|v| v.starts_with("audio/"))
            .unwrap_or(false)
            || value.get("audioQuality").is_some();

        let has_video = mime_type
            .as_deref()
            .map(|v| v.starts_with("video/"))
            .unwrap_or(false)
            || value.get("width").is_some();

        Some(YoutubeFormat {
            itag: value.get("itag").and_then(Value::as_u64),
            url,
            mime_type,
            width: value.get("width").and_then(Value::as_u64),
            height: value.get("height").and_then(Value::as_u64),
            bitrate: value.get("bitrate").and_then(Value::as_u64),
            fps: value.get("fps").and_then(Value::as_u64),
            has_audio,
            has_video,
            signature_cipher: cipher,
        })
    }

    fn value_to_u64(value: &Value) -> Option<u64> {
        value
            .as_u64()
            .or_else(|| value.as_str()?.parse::<u64>().ok())
    }

    fn value_to_f64(value: &Value) -> Option<f64> {
        value
            .as_f64()
            .or_else(|| value.as_str()?.parse::<f64>().ok())
    }
}
