use entity::tts::FishAudioModel;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct FishAudioListModelsFilter {
    /// Title to filter models.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub title: Option<String>,

    /// Tag(s) to filter models.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub tag: Option<Vec<String>>,

    /// If true, return models owned by the active workspace. Default: false.
    #[serde(rename = "self", skip_serializing_if = "Option::is_none")]
    pub self_: Option<bool>,

    /// Author ID to filter public models; ignored if `self_` is true.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub author_id: Option<String>,

    /// Language(s) to filter models.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub language: Option<String>,

    /// Title language(s) to filter models.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub title_language: Option<Vec<String>>,

    /// If true, only return voices licensed by Fish Audio; ignored if `self_` is true.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub licensed: Option<bool>,

    /// Sort order. Default: `SortBy::Score`.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub sort_by: Option<SortBy>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum SortBy {
    Score,
    TaskCount,
    CreatedAt,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct FishAudioListModelsResponse {
    pub total: u64,
    pub items: Vec<FishAudioModel>,
    pub max_offset: Option<u64>,
    pub accessible_upper_bound: Option<u64>,
    pub window_limited: bool,
    pub total_is_exact: bool,
    pub has_more: Option<bool>,
}

#[derive(Debug, Clone, Default, Serialize)]
pub struct TtsRequestBody {
    pub text: String,
    pub reference_id: String,
}
