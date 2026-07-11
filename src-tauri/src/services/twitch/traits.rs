use std::collections::HashMap;

use async_trait::async_trait;
use entity::services::{ServiceAuth, ServiceType, TwitchAuth};
use tauri::{AppHandle, Manager};
use tokio::sync::MutexGuard;

use crate::{
    repositories::{RewardsRepository, ServicesRepository},
    services::{
        twitch::models::{
            AddTwitchRewardBody, BadgeInfoResponse, ChatMessageCondition, CheerCondition,
            Condition, FollowCondition, RaidCondition, RedemptionCondition, SendChatMessageBody,
            SubscriptionCondition, SubscriptionRequestBody, SubscriptionType, Transport,
            TwitchDeviceCodeResponse, TwitchRefreshTokenResponse, TwitchTokenInfo,
            TwitchTokenResponse,
        },
        DatabaseService,
    },
};

#[async_trait]
pub trait TwitchApi: Send + Sync {
    fn client_id(&self) -> String;

    fn eventsub_endpoint(&self) -> String;

    async fn session_id(&self) -> MutexGuard<'_, Option<String>>;

    fn auth_endpoint(&self) -> String;

    fn scopes(&self) -> String;

    fn api_endpoint(&self) -> String;

    fn set_is_close_connection(&self, is_close_connection: bool);

    async fn check_auth(
        &self,
        app: &AppHandle,
        service_type: ServiceType,
    ) -> Result<TwitchAuth, String> {
        let reqwest_client = app.state::<reqwest::Client>();
        let database_service = app.state::<DatabaseService>();

        let service = database_service
            .get_service_with_auth_by_id(service_type.clone())
            .await?;

        let service = service.ok_or("Service not found".to_string())?;

        let auth = match service.auth {
            Some(ServiceAuth::Twitch(auth)) => auth,
            _ => return Err("No Twitch authentication found".to_string()),
        };

        if cfg!(debug_assertions) {
            return self.get_token_mock(&reqwest_client).await;
        }

        self.refresh_and_update_auth(&database_service, &auth, service_type, &reqwest_client)
            .await
    }

