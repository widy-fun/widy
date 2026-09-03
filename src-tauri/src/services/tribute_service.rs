use crate::{
    error::AppError,
    repositories::ServicesRepository,
    services::{DatabaseService, EventsService},
    utils::send_request,
};
use entity::{
    services::{ServiceAuth, ServiceType, TributeAuth},
    settings::Currency,
};
use eventsource_client::{self as es, Client};
use futures::{StreamExt, TryStreamExt};
use serde::Deserialize;
use std::time::Duration;
use tauri::{AppHandle, Manager};
use tokio::{pin, sync::broadcast};

#[derive(Debug, Clone, Deserialize)]
struct TributeEvent {
    pub id: String,
    pub data: EventData,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
struct EventData {
    pub r#type: EventType,
    pub donation_id: u64,
    pub author: u64,
    pub display_name: Option<String>,
    pub amount: u64,
    pub currency: Currency,
    pub message: Option<String>,
}

#[derive(Debug, Clone, Deserialize)]
enum EventType {
    #[serde(rename = "donation")]
    Donation,
}

pub struct TributeService {
    sign_out_sender: broadcast::Sender<()>,
}

impl TributeService {
    pub fn new() -> Self {
        let (tx, _) = broadcast::channel(1);
        Self {
            sign_out_sender: tx,
        }
    }

    pub async fn connect(&self, app: &AppHandle) -> Result<(), AppError> {
        let database_service = app.state::<DatabaseService>();
        let service = database_service
            .get_service_with_auth_by_id(ServiceType::Tribute)
            .await?;
        if let Some(entity::services::Model {
            id: ServiceType::Tribute,
            auth: Some(ServiceAuth::Tribute(auth)),
            ..
        }) = service
        {
            let reqwest_client = app.state::<reqwest::Client>();
            if let Err(AppError::HttpStatus { status: 401, .. }) =
                self.get_products(&reqwest_client, &auth.api_key).await
            {
                database_service
                    .update_service_auth(ServiceType::Tribute, None, false)
                    .await?;
                return Err(AppError::HttpRequest("Unauthorized".to_string()));
            }
            database_service
                .update_service_auth(
                    ServiceType::Tribute,
                    Some(ServiceAuth::Tribute(TributeAuth {
                        api_key: auth.api_key.clone(),
                    })),
                    true,
                )
                .await?;

            self.subscribe_to_donation_event(app.clone(), auth.api_key)
                .await;
        }

        Ok(())
    }

    pub async fn subscribe_to_donation_event(&self, app: AppHandle, api_key: String) {
        tauri::async_runtime::spawn(async move {
            let tribute_service = app.state::<TributeService>();
            let mut sign_out_receiver = tribute_service.sign_out_sender.subscribe();
            let client = es::ClientBuilder::for_url(&format!(
                "https://proxy.tribute.tg/api/v1/obs/alerts/stream?token={}",
                api_key
            ))
            .map_err(|e| {
                log::error!("Tribute es build error: {}", e.to_string());
                e.to_string()
            })
            .unwrap()
            .reconnect(
                es::ReconnectOptions::reconnect(true)
                    .retry_initial(true)
                    .delay(Duration::from_secs(1))
                    .build(),
            )
            .build();
            let stop_signal = sign_out_receiver.recv();
            pin!(stop_signal);
            let mut stream = client.stream().take_until(stop_signal);

            while let Ok(Some(sse)) = stream.try_next().await {
                match sse {
                    es::SSE::Event(ev) => {
                        if let Ok(tribute_event) = serde_json::from_str::<TributeEvent>(&ev.data) {
                            let _ = EventsService::donation(
                                tribute_event.id,
                                ServiceType::Tribute,
                                tribute_event.data.display_name,
                                tribute_event.data.currency,
                                tribute_event.data.amount as f64 / 100.0,
                                tribute_event.data.message,
                                &app,
                            )
                            .await;
                        }
                    }
                    _ => {}
                }
            }
        });
    }

    async fn get_products(
        &self,
        reqwest_client: &reqwest::Client,
        api_key: &str,
    ) -> Result<serde_json::Value, AppError> {
        let request = reqwest_client
            .get("https://tribute.tg/api/v1/products")
            .header("Api-Key", api_key);
        let result = send_request::<serde_json::Value>(request, "products", "Tribute")
            .await?
            .ok_or(AppError::HttpRequest("Get products error".to_string()))?;
        Ok(result)
    }

    pub async fn sign_out(&self, app: &AppHandle) -> core::result::Result<(), AppError> {
        let database_service = app.state::<DatabaseService>();
        database_service
            .update_service(entity::services::Model {
                id: ServiceType::Tribute,
                settings: None,
                auth: None,
                authorized: false,
            })
            .await?;
        let _ = self.sign_out_sender.send(());
        Ok(())
    }
}
