use crate::{
    repositories::{RedemptionsRepository, RewardsRepository, ServicesRepository},
    services::{
        ChatFragment, ChatMessageType, DatabaseService, DeletedMessageUser, EventsService,
        FragmentKind, ReplyInfo, SenderRoles, UnifiedBadge, UnifiedChatMessage,
        UnifiedChatMessageDelete, UnifiedContent, UnifiedMetadata, UnifiedSender,
    },
};
use chrono::Utc;
use entity::{
    followers::Follow,
    goals::GoalType,
    raids,
    redemptions::Redemption,
    rewards::Platform,
    services::{ServiceAuth, ServiceType, TwitchAuth},
    settings::Currency,
    subscriptions::{self},
};
use futures::{lock::Mutex, StreamExt};
use serde::{Deserialize, Serialize};
use std::{
    collections::HashMap,
    sync::{
        atomic::{AtomicBool, Ordering},
        Arc,
    },
    time::Duration,
};
use tauri::{AppHandle, Manager};
use tokio_tungstenite::{connect_async, tungstenite::Message};
use uuid::Uuid;

#[derive(Debug, Clone, Deserialize, Serialize)]
struct BadgeInfoResponse {
    pub data: Vec<BadgeInfo>,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
struct BadgeInfo {
    pub set_id: String,
    pub versions: Vec<BadgeVersion>,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
struct BadgeVersion {
    pub id: String,
    pub image_url_1x: String,
    pub image_url_2x: String,
    pub image_url_4x: String,
    pub title: String,
    pub description: String,
    pub click_action: Option<String>,
    pub click_url: Option<String>,
}
enum WebSocketInstruction {
    SessionWelcome(String),
    Continue,
    Reconnect(String),
    Notification(NotificationMessage),
    Revocation,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
struct SubscriptionRequestBody {
    pub r#type: String,
    pub version: String,
    pub condition: Condition,
    pub transport: Transport,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
struct AddTwitchRewardBody {
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
enum Condition {
    Follow(FollowCondition),
    ChannelPointsCustomRewardRedemptionAdd(ChannelPointsCustomRewardRedemptionAddCondition),
    Raid(RaidCondition),
    Cheer(CheerCondition),
    Subscription(SubscriptionCondition),
    Redemption(RedemptionCondition),
    ChatMessage(ChatMessageCondition),
}

#[derive(Debug, Clone, Deserialize, Serialize)]
struct ChatMessageCondition {
    pub broadcaster_user_id: String,
    pub user_id: String,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
struct RedemptionCondition {
    pub broadcaster_user_id: String,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
struct SubscriptionCondition {
    pub broadcaster_user_id: String,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
struct ChannelPointsCustomRewardRedemptionAddCondition {
    pub broadcaster_user_id: String,
    pub reward_id: String,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
struct FollowCondition {
    pub broadcaster_user_id: String,
    pub moderator_user_id: String,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
struct RaidCondition {
    pub to_broadcaster_user_id: String,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
struct CheerCondition {
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
#[allow(dead_code)]
struct TwitchBadResponse {
    pub error: Option<String>,
    pub status: u16,
    pub message: String,
}
#[derive(Deserialize, Debug)]
#[allow(dead_code)]
struct TwitchTokenResponse {
    pub access_token: String,
    pub refresh_token: String,
    pub expires_in: u32,
    pub scope: Vec<String>,
    pub token_type: String,
}
#[derive(Deserialize, Debug)]
#[allow(dead_code)]
struct TwitchRefreshTokenResponse {
    pub access_token: String,
    pub refresh_token: String,
    pub scope: Vec<String>,
    pub token_type: String,
}

#[derive(Deserialize, Debug)]
#[allow(dead_code)]
struct TwitchUsersResponse {
    pub data: Vec<TwitchUser>,
}
#[derive(Deserialize, Debug, Clone)]
#[allow(dead_code)]
struct TwitchUser {
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
#[allow(dead_code)]
struct TwitchTokenInfo {
    pub client_id: String,
    pub login: String,
    pub user_id: String,
    pub expires_in: u32,
    pub scopes: Vec<String>,
}

#[derive(Debug, Deserialize)]
struct NotificationMessage {
    pub metadata: Metadata,
    pub payload: Payload,
}

#[derive(Debug, Deserialize)]
#[allow(dead_code)]
struct Metadata {
    pub message_type: String,
    pub message_id: String,
    pub message_timestamp: String,
    pub subscription_type: Option<String>,
    pub subscription_version: Option<String>,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
struct SessionPayload {
    pub session: SessionDetails,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
struct Transport {
    pub method: String,
    pub session_id: String,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
#[serde(untagged)]

enum Event {
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
struct ChannelChatMessageDeleteEvent {
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
struct ChannelChatMessageEvent {
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
struct Reply {
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
struct Cheer {
    pub bits: u64,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
struct ChatMessage {
    pub text: String,
    pub fragments: Vec<Fragment>,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
struct Badge {
    pub set_id: String,
    pub id: String,
    pub info: String,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
struct Fragment {
    pub r#type: String,
    pub text: String,
    pub cheermote: Option<Cheermote>,
    pub emote: Option<Emote>,
    pub mention: Option<Mention>,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
struct Cheermote {
    pub prefix: String,
    pub bits: u64,
    pub tier: u64,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
struct Emote {
    pub id: String,
    pub emote_set_id: String,
    pub owner_id: String,
    pub format: Vec<String>,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
struct Mention {
    pub user_id: String,
    pub user_name: String,
    pub user_login: String,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
/// 6 fields
struct ChannelChatClearUserMessagesEvent {
    pub broadcaster_user_id: String,
    pub broadcaster_user_name: String,
    pub broadcaster_user_login: String,
    pub target_user_id: String,
    pub target_user_name: String,
    pub target_user_login: String,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
/// 7 fields
struct RaidEvent {
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
struct CheerEvent {
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
struct FollowEvent {
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
struct SubscriptionMessageEvent {
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
struct SubscriptionMessage {
    pub text: String,
    // emotes
}
#[derive(Debug, Clone, Deserialize, Serialize)]
/// 10 fields
struct SubscriptionGiftEvent {
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
struct SubscribeEvent {
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
struct ChannelPointsCustomRewardRedemptionAddEvent {
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
enum ChannelPointsCustomRewardRedemptionStatus {
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
struct EventPayload {
    pub subscription: Subscription,
    pub event: Event,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
struct Reward {
    pub id: String,
    pub title: String,
    pub cost: i64,
    pub prompt: Option<String>,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
struct Subscription {
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
enum SubscriptionType {
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
struct SessionDetails {
    pub id: String,
    pub keepalive_timeout_seconds: Option<u64>,
    pub status: Option<String>,
    pub connected_at: String,
    pub reconnect_url: Option<String>,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
#[serde(untagged)]
enum Payload {
    Welcome(SessionPayload),
    Reconnect(SessionPayload),
    Event(EventPayload),
    Generic(serde_json::Value),
}

#[derive(Clone, Debug)]
pub struct TwitchService {
    is_close_connection: Arc<AtomicBool>,
    client_id: String,
    scopes: String,
    websocket_eventsub_url: String,
    api_endpoint: String,
    auth_endpoint: String,
    eventsub_endpoint: String,
    http_client: reqwest::Client,
    pub session_id: Arc<Mutex<Option<String>>>,
    chanel_badges: Arc<Mutex<BadgeInfoResponse>>,
    global_badges: Arc<Mutex<BadgeInfoResponse>>,
}

impl TwitchService {
    pub fn new(client_id: String) -> Self {
        #[cfg(not(debug_assertions))]
        let auth_endpoint = "https://id.twitch.tv/oauth2".to_string();
        #[cfg(debug_assertions)]
        let auth_endpoint = "http://localhost:8080/auth".to_string();
        #[cfg(not(debug_assertions))]
        let api_endpoint = "https://api.twitch.tv/helix".to_string();
        #[cfg(debug_assertions)]
        let api_endpoint = "http://localhost:8080/mock".to_string();
        #[cfg(not(debug_assertions))]
        let websocket_eventsub_url =
            "wss://eventsub.wss.twitch.tv/ws?keepalive_timeout_seconds=30".to_string();
        #[cfg(debug_assertions)]
        let websocket_eventsub_url = "ws://localhost:8081/ws".to_string();
        #[cfg(not(debug_assertions))]
        let eventsub_endpoint = api_endpoint.clone();
        #[cfg(debug_assertions)]
        let eventsub_endpoint = "http://localhost:8081".to_string();
        let scopes="user:read:email channel:read:subscriptions moderator:read:followers channel:manage:redemptions".to_string();
        #[cfg(not(debug_assertions))]
        let scopes = format!("{scopes} user:read:chat user:write:chat user:bot channel:bot");

        Self {
            is_close_connection: Arc::new(AtomicBool::new(false)),
            client_id,
            scopes,
            websocket_eventsub_url,
            api_endpoint,
            auth_endpoint,
            eventsub_endpoint,
            http_client: reqwest::Client::builder()
                .timeout(Duration::from_secs(5))
                .build()
                .expect("http_client build error"),
            session_id: Arc::new(Mutex::new(None)),
            chanel_badges: Arc::new(Mutex::new(BadgeInfoResponse { data: vec![] })),
            global_badges: Arc::new(Mutex::new(BadgeInfoResponse { data: vec![] })),
        }
    }

