use base64::{Engine, engine::general_purpose::STANDARD};
use database::{DatabaseService, ServicesRepository};
use entity::{
    obs::ObsFilterAction,
    services::{
        Model, ObsAuth, ServiceAuth,
        ServiceType::{self},
    },
};
use futures::{SinkExt, StreamExt};
use model::{
    error::AppError,
    obs::{
        HelloData, IdentifyData, ObsData, ObsMessage, ObsRequestData, ObsRequestDataType,
        ObsRequestType, ObsResponseData, ObsSetSourceFilterEnabledRequest,
    },
};
use serde::de::DeserializeOwned;
use sha2::{Digest, Sha256};
use std::{
    collections::HashMap,
    sync::{Arc, Mutex},
    time::Duration,
};
use tauri::{AppHandle, Manager};
use tokio::{
    net::TcpStream,
    sync::{mpsc, oneshot},
};
use tokio_tungstenite::{
    MaybeTlsStream, WebSocketStream, connect_async,
    tungstenite::{Message, Utf8Bytes},
};
use tokio_util::sync::CancellationToken;
use uuid::Uuid;

pub struct ObsService {
    cancellation_token: Arc<Mutex<CancellationToken>>,
    sender: Arc<Mutex<Option<mpsc::Sender<Message>>>>,
    pending_requests: Arc<tokio::sync::Mutex<HashMap<Uuid, oneshot::Sender<serde_json::Value>>>>,
}

impl ObsService {
    pub fn new() -> Self {
        Self {
            cancellation_token: Arc::new(Mutex::new(CancellationToken::new())),
            sender: Arc::new(Mutex::new(None)),
            pending_requests: Arc::new(tokio::sync::Mutex::new(HashMap::new())),
        }
    }

    pub async fn connect(&self, app: &AppHandle) -> Result<(), AppError> {
        {
            let mut cancellation_token = self.cancellation_token.lock().unwrap();
            *cancellation_token = CancellationToken::new();
        }
        let database_service = app.state::<DatabaseService>();
        let service = database_service
            .get_service_with_auth_by_id(ServiceType::Obs)
            .await?;
        if let Some(Model {
            auth: Some(ServiceAuth::Obs(auth)),
            ..
        }) = service
        {
            self.run_websocket_client(app.clone(), auth.clone()).await;
        }
        Ok(())
    }

