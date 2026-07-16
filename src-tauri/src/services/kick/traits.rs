use async_trait::async_trait;
use base64::{engine::general_purpose::URL_SAFE_NO_PAD, Engine};
use entity::services::{KickAuth, ServiceAuth, ServiceType};
use http::StatusCode;
use rand::Rng;
use sha2::{Digest, Sha256};
use tauri::{AppHandle, Manager};
use tauri_plugin_opener::OpenerExt;
use tokio::sync::MutexGuard;
use uuid::Uuid;

use crate::{
    repositories::{RewardsRepository, ServicesRepository},
    services::{
        kick::{
            models::{
                AddKickRewardBody, ChanelInfoResponse, KickTokenExchangeBody, PostChatMessageBody,
                PostChatMessageType, RefreshTokenBody, UserInfo, UserInfoResponse,
            },
            KickAuthSession,
        },
        DatabaseService, GrantType, KickAuthCallbackQuery,
    },
};

#[async_trait]
pub trait KickApi: Send + Sync {
    fn kick_token_endpoint(&self) -> String;
    fn kick_client_id(&self) -> String;
    fn kick_redirect_uri(&self) -> String;
    fn scopes(&self) -> String;
    fn app_token(&self) -> String;
    async fn auth_session(&self) -> MutexGuard<'_, Option<KickAuthSession>>;
    fn set_is_close_connection(&self, is_close_connection: bool);

    async fn check_auth(
        &self,
        app: &AppHandle,
        service_type: ServiceType,
    ) -> Result<KickAuth, String> {
        let database_service = app.state::<DatabaseService>();
        let reqwest_client = app.state::<reqwest::Client>();
        let service = database_service
            .get_service_with_auth_by_id(service_type.clone())
            .await?;

        let service = service.ok_or("Service not found".to_string())?;

        let auth = match service.auth {
            Some(ServiceAuth::Kick(auth)) => auth,
            _ => return Err("No Kick authentication found".to_string()),
        };
        self.refresh_and_update_auth(&reqwest_client, &database_service, &auth, service_type)
            .await
    }

    async fn refresh_and_update_auth(
        &self,
        reqwest_client: &reqwest::Client,
        database_service: &DatabaseService,
        old_auth: &KickAuth,
        service_type: ServiceType,
    ) -> Result<KickAuth, String> {
        match self
            .refresh_token(reqwest_client, old_auth.refresh_token.clone())
            .await
        {
            Ok(new_auth) => {
                self.set_authorized(
                    database_service,
                    Some(ServiceAuth::Kick(new_auth.clone())),
                    true,
                    false,
                    service_type,
                )
                .await?;
                Ok(new_auth)
            }
            Err(_) => {
                self.set_authorized(database_service, None, false, true, service_type)
                    .await?;
                Err("Token refresh failed".to_string())
            }
        }
    }

    async fn refresh_token(
        &self,
        reqwest_client: &reqwest::Client,
        refresh_token: String,
    ) -> Result<KickAuth, String> {
        let response = reqwest_client
            .post(self.kick_token_endpoint())
            .json(&RefreshTokenBody {
                grant_type: GrantType::RefreshToken,
                refresh_token,
                app_token: self.app_token(),
            })
            .send()
            .await
            .map_err(|e| {
                log::error!("Failed to refresh token: {}", e);
                e.to_string()
            })?;

        if !response.status().is_success() {
            let bad_response = response.text().await.map_err(|e| {
                log::error!("Kick: failed to read refresh token error response: {}", e);
                e.to_string()
            })?;
            return Err(bad_response);
        }

        let refresh_token_response: KickAuth = response.json().await.map_err(|e| {
            log::error!("Kick: failed to parse refresh token response: {}", e);
            e.to_string()
        })?;
        Ok(refresh_token_response)
    }

    async fn set_authorized(
        &self,
        database_service: &DatabaseService,
        auth: Option<ServiceAuth>,
        authorized: bool,
        is_close_connection: bool,
        service_type: ServiceType,
    ) -> Result<(), String> {
        self.set_is_close_connection(is_close_connection);
        database_service
            .update_service_auth(service_type, auth, authorized)
            .await
    }

    async fn authorize(&self, app: &AppHandle) -> Result<(), String> {
        let state = Uuid::new_v4().to_string();
        let code_verifier = self.generate_verifier();
        let code_challenge = self.generate_challenge(&code_verifier);
        let mut auth_session = self.auth_session().await;
        *auth_session = Some(KickAuthSession {
            state: state.clone(),
            code_verifier,
        });
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
    ) -> Result<ChanelInfoResponse, String> {
        let response = reqwest_client
            .get(format!("https://kick.com/api/v2/channels/{}", name))
            .send()
            .await
            .map_err(|e| {
                log::error!("Failed to send chanel info request: {}", e);
                e.to_string()
            })?;

        if !response.status().is_success() {
            let bad_response = response.text().await.map_err(|e| {
                log::error!("Kick: failed to read channel info error response: {}", e);
                e.to_string()
            })?;
            return Err(bad_response);
        }

        let chanel_info_response: ChanelInfoResponse = response.json().await.map_err(|e| {
            log::error!("Kick: failed to parse channel info: {}", e);
            e.to_string()
        })?;

        Ok(chanel_info_response)
    }

