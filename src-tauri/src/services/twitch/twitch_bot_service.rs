use crate::services::twitch::traits::TwitchApi;
use async_trait::async_trait;
use entity::services::ServiceType;
use std::sync::Arc;
use tauri::AppHandle;
use tokio::sync::{Mutex, MutexGuard};

#[derive(Clone, Debug)]
pub struct TwitchBotService {
    client_id: String,
    scopes: String,
    api_endpoint: String,
    auth_endpoint: String,
    eventsub_endpoint: String,
    pub session_id: Arc<Mutex<Option<String>>>,
}

impl TwitchBotService {
    pub fn new(
        client_id: String,
        auth_endpoint: String,
        api_endpoint: String,
        eventsub_endpoint: String,
    ) -> Self {
        let scopes =
            "user:read:email user:read:chat user:write:chat user:bot channel:bot".to_string();

        Self {
            client_id,
            scopes,
            api_endpoint,
            auth_endpoint,
            eventsub_endpoint,
            session_id: Arc::new(Mutex::new(None)),
        }
    }

    pub async fn connect(&self, app: &AppHandle) -> Result<(), String> {
        self.check_auth(&app, ServiceType::TwitchBot).await?;
        Ok(())
    }
}

#[async_trait]
impl TwitchApi for TwitchBotService {
    fn client_id(&self) -> String {
        self.client_id.clone()
    }

    async fn session_id(&self) -> MutexGuard<'_, Option<String>> {
        self.session_id.lock().await
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

    fn set_is_close_connection(&self, _: bool) {}
}
