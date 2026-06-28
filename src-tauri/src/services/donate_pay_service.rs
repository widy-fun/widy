use std::sync::{
    atomic::{AtomicBool, Ordering},
    Arc,
};

use entity::services::{DonatePayAuth, ServiceAuth, ServiceType};
use futures::{SinkExt, StreamExt};
use serde::{Deserialize, Serialize};
use serde_json::json;
use tauri::{AppHandle, Manager};
use tokio_tungstenite::{connect_async, tungstenite::Message};

use crate::{
    repositories::ServicesRepository,
    services::{DatabaseService, EventsService},
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
    pub comment: String,
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
    is_sign_out: Arc<AtomicBool>,
}

impl DonatePayService {
    pub fn new() -> Self {
        Self {
            is_sign_out: Arc::new(AtomicBool::new(false)),
        }
    }

    pub async fn connect(&self, app: &AppHandle) -> Result<(), String> {
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
            let user_info = self
                .get_user_info(&reqwest_client, &auth.access_token)
                .await?;
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

        Ok(())
    }

    async fn run_websocket_client(&self, app: AppHandle, user_info: UserInfo, token: String) {
        tauri::async_runtime::spawn(async move {
            let donate_pay_service = app.state::<DonatePayService>();
            'connection_loop: loop {
                log::info!("Connecting to DonatePay websocket");
                match connect_async("wss://centrifugo.donatepay.ru:443/connection/websocket").await
                {
                    Ok((mut socket, _)) => {
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
                        if let Err(e) = socket.send(Message::Text(sub_msg.to_string().into())).await
                        {
                            log::error!("Failed to send subscription: {e}");
                            continue 'connection_loop;
                        }
                        while let Some(msg_result) = socket.next().await {
                            if donate_pay_service.is_sign_out.load(Ordering::Relaxed) {
                                donate_pay_service
                                    .is_sign_out
                                    .store(false, Ordering::Relaxed);
                                break 'connection_loop;
                            }
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
                                                    Some(event_vars.comment),
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
                            }
                        }
                    }
                    Err(e) => {
                        log::error!(
                            "Failed to connect DonatePay WebSocket: {}. Retrying in 5s...",
                            e
                        );
                        tokio::time::sleep(std::time::Duration::from_secs(5)).await;
                    }
                }
            }
        });
    }

    async fn get_token(
        &self,
        reqwest_client: &reqwest::Client,
        access_token: &str,
    ) -> Result<String, String> {
        let resp: TokenResponse = reqwest_client
            .post("https://donatepay.ru/api/v2/socket/token")
            .json(&serde_json::json!({ "access_token": access_token }))
            .send()
            .await
            .map_err(|e| {
                log::error!("Failed to send get token request: {}", e);
                e.to_string()
            })?
            .json()
            .await
            .map_err(|e| {
                log::error!("Failed to parse token response: {}", e);
                e.to_string()
            })?;
        Ok(resp.token)
    }

    async fn get_user_info(
        &self,
        reqwest_client: &reqwest::Client,
        access_token: &str,
    ) -> Result<UserInfo, String> {
        let response = reqwest_client
            .get(format!(
                "https://donatepay.ru/api/v1/user?access_token={}",
                access_token
            ))
            .send()
            .await
            .map_err(|e| {
                log::error!("Failed to send user info request: {}", e);
                e.to_string()
            })?;
        if response.status().is_success() {
            let json: UserInfoResponse = response.json().await.map_err(|e| {
                log::error!("Failed to parse user info response: {}", e);
                e.to_string()
            })?;
            Ok(json.data)
        } else {
            let error = format!("Failed to get user info: HTTP {}", response.status());
            log::error!("{}", error);
            Err(error)
        }
    }

    pub async fn sign_out(&self, app: &AppHandle) -> core::result::Result<(), String> {
        let database_service = app.state::<DatabaseService>();
        database_service
            .update_service(entity::services::Model {
                id: ServiceType::DonatePay,
                settings: None,
                auth: None,
                authorized: false,
            })
            .await?;
        self.is_sign_out.store(true, Ordering::Relaxed);
        Ok(())
    }
}
