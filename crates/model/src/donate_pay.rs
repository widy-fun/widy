use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct WidgetEvent {
    pub result: EventResult,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct EventResult {
    pub channel: String,
    pub data: EventData,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct EventData {
    pub data: InnerData,
    pub offset: u64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct InnerData {
    #[serde(rename = "type")]
    pub event_type: String,
    pub notification: EventNotification,
}
#[derive(Debug, Serialize, Deserialize)]
pub enum NotificationType {
    #[serde(rename = "donation")]
    Donation,
    Any,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct EventNotification {
    #[serde(rename = "type")]
    pub notification_type: NotificationType,
    pub user_id: u64,
    pub vars: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct EventVars {
    pub name: String,
    pub comment: Option<String>,
    pub sum: f64,
    pub target: String,
    pub video_link: String,
    pub video_id: String,
}

#[derive(Deserialize)]
pub struct TokenResponse {
    pub token: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserInfoResponse {
    pub status: String,
    pub time: String,
    pub data: UserInfo,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserInfo {
    pub id: u64,
    pub name: String,
    pub avatar: String,
    pub balance: u64,
    pub cashout_sum: u64,
}
