use entity::goals::GoalType;
use serde::Deserialize;

use crate::DonationSort;

#[derive(Debug, Deserialize)]
pub struct MessagesQuery {
    pub limit: u64,
    pub offset: u64,
    pub exclude_donations: bool,
    pub exclude_subscriptions: bool,
    pub exclude_follows: bool,
    pub exclude_raids: bool,
    pub exclude_redemptions: bool,
    pub exclude_commands_actions: bool,
    pub exclude_assistant_actions: bool,
}
#[derive(Debug, Deserialize)]
pub struct GoalsQuery {
    pub r#type: GoalType,
}

#[derive(Debug, Deserialize)]
pub struct DonationsQuery {
    pub from: Option<i64>,
    pub to: Option<i64>,
    pub limit: u64,
    pub sort: DonationSort,
}
