use crate::services::kick::KickSessionService;
use crate::utils::send_request;
use async_trait::async_trait;
use chrono::Utc;
use database::{DatabaseService, ServicesRepository};
use entity::services::{KickSessionToken, ServiceAuth, ServiceType};
use model::error::AppError;
use model::kick::{
    ActiveChattersResponse, BanInfo, ChanelInfoResponse, ChatCommandBody, PinMessageBody,
    SendMessageBody, SendMessageResponse, UpdateChatSettingsBody, UserInfo,
};
use serde::de::DeserializeOwned;
use serde_json::Value;
use tauri::{AppHandle, Manager};

#[async_trait]
pub trait KickSessionApi: Send + Sync {
    fn reqwest_client(&self) -> &reqwest::Client;

    fn user_info(&self) -> Option<UserInfo>;

    fn chanel_info(&self) -> Option<ChanelInfoResponse>;

    fn channel_id(&self) -> Result<u64, AppError> {
        let channel_id = self
            .chanel_info()
            .ok_or(AppError::Custom("Channel info empty".to_string()))?
            .chatroom
            .channel_id;
        Ok(channel_id)
    }

    fn name(&self) -> Result<String, AppError> {
        let name = self
            .user_info()
            .ok_or(AppError::Custom("User info empty".to_string()))?
            .name;
        Ok(name)
    }

    fn chatroom_id(&self) -> Result<u64, AppError> {
        let chatroom_id = self
            .chanel_info()
            .ok_or(AppError::Custom("Channel info empty".to_string()))?
            .chatroom
            .id;
        Ok(chatroom_id)
    }

    async fn send_kick_session_request<T: DeserializeOwned>(
        &self,
        request: reqwest::RequestBuilder,
        context: &str,
    ) -> Result<Option<T>, AppError> {
        send_request(request, context, "KickSession").await
    }

    async fn get_database_auth(&self, app: &AppHandle) -> Result<KickSessionToken, AppError> {
        let database_service = app.state::<DatabaseService>();

        let service = database_service
            .get_service_with_auth_by_id(ServiceType::KickSession)
            .await?;

        let service = service.ok_or(AppError::DbError("Service not found".to_string()))?;

        let auth = match service.auth {
            Some(ServiceAuth::KickSession(auth)) => auth,
            _ => {
                return Err(AppError::DbError(
                    "No KickSession authentication found".to_string(),
                ));
            }
        };
        Ok(auth)
    }

    async fn get_auth(&self, app: &AppHandle) -> Result<KickSessionToken, AppError> {
        let auth: KickSessionToken = self.get_database_auth(app).await?;
        Ok(auth)
    }

    async fn get_active_chatters(&self) -> Result<Option<ActiveChattersResponse>, AppError> {
        let request = self.reqwest_client().get(format!(
            "https://web.kick.com/api/v1/channels/{}/chat/active-chatters",
            self.channel_id()?
        ));

        let response = self
            .send_kick_session_request::<ActiveChattersResponse>(request, "active chatters")
            .await?;

        Ok(response)
    }

    async fn get_bans(&self, app: &AppHandle) -> Result<Option<Vec<BanInfo>>, AppError> {
        let auth = self.get_auth(app).await?;
        let request = self
            .reqwest_client()
            .get(format!(
                "https://kick.com/api/v2/channels/{}/bans",
                self.name()?
            ))
            .bearer_auth(auth.session_token);

        let response = self
            .send_kick_session_request::<Vec<BanInfo>>(request, "bans")
            .await?;

        Ok(response)
    }

    async fn pin_message(&self, app: &AppHandle, message: String) -> Result<(), AppError> {
        let auth = self.get_auth(app).await?;
        let response = self
            .send_message(app, message)
            .await?
            .ok_or(AppError::Custom("Send message error".to_string()))?;

        let request = self
            .reqwest_client()
            .post(format!(
                "https://kick.com/api/v2/channels/{}/pinned-message",
                self.name()?
            ))
            .bearer_auth(auth.session_token)
            .json(&PinMessageBody {
                duration: 1200,
                message: response.data,
            });

        let _ = self
            .send_kick_session_request::<Value>(request, "pin message")
            .await?;

        Ok(())
    }

    async fn send_message(
        &self,
        app: &AppHandle,
        message: String,
    ) -> Result<Option<SendMessageResponse>, AppError> {
        let auth = self.get_auth(app).await?;
        let message_ref = Utc::now().timestamp() * 1000;
        let request = self
            .reqwest_client()
            .post(format!(
                "https://kick.com/api/v2/messages/send/{}",
                self.chatroom_id()?
            ))
            .bearer_auth(auth.session_token)
            .json(&SendMessageBody {
                r#type: "message".to_string(),
                content: message,
                message_ref: message_ref.to_string(),
            });

        let response = self
            .send_kick_session_request::<SendMessageResponse>(request, "send message")
            .await?;

        Ok(response)
    }

    async fn delete_chat_messages(&self, app: &AppHandle) -> Result<(), AppError> {
        let auth = self.get_auth(app).await?;
        let request = self
            .reqwest_client()
            .post(format!(
                "https://kick.com/api/v2/channels/{}/chat-commands",
                self.name()?
            ))
            .bearer_auth(auth.session_token)
            .json(&ChatCommandBody {
                command: "clear".to_string(),
            });

        let _ = self
            .send_kick_session_request::<Value>(request, "clear chat")
            .await?;

        Ok(())
    }

    async fn get_settings(&self, app: &AppHandle) -> Result<(), AppError> {
        let auth = self.get_auth(app).await?;
        let request = self
            .reqwest_client()
            .get(format!(
                "https://web.kick.com/api/v1/channels/{}/dashboard/chat/settings",
                self.channel_id()?
            ))
            .bearer_auth(auth.session_token);

        let _ = self
            .send_kick_session_request::<Value>(request, "settings")
            .await?;

        Ok(())
    }

    async fn update_chat_settings(
        &self,
        body: UpdateChatSettingsBody,
        app: &AppHandle,
    ) -> Result<(), AppError> {
        let auth = self.get_auth(app).await?;
        let request = self
            .reqwest_client()
            .put(format!(
                "https://kick.com/api/internal/v1/channels/{}/chatroom/settings",
                self.name()?
            ))
            .bearer_auth(auth.session_token)
            .json(&body);

        let _ = self
            .send_kick_session_request::<Value>(request, "update chat settings")
            .await?;

        Ok(())
    }
}

impl KickSessionApi for KickSessionService {
    fn reqwest_client(&self) -> &reqwest::Client {
        &self.reqwest_client
    }

    fn user_info(&self) -> Option<UserInfo> {
        self.user_info.lock().unwrap().clone()
    }

    fn chanel_info(&self) -> Option<ChanelInfoResponse> {
        self.chanel_info.lock().unwrap().clone()
    }
}
