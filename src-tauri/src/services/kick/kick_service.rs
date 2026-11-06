use crate::{
    services::{CommandsService, EventsService, kick::kick_api::KickApi},
    utils::get_random_alert,
};
use chrono::Utc;
use database::{DatabaseService, RewardsRepository};
use entity::{
    goals::GoalType, messages::MessageType, raids, redemptions::Redemption, rewards::Platform,
    services::ServiceType, settings::Currency, subscriptions::Subscription,
};
use futures::{SinkExt, StreamExt};
use model::error::{AppError, log_and_wrap_error};
use model::{
    events::{UnifiedBannedUser, UnifiedChatMessage},
    items_buffer::ItemsBuffer,
    kick::{
        ChanelInfoResponse, ChatMessageData, Chatroom, Event, EventPayload,
        GiftedSubscriptionsData, KickAuthSession, KickPushMessage, KicksGiftedData,
        MessageDeletedData, RewardRedeemedData, StreamHostData, SubscriptionData, UserBannedData,
    },
};
use serde_json::json;
use std::sync::{Arc, Mutex, atomic::AtomicU64};
use tauri::{AppHandle, Manager};
use tokio::net::TcpStream;
use tokio_tungstenite::{
    MaybeTlsStream, WebSocketStream, connect_async,
    tungstenite::{Message, Utf8Bytes},
};
use tokio_util::sync::CancellationToken;
use uuid::Uuid;

pub struct KickService {
    pub kick_client_id: String,
    pub kick_token_endpoint: String,
    pub kick_redirect_uri: String,
    pub scopes: String,
    pub app_token: String,
    pub auth_session: Mutex<Option<KickAuthSession>>,
    pub chat_messages_buffer: Arc<Mutex<ItemsBuffer<UnifiedChatMessage>>>,
    pub(crate) expire_at: Arc<AtomicU64>,
    pub(crate) cancellation_token: Arc<Mutex<CancellationToken>>,
    pub(crate) reqwest_client: reqwest::Client,
    pub(crate) service_type: ServiceType,
}

impl KickService {
    pub fn new(
        kick_client_id: String,
        kick_token_endpoint: String,
        kick_redirect_uri: String,
        app_token: String,
        reqwest_client: reqwest::Client,
    ) -> Self {
        let scopes = "user:read channel:read channel:write channel:rewards:read channel:rewards:write chat:write events:subscribe moderation:ban moderation:chat_message:manage kicks:read".to_string();

        Self {
            kick_client_id,
            kick_token_endpoint,
            kick_redirect_uri,
            scopes,
            app_token,
            auth_session: Mutex::new(None),
            chat_messages_buffer: Arc::new(Mutex::new(ItemsBuffer::new(2000))),
            expire_at: Arc::new(AtomicU64::new(0)),
            cancellation_token: Arc::new(Mutex::new(CancellationToken::new())),
            reqwest_client,
            service_type: ServiceType::Kick,
        }
    }

    pub async fn connect(&self, app: &AppHandle) -> Result<(), AppError> {
        {
            let mut cancellation_token = self.cancellation_token.lock().unwrap();
            *cancellation_token = CancellationToken::new();
        }
        let user_info = self.get_user_info(app).await?;
        let chanel_info_response = self.get_chanel_info(&user_info.name).await?;

        let app_clone = app.clone();
        self.run_websocket_client(app_clone, chanel_info_response)
            .await;
        Ok(())
    }

