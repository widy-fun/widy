use std::sync::{Arc, Mutex};

use entity::services::{DonatePayAuth, ServiceAuth, ServiceType};
use futures::{SinkExt, StreamExt};
use serde::{Deserialize, Serialize};
use serde_json::json;
use tauri::{AppHandle, Manager};
use tokio_tungstenite::{connect_async, tungstenite::Message};
use tokio_util::sync::CancellationToken;

use crate::{
    error::AppError,
    repositories::ServicesRepository,
    services::{DatabaseService, EventsService},
    utils::send_request,
};

#[derive(Debug, Serialize, Deserialize)]
struct WidgetEvent {
    pub result: EventResult,
}

#[derive(Debug, Serialize, Deserialize)]
struct EventResult {
    pub channel: String,
    pub data: EventData,
}

#[derive(Debug, Serialize, Deserialize)]
struct EventData {
    pub data: InnerData,
    pub offset: u64,
}

#[derive(Debug, Serialize, Deserialize)]
struct InnerData {
    #[serde(rename = "type")]
    pub event_type: String,
    pub notification: EventNotification,
}
#[derive(Debug, Serialize, Deserialize)]
enum NotificationType {
    #[serde(rename = "donation")]
    Donation,
    Any,
}

#[derive(Debug, Serialize, Deserialize)]
struct EventNotification {
    #[serde(rename = "type")]
    pub notification_type: NotificationType,
    pub user_id: u64,
    pub vars: String,
}

#[derive(Debug, Serialize, Deserialize)]
struct EventVars {
    pub name: String,
    pub comment: Option<String>,
    pub sum: f64,
    pub target: String,
    pub video_link: String,
    pub video_id: String,
}

