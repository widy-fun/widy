use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Serialize, Deserialize)]
#[sea_orm(table_name = "settings")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: u8,
    pub moderation_duration: u32,
    pub alert_paused: bool,
    pub tts_volume: u32,
    pub remove_links: bool,
    pub black_list: String,
    pub language: String,
    pub currency: Currency,
    pub tts_type: TtsType,
    pub tts_settings: Option<TtsSettings>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {}

impl ActiveModelBehavior for ActiveModel {}

#[derive(Debug, Clone, PartialEq, EnumIter, Eq, DeriveActiveEnum, Serialize, Deserialize)]
#[sea_orm(rs_type = "String", db_type = "Text")]
pub enum Currency {
    #[sea_orm(string_value = "UAH")]
    UAH,
    #[sea_orm(string_value = "RUB")]
    RUB,
    #[sea_orm(string_value = "EUR")]
    EUR,
    #[sea_orm(string_value = "USD")]
    USD,
    #[sea_orm(string_value = "NONE")]
    NONE,
}

impl Currency {
    pub fn as_str(&self) -> &str {
        match self {
            Currency::UAH => "UAH",
            Currency::RUB => "RUB",
            Currency::EUR => "EUR",
            Currency::USD => "USD",
            Currency::NONE => "NONE",
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
