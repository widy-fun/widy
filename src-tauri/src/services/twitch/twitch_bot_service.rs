use crate::services::twitch::twitch_api::TwitchApi;
use entity::services::ServiceType;
use model::error::AppError;
use std::sync::{Arc, Mutex, atomic::AtomicU64};
use tauri::AppHandle;
use tokio_util::sync::CancellationToken;

#[derive(Clone, Debug)]
pub struct TwitchBotService {
    pub(crate) client_id: String,
    pub(crate) scopes: String,
    pub(crate) api_endpoint: String,
    pub(crate) auth_endpoint: String,
    pub(crate) eventsub_endpoint: String,
    pub session_id: Arc<Mutex<Option<String>>>,
    pub(crate) expire_at: Arc<AtomicU64>,
    pub(crate) cancellation_token: Arc<Mutex<CancellationToken>>,
    pub(crate) reqwest_client: reqwest::Client,
    pub(crate) service_type: ServiceType,
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
