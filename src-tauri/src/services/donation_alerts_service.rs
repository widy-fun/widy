use crate::{
    error::AppError,
    repositories::ServicesRepository,
    services::{DatabaseService, EventsService},
    utils::send_request,
};
use entity::{
    services::{DonationAlertsAuth, ServiceAuth, ServiceType},
    settings::Currency,
};
use futures::{SinkExt, StreamExt};
use serde::{Deserialize, Serialize};
use serde_json::json;
use std::sync::{Arc, Mutex};
use tauri::{AppHandle, Manager};
use tokio_tungstenite::{
    connect_async,
    tungstenite::{Message, Utf8Bytes},
};
use tokio_util::sync::CancellationToken;

#[derive(Debug, Clone, Deserialize)]
#[serde(untagged)]
enum WebsocketMessage {
    Client(ClientMessage),
    Donation(DonationMessage),
}
#[derive(Debug, Clone, Deserialize)]
struct ClientMessage {
    result: ClientMessageResult,
}
#[derive(Debug, Clone, Deserialize)]
struct DonationMessage {
    result: DonationMessageResult,
}
#[derive(Debug, Clone, Deserialize)]
struct ClientMessageResult {
    client: String,
}
#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
struct DonationMessageResult {
    channel: String,
    data: DonationMessageData,
}
#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
struct DonationMessageData {
    seq: u64,
    data: Donation,
}
#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
struct Donation {
    id: u64,
    name: String,
    username: Option<String>,
    message: String,
    message_type: String,
    payin_system: Option<String>,
    amount: f64,
    amount_in_user_currency: f64,
    currency: Currency,
    recipient_name: String,
    is_shown: u8,
}

#[derive(Debug, Clone, Deserialize)]
struct ChannelsResponse {
    channels: Vec<Channel>,
}

#[derive(Debug, Clone, Deserialize)]
struct Channel {
    channel: String,
    token: String,
}
#[derive(Debug, Clone, Deserialize)]
struct UserInfoResponse {
    data: UserInfo,
}
#[derive(Debug, Clone, Serialize)]
struct SubscriptionBody {
    channels: Vec<String>,
    client: String,
}
#[derive(Debug, Clone, Deserialize)]
struct UserInfo {
    id: u64,
    socket_connection_token: String,
}
#[derive(Debug, Clone, Deserialize)]
struct AuthTokenResponse {
    data: AuthToken,
}
#[derive(Debug, Clone, Deserialize)]
struct AuthToken {
    token: String,
}
pub struct DonationAlertsService {
    cancellation_token: Arc<Mutex<CancellationToken>>,
}

impl DonationAlertsService {
    pub fn new() -> Self {
        Self {
            cancellation_token: Arc::new(Mutex::new(CancellationToken::new())),
        }
    }

    pub async fn connect(&self, app: &AppHandle) -> Result<(), AppError> {
        {
            let mut cancellation_token = self.cancellation_token.lock().unwrap();
            *cancellation_token = CancellationToken::new();
        }
        let database_service = app.state::<DatabaseService>();
        let service = database_service
            .get_service_with_auth_by_id(entity::services::ServiceType::DonationAlerts)
            .await?;
        if let Some(entity::services::Model {
            id: ServiceType::DonationAlerts,
            auth: Some(ServiceAuth::DonationAlerts(auth)),
            ..
        }) = service
        {
            let reqwest_client = app.state::<reqwest::Client>();
            let (auth_token, user_info) =
                match self.get_auth_user(&reqwest_client, &auth.token).await {
                    Ok(val) => val,
                    Err(e) => {
                        if let AppError::HttpStatus { status: 401, .. } = e {
                            let _ = database_service
                                .update_service_auth(ServiceType::DonationAlerts, None, false)
                                .await;
                        }
                        return Err(e);
                    }
                };
            database_service
                .update_service_auth(
                    ServiceType::DonationAlerts,
                    Some(ServiceAuth::DonationAlerts(DonationAlertsAuth {
                        token: auth.token,
                    })),
                    true,
                )
                .await?;
            self.run_websocket_client(app.clone(), user_info, auth_token)
                .await;
        }

        Ok(())
    }

