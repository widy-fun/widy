use crate::{
    services::{CommandsService, EventsService, twitch::twitch_api::TwitchApi},
    utils::get_random_alert,
};
use chrono::{SecondsFormat, Utc};
use database::{DatabaseService, RedemptionsRepository, RewardsRepository};
use entity::{
    followers::Follow,
    goals::GoalType,
    messages::MessageType,
    raids,
    redemptions::Redemption,
    rewards::Platform,
    services::ServiceType,
    settings::Currency,
    subscriptions::{self},
};
use futures::{SinkExt, StreamExt};
use model::error::AppError;
use model::{
    events::{UnifiedBannedUser, UnifiedChatMessage, UnifiedChatMessageDelete},
    items_buffer::ItemsBuffer,
    twitch::{
        BadgeInfo, Event, EventPayload, NotificationMessage, Payload, StreamOnlineType,
        SubscriptionType, WebSocketInstruction,
    },
};
use std::sync::{Arc, Mutex, atomic::AtomicU64};
use tauri::{AppHandle, Manager};
use tokio_tungstenite::{connect_async, tungstenite::Message};
use tokio_util::sync::CancellationToken;
use uuid::Uuid;

#[derive(Clone, Debug)]
pub struct TwitchService {
    pub(crate) client_id: String,
    pub(crate) scopes: String,
    websocket_eventsub_url: String,
    pub(crate) api_endpoint: String,
    pub(crate) auth_endpoint: String,
    pub(crate) eventsub_endpoint: String,
    pub session_id: Arc<Mutex<Option<String>>>,
    pub chat_messages_buffer: Arc<Mutex<ItemsBuffer<UnifiedChatMessage>>>,
    pub(crate) expire_at: Arc<AtomicU64>,
    pub(crate) cancellation_token: Arc<Mutex<CancellationToken>>,
    pub(crate) reqwest_client: reqwest::Client,
    pub(crate) service_type: ServiceType,
}

impl TwitchService {
    pub fn new(client_id: String, reqwest_client: reqwest::Client) -> Self {
        #[cfg(not(feature = "mock"))]
        let auth_endpoint = "https://id.twitch.tv/oauth2".to_string();
        #[cfg(feature = "mock")]
        let auth_endpoint = "http://localhost:8080/auth".to_string();
        #[cfg(not(feature = "mock"))]
        let api_endpoint = "https://api.twitch.tv/helix".to_string();
        #[cfg(feature = "mock")]
        let api_endpoint = "http://localhost:8080/mock".to_string();
        #[cfg(not(feature = "mock"))]
        let websocket_eventsub_url =
            "wss://eventsub.wss.twitch.tv/ws?keepalive_timeout_seconds=30".to_string();
        #[cfg(feature = "mock")]
        let websocket_eventsub_url = "ws://localhost:8081/ws".to_string();
        #[cfg(not(feature = "mock"))]
        let eventsub_endpoint = api_endpoint.clone();
        #[cfg(feature = "mock")]
        let eventsub_endpoint = "http://localhost:8081".to_string();
        let scopes="user:read:email channel:read:subscriptions moderator:read:followers channel:manage:redemptions bits:read".to_string();
        #[cfg(not(feature = "mock"))]
        let scopes = format!(
            "{scopes} user:read:chat user:write:chat user:bot channel:bot moderation:read moderator:manage:chat_messages moderator:manage:banned_users user:edit:broadcast moderator:manage:chat_settings channel:moderate"
        );

        Self {
            client_id,
            scopes,
            websocket_eventsub_url,
            api_endpoint,
            auth_endpoint,
            eventsub_endpoint,
            session_id: Arc::new(Mutex::new(None)),
            expire_at: Arc::new(AtomicU64::new(0)),
            chat_messages_buffer: Arc::new(Mutex::new(ItemsBuffer::new(2000))),
            cancellation_token: Arc::new(Mutex::new(CancellationToken::new())),
            reqwest_client,
            service_type: ServiceType::Twitch,
        }
    }

    pub async fn connect(&self, app: &AppHandle) -> Result<(), AppError> {
        {
            let mut cancellation_token = self.cancellation_token.lock().unwrap();
            *cancellation_token = CancellationToken::new();
        }
        let auth = self.get_auth(app).await?;
        let chanel_badges = self.get_chanel_badges(&auth.user_id.clone(), app).await?;
        let global_badges = self.get_global_badges(app).await?;
        let all_badges_info = [chanel_badges.data, global_badges.data].concat();
        self.run_websocket_client(app.clone(), all_badges_info, auth.user_id)
            .await;
        Ok(())
    }

    async fn run_websocket_client(
        &self,
        app: AppHandle,
        all_badges_info: Vec<BadgeInfo>,
        user_id: String,
    ) {
        tauri::async_runtime::spawn(async move {
            let twitch_service = app.state::<TwitchService>();

            let cancellation_token = twitch_service.cancellation_token();
            let mut current_url = twitch_service.websocket_eventsub_url.clone();

            'connection_loop: loop {
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
                            break 'connection_loop;
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
                                                    &user_id,
                                                    &app
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
        match payload.subscription.r#type {
            SubscriptionType::ChannelPointsCustomRewardRedemptionAdd => {
                if let Event::ChannelPointsCustomRewardRedemptionAdd(event) = payload.event {
                    let database_service = app.state::<DatabaseService>();
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
                                tts: None,
                                message_id: message_id,
                                alert: reward.alert,
                            };
                            let _ = EventsService::redemption(
                                redemption,
                                reward.r#type,
                                reward.tts_settings,
                                reward.obs_action,
                                &app,
                            )
                            .await;
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
                    let message_type = if event.is_gift {
                        MessageType::GiftSubscription
                    } else {
                        MessageType::Subscription
                    };
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
                        alert: get_random_alert(app, message_type).await.unwrap_or(None),
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
                        alert: get_random_alert(app, MessageType::GiftSubscription)
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
                        Utc::now().to_rfc3339_opts(SecondsFormat::Secs, true),
                        all_badges_info,
                    );
                    {
                        let mut chat_messages_buffer = self.chat_messages_buffer.lock().unwrap();
                        chat_messages_buffer.push(message.clone());
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
            SubscriptionType::ChannelBan => {
                if let Event::ChannelBan(event) = payload.event {
                    let _ = EventsService::user_banned_in_chat(UnifiedBannedUser::from(event), app)
                        .await;
                }
            }
            SubscriptionType::StreamOnline => {
                if let Event::StreamOnline(event) = payload.event {
                    if let StreamOnlineType::Live = event.r#type {
                        let _ = CommandsService::twitch_stream_online(app).await;
                    }
                }
            }
            SubscriptionType::StreamOffline => {
                let _ = CommandsService::twitch_stream_offline(app).await;
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
