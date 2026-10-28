#![allow(dead_code)]
use entity::rewards::Platform;
use serde::{Deserialize, Serialize};
use serde_json::Value;

use crate::{
    GrantType,
    events::{
        ChatFragment, ChatMessageType, FragmentKind, ReplyInfo, SenderRoles, UnifiedBadge,
        UnifiedChatMessage, UnifiedChatMessageDelete, UnifiedContent, UnifiedMetadata,
        UnifiedSender,
    },
};

#[derive(Debug, Deserialize, Serialize)]
pub struct KickTokenExchangeBody {
    pub code: String,
    pub code_verifier: String,
    pub redirect_uri: String,
    pub app_token: String,
    pub grant_type: GrantType,
}

#[derive(Debug, Deserialize, Serialize)]
pub struct RefreshTokenBody {
    pub grant_type: GrantType,
    pub refresh_token: String,
    pub app_token: String,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct PostChatMessageBody {
    pub broadcaster_user_id: u64,
    pub content: String,
    pub reply_to_message_id: Option<String>,
    pub r#type: PostChatMessageType,
}

#[derive(Debug, Clone, Deserialize, Serialize)]

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

#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct KickPushMessage {
    pub push: KickPub,
}
#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct KickPub {
    pub r#pub: KickPubData,
}
#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct KickPubData {
    pub data: EventPayload,
}
#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct EventPayload {
    pub chanel: Option<String>,
    pub data: String,
    pub event: Event,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub enum Event {
    #[serde(rename = "App\\Events\\ChatMessageEvent")]
    ChatMessageEvent,
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
    #[serde(rename = "App\\Events\\UserBannedEvent")]
    UserBannedEvent,
    #[serde(other)]
    Unknown,
}

#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct StopStreamBroadcastData {
    pub livestream: StopStreamBroadcastLivestream,
}
#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct StopStreamBroadcastLivestream {
    pub id: u64,
    pub channel: StopStreamBroadcastChanel,
}

#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct StopStreamBroadcastChanel {
    pub id: u64,
    pub is_banned: bool,
}

#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct SubscriptionData {
    pub chatroom_id: u64,
    pub username: String,
    pub months: u64,
}
#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct ChatMessageData {
    pub id: String,
    pub chatroom_id: u64,
    pub content: String,
    pub r#type: String,
    pub created_at: String,
    pub sender: MessageSender,
    pub metadata: Option<MessageMetadata>,
}

#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct RewardRedeemedData {
    pub reward_title: String,
    pub user_id: u64,
    pub channel_id: u64,
    pub username: String,
    pub user_input: Option<String>,
    pub reward_background_color: String,
}

#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct StreamHostData {
    pub chatroom_id: u64,
    pub number_viewers: u32,
    pub optional_message: Option<String>,
    pub host_username: String,
}
#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct GiftedSubscriptionsData {
    pub chatroom_id: u64,
    pub gifted_usernames: Vec<String>,
    pub gifter_username: String,
    pub gifted_total: u32,
    pub gifter_total: u32,
}
#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct KicksGiftedData {
    pub gift_transaction_id: String,
    pub message: String,
    pub sender: KicksSender,
    pub gift: Gift,
    pub created_at: String,
    pub expires_at: String,
}
#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct KicksSender {
    pub id: u64,
    pub username: String,
    pub username_color: String,
    pub profile_picture: String,
}

#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct Gift {
    pub gift_id: String,
    pub name: String,
    pub amount: u64,
    pub r#type: String,
    pub tier: String,
    pub character_limit: u32,
    pub pinned_time: u64,
}

#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct MessageDeletedData {
    pub id: String,
    pub message: DeletedMessage,
    #[serde(rename = "aiModerated")]
    pub ai_moderated: bool,
}

#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct DeletedMessage {
    pub id: String,
}

