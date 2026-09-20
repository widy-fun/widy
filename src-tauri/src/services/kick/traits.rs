use std::{
    sync::{
        Arc, MutexGuard,
        atomic::{AtomicU64, Ordering},
    },
    time::{SystemTime, UNIX_EPOCH},
};

use async_trait::async_trait;
use base64::{Engine, engine::general_purpose::URL_SAFE_NO_PAD};
use chrono::Utc;
use entity::services::{KickAuth, KickSessionToken, ServiceAuth, ServiceType};
use http::StatusCode;
use rand::Rng;
use serde::de::DeserializeOwned;
use serde_json::Value;
use sha2::{Digest, Sha256};
use tauri::{AppHandle, Manager};
use tauri_plugin_opener::OpenerExt;
use tokio_util::sync::CancellationToken;
use uuid::Uuid;

use crate::{
    error::AppError,
    repositories::{RewardsRepository, ServicesRepository},
    services::{
        DatabaseService, GrantType, KickAuthCallbackQuery,
        kick::{
            KickAuthSession,
            models::{
                ActiveChattersResponse, AddKickRewardBody, BanInfo, BanUserBody, Categories,
                CategoriesResponse, ChanelInfoResponse, ChatCommandBody, KickTokenExchangeBody,
                PatchChanelBody, PinMessageBody, PostChatMessageBody, PostChatMessageType,
                RefreshTokenBody, SearchCategoriesResponse, SendMessageBody, SendMessageResponse,
                UnbanUserBody, UpdateChatSettingsBody, UserInfo, UserInfoResponse,
            },
        },
    },
    utils::send_request,
};

#[async_trait]
pub trait KickApi: Send + Sync {
    fn kick_token_endpoint(&self) -> String;

    fn reqwest_client(&self) -> &reqwest::Client;

    fn service_type(&self) -> ServiceType;

    fn cancellation_token(&self) -> CancellationToken;

    fn kick_client_id(&self) -> String;

    fn kick_redirect_uri(&self) -> String;

    fn scopes(&self) -> String;

    fn app_token(&self) -> String;

    fn auth_session(&self) -> MutexGuard<'_, Option<KickAuthSession>>;

    fn expire_at(&self) -> Arc<AtomicU64>;

    async fn send_kick_request<T: DeserializeOwned>(
        &self,
        request: reqwest::RequestBuilder,
        context: &str,
    ) -> Result<Option<T>, AppError> {
        send_request(request, context, "Kick").await
    }

    async fn get_database_auth(
        &self,
        app: &AppHandle,
        service_type: ServiceType,
    ) -> Result<KickAuth, AppError> {
        let database_service = app.state::<DatabaseService>();

        let service = database_service
            .get_service_with_auth_by_id(service_type.clone())
            .await?;

        let service = service.ok_or(AppError::DbError("Service not found".to_string()))?;

        let auth = match service.auth {
            Some(ServiceAuth::Kick(auth)) => auth,
            _ => {
                return Err(AppError::DbError(
                    "No Kick authentication found".to_string(),
                ));
            }
        };
        Ok(auth)
    }

    async fn get_auth(&self, app: &AppHandle) -> Result<KickAuth, AppError> {
        let auth = self.get_database_auth(app, self.service_type()).await?;
        let expire_at = self.expire_at().load(Ordering::Relaxed);
        let now = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .map_err(|e| AppError::Custom(e.to_string()))?;

        if expire_at > now.as_secs() {
            return Ok(auth);
        }
        self.refresh_and_update_auth(app, &auth).await
    }

    async fn refresh_and_update_auth(
        &self,
        app: &AppHandle,
        old_auth: &KickAuth,
    ) -> Result<KickAuth, AppError> {
        let database_service = app.state::<DatabaseService>();
        match self.refresh_token(old_auth.refresh_token.clone()).await {
            Ok(new_auth) => {
                let now = SystemTime::now()
                    .duration_since(UNIX_EPOCH)
                    .map_err(|e| AppError::Custom(e.to_string()))?;
                self.expire_at()
                    .store(now.as_secs() + (new_auth.expires_in / 2), Ordering::Relaxed);
                self.set_authorized(
                    &database_service,
                    Some(ServiceAuth::Kick(new_auth.clone())),
                    true,
                    false,
                )
                .await?;
                Ok(new_auth)
            }
            Err(e) => {
                if let AppError::HttpStatus { status: 401, .. } = e {
                    self.set_authorized(&database_service, None, false, true)
                        .await?;
                }
                Err(e.into())
            }
        }
    }