    pub async fn connect(&self, app: &AppHandle) -> Result<(), String> {
        let auth = self.check_auth(&app).await?;
        let mut chanel_badges_guard = self.chanel_badges.lock().await;
        let mut global_badges_guard = self.global_badges.lock().await;
        let chanel_badges = self
            .get_chanel_badges(&auth.access_token.clone(), &auth.user_id.clone())
            .await?;
        *chanel_badges_guard = chanel_badges;
        let global_badges = self.get_global_badges(&auth.access_token.clone()).await?;
        *global_badges_guard = global_badges;
        drop(global_badges_guard);
        drop(chanel_badges_guard);

        self.run_websocket_client(app.clone(), auth).await;
        Ok(())
    }

    async fn run_websocket_client(&self, app: AppHandle, auth: TwitchAuth) {
        tauri::async_runtime::spawn(async move {
            let twitch_service = app.state::<TwitchService>();
            let mut current_url = twitch_service.websocket_eventsub_url.clone();
            'connection_loop: loop {
                log::info!("Connecting to Twitch EventSub: {}", current_url);
                match connect_async(&current_url).await {
                    Ok((mut socket, _)) => {
                        log::info!("Twitch websocket connected.");
                        while let Some(msg_result) = socket.next().await {
                            let is_close_connection =
                                twitch_service.is_close_connection.load(Ordering::Relaxed);
                            if is_close_connection {
                                twitch_service
                                    .is_close_connection
                                    .store(false, Ordering::Relaxed);
                                break 'connection_loop;
                            }
                            match msg_result {
                                Ok(Message::Text(text)) => {
                                    let instruction =
                                        twitch_service.handle_text_message(&text).await;
                                    match instruction {
                                        WebSocketInstruction::SessionWelcome(session_id) => {
                                            let mut session_id_guard =
                                                twitch_service.session_id.lock().await;
                                            *session_id_guard = Some(session_id.clone());
                                            drop(session_id_guard);
                                            twitch_service
                                                .create_subscriptions(
                                                    &session_id,
                                                    &auth.access_token,
                                                    &auth.user_id,
                                                )
                                                .await;
                                        }
                                        WebSocketInstruction::Notification(message) => {
                                            if let Payload::Event(payload) = message.payload {
                                                twitch_service
                                                    .handle_subscriptions(payload, &app)
                                                    .await;
                                            }
                                        }
                                        WebSocketInstruction::Revocation => {
                                            log::error!(
                                                "Fatal twitch instruction received. Exiting connection loop."
                                            );

                                            break 'connection_loop;
                                        }
                                        WebSocketInstruction::Reconnect(new_url) => {
                                            log::warn!("Twitch requested reconnect. Swapping URL.");
                                            current_url = new_url;
                                            break;
                                        }
                                        WebSocketInstruction::Continue => {}
                                    }
                                }

                                Ok(Message::Close(_)) => {
                                    log::warn!("Twitch closed connection.");
                                    break;
                                }
                                Err(e) => {
                                    log::error!("Twitch websocket error: {}", e);
                                    break;
                                }
                                _ => {}
                            }
                        }
                    }
                    Err(e) => {
                        log::error!("Failed to connect: {}. Retrying in 5s...", e);
                        tokio::time::sleep(std::time::Duration::from_secs(5)).await;
                    }
                }
            }
        });
    }

