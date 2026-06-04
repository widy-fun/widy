use entity::{
    service::{DestreamAuth, ServiceAuth, ServiceType},
    settings::Currency,
};
use futures::{SinkExt, StreamExt};
use http::StatusCode;
use serde::Deserialize;
use std::sync::{
    atomic::{AtomicBool, Ordering},
    Arc,
};
use tauri::{AppHandle, Manager};
use tokio_tungstenite::{connect_async, tungstenite::Message};

use crate::{repositories::ServicesRepository, services::DatabaseService, utils::on_new_donation};

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
struct DestreamEvent {
    pub r#type: u32,
    pub target: EventTarget,
    pub arguments: Vec<EventArgument>,
}
#[derive(Debug, Clone, Deserialize)]
struct EventArgument {
    #[serde(rename = "testData")]
    pub test_data: Vec<Donation>,
    pub data: Vec<Donation>,
}
#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
struct Donation {
    pub id: String,
    pub description: Option<String>,
    pub username: Option<String>,
    pub moderated: bool,
    #[serde(rename = "userDisplayCurrencyId")]
    pub user_display_currency_id: Currency,
    #[serde(rename = "userDisplayCurrencyAmount")]
    pub user_display_currency_amount: f64,
    #[serde(rename = "sourceCurrencyId")]
    pub source_currency_id: Currency,
    #[serde(rename = "sourceCurrencyAmount")]
    pub source_currency_amount: f64,
}

#[derive(Debug, Clone, Deserialize)]
enum EventTarget {
    #[serde(rename = "newDonationsReceived")]
    NewDonationsReceived,
}
pub struct DestreamService {
    is_sign_out: Arc<AtomicBool>,
}

impl DestreamService {
    pub fn new() -> Self {
        Self {
            is_sign_out: Arc::new(AtomicBool::new(false)),
        }
    }

    pub async fn connect(&self, app: &AppHandle) -> Result<(), String> {
        let database_service = app.state::<DatabaseService>();
        let reqwest_client = app.state::<reqwest::Client>();
        let service = database_service
            .get_service_with_auth_by_id(entity::service::ServiceType::Destream)
            .await?;
        if let Some(entity::service::Model {
            id: ServiceType::Destream,
            auth: Some(ServiceAuth::Destream(auth)),
            ..
        }) = service
        {
            if let Err(e) = self
                .get_overlay_info(&reqwest_client, &auth.overlayid)
                .await
            {
                database_service
                    .update_service_auth(ServiceType::Destream, None, false)
                    .await?;
                return Err(e);
            }

            database_service
                .update_service_auth(
                    ServiceType::Destream,
                    Some(ServiceAuth::Destream(DestreamAuth {
                        overlayid: auth.overlayid.clone(),
                    })),
                    true,
                )
                .await?;
            let app_clone = app.clone();
            tauri::async_runtime::spawn(async move {
                let _ = Self::run_websocket_client(&app_clone, &auth.overlayid).await;
            });
        }

        Ok(())
    }

    async fn run_websocket_client(app: &AppHandle, overlayid: &str) -> Result<(), String> {
        let destream_service = app.state::<DestreamService>();
        let handshake = format!(
            "{}{}",
            "{\"protocol\":\"json\",\"version\":1}",
            char::from(30)
        );
        let ping_message = &format!("{}{}", "{\"type\":6}", char::from(30));
        'connection_loop: loop {
            log::info!("Connecting to Destream websocket");
            match connect_async(format!(
                "wss://api.destream.net/ws/overlays?overlayid={}",
                overlayid
            ))
            .await
            {
                Ok((mut socket, _)) => {
                    log::info!("Destream webSocket connected.");

                    if let Err(e) = socket.send(Message::Text(handshake.as_str().into())).await {
                        log::error!("Failed to send Destream version: {e}");
                        continue 'connection_loop;
                    }

                    while let Some(msg_result) = socket.next().await {
                        if destream_service.is_sign_out.load(Ordering::Relaxed) {
                            destream_service.is_sign_out.store(false, Ordering::Relaxed);
                            break 'connection_loop;
                        }
                        match msg_result {
                            Ok(Message::Text(text)) => {
                                if text == ping_message {
                                    let _ = socket.send(Message::Text(ping_message.into())).await;
                                    continue;
                                }
                                if let Ok(event) = serde_json::from_str::<DestreamEvent>(
                                    &text.replace(char::from(30), ""),
                                ) {
                                    let donations: Vec<Donation> = {
                                        if cfg!(debug_assertions) {
                                            event
                                                .arguments
                                                .iter()
                                                .flat_map(|arg| arg.test_data.clone())
                                                .collect()
                                        } else {
                                            event
                                                .arguments
                                                .iter()
                                                .flat_map(|arg| arg.data.clone())
                                                .collect()
                                        }
                                    };
                                    for donation in donations {
                                        let _ = on_new_donation(
                                            donation.id,
                                            ServiceType::Destream,
                                            donation.username,
                                            donation.source_currency_id,
                                            donation.source_currency_amount,
                                            donation.description,
                                            app,
                                        )
                                        .await;
                                    }
                                }
                            }
                            Ok(Message::Close(_)) => {
                                log::warn!("Destream closed connection.");
                                break;
                            }
                            Err(e) => {
                                log::error!("Destream WebSocket error: {}", e);
                                break;
                            }
                            _ => {}
                        }
                    }
                }
                Err(e) => {
                    log::error!(
                        "Failed to connect Destream WebSocket: {}. Retrying in 5s...",
                        e
                    );
                    tokio::time::sleep(std::time::Duration::from_secs(5)).await;
                }
            }
        }

        Ok(())
    }

    async fn get_overlay_info(
        &self,
        reqwest_client: &reqwest::Client,
        overlayid: &str,
    ) -> Result<StatusCode, String> {
        let response = reqwest_client
            .get(format!(
                "https://api.destream.net/siteapi/v2/OverlayViewer/{}",
                overlayid
            ))
            .send()
            .await
            .map_err(|e| {
                log::error!("Failed to send overlay info request: {}", e);
                e.to_string()
            })?;
        if response.status().is_success() {
            return Ok(response.status());
        } else {
            let error = format!("Failed to get overlay info: HTTP {}", response.status());
            log::error!("{}", error);
            Err(error)
        }
    }

    pub async fn sign_out(&self, app: &AppHandle) -> core::result::Result<(), String> {
        let database_service = app.state::<DatabaseService>();
        database_service
            .update_service(entity::service::Model {
                id: ServiceType::Destream,
                settings: None,
                auth: None,
                authorized: false,
            })
            .await?;
        self.is_sign_out.store(true, Ordering::Relaxed);
        Ok(())
    }
}
