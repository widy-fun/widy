use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

#[sea_orm::model]
#[derive(Clone, Debug, PartialEq, DeriveEntityModel, Serialize, Deserialize)]
#[sea_orm(table_name = "messages")]
pub struct Model {
    #[sea_orm(primary_key, auto_increment = false)]
    pub id: Uuid,
    pub r#type: MessageType,
    pub created_at: i64,
    #[sea_orm(has_one)]
    pub donation: HasOne<super::donations::Entity>,
    #[sea_orm(has_one)]
    pub follow: HasOne<super::followers::Entity>,
    #[sea_orm(has_one)]
    pub subscription: HasOne<super::subscriptions::Entity>,
    #[sea_orm(has_one)]
    pub raid: HasOne<super::raids::Entity>,
    #[sea_orm(has_one)]
    pub redemption: HasOne<super::redemptions::Entity>,
    #[sea_orm(has_one)]
    pub command_action: HasOne<super::commands_actions::Entity>,
}

impl ActiveModelBehavior for ActiveModel {}

#[derive(Debug, Clone, PartialEq, EnumIter, DeriveActiveEnum, Serialize, Deserialize, Eq)]
#[sea_orm(rs_type = "String", db_type = "Text")]
pub enum MessageType {
    #[sea_orm(string_value = "Donation")]
    Donation,
    #[sea_orm(string_value = "Subscription")]
    Subscription,
    #[sea_orm(string_value = "Follow")]
    Follow,
    #[sea_orm(string_value = "Raid")]
    Raid,
    #[sea_orm(string_value = "Redemption")]
    Redemption,
    #[sea_orm(string_value = "CommandAction")]
    CommandAction,
}

#[derive(Debug, Clone, Serialize, Deserialize, DerivePartialModel)]
#[sea_orm(entity = "Entity")]

pub struct ClientMessage {
    pub id: Uuid,
    pub r#type: MessageType,
    pub created_at: i64,
    #[sea_orm(nested)]
    #[serde(skip_serializing_if = "Option::is_none")]
    pub donation: Option<super::donations::Donation>,
    #[sea_orm(nested)]
    #[serde(skip_serializing_if = "Option::is_none")]
    pub follow: Option<super::followers::Follow>,
    #[sea_orm(nested)]
    #[serde(skip_serializing_if = "Option::is_none")]
    pub subscription: Option<super::subscriptions::Subscription>,
    #[sea_orm(nested)]
    #[serde(skip_serializing_if = "Option::is_none")]
    pub raid: Option<super::raids::Raid>,
    #[sea_orm(nested)]
    #[serde(skip_serializing_if = "Option::is_none")]
    pub redemption: Option<super::redemptions::Redemption>,
    #[sea_orm(nested)]
    #[serde(skip_serializing_if = "Option::is_none")]
    pub command_action: Option<super::commands_actions::CommandAction>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]

pub struct MessagesFilter {
    pub exclude_follows: bool,
    pub exclude_subscriptions: bool,
    pub exclude_donations: bool,
    pub exclude_raids: bool,
    pub exclude_redemptions: bool,
    pub exclude_commands_actions: bool,
}
