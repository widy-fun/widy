use crate::{
    repositories::{RedemptionsRepository, RewardsRepository},
    services::{
        ChatFragment, ChatMessageType, CommandsService, DatabaseService, DeletedMessageUser,
        EventsService, FragmentKind, ReplyInfo, SenderRoles, UnifiedBadge, UnifiedChatMessage,
        UnifiedChatMessageDelete, UnifiedContent, UnifiedMetadata, UnifiedSender,
        twitch::{
            models::{
                BadgeInfo, ChannelChatMessageDeleteEvent, ChannelChatMessageEvent, Event,
                EventPayload, NotificationMessage, Payload, SubscriptionType, WebSocketInstruction,
            },
            traits::TwitchApi,
        },
    },
    traits::ChatMessageBuffer,
    utils::get_random_alert,
};
use async_trait::async_trait;
use chrono::Utc;
use entity::{
    followers::Follow,
    goals::GoalType,
    messages::MessageType,
    raids,
    redemptions::Redemption,
    rewards::Platform,
    services::{ServiceType, TwitchAuth},
    settings::Currency,
    subscriptions::{self},
};
use futures::{SinkExt, StreamExt};
use std::sync::{Arc, Mutex, atomic::AtomicU64};
use tauri::{AppHandle, Manager};
use tokio_tungstenite::{connect_async, tungstenite::Message};
use tokio_util::sync::CancellationToken;
use uuid::Uuid;

#[derive(Clone, Debug)]
pub struct TwitchService {
    client_id: String,
    scopes: String,
    websocket_eventsub_url: String,
    api_endpoint: String,
    auth_endpoint: String,
    eventsub_endpoint: String,
    pub session_id: Arc<Mutex<Option<String>>>,
    pub chat_messages_buffer: Arc<Mutex<ChatMessageBuffer>>,
    expire_at: Arc<AtomicU64>,
    pub cancellation_token: Arc<Mutex<CancellationToken>>,
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
        let scopes="user:read:email channel:read:subscriptions moderator:read:followers channel:manage:redemptions bits:read".to_string();
        #[cfg(not(debug_assertions))]
        let scopes = format!("{scopes} user:read:chat user:write:chat user:bot channel:bot");

