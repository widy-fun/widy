use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Serialize, Deserialize)]
#[sea_orm(table_name = "nsfw_settings")]
pub struct Model {
    #[sea_orm(primary_key)]
    pub id: u8,
    #[sea_orm(column_type = "JsonBinary")]
    pub labels_confidence: LabelsConfidence,
    pub blur_timeout_duration: u32,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {}

impl ActiveModelBehavior for ActiveModel {}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, Eq, FromJsonQueryResult)]
pub struct LabelsConfidence {
    pub anus: u32,
    pub make_love: u32,
    pub nipple: u32,
    pub penis: u32,
    pub vagina: u32,
}