    async fn handle_subscriptions(&self, payload: EventPayload, app: &AppHandle) {
        let database_service = app.state::<DatabaseService>();

        match payload.subscription.r#type {
            SubscriptionType::ChannelPointsCustomRewardRedemptionAdd => {
                if let Event::ChannelPointsCustomRewardRedemptionAdd(event) = payload.event {
                    let redemption = database_service
                        .get_redemption_by_external_id(&event.id)
                        .await;
                    if let Ok(None) = redemption {
                        if let Ok(Some(reward)) = database_service
                            .get_reward_by_external_id(&event.reward.id, Platform::Twitch)
                            .await
                        {
                            let message_id = Uuid::new_v4().to_string();
                            let redemption = Redemption {
                                id: Uuid::new_v4().to_string(),
                                user_id: event.user_id,
                                user_name: event.user_name,
                                user_input: event.user_input,
                                external_id: event.id,
                                reward_id: event.reward.id,
                                description: event.reward.prompt,
                                title: event.reward.title,
                                cost: event.reward.cost,
                                r#type: reward.r#type.clone(),
                                platform: reward.platform,
                                points_currency_ratio: reward.points_currency_ratio,
                                media: None,
                                image: reward.image,
                                audio: reward.audio,
                                video: reward.video,
                                alert_variant: reward.alert_variant,
                                audio_volume: reward.audio_volume,
                                video_volume: reward.video_volume,
                                duration: reward.duration,
                                delay: reward.delay,
                                message_id: message_id,
                            };
                            let _ =
                                EventsService::redemption(redemption, reward.r#type, &app).await;
                        }
                    }
                }
            }
            SubscriptionType::ChannelFollow => {
                if let Event::Follow(event) = payload.event {
                    let created_at = Utc::now().timestamp();
                    let message_id = Uuid::new_v4().to_string();
                    let follow = Follow {
                        id: Uuid::new_v4().to_string(),
                        user_id: event.user_id,
                        service_id: payload.subscription.id,
                        user_name: event.user_name,
                        message_id: message_id,
                        played: false,
                        service: ServiceType::Twitch,
                        followed_at: created_at,
                    };

                    let _ = EventsService::follow(follow, GoalType::TwitchFollow, app).await;
                }
            }
            SubscriptionType::ChannelSubscribe => {
                if let Event::Subscribe(event) = payload.event {
                    let created_at = Utc::now().timestamp();
                    let message_id = Uuid::new_v4().to_string();
                    let subscription = subscriptions::Subscription {
                        id: Uuid::new_v4().to_string(),
                        user_id: event.user_id,
                        service_id: payload.subscription.id,
                        user_name: event.user_name,
                        message_id: message_id,
                        played: false,
                        service: ServiceType::Twitch,
                        subscribed_at: created_at,
                        is_gift: event.is_gift,
                        is_anonymous: false,
                        tier: event.tier,
                        cumulative_total: None,
                        total: 1,
                    };
                    let _ = EventsService::subscription(
                        subscription,
                        GoalType::TwitchSubscription,
                        &app,
                    )
                    .await;
                }
            }
            SubscriptionType::ChannelSubscriptionGift => {
                if let Event::SubscriptionGift(event) = payload.event {
                    let created_at = Utc::now().timestamp();
                    let message_id = Uuid::new_v4().to_string();
                    let subscription = subscriptions::Subscription {
                        id: Uuid::new_v4().to_string(),
                        user_id: event.user_id,
                        service_id: payload.subscription.id,
                        user_name: event.user_name,
                        message_id: message_id,
                        played: false,
                        service: ServiceType::Twitch,
                        subscribed_at: created_at,
                        is_gift: true,
                        is_anonymous: event.is_anonymous,
                        tier: event.tier,
                        cumulative_total: event.cumulative_total,
                        total: event.total,
                    };
                    let _ = EventsService::subscription(
                        subscription,
                        GoalType::TwitchSubscription,
                        &app,
                    )
                    .await;
                }
            }
            SubscriptionType::ChannelSubscriptionMessage => {
                if let Event::SubscriptionMessage(event) = payload.event {
                    let created_at = Utc::now().timestamp();
                    let message_id = Uuid::new_v4().to_string();
                    let subscription = subscriptions::Subscription {
                        id: Uuid::new_v4().to_string(),
                        user_id: event.user_id,
                        service_id: payload.subscription.id,
                        user_name: event.user_name,
                        message_id: message_id,
                        played: false,
                        service: ServiceType::Twitch,
                        subscribed_at: created_at,
                        is_gift: false,
                        is_anonymous: false,
                        tier: event.tier,
                        cumulative_total: Some(event.cumulative_months),
                        total: 1,
                    };
                    let _ = EventsService::subscription(
                        subscription,
                        GoalType::TwitchSubscription,
                        &app,
                    )
                    .await;
                }
            }
            SubscriptionType::ChannelRaid => {
                if let Event::Raid(event) = payload.event {
                    let created_at = Utc::now().timestamp();
                    let message_id = Uuid::new_v4().to_string();
                    let raid = raids::Raid {
                        id: Uuid::new_v4().to_string(),
                        service_id: payload.subscription.id,
                        message_id: message_id,
                        played: false,
                        service: ServiceType::Twitch,
                        viewers: event.viewers,
                        from_broadcaster_user_id: event.from_broadcaster_user_id,
                        from_broadcaster_user_name: event.from_broadcaster_user_name,
                        created_at,
                    };
                    let _ = EventsService::raid(raid, &app).await;
                }
            }
            SubscriptionType::ChannelCheer => {
                if let Event::Cheer(event) = payload.event {
                    let _ = EventsService::donation(
                        payload.subscription.id,
                        ServiceType::Twitch,
                        event.user_name,
                        Currency::BITS,
                        event.bits as f64,
                        event.message,
                        app,
                    )
                    .await;
                }
            }
            SubscriptionType::ChannelChatMessage => {
                if let Event::ChannelChatMessage(event) = payload.event {
                    let chanel_badges_guard = self.chanel_badges.lock().await;
                    let global_badges_guard = self.global_badges.lock().await;
                    let all_badges_info = [
                        chanel_badges_guard.data.clone(),
                        global_badges_guard.data.clone(),
                    ]
                    .concat();
                    let _ = EventsService::chat_message(
                        UnifiedChatMessage::from_twitch(
                            event,
                            payload.subscription.created_at,
                            all_badges_info,
                        ),
                        app,
                    )
                    .await;
                }
            }
            SubscriptionType::ChannelChatMessageDelete => {
                if let Event::ChannelChatMessageDelete(event) = payload.event {
                    let _ = EventsService::chat_message_delete(
                        UnifiedChatMessageDelete::from(event),
                        app,
                    )
                    .await;
                }
            }
            _ => {}
        }
    }