#[derive(Deserialize)]
struct TokenResponse {
    token: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct UserInfoResponse {
    pub status: String,
    pub time: String,
    pub data: UserInfo,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct UserInfo {
    pub id: u64,
    pub name: String,
    pub avatar: String,
    pub balance: u64,
    pub cashout_sum: u64,
}

pub struct DonatePayService {
    cancellation_token: Arc<Mutex<CancellationToken>>,
}

impl DonatePayService {
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
            .get_service_with_auth_by_id(entity::services::ServiceType::DonatePay)
            .await?;
        if let Some(entity::services::Model {
            id: ServiceType::DonatePay,
            auth: Some(ServiceAuth::DonatePay(auth)),
            ..
        }) = service
        {
            let reqwest_client = app.state::<reqwest::Client>();
            match self
                .get_user_info(&reqwest_client, &auth.access_token)
                .await
            {
                Ok(user_info) => {
                    database_service
                        .update_service_auth(
                            ServiceType::DonatePay,
                            Some(ServiceAuth::DonatePay(DonatePayAuth {
                                access_token: auth.access_token.clone(),
                            })),
                            true,
                        )
                        .await?;
                    let token = self.get_token(&reqwest_client, &auth.access_token).await?;
                    self.run_websocket_client(app.clone(), user_info, token)
                        .await;
                }
                Err(e) => {
                    if let AppError::HttpStatus { status: 401, .. } = e {
                        database_service
                            .update_service_auth(ServiceType::DonatePay, None, false)
                            .await?;
                    }
                    return Err(e);
                }
            }
        }

        Ok(())
    }

    async fn run_websocket_client(&self, app: AppHandle, user_info: UserInfo, token: String) {
        tauri::async_runtime::spawn(async move {
            let donate_pay_service = app.state::<DonatePayService>();
            let cancellation_token = {
                donate_pay_service
                    .cancellation_token
                    .lock()
                    .unwrap()
                    .clone()
            };
            'connection_loop: loop {
                log::info!("Connecting to DonatePay websocket");
                let (mut socket, _) =
                    match connect_async("wss://centrifugo.donatepay.ru:443/connection/websocket")
                        .await
                    {
                        Ok(socket) => socket,
                        Err(e) => {
                            log::error!("Failed to connect: {}", e);
                            tokio::time::sleep(std::time::Duration::from_secs(5)).await;
                            continue;
                        }
                    };

                log::info!("DonatePay websocket connected.");

                let auth_msg = json!({
                    "params": { "token": token, "name": "js" },
                    "id": 1,
                });
                let sub_msg = json!({
                    "method": 1,
                    "params": { "channel": format!("widgets:LastEvents#{}", user_info.id) },
                    "id": 2,
                });

                if let Err(e) = socket
                    .send(Message::Text(auth_msg.to_string().into()))
                    .await
                {
                    log::error!("Failed to send DonatePay auth: {e}");
                    continue 'connection_loop;
                }
                if let Err(e) = socket.send(Message::Text(sub_msg.to_string().into())).await {
                    log::error!("Failed to send subscription: {e}");
                    continue 'connection_loop;
                }

                loop {
                    tokio::select! {
                    _ = cancellation_token.cancelled() => {
                        log::info!("Stopping DonatePay websocket.");
                        let _ = socket.send(Message::Close(None)).await;
                        break 'connection_loop;
                    }
                    msg = socket.next() => {
                        let Some(msg_result) = msg else {
                            log::warn!("DonatePay websocket ended.");
                            break;
                        };
                        match msg_result {
                            Ok(Message::Text(text)) => {
                                if let Ok(event) = serde_json::from_str::<WidgetEvent>(&text) {
                                    if let NotificationType::Donation =
                                        event.result.data.data.notification.notification_type
                                    {
                                        let vars = event.result.data.data.notification.vars;
                                        if let Ok(event_vars) =
                                            serde_json::from_str::<EventVars>(&vars)
                                        {
                                            let service_id = uuid::Uuid::new_v4().to_string();
                                            let _ = EventsService::donation(
                                                service_id,
                                                ServiceType::DonatePay,
                                                Some(event_vars.name),
                                                entity::settings::Currency::RUB,
                                                event_vars.sum,
                                                event_vars.comment,
                                                &app,
                                            )
                                            .await;
                                        } else {
                                            log::error!(
                                                "Failed to parse event vars for message: {}",
                                                text
                                            );
                                        }
                                    }
                                }
                            }

                            Ok(Message::Close(_)) => {
                                log::warn!("DonatePay closed connection.");
                                break;
                            }
                            Err(e) => {
                                log::error!("DonatePay WebSocket error: {}", e);
                                break;
                            }
                            _ => {}
                        }}}
                }
            }
        });
    }

    async fn get_token(
        &self,
        reqwest_client: &reqwest::Client,
        access_token: &str,
    ) -> Result<String, AppError> {
        let request = reqwest_client
            .post("https://donatepay.ru/api/v2/socket/token")
            .json(&serde_json::json!({ "access_token": access_token }));
        let token_response = send_request::<TokenResponse>(request, "token", "DonatePay")
            .await?
            .ok_or(AppError::HttpRequest("Get token error".to_string()))?;
        Ok(token_response.token)
    }

    async fn get_user_info(
        &self,
        reqwest_client: &reqwest::Client,
        access_token: &str,
    ) -> Result<UserInfo, AppError> {
        let request = reqwest_client.get(format!(
            "https://donatepay.ru/api/v1/user?access_token={}",
            access_token
        ));

        let json = send_request::<UserInfoResponse>(request, "user info", "DonatePay")
            .await?
            .ok_or(AppError::HttpRequest("Get user info error".to_string()))?;
        Ok(json.data)
    }

    pub async fn sign_out(&self, app: &AppHandle) -> core::result::Result<(), AppError> {
        let database_service = app.state::<DatabaseService>();
        database_service
            .update_service_auth(ServiceType::DonatePay, None, false)
            .await?;
        {
            self.cancellation_token.lock().unwrap().cancel();
        }

        Ok(())
    }
}
