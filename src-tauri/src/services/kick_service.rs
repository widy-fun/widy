use base64::{engine::general_purpose::URL_SAFE_NO_PAD, Engine};
use chrono::Utc;
use entity::{
    goals::GoalType,
    raids,
    redemptions::Redemption,
    rewards::Platform,
    services::{KickAuth, ServiceAuth, ServiceType},
    subscriptions::Subscription,
};
use futures::{SinkExt, StreamExt};
use rand::Rng;
use serde::{Deserialize, Serialize};
use serde_json::json;
use sha2::{Digest, Sha256};
use std::sync::{
    atomic::{AtomicBool, Ordering},
    Arc,
};
use tauri::{AppHandle, Manager};
use tauri_plugin_opener::OpenerExt;
use tokio::{net::TcpStream, sync::Mutex};
use tokio_tungstenite::{
    connect_async,
    tungstenite::{Message, Utf8Bytes},
    MaybeTlsStream, WebSocketStream,
};
use uuid::Uuid;

use crate::{
    repositories::{RewardsRepository, ServicesRepository},
    services::{DatabaseService, GrantType},
    utils::{on_new_raid, on_new_redemption, on_new_subscription},
};

#[derive(Debug, Serialize)]
struct RefreshTokenBody {
    pub grant_type: GrantType,
    pub refresh_token: String,
    pub app_token: String,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
struct AddKickRewardBody {
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
struct PusherEvent {
    pub chanel: Option<String>,
    pub data: String,
    pub event: Event,
}

#[derive(Debug, Clone, Deserialize)]
enum Event {
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
struct StopStreamBroadcastData {
    pub livestream: StopStreamBroadcastLivestream,
}
#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
struct StopStreamBroadcastLivestream {
    pub id: u64,
    pub channel: StopStreamBroadcastChanel,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
struct StopStreamBroadcastChanel {
    pub id: u64,
    pub is_banned: bool,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
struct SubscriptionData {
    pub chatroom_id: u64,
    pub username: String,
    pub months: u64,
}
#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
struct ChatMessageData {
    pub id: String,
    pub chatroom_id: u64,
    pub content: String,
    pub r#type: String,
    pub created_at: String,
    pub sender: Sender,
    pub metadata: Metadata,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
struct RewardRedeemedData {
    pub reward_title: String,
    pub user_id: u64,
    pub channel_id: u64,
    pub username: String,
    pub user_input: Option<String>,
    pub reward_background_color: String,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
struct StreamHostData {
    pub chatroom_id: u64,
    pub number_viewers: u32,
    pub optional_message: Option<String>,
    pub host_username: String,
}
#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
struct GiftedSubscriptionsData {
    pub chatroom_id: u64,
    pub gifted_usernames: Vec<String>,
    pub gifter_username: String,
    pub gifted_total: u32,
    pub gifter_total: u32,
}
#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
struct KicksGiftedData {
    pub gift_transaction_id: String,
    pub message: String,
    pub sender: KicksSender,
    pub gift: Gift,
    pub created_at: String,
    pub expires_at: String,
}
#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
struct KicksSender {
    pub id: u64,
    pub username: String,
    pub username_color: String,
    pub profile_picture: String,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
struct Gift {
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
struct MessageDeletedData {
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
struct StreamerIsLiveData {
    pub livestream: StreamerIsLiveLivestream,
}
#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
struct StreamerIsLiveLivestream {
    pub id: u64,
    pub channel_id: u64,
    pub session_title: String,
    pub source: Option<String>,
    pub created_at: String,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]

struct Sender {
    pub id: u64,
    pub username: String,
    pub slug: String,
    pub identity: Identity,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]

struct Identity {
    pub color: String,
    pub badges: Vec<Badge>,
    pub badges_v2: Vec<BadgeV2>,
}

#[derive(Debug, Clone, Deserialize)]
struct Badge {}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]

struct BadgeMetadata {
    pub level: Option<u32>,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]

struct Metadata {
    pub message_ref: String,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]

struct BadgeV2 {
    pub name: String,
    pub badge_type: String,
    pub image_url: String,
    pub metadata: BadgeMetadata,
    pub selected: bool,
    pub sort_order: u32,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
struct ChanelInfoResponse {
    pub id: u64,
    pub user_id: u64,
    pub slug: String,
    pub is_banned: bool,
    pub user: User,
    pub chatroom: Chatroom,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
struct User {
    pub id: u64,
    pub username: String,
}
#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
struct Chatroom {
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
struct UserInfoResponse {
    pub data: Vec<UserInfo>,
    pub message: String,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]

struct UserInfo {
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

pub struct KickService {
    is_close_connection: Arc<AtomicBool>,
    pub kick_client_id: String,
    pub kick_token_endpoint: String,
    pub kick_redirect_uri: String,
    pub scopes: String,
    pub app_token: String,
    pub auth_session: Mutex<Option<KickAuthSession>>,
}

impl KickService {
    pub fn new(
        kick_client_id: String,
        kick_token_endpoint: String,
        kick_redirect_uri: String,
        app_token: String,
    ) -> Self {
        Self {
            is_close_connection: Arc::new(AtomicBool::new(false)),
            kick_client_id,
            kick_token_endpoint,
            kick_redirect_uri,
            scopes: "user:read events:subscribe channel:rewards:write".to_string(),
            app_token,
            auth_session: Mutex::new(None),
        }
    }