    pub async fn check_auth(&self, app: &AppHandle) -> Result<TwitchAuth, String> {
        let database_service = app.state::<DatabaseService>();

        let auth = self.get_existing_auth(&database_service).await?;
        if cfg!(debug_assertions) {
            return self.get_token_mock().await;
        }

        self.refresh_and_update_auth(&database_service, &auth).await
    }

    async fn get_existing_auth(
        &self,
        database_service: &DatabaseService,
    ) -> Result<TwitchAuth, String> {
        let service = database_service
            .get_service_with_auth_by_id(ServiceType::Twitch)
            .await?;

        let service = service.ok_or_else(|| "Service not found".to_string())?;

        match service.auth {
            Some(ServiceAuth::Twitch(auth)) => Ok(auth),
            _ => Err("No Twitch authentication found".to_string()),
        }
    }

    async fn refresh_and_update_auth(
        &self,
        database_service: &DatabaseService,
        old_auth: &TwitchAuth,
    ) -> Result<TwitchAuth, String> {
        match self
            .refresh_token(&self.client_id, &old_auth.refresh_token)
            .await
        {
            Ok(response) => {
                let new_auth = TwitchAuth {
                    access_token: response.access_token,
                    refresh_token: response.refresh_token,
                    token_type: response.token_type,
                    expires_in: old_auth.expires_in,
                    user_id: old_auth.user_id.clone(),
                };
                self.set_authorized(
                    database_service,
                    Some(ServiceAuth::Twitch(new_auth.clone())),
                    true,
                    false,
                )
                .await?;
                Ok(new_auth)
            }
            Err(e) => {
                log::warn!("Token refresh failed, clearing auth: {}", e);

                if let Err(update_err) = self
                    .set_authorized(database_service, None, false, true)
                    .await
                {
                    log::error!("Failed to clear invalid auth: {}", update_err);
                }

                Err("Token refresh failed".to_string())
            }
        }
    }

    pub async fn get_device_code(&self) -> Result<TwitchDeviceCodeResponse, String> {
        let mut params = HashMap::new();

        params.insert("client_id", self.client_id.clone());
        params.insert("scopes", self.scopes.clone());
        let response = self
            .http_client
            .post("https://id.twitch.tv/oauth2/device")
            .form(&params)
            .send()
            .await
            .map_err(|e| {
                log::error!("{}", e.to_string());
                e.to_string()
            })?;

        let device_code_response: TwitchDeviceCodeResponse =
            response.json().await.map_err(|e| {
                log::error!("{}", e.to_string());
                e.to_string()
            })?;
        Ok(device_code_response)
    }
    async fn get_chanel_badges(
        &self,
        access_token: &String,
        broadcaster_id: &String,
    ) -> Result<BadgeInfoResponse, String> {
        let response = self
            .http_client
            .get(format!("{}/chat/badges", self.api_endpoint))
            .bearer_auth(access_token)
            .header(
                "Client-Id",
                std::env::var("TWITCH_CLIENT_ID_MOCK").unwrap_or(self.client_id.clone()),
            )
            .query(&[("broadcaster_id", broadcaster_id)])
            .send()
            .await
            .map_err(|e| {
                log::error!("{}", e.to_string());
                e.to_string()
            })?;

        let chanel_badges: BadgeInfoResponse = response.json().await.map_err(|e| {
            log::error!("{}", e.to_string());
            e.to_string()
        })?;
        Ok(chanel_badges)
    }

