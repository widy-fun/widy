use std::{
    sync::{
        Arc, MutexGuard,
        atomic::{AtomicU64, Ordering},
    },
    time::{SystemTime, UNIX_EPOCH},
};

use async_trait::async_trait;
use base64::{Engine, engine::general_purpose::URL_SAFE_NO_PAD};
use entity::services::{KickAuth, ServiceAuth, ServiceType};
use http::StatusCode;
use rand::Rng;
use serde::de::DeserializeOwned;
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
                AddKickRewardBody, ChanelInfoResponse, KickTokenExchangeBody, PostChatMessageBody,
                PostChatMessageType, RefreshTokenBody, UserInfo, UserInfoResponse,
            },
        },
    },
    utils::send_request,
};

#[async_trait]
pub trait KickApi: Send + Sync {
    fn kick_token_endpoint(&self) -> String;

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
                    "No Twitch authentication found".to_string(),
                ));
            }
        };
        Ok(auth)
    }

    async fn get_auth(
        &self,
        app: &AppHandle,
        service_type: ServiceType,
    ) -> Result<KickAuth, AppError> {
        let auth = self.get_database_auth(app, service_type.clone()).await?;
        let expire_at = self.expire_at().load(Ordering::Relaxed);
        let now = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .map_err(|e| AppError::Custom(e.to_string()))?;

        if expire_at > now.as_secs() {
            return Ok(auth);
        }
        self.refresh_and_update_auth(app, &auth, service_type).await
    }

    async fn refresh_and_update_auth(
        &self,
        app: &AppHandle,
        old_auth: &KickAuth,
        service_type: ServiceType,
    ) -> Result<KickAuth, AppError> {
        let reqwest_client = app.state::<reqwest::Client>();
        let database_service = app.state::<DatabaseService>();
        match self
            .refresh_token(&reqwest_client, old_auth.refresh_token.clone())
            .await
        {
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
                    service_type,
                )
                .await?;
                Ok(new_auth)
            }
            Err(e) => {
                self.set_authorized(&database_service, None, false, true, service_type)
                    .await?;
                Err(e.into())
            }
        }
    }

    async fn refresh_token(
        &self,
        reqwest_client: &reqwest::Client,
        refresh_token: String,
    ) -> Result<KickAuth, AppError> {
        let request = reqwest_client
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
        service_type: ServiceType,
    ) -> Result<(), AppError> {
        if is_close_connection {
            self.cancellation_token().cancel();
        }
        database_service
            .update_service_auth(service_type, auth, authorized)
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

    async fn get_chanel_info(
        &self,
        reqwest_client: &reqwest::Client,
        name: &String,
    ) -> Result<ChanelInfoResponse, AppError> {
        let request = reqwest_client.get(format!("https://kick.com/api/v2/channels/{}", name));

        let chanel_info_response = self
            .send_kick_request::<ChanelInfoResponse>(request, "channel info")
            .await?
            .ok_or(AppError::HttpRequest("Get chanel info error".to_string()))?;

        Ok(chanel_info_response)
    }

    async fn get_user_info(
        &self,
        reqwest_client: &reqwest::Client,
        access_token: &String,
    ) -> Result<UserInfo, AppError> {
        let request = reqwest_client
            .get("https://api.kick.com/public/v1/users")
            .bearer_auth(access_token);

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

    async fn add_custom_reward(
        &self,
        app: &AppHandle,
        auth: &KickAuth,
        reward: &entity::rewards::Reward,
    ) -> Result<(), AppError> {
        let database_service = app.state::<DatabaseService>();
        let reqwest_client = app.state::<reqwest::Client>();
        let twitch_reward_body = AddKickRewardBody {
            title: reward.title.clone(),
            cost: reward.cost,
            description: reward.description.clone(),
            background_color: Some(reward.background_color.clone()),
            is_user_input_required: reward.is_user_input_required,
            is_enabled: reward.is_enabled,
            should_redemptions_skip_request_queue: reward.should_redemptions_skip_request_queue,
        };

        let request = reqwest_client
            .post("https://api.kick.com/public/v1/channels/rewards")
            .bearer_auth(&auth.access_token)
            .json(&twitch_reward_body);

        let json = self
            .send_kick_request::<serde_json::Value>(request, "add custom reward")
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

    async fn remove_custom_reward(
        &self,
        app: &AppHandle,
        auth: &KickAuth,
        id: Uuid,
    ) -> Result<(), AppError> {
        let database_service = app.state::<DatabaseService>();
        let reqwest_client = app.state::<reqwest::Client>();
        let reward = database_service
            .get_reward_by_id(id)
            .await?
            .ok_or(AppError::HttpRequest("Reward not found".to_string()))?;

        let request = reqwest_client
            .delete(format!(
                "https://api.kick.com/public/v1/channels/rewards/{}",
                reward.external_id.ok_or(AppError::HttpRequest(
                    "Reward external_id not exist".to_string()
                ))?
            ))
            .bearer_auth(&auth.access_token);

        let _ = self
            .send_kick_request::<serde_json::Value>(request, "remove custom reward")
            .await?;

        database_service.delete_reward_by_id(id).await?;

        Ok(())
    }

    async fn post_chat_message(
        &self,
        reqwest_client: &reqwest::Client,
        access_token: String,
        content: String,
        broadcaster_user_id: u64,
        reply_to_message_id: Option<String>,
    ) -> Result<(), AppError> {
        let request = reqwest_client
            .post("https://api.kick.com/public/v1/chat")
            .bearer_auth(access_token)
            .json(&PostChatMessageBody {
                broadcaster_user_id,
                content,
                reply_to_message_id,
                r#type: PostChatMessageType::Bot,
            });

        let _ = self
            .send_kick_request::<serde_json::Value>(request, "chat message")
            .await?;

        Ok(())
    }

    async fn tokens(
        &self,
        reqwest_client: &reqwest::Client,
        params: KickAuthCallbackQuery,
    ) -> Result<KickAuth, StatusCode> {
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

        let response = reqwest_client
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

    async fn sign_out(&self, app: &AppHandle, service_type: ServiceType) -> Result<(), AppError> {
        let database_service = app.state::<DatabaseService>();
        self.set_authorized(&database_service, None, false, true, service_type)
            .await
    }
}