    async fn refresh_token(&self, refresh_token: String) -> Result<KickAuth, AppError> {
        let request =
            self.reqwest_client()
                .post(self.kick_token_endpoint())
                .json(&RefreshTokenBody {
                    grant_type: GrantType::RefreshToken,
                    refresh_token,
                    app_token: self.app_token(),
                });

        let refresh_token_response = self
            .send_kick_request::<KickAuth>(request, "refresh token")
            .await?
            .ok_or(AppError::HttpRequest("Refresh token error".to_string()))?;

        Ok(refresh_token_response)
    }

    async fn set_authorized(
        &self,
        database_service: &DatabaseService,
        auth: Option<ServiceAuth>,
        authorized: bool,
        is_close_connection: bool,
    ) -> Result<(), AppError> {
        if is_close_connection {
            self.cancellation_token().cancel();
        }
        database_service
            .update_service_auth(self.service_type(), auth, authorized)
            .await
    }

    async fn authorize(&self, app: &AppHandle) -> Result<(), AppError> {
        let state = Uuid::new_v4().to_string();
        let code_verifier = self.generate_verifier();
        let code_challenge = self.generate_challenge(&code_verifier);
        {
            let mut auth_session = self.auth_session();
            *auth_session = Some(KickAuthSession {
                state: state.clone(),
                code_verifier,
            });
        }
        let _ = app.opener().open_url(
            format!(
                "https://id.kick.com/oauth/authorize?client_id={}&response_type=code&redirect_uri={}&state={}&scope={}&code_challenge={}&code_challenge_method=S256",
                self.kick_client_id(),
                self.kick_redirect_uri(),
                state,
                self.scopes(),
                code_challenge
            ),
            None::<&str>,
        );
        Ok(())
    }

    fn generate_verifier(&self) -> String {
        let mut array = [0u8; 64];
        rand::rng().fill_bytes(&mut array);
        URL_SAFE_NO_PAD.encode(array)
    }

    fn generate_challenge(&self, verifier: &str) -> String {
        let hash = Sha256::digest(verifier.as_bytes());
        URL_SAFE_NO_PAD.encode(hash)
    }

    async fn get_chanel_info(&self, name: &String) -> Result<ChanelInfoResponse, AppError> {
        let request = self
            .reqwest_client()
            .get(format!("https://kick.com/api/v2/channels/{}", name));

        let chanel_info_response = self
            .send_kick_request::<ChanelInfoResponse>(request, "channel info")
            .await?
            .ok_or(AppError::HttpRequest("Get chanel info error".to_string()))?;

        Ok(chanel_info_response)
    }

    async fn get_user_info(&self, app: &AppHandle) -> Result<UserInfo, AppError> {
        let auth = self.get_auth(app).await?;
        let request = self
            .reqwest_client()
            .get("https://api.kick.com/public/v1/users")
            .bearer_auth(auth.access_token);

        let user_info = self
            .send_kick_request::<UserInfoResponse>(request, "user info")
            .await?
            .ok_or(AppError::HttpRequest("Get user info error".to_string()))?;

        Ok(user_info
            .data
            .into_iter()
            .next()
            .ok_or(AppError::HttpRequest("Kick user empty".to_string()))?)
    }

