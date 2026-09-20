#![allow(dead_code)]
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize)]
pub struct SendChatMessageBody {
    pub broadcaster_id: String,
    pub sender_id: String,
    pub message: String,
    pub reply_parent_message_id: Option<String>,
    pub for_source_only: Option<bool>,
    pub pin: Option<bool>,
}
#[derive(Debug, Clone, Serialize)]
pub struct SendChatAnnouncementBody {
    pub message: String,
    pub color: Option<String>,
    pub for_source_only: Option<bool>,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct BadgeInfoResponse {
    pub data: Vec<BadgeInfo>,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct BadgeInfo {
    pub set_id: String,
    pub versions: Vec<BadgeVersion>,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct BadgeVersion {
    pub id: String,
    pub image_url_1x: String,
    pub image_url_2x: String,
    pub image_url_4x: String,
    pub title: String,
    pub description: String,
    pub click_action: Option<String>,
    pub click_url: Option<String>,
}
pub enum WebSocketInstruction {
    SessionWelcome(String),
    Continue,
    Reconnect(String),
    Notification(NotificationMessage),
    Revocation,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct SubscriptionRequestBody {
    pub r#type: String,
    pub version: String,
    pub condition: Condition,
    pub transport: Transport,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct AddTwitchRewardBody {
    pub title: String,
    pub prompt: Option<String>,
    pub cost: i64,
    pub background_color: Option<String>,
    pub is_user_input_required: bool,
    pub is_enabled: bool,
    pub is_max_per_stream_enabled: Option<bool>,
    pub max_per_stream: Option<i64>,
    pub is_max_per_user_per_stream_enabled: Option<bool>,
    pub max_per_user_per_stream: Option<i64>,
    pub is_global_cooldown_enabled: Option<bool>,
    pub global_cooldown_seconds: Option<i64>,
    pub should_redemptions_skip_request_queue: Option<bool>,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
#[serde(untagged)]
pub enum Condition {
    Follow(FollowCondition),
    ChannelPointsCustomRewardRedemptionAdd(ChannelPointsCustomRewardRedemptionAddCondition),
    Raid(RaidCondition),
    Cheer(CheerCondition),
    Subscription(SubscriptionCondition),
    Redemption(RedemptionCondition),
    ChatMessage(ChatMessageCondition),
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct ChatMessageCondition {
    pub broadcaster_user_id: String,
    pub user_id: String,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct RedemptionCondition {
    pub broadcaster_user_id: String,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct SubscriptionCondition {
    pub broadcaster_user_id: String,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct ChannelPointsCustomRewardRedemptionAddCondition {
    pub broadcaster_user_id: String,
    pub reward_id: String,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct FollowCondition {
    pub broadcaster_user_id: String,
    pub moderator_user_id: String,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct RaidCondition {
    pub to_broadcaster_user_id: String,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct CheerCondition {
    pub broadcaster_user_id: String,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct TwitchDeviceCodeResponse {
    pub device_code: String,
    pub user_code: String,
    pub verification_uri: String,
    pub expires_in: u32,
    pub interval: u32,
}

#[derive(Deserialize, Debug)]

pub struct TwitchBadResponse {
    pub error: Option<String>,
    pub status: u16,
    pub message: String,
}
#[derive(Deserialize, Debug)]

pub struct TwitchTokenResponse {
    pub access_token: String,
    pub refresh_token: String,
    pub expires_in: u64,
    pub scope: Vec<String>,
    pub token_type: String,
}
#[derive(Deserialize, Debug)]

pub struct TwitchRefreshTokenResponse {
    pub access_token: String,
    pub refresh_token: String,
    pub scope: Vec<String>,
    pub token_type: String,
}

#[derive(Deserialize, Debug)]

pub struct TwitchUsersResponse {
    pub data: Vec<TwitchUser>,
}
#[derive(Deserialize, Debug, Clone)]

pub struct TwitchUser {
    pub id: String,
    pub login: String,
    pub display_name: String,
    pub r#type: String,
    pub broadcaster_type: String,
    pub description: String,
    pub profile_image_url: String,
    pub offline_image_url: String,
    pub view_count: u64,
    pub email: String,
    pub created_at: String,
}
#[derive(Deserialize, Debug, Clone)]

pub struct TwitchTokenInfo {
    pub client_id: String,
    pub login: String,
    pub user_id: String,
    pub expires_in: u32,
    pub scopes: Vec<String>,
}

#[derive(Debug, Deserialize)]
pub struct NotificationMessage {
    pub metadata: Metadata,
    pub payload: Payload,
}

#[derive(Debug, Deserialize)]

pub struct Metadata {
    pub message_type: String,
    pub message_id: String,
    pub message_timestamp: String,
    pub subscription_type: Option<String>,
    pub subscription_version: Option<String>,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct SessionPayload {
    pub session: SessionDetails,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Transport {
    pub method: String,
    pub session_id: String,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
#[serde(untagged)]

pub enum Event {
    ChannelChatMessage(ChannelChatMessageEvent),
    ChannelPointsCustomRewardRedemptionAdd(ChannelPointsCustomRewardRedemptionAddEvent),
    SubscriptionMessage(SubscriptionMessageEvent),
    SubscriptionGift(SubscriptionGiftEvent),
    Cheer(CheerEvent),
    Subscribe(SubscribeEvent),
    Follow(FollowEvent),
    Raid(RaidEvent),
    ChannelChatMessageDelete(ChannelChatMessageDeleteEvent),
    ChannelChatClearUserMessages(ChannelChatClearUserMessagesEvent),
}
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct ChannelChatMessageDeleteEvent {
    pub broadcaster_user_id: String,
    pub broadcaster_user_name: String,
    pub broadcaster_user_login: String,
    pub target_user_id: String,
    pub target_user_name: String,
    pub target_user_login: String,
    pub message_id: String,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
/// 20 fields
pub struct ChannelChatMessageEvent {
    pub broadcaster_user_id: String,
    pub broadcaster_user_name: String,
    pub broadcaster_user_login: String,
    pub chatter_user_id: String,
    pub chatter_user_login: String,
    pub chatter_user_name: String,
    pub message_id: String,
    pub message: ChatMessage,
    pub color: String,
    pub badges: Vec<Badge>,
    pub message_type: String,
    pub cheer: Option<Cheer>,
    pub reply: Option<Reply>,
    pub channel_points_custom_reward_id: Option<String>,
    pub source_broadcaster_user_id: Option<String>,
    pub source_broadcaster_user_name: Option<String>,
    pub source_broadcaster_user_login: Option<String>,
    pub source_message_id: Option<String>,
    pub source_badges: Option<Vec<Badge>>,
    pub is_source_only: Option<bool>,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Reply {
    pub parent_message_id: String,
    pub parent_message_body: String,
    pub parent_user_id: String,
    pub parent_user_name: String,
    pub parent_user_login: String,
    pub thread_message_id: String,
    pub thread_user_id: String,
    pub thread_user_name: String,
    pub thread_user_login: String,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Cheer {
    pub bits: u64,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct ChatMessage {
    pub text: String,
    pub fragments: Vec<Fragment>,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Badge {
    pub set_id: String,
    pub id: String,
    pub info: String,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Fragment {
    pub r#type: String,
    pub text: String,
    pub cheermote: Option<Cheermote>,
    pub emote: Option<Emote>,
    pub mention: Option<Mention>,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Cheermote {
    pub prefix: String,
    pub bits: u64,
    pub tier: u64,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Emote {
    pub id: String,
    pub emote_set_id: String,
    pub owner_id: String,
    pub format: Vec<String>,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Mention {
    pub user_id: String,
    pub user_name: String,
    pub user_login: String,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
/// 6 fields
pub struct ChannelChatClearUserMessagesEvent {
    pub broadcaster_user_id: String,
    pub broadcaster_user_name: String,
    pub broadcaster_user_login: String,
    pub target_user_id: String,
    pub target_user_name: String,
    pub target_user_login: String,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
/// 7 fields
pub struct RaidEvent {
    pub from_broadcaster_user_id: String,
    pub from_broadcaster_user_login: String,
    pub from_broadcaster_user_name: String,
    pub to_broadcaster_user_id: String,
    pub to_broadcaster_user_login: String,
    pub to_broadcaster_user_name: String,
    pub viewers: u32,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
/// 9 fields
pub struct CheerEvent {
    pub is_anonymous: bool,
    pub user_id: Option<String>,    // null if is_anonymous=true
    pub user_login: Option<String>, // null if is_anonymous=true
    pub user_name: Option<String>,  // null if is_anonymous=true
    pub broadcaster_user_id: String,
    pub broadcaster_user_login: String,
    pub broadcaster_user_name: String,
    pub message: Option<String>,
    pub bits: u64,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
/// 7 fields
pub struct FollowEvent {
    pub user_id: String,
    pub user_login: String,
    pub user_name: String,
    pub broadcaster_user_id: String,
    pub broadcaster_user_login: String,
    pub broadcaster_user_name: String,
    pub followed_at: String,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
/// 11 fields
pub struct SubscriptionMessageEvent {
    pub user_id: String,
    pub user_login: String,
    pub user_name: String,
    pub broadcaster_user_id: String,
    pub broadcaster_user_login: String,
    pub broadcaster_user_name: String,
    pub tier: String,
    pub message: SubscriptionMessage,
    pub cumulative_months: u32,
    pub streak_months: Option<u32>, // null if not shared
    pub duration_months: u32,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct SubscriptionMessage {
    pub text: String,
    // emotes
}
#[derive(Debug, Clone, Deserialize, Serialize)]
/// 10 fields
pub struct SubscriptionGiftEvent {
    pub user_id: String,
    pub user_login: String,
    pub user_name: String,
    pub broadcaster_user_id: String,
    pub broadcaster_user_login: String,
    pub broadcaster_user_name: String,
    pub tier: String,
    pub total: u32,
    pub cumulative_total: Option<u32>, //null if anonymous or not shared by the user
    pub is_anonymous: bool,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
/// 8 fields
pub struct SubscribeEvent {
    pub user_id: String,
    pub user_login: String,
    pub user_name: String,
    pub broadcaster_user_id: String,
    pub broadcaster_user_login: String,
    pub broadcaster_user_name: String,
    pub tier: String,
    pub is_gift: bool,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
/// 11 fields
pub struct ChannelPointsCustomRewardRedemptionAddEvent {
    pub id: String,
    pub user_id: String,
    pub user_login: String,
    pub user_name: String,
    pub user_input: Option<String>,
    pub broadcaster_user_id: String,
    pub broadcaster_user_login: String,
    pub broadcaster_user_name: String,
    pub status: ChannelPointsCustomRewardRedemptionStatus,
    pub reward: Reward,
    pub redeemed_at: String,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
pub enum ChannelPointsCustomRewardRedemptionStatus {
    #[serde(rename = "unfulfilled")]
    Unfulfilled,
    #[serde(rename = "unknown")]
    Unknown,
    #[serde(rename = "fulfilled")]
    Fulfilled,
    #[serde(rename = "canceled")]
    Canceled,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct EventPayload {
    pub subscription: Subscription,
    pub event: Event,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Reward {
    pub id: String,
    pub title: String,
    pub cost: i64,
    pub prompt: Option<String>,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct Subscription {
    pub id: String,
    pub status: String,
    pub r#type: SubscriptionType,
    pub version: String,
    pub cost: u8,
    pub condition: Condition,
    pub transport: Transport,
    pub created_at: String,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
pub enum SubscriptionType {
    #[serde(rename = "channel.channel_points_custom_reward_redemption.add")]
    ChannelPointsCustomRewardRedemptionAdd,
    #[serde(rename = "channel.subscribe")]
    ChannelSubscribe,
    #[serde(rename = "channel.follow")]
    ChannelFollow,
    #[serde(rename = "channel.subscription.gift")]
    ChannelSubscriptionGift,
    #[serde(rename = "channel.subscription.message")]
    ChannelSubscriptionMessage,
    #[serde(rename = "channel.cheer")]
    ChannelCheer,
    #[serde(rename = "channel.raid")]
    ChannelRaid,
    #[serde(rename = "channel.chat.message")]
    ChannelChatMessage,
    #[serde(rename = "channel.chat.message_delete")]
    ChannelChatMessageDelete,
    #[serde(rename = "channel.chat.clear_user_messages")]
    ChannelChatClearUserMessages,
    #[serde(other)]
    Unknown,
}

impl SubscriptionType {
    pub fn to_string(t: SubscriptionType) -> String {
        match t {
            SubscriptionType::ChannelPointsCustomRewardRedemptionAdd => {
                "channel.channel_points_custom_reward_redemption.add".to_string()
            }
            SubscriptionType::ChannelSubscribe => "channel.subscribe".to_string(),
            SubscriptionType::ChannelFollow => "channel.follow".to_string(),
            SubscriptionType::ChannelSubscriptionGift => "channel.subscription.gift".to_string(),
            SubscriptionType::ChannelSubscriptionMessage => {
                "channel.subscription.message".to_string()
            }
            SubscriptionType::ChannelCheer => "channel.cheer".to_string(),
            SubscriptionType::ChannelRaid => "channel.raid".to_string(),
            SubscriptionType::ChannelChatMessage => "channel.chat.message".to_string(),
            SubscriptionType::ChannelChatMessageDelete => "channel.chat.message_delete".to_string(),
            SubscriptionType::ChannelChatClearUserMessages => {
                "channel.chat.clear_user_messages".to_string()
            }
            SubscriptionType::Unknown => "unknown".to_string(),
        }
    }
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct SessionDetails {
    pub id: String,
    pub keepalive_timeout_seconds: Option<u64>,
    pub status: Option<String>,
    pub connected_at: String,
    pub reconnect_url: Option<String>,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
#[serde(untagged)]
pub enum Payload {
    Welcome(SessionPayload),
    Reconnect(SessionPayload),
    Event(EventPayload),
    Generic(serde_json::Value),
}

#[derive(Debug, Clone, Serialize)]
pub struct BanUserBody {
    pub data: BanUserData,
}
#[derive(Debug, Clone, Serialize)]
pub struct BanUserData {
    pub user_id: String,
    pub duration: Option<u64>,
    pub reason: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BannedUsersResponse {
    pub data: Vec<BannedUser>,
    pub pagination: Pagination,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct BannedUser {
    pub user_id: String,
    pub user_login: String,
    pub user_name: String,
    pub expires_at: String,
    pub created_at: String,
    pub reason: String,
    pub moderator_id: String,
    pub moderator_login: String,
    pub moderator_name: String,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Pagination {
    pub cursor: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ChattersResponse {
    pub data: Vec<Chatter>,
    pub pagination: Pagination,
    pub total: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Chatter {
    pub user_id: String,
    pub user_login: String,
    pub user_name: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct ModifyChannelInformationBody {
    pub id: Option<String>,
    pub is_enabled: Option<bool>,
    pub game_id: Option<String>,
    pub broadcaster_language: Option<String>,
    pub title: Option<String>,
    pub delay: Option<u32>,
    pub tags: Option<Vec<String>>,
    pub content_classification_labels: Option<Vec<String>>,
    pub is_branded_content: Option<bool>,
}

#[derive(Debug, Clone, Default, Serialize)]
pub struct UpdateChatSettingsBody {
    pub emote_mode: Option<bool>,
    pub follower_mode: Option<bool>,
    pub follower_mode_duration: Option<u32>,
    pub non_moderator_chat_delay: Option<bool>,
    pub non_moderator_chat_delay_duration: Option<u32>,
    pub slow_mode: Option<bool>,
    pub slow_mode_wait_time: Option<u32>,
    pub subscriber_mode: Option<bool>,
    pub unique_chat_mode: Option<bool>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct GetTopGamesResponse {
    pub data: Vec<Game>,
    pub pagination: Pagination,
}

#[derive(Debug, Clone, Deserialize)]
pub struct Game {
    pub id: String,
    pub name: String,
    pub box_art_url: String,
    pub igdb_id: String,
}

#[derive(Debug, Clone, Deserialize)]
pub struct SearchCategoriesResponse {
    pub data: Vec<SearchCategory>,
    pub pagination: Pagination,
}

#[derive(Debug, Clone, Deserialize)]
pub struct SearchCategory {
    pub id: String,
    pub name: String,
    pub box_art_url: String,
}

#[derive(Debug, Clone, Serialize)]
pub struct CreatePollBody {
    pub broadcaster_id: String,
    pub title: String,
    pub choices: Vec<PollChoice>,
    pub duration: u32,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub channel_points_voting_enabled: Option<bool>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub channel_points_per_vote: Option<u32>,
}

#[derive(Debug, Clone, Serialize)]
pub struct PollChoice {
    pub title: String,
}

#[derive(Debug, Clone, Serialize)]
pub struct EndPollBody {
    pub broadcaster_id: String,
    pub id: String,
    pub status: String,
}

#[derive(Debug, Clone, Serialize)]
pub struct CreatePredictionBody {
    pub broadcaster_id: String,
    pub title: String,
    pub outcomes: Vec<PredictionOutcome>,
    pub prediction_window: u32,
}

#[derive(Debug, Clone, Serialize)]
pub struct PredictionOutcome {
    pub title: String,
}

#[derive(Debug, Clone, Serialize)]
pub struct EndPredictionBody {
    pub broadcaster_id: String,
    pub id: String,
    pub status: String,
    pub winning_outcome_id: Option<String>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct CreatePredictionResponse {
    pub data: Vec<Prediction>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct Prediction {
    pub id: String,
    pub broadcaster_id: String,
    pub broadcaster_name: String,
    pub broadcaster_login: String,
    pub title: String,
    pub winning_outcome_id: Option<String>,
    pub outcomes: Vec<PredictionOutcomeResponse>,
    pub prediction_window: u32,
    pub status: String,
    pub created_at: String,
    pub ended_at: Option<String>,
    pub locked_at: Option<String>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct PredictionOutcomeResponse {
    pub id: String,
    pub title: String,
    pub users: u32,
    pub channel_points: u32,
    pub top_predictors: Vec<PredictionTopPredictor>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct PredictionTopPredictor {
    pub user_id: String,
    pub user_name: String,
    pub user_login: String,
    pub channel_points_used: u32,
    pub channel_points_won: u32,
}

#[derive(Debug, Clone, Deserialize)]
pub struct CreatePollResponse {
    pub data: Vec<Poll>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct Poll {
    pub id: String,
    pub broadcaster_id: String,
    pub broadcaster_name: String,
    pub broadcaster_login: String,
    pub title: String,
    pub choices: Vec<CreatedPollChoice>,
    pub bits_voting_enabled: bool,
    pub bits_per_vote: u32,
    pub channel_points_voting_enabled: bool,
    pub channel_points_per_vote: u32,
    pub status: PollStatus,
    pub duration: u32,
    pub started_at: String,
    pub ended_at: Option<String>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct CreatedPollChoice {
    pub id: String,
    pub title: String,
    pub votes: u32,
    pub channel_points_votes: u32,
    pub bits_votes: u32,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "UPPERCASE")]
pub enum PollStatus {
    Active,
    Completed,
    Terminated,
    Archived,
    Moderated,
    Invalid,
}
