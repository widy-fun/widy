use async_trait::async_trait;
use chrono::Utc;
use entity::{
    goals::GoalType, messages::MessageType, raids, redemptions::Redemption, rewards::Platform,
    services::ServiceType, settings::Currency, subscriptions::Subscription,
};
use futures::{SinkExt, StreamExt};
use serde_json::json;
use std::sync::{
    Arc,
    atomic::{AtomicBool, AtomicU64, Ordering},
};
use tauri::{AppHandle, Manager};
use tokio::{
    net::TcpStream,
    sync::{Mutex, MutexGuard},
};
use tokio_tungstenite::{
    MaybeTlsStream, WebSocketStream, connect_async,
    tungstenite::{Message, Utf8Bytes},
};
use uuid::Uuid;

use crate::{
    repositories::RewardsRepository,
    services::{
        ChatMessageType, CommandsService, DatabaseService, EventsService, SenderRoles,
        UnifiedBadge, UnifiedChatMessage, UnifiedChatMessageDelete, UnifiedContent,
        UnifiedMetadata, UnifiedSender,
        kick::{
            models::{
                ChanelInfoResponse, ChatMessageData, Chatroom, Event, EventPayload,
                GiftedSubscriptionsData, KickAuthSession, KicksGiftedData, MessageDeletedData,
                RewardRedeemedData, StreamHostData, SubscriptionData,
            },
            traits::KickApi,
        },
    },
    traits::ChatMessageBuffer,
    utils::get_random_alert,
};

pub struct KickService {
    is_close_connection: Arc<AtomicBool>,
    pub kick_client_id: String,
    pub kick_token_endpoint: String,
    pub kick_redirect_uri: String,
    pub scopes: String,
    pub app_token: String,
    pub auth_session: Mutex<Option<KickAuthSession>>,
    pub chat_messages_buffer: Arc<Mutex<ChatMessageBuffer>>,
    expire_at: Arc<AtomicU64>,
}

impl KickService {
    pub fn new(
        kick_client_id: String,
        kick_token_endpoint: String,
        kick_redirect_uri: String,
        app_token: String,
    ) -> Self {
        let scopes = "user:read channel:read channel:write channel:rewards:read channel:rewards:write chat:write events:subscribe moderation:ban moderation:chat_message:manage kicks:read".to_string();

        Self {
            is_close_connection: Arc::new(AtomicBool::new(false)),
            kick_client_id,
            kick_token_endpoint,
            kick_redirect_uri,
            scopes,
            app_token,
            auth_session: Mutex::new(None),
            chat_messages_buffer: Arc::new(Mutex::new(ChatMessageBuffer::new(1001))),
            expire_at: Arc::new(AtomicU64::new(0)),
        }
    }

    pub async fn connect(&self, app: &AppHandle) -> Result<(), String> {
        let auth = self.get_database_auth(app, ServiceType::Kick).await?;
        let auth = self
            .refresh_and_update_auth(&app, &auth, ServiceType::Kick)
            .await?;
        let reqwest_client = app.state::<reqwest::Client>();
        let user_info = self
            .get_user_info(&reqwest_client, &auth.access_token)
            .await?;
        let chanel_info_response = self
            .get_chanel_info(&reqwest_client, &user_info.name)
            .await?;

        let app_clone = app.clone();
        self.run_websocket_client(app_clone, chanel_info_response)
            .await;
        Ok(())
    }