    async fn run_websocket_client(&self, app: AppHandle, chanel_info_response: ChanelInfoResponse) {
        tauri::async_runtime::spawn(async move {
            let kick_service = app.state::<KickService>();
            let cancellation_token = kick_service.cancellation_token();
            #[cfg(not(feature = "mock"))]
            let connect_url = "wss://realtime.us-east-1.platform.kick.com/connection/websocket";
            #[cfg(feature = "mock")]
            let connect_url = &std::env::var("KICK_MOCK_WS_URL").expect("KICK_MOCK_WS_URL not set");
            'connection_loop: loop {
                log::info!("Connecting to Kick websocket: {}", connect_url);

                let (mut socket, _) = match connect_async(connect_url).await {
                    Ok(socket) => socket,
                    Err(e) => {
                        log::error!("Failed to connect: {}", e);
                        tokio::time::sleep(std::time::Duration::from_secs(5)).await;
                        continue;
                    }
                };

                log::info!("Kick websocket connected.");

                let _ = kick_service
                    .create_subscriptions(&mut socket, &chanel_info_response.chatroom)
                    .await
                    .map_err(|e| log_and_wrap_error("create kick subscriptions", e));

                loop {
                    tokio::select! {
                        _ = cancellation_token.cancelled() => {
                            log::info!("Stopping Kick websocket.");
                            let _ = socket.send(Message::Close(None)).await;
                            break 'connection_loop;
                        }

                        msg = socket.next() => {
                            let Some(msg_result) = msg else {
                                log::warn!("Kick websocket ended.");
                                break;
                            };

                           match msg_result {
                               Ok(Message::Text(text)) => {
                                    if let Ok(message) = serde_json::from_str::<KickPushMessage>(&text) {
                                        kick_service.handle_subscriptions(message.push.r#pub.data, &app).await;
                                    }
                                    else if text=="{}" {
                                        let _ = socket.send(Message::Text(Utf8Bytes::from("{}"))).await;
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
                                _ => {}}
                        }
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
                            tts: None,
                            points_currency_ratio: reward.points_currency_ratio,
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
                        alert: get_random_alert(app, MessageType::GiftSubscription)
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
                    {
                        let mut chat_messages_buffer = self.chat_messages_buffer.lock().unwrap();
                        chat_messages_buffer.push(message.clone());
                    }
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
            Event::UserBannedEvent => {
                let event_data = serde_json::from_str::<UserBannedData>(&payload.data);
                if let Ok(data) = event_data {
                    let _ = EventsService::user_banned_in_chat(UnifiedBannedUser::from(data), app)
                        .await;
                }
            }
            Event::StreamerIsLive => {
                let _ = CommandsService::kick_stream_start(app).await;
            }
            Event::StopStreamBroadcast => {
                let _ = CommandsService::kick_stream_stop(app).await;
            }
            _ => {}
        }
    }

    async fn create_subscriptions(
        &self,
        socket: &mut WebSocketStream<MaybeTlsStream<TcpStream>>,
        chatroom: &Chatroom,
    ) -> Result<(), AppError> {
        let realtime_auth_connection_response = self
            .realtime_auth_connection(Uuid::new_v4())
            .await?
            .ok_or(AppError::Custom("Empty realtime auth data".to_string()))?;
        let _ = socket
            .send(Message::Text(Utf8Bytes::from(
                json!({
                   "connect":{"token":realtime_auth_connection_response.data.token,"name":"js"},"id":1
                })
                .to_string(),
            )))
            .await
            .map_err(|e| log::error!("Connect subscription error: {}", e.to_string()));

        let _ = socket
            .send(Message::Text(Utf8Bytes::from(
                json!({
                  "subscribe":{"channel":format!("channel_{}",chatroom.channel_id),"flag":1},"id":2
                })
                .to_string(),
            )))
            .await
            .map_err(|e| log::error!("Kick channel. subscription error: {}", e.to_string()));

        let _ = socket
            .send(Message::Text(Utf8Bytes::from(
                json!({
                    "subscribe":{"channel":format!("chatroom_{}",chatroom.id),"flag":1},"id":3
                })
                .to_string(),
            )))
            .await
            .map_err(|e| log::error!("Kick chatroom_ subscription error: {}", e.to_string()));

        let _ = socket
            .send(Message::Text(Utf8Bytes::from(
                json!({
                    "subscribe":{"channel":format!("chatrooms.{}",chatroom.id),"flag":1},"id":4
                })
                .to_string(),
            )))
            .await
            .map_err(|e| log::error!("Kick chatrooms. subscription error: {}", e.to_string()));

        let _ = socket
            .send(Message::Text(Utf8Bytes::from(
                json!({
                    "subscribe":{"channel":format!("chatrooms.{}.v2",chatroom.id),"flag":1},"id":5
                })
                .to_string(),
            )))
            .await
            .map_err(|e| log::error!("Kick chatrooms.v2 subscription error: {}", e.to_string()));

        Ok(())
    }
}