    async fn get_global_badges(&self, access_token: &String) -> Result<BadgeInfoResponse, String> {
        let response = self
            .http_client
            .get(format!("{}/chat/badges/global", self.api_endpoint))
            .bearer_auth(access_token)
            .header(
                "Client-Id",
                std::env::var("TWITCH_CLIENT_ID_MOCK").unwrap_or(self.client_id.clone()),
            )
            .send()
            .await
            .map_err(|e| {
                log::error!("{}", e.to_string());
                e.to_string()
            })?;

        let global_badges: BadgeInfoResponse = response.json().await.map_err(|e| {
            log::error!("{}", e.to_string());
            e.to_string()
        })?;
        Ok(global_badges)
    }

    pub async fn get_token(&self, device_code: String) -> Result<TwitchAuth, String> {
        let mut params = HashMap::new();

        params.insert("client_id", self.client_id.clone());
        params.insert("scopes", self.scopes.clone());
        params.insert("device_code", device_code);
        params.insert(
            "grant_type",
            "urn:ietf:params:oauth:grant-type:device_code".to_string(),
        );

        let response = self
            .http_client
            .post("https://id.twitch.tv/oauth2/token")
            .form(&params)
            .send()
            .await
            .map_err(|e| {
                log::error!("{}", e.to_string());
                e.to_string()
            })?;
        if !response.status().is_success() {
            let err_text = response.text().await.map_err(|e| {
                log::error!("{}", e.to_string());
                e.to_string()
            })?;
            log::error!("Twitch token error response: {}", err_text);
            return Err(err_text);
        }
        let token_response: TwitchTokenResponse =
            response.json().await.map_err(|e| e.to_string())?;

        let token_info: TwitchTokenInfo = self
            .validate_token(
                &token_response.access_token,
                &"https://id.twitch.tv/oauth2".to_string(),
            )
            .await?;

        if cfg!(debug_assertions) {
            return self.get_token_mock().await;
        }

        let auth = TwitchAuth {
            access_token: token_response.access_token,
            refresh_token: token_response.refresh_token,
            token_type: token_response.token_type,
            expires_in: token_response.expires_in,
            user_id: token_info.user_id,
        };

        Ok(auth)
    }

    async fn get_token_mock(&self) -> Result<TwitchAuth, String> {
        let user_id = std::env::var("TWITCH_USER_ID_MOCK").expect("TWITCH_USER_ID_MOCK not set");
        let client_id =
            std::env::var("TWITCH_CLIENT_ID_MOCK").expect("TWITCH_CLIENT_ID_MOCK not set");
        let client_secret =
            std::env::var("TWITCH_CLIENT_SECRET_MOCK").expect("TWITCH_CLIENT_SECRET_MOCK not set");

        let mut params = HashMap::new();

        params.insert("client_id", client_id);
        params.insert("client_secret", client_secret);
        params.insert("grant_type", "user_token".to_string());
        params.insert("user_id", user_id.clone());
        params.insert("scope", self.scopes.clone());

        let response = self
            .http_client
            .post(format!("{}/authorize", self.auth_endpoint))
            .query(&params)
            .send()
            .await
            .map_err(|e| {
                log::error!("{}", e.to_string());
                e.to_string()
            })?;
        if !response.status().is_success() {
            let err_text = response.text().await.map_err(|e| {
                log::error!("{}", e.to_string());
                e.to_string()
            })?;
            log::error!("Twitch mock token error response: {}", err_text);
            return Err(err_text);
        }
        let token_response: TwitchTokenResponse =
            response.json().await.map_err(|e| e.to_string())?;

        let auth = TwitchAuth {
            access_token: token_response.access_token.clone(),
            refresh_token: token_response.refresh_token,
            token_type: token_response.token_type,
            expires_in: token_response.expires_in,
            user_id: user_id.clone(),
        };

        Ok(auth)
    }

    async fn refresh_token(
        &self,
        client_id: &String,
        refresh_token: &String,
    ) -> Result<TwitchRefreshTokenResponse, String> {
        let mut params = HashMap::new();

        params.insert("grant_type", "refresh_token".to_string());
        params.insert(
            "refresh_token",
            urlencoding::encode(&refresh_token).to_string(),
        );
        params.insert("client_id", client_id.to_owned());

        let response = self
            .http_client
            .post(format!("{}/token", self.auth_endpoint))
            .form(&params)
            .send()
            .await
            .map_err(|e| {
                log::error!("{}", e.to_string());
                e.to_string()
            })?;

        if !response.status().is_success() {
            let bad_response = response.json().await.map_err(|e| {
                log::error!("{}", e.to_string());
                e.to_string()
            })?;

            return Err(bad_response);
        }

        let refresh_token_response: TwitchRefreshTokenResponse =
            response.json().await.map_err(|e| {
                log::error!("{}", e.to_string());
                e.to_string()
            })?;

        Ok(refresh_token_response)
    }

    async fn validate_token(
        &self,
        token: &String,
        auth_endpoint: &String,
    ) -> Result<TwitchTokenInfo, String> {
        let response = self
            .http_client
            .get(format!("{}/validate", auth_endpoint))
            .header("Authorization", format!("OAuth {}", token))
            .send()
            .await
            .map_err(|e| {
                log::error!("{}", e.to_string());
                e.to_string()
            })?;
        if !response.status().is_success() {
            let bad_response = response.json().await.map_err(|e| {
                log::error!("{}", e.to_string());
                e.to_string()
            })?;

            return Err(bad_response);
        }

        let token_info: TwitchTokenInfo = response.json().await.map_err(|e| {
            log::error!("{}", e.to_string());
            e.to_string()
        })?;
        Ok(token_info.clone())
    }

