use serde::{Deserialize, Serialize};

use crate::services::GrantType;

#[derive(Debug, Serialize)]
pub struct KickTokenExchangeBody {
    pub code: String,
    pub code_verifier: String,
    pub redirect_uri: String,
    pub app_token: String,
    pub grant_type: GrantType,
}

#[derive(Debug, Serialize)]
pub struct RefreshTokenBody {
    pub grant_type: GrantType,
    pub refresh_token: String,
    pub app_token: String,
}

#[derive(Debug, Clone, Serialize)]
pub struct PostChatMessageBody {
    pub broadcaster_user_id: u64,
    pub content: String,
    pub reply_to_message_id: Option<String>,
    pub r#type: PostChatMessageType,
}

#[derive(Debug, Clone, Serialize)]
#[allow(dead_code)]
pub enum PostChatMessageType {
    #[serde(rename = "user")]
    User,
    #[serde(rename = "bot")]
    Bot,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct AddKickRewardBody {
    pub title: String,
    pub description: Option<String>,
    pub cost: i64,
    pub background_color: Option<String>,
    pub is_user_input_required: bool,
    pub should_redemptions_skip_request_queue: Option<bool>,
    pub is_enabled: bool,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
pub struct EventPayload {
    pub chanel: Option<String>,
    pub data: String,
    pub event: Event,
}

#[derive(Debug, Clone, Deserialize)]
pub enum Event {
    #[serde(rename = "App\\Events\\ChatMessageEvent")]
    ChatMessageEvent,
    #[serde(rename = "pusher:pong")]
    PusherPong,
    #[serde(rename = "RewardRedeemedEvent")]
    RewardRedeemedEvent,
    #[serde(rename = "App\\Events\\StreamHostEvent")]
    StreamHostEvent,
    #[serde(rename = "GiftedSubscriptionsEvent")]
    GiftedSubscriptionsEvent,
    #[serde(rename = "KicksGifted")]
    KicksGifted,
    #[serde(rename = "App\\Events\\MessageDeletedEvent")]
    MessageDeletedEvent,
    #[serde(rename = "App\\Events\\StreamerIsLive")]
    StreamerIsLive,
    #[serde(rename = "App\\Events\\SubscriptionEvent")]
    SubscriptionEvent,
    #[serde(rename = "App\\Events\\StopStreamBroadcast")]
    StopStreamBroadcast,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
pub struct StopStreamBroadcastData {
    pub livestream: StopStreamBroadcastLivestream,
}
#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
pub struct StopStreamBroadcastLivestream {
    pub id: u64,
    pub channel: StopStreamBroadcastChanel,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
pub struct StopStreamBroadcastChanel {
    pub id: u64,
    pub is_banned: bool,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
pub struct SubscriptionData {
    pub chatroom_id: u64,
    pub username: String,
    pub months: u64,
}
#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
pub struct ChatMessageData {
    pub id: String,
    pub chatroom_id: u64,
    pub content: String,
    pub r#type: String,
    pub created_at: String,
    pub sender: MessageSender,
    pub metadata: Option<MessageMetadata>,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
pub struct RewardRedeemedData {
    pub reward_title: String,
    pub user_id: u64,
    pub channel_id: u64,
    pub username: String,
    pub user_input: Option<String>,
    pub reward_background_color: String,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
pub struct StreamHostData {
    pub chatroom_id: u64,
    pub number_viewers: u32,
    pub optional_message: Option<String>,
    pub host_username: String,
}
#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
pub struct GiftedSubscriptionsData {
    pub chatroom_id: u64,
    pub gifted_usernames: Vec<String>,
    pub gifter_username: String,
    pub gifted_total: u32,
    pub gifter_total: u32,
}
#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
pub struct KicksGiftedData {
    pub gift_transaction_id: String,
    pub message: String,
    pub sender: KicksSender,
    pub gift: Gift,
    pub created_at: String,
    pub expires_at: String,
}
#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
pub struct KicksSender {
    pub id: u64,
    pub username: String,
    pub username_color: String,
    pub profile_picture: String,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
pub struct Gift {
    pub gift_id: String,
    pub name: String,
    pub amount: u64,
    pub r#type: String,
    pub tier: String,
    pub character_limit: u32,
    pub pinned_time: u64,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
pub struct MessageDeletedData {
    pub id: String,
    pub message: DeletedMessage,
    #[serde(rename = "aiModerated")]
    pub ai_moderated: bool,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
pub struct DeletedMessage {
    pub id: String,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
pub struct StreamerIsLiveData {
    pub livestream: StreamerIsLiveLivestream,
}
#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
pub struct StreamerIsLiveLivestream {
    pub id: u64,
    pub channel_id: u64,
    pub session_title: String,
    pub source: Option<String>,
    pub created_at: String,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]

pub struct MessageSender {
    pub id: u64,
    pub username: String,
    pub slug: String,
    pub identity: Identity,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]

pub struct Identity {
    pub color: String,
    pub badges: Vec<Badge>,
    pub badges_v2: Vec<BadgeV2>,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
pub struct Badge {
    pub r#type: String,
    pub text: String,
    pub sort_order: u64,
    pub count: Option<u64>,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]

pub struct BadgeMetadata {
    pub level: Option<u32>,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]

pub struct MessageMetadata {
    pub message_ref: String,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]

pub struct BadgeV2 {
    pub name: String,
    pub badge_type: String,
    pub image_url: String,
    pub metadata: BadgeMetadata,
    pub selected: bool,
    pub sort_order: u32,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
pub struct ChanelInfoResponse {
    pub id: u64,
    pub user_id: u64,
    pub slug: String,
    pub subscriber_badges: Vec<SubscriberBadge>,
    pub is_banned: bool,
    pub user: User,
    pub chatroom: Chatroom,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
pub struct SubscriberBadge {
    pub id: u64,
    pub channel_id: u64,
    pub months: u64,
    pub badge_image: BadgeImage,
}
#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
pub struct BadgeImage {
    pub srcset: String,
    pub src: String,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
pub struct User {
    pub id: u64,
    pub username: String,
}
#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
pub struct Chatroom {
    pub id: u64,
    pub chatable_type: String,
    pub channel_id: u64,
    pub created_at: String,
    pub updated_at: String,
    pub chat_mode_old: String,
    pub chat_mode: String,
    pub slow_mode: bool,
    pub chatable_id: u64,
    pub followers_mode: bool,
    pub subscribers_mode: bool,
    pub emotes_mode: bool,
    pub message_interval: u64,
    pub following_min_duration: u64,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
pub struct UserInfoResponse {
    pub data: Vec<UserInfo>,
    pub message: String,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]

pub struct UserInfo {
    pub user_id: u64,
    pub name: String,
    pub email: String,
    pub profile_picture: String,
}

#[derive(Debug, Clone)]
pub struct KickAuthSession {
    pub state: String,
    pub code_verifier: String,
}
