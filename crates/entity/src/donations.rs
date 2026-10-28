use crate::{media::Media, services::ServiceType, settings::Currency};
use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

#[sea_orm::model]
#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Serialize, Deserialize)]
#[sea_orm(table_name = "donations")]

pub struct Model {
    #[sea_orm(primary_key, auto_increment = false)]
    pub id: Uuid,
    pub service_id: String,
    #[sea_orm(uniq)]
    pub message_id: Uuid,
    pub amount: f64,
    pub user_name: String,
    pub currency: Currency,
    pub text: Option<String>,
    pub audio: Option<String>,
    pub service: ServiceType,
    #[sea_orm(column_type = "JsonBinary")]
    pub media: Option<Media>,
    pub played: bool,
    pub exchanged_amount: Option<f64>,
    pub exchanged_currency: Option<Currency>,
    pub created_at: i64,
    #[sea_orm(belongs_to, from = "message_id", to = "id")]
    pub message: HasOne<super::messages::Entity>,
    #[sea_orm(column_type = "JsonBinary")]
    pub alert: Option<super::alerts::Alert>,
}

#[derive(Debug, Clone, Serialize, Deserialize, DerivePartialModel)]
#[sea_orm(entity = "Entity")]
pub struct Donation {
    pub id: Uuid,
    pub service_id: String,
    pub message_id: Uuid,
    pub amount: f64,
    pub user_name: String,
    pub currency: Currency,
    pub text: Option<String>,
    pub audio: Option<String>,
    pub service: ServiceType,
    pub media: Option<Media>,
    pub played: bool,
    pub exchanged_amount: Option<f64>,
    pub exchanged_currency: Option<Currency>,
    pub created_at: i64,
    pub alert: Option<super::alerts::Alert>,
}

impl ActiveModelBehavior for ActiveModel {}
