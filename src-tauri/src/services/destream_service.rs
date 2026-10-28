use crate::{services::EventsService, utils::send_request};
use database::{DatabaseService, ServicesRepository};
use entity::services::{DestreamAuth, ServiceAuth, ServiceType};
use futures::{SinkExt, StreamExt};
use model::destream::{DestreamEvent, Donation};
use model::error::AppError;
use std::sync::{Arc, Mutex};
use tauri::{AppHandle, Manager};
use tokio_tungstenite::{connect_async, tungstenite::Message};
use tokio_util::sync::CancellationToken;

pub struct DestreamService {
    cancellation_token: Arc<Mutex<CancellationToken>>,
}

impl DestreamService {
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

    async fn run_websocket_client(&self, app: AppHandle, _overlayid: String) {
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
            #[cfg(not(feature = "mock"))]
            let connect_url = format!(
                "wss://api.destream.net/ws/overlays?overlayid={}",
                _overlayid
            );
            #[cfg(feature = "mock")]
            let connect_url =
                std::env::var("DESTREAM_MOCK_WS_URL").expect("DESTREAM_MOCK_WS_URL not set");
            'connection_loop: loop {
                log::info!("Connecting to Destream websocket");

                let (mut socket, _) = match connect_async(&connect_url).await {
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
    ) -> Result<(), AppError> {
        let request = reqwest_client.get(format!(
            "https://api.destream.net/siteapi/v2/OverlayViewer/{}",
            overlayid
        ));

        let _ = send_request::<serde_json::Value>(request, "overlay info", "Destream").await?;
        Ok(())
    }

    pub async fn sign_out(&self, app: &AppHandle) -> core::result::Result<(), AppError> {
        let database_service = app.state::<DatabaseService>();
        database_service
            .update_service(entity::services::Model {
                id: ServiceType::Destream,
                extra: None,
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