    async fn refresh_and_update_auth(
        &self,
        database_service: &DatabaseService,
        old_auth: &TwitchAuth,
        service_type: ServiceType,
        reqwest_client: &reqwest::Client,
    ) -> Result<TwitchAuth, String> {
        match self
            .refresh_token(&self.client_id(), &old_auth.refresh_token, reqwest_client)
            .await
        {
            Ok(response) => {
                let new_auth = TwitchAuth {
                    access_token: response.access_token,
                    refresh_token: response.refresh_token,
                    token_type: response.token_type,
                    expires_in: old_auth.expires_in,
                    user_id: old_auth.user_id.clone(),
                };
                self.set_authorized(
                    database_service,
                    Some(ServiceAuth::Twitch(new_auth.clone())),
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

    async fn get_device_code(
        &self,
        reqwest_client: &reqwest::Client,
    ) -> Result<TwitchDeviceCodeResponse, String> {
        let mut params = HashMap::new();

        params.insert("client_id", self.client_id());
        params.insert("scopes", self.scopes());
        let response = reqwest_client
            .post("https://id.twitch.tv/oauth2/device")
            .form(&params)
            .send()
            .await
            .map_err(|e| {
                log::error!("Twitch: failed to request device code: {}", e);
                e.to_string()
            })?;

        let device_code_response: TwitchDeviceCodeResponse =
            response.json().await.map_err(|e| {
                log::error!("Twitch: failed to parse device code response: {}", e);
                e.to_string()
            })?;
        Ok(device_code_response)
    }

    async fn get_chanel_badges(
        &self,
        access_token: &String,
        broadcaster_id: &String,
        reqwest_client: &reqwest::Client,
    ) -> Result<BadgeInfoResponse, String> {
        let response = reqwest_client
            .get(format!("{}/chat/badges", self.api_endpoint()))
            .bearer_auth(access_token)
            .header(
                "Client-Id",
                std::env::var("TWITCH_CLIENT_ID_MOCK").unwrap_or(self.client_id()),
            )
            .query(&[("broadcaster_id", broadcaster_id)])
            .send()
            .await
            .map_err(|e| {
                log::error!("Twitch: failed to send channel badges request: {}", e);
                e.to_string()
            })?;

        let chanel_badges: BadgeInfoResponse = response.json().await.map_err(|e| {
            log::error!("Twitch: failed to parse channel badges response: {}", e);
            e.to_string()
        })?;
        Ok(chanel_badges)
    }

    async fn get_global_badges(
        &self,
        access_token: &String,
        reqwest_client: &reqwest::Client,
    ) -> Result<BadgeInfoResponse, String> {
        let response = reqwest_client
            .get(format!("{}/chat/badges/global", self.api_endpoint()))
            .bearer_auth(access_token)
            .header(
                "Client-Id",
                std::env::var("TWITCH_CLIENT_ID_MOCK").unwrap_or(self.client_id()),
            )
            .send()
            .await
            .map_err(|e| {
                log::error!("Twitch: failed to send global badges request: {}", e);
                e.to_string()
            })?;

        let global_badges: BadgeInfoResponse = response.json().await.map_err(|e| {
            log::error!("Twitch: failed to parse global badges response: {}", e);
            e.to_string()
        })?;
        Ok(global_badges)
    }

    async fn get_token(
        &self,
        device_code: String,
        reqwest_client: &reqwest::Client,
    ) -> Result<TwitchAuth, String> {
        let mut params = HashMap::new();

        params.insert("client_id", self.client_id());
        params.insert("scopes", self.scopes());
        params.insert("device_code", device_code);
        params.insert(
            "grant_type",
            "urn:ietf:params:oauth:grant-type:device_code".to_string(),
        );

        let response = reqwest_client
            .post("https://id.twitch.tv/oauth2/token")
            .form(&params)
            .send()
            .await
            .map_err(|e| {
                log::error!("Twitch: failed to request oauth token: {}", e);
                e.to_string()
            })?;
        if !response.status().is_success() {
            let err_text = response.text().await.map_err(|e| {
                log::error!("Twitch: failed to read token error response: {}", e);
                e.to_string()
            })?;
            log::error!("Twitch token error response: {}", err_text);
            return Err(err_text);
        }
        let token_response: TwitchTokenResponse =
            response.json().await.map_err(|e| e.to_string())?;

        let token_info: TwitchTokenInfo = self
            .validate_token(
                &token_response.access_token,
                &"https://id.twitch.tv/oauth2".to_string(),
                reqwest_client,
            )
            .await?;

        if cfg!(debug_assertions) {
            return self.get_token_mock(reqwest_client).await;
        }

        let auth = TwitchAuth {
            access_token: token_response.access_token,
            refresh_token: token_response.refresh_token,
            token_type: token_response.token_type,
            expires_in: token_response.expires_in,
            user_id: token_info.user_id,
        };

        Ok(auth)
    }

    async fn get_token_mock(&self, reqwest_client: &reqwest::Client) -> Result<TwitchAuth, String> {
        let user_id = std::env::var("TWITCH_USER_ID_MOCK").expect("TWITCH_USER_ID_MOCK not set");
        let client_id =
            std::env::var("TWITCH_CLIENT_ID_MOCK").expect("TWITCH_CLIENT_ID_MOCK not set");
        let client_secret =
            std::env::var("TWITCH_CLIENT_SECRET_MOCK").expect("TWITCH_CLIENT_SECRET_MOCK not set");

        let mut params = HashMap::new();

        params.insert("client_id", client_id);
        params.insert("client_secret", client_secret);
        params.insert("grant_type", "user_token".to_string());
        params.insert("user_id", user_id.clone());
        params.insert("scope", self.scopes());

        let response = reqwest_client
            .post(format!("{}/authorize", self.auth_endpoint()))
            .query(&params)
            .send()
            .await
            .map_err(|e| {
                log::error!("Twitch: failed to send mock token request: {}", e);
                e.to_string()
            })?;
        if !response.status().is_success() {
            let err_text = response.text().await.map_err(|e| {
                log::error!("Twitch: failed to read mock token error response: {}", e);
                e.to_string()
            })?;
            log::error!("Twitch mock token error response: {}", err_text);
            return Err(err_text);
        }
        let token_response: TwitchTokenResponse =
            response.json().await.map_err(|e| e.to_string())?;

        let auth = TwitchAuth {
            access_token: token_response.access_token.clone(),
            refresh_token: token_response.refresh_token,
            token_type: token_response.token_type,
            expires_in: token_response.expires_in,
            user_id: user_id.clone(),
        };

        Ok(auth)
    }

    async fn refresh_token(
        &self,
        client_id: &String,
        refresh_token: &String,
        reqwest_client: &reqwest::Client,
    ) -> Result<TwitchRefreshTokenResponse, String> {
        let mut params = HashMap::new();

        params.insert("grant_type", "refresh_token".to_string());
        params.insert(
            "refresh_token",
            urlencoding::encode(&refresh_token).to_string(),
        );
        params.insert("client_id", client_id.to_owned());

        let response = reqwest_client
            .post(format!("{}/token", self.auth_endpoint()))
            .form(&params)
            .send()
            .await
            .map_err(|e| {
                log::error!("Twitch: failed to refresh token request: {}", e);
                e.to_string()
            })?;

        if !response.status().is_success() {
            let bad_response = response.json().await.map_err(|e| {
                log::error!(
                    "Twitch: failed to parse refresh token error response: {}",
                    e
                );
                e.to_string()
            })?;

            return Err(bad_response);
        }

        let refresh_token_response: TwitchRefreshTokenResponse =
            response.json().await.map_err(|e| {
                log::error!("Twitch: failed to parse refresh token response: {}", e);
                e.to_string()
            })?;

        Ok(refresh_token_response)
    }

    async fn validate_token(
        &self,
        token: &String,
        auth_endpoint: &String,
        reqwest_client: &reqwest::Client,
    ) -> Result<TwitchTokenInfo, String> {
        let response = reqwest_client
            .get(format!("{}/validate", auth_endpoint))
            .header("Authorization", format!("OAuth {}", token))
            .send()
            .await
            .map_err(|e| {
                log::error!("Twitch: failed to validate token request: {}", e);
                e.to_string()
            })?;
        if !response.status().is_success() {
            let bad_response = response.json().await.map_err(|e| {
                log::error!(
                    "Twitch: failed to read token validate error response: {}",
                    e
                );
                e.to_string()
            })?;

            return Err(bad_response);
        }

        let token_info: TwitchTokenInfo = response.json().await.map_err(|e| {
            log::error!("Twitch: failed to parse token validate response: {}", e);
            e.to_string()
        })?;
        Ok(token_info.clone())
    }

    async fn add_custom_reward(
        &self,
        app: &AppHandle,
        auth: &TwitchAuth,
        reward: &entity::rewards::Reward,
    ) -> Result<(), String> {
        let database_service = app.state::<DatabaseService>();
        let reqwest_client = app.state::<reqwest::Client>();
        let twitch_reward_body = AddTwitchRewardBody {
            title: reward.title.clone(),
            cost: reward.cost,
            prompt: reward.description.clone(),
            background_color: Some(reward.background_color.clone()),
            is_user_input_required: reward.is_user_input_required,
            is_enabled: reward.is_enabled,
            is_max_per_stream_enabled: reward.is_max_per_stream_enabled,
            max_per_stream: reward.max_per_stream,
            is_max_per_user_per_stream_enabled: reward.is_max_per_user_per_stream_enabled,
            max_per_user_per_stream: reward.max_per_user_per_stream,
            is_global_cooldown_enabled: reward.is_global_cooldown_enabled,
            global_cooldown_seconds: reward.global_cooldown_seconds,
            should_redemptions_skip_request_queue: reward.should_redemptions_skip_request_queue,
        };

        let response = reqwest_client
            .post(format!(
                "{}/channel_points/custom_rewards",
                self.api_endpoint()
            ))
            .header("Authorization", format!("Bearer {}", auth.access_token))
            .header(
                "Client-Id",
                std::env::var("TWITCH_CLIENT_ID_MOCK").unwrap_or(self.client_id()),
            )
            .query(&[("broadcaster_id", &auth.user_id)])
            .json(&twitch_reward_body)
            .send()
            .await
            .map_err(|e| {
                log::error!("Twitch: failed to send create reward request: {}", e);
                e.to_string()
            })?;

        if !response.status().is_success() {
            let err_text = response.text().await.map_err(|e| {
                log::error!("Twitch: failed to read create reward error response: {}", e);
                e.to_string()
            })?;
            log::error!("Twitch subscription error response: {}", err_text);
            return Err(err_text);
        }

        let json: serde_json::Value = response.json().await.map_err(|e| {
            log::error!("Twitch: failed to parse reward create response JSON: {}", e);
            e.to_string()
        })?;

        let reward_id = json["data"][0]["id"]
            .as_str()
            .map(|s| s.to_string())
            .ok_or("Twitch reward create error".to_string())?;

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
        auth: &TwitchAuth,
        id: &String,
    ) -> Result<(), String> {
        let database_service = app.state::<DatabaseService>();
        let reqwest_client = app.state::<reqwest::Client>();
        let reward = database_service
            .get_reward_by_id(id)
            .await?
            .ok_or("Reward not found".to_string())?;
        database_service.delete_reward_by_id(id).await?;
        let response = reqwest_client
            .delete(format!(
                "{}/channel_points/custom_rewards",
                self.api_endpoint()
            ))
            .header("Authorization", format!("Bearer {}", auth.access_token))
            .header(
                "Client-Id",
                std::env::var("TWITCH_CLIENT_ID_MOCK").unwrap_or(self.client_id()),
            )
            .query(&[
                ("broadcaster_id", auth.user_id.clone()),
                (
                    "id",
                    reward
                        .external_id
                        .ok_or("Reward external_id not exist".to_string())?,
                ),
            ])
            .send()
            .await
            .map_err(|e| {
                log::error!("Twitch: failed to send delete reward request: {}", e);
                e.to_string()
            })?;
        if !response.status().is_success() {
            let err_text = response.text().await.map_err(|e| {
                log::error!("Twitch: failed to read delete reward error response: {}", e);
                e.to_string()
            })?;
            log::error!("Twitch subscription error response: {}", err_text);
            return Err(err_text);
        }

        Ok(())
    }

    async fn create_subscriptions(
        &self,
        session_id: &String,
        access_token: &String,
        user_id: &String,
        reqwest_client: &reqwest::Client,
    ) {
        let transport = Transport {
            method: "websocket".to_string(),
            session_id: session_id.clone(),
        };
        let subscribes_types = vec![
            SubscriptionType::to_string(SubscriptionType::ChannelSubscribe),
            SubscriptionType::to_string(SubscriptionType::ChannelSubscriptionGift),
            SubscriptionType::to_string(SubscriptionType::ChannelSubscriptionMessage),
        ];
        for subscribe_type in subscribes_types {
            let _ = self
                .create_subscription(
                    &access_token,
                    SubscriptionRequestBody {
                        r#type: subscribe_type,
                        version: "1".to_string(),
                        condition: Condition::Subscription({
                            SubscriptionCondition {
                                broadcaster_user_id: user_id.clone(),
                            }
                        }),
                        transport: transport.clone(),
                    },
                    reqwest_client,
                )
                .await;
        }
        let _ = self
            .create_subscription(
                &access_token,
                SubscriptionRequestBody {
                    r#type: SubscriptionType::to_string(SubscriptionType::ChannelFollow),
                    version: "2".to_string(),
                    condition: Condition::Follow({
                        FollowCondition {
                            broadcaster_user_id: user_id.clone(),
                            moderator_user_id: user_id.clone(),
                        }
                    }),
                    transport: transport.clone(),
                },
                reqwest_client,
            )
            .await;
        let _ = self
            .create_subscription(
                &access_token,
                SubscriptionRequestBody {
                    r#type: SubscriptionType::to_string(SubscriptionType::ChannelRaid),
                    version: "1".to_string(),
                    condition: Condition::Raid({
                        RaidCondition {
                            to_broadcaster_user_id: user_id.clone(),
                        }
                    }),
                    transport: transport.clone(),
                },
                reqwest_client,
            )
            .await;
        let _ = self
            .create_subscription(
                &access_token,
                SubscriptionRequestBody {
                    r#type: SubscriptionType::to_string(SubscriptionType::ChannelCheer),
                    version: "1".to_string(),
                    condition: Condition::Cheer({
                        CheerCondition {
                            broadcaster_user_id: user_id.clone(),
                        }
                    }),
                    transport: transport.clone(),
                },
                reqwest_client,
            )
            .await;
        let _ = self
            .create_subscription(
                &access_token,
                SubscriptionRequestBody {
                    r#type: SubscriptionType::to_string(
                        SubscriptionType::ChannelPointsCustomRewardRedemptionAdd,
                    ),
                    version: "1".to_string(),
                    condition: Condition::Redemption({
                        RedemptionCondition {
                            broadcaster_user_id: user_id.clone(),
                        }
                    }),
                    transport: transport.clone(),
                },
                reqwest_client,
            )
            .await;
        let _ = self
            .create_subscription(
                &access_token,
                SubscriptionRequestBody {
                    r#type: SubscriptionType::to_string(SubscriptionType::ChannelChatMessage),
                    version: "1".to_string(),
                    condition: Condition::ChatMessage({
                        ChatMessageCondition {
                            broadcaster_user_id: user_id.clone(),
                            user_id: user_id.clone(),
                        }
                    }),
                    transport: transport.clone(),
                },
                reqwest_client,
            )
            .await;
        let _ = self
            .create_subscription(
                &access_token,
                SubscriptionRequestBody {
                    r#type: SubscriptionType::to_string(SubscriptionType::ChannelChatMessageDelete),
                    version: "1".to_string(),
                    condition: Condition::ChatMessage({
                        ChatMessageCondition {
                            broadcaster_user_id: user_id.clone(),
                            user_id: user_id.clone(),
                        }
                    }),
                    transport: transport.clone(),
                },
                reqwest_client,
            )
            .await;
        let _ = self
            .create_subscription(
                &access_token,
                SubscriptionRequestBody {
                    r#type: SubscriptionType::to_string(
                        SubscriptionType::ChannelChatClearUserMessages,
                    ),
                    version: "1".to_string(),
                    condition: Condition::ChatMessage({
                        ChatMessageCondition {
                            broadcaster_user_id: user_id.clone(),
                            user_id: user_id.clone(),
                        }
                    }),
                    transport: transport.clone(),
                },
                reqwest_client,
            )
            .await;
    }

    async fn create_subscription(
        &self,
        token: &String,
        body: SubscriptionRequestBody,
        reqwest_client: &reqwest::Client,
    ) -> Result<Option<String>, String> {
        let response = reqwest_client
            .post(format!(
                "{}/eventsub/subscriptions",
                self.eventsub_endpoint()
            ))
            .bearer_auth(token)
            .header("Client-Id", self.client_id())
            .header("Content-Type", "application/json")
            .json(&body)
            .send()
            .await
            .map_err(|e| {
                log::error!("Twitch: failed to create subscription request: {}", e);
                e.to_string()
            })?;

        if !response.status().is_success() {
            let err_text = response.text().await.map_err(|e| {
                log::error!(
                    "Twitch: failed to read create subscription error response: {}",
                    e
                );
                e.to_string()
            })?;
            log::error!(
                "Twitch create subscription {} error response: {}",
                body.r#type,
                err_text,
            );
            return Err(err_text);
        }

        let json: serde_json::Value = response.json().await.map_err(|e| {
            log::error!(
                "Twitch: failed to parse create subscription response: {}",
                e
            );
            e.to_string()
        })?;
        let subscription_id = json["data"][0]["id"].as_str().map(|s| s.to_string());

        Ok(subscription_id)
    }

    #[allow(dead_code)]
    async fn delete_subscription(
        &self,
        token: &String,
        subscription_id: String,
        reqwest_client: &reqwest::Client,
    ) -> Result<(), String> {
        let response = reqwest_client
            .delete(format!(
                "{}/eventsub/subscriptions",
                self.eventsub_endpoint()
            ))
            .header("Authorization", format!("Bearer {}", token))
            .header("Client-Id", self.client_id())
            .query(&[("id", subscription_id)])
            .send()
            .await
            .map_err(|e| {
                log::error!("Twitch: failed to delete subscription request: {}", e);
                e.to_string()
            })?;

        if !response.status().is_success() {
            let err_text = response.text().await.map_err(|e| {
                log::error!(
                    "Twitch: failed to read delete subscription error response: {}",
                    e
                );
                e.to_string()
            })?;
            log::error!("Twitch delete subscription error response: {}", err_text);
            return Err(err_text);
        }

        Ok(())
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

    async fn send_chat_message(
        &self,
        reqwest_client: &reqwest::Client,
        access_token: String,
        message: String,
        broadcaster_id: String,
        sender_id: String,
        reply_parent_message_id: Option<String>,
        client_id: String,
    ) -> Result<(), String> {
        let response = reqwest_client
            .post(format!("{}/chat/messages", self.api_endpoint()))
            .bearer_auth(access_token)
            .header("Client-Id", client_id)
            .header("Content-Type", "application/json")
            .json(&SendChatMessageBody {
                message,
                broadcaster_id,
                sender_id,
                reply_parent_message_id,
                for_source_only: None,
                pin: None,
            })
            .send()
            .await
            .map_err(|e| {
                log::error!("Failed to send chat message: {}", e);
                e.to_string()
            })?;

        if !response.status().is_success() {
            let err_text = response.text().await.map_err(|e| {
                log::error!("Twitch: failed to read send chat error response: {}", e);
                e.to_string()
            })?;
            log::error!("Send chat message error response: {}", err_text);
            return Err(err_text);
        }

        Ok(())
    }

    async fn sign_out(&self, app: &AppHandle, service_type: ServiceType) -> Result<(), String> {
        let database_service = app.state::<DatabaseService>();
        self.set_authorized(&database_service, None, false, true, service_type)
            .await
    }
}
