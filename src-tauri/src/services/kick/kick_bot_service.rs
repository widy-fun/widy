use async_trait::async_trait;
use entity::services::ServiceType;
use tauri::AppHandle;
use tokio::sync::{Mutex, MutexGuard};

use crate::services::kick::{models::KickAuthSession, traits::KickApi};

pub struct KickBotService {
    pub kick_bot_client_id: String,
    pub kick_bot_token_endpoint: String,
    pub kick_bot_redirect_uri: String,
    pub scopes: String,
    pub app_token: String,
    pub auth_session: Mutex<Option<KickAuthSession>>,
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
        }
    }

    pub async fn connect(&self, app: &AppHandle) -> Result<(), String> {
        self.check_auth(app, ServiceType::KickBot).await?;
        Ok(())
    }
}

#[async_trait]
impl KickApi for KickBotService {
    fn set_is_close_connection(&self, _: bool) {}
    async fn auth_session(&self) -> MutexGuard<'_, Option<KickAuthSession>> {
        self.auth_session.lock().await
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
}
