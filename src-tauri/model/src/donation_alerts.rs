use entity::settings::Currency;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Deserialize)]
#[serde(untagged)]
pub enum WebsocketMessage {
    Client(ClientMessage),
    Donation(DonationMessage),
}
#[derive(Debug, Clone, Deserialize)]
pub struct ClientMessage {
    pub result: ClientMessageResult,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct DonationMessage {
    pub result: DonationMessageResult,
}
#[derive(Debug, Clone, Deserialize)]
pub struct ClientMessageResult {
    pub client: String,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
#[allow(dead_code)]
pub struct DonationMessageResult {
    pub channel: String,
    pub data: DonationMessageData,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
#[allow(dead_code)]
pub struct DonationMessageData {
    pub seq: u64,
    pub data: Donation,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
#[allow(dead_code)]
pub struct Donation {
    pub id: u64,
    pub name: String,
    pub username: Option<String>,
    pub message: Option<String>,
    pub message_type: String,
    pub payin_system: Option<String>,
    pub amount: f64,
    pub amount_in_user_currency: f64,
    pub currency: Currency,
    pub recipient_name: String,
    pub is_shown: u8,
}

#[derive(Debug, Clone, Deserialize)]
pub struct ChannelsResponse {
    pub channels: Vec<Channel>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct Channel {
    pub channel: String,
    pub token: String,
}
#[derive(Debug, Clone, Deserialize)]
pub struct UserInfoResponse {
    pub data: UserInfo,
}
#[derive(Debug, Clone, Serialize)]
pub struct SubscriptionBody {
    pub channels: Vec<String>,
    pub client: String,
}
#[derive(Debug, Clone, Deserialize)]
pub struct UserInfo {
    pub id: u64,
    pub socket_connection_token: String,
}
#[derive(Debug, Clone, Deserialize)]
pub struct AuthTokenResponse {
    pub data: AuthToken,
}
#[derive(Debug, Clone, Deserialize)]
pub struct AuthToken {
    pub token: String,
}