#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct StreamerIsLiveData {
    pub livestream: StreamerIsLiveLivestream,
}
#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct StreamerIsLiveLivestream {
    pub id: u64,
    pub channel_id: u64,
    pub session_title: String,
    pub source: Option<String>,
    pub created_at: String,
}

#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct MessageSender {
    pub id: u64,
    pub username: String,
    pub slug: String,
    pub identity: Identity,
}

#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct Identity {
    pub color: String,
    pub badges: Vec<Badge>,
    pub badges_v2: Vec<BadgeV2>,
}

#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct Badge {
    pub r#type: String,
    pub text: String,
    pub sort_order: u64,
    pub count: Option<u64>,
}

#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct BadgeMetadata {
    pub level: Option<u32>,
}

#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct MessageMetadata {
    pub message_ref: String,
    pub original_message: Option<OriginalMessage>,
    pub original_sender: Option<OriginalSender>,
}

#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct OriginalMessage {
    pub id: String,
    pub content: String,
}
#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct OriginalSender {
    pub id: u64,
    pub username: String,
}

#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct BadgeV2 {
    pub name: String,
    pub badge_type: String,
    pub image_url: String,
    pub metadata: Option<BadgeMetadata>,
    pub selected: bool,
    pub sort_order: u32,
}

#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct ChanelInfoResponse {
    pub id: u64,
    pub user_id: u64,
    pub slug: String,
    pub subscriber_badges: Vec<SubscriberBadge>,
    pub is_banned: bool,
    pub user: User,
    pub chatroom: Chatroom,
}

#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct SubscriberBadge {
    pub id: u64,
    pub channel_id: u64,
    pub months: u64,
    pub badge_image: BadgeImage,
}
#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct BadgeImage {
    pub srcset: String,
    pub src: String,
}

#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct User {
    pub id: u64,
    pub username: String,
}
#[derive(Debug, Clone, Deserialize, Serialize)]

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

#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct UserInfoResponse {
    pub data: Vec<UserInfo>,
    pub message: String,
}

#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct UserInfo {
    pub user_id: u64,
    pub name: String,
    pub email: String,
    pub profile_picture: String,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct KickAuthSession {
    pub state: String,
    pub code_verifier: String,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct BanUserBody {
    pub broadcaster_user_id: u64,
    pub duration: Option<u64>,
    pub reason: Option<String>,
    pub user_id: u64,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct RealtimeAuthConnectionBody {
    pub client_id: String,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct RealtimeAuthConnectionResponse {
    pub data: RealtimeAuthConnectionResponseData,
    pub message: String,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct RealtimeAuthConnectionResponseData {
    pub token: String,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct UnbanUserBody {
    pub broadcaster_user_id: u64,
    pub user_id: u64,
}

#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct ActiveChattersResponse {
    pub data: ActiveChatters,
    pub message: String,
}
#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct ActiveChatters {
    pub chatters: Vec<Chatter>,
    pub moderators: Vec<Chatter>,
    pub ogs: Vec<Chatter>,
    pub vips: Vec<Chatter>,
    pub bots: Vec<Chatter>,
    pub total_count: u64,
}
#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct Chatter {
    pub profile_picture: String,
    pub slug: String,
    pub username: String,
}

#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct BanInfo {
    pub banned_user: BannedUser,
    pub banned_by: BannedBy,
    pub ban: Ban,
}

#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct BannedUser {
    pub id: u64,
    pub username: String,
}

#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct BannedBy {
    pub id: u64,
    pub username: String,
}
#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct Ban {
    pub reason: String,
    pub banned_at: String,
    pub expires_at: String,
    pub permanent: bool,
}
#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct ChatCommandBody {
    pub command: String,
}
#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct SendMessageBody {
    pub r#type: String,
    pub content: String,
    pub message_ref: String,
}

#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct SendMessageResponse {
    pub data: Value,
}

#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct PinMessageBody {
    pub duration: u32,
    pub message: Value,
}