    pub async fn connect(&self, app: &AppHandle) -> Result<(), String> {
        let auth = self.check_auth(app).await?;
        let reqwest_client = app.state::<reqwest::Client>();
        let user_info = self
            .get_user_info(&reqwest_client, &auth.access_token)
            .await?;
        let chanel_info_response = self
            .get_chanel_info(&reqwest_client, &user_info.name)
            .await?;
        let app_clone = app.clone();
        self.run_websocket_client(app_clone, chanel_info_response.chatroom)
            .await;
        Ok(())
    }

    async fn run_websocket_client(&self, app: AppHandle, chatroom: Chatroom) {
        tauri::async_runtime::spawn(async move {
            let kick_service = app.state::<KickService>();
            let database_service = app.state::<DatabaseService>();
            let connect_url = "wss://ws-us2.pusher.com/app/32cbd69e4b950bf97679?protocol=7&client=js&version=8.5.0&flash=false";
            'connection_loop: loop {
                log::info!("Connecting to Kick websocket: {}", connect_url);
                match connect_async(connect_url).await {
                    Ok((mut socket, _)) => {
                        log::info!("Kick websocket connected.");
                        kick_service
                            .create_subscriptions(&mut socket, &chatroom)
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
                                    if let Ok(pusher_event) =
                                        serde_json::from_str::<PusherEvent>(&text)
                                    {
                                        match pusher_event.event {
                                            Event::RewardRedeemedEvent => {
                                                let event_data =
                                                    serde_json::from_str::<RewardRedeemedData>(
                                                        &pusher_event.data,
                                                    );
                                                if let Ok(data) = event_data {
                                                    if let Ok(Some(reward)) = database_service
                                                        .get_reward_by_title(
                                                            &data.reward_title,
                                                            Platform::Kick,
                                                        )
                                                        .await
                                                    {
                                                        let message_id = Uuid::new_v4().to_string();
                                                        let redemption = Redemption {
                                                            id: Uuid::new_v4().to_string(),
                                                            user_id: data.user_id.to_string(),
                                                            user_name: data.username,
                                                            user_input: data.user_input,
                                                            external_id: message_id.clone(),
                                                            reward_id: reward.id,
                                                            description: None,
                                                            title: data.reward_title,
                                                            cost: reward.cost,
                                                            r#type: reward.r#type.clone(),
                                                            platform: reward.platform,
                                                            media: None,
                                                            points_currency_ratio: reward
                                                                .points_currency_ratio,
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
                                                        let _ = on_new_redemption(
                                                            redemption,
                                                            reward.r#type,
                                                            &app,
                                                        )
                                                        .await;
                                                    }
                                                }
                                            }
                                            Event::GiftedSubscriptionsEvent => {
                                                let event_data = serde_json::from_str::<
                                                    GiftedSubscriptionsData,
                                                >(
                                                    &pusher_event.data
                                                );
                                                if let Ok(data) = event_data {
                                                    let message_id = Uuid::new_v4().to_string();
                                                    let created_at = Utc::now().timestamp();
                                                    let subscription = Subscription {
                                                        id: Uuid::new_v4().to_string(),
                                                        user_id: data.gifter_username.clone(),
                                                        service_id: message_id.clone(),
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
                                                    };
                                                    let _ = on_new_subscription(
                                                        subscription,
                                                        GoalType::KickSubscription,
                                                        &app,
                                                    )
                                                    .await;
                                                }
                                            }
                                            Event::SubscriptionEvent => {
                                                let event_data =
                                                    serde_json::from_str::<SubscriptionData>(
                                                        &pusher_event.data,
                                                    );
                                                if let Ok(data) = event_data {
                                                    let message_id = Uuid::new_v4().to_string();
                                                    let created_at = Utc::now().timestamp();
                                                    let subscription = Subscription {
                                                        id: Uuid::new_v4().to_string(),
                                                        user_id: data.username.clone(),
                                                        service_id: message_id.clone(),
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
                                                    };
                                                    let _ = on_new_subscription(
                                                        subscription,
                                                        GoalType::KickSubscription,
                                                        &app,
                                                    )
                                                    .await;
                                                }
                                            }
                                            Event::StreamHostEvent => {
                                                let event_data =
                                                    serde_json::from_str::<StreamHostData>(
                                                        &pusher_event.data,
                                                    );
                                                if let Ok(data) = event_data {
                                                    let created_at = Utc::now().timestamp();
                                                    let message_id = Uuid::new_v4().to_string();

                                                    let raid = raids::Raid {
                                                        id: Uuid::new_v4().to_string(),
                                                        service_id: message_id.clone(),
                                                        message_id: message_id,
                                                        played: false,
                                                        service: ServiceType::Kick,
                                                        viewers: data.number_viewers,
                                                        from_broadcaster_user_id: data
                                                            .host_username
                                                            .clone(),
                                                        from_broadcaster_user_name: data
                                                            .host_username,
                                                        created_at,
                                                    };
                                                    let _ = on_new_raid(raid, &app).await;
                                                }
                                            }
                                            _ => {}
                                        }
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
                            .map_err(|e| log::error!("{}", e.to_string()));
        let _ = socket
                            .send(Message::Text(Utf8Bytes::from(
                                json!({
                                    "event":"pusher:subscribe","data":{"auth":"","channel":format!("channel.{}",chatroom.channel_id)}
                                })
                                .to_string(),
                            )))
                            .await
                            .map_err(|e| log::error!("{}", e.to_string()));
        let _ = socket
                            .send(Message::Text(Utf8Bytes::from(
                                json!({
                                    "event":"pusher:subscribe","data":{"auth":"","channel":format!("chatrooms.{}.v2",chatroom.id)}
                                })
                                .to_string(),
                            )))
                            .await
                            .map_err(|e| log::error!("{}", e.to_string()));
        let _ = socket
                            .send(Message::Text(Utf8Bytes::from(
                                json!({
                                    "event":"pusher:subscribe","data":{"auth":"","channel":format!("chatroom_{}",chatroom.id)}
                                })
                                .to_string(),
                            )))
                            .await
                            .map_err(|e| log::error!("{}", e.to_string()));
        let _ = socket
                            .send(Message::Text(Utf8Bytes::from(
                                json!({
                                    "event":"pusher:subscribe","data":{"auth":"","channel":format!("chatrooms.{}",chatroom.id)}
                                })
                                .to_string(),
                            )))
                            .await
                            .map_err(|e| log::error!("{}", e.to_string()));
    }

    pub async fn authorize(&self, app: &AppHandle) -> Result<(), String> {
        let state = "state";
        let code_verifier = self.generate_verifier();
        let code_challenge = self.generate_challenge(&code_verifier);
        let mut auth_session = self.auth_session.lock().await;
        *auth_session = Some(KickAuthSession {
            state: state.to_string(),
            code_verifier,
        });
        let _ = app.opener().open_url(
            format!(
                "https://id.kick.com/oauth/authorize?client_id={}&response_type=code&redirect_uri={}&state={}&scope={}&code_challenge={}&code_challenge_method=S256",
                self.kick_client_id,
                self.kick_redirect_uri,
                state,
                self.scopes,
                code_challenge
            ),
            None::<&str>,
        );
        Ok(())
    }

    pub async fn add_custom_reward(
        &self,
        app: &AppHandle,
        auth: &KickAuth,
        reward: &entity::rewards::Model,
    ) -> Result<(), String> {
        let database_service = app.state::<DatabaseService>();
        let reqwest_client = app.state::<reqwest::Client>();
        let twitch_reward_body = AddKickRewardBody {
            title: reward.title.clone(),
            cost: reward.cost,
            description: reward.description.clone(),
            background_color: Some(reward.background_color.clone()),
            is_user_input_required: reward.is_user_input_required,
            is_enabled: reward.is_enabled,
            should_redemptions_skip_request_queue: reward.should_redemptions_skip_request_queue,
        };

        let response = reqwest_client
            .post("https://api.kick.com/public/v1/channels/rewards")
            .bearer_auth(&auth.access_token)
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
            log::error!("Kick error response: {}", err_text);
            return Err(err_text);
        }

        let json: serde_json::Value = response.json().await.map_err(|e| {
            log::error!("{}", e.to_string());
            e.to_string()
        })?;

        let reward_id = json["data"]["id"]
            .as_str()
            .map(|s| s.to_string())
            .ok_or("Kick reward create error".to_string())?;

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
        auth: &KickAuth,
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
                "https://api.kick.com/public/v1/channels/rewards/{}",
                reward
                    .external_id
                    .ok_or("Reward external_id not exist".to_string())?
            ))
            .bearer_auth(&auth.access_token)
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
            log::error!("Kick error response: {}", err_text);
            return Err(err_text);
        }

        Ok(())
    }

    async fn get_chanel_info(
        &self,
        reqwest_client: &reqwest::Client,
        name: &String,
    ) -> Result<ChanelInfoResponse, String> {
        let response = reqwest_client
            .get(format!("https://kick.com/api/v2/channels/{}", name))
            .send()
            .await
            .map_err(|e| {
                log::error!("Failed to send chanel info request: {}", e);
                e.to_string()
            })?;

        let chanel_info_response: ChanelInfoResponse = response.json().await.map_err(|e| {
            log::error!("{}", e.to_string());
            e.to_string()
        })?;

        Ok(chanel_info_response)
    }

    async fn get_user_info(
        &self,
        reqwest_client: &reqwest::Client,
        access_token: &String,
    ) -> Result<UserInfo, String> {
        let response = reqwest_client
            .get("https://api.kick.com/public/v1/users")
            .bearer_auth(access_token)
            .send()
            .await
            .map_err(|e| {
                log::error!("Failed to send user info request: {}", e);
                e.to_string()
            })?;

        let user_info: UserInfoResponse = response.json().await.map_err(|e| {
            log::error!("Failed parse user info: {}", e.to_string());
            e.to_string()
        })?;

        Ok(user_info
            .data
            .into_iter()
            .next()
            .ok_or("Kick user empty".to_string())?)
    }

    fn generate_verifier(&self) -> String {
        let mut array = [0u8; 64];
        rand::rng().fill_bytes(&mut array);
        URL_SAFE_NO_PAD.encode(array)
    }

    fn generate_challenge(&self, verifier: &str) -> String {
        let hash = Sha256::digest(verifier.as_bytes());
        URL_SAFE_NO_PAD.encode(hash)
    }

    async fn refresh_and_update_auth(
        &self,
        reqwest_client: &reqwest::Client,
        database_service: &DatabaseService,
        old_auth: &KickAuth,
    ) -> Result<KickAuth, String> {
        match self
            .refresh_token(reqwest_client, old_auth.refresh_token.clone())
            .await
        {
            Ok(new_auth) => {
                self.set_authorized(
                    database_service,
                    Some(ServiceAuth::Kick(new_auth.clone())),
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

    async fn refresh_token(
        &self,
        reqwest_client: &reqwest::Client,
        refresh_token: String,
    ) -> Result<KickAuth, String> {
        let response = reqwest_client
            .post(&self.kick_token_endpoint)
            .json(&RefreshTokenBody {
                grant_type: GrantType::RefreshToken,
                refresh_token,
                app_token: self.app_token.clone(),
            })
            .send()
            .await
            .map_err(|e| {
                log::error!("Failed to refresh token: {}", e);
                e.to_string()
            })?;

        if !response.status().is_success() {
            let bad_response = response.json().await.map_err(|e| {
                log::error!("{}", e.to_string());
                e.to_string()
            })?;

            return Err(bad_response);
        }

        let refresh_token_response: KickAuth = response.json().await.map_err(|e| {
            log::error!("{}", e.to_string());
            e.to_string()
        })?;

        Ok(refresh_token_response)
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
            .update_service_auth(ServiceType::Kick, auth, authorized)
            .await
    }

    pub async fn check_auth(&self, app: &AppHandle) -> Result<KickAuth, String> {
        let database_service = app.state::<DatabaseService>();
        let reqwest_client = app.state::<reqwest::Client>();
        let service = database_service
            .get_service_with_auth_by_id(ServiceType::Kick)
            .await?;

        let service = service.ok_or_else(|| "Service not found".to_string())?;

        let auth = match service.auth {
            Some(ServiceAuth::Kick(auth)) => auth,
            _ => return Err("No Kick authentication found".to_string()),
        };
        self.refresh_and_update_auth(&reqwest_client, &database_service, &auth)
            .await
    }

    pub async fn sign_out(&self, app: &AppHandle) -> Result<(), String> {
        let database_service = app.state::<DatabaseService>();
        self.set_authorized(&database_service, None, false, true)
            .await
    }
}
