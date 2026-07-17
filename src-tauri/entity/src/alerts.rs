use sea_orm::{entity::prelude::*, ActiveValue::Set, FromJsonQueryResult, HasOneModel::NotSet};
use serde::{Deserialize, Serialize};

use crate::messages::MessageType;

#[sea_orm::model]
#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Serialize, Deserialize)]
#[sea_orm(table_name = "alerts")]
pub struct Model {
    #[sea_orm(primary_key, auto_increment = false)]
    pub id: Uuid,
    pub r#type: MessageType,
    pub audio: Option<String>,
    pub audio_volume: u32,
    pub image: Option<String>,
    pub alert_variant: AlertVariant,
    pub video: Option<String>,
    pub video_volume: u32,
    pub group_id: String,
    pub name: String,
    pub view_type: ViewType,
    pub status: bool,
    pub amount: u32,
    pub delay: u32,
    pub duration: u32,
    pub variation_conditions: AlertVariationConditions,
    pub tts_volume: u32,
    pub tts_type: TtsType,
    #[sea_orm(column_type = "JsonBinary")]
    pub tts_settings: Option<TtsSettings>,
    #[sea_orm(column_type = "JsonBinary")]
    pub title_style: TextStyle,
    pub title_template: String,
    #[sea_orm(column_type = "JsonBinary")]
    pub message_style: TextStyle,
    #[sea_orm(uniq)]
    pub reward_id: Option<Uuid>,
    #[sea_orm(belongs_to, from = "reward_id", to = "id")]
    pub reward: HasOne<super::rewards::Entity>,
    #[sea_orm(uniq)]
    pub command_id: Option<Uuid>,
    #[sea_orm(belongs_to, from = "command_id", to = "id")]
    pub command: HasOne<super::commands::Entity>,
}

impl ActiveModelBehavior for ActiveModel {}

#[derive(
    Debug, Clone, Serialize, Deserialize, PartialEq, DerivePartialModel, FromJsonQueryResult,
)]
#[sea_orm(entity = "Entity")]
pub struct Alert {
    pub id: Uuid,
    pub r#type: MessageType,
    pub audio: Option<String>,
    pub audio_volume: u32,
    pub image: Option<String>,
    pub alert_variant: AlertVariant,
    pub video: Option<String>,
    pub video_volume: u32,
    pub group_id: String,
    pub name: String,
    pub view_type: ViewType,
    pub status: bool,
    pub amount: u32,
    pub delay: u32,
    pub duration: u32,
    pub variation_conditions: AlertVariationConditions,
    pub tts_volume: u32,
    pub tts_type: TtsType,
    pub tts_settings: Option<TtsSettings>,
    pub title_style: TextStyle,
    pub title_template: String,
    pub message_style: TextStyle,
    pub reward_id: Option<Uuid>,
    pub command_id: Option<Uuid>,
}

#[derive(Debug, Clone, PartialEq, EnumIter, DeriveActiveEnum, Eq, Deserialize, Serialize)]
#[sea_orm(rs_type = "String", db_type = "Text")]
pub enum ViewType {
    #[sea_orm(string_value = "Top")]
    Top,
    #[sea_orm(string_value = "Bottom")]
    Bottom,
    #[sea_orm(string_value = "Left")]
    Left,
    #[sea_orm(string_value = "Right")]
    Right,
    #[sea_orm(string_value = "Overlay")]
    Overlay,
}

#[derive(Debug, Clone, PartialEq, EnumIter, DeriveActiveEnum, Eq, Deserialize, Serialize)]
#[sea_orm(rs_type = "String", db_type = "Text")]
pub enum AlertVariationConditions {
    #[sea_orm(string_value = "Random")]
    Random,
    #[sea_orm(string_value = "AmountIsGreater")]
    AmountIsGreater,
    #[sea_orm(string_value = "AmountIsEqual")]
    AmountIsEqual,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Eq, FromJsonQueryResult)]

pub struct TextStyle {
    pub font_size: u32,
    pub text_color: String,
    pub bold: bool,
    pub italics: bool,
    pub underline: bool,
    pub letter_spacing: u32,
    pub word_spacing: u32,
    pub animation: TextAnimation,
    pub animation_variant: TextAnimationVariant,
}

#[derive(Debug, Clone, PartialEq, EnumIter, DeriveActiveEnum, Eq, Deserialize, Serialize)]
#[sea_orm(rs_type = "String", db_type = "Text")]
pub enum AlertVariant {
    #[sea_orm(string_value = "ImageAndAudio")]
    ImageAndAudio,
    #[sea_orm(string_value = "Image")]
    Image,
    #[sea_orm(string_value = "Audio")]
    Audio,
    #[sea_orm(string_value = "Video")]
    Video,
}
#[derive(Debug, Clone, PartialEq, Eq, Deserialize, Serialize)]
pub enum TextAnimation {
    No,
}
#[derive(Debug, Clone, PartialEq, Eq, Deserialize, Serialize)]
pub enum TextAnimationVariant {
    AllText,
}

impl From<Alert> for ActiveModelEx {
    fn from(value: Alert) -> Self {
        ActiveModelEx {
            id: Set(value.id),
            r#type: Set(value.r#type),
            audio: Set(value.audio),
            audio_volume: Set(value.audio_volume),
            image: Set(value.image),
            alert_variant: Set(value.alert_variant),
            video: Set(value.video),
            video_volume: Set(value.video_volume),
            group_id: Set(value.group_id),
            name: Set(value.name),
            view_type: Set(value.view_type),
            status: Set(value.status),
            amount: Set(value.amount),
            delay: Set(value.delay),
            duration: Set(value.duration),
            variation_conditions: Set(value.variation_conditions),
            tts_settings: Set(value.tts_settings),
            tts_type: Set(value.tts_type),
            tts_volume: Set(value.tts_volume),
            title_style: Set(value.title_style),
            title_template: Set(value.title_template),
            message_style: Set(value.message_style),
            reward_id: Set(value.reward_id),
            reward: NotSet,
            command_id: Set(value.command_id),
            command: NotSet,
        }
    }
}

impl From<Option<Alert>> for ActiveModelEx {
    fn from(value: Option<Alert>) -> Self {
        match value {
            Some(alert) => alert.into(),
            None => Default::default(),
        }
    }
}

#[derive(Debug, Clone, PartialEq, EnumIter, DeriveActiveEnum, Serialize, Deserialize)]
#[sea_orm(rs_type = "String", db_type = "Text")]
pub enum TtsType {
    #[sea_orm(string_value = "Google")]
    Google,
    #[sea_orm(string_value = "Edge")]
    Edge,
}
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, FromJsonQueryResult)]
#[serde(untagged)]

pub enum TtsSettings {
    Edge(EdgeTtsSettings),
}
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct EdgeTtsSettings {
    pub gender: Gender,
}
#[derive(Debug, Clone, PartialEq, EnumIter, DeriveActiveEnum, Serialize, Deserialize)]
#[sea_orm(rs_type = "String", db_type = "Text")]
pub enum Gender {
    #[sea_orm(string_value = "Male")]
    Male,
    #[sea_orm(string_value = "Female")]
    Female,
}