    async fn run_websocket_client(&self, app: AppHandle, chanel_info_response: ChanelInfoResponse) {
        tauri::async_runtime::spawn(async move {
            let kick_service = app.state::<KickService>();
            let connect_url = "wss://ws-us2.pusher.com/app/32cbd69e4b950bf97679?protocol=7&client=js&version=8.5.0&flash=false";
            'connection_loop: loop {
                log::info!("Connecting to Kick websocket: {}", connect_url);
                match connect_async(connect_url).await {
                    Ok((mut socket, _)) => {
                        log::info!("Kick websocket connected.");
                        kick_service
                            .create_subscriptions(&mut socket, &chanel_info_response.chatroom)
                            .await;

                        while let Some(msg_result) = socket.next().await {
                            let is_close_connection =
                                kick_service.is_close_connection.load(Ordering::Relaxed);
                            if is_close_connection {
                                kick_service
                                    .is_close_connection
                                    .store(false, Ordering::Relaxed);
                                break 'connection_loop;
                            }

                            match msg_result {
                                Ok(Message::Text(text)) => {
                                    if let Ok(payload) = serde_json::from_str::<EventPayload>(&text)
                                    {
                                        kick_service.handle_subscriptions(payload, &app).await;
                                    }
                                }

                                Ok(Message::Close(_)) => {
                                    log::warn!("Kick closed connection.");
                                    break;
                                }
                                Err(e) => {
                                    log::error!("Kick websocket error: {}", e);
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
        match payload.event {
            Event::RewardRedeemedEvent => {
                let event_data = serde_json::from_str::<RewardRedeemedData>(&payload.data);
                if let Ok(data) = event_data {
                    if let Ok(Some(reward)) = database_service
                        .get_reward_by_title(&data.reward_title, Platform::Kick)
                        .await
                    {
                        let message_id = Uuid::new_v4();
                        let redemption = Redemption {
                            id: Uuid::new_v4(),
                            user_id: data.user_id.to_string(),
                            user_name: data.username,
                            user_input: data.user_input,
                            external_id: message_id.to_string(),
                            reward_id: reward.id,
                            description: None,
                            title: data.reward_title,
                            cost: reward.cost,
                            r#type: reward.r#type.clone(),
                            platform: reward.platform,
                            media: None,
                            points_currency_ratio: reward.points_currency_ratio,
                            message_id: message_id,
                            alert: reward.alert,
                        };
                        let _ = EventsService::redemption(redemption, reward.r#type, &app).await;
                    }
                }
            }
            Event::GiftedSubscriptionsEvent => {
                let event_data = serde_json::from_str::<GiftedSubscriptionsData>(&payload.data);
                if let Ok(data) = event_data {
                    let message_id = Uuid::new_v4();
                    let created_at = Utc::now().timestamp();
                    let subscription = Subscription {
                        id: Uuid::new_v4(),
                        user_id: data.gifter_username.clone(),
                        service_id: message_id.to_string(),
                        user_name: data.gifter_username,
                        message_id: message_id,
                        played: false,
                        service: ServiceType::Kick,
                        subscribed_at: created_at,
                        is_gift: true,
                        is_anonymous: false,
                        tier: "1".to_string(),
                        cumulative_total: None,
                        total: data.gifted_total,
                        alert: get_random_alert(app, MessageType::Subscription)
                            .await
                            .unwrap_or(None),
                    };
                    let _ =
                        EventsService::subscription(subscription, GoalType::KickSubscription, &app)
                            .await;
                }
            }
            Event::SubscriptionEvent => {
                let event_data = serde_json::from_str::<SubscriptionData>(&payload.data);
                if let Ok(data) = event_data {
                    let message_id = Uuid::new_v4();
                    let created_at = Utc::now().timestamp();
                    let subscription = Subscription {
                        id: Uuid::new_v4(),
                        user_id: data.username.clone(),
                        service_id: message_id.to_string(),
                        user_name: data.username,
                        message_id: message_id,
                        played: false,
                        service: ServiceType::Kick,
                        subscribed_at: created_at,
                        is_gift: false,
                        is_anonymous: false,
                        tier: data.months.to_string(),
                        cumulative_total: None,
                        total: 1,
                        alert: get_random_alert(app, MessageType::Subscription)
                            .await
                            .unwrap_or(None),
                    };
                    let _ =
                        EventsService::subscription(subscription, GoalType::KickSubscription, &app)
                            .await;
                }
            }
            Event::StreamHostEvent => {
                let event_data = serde_json::from_str::<StreamHostData>(&payload.data);
                if let Ok(data) = event_data {
                    let created_at = Utc::now().timestamp();
                    let message_id = Uuid::new_v4();

                    let raid = raids::Raid {
                        id: Uuid::new_v4(),
                        service_id: message_id.to_string(),
                        message_id: message_id,
                        played: false,
                        service: ServiceType::Kick,
                        viewers: data.number_viewers,
                        from_broadcaster_user_id: data.host_username.clone(),
                        from_broadcaster_user_name: data.host_username,
                        created_at,
                        alert: get_random_alert(app, MessageType::Raid)
                            .await
                            .unwrap_or(None),
                    };
                    let _ = EventsService::raid(raid, &app).await;
                }
            }
            Event::KicksGifted => {
                let event_data = serde_json::from_str::<KicksGiftedData>(&payload.data);
                if let Ok(data) = event_data {
                    let _ = EventsService::donation(
                        data.gift_transaction_id,
                        ServiceType::Kick,
                        Some(data.sender.username),
                        Currency::KICKS,
                        data.gift.amount as f64,
                        Some(data.message),
                        &app,
                    )
                    .await;
                }
            }
            Event::ChatMessageEvent => {
                let event_data = serde_json::from_str::<ChatMessageData>(&payload.data);
                if let Ok(data) = event_data {
                    let message = UnifiedChatMessage::from(data.clone());
                    let mut chat_messages_buffer = self.chat_messages_buffer.lock().await;
                    chat_messages_buffer.push(message.clone().content.text);
                    drop(chat_messages_buffer);
                    let _ = EventsService::chat_message(message.clone(), app).await;
                    let _ = CommandsService::kick_chat_message_trigger(message, app).await;
                }
            }
            Event::MessageDeletedEvent => {
                let event_data = serde_json::from_str::<MessageDeletedData>(&payload.data);
                if let Ok(data) = event_data {
                    let _ =
                        EventsService::chat_message_delete(data.into_unified(payload.chanel), app)
                            .await;
                }
            }
            _ => {}
        }
    }

    async fn create_subscriptions(
        &self,
        socket: &mut WebSocketStream<MaybeTlsStream<TcpStream>>,
        chatroom: &Chatroom,
    ) {
        let _ = socket
                            .send(Message::Text(Utf8Bytes::from(
                                json!({
                                   "event":"pusher:subscribe","data":{"auth":"","channel":format!("channel_{}",chatroom.channel_id)}
                                })
                                .to_string(),
                            )))
                            .await
                            .map_err(|e| log::error!("Kick channel_ subscription error: {}", e.to_string()));
        let _ = socket
                            .send(Message::Text(Utf8Bytes::from(
                                json!({
                                    "event":"pusher:subscribe","data":{"auth":"","channel":format!("channel.{}",chatroom.channel_id)}
                                })
                                .to_string(),
                            )))
                            .await
                            .map_err(|e| log::error!("Kick channel. subscription error: {}", e.to_string()));
        let _ = socket
                            .send(Message::Text(Utf8Bytes::from(
                                json!({
                                    "event":"pusher:subscribe","data":{"auth":"","channel":format!("chatrooms.{}.v2",chatroom.id)}
                                })
                                .to_string(),
                            )))
                            .await
                            .map_err(|e| log::error!("Kick chatrooms.v2 subscription error: {}", e.to_string()));
        let _ = socket
                            .send(Message::Text(Utf8Bytes::from(
                                json!({
                                    "event":"pusher:subscribe","data":{"auth":"","channel":format!("chatroom_{}",chatroom.id)}
                                })
                                .to_string(),
                            )))
                            .await
                            .map_err(|e| log::error!("Kick chatroom_ subscription error: {}", e.to_string()));
        let _ = socket
                            .send(Message::Text(Utf8Bytes::from(
                                json!({
                                    "event":"pusher:subscribe","data":{"auth":"","channel":format!("chatrooms.{}",chatroom.id)}
                                })
                                .to_string(),
                            )))
                            .await
                            .map_err(|e| log::error!("Kick chatrooms. subscription error: {}", e.to_string()));
    }
}

#[async_trait]
impl KickApi for KickService {
    async fn auth_session(&self) -> MutexGuard<'_, Option<KickAuthSession>> {
        self.auth_session.lock().await
    }
    fn kick_token_endpoint(&self) -> String {
        self.kick_token_endpoint.clone()
    }

    fn kick_client_id(&self) -> String {
        self.kick_client_id.clone()
    }

    fn scopes(&self) -> String {
        self.scopes.clone()
    }
    fn kick_redirect_uri(&self) -> String {
        self.kick_redirect_uri.clone()
    }

    fn app_token(&self) -> String {
        self.app_token.clone()
    }

    fn set_is_close_connection(&self, is_close_connection: bool) {
        self.is_close_connection
            .store(is_close_connection, Ordering::Relaxed);
    }

    fn expire_at(&self) -> Arc<AtomicU64> {
        self.expire_at.clone()
    }
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
                label: b.metadata.level.map(|l| format!("Level {}", l)),
                image_url: Some(b.image_url.clone()),
            })
            .collect();
        let badges = [badges_v1, badges_v2].concat();
        let fragments = EventsService::parse_kick_content(&k.content);
        let raw_message_ref: Option<String> = match k.metadata {
            Some(m) => Some(m.message_ref),
            _ => None,
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
                text: EventsService::strip_kick_emotes(&k.content),
                fragments,
                message_type: ChatMessageType::Text,
                reply: None,
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
