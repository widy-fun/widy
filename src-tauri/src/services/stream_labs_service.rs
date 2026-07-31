use entity::{
    services::{ServiceAuth, ServiceType, StreamLabsAuth},
    settings::Currency,
};
use futures::FutureExt;
use rust_socketio::{Payload, TransportType, asynchronous::ClientBuilder};
use serde::{Deserialize, Serialize};
use tauri::{AppHandle, Manager};
use tokio::sync::broadcast;

use crate::{
    error::AppError,
    repositories::ServicesRepository,
    services::{DatabaseService, EventsService},
    utils::log_and_wrap_error,
};

#[derive(Debug, Clone, Deserialize, Serialize)]
struct DonationMessage {
    message: Vec<Donation>,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
struct ConnectError {
    message: String,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
struct Donation {
    _id: String,
    amount: f64,
    currency: Currency,
    message: Option<String>,
    from: Option<String>,
    #[serde(rename = "isTest")]
    is_test: bool,
}

pub struct StreamLabsService {
    sign_out_sender: broadcast::Sender<()>,
}

impl StreamLabsService {
    pub fn new() -> Self {
        let (tx, _) = broadcast::channel(1);
        Self {
            sign_out_sender: tx,
        }
    }

    pub async fn connect(&self, app: &AppHandle) -> Result<(), AppError> {
        let database_service = app.state::<DatabaseService>();
        let service = database_service
            .get_service_with_auth_by_id(entity::services::ServiceType::StreamLabs)
            .await?;
        if let Some(entity::services::Model {
            id: ServiceType::StreamLabs,
            auth: Some(ServiceAuth::StreamLabs(auth)),
            ..
        }) = service
        {
            database_service
                .update_service_auth(
                    ServiceType::StreamLabs,
                    Some(ServiceAuth::StreamLabs(StreamLabsAuth {
                        jwt: auth.jwt.clone(),
                    })),
                    true,
                )
                .await?;
            self.run_socket_io_client(app.clone(), auth.jwt).await;
        }

        Ok(())
    }

    async fn run_socket_io_client(&self, app: AppHandle, jwt: String) {
        tauri::async_runtime::spawn(async move {
            let stream_labs_service = app.state::<StreamLabsService>();
            let mut sign_out_receiver = stream_labs_service.sign_out_sender.subscribe();
            let app_error_clone = app.clone();
            let app_event_clone = app.clone();
            let socket =
                ClientBuilder::new(format!("https://sockets.streamlabs.com?token={}", jwt))
                    .transport_type(TransportType::Websocket)
                    .on("error", move |err, socket| {
                        let app_clone = app_error_clone.clone();
                        async move {
                            if let Payload::Text(values) = err {
                                if let Some(value) = values.first() {
                                    if let Some(s) = value.as_str() {
                                        if let Some(start) = s.find('{') {
                                            let json_part = &s[start..];

                                            if let Ok(_) =
                                                serde_json::from_str::<ConnectError>(json_part)
                                            {
                                                let database_service =
                                                    app_clone.state::<DatabaseService>();
                                                let _ = database_service
                                                    .update_service_auth(
                                                        ServiceType::StreamLabs,
                                                        None,
                                                        false,
                                                    )
                                                    .await;
                                                let _ = socket.disconnect().await;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        .boxed()
                    })
                    .on("event", move |payload, _| {
                        let app_clone = app_event_clone.clone();
                        async move {
                            if let Payload::Text(values) = payload {
                                if let Some(value) = values.first() {
                                    if let Ok(donation_message) =
                                        serde_json::from_value::<DonationMessage>(value.clone())
                                    {
                                        let donation = donation_message.message[0].clone();
                                        #[cfg(not(debug_assertions))]
                                        if donation.is_test {
                                            return;
                                        }
                                        let _ = EventsService::donation(
                                            donation._id,
                                            ServiceType::StreamLabs,
                                            donation.from,
                                            donation.currency,
                                            donation.amount,
                                            donation.message,
                                            &app_clone,
                                        )
                                        .await;
                                    }
                                }
                            }
                        }
                        .boxed()
                    })
                    .connect()
                    .await
                    .map_err(|e| {
                        log_and_wrap_error(
                            "Failed to connect to StreamLabs Socket.IO",
                            AppError::StreamLabs(e.to_string()),
                        )
                    })
                    .unwrap();

            let _ = sign_out_receiver.recv().await;
            let _ = socket.disconnect().await;
        });
    }

    pub async fn sign_out(&self, app: &AppHandle) -> core::result::Result<(), AppError> {
        let database_service = app.state::<DatabaseService>();
        database_service
            .update_service(entity::services::Model {
                id: ServiceType::StreamLabs,
                settings: None,
                auth: None,
                authorized: false,
            })
            .await?;
        let _ = self.sign_out_sender.send(());
        Ok(())
    }
}