#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct CategoriesResponse {
    pub data: Vec<Categories>,
    pub message: String,
    pub pagination: Pagination,
}
#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct Pagination {
    pub next_cursor: String,
}

#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct Categories {
    pub id: u64,
    pub name: String,
    pub tags: Vec<String>,
    pub thumbnail: String,
}

#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct StreamInfoBody {
    pub stream_title: String,
    pub category_id: u64,
    pub is_mature: bool,
    pub language: String,
    pub tags: Vec<String>,
}

#[derive(Debug, Clone, Deserialize, Serialize, Default)]

pub struct PatchChanelBody {
    pub category_id: Option<u64>,
    pub stream_title: Option<String>,
    pub custom_tags: Option<Vec<String>>,
}

#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct SearchCategoriesResponse {
    pub data: Vec<Category>,
    pub pagination: Pagination,
    pub message: String,
}
#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct Category {
    pub id: u64,
    pub name: String,
    pub thumbnail: String,
    pub tags: Vec<String>,
}

#[derive(Debug, Clone, Deserialize, Serialize, Default)]

pub struct UpdateChatSettingsBody {
    pub slow_mode: Option<bool>,
    pub message_interval: Option<u32>,
    pub followers_mode: Option<bool>,
    pub following_min_duration: Option<u32>,
    pub subscribers_mode: Option<bool>,
    pub emotes_mode: Option<bool>,
}

#[derive(Debug, Clone, Deserialize, Serialize)]

pub struct UserBannedData {
    pub id: String,
    pub user: BannedUser,
    pub banned_by: BannedBy,
    pub permanent: bool,
}

impl MessageDeletedData {
    pub fn into_unified(self, channel_id: Option<String>) -> UnifiedChatMessageDelete {
        UnifiedChatMessageDelete {
            platform: Platform::Kick,
            channel_id,
            message_id: self.message.id,
            target_user: None,
        }
    }
}

#[derive(Debug, Deserialize)]
pub struct KickAuthCallbackQuery {
    pub code: String,
    pub state: String,
}