    async fn get_categories(
        &self,
        app: &AppHandle,
        cursor: Option<String>,
        tag: Option<Vec<String>>,
        name: Option<String>,
        limit: Option<u32>,
        id: Option<u64>,
    ) -> Result<Option<CategoriesResponse>, AppError> {
        let auth = self.get_auth(app).await?;
        let mut query: Vec<(&str, String)> = Vec::new();

        if let Some(cursor) = cursor {
            query.push(("cursor", cursor));
        }
        if let Some(name) = name {
            query.push(("name", name));
        }
        if let Some(tags) = tag {
            for t in tags {
                query.push(("tag", t));
            }
        }
        query.push(("limit", limit.unwrap_or(1000).to_string()));
        if let Some(id) = id {
            query.push(("id", id.to_string()));
        }
        let request = self
            .reqwest_client()
            .get("https://api.kick.com/public/v2/categories")
            .bearer_auth(auth.access_token)
            .query(&query);

        let response = self
            .send_kick_request::<CategoriesResponse>(request, "user info")
            .await?;

        Ok(response)
    }

    async fn get_all_categories(
        &self,
        app: &AppHandle,
        tag: Option<Vec<String>>,
        name: Option<String>,
        id: Option<u64>,
    ) -> Result<Vec<Categories>, AppError> {
        let mut all_categories: Vec<Categories> = Vec::new();
        let mut cursor: Option<String> = None;

        loop {
            let response = self
                .get_categories(
                    app,
                    cursor.clone(),
                    tag.clone(),
                    name.clone(),
                    Some(1000),
                    id,
                )
                .await?;

            let Some(response) = response else {
                break;
            };

            let got_count = response.data.len();
            all_categories.extend(response.data);

            let next_cursor = response.pagination.next_cursor;

            if next_cursor.is_empty() || Some(&next_cursor) == cursor.as_ref() || got_count == 0 {
                break;
            }

            cursor = Some(next_cursor);
        }

        Ok(all_categories)
    }

    async fn add_custom_reward(
        &self,
        app: &AppHandle,
        reward: &entity::rewards::Reward,
    ) -> Result<(), AppError> {
        let auth = self.get_auth(app).await?;
        let database_service = app.state::<DatabaseService>();
        let kick_reward_body = AddKickRewardBody {
            title: reward.title.clone(),
            cost: reward.cost,
            description: reward.description.clone(),
            background_color: Some(reward.background_color.clone()),
            is_user_input_required: reward.is_user_input_required,
            is_enabled: reward.is_enabled,
            should_redemptions_skip_request_queue: reward.should_redemptions_skip_request_queue,
        };

        let request = self
            .reqwest_client()
            .post("https://api.kick.com/public/v1/channels/rewards")
            .bearer_auth(&auth.access_token)
            .json(&kick_reward_body);

        let json = self
            .send_kick_request::<Value>(request, "add custom reward")
            .await?
            .ok_or(AppError::HttpRequest("Add custom reward error".to_string()))?;

        let reward_id =
            json["data"]["id"]
                .as_str()
                .map(|s| s.to_string())
                .ok_or(AppError::HttpRequest(
                    "Kick reward create error".to_string(),
                ))?;

        let _ = database_service
            .create_reward(entity::rewards::Reward {
                external_id: Some(reward_id),
                ..reward.clone()
            })
            .await?;

        Ok(())
    }

    async fn remove_custom_reward(&self, app: &AppHandle, id: Uuid) -> Result<(), AppError> {
        let auth = self.get_auth(app).await?;
        let database_service = app.state::<DatabaseService>();
        let reward = database_service
            .get_reward_by_id(id)
            .await?
            .ok_or(AppError::HttpRequest("Reward not found".to_string()))?;

        let request = self
            .reqwest_client()
            .delete(format!(
                "https://api.kick.com/public/v1/channels/rewards/{}",
                reward.external_id.ok_or(AppError::HttpRequest(
                    "Reward external_id not exist".to_string()
                ))?
            ))
            .bearer_auth(&auth.access_token);

        let _ = self
            .send_kick_request::<Value>(request, "remove custom reward")
            .await?;

        database_service.delete_reward_by_id(id).await?;

        Ok(())
    }

