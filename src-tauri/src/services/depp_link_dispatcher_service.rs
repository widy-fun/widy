use database::{DatabaseService, ServicesRepository};
use entity::services::{ServiceAuth, ServiceType, WidyAuth};
use model::{
    events::{AppEvent, EventMessage},
    widy_sol::{DeepLinkQueryParams, WidyNetwork},
};
use std::sync::{Arc, Mutex};
use tauri::{AppHandle, Manager};
use url::Url;

use crate::services::{WebSocketBroadcaster, WidySolService, WidyTonService};

pub trait DeepLinkHandler: Send + Sync {
    fn can_handle(&self, url: &Url) -> bool;
    fn handle(&self, url: &Url, app: &AppHandle);
}
pub struct DeepLinkDispatcherService {
    handlers: Vec<Arc<dyn DeepLinkHandler>>,
}

impl DeepLinkDispatcherService {
    pub fn new() -> Self {
        Self { handlers: vec![] }
    }

    pub fn register(&mut self, handler: Arc<dyn DeepLinkHandler>) {
        self.handlers.push(handler);
    }

    pub fn dispatch(&self, url: &Url, app: &AppHandle) {
        for handler in &self.handlers {
            if handler.can_handle(url) {
                handler.handle(url, app);
                return;
            }
        }
        log::warn!("No handler for deep link: {url}");
    }
}

impl DeepLinkHandler for WidyTonService {
    fn can_handle(&self, url: &url::Url) -> bool {
        let Some(query) = url.query() else {
            return false;
        };
        let Ok(query_params) = serde_qs::from_str::<DeepLinkQueryParams>(query) else {
            return false;
        };

        url.host_str() == Some("create-donation-account")
            && query_params.network == WidyNetwork::Ton
    }

    fn handle(&self, url: &url::Url, app: &AppHandle) {
        let Some(query) = url.query() else {
            return;
        };

        let Ok(query_params) = serde_qs::from_str::<DeepLinkQueryParams>(query) else {
            ::log::error!("Failed to parse deep link query params");
            return;
        };

        let nonce: Arc<Mutex<Option<String>>> = self.nonce.clone();

        let is_nonce_valid = {
            let mut nonce_guard = nonce.lock().unwrap();
            if nonce_guard.as_ref() == Some(&query_params.nonce) {
                *nonce_guard = None;
                true
            } else {
                false
            }
        };

        if !is_nonce_valid {
            return;
        }

        let app_clone = app.clone();

        tauri::async_runtime::spawn(async move {
            let widy_ton_service = app_clone.state::<Arc<WidyTonService>>();
            let database_service = app_clone.state::<DatabaseService>();
            let websocket_broadcaster = app_clone.state::<WebSocketBroadcaster>();

            let _ = database_service
                .update_service(entity::services::Model {
                    id: ServiceType::WidyTon,
                    auth: Some(ServiceAuth::Widy(WidyAuth {
                        donation_account_name: query_params.donation_account_name.clone(),
                        user: query_params.user.clone(),
                        donation_account_address: query_params.donation_account_address.clone(),
                    })),
                    extra: None,
                    authorized: true,
                })
                .await;

            if let Err(e) = widy_ton_service.connect(&app_clone).await {
                ::log::error!("Service connection error: {}", e);
                return;
            }

            websocket_broadcaster.broadcast_event_message(&EventMessage {
                event: AppEvent::CreateDonationAccount,
                data: query_params,
            });
        });
    }
}

impl DeepLinkHandler for WidySolService {
    fn can_handle(&self, url: &url::Url) -> bool {
        let Some(query) = url.query() else {
            return false;
        };
        let Ok(query_params) = serde_qs::from_str::<DeepLinkQueryParams>(query) else {
            return false;
        };

        url.host_str() == Some("create-donation-account")
            && query_params.network == WidyNetwork::Sol
    }

    fn handle(&self, url: &url::Url, app: &AppHandle) {
        let Some(query) = url.query() else {
            return;
        };

        let Ok(query_params) = serde_qs::from_str::<DeepLinkQueryParams>(query) else {
            ::log::error!("Failed to parse deep link query params");
            return;
        };

        let nonce: Arc<Mutex<Option<String>>> = self.nonce.clone();

        let is_nonce_valid = {
            let mut nonce_guard = nonce.lock().unwrap();
            if nonce_guard.as_ref() == Some(&query_params.nonce) {
                *nonce_guard = None;
                true
            } else {
                false
            }
        };

        if !is_nonce_valid {
            return;
        }

        let app_clone = app.clone();

        tauri::async_runtime::spawn(async move {
            let widy_sol_service = app_clone.state::<Arc<WidySolService>>();
            let database_service = app_clone.state::<DatabaseService>();
            let websocket_broadcaster = app_clone.state::<WebSocketBroadcaster>();

            let _ = database_service
                .update_service(entity::services::Model {
                    id: ServiceType::WidySol,
                    auth: Some(ServiceAuth::Widy(WidyAuth {
                        donation_account_name: query_params.donation_account_name.clone(),
                        user: query_params.user.clone(),
                        donation_account_address: query_params.donation_account_address.clone(),
                    })),
                    extra: None,
                    authorized: true,
                })
                .await;

            if let Err(e) = widy_sol_service.connect(&app_clone).await {
                ::log::error!("Service connection error: {}", e);
                return;
            }

            websocket_broadcaster.broadcast_event_message(&EventMessage {
                event: AppEvent::CreateDonationAccount,
                data: query_params,
            });
        });
    }
}