        Self {
            client_id,
            scopes,
            websocket_eventsub_url,
            api_endpoint,
            auth_endpoint,
            eventsub_endpoint,
            session_id: Arc::new(Mutex::new(None)),
            expire_at: Arc::new(AtomicU64::new(0)),
            chat_messages_buffer: Arc::new(Mutex::new(ChatMessageBuffer::new(1001))),
            cancellation_token: Arc::new(Mutex::new(CancellationToken::new())),
        }
    }

    pub async fn connect(&self, app: &AppHandle) -> Result<(), String> {
        {
            let mut cancellation_token = self.cancellation_token.lock().unwrap();
            *cancellation_token = CancellationToken::new();
        }
        let reqwest_client = app.state::<reqwest::Client>();
        let auth = self.get_database_auth(app, ServiceType::Twitch).await?;
        let auth = self
            .refresh_and_update_auth(&app, &auth, ServiceType::Twitch)
            .await?;

        let chanel_badges = self
            .get_chanel_badges(
                &auth.access_token.clone(),
                &auth.user_id.clone(),
                &reqwest_client,
            )
            .await?;

        let global_badges = self
            .get_global_badges(&auth.access_token.clone(), &reqwest_client)
            .await?;
        let all_badges_info = [chanel_badges.data, global_badges.data].concat();
        self.run_websocket_client(app.clone(), auth, all_badges_info)
            .await;
        Ok(())
    }

    async fn run_websocket_client(
        &self,
        app: AppHandle,
        auth: TwitchAuth,
        all_badges_info: Vec<BadgeInfo>,
    ) {
        tauri::async_runtime::spawn(async move {
            let twitch_service = app.state::<TwitchService>();
            let reqwest_client = app.state::<reqwest::Client>();

            let cancellation_token = twitch_service.cancellation_token();
            let mut current_url = twitch_service.websocket_eventsub_url.clone();

            'connection: loop {
                log::info!("Connecting to Twitch EventSub: {}", current_url);

                let (mut socket, _) = match connect_async(&current_url).await {
                    Ok(socket) => socket,
                    Err(e) => {
                        log::error!("Failed to connect: {}", e);
                        tokio::time::sleep(std::time::Duration::from_secs(5)).await;
                        continue;
                    }
                };

                log::info!("Twitch websocket connected.");

                loop {
                    tokio::select! {
                        _ = cancellation_token.cancelled() => {
                            log::info!("Stopping Twitch websocket.");
                            let _ = socket.send(Message::Close(None)).await;
                            break 'connection;
                        }

                        msg = socket.next() => {
                            let Some(msg_result) = msg else {
                                log::warn!("Twitch websocket ended.");
                                break;
                            };

                            match msg_result {
                                Ok(Message::Text(text)) => {
                                    let instruction =
                                        twitch_service.handle_text_message(&text).await;
                                    match instruction {
                                        WebSocketInstruction::SessionWelcome(session_id) => {
                                            {

                                                let mut session_id_guard =
                                                    twitch_service.session_id.lock().unwrap();
                                                *session_id_guard = Some(session_id.clone());
                                            }

                                            twitch_service
                                                .create_subscriptions(
                                                    &session_id,
                                                    &auth.access_token,
                                                    &auth.user_id,
                                                    &reqwest_client,
                                                )
                                                .await;
                                        }
                                        WebSocketInstruction::Notification(message) => {
                                            if let Payload::Event(payload) = message.payload {
                                                twitch_service
                                                    .handle_subscriptions(
                                                        payload,
                                                        &app,
                                                        &all_badges_info,
                                                    )
                                                    .await;
                                            }
                                        }
                                        WebSocketInstruction::Revocation => {
                                            log::error!(
                                                "Fatal twitch instruction received: {text}"
                                            );
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
                }
            }

            log::info!("WebSocket task exited.");
        });
    }

    async fn handle_subscriptions(
        &self,
        payload: EventPayload,
        app: &AppHandle,
        all_badges_info: &Vec<BadgeInfo>,
    ) {
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
                            let message_id = Uuid::new_v4();
                            let redemption = Redemption {
                                id: Uuid::new_v4(),
                                user_id: event.user_id,
                                user_name: event.user_name,
                                user_input: event.user_input,
                                external_id: event.id,
                                reward_id: reward.id,
                                description: event.reward.prompt,
                                title: event.reward.title,
                                cost: event.reward.cost,
                                r#type: reward.r#type.clone(),
                                platform: reward.platform,
                                points_currency_ratio: reward.points_currency_ratio,
                                media: None,
                                message_id: message_id,
                                alert: reward.alert,
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
                    let message_id = Uuid::new_v4();
                    let follow = Follow {
                        id: Uuid::new_v4(),
                        user_id: event.user_id,
                        service_id: payload.subscription.id,
                        user_name: event.user_name,
                        message_id: message_id,
                        played: false,
                        service: ServiceType::Twitch,
                        followed_at: created_at,
                        alert: get_random_alert(app, MessageType::Follow)
                            .await
                            .unwrap_or(None),
                    };

                    let _ = EventsService::follow(follow, GoalType::TwitchFollow, app).await;
                }
            }
            SubscriptionType::ChannelSubscribe => {
                if let Event::Subscribe(event) = payload.event {
                    let created_at = Utc::now().timestamp();
                    let message_id = Uuid::new_v4();
                    let subscription = subscriptions::Subscription {
                        id: Uuid::new_v4(),
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
                        alert: get_random_alert(app, MessageType::Subscription)
                            .await
                            .unwrap_or(None),
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
                    let message_id = Uuid::new_v4();
                    let subscription = subscriptions::Subscription {
                        id: Uuid::new_v4(),
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
                        alert: get_random_alert(app, MessageType::Subscription)
                            .await
                            .unwrap_or(None),
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
                    let message_id = Uuid::new_v4();
                    let subscription = subscriptions::Subscription {
                        id: Uuid::new_v4(),
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
                        alert: get_random_alert(app, MessageType::Subscription)
                            .await
                            .unwrap_or(None),
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
                    let message_id = Uuid::new_v4();
                    let raid = raids::Raid {
                        id: Uuid::new_v4(),
                        service_id: payload.subscription.id,
                        message_id: message_id,
                        played: false,
                        service: ServiceType::Twitch,
                        viewers: event.viewers,
                        from_broadcaster_user_id: event.from_broadcaster_user_id,
                        from_broadcaster_user_name: event.from_broadcaster_user_name,
                        created_at,
                        alert: get_random_alert(app, MessageType::Raid)
                            .await
                            .unwrap_or(None),
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
                    let message = UnifiedChatMessage::from_twitch(
                        event.clone(),
                        payload.subscription.created_at,
                        all_badges_info,
                    );
                    {
                        let mut chat_messages_buffer = self.chat_messages_buffer.lock().unwrap();
                        chat_messages_buffer.push(message.clone().content.text);
                    }
                    let _ = EventsService::chat_message(message.clone(), app).await;
                    let _ = CommandsService::twitch_chat_message_trigger(message, app).await;
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
}

#[async_trait]
impl TwitchApi for TwitchService {
    fn client_id(&self) -> String {
        self.client_id.clone()
    }

    fn expire_at(&self) -> Arc<AtomicU64> {
        self.expire_at.clone()
    }

    fn cancellation_token(&self) -> CancellationToken {
        let guard = self.cancellation_token.lock().unwrap();
        guard.clone()
    }

    fn session_id(&self) -> Option<String> {
        let guard = self.session_id.lock().unwrap();
        guard.clone()
    }

    fn eventsub_endpoint(&self) -> String {
        self.eventsub_endpoint.clone()
    }

    fn auth_endpoint(&self) -> String {
        self.auth_endpoint.clone()
    }

    fn scopes(&self) -> String {
        self.scopes.clone()
    }

    fn api_endpoint(&self) -> String {
        self.api_endpoint.clone()
    }
}

impl UnifiedChatMessage {
    fn from_twitch(
        e: ChannelChatMessageEvent,
        created_at: String,
        all_badges_info: &Vec<BadgeInfo>,
    ) -> Self {
        let is_broadcaster = e.badges.iter().any(|b| b.set_id == "broadcaster");
        let is_moderator = e.badges.iter().any(|b| b.set_id == "moderator");
        let is_subscriber = e.badges.iter().any(|b| b.set_id == "subscriber");
        let is_vip = e.badges.iter().any(|b| b.set_id == "vip");

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
                    is_vip,
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