    async fn run_websocket_client(&self, app: AppHandle, auth: ObsAuth) {
        tauri::async_runtime::spawn(async move {
            let obs_service = app.state::<ObsService>();
            let cancellation_token = { obs_service.cancellation_token.lock().unwrap().clone() };
            let password = auth.password.clone().unwrap_or("".to_string());
            let connect_url = &format!("ws://{}:{}/{}", auth.ip, auth.port, password);

            'connection_loop: loop {
                log::info!("Connecting to Obs websocket: {}", connect_url);
                let (mut socket, _) = match connect_async(connect_url).await {
                    Ok(socket) => socket,
                    Err(e) => {
                        log::error!("Failed to connect: {}", e);
                        tokio::time::sleep(std::time::Duration::from_secs(5)).await;
                        continue;
                    }
                };
                let (sender, mut receiver) = mpsc::channel::<Message>(100);

                {
                    *obs_service.sender.lock().unwrap() = Some(sender);
                }

                log::info!("Obs websocket connected.");

                loop {
                    tokio::select! {
                        _ = cancellation_token.cancelled() => {
                            log::info!("Stopping Obs websocket.");
                            let _ = socket.send(Message::Close(None)).await;
                            break 'connection_loop;
                        }

                        outgoing = receiver.recv() => {
                                    match outgoing {
                                        Some(message) => {
                                            if let Err(e) = socket.send(message).await {
                                                log::error!("Failed to send message: {}", e);
                                                break;
                                            }
                                        }
                                        None => {
                                            break;
                                        }
                                    }
                        }

                        msg = socket.next() => {
                            let Some(msg_result) = msg else {
                                log::warn!("Obs websocket ended.");
                                break;
                            };

                           match msg_result {
                                Ok(Message::Text(text)) => {
                                    if let Ok(message) = serde_json::from_str::<ObsMessage>(&text) {
                                     let _=  obs_service.handle_obs_message(&app, message, &mut socket,&auth).await;
                                    }
                                }
                                Ok(Message::Close(_)) => {
                                    log::warn!("Obs closed connection.");
                                    break;
                                }
                                Err(e) => {
                                    log::error!("Obs websocket error: {}", e);
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

    async fn handle_obs_message(
        &self,
        app: &AppHandle,
        message: ObsMessage,
        socket: &mut WebSocketStream<MaybeTlsStream<TcpStream>>,
        auth: &ObsAuth,
    ) -> Result<(), AppError> {
        match message.d {
            ObsData::Hello(hello_data) => {
                let identify_message = self.get_obs_identify_message(
                    &auth.password.clone().unwrap_or("".to_string()),
                    &hello_data,
                );
                let _ = socket
                    .send(Message::Text(Utf8Bytes::from(serde_json::to_string(
                        &identify_message,
                    )?)))
                    .await;
            }
            ObsData::Identified(_) => {
                let database_service = app.state::<DatabaseService>();
                database_service
                    .update_service_auth(
                        ServiceType::Obs,
                        Some(ServiceAuth::Obs(auth.clone())),
                        true,
                    )
                    .await?;
            }
            ObsData::Response(data) => {
                let mut pending_requests = self.pending_requests.lock().await;
                if let Some(tx) = pending_requests.remove(&data.request_id) {
                    let _ = tx.send(serde_json::to_value(data)?);
                }
            }
            _ => {}
        }
        Ok(())
    }

    fn get_obs_identify_message(&self, password: &str, data: &HelloData) -> ObsMessage {
        let secret = STANDARD.encode(Sha256::digest(
            format!("{}{}", password, data.authentication.salt).as_bytes(),
        ));
        let authentication = STANDARD.encode(Sha256::digest(
            format!("{}{}", secret, data.authentication.challenge).as_bytes(),
        ));
        ObsMessage {
            op: 1,
            d: ObsData::Identify(IdentifyData {
                rpc_version: data.rpc_version,
                authentication,
            }),
        }
    }

    pub async fn send_request<T: DeserializeOwned>(
        &self,
        data: ObsRequestData,
    ) -> Result<ObsResponseData, AppError> {
        let (tx, rx) = oneshot::channel();

        self.pending_requests
            .lock()
            .await
            .insert(data.request_id, tx);

        let sender = self.sender.lock().unwrap().clone();

        let Some(sender) = sender else {
            self.pending_requests.lock().await.remove(&data.request_id);
            return Err(AppError::Obs("WebSocket sender not available".to_string()));
        };

        if sender
            .send(Message::Text(Utf8Bytes::from(serde_json::to_string(
                &ObsMessage {
                    op: 6,
                    d: ObsData::Request(data.clone()),
                },
            )?)))
            .await
            .is_err()
        {
            self.pending_requests.lock().await.remove(&data.request_id);
            return Err(AppError::Obs("Failed to send message".to_string()));
        }

        let response = match tokio::time::timeout(std::time::Duration::from_secs(10), rx).await {
            Ok(Ok(response)) => serde_json::from_value::<ObsResponseData>(response)?,
            Ok(Err(_)) => {
                return Err(AppError::Obs("Response channel closed".to_string()));
            }
            Err(_) => {
                self.pending_requests.lock().await.remove(&data.request_id);
                return Err(AppError::Obs("Request timeout".to_string()));
            }
        };

        if !response.request_status.result {
            return Err(AppError::Obs("OBS request failed".to_string()));
        }

        Ok(response)
    }

    pub async fn set_filter(&self, filter: &ObsFilterAction) -> Result<(), AppError> {
        if let Some(filter_name) = &filter.filter_name
            && let Some(filter_duration) = filter.filter_duration
        {
            self.send_request::<ObsResponseData>(ObsRequestData {
                request_type: ObsRequestType::SetSourceFilterEnabled,
                request_id: Uuid::new_v4(),
                request_data: Some(ObsRequestDataType::SetSourceFilterEnabled(
                    ObsSetSourceFilterEnabledRequest {
                        source_name: None,
                        source_uuid: filter.source_uuid.clone(),
                        filter_name: filter_name.clone(),
                        filter_enabled: true,
                    },
                )),
            })
            .await?;
            tokio::time::sleep(Duration::from_millis(filter_duration)).await;
            self.send_request::<ObsResponseData>(ObsRequestData {
                request_type: ObsRequestType::SetSourceFilterEnabled,
                request_id: Uuid::new_v4(),
                request_data: Some(ObsRequestDataType::SetSourceFilterEnabled(
                    ObsSetSourceFilterEnabledRequest {
                        source_name: None,
                        source_uuid: filter.source_uuid,
                        filter_name: filter_name.clone(),
                        filter_enabled: false,
                    },
                )),
            })
            .await?;
        }
        Ok(())
    }

    pub async fn sign_out(&self, app: &AppHandle) -> Result<(), AppError> {
        let database_service = app.state::<DatabaseService>();
        database_service
            .update_service_auth(ServiceType::Obs, None, false)
            .await?;

        self.cancellation_token.lock().unwrap().cancel();
        Ok(())
    }
}
