use async_trait::async_trait;
use entity::services::ServiceType;
use std::sync::{Arc, Mutex, MutexGuard, atomic::AtomicU64};
use tauri::AppHandle;
use tokio_util::sync::CancellationToken;

use crate::{
    error::AppError,
    services::kick::{models::KickAuthSession, traits::KickApi},
};

pub struct KickBotService {
    pub kick_bot_client_id: String,
    pub kick_bot_token_endpoint: String,
    pub kick_bot_redirect_uri: String,
    pub scopes: String,
    pub app_token: String,
    pub auth_session: Mutex<Option<KickAuthSession>>,
    expire_at: Arc<AtomicU64>,
    cancellation_token: Arc<Mutex<CancellationToken>>,
}

impl KickBotService {
    pub fn new(
        kick_bot_client_id: String,
        kick_bot_token_endpoint: String,
        kick_bot_redirect_uri: String,
        app_token: String,
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
        }
    }

    pub async fn connect(&self, app: &AppHandle) -> Result<(), AppError> {
        let auth = self.get_database_auth(app, ServiceType::Kick).await?;
        let _ = self
            .refresh_and_update_auth(&app, &auth, ServiceType::Kick)
            .await?;
        Ok(())
    }
}

#[async_trait]
impl KickApi for KickBotService {
    fn auth_session(&self) -> MutexGuard<'_, Option<KickAuthSession>> {
        self.auth_session.lock().unwrap()
    }

    fn cancellation_token(&self) -> CancellationToken {
        self.cancellation_token.lock().unwrap().clone()
    }

    fn kick_token_endpoint(&self) -> String {
        self.kick_bot_token_endpoint.clone()
    }

    fn kick_client_id(&self) -> String {
        self.kick_bot_client_id.clone()
    }

    fn scopes(&self) -> String {
        self.scopes.clone()
    }
    fn kick_redirect_uri(&self) -> String {
        self.kick_bot_redirect_uri.clone()
    }

    fn app_token(&self) -> String {
        self.app_token.clone()
    }

    fn expire_at(&self) -> Arc<AtomicU64> {
        self.expire_at.clone()
    }
}