    pub async fn add_custom_reward(
        &self,
        app: &AppHandle,
        auth: &TwitchAuth,
        reward: &entity::rewards::Model,
    ) -> Result<(), String> {
        let database_service = app.state::<DatabaseService>();
        let reqwest_client = app.state::<reqwest::Client>();
        let twitch_reward_body = AddTwitchRewardBody {
            title: reward.title.clone(),
            cost: reward.cost,
            prompt: reward.description.clone(),
            background_color: Some(reward.background_color.clone()),
            is_user_input_required: reward.is_user_input_required,
            is_enabled: reward.is_enabled,
            is_max_per_stream_enabled: reward.is_max_per_stream_enabled,
            max_per_stream: reward.max_per_stream,
            is_max_per_user_per_stream_enabled: reward.is_max_per_user_per_stream_enabled,
            max_per_user_per_stream: reward.max_per_user_per_stream,
            is_global_cooldown_enabled: reward.is_global_cooldown_enabled,
            global_cooldown_seconds: reward.global_cooldown_seconds,
            should_redemptions_skip_request_queue: reward.should_redemptions_skip_request_queue,
        };

        let response = reqwest_client
            .post(format!(
                "{}/channel_points/custom_rewards",
                self.api_endpoint
            ))
            .header("Authorization", format!("Bearer {}", auth.access_token))
            .header(
                "Client-Id",
                std::env::var("TWITCH_CLIENT_ID_MOCK").unwrap_or(self.client_id.clone()),
            )
            .query(&[("broadcaster_id", &auth.user_id)])
            .json(&twitch_reward_body)
            .send()
            .await
            .map_err(|e| {
                log::error!("{}", e.to_string());
                e.to_string()
            })?;

        if !response.status().is_success() {
            let err_text = response.text().await.map_err(|e| {
                log::error!("{}", e.to_string());
                e.to_string()
            })?;
            log::error!("Twitch subscription error response: {}", err_text);
            return Err(err_text);
        }

        let json: serde_json::Value = response.json().await.map_err(|e| {
            log::error!("{}", e.to_string());
            e.to_string()
        })?;

        let reward_id = json["data"][0]["id"]
            .as_str()
            .map(|s| s.to_string())
            .ok_or("Twitch reward create error".to_string())?;

        let _ = database_service
            .create_reward(entity::rewards::Model {
                external_id: Some(reward_id),
                ..reward.clone()
            })
            .await?;

        Ok(())
    }

    pub async fn remove_custom_reward(
        &self,
        app: &AppHandle,
        auth: &TwitchAuth,
        id: &String,
    ) -> Result<(), String> {
        let database_service = app.state::<DatabaseService>();
        let reqwest_client = app.state::<reqwest::Client>();
        let reward = database_service
            .get_reward_by_id(id)
            .await?
            .ok_or("Reward not found".to_string())?;
        database_service.delete_reward_by_id(id).await?;
        let response = reqwest_client
            .delete(format!(
                "{}/channel_points/custom_rewards",
                self.api_endpoint
            ))
            .header("Authorization", format!("Bearer {}", auth.access_token))
            .header(
                "Client-Id",
                std::env::var("TWITCH_CLIENT_ID_MOCK").unwrap_or(self.client_id.clone()),
            )
            .query(&[
                ("broadcaster_id", auth.user_id.clone()),
                (
                    "id",
                    reward
                        .external_id
                        .ok_or("Reward external_id not exist".to_string())?,
                ),
            ])
            .send()
            .await
            .map_err(|e| {
                log::error!("{}", e.to_string());
                e.to_string()
            })?;
        if !response.status().is_success() {
            let err_text = response.text().await.map_err(|e| {
                log::error!("{}", e.to_string());
                e.to_string()
            })?;
            log::error!("Twitch subscription error response: {}", err_text);
            return Err(err_text);
        }

        Ok(())
    }

    async fn handle_text_message(&self, text: &str) -> WebSocketInstruction {
        let event_msg: NotificationMessage = match serde_json::from_str(text) {
            Ok(m) => m,
            Err(e) => {
                log::error!("Failed to parse message: {}", e);
                return WebSocketInstruction::Continue;
            }
        };

        match event_msg.metadata.message_type.as_str() {
            "session_welcome" => {
                if let Payload::Welcome(payload) = event_msg.payload {
                    let session_id = payload.session.id;
                    log::info!("Session Welcome: ID {}", session_id);
                    return WebSocketInstruction::SessionWelcome(session_id);
                }
                WebSocketInstruction::Continue
            }
            "session_keepalive" => {
                log::debug!("Keepalive received");
                WebSocketInstruction::Continue
            }
            "notification" => WebSocketInstruction::Notification(event_msg),
            "session_reconnect" => {
                if let Payload::Reconnect(payload) = event_msg.payload {
                    if let Some(new_url) = payload.session.reconnect_url {
                        return WebSocketInstruction::Reconnect(new_url);
                    }
                }
                log::error!("Received reconnect request but no URL found.");
                WebSocketInstruction::Continue
            }
            "revocation" => {
                log::warn!("Subscription revoked.");
                WebSocketInstruction::Revocation
            }
            _ => {
                log::debug!(
                    "Unhandled message type: {}",
                    event_msg.metadata.message_type
                );
                WebSocketInstruction::Continue
            }
        }
    }

