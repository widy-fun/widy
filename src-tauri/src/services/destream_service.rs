use entity::{
    services::{DestreamAuth, ServiceAuth, ServiceType},
    settings::Currency,
};
use futures::{SinkExt, StreamExt};
use serde::Deserialize;
use std::sync::{Arc, Mutex};
use tauri::{AppHandle, Manager};
use tokio_tungstenite::{connect_async, tungstenite::Message};
use tokio_util::sync::CancellationToken;

use crate::{
    repositories::ServicesRepository,
    services::{DatabaseService, EventsService},
    utils::send_request,
};

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
    cancellation_token: Arc<Mutex<CancellationToken>>,
}

impl DestreamService {
    pub fn new() -> Self {
        Self {
            cancellation_token: Arc::new(Mutex::new(CancellationToken::new())),
        }
    }

    pub async fn connect(&self, app: &AppHandle) -> Result<(), String> {
        {
            let mut cancellation_token = self.cancellation_token.lock().unwrap();
            *cancellation_token = CancellationToken::new();
        }
        let database_service = app.state::<DatabaseService>();
        let reqwest_client = app.state::<reqwest::Client>();
        let service = database_service
            .get_service_with_auth_by_id(entity::services::ServiceType::Destream)
            .await?;
        if let Some(entity::services::Model {
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
            self.run_websocket_client(app.clone(), auth.overlayid).await;
        }

        Ok(())
    }

    async fn run_websocket_client(&self, app: AppHandle, overlayid: String) {
        tauri::async_runtime::spawn(async move {
            let destream_service = app.state::<DestreamService>();
            let handshake = format!(
                "{}{}",
                "{\"protocol\":\"json\",\"version\":1}",
                char::from(30)
            );

            let cancellation_token =
                { destream_service.cancellation_token.lock().unwrap().clone() };

            let ping_message = &format!("{}{}", "{\"type\":6}", char::from(30));

            'connection_loop: loop {
                log::info!("Connecting to Destream websocket");

                let (mut socket, _) = match connect_async(format!(
                    "wss://api.destream.net/ws/overlays?overlayid={}",
                    overlayid
                ))
                .await
                {
                    Ok(socket) => socket,
                    Err(e) => {
                        log::error!("Failed to connect: {}", e);
                        tokio::time::sleep(std::time::Duration::from_secs(5)).await;
                        continue;
                    }
                };

                log::info!("Destream websocket connected.");

                if let Err(e) = socket.send(Message::Text(handshake.as_str().into())).await {
                    log::error!("Failed to send Destream version: {e}");
                    continue 'connection_loop;
                }

                loop {
                    tokio::select! {
                        _ = cancellation_token.cancelled() => {
                            log::info!("Stopping Destream websocket.");
                            let _ = socket.send(Message::Close(None)).await;
                            break 'connection_loop;
                        }

                        msg = socket.next() => {
                            let Some(msg_result) = msg else {
                                log::warn!("Destream websocket ended.");
                                break;
                            };

                           match msg_result {
                                Ok(Message::Text(text)) => {
                                    if text == ping_message {
                                        let _ =
                                            socket.send(Message::Text(ping_message.into())).await;
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
                                            let _ = EventsService::donation(
                                                donation.id,
                                                ServiceType::Destream,
                                                donation.username,
                                                donation.source_currency_id,
                                                donation.source_currency_amount,
                                                donation.description,
                                                &app,
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
                }
            }
        });
    }

    async fn get_overlay_info(
        &self,
        reqwest_client: &reqwest::Client,
        overlayid: &str,
    ) -> Result<(), String> {
        let request = reqwest_client.get(format!(
            "https://api.destream.net/siteapi/v2/OverlayViewer/{}",
            overlayid
        ));

        let _ = send_request::<serde_json::Value>(request, "overlay info", "Destream").await?;
        Ok(())
    }

    pub async fn sign_out(&self, app: &AppHandle) -> core::result::Result<(), String> {
        let database_service = app.state::<DatabaseService>();
        database_service
            .update_service(entity::services::Model {
                id: ServiceType::Destream,
                settings: None,
                auth: None,
                authorized: false,
            })
            .await?;
        {
            self.cancellation_token.lock().unwrap().cancel();
        }
        Ok(())
    }
}
