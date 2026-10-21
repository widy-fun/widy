use sea_orm::{DeriveActiveEnum, EnumIter, FromJsonQueryResult};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Default, PartialEq, Serialize, Deserialize, Eq, FromJsonQueryResult)]

pub struct Media {
    pub url: String,
    pub media_type: MediaType,
    pub expires: Option<u64>,
    pub temporary_src: Option<String>,
    pub title: Option<String>,
    pub thumbnail_url: Option<String>,
    pub duration: Option<u64>,
    pub view_count: Option<u64>,
}

#[derive(
    Debug, Clone, Default, PartialEq, EnumIter, DeriveActiveEnum, Serialize, Deserialize, Eq,
)]
#[sea_orm(rs_type = "String", db_type = "Text")]
pub enum MediaType {
    #[default]
    #[sea_orm(string_value = "Youtube")]
    Youtube,
    #[sea_orm(string_value = "Twitch")]
    Twitch,
    #[sea_orm(string_value = "TikTok")]
    TikTok,
    #[sea_orm(string_value = "Kick")]
    Kick,
}