    async fn create_subscriptions(
        &self,
        session_id: &String,
        access_token: &String,
        user_id: &String,
    ) {
        let transport = Transport {
            method: "websocket".to_string(),
            session_id: session_id.clone(),
        };
        let subscribes_types = vec![
            SubscriptionType::to_string(SubscriptionType::ChannelSubscribe),
            SubscriptionType::to_string(SubscriptionType::ChannelSubscriptionGift),
            SubscriptionType::to_string(SubscriptionType::ChannelSubscriptionMessage),
        ];
        for subscribe_type in subscribes_types {
            let _ = self
                .create_subscription(
                    &access_token,
                    SubscriptionRequestBody {
                        r#type: subscribe_type,
                        version: "1".to_string(),
                        condition: Condition::Subscription({
                            SubscriptionCondition {
                                broadcaster_user_id: user_id.clone(),
                            }
                        }),
                        transport: transport.clone(),
                    },
                )
                .await;
        }
        let _ = self
            .create_subscription(
                &access_token,
                SubscriptionRequestBody {
                    r#type: SubscriptionType::to_string(SubscriptionType::ChannelFollow),
                    version: "2".to_string(),
                    condition: Condition::Follow({
                        FollowCondition {
                            broadcaster_user_id: user_id.clone(),
                            moderator_user_id: user_id.clone(),
                        }
                    }),
                    transport: transport.clone(),
                },
            )
            .await;
        let _ = self
            .create_subscription(
                &access_token,
                SubscriptionRequestBody {
                    r#type: SubscriptionType::to_string(SubscriptionType::ChannelRaid),
                    version: "1".to_string(),
                    condition: Condition::Raid({
                        RaidCondition {
                            to_broadcaster_user_id: user_id.clone(),
                        }
                    }),
                    transport: transport.clone(),
                },
            )
            .await;
        let _ = self
            .create_subscription(
                &access_token,
                SubscriptionRequestBody {
                    r#type: SubscriptionType::to_string(SubscriptionType::ChannelCheer),
                    version: "1".to_string(),
                    condition: Condition::Cheer({
                        CheerCondition {
                            broadcaster_user_id: user_id.clone(),
                        }
                    }),
                    transport: transport.clone(),
                },
            )
            .await;
        let _ = self
            .create_subscription(
                &access_token,
                SubscriptionRequestBody {
                    r#type: SubscriptionType::to_string(
                        SubscriptionType::ChannelPointsCustomRewardRedemptionAdd,
                    ),
                    version: "1".to_string(),
                    condition: Condition::Redemption({
                        RedemptionCondition {
                            broadcaster_user_id: user_id.clone(),
                        }
                    }),
                    transport: transport.clone(),
                },
            )
            .await;
        let _ = self
            .create_subscription(
                &access_token,
                SubscriptionRequestBody {
                    r#type: SubscriptionType::to_string(SubscriptionType::ChannelChatMessage),
                    version: "1".to_string(),
                    condition: Condition::ChatMessage({
                        ChatMessageCondition {
                            broadcaster_user_id: user_id.clone(),
                            user_id: user_id.clone(),
                        }
                    }),
                    transport: transport.clone(),
                },
            )
            .await;
        let _ = self
            .create_subscription(
                &access_token,
                SubscriptionRequestBody {
                    r#type: SubscriptionType::to_string(SubscriptionType::ChannelChatMessageDelete),
                    version: "1".to_string(),
                    condition: Condition::ChatMessage({
                        ChatMessageCondition {
                            broadcaster_user_id: user_id.clone(),
                            user_id: user_id.clone(),
                        }
                    }),
                    transport: transport.clone(),
                },
            )
            .await;
        let _ = self
            .create_subscription(
                &access_token,
                SubscriptionRequestBody {
                    r#type: SubscriptionType::to_string(
                        SubscriptionType::ChannelChatClearUserMessages,
                    ),
                    version: "1".to_string(),
                    condition: Condition::ChatMessage({
                        ChatMessageCondition {
                            broadcaster_user_id: user_id.clone(),
                            user_id: user_id.clone(),
                        }
                    }),
                    transport: transport.clone(),
                },
            )
            .await;
    }

    async fn create_subscription(
        &self,
        token: &String,
        body: SubscriptionRequestBody,
    ) -> Result<Option<String>, String> {
        let response = self
            .http_client
            .post(format!("{}/eventsub/subscriptions", self.eventsub_endpoint))
            .header("Authorization", format!("Bearer {}", token))
            .header("Client-Id", self.client_id.clone())
            .json(&body)
            .send()
            .await
            .map_err(|e| {
                log::error!("{}", e.to_string());
                e.to_string()
            })?;

        if !response.status().is_success() {
            let err_text = response.text().await.map_err(|e| {
                log::error!("{}", e.to_string());
                e.to_string()
            })?;
            log::error!("Twitch create subscription error response: {}", err_text);
            return Err(err_text);
        }

        let json: serde_json::Value = response.json().await.map_err(|e| {
            log::error!("{}", e.to_string());
            e.to_string()
        })?;
        let subscription_id = json["data"][0]["id"].as_str().map(|s| s.to_string());

        Ok(subscription_id)
    }

    #[allow(dead_code)]
    async fn delete_subscription(
        &self,
        token: &String,
        subscription_id: String,
    ) -> Result<(), String> {
        let response = self
            .http_client
            .delete(format!("{}/eventsub/subscriptions", self.eventsub_endpoint))
            .header("Authorization", format!("Bearer {}", token))
            .header("Client-Id", self.client_id.clone())
            .query(&[("id", subscription_id)])
            .send()
            .await
            .map_err(|e| {
                log::error!("{}", e.to_string());
                e.to_string()
            })?;

        if !response.status().is_success() {
            let err_text = response.text().await.map_err(|e| {
                log::error!("{}", e.to_string());
                e.to_string()
            })?;
            log::error!("Twitch delete subscription error response: {}", err_text);
            return Err(err_text);
        }

        Ok(())
    }