    async fn post_chat_message(
        &self,
        content: String,
        broadcaster_user_id: u64,
        reply_to_message_id: Option<String>,
        app: &AppHandle,
    ) -> Result<(), AppError> {
        let auth = self.get_auth(app).await?;
        let request = self
            .reqwest_client()
            .post("https://api.kick.com/public/v1/chat")
            .bearer_auth(auth.access_token)
            .json(&PostChatMessageBody {
                broadcaster_user_id,
                content,
                reply_to_message_id,
                r#type: PostChatMessageType::Bot,
            });

        let _ = self
            .send_kick_request::<Value>(request, "chat message")
            .await?;

        Ok(())
    }

    async fn search_categories(
        &self,
        name: String,
        app: &AppHandle,
    ) -> Result<Option<SearchCategoriesResponse>, AppError> {
        let auth = self.get_auth(app).await?;
        let request = self
            .reqwest_client()
            .get(format!(
                "https://api.kick.com/public/v2/categories?name={}",
                name
            ))
            .bearer_auth(auth.access_token);

        let response = self
            .send_kick_request::<SearchCategoriesResponse>(request, "search categories")
            .await?;

        Ok(response)
    }

    async fn ban_user(
        &self,
        user_id: u64,
        broadcaster_user_id: u64,
        app: &AppHandle,
        duration: Option<u64>,
    ) -> Result<(), AppError> {
        let auth = self.get_auth(app).await?;
        let request = self
            .reqwest_client()
            .post("https://api.kick.com/public/v1/moderation/bans")
            .bearer_auth(auth.access_token)
            .json(&BanUserBody {
                broadcaster_user_id,
                duration,
                reason: None,
                user_id,
            });

        let _ = self.send_kick_request::<Value>(request, "ban user").await?;

        Ok(())
    }

    async fn unban_user(
        &self,
        user_id: u64,
        broadcaster_user_id: u64,
        app: &AppHandle,
    ) -> Result<(), AppError> {
        let auth = self.get_auth(app).await?;
        let request = self
            .reqwest_client()
            .delete("https://api.kick.com/public/v1/moderation/bans")
            .bearer_auth(auth.access_token)
            .json(&UnbanUserBody {
                broadcaster_user_id,
                user_id,
            });

        let _ = self
            .send_kick_request::<Value>(request, "unban user")
            .await?;

        Ok(())
    }

    async fn patch_channel(&self, body: PatchChanelBody, app: &AppHandle) -> Result<(), AppError> {
        let auth = self.get_auth(app).await?;
        let request = self
            .reqwest_client()
            .patch("https://api.kick.com/public/v1/channels")
            .bearer_auth(auth.access_token)
            .json(&body);

        let _ = self
            .send_kick_request::<Value>(request, "patch chanel")
            .await?;

        Ok(())
    }

    async fn tokens(&self, params: KickAuthCallbackQuery) -> Result<KickAuth, StatusCode> {
        let auth_session = {
            let mut auth_session_guard = self.auth_session();
            let session = match auth_session_guard.clone() {
                Some(s) => s,
                _ => return Err(StatusCode::UNAUTHORIZED),
            };
            *auth_session_guard = None;
            session
        };

        if auth_session.state != params.state {
            return Err(StatusCode::BAD_REQUEST);
        }

        let response = self
            .reqwest_client()
            .post(&self.kick_token_endpoint())
            .json(&KickTokenExchangeBody {
                code: params.code,
                code_verifier: auth_session.code_verifier.clone(),
                redirect_uri: self.kick_redirect_uri(),
                app_token: self.app_token(),
                grant_type: GrantType::AuthorizationCode,
            })
            .send()
            .await
            .map_err(|e| {
                log::error!("Kick: token exchange request failed: {}", e);
                StatusCode::INTERNAL_SERVER_ERROR
            })?;

        let auth: KickAuth = response.json().await.map_err(|e| {
            log::error!("Kick: failed to parse token exchange response: {}", e);
            StatusCode::INTERNAL_SERVER_ERROR
        })?;
        Ok(auth)
    }

    async fn sign_out(&self, app: &AppHandle) -> Result<(), AppError> {
        let database_service = app.state::<DatabaseService>();
        self.set_authorized(&database_service, None, false, true)
            .await
    }
}

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