    async fn get_user_info(
        &self,
        reqwest_client: &reqwest::Client,
        access_token: &String,
    ) -> Result<UserInfo, String> {
        let response = reqwest_client
            .get("https://api.kick.com/public/v1/users")
            .bearer_auth(access_token)
            .send()
            .await
            .map_err(|e| {
                log::error!("Failed to send user info request: {}", e);
                e.to_string()
            })?;

        if !response.status().is_success() {
            let bad_response = response.text().await.map_err(|e| {
                log::error!("Kick: failed to read channel info error response: {}", e);
                e.to_string()
            })?;
            return Err(bad_response);
        }

        let user_info: UserInfoResponse = response.json().await.map_err(|e| {
            log::error!("Failed parse user info: {}", e.to_string());
            e.to_string()
        })?;

        Ok(user_info
            .data
            .into_iter()
            .next()
            .ok_or("Kick user empty".to_string())?)
    }

    async fn add_custom_reward(
        &self,
        app: &AppHandle,
        auth: &KickAuth,
        reward: &entity::rewards::Reward,
    ) -> Result<(), String> {
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

        let response = reqwest_client
            .post("https://api.kick.com/public/v1/channels/rewards")
            .bearer_auth(&auth.access_token)
            .json(&twitch_reward_body)
            .send()
            .await
            .map_err(|e| {
                log::error!("Kick: failed to send reward create request: {}", e);
                e.to_string()
            })?;
        if !response.status().is_success() {
            let err_text = response.text().await.map_err(|e| {
                log::error!("Kick: failed to read error response: {}", e);
                e.to_string()
            })?;
            log::error!("Kick error response: {}", err_text);
            return Err(err_text);
        }

        let json: serde_json::Value = response.json().await.map_err(|e| {
            log::error!("Kick: failed to parse reward create response JSON: {}", e);
            e.to_string()
        })?;

        let reward_id = json["data"]["id"]
            .as_str()
            .map(|s| s.to_string())
            .ok_or("Kick reward create error".to_string())?;

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
    ) -> Result<(), String> {
        let database_service = app.state::<DatabaseService>();
        let reqwest_client = app.state::<reqwest::Client>();
        let reward = database_service
            .get_reward_by_id(id)
            .await?
            .ok_or("Reward not found".to_string())?;

        let response = reqwest_client
            .delete(format!(
                "https://api.kick.com/public/v1/channels/rewards/{}",
                reward
                    .external_id
                    .ok_or("Reward external_id not exist".to_string())?
            ))
            .bearer_auth(&auth.access_token)
            .send()
            .await
            .map_err(|e| {
                log::error!("Kick: failed to send reward delete request: {}", e);
                e.to_string()
            })?;
        if !response.status().is_success() {
            let err_text = response.text().await.map_err(|e| {
                log::error!("Kick: failed to read delete error response: {}", e);
                e.to_string()
            })?;
            log::error!("Kick error response: {}", err_text);
            return Err(err_text);
        }

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
    ) -> Result<(), String> {
        let response = reqwest_client
            .post("https://api.kick.com/public/v1/chat")
            .bearer_auth(access_token)
            .json(&PostChatMessageBody {
                broadcaster_user_id,
                content,
                reply_to_message_id,
                r#type: PostChatMessageType::Bot,
            })
            .send()
            .await
            .map_err(|e| {
                log::error!("Failed to post chat message: {}", e);
                e.to_string()
            })?;

        if !response.status().is_success() {
            let err_text = response.text().await.map_err(|e| {
                log::error!("Kick: failed to read chat send error response: {}", e);
                e.to_string()
            })?;
            log::error!("Send chat message error response: {}", err_text);
            return Err(err_text);
        }

        Ok(())
    }

    async fn tokens(
        &self,
        reqwest_client: &reqwest::Client,
        params: KickAuthCallbackQuery,
    ) -> Result<KickAuth, StatusCode> {
        let mut auth_session_guard = self.auth_session().await;
        let auth_session = auth_session_guard.clone();
        *auth_session_guard = None;
        let auth_session = auth_session.ok_or(StatusCode::UNAUTHORIZED)?;

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

    async fn sign_out(&self, app: &AppHandle, service_type: ServiceType) -> Result<(), String> {
        let database_service = app.state::<DatabaseService>();
        self.set_authorized(&database_service, None, false, true, service_type)
            .await
    }
}
