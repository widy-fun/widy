use crate::{error::AppError, services::twitch::traits::TwitchApi};
use async_trait::async_trait;
use entity::services::ServiceType;
use std::sync::{Arc, Mutex, atomic::AtomicU64};
use tauri::AppHandle;
use tokio_util::sync::CancellationToken;

#[derive(Clone, Debug)]
pub struct TwitchBotService {
    client_id: String,
    scopes: String,
    api_endpoint: String,
    auth_endpoint: String,
    eventsub_endpoint: String,
    pub session_id: Arc<Mutex<Option<String>>>,
    expire_at: Arc<AtomicU64>,
    cancellation_token: Arc<Mutex<CancellationToken>>,
    reqwest_client: reqwest::Client,
    service_type: ServiceType,
}

impl TwitchBotService {
    pub fn new(
        client_id: String,
        auth_endpoint: String,
        api_endpoint: String,
        eventsub_endpoint: String,
        reqwest_client: reqwest::Client,
    ) -> Self {
        let scopes =
            "user:read:email user:read:chat user:write:chat user:bot channel:bot moderator:manage:announcements".to_string();

        Self {
            client_id,
            scopes,
            api_endpoint,
            auth_endpoint,
            eventsub_endpoint,
            session_id: Arc::new(Mutex::new(None)),
            expire_at: Arc::new(AtomicU64::new(0)),
            cancellation_token: Arc::new(Mutex::new(CancellationToken::new())),
            reqwest_client,
            service_type: ServiceType::TwitchBot,
        }
    }

    pub async fn connect(&self, app: &AppHandle) -> Result<(), AppError> {
        let _ = self.get_auth(app).await?;
        Ok(())
    }
}

#[async_trait]
impl TwitchApi for TwitchBotService {
    fn client_id(&self) -> String {
        self.client_id.clone()
    }

    fn expire_at(&self) -> Arc<AtomicU64> {
        self.expire_at.clone()
    }

    fn session_id(&self) -> Option<String> {
        let guard = self.session_id.lock().unwrap();
        guard.clone()
    }

    fn cancellation_token(&self) -> CancellationToken {
        let guard = self.cancellation_token.lock().unwrap();
        guard.clone()
    }

    fn eventsub_endpoint(&self) -> String {
        self.eventsub_endpoint.clone()
    }

    fn auth_endpoint(&self) -> String {
        self.auth_endpoint.clone()
    }

    fn scopes(&self) -> String {
        self.scopes.clone()
    }

    fn api_endpoint(&self) -> String {
        self.api_endpoint.clone()
    }

    fn reqwest_client(&self) -> &reqwest::Client {
        &self.reqwest_client
    }

    fn service_type(&self) -> ServiceType {
        self.service_type.clone()
    }
}
