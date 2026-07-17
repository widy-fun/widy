use sea_orm::{entity::prelude::*, FromJsonQueryResult};
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Serialize, Deserialize)]
#[sea_orm(table_name = "services")]
pub struct Model {
    #[sea_orm(primary_key, auto_increment = false)]
    pub id: ServiceType,
    pub authorized: bool,
    #[sea_orm(column_type = "Json", nullable)]
    #[serde(skip_serializing_if = "Option::is_none")]
    pub settings: Option<ServiceSettings>,
    #[sea_orm(column_type = "Json", nullable)]
    #[serde(skip_serializing_if = "Option::is_none")]
    pub auth: Option<ServiceAuth>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {}

impl ActiveModelBehavior for ActiveModel {}

#[derive(Debug, Clone, PartialEq, EnumIter, DeriveActiveEnum, Serialize, Deserialize)]
#[sea_orm(rs_type = "String", db_type = "Text")]
pub enum ServiceType {
    #[sea_orm(string_value = "Streamelements")]
    Streamelements,
    #[sea_orm(string_value = "Twitch")]
    Twitch,
    #[sea_orm(string_value = "WidySol")]
    WidySol,
    #[sea_orm(string_value = "WidyTon")]
    WidyTon,
    #[sea_orm(string_value = "DonationAlerts")]
    DonationAlerts,
    #[sea_orm(string_value = "StreamLabs")]
    StreamLabs,
    #[sea_orm(string_value = "Donatello")]
    Donatello,
    #[sea_orm(string_value = "Donatik")]
    Donatik,
    #[sea_orm(string_value = "DonatePay")]
    DonatePay,
    #[sea_orm(string_value = "Destream")]
    Destream,
    #[sea_orm(string_value = "Tribute")]
    Tribute,
    #[sea_orm(string_value = "Kick")]
    Kick,
    #[sea_orm(string_value = "TwitchBot")]
    TwitchBot,
    #[sea_orm(string_value = "KickBot")]
    KickBot,
}
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, FromJsonQueryResult)]
#[serde(untagged)]

pub enum ServiceSettings {
    Twitch,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, FromJsonQueryResult)]
#[serde(untagged)]

pub enum ServiceAuth {
    Kick(KickAuth),
    Twitch(TwitchAuth),
    StreamElements(StreamElementsAuth),
    Widy(WidyAuth),
    DonationAlerts(DonationAlertsAuth),
    StreamLabs(StreamLabsAuth),
    DonatePay(DonatePayAuth),
    Destream(DestreamAuth),
    Tribute(TributeAuth),
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct WidyAuth {
    pub donation_account_name: String,
    pub donation_account_address: String,
    pub user: String,
}
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct DonationAlertsAuth {
    pub token: String,
}
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct TributeAuth {
    pub api_key: String,
}
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct DonatePayAuth {
    pub access_token: String,
}
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct DestreamAuth {
    pub overlayid: String,
}
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct StreamLabsAuth {
    pub jwt: String,
}
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct TwitchAuth {
    pub access_token: String,
    pub refresh_token: String,
    pub token_type: String,
    pub expires_in: u64,
    pub user_id: String,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct KickAuth {
    pub access_token: String,
    pub token_type: String,
    pub refresh_token: String,
    pub expires_in: u64,
    pub scope: String,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct StreamElementsAuth {
    pub jwt_token: String,
}
