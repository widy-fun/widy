use std::collections::HashMap;

use sea_orm::{entity::prelude::*, FromJsonQueryResult};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, EnumIter, DeriveActiveEnum, Serialize, Deserialize)]
#[sea_orm(rs_type = "String", db_type = "Text")]
pub enum TtsType {
    #[sea_orm(string_value = "Google")]
    Google,
    #[sea_orm(string_value = "Edge")]
    Edge,
    #[sea_orm(string_value = "Piper")]
    Piper,
    #[sea_orm(string_value = "FishAudio")]
    FishAudio,
}
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, FromJsonQueryResult)]
#[serde(untagged)]

pub enum TtsExtra {
    Edge(EdgeTtsExtra),
    FishAudio(FishAudioExtra),
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, FromJsonQueryResult)]
#[serde(untagged)]

pub enum TtsModels {
    Piper(Vec<PiperVoice>),
    FishAudio(Vec<FishAudioModel>),
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct EdgeTtsExtra {
    pub gender: Gender,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct FishAudioExtra {
    pub model: FishAudioTtsModel,
}

#[derive(Debug, Clone, PartialEq, EnumIter, DeriveActiveEnum, Serialize, Deserialize)]
#[sea_orm(rs_type = "String", db_type = "Text")]
pub enum Gender {
    #[sea_orm(string_value = "Male")]
    Male,
    #[sea_orm(string_value = "Female")]
    Female,
}

#[derive(Debug, Deserialize, PartialEq, Clone, Serialize)]

pub struct PiperLanguage {
    pub code: String,
    pub family: String,
    pub region: String,
    pub name_english: String,
    pub country_english: String,
}

#[derive(Debug, Deserialize, PartialEq, Clone, Serialize)]
pub struct PiperFileInfo {
    pub size_bytes: u64,
    #[allow(dead_code)]
    pub md5_digest: String,
}

#[derive(Debug, Deserialize, PartialEq, Clone, Serialize)]
pub struct PiperVoice {
    pub key: String,
    pub name: String,
    pub language: PiperLanguage,
    pub quality: String,
    pub num_speakers: u32,
    pub files: HashMap<String, PiperFileInfo>,
    #[serde(default)]
    pub aliases: Vec<String>,
}

pub type PiperVoices = HashMap<String, PiperVoice>;

#[derive(Debug, Clone, PartialEq, Deserialize, Serialize)]
pub struct FishAudioModel {
    pub _id: String,
    pub r#type: ModelType,
    pub title: String,
    pub state: ModelState,
    pub tags: Vec<String>,
    pub created_at: String,
    pub updated_at: String,
    pub visibility: Visibility,
    pub like_count: u64,
    pub mark_count: u64,
    pub shared_count: u64,
    pub task_count: u64,
    pub author: AuthorEntity,
    #[serde(default)]
    pub description: String,
    #[serde(default)]
    pub cover_image: String,
    pub train_mode: TrainMode,
    #[serde(default)]
    pub samples: Vec<SampleEntity>,
    #[serde(default)]
    pub languages: Vec<String>,
    #[serde(default)]
    pub lock_visibility: bool,
    #[serde(default)]
    pub dmca_taken_down: Option<bool>,
    #[serde(default)]
    pub takedown_category: Option<TakedownCategory>,
    #[serde(default)]
    pub default_text: String,
    #[serde(default)]
    pub source: Option<String>,
    #[serde(default)]
    pub licensed: bool,
    #[serde(default)]
    pub pvc_release_state: Option<PvcReleaseState>,
    #[serde(default)]
    pub pvc_notice_period_months: Option<u64>,
    #[serde(default)]
    pub pvc_released_at: Option<String>,
    #[serde(default)]
    pub pvc_retire_requested_at: Option<String>,
    #[serde(default)]
    pub pvc_retire_effective_at: Option<String>,
    #[serde(default)]
    pub quality: Option<ModelQualityEntity>,
    #[serde(default)]
    pub unliked: bool,
    #[serde(default)]
    pub liked: bool,
    #[serde(default)]
    pub marked: bool,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Deserialize, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum ModelType {
    Svc,
    Tts,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Deserialize, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum ModelState {
    Created,
    Training,
    Trained,
    Failed,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Deserialize, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum Visibility {
    Public,
    Unlist,
    Private,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Deserialize, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum TrainMode {
    Fast,
    Full,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Deserialize, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum TakedownCategory {
    Dmca,
    Policy,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Deserialize, Serialize)]
#[serde(rename_all = "snake_case")]
pub enum PvcReleaseState {
    Released,
    Retiring,
}

#[derive(Debug, Clone, PartialEq, Deserialize, Serialize)]
pub struct AuthorEntity {
    pub _id: String,
    pub nickname: String,
    pub avatar: String,
}

#[derive(Debug, Clone, PartialEq, Deserialize, Serialize)]
pub struct SampleEntity {
    pub title: String,
    pub text: String,
    pub task_id: String,
    pub audio: String,
}

#[derive(Debug, Clone, PartialEq, Deserialize, Serialize)]
pub struct ModelQualityEntity {
    #[serde(default)]
    pub audios: Vec<ModelAudioQualityEntity>,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Debug, Clone, PartialEq, Deserialize, Serialize)]
pub struct ModelAudioQualityEntity {
    pub filename: String,
    pub duration_ms: f64,
    pub language: String,
    #[serde(default)]
    pub quality: std::collections::HashMap<String, f64>,
    #[serde(default)]
    pub quality_passed: bool,
    #[serde(default)]
    pub quality_reason: String,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, FromJsonQueryResult)]
pub struct Tts {
    pub r#type: TtsType,
    pub audio: String,
    pub volume: u32,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, FromJsonQueryResult)]
pub struct TtsSettings {
    pub r#type: TtsType,
    pub extra: Option<TtsExtra>,
    pub models: Option<TtsModels>,
    pub volume: u32,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub enum FishAudioTtsModel {
    #[serde(rename = "s1")]
    S1,
    #[serde(rename = "s2-pro")]
    S2Pro,
    #[serde(rename = "s2.1-pro")]
    S21Pro,
    #[serde(rename = "s2.1-pro-free")]
    S21ProFree,
    #[serde(rename = "drama-3-preview")]
    Drama3Preview,
}

impl FishAudioTtsModel {
    pub fn as_str(self) -> &'static str {
        match self {
            FishAudioTtsModel::S1 => "s1",
            FishAudioTtsModel::S2Pro => "s2-pro",
            FishAudioTtsModel::S21Pro => "s2.1-pro",
            FishAudioTtsModel::S21ProFree => "s2.1-pro-free",
            FishAudioTtsModel::Drama3Preview => "drama-3-preview",
        }
    }
}
