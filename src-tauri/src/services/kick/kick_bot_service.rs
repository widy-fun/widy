use entity::services::ServiceType;
use model::kick::KickAuthSession;
use std::sync::{Arc, Mutex, atomic::AtomicU64};
use tauri::AppHandle;
use tokio_util::sync::CancellationToken;

use crate::services::kick::kick_api::KickApi;
use model::error::AppError;

pub struct KickBotService {
    pub kick_bot_client_id: String,
    pub kick_bot_token_endpoint: String,
    pub kick_bot_redirect_uri: String,
    pub scopes: String,
    pub app_token: String,
    pub auth_session: Mutex<Option<KickAuthSession>>,
    pub(crate) expire_at: Arc<AtomicU64>,
    pub(crate) cancellation_token: Arc<Mutex<CancellationToken>>,
    pub(crate) reqwest_client: reqwest::Client,
    pub(crate) service_type: ServiceType,
}

impl KickBotService {
    pub fn new(
        kick_bot_client_id: String,
        kick_bot_token_endpoint: String,
        kick_bot_redirect_uri: String,
        app_token: String,
        reqwest_client: reqwest::Client,
    ) -> Self {
        let scopes = "user:read moderation:chat_message:manage chat:write".to_string();

        Self {
            kick_bot_client_id,
            kick_bot_token_endpoint,
            kick_bot_redirect_uri,
            scopes,
            app_token,
            auth_session: Mutex::new(None),
            expire_at: Arc::new(AtomicU64::new(0)),
            cancellation_token: Arc::new(Mutex::new(CancellationToken::new())),
            reqwest_client,
            service_type: ServiceType::KickBot,
        }
    }

    pub async fn connect(&self, app: &AppHandle) -> Result<(), AppError> {
        let _ = self.get_auth(app).await?;
        Ok(())
    }
}
