use std::collections::HashSet;

use async_trait::async_trait;
use serde_json::Value;
use thiserror::Error;
use url::Url;

#[derive(Debug, Error)]
pub enum YoutubeSearchError {
    #[error("HTTP request failed: {0}")]
    Request(#[from] reqwest::Error),

    #[error("invalid search response")]
    InvalidResponse,

    #[error("search JSON was not found")]
    MissingSearchData,

    #[error("invalid JSON: {0}")]
    Json(#[from] serde_json::Error),
}

#[derive(Debug, Clone)]
pub struct YoutubeSearchInfo {
    pub id: String,
    pub url: String,
    pub title: Option<String>,
    pub channel: Option<String>,
    pub duration: Option<f64>,
    pub view_count: Option<u64>,
    pub published_time: Option<String>,
    pub thumbnail: Option<String>,
    pub is_short: bool,
}

#[async_trait]
pub trait YoutubeSearchExtractor {
    fn reqwest_client(&self) -> &reqwest::Client;

    async fn search(
        &self,
        query: &str,
        limit: usize,
    ) -> Result<Vec<YoutubeSearchInfo>, YoutubeSearchError> {
        let mut url = Url::parse("https://www.youtube.com/results")
            .map_err(|_| YoutubeSearchError::InvalidResponse)?;

        url.query_pairs_mut().append_pair("search_query", query);

        let html = self
            .reqwest_client()
            .get(url)
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

        let initial_data = Self::extract_initial_data(&html)?;

        let mut results = Vec::new();
        let mut seen = HashSet::new();

        Self::collect_results(&initial_data, &mut results, &mut seen, limit);

        Ok(results)
    }

    async fn search_youtube_one(
        &self,
        query: &str,
    ) -> Result<Option<YoutubeSearchInfo>, YoutubeSearchError> {
        Ok(self.search(query, 1).await?.into_iter().next())
    }

    fn extract_initial_data(html: &str) -> Result<Value, YoutubeSearchError> {
        let markers = [
            "var ytInitialData = ",
            "ytInitialData = ",
            "window[\"ytInitialData\"] = ",
        ];

        for marker in markers {
            let Some(marker_position) = html.find(marker) else {
                continue;
            };

            let start = marker_position + marker.len();

            let Some(relative_json_start) = html[start..].find('{') else {
                continue;
            };

            let json_start = start + relative_json_start;

            if let Some(json_end) = Self::find_json_end(html, json_start) {
                let json = &html[json_start..=json_end];

                if let Ok(value) = serde_json::from_str(json) {
                    return Ok(value);
                }
            }
        }

        Err(YoutubeSearchError::MissingSearchData)
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

                b'{' => {
                    depth += 1;
                }

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

    fn collect_results(
        value: &Value,
        results: &mut Vec<YoutubeSearchInfo>,
        seen: &mut HashSet<String>,
        limit: usize,
    ) {
        if results.len() >= limit {
            return;
        }

        if let Some(video) = value.get("videoRenderer") {
            if let Some(result) = Self::parse_video_renderer(video) {
                if seen.insert(result.id.clone()) {
                    results.push(result);
                }
            }
        }

        if results.len() >= limit {
            return;
        }

        if let Some(short) = value.get("reelItemRenderer") {
            if let Some(result) = Self::parse_short_renderer(short) {
                if seen.insert(result.id.clone()) {
                    results.push(result);
                }
            }
        }

        if let Some(object) = value.as_object() {
            for child in object.values() {
                if results.len() >= limit {
                    break;
                }

                Self::collect_results(child, results, seen, limit);
            }
        } else if let Some(array) = value.as_array() {
            for child in array {
                if results.len() >= limit {
                    break;
                }

                Self::collect_results(child, results, seen, limit);
            }
        }
    }

    fn parse_video_renderer(value: &Value) -> Option<YoutubeSearchInfo> {
        let id = value.get("videoId").and_then(Value::as_str)?.to_owned();

        let is_short = value
            .get("isShorts")
            .and_then(Value::as_bool)
            .unwrap_or(false)
            || value
                .get("navigationEndpoint")
                .and_then(|v| v.get("commandMetadata"))
                .and_then(|v| v.get("webCommandMetadata"))
                .and_then(|v| v.get("url"))
                .and_then(Value::as_str)
                .map(|url| url.contains("/shorts/"))
                .unwrap_or(false);

        let duration = Self::parse_duration(Self::text(value.get("lengthText")));

        let view_count = Self::parse_view_count(Self::text(value.get("viewCountText")));

        Some(YoutubeSearchInfo {
            id: id.clone(),

            url: if is_short {
                format!("https://www.youtube.com/shorts/{id}")
            } else {
                format!("https://www.youtube.com/watch?v={id}")
            },

            title: Self::text(value.get("title")),
            channel: Self::text(value.get("ownerText")),
            duration,
            view_count,
            published_time: Self::text(value.get("publishedTimeText")),
            thumbnail: Self::thumbnail(value.get("thumbnail")),
            is_short,
        })
    }

    fn parse_short_renderer(value: &Value) -> Option<YoutubeSearchInfo> {
        let id = value
            .get("videoId")
            .or_else(|| {
                value
                    .get("navigationEndpoint")?
                    .get("reelWatchEndpoint")?
                    .get("videoId")
            })
            .and_then(Value::as_str)?
            .to_owned();

        let duration = Self::parse_duration(Self::text(value.get("lengthText")));

        let view_count = Self::parse_view_count(Self::text(value.get("viewCountText")));

        Some(YoutubeSearchInfo {
            id: id.clone(),
            url: format!("https://www.youtube.com/shorts/{id}"),

            title: Self::text(value.get("headline").or_else(|| value.get("title"))),

            channel: Self::text(
                value
                    .get("shortBylineText")
                    .or_else(|| value.get("longBylineText")),
            ),

            duration,
            view_count,
            published_time: None,
            thumbnail: Self::thumbnail(value.get("thumbnail")),
            is_short: true,
        })
    }

    fn parse_duration(value: Option<String>) -> Option<f64> {
        let value = value?;
        let parts: Vec<&str> = value.trim().split(':').collect();

        if parts.is_empty() {
            return None;
        }

        let mut seconds = 0.0;

        for part in parts {
            seconds = seconds * 60.0 + part.parse::<f64>().ok()?;
        }

        Some(seconds)
    }

    fn parse_view_count(value: Option<String>) -> Option<u64> {
        let value = value?;
        let number_text = value.split_whitespace().next()?.replace(',', "");

        let last = number_text.chars().last()?;

        let multiplier = match last {
            'K' | 'k' => 1_000.0,
            'M' | 'm' => 1_000_000.0,
            'B' | 'b' => 1_000_000_000.0,
            _ => 1.0,
        };

        let number = if multiplier == 1.0 {
            number_text.parse::<f64>().ok()?
        } else {
            number_text[..number_text.len() - 1].parse::<f64>().ok()?
        };

        Some((number * multiplier) as u64)
    }

    fn text(value: Option<&Value>) -> Option<String> {
        let value = value?;

        if let Some(text) = value.get("simpleText").and_then(Value::as_str) {
            return Some(text.to_owned());
        }

        value
            .get("runs")
            .and_then(Value::as_array)
            .map(|runs| {
                runs.iter()
                    .filter_map(|run| run.get("text").and_then(Value::as_str))
                    .collect::<String>()
            })
            .filter(|text| !text.is_empty())
    }

    fn thumbnail(value: Option<&Value>) -> Option<String> {
        value?
            .get("thumbnails")
            .and_then(Value::as_array)
            .and_then(|items| items.last())
            .and_then(|item| item.get("url"))
            .and_then(Value::as_str)
            .map(str::to_owned)
    }
}