    async fn run_websocket_client(&self, app: AppHandle, user_info: UserInfo, auth_token: String) {
        tauri::async_runtime::spawn(async move {
            let donation_alerts_service = app.state::<DonationAlertsService>();
            let reqwest_client = app.state::<reqwest::Client>();
            let cancellation_token = {
                donation_alerts_service
                    .cancellation_token
                    .lock()
                    .unwrap()
                    .clone()
            };
            let connect_url = "wss://centrifugo.donationalerts.com/connection/websocket";
            'connection_loop: loop {
                log::info!("Connecting to DonationAlerts websocket: {}", connect_url);
                let (mut socket, _) = match connect_async(connect_url).await {
                    Ok(socket) => socket,
                    Err(e) => {
                        log::error!("Failed to connect: {}", e);
                        tokio::time::sleep(std::time::Duration::from_secs(5)).await;
                        continue;
                    }
                };

                log::info!("DonationAlerts websocket connected.");

                let _ = socket
                    .send(Message::Text(Utf8Bytes::from(
                        json!({
                            "params": {
                                "token": user_info.socket_connection_token
                            },
                            "id": 1
                        })
                        .to_string(),
                    )))
                    .await
                    .map_err(|e| {
                        log::error!(
                            "DonationAlerts send connection message error: {}",
                            e.to_string()
                        )
                    });

                loop {
                    tokio::select! {
                        _ = cancellation_token.cancelled() => {
                            log::info!("Stopping DonationAlerts websocket.");
                            let _ = socket.send(Message::Close(None)).await;
                            break 'connection_loop;
                        }


                        msg = socket.next() => {
                            let Some(msg_result) = msg else {
                                log::warn!("DonationAlerts websocket ended.");
                                break;
                            };

                           match msg_result {
                                Ok(Message::Text(text)) => {
                                    if let Ok(message) =
                                        serde_json::from_str::<WebsocketMessage>(&text)
                                    {
                                        match message {
                                            WebsocketMessage::Client(client_message) => {
                                                let result = donation_alerts_service
                                                    .subscribe(
                                                        &reqwest_client,
                                                        &auth_token,
                                                        SubscriptionBody {
                                                            channels: vec![format!(
                                                                "$alerts:donation_{}",
                                                                user_info.id
                                                            )],
                                                            client: client_message.result.client,
                                                        },
                                                    )
                                                    .await;
                                                if let Ok(response) = result {
                                                    let _ = socket
                                                        .send(Message::Text(Utf8Bytes::from(json!({
                                                            "params": {
                                                                "channel": response.channels[0].channel,
                                                                "token": response.channels[0].token
                                                            },
                                                            "method": 1,
                                                            "id": 2
                                                        }).to_string())))
                                                        .await
                                                        .map_err(|e| log::error!("DonationAlerts subscription error: {}", e.to_string()));
                                                }
                                            }
                                            WebsocketMessage::Donation(donation_message) => {
                                                let donation = donation_message.result.data.data;
                                                #[cfg(not(debug_assertions))]
                                                if donation.payin_system.is_none() {
                                                    continue;
                                                }
                                                let _ = EventsService::donation(
                                                    donation.id.to_string(),
                                                    ServiceType::DonationAlerts,
                                                    donation.username,
                                                    donation.currency,
                                                    donation.amount,
                                                    Some(donation.message),
                                                    &app,
                                                )
                                                .await;
                                            }
                                        }
                                    }
                                }

                                Ok(Message::Close(_)) => {
                                    log::warn!("DonationAlerts closed connection.");
                                    break;
                                }
                                Err(e) => {
                                    log::error!("DonationAlerts websocket error: {}", e);
                                    break;
                                }
                                _ => {}
                            }
                        }
                    }
                }
            }
        });
    }

    async fn get_auth_user(
        &self,
        reqwest_client: &reqwest::Client,
        token: &str,
    ) -> Result<(String, UserInfo), AppError> {
        let auth_token = self.get_auth_token(&reqwest_client, &token).await?;
        let user_info = self.get_user_info(&reqwest_client, &auth_token).await?;
        Ok((auth_token, user_info))
    }

    async fn get_auth_token(
        &self,
        reqwest_client: &reqwest::Client,
        token: &str,
    ) -> Result<String, AppError> {
        let request = reqwest_client.get(format!(
            "https://www.donationalerts.com/api/v1/token/widget?token={}",
            token
        ));

        let json = send_request::<AuthTokenResponse>(request, "auth user", "DonationAlerts")
            .await?
            .ok_or(AppError::HttpRequest("Get auth token error".to_string()))?;

        Ok(json.data.token)
    }

    async fn get_user_info(
        &self,
        reqwest_client: &reqwest::Client,
        auth_token: &str,
    ) -> Result<UserInfo, AppError> {
        let request = reqwest_client
            .get("https://www.donationalerts.com/api/v1/user/widget")
            .bearer_auth(auth_token);

        let json = send_request::<UserInfoResponse>(request, "user info", "DonationAlerts")
            .await?
            .ok_or(AppError::HttpRequest("Get user info error".to_string()))?;
        Ok(json.data)
    }

    async fn subscribe(
        &self,
        reqwest_client: &reqwest::Client,
        auth_token: &str,
        body: SubscriptionBody,
    ) -> Result<ChannelsResponse, AppError> {
        let request = reqwest_client
            .post("https://www.donationalerts.com/api/v1/centrifuge/subscribe")
            .bearer_auth(auth_token)
            .json(&body);

        let json = send_request::<ChannelsResponse>(request, "subscribe", "DonationAlerts")
            .await?
            .ok_or(AppError::HttpRequest("Subscribe error".to_string()))?;
        Ok(json)
    }

    pub async fn sign_out(&self, app: &AppHandle) -> Result<(), AppError> {
        let database_service = app.state::<DatabaseService>();
        database_service
            .update_service_auth(ServiceType::DonationAlerts, None, false)
            .await?;
        {
            self.cancellation_token.lock().unwrap().cancel();
        }
        Ok(())
    }
}