    async fn set_authorized(
        &self,
        database_service: &DatabaseService,
        auth: Option<ServiceAuth>,
        authorized: bool,
        is_close_connection: bool,
    ) -> Result<(), String> {
        self.is_close_connection
            .store(is_close_connection, Ordering::Relaxed);
        database_service
            .update_service_auth(ServiceType::Twitch, auth, authorized)
            .await
    }

    pub async fn sign_out(&self, app: &AppHandle) -> Result<(), String> {
        let database_service = app.state::<DatabaseService>();
        self.set_authorized(&database_service, None, false, true)
            .await?;
        Ok(())
    }
}

impl UnifiedChatMessage {
    fn from_twitch(
        e: ChannelChatMessageEvent,
        created_at: String,
        all_badges_info: Vec<BadgeInfo>,
    ) -> Self {
        let is_broadcaster = e.badges.iter().any(|b| b.set_id == "broadcaster");
        let is_moderator = e.badges.iter().any(|b| b.set_id == "moderator");
        let is_subscriber = e.badges.iter().any(|b| b.set_id == "subscriber");

        let cheer_bits = e.cheer.as_ref().map(|c| c.bits);

        let message_type = match e.message_type.as_str() {
            "channel_points_highlighted" => ChatMessageType::ChannelPointsHighlighted,
            "channel_points_sub_only" => ChatMessageType::ChannelPointsSubOnly,
            "user_intro" => ChatMessageType::UserIntro,
            "power_ups_message_effect" => ChatMessageType::PowerUpMessageEffect,
            "power_ups_gigantified_emote" => ChatMessageType::PowerUpGigantifiedEmote,
            other => ChatMessageType::Unknown(other.to_string()),
        };

        let fragments = e
            .message
            .fragments
            .into_iter()
            .map(|f| ChatFragment {
                text: f.text.clone(),
                kind: match f.r#type.as_str() {
                    "emote" => FragmentKind::Emote {
                        id: f.emote.as_ref().map(|x| x.id.clone()).unwrap_or_default(),
                        emote_set_id: f.emote.as_ref().map(|x| x.emote_set_id.clone()),
                        owner_id: f.emote.as_ref().map(|x| x.owner_id.clone()),
                        formats: f.emote.map(|x| x.format).unwrap_or_default(),
                    },
                    "mention" => FragmentKind::Mention {
                        user_id: f
                            .mention
                            .as_ref()
                            .map(|x| x.user_id.clone())
                            .unwrap_or_default(),
                        username: f
                            .mention
                            .as_ref()
                            .map(|x| x.user_name.clone())
                            .unwrap_or_default(),
                        login: f.mention.map(|x| x.user_login).unwrap_or_default(),
                    },
                    "cheermote" => FragmentKind::Cheermote {
                        prefix: f
                            .cheermote
                            .as_ref()
                            .map(|x| x.prefix.clone())
                            .unwrap_or_default(),
                        bits: f.cheermote.as_ref().map(|x| x.bits).unwrap_or(0),
                        tier: f.cheermote.map(|x| x.tier).unwrap_or(0),
                    },
                    _ => FragmentKind::Text,
                },
            })
            .collect();
        let mut is_bot = false;
        let badges = e
            .badges
            .iter()
            .map(|b| {
                is_bot = is_bot || b.set_id == "bot-badge";
                UnifiedBadge {
                    id: b.id.clone(),
                    set_id: b.set_id.clone(),
                    label: Some(b.info.clone()).filter(|i| !i.is_empty()),
                    image_url: all_badges_info
                        .iter()
                        .find(|a| a.set_id == b.set_id)
                        .and_then(|badge| {
                            badge
                                .versions
                                .first()
                                .map(|version| version.image_url_1x.clone())
                        }),
                }
            })
            .collect();

        Self {
            id: e.message_id,
            platform: Platform::Twitch,
            channel_id: e.broadcaster_user_id,
            channel_name: e.broadcaster_user_login,
            created_at,

            sender: UnifiedSender {
                id: e.chatter_user_id,
                username: e.chatter_user_name,
                login: e.chatter_user_login,
                color: Some(e.color).filter(|c| !c.is_empty()),
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
                },
            },

            content: UnifiedContent {
                text: e.message.text,
                fragments,
                message_type,
                reply: e.reply.map(|r| ReplyInfo {
                    parent_message_id: r.parent_message_id,
                    parent_message_body: r.parent_message_body,
                    parent_user_id: r.parent_user_id,
                    parent_username: r.parent_user_name,
                    thread_message_id: Some(r.thread_message_id),
                    thread_user_id: Some(r.thread_user_id),
                }),
                cheer_bits,
                donation: None,
            },

            metadata: UnifiedMetadata {
                raw_message_ref: None,
                channel_points_reward_id: e.channel_points_custom_reward_id,
                source_channel_id: e.source_broadcaster_user_id,
                source_channel_login: e.source_broadcaster_user_login,
                source_message_id: e.source_message_id,
                is_source_only: e.is_source_only,
                live_chat_id: None,
                has_display_content: None,
            },
        }
    }
}

impl From<ChannelChatMessageDeleteEvent> for UnifiedChatMessageDelete {
    fn from(e: ChannelChatMessageDeleteEvent) -> Self {
        Self {
            platform: Platform::Twitch,
            channel_id: Some(e.broadcaster_user_id),
            message_id: e.message_id,
            target_user: Some(DeletedMessageUser {
                id: e.target_user_id,
                username: e.target_user_name,
                login: e.target_user_login,
            }),
        }
    }
}