impl From<ChatMessageData> for UnifiedChatMessage {
    fn from(k: ChatMessageData) -> Self {
        let is_broadcaster = k
            .sender
            .identity
            .badges
            .iter()
            .any(|b| b.r#type == "broadcaster");
        let is_moderator = k
            .sender
            .identity
            .badges
            .iter()
            .any(|b| b.r#type == "moderator");
        let is_subscriber = k
            .sender
            .identity
            .badges
            .iter()
            .any(|b| b.r#type == "subscriber");
        let is_vip = k.sender.identity.badges.iter().any(|b| b.r#type == "vip");
        let mut is_bot = k.sender.identity.badges.iter().any(|b| b.r#type == "bot");
        is_bot = is_bot || k.sender.slug == "botrix";
        let badges_v1: Vec<UnifiedBadge> = k
            .sender
            .identity
            .badges
            .iter()
            .map(|b| {
                let image_url = {
                    if b.r#type == "sub_gifter".to_string() {
                        Some("https://www.kickdatabase.com/kickBadges/subGifter.svg".to_string())
                    } else {
                        Some(format!(
                            "https://www.kickdatabase.com/kickBadges/{}.svg",
                            b.r#type.clone()
                        ))
                    }
                };
                UnifiedBadge {
                    id: b.r#type.clone(),
                    set_id: b.r#type.clone(),
                    label: None,
                    image_url,
                }
            })
            .collect();
        let badges_v2: Vec<UnifiedBadge> = k
            .sender
            .identity
            .badges_v2
            .iter()
            .map(|b| UnifiedBadge {
                id: b.name.clone(),
                set_id: b.badge_type.clone(),
                label: b
                    .metadata
                    .as_ref()
                    .and_then(|m| m.level)
                    .map(|l| format!("Level {}", l)),
                image_url: Some(b.image_url.clone()),
            })
            .collect();
        let badges = [badges_v1, badges_v2].concat();
        let fragments = parse_kick_content(&k.content);
        let raw_message_ref: Option<String> = match k.metadata.clone() {
            Some(m) => Some(m.message_ref),
            _ => None,
        };
        let reply = {
            if let Some(MessageMetadata {
                original_message: Some(original_message),
                original_sender: Some(original_sender),
                ..
            }) = k.metadata
            {
                Some(ReplyInfo {
                    parent_message_id: original_message.id,
                    parent_message_body: original_message.content,
                    parent_user_id: original_sender.id.to_string(),
                    parent_username: original_sender.username,
                    thread_message_id: raw_message_ref.clone(),
                    thread_user_id: Some(k.sender.id.to_string()),
                })
            } else {
                None
            }
        };
        Self {
            id: k.id,
            platform: Platform::Kick,
            channel_id: k.chatroom_id.to_string(),
            channel_name: k.sender.slug.clone(),
            created_at: k.created_at,

            sender: UnifiedSender {
                id: k.sender.id.to_string(),
                username: k.sender.username,
                login: k.sender.slug,
                color: Some(k.sender.identity.color),
                avatar_url: None,
                channel_url: None,
                is_verified: None,
                badges,
                roles: SenderRoles {
                    is_broadcaster,
                    is_moderator,
                    is_subscriber,
                    is_verified: false,
                    is_bot,
                    is_vip,
                },
            },

            content: UnifiedContent {
                text: strip_kick_emotes(&k.content),
                fragments,
                message_type: ChatMessageType::Text,
                reply,
                cheer_bits: None,
                donation: None,
            },

            metadata: UnifiedMetadata {
                raw_message_ref: raw_message_ref,
                channel_points_reward_id: None,
                source_channel_id: None,
                source_channel_login: None,
                source_message_id: None,
                is_source_only: None,
                live_chat_id: None,
                has_display_content: None,
            },
        }
    }
}

fn parse_kick_content(content: &str) -> Vec<ChatFragment> {
    let mut fragments = Vec::new();
    let mut remaining = content;

    while !remaining.is_empty() {
        if let Some(start) = remaining.find("[emote:") {
            if start > 0 {
                let text = remaining[..start].trim().to_string();
                if !text.is_empty() {
                    fragments.push(ChatFragment {
                        kind: FragmentKind::Text,
                        text,
                    });
                }
            }

            if let Some(end) = remaining[start..].find(']') {
                let emote_str = &remaining[start + 1..start + end]; // "emote:4148074:HYPERCLAP"
                let parts: Vec<&str> = emote_str.split(':').collect();
                if parts.len() == 3 {
                    fragments.push(ChatFragment {
                        text: parts[2].to_string(), // "HYPERCLAP"
                        kind: FragmentKind::Emote {
                            id: parts[1].to_string(), // "4148074"
                            emote_set_id: None,
                            owner_id: None,
                            formats: vec!["static".to_string()],
                        },
                    });
                }
                remaining = &remaining[start + end + 1..];
            } else {
                break;
            }
        } else {
            let text = remaining.trim().to_string();
            if !text.is_empty() {
                fragments.push(ChatFragment {
                    kind: FragmentKind::Text,
                    text,
                });
            }
            break;
        }
    }

    fragments
}

fn strip_kick_emotes(content: &str) -> String {
    let mut result = String::new();
    let mut remaining = content;

    while !remaining.is_empty() {
        if let Some(start) = remaining.find("[emote:") {
            result.push_str(&remaining[..start]);
            if let Some(end) = remaining[start..].find(']') {
                let parts: Vec<&str> = remaining[start + 1..start + end].split(':').collect();
                if parts.len() == 3 {
                    result.push_str(parts[2]);
                }
                remaining = &remaining[start + end + 1..];
            } else {
                break;
            }
        } else {
            result.push_str(remaining);
            break;
        }
    }

    result.trim().to_string()
}
