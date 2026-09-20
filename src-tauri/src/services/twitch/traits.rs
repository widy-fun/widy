use std::{
    sync::{
        Arc,
        atomic::{AtomicU64, Ordering},
    },
    time::{SystemTime, UNIX_EPOCH},
};

use async_trait::async_trait;
use entity::services::{ServiceAuth, ServiceType, TwitchAuth};
use serde::de::DeserializeOwned;
use tauri::{AppHandle, Manager};
use tokio_util::sync::CancellationToken;
use uuid::Uuid;

use crate::{
    error::AppError,
    load_env,
    repositories::{RewardsRepository, ServicesRepository},
    services::{
        DatabaseService,
        twitch::models::{
            AddTwitchRewardBody, BadgeInfoResponse, BanUserBody, BanUserData, BannedUser,
            BannedUsersResponse, ChatMessageCondition, ChattersResponse, CheerCondition, Condition,
            CreatePollBody, CreatePollResponse, CreatePredictionBody, CreatePredictionResponse,
            EndPollBody, EndPredictionBody, FollowCondition, GetTopGamesResponse,
            ModifyChannelInformationBody, RaidCondition, RedemptionCondition,
            SearchCategoriesResponse, SendChatAnnouncementBody, SendChatMessageBody,
            SubscriptionCondition, SubscriptionRequestBody, SubscriptionType, Transport,
            TwitchDeviceCodeResponse, TwitchRefreshTokenResponse, TwitchTokenInfo,
            TwitchTokenResponse, UpdateChatSettingsBody,
        },
    },
    utils::send_request,
};

#[async_trait]
pub trait TwitchApi: Send + Sync {
    fn client_id(&self) -> String;

    fn eventsub_endpoint(&self) -> String;

    fn session_id(&self) -> Option<String>;

    fn cancellation_token(&self) -> CancellationToken;

    fn auth_endpoint(&self) -> String;

    fn scopes(&self) -> String;

    fn api_endpoint(&self) -> String;

    fn expire_at(&self) -> Arc<AtomicU64>;

    fn reqwest_client(&self) -> &reqwest::Client;

    fn service_type(&self) -> ServiceType;

    async fn send_twitch_request<T: DeserializeOwned>(
        &self,
        request: reqwest::RequestBuilder,
        context: &str,
    ) -> Result<Option<T>, AppError> {
        send_request(request, context, "Twitch").await
    }

    async fn get_database_auth(
        &self,
        app: &AppHandle,
        service_type: ServiceType,
    ) -> Result<TwitchAuth, AppError> {
        let database_service = app.state::<DatabaseService>();

        let service = database_service
            .get_service_with_auth_by_id(service_type.clone())
            .await?;

        let service = service.ok_or(AppError::DbError("Service not found".to_string()))?;

        let auth = match service.auth {
            Some(ServiceAuth::Twitch(auth)) => auth,
            _ => {
                return Err(AppError::DbError(
                    "No Twitch authentication found".to_string(),
                ));
            }
        };
        Ok(auth)
    }

    async fn get_auth(&self, app: &AppHandle) -> Result<TwitchAuth, AppError> {
        let auth = self.get_database_auth(app, self.service_type()).await?;
        let expire_at = self.expire_at().load(Ordering::Relaxed);
        let now = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .map_err(|e| AppError::Custom(e.to_string()))?;

        if expire_at > now.as_secs() {
            return Ok(auth);
        }

        if cfg!(feature = "mock-twitch") {
            return self.get_token_mock().await;
        }

        self.refresh_and_update_auth(app, &auth).await
    }

    async fn refresh_and_update_auth(
        &self,
        app: &AppHandle,
        old_auth: &TwitchAuth,
    ) -> Result<TwitchAuth, AppError> {
        if cfg!(feature = "mock-twitch") {
            return Ok(old_auth.clone());
        }
        let database_service = app.state::<DatabaseService>();
        match self.refresh_token(&old_auth.refresh_token).await {
            Ok(response) => {
                let new_auth = TwitchAuth {
                    access_token: response.access_token,
                    refresh_token: response.refresh_token,
                    token_type: response.token_type,
                    expires_in: old_auth.expires_in,
                    user_id: old_auth.user_id.clone(),
                };
                let now = SystemTime::now()
                    .duration_since(UNIX_EPOCH)
                    .map_err(|e| AppError::Custom(e.to_string()))?;
                self.expire_at()
                    .store(now.as_secs() + (new_auth.expires_in / 2), Ordering::Relaxed);
                self.set_authorized(
                    &database_service,
                    Some(ServiceAuth::Twitch(new_auth.clone())),
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
                Err(e)
            }
        }
    }

    async fn get_device_code(&self) -> Result<TwitchDeviceCodeResponse, AppError> {
        let request = self
            .reqwest_client()
            .post("https://id.twitch.tv/oauth2/device")
            .form(&[("client_id", self.client_id()), ("scopes", self.scopes())]);

        let device_code_response = self
            .send_twitch_request::<TwitchDeviceCodeResponse>(request, "device code")
            .await?
            .ok_or(AppError::HttpRequest("Get device code error".to_string()))?;

        Ok(device_code_response)
    }

    async fn get_chanel_badges(
        &self,
        broadcaster_id: &String,
        app: &AppHandle,
    ) -> Result<BadgeInfoResponse, AppError> {
        let auth = self.get_auth(app).await?;
        #[cfg(feature = "mock-twitch")]
        let client_id = std::env::var("TWITCH_CLIENT_ID_MOCK").unwrap();
        #[cfg(not(feature = "mock-twitch"))]
        let client_id = self.client_id();
        let request = self
            .reqwest_client()
            .get(format!("{}/chat/badges", self.api_endpoint()))
            .bearer_auth(auth.access_token)
            .header("Client-Id", client_id)
            .query(&[("broadcaster_id", broadcaster_id)]);

        let chanel_badges = self
            .send_twitch_request::<BadgeInfoResponse>(request, "channel badges")
            .await?
            .ok_or(AppError::HttpRequest("Get chanel badges error".to_string()))?;

        Ok(chanel_badges)
    }

    async fn get_global_badges(&self, app: &AppHandle) -> Result<BadgeInfoResponse, AppError> {
        let auth = self.get_auth(app).await?;
        #[cfg(feature = "mock-twitch")]
        let client_id = std::env::var("TWITCH_CLIENT_ID_MOCK").unwrap();
        #[cfg(not(feature = "mock-twitch"))]
        let client_id = self.client_id();
        let request = self
            .reqwest_client()
            .get(format!("{}/chat/badges/global", self.api_endpoint()))
            .bearer_auth(auth.access_token)
            .header("Client-Id", client_id);

        let global_badges: BadgeInfoResponse = self
            .send_twitch_request(request, "global badges")
            .await?
            .ok_or(AppError::HttpRequest("Get global badges error".to_string()))?;

        Ok(global_badges)
    }

    async fn get_token(&self, device_code: String) -> Result<TwitchAuth, AppError> {
        if cfg!(feature = "mock-twitch") {
            return self.get_token_mock().await;
        }

        let request = self
            .reqwest_client()
            .post("https://id.twitch.tv/oauth2/token")
            .form(&[
                ("client_id", self.client_id()),
                ("scopes", self.scopes()),
                ("device_code", device_code),
                (
                    "grant_type",
                    "urn:ietf:params:oauth:grant-type:device_code".to_string(),
                ),
            ]);

        let token_response: TwitchTokenResponse = self
            .send_twitch_request(request, "token")
            .await?
            .ok_or(AppError::HttpRequest("Get token error".to_string()))?;

        let token_info: TwitchTokenInfo = self
            .validate_token(
                &token_response.access_token,
                &"https://id.twitch.tv/oauth2".to_string(),
            )
            .await?;

        let auth = TwitchAuth {
            access_token: token_response.access_token,
            refresh_token: token_response.refresh_token,
            token_type: token_response.token_type,
            expires_in: token_response.expires_in,
            user_id: token_info.user_id,
        };

        Ok(auth)
    }

    async fn get_token_mock(&self) -> Result<TwitchAuth, AppError> {
        let user_id = load_env!("TWITCH_USER_ID_MOCK");
        let client_id = load_env!("TWITCH_CLIENT_ID_MOCK");
        let client_secret = load_env!("TWITCH_CLIENT_SECRET_MOCK");
        let request = self
            .reqwest_client()
            .post(format!("{}/authorize", self.auth_endpoint()))
            .query(&[
                ("client_id", client_id),
                ("client_secret", client_secret),
                ("grant_type", "user_token".to_string()),
                ("user_id", user_id.clone()),
                ("scope", self.scopes()),
            ]);

        let token_response: TwitchTokenResponse = self
            .send_twitch_request(request, "token mock")
            .await?
            .ok_or(AppError::HttpRequest("Get token error".to_string()))?;

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
        refresh_token: &String,
    ) -> Result<TwitchRefreshTokenResponse, AppError> {
        let request = self
            .reqwest_client()
            .post(format!("{}/token", self.auth_endpoint()))
            .form(&[
                ("grant_type", "refresh_token".to_string()),
                (
                    "refresh_token",
                    urlencoding::encode(&refresh_token).to_string(),
                ),
                ("client_id", self.client_id().to_owned()),
            ]);

        let refresh_token_response: TwitchRefreshTokenResponse = self
            .send_twitch_request(request, "refresh token")
            .await?
            .ok_or(AppError::HttpRequest("Get refresh token error".to_string()))?;

        Ok(refresh_token_response)
    }

    async fn validate_token(
        &self,
        token: &String,
        auth_endpoint: &String,
    ) -> Result<TwitchTokenInfo, AppError> {
        let request = self
            .reqwest_client()
            .get(format!("{}/validate", auth_endpoint))
            .header("Authorization", format!("OAuth {}", token));

        let token_info: TwitchTokenInfo = self
            .send_twitch_request(request, "token validate")
            .await?
            .ok_or(AppError::HttpRequest("Validate token error".to_string()))?;

        Ok(token_info.clone())
    }

    async fn add_custom_reward(
        &self,
        app: &AppHandle,
        reward: &entity::rewards::Reward,
    ) -> Result<(), AppError> {
        let auth = self.get_auth(app).await?;
        let database_service = app.state::<DatabaseService>();
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

        #[cfg(feature = "mock-twitch")]
        let client_id = std::env::var("TWITCH_CLIENT_ID_MOCK").unwrap();
        #[cfg(not(feature = "mock-twitch"))]
        let client_id = self.client_id();

        let request = self
            .reqwest_client()
            .post(format!(
                "{}/channel_points/custom_rewards",
                self.api_endpoint()
            ))
            .header("Authorization", format!("Bearer {}", auth.access_token))
            .header("Client-Id", client_id)
            .query(&[("broadcaster_id", &auth.user_id)])
            .json(&twitch_reward_body);

        let json = self
            .send_twitch_request::<serde_json::Value>(request, "add custom reward")
            .await?
            .ok_or(AppError::HttpRequest("Add custom reward error".to_string()))?;

        let reward_id = json["data"][0]["id"]
            .as_str()
            .map(|s| s.to_string())
            .ok_or(AppError::HttpRequest(
                "Twitch reward create error".to_string(),
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
            .ok_or(AppError::DbError("Reward not found".to_string()))?;
        #[cfg(feature = "mock-twitch")]
        let client_id = std::env::var("TWITCH_CLIENT_ID_MOCK").unwrap();
        #[cfg(not(feature = "mock-twitch"))]
        let client_id = self.client_id();

        let request = self
            .reqwest_client()
            .delete(format!(
                "{}/channel_points/custom_rewards",
                self.api_endpoint()
            ))
            .header("Authorization", format!("Bearer {}", auth.access_token))
            .header("Client-Id", client_id)
            .query(&[
                ("broadcaster_id", auth.user_id.clone()),
                (
                    "id",
                    reward.external_id.ok_or(AppError::DbError(
                        "Reward external_id not exist".to_string(),
                    ))?,
                ),
            ]);

        let _ = self
            .send_twitch_request::<serde_json::Value>(request, "remove custom reward")
            .await?;

        database_service.delete_reward_by_id(id).await?;

        Ok(())
    }

    async fn create_subscriptions(&self, session_id: &String, user_id: &String, app: &AppHandle) {
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
                    app,
                )
                .await;
        }
        let _ = self
            .create_subscription(
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
                app,
            )
            .await;
        let _ = self
            .create_subscription(
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
                app,
            )
            .await;
        let _ = self
            .create_subscription(
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
                app,
            )
            .await;
        let _ = self
            .create_subscription(
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
                app,
            )
            .await;
        let _ = self
            .create_subscription(
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
                app,
            )
            .await;
        let _ = self
            .create_subscription(
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
                app,
            )
            .await;
        let _ = self
            .create_subscription(
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
                app,
            )
            .await;
    }

    async fn create_subscription(
        &self,
        body: SubscriptionRequestBody,
        app: &AppHandle,
    ) -> Result<Option<String>, AppError> {
        let auth = self.get_auth(app).await?;
        let request = self
            .reqwest_client()
            .post(format!(
                "{}/eventsub/subscriptions",
                self.eventsub_endpoint()
            ))
            .bearer_auth(auth.access_token)
            .header("Client-Id", self.client_id())
            .json(&body);

        let json = self
            .send_twitch_request::<serde_json::Value>(request, "create subscription")
            .await?
            .ok_or(AppError::HttpRequest(
                "Create subscription error".to_string(),
            ))?;

        let subscription_id = json["data"][0]["id"].as_str().map(|s| s.to_string());

        Ok(subscription_id)
    }

    #[allow(dead_code)]
    async fn delete_subscription(
        &self,
        subscription_id: String,
        app: &AppHandle,
    ) -> Result<(), AppError> {
        let auth = self.get_auth(app).await?;
        let request = self
            .reqwest_client()
            .delete(format!(
                "{}/eventsub/subscriptions",
                self.eventsub_endpoint()
            ))
            .header("Authorization", format!("Bearer {}", auth.access_token))
            .header("Client-Id", self.client_id())
            .query(&[("id", subscription_id)]);

        let _ = self
            .send_twitch_request::<serde_json::Value>(request, "delete subscription")
            .await?;

        Ok(())
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

    async fn send_chat_message(
        &self,
        message: String,
        broadcaster_id: String,
        sender_id: String,
        reply_parent_message_id: Option<String>,
        app: &AppHandle,
        pin: Option<bool>,
    ) -> Result<(), AppError> {
        let auth: TwitchAuth = self.get_auth(app).await?;
        let request = self
            .reqwest_client()
            .post(format!("{}/chat/messages", self.api_endpoint()))
            .bearer_auth(auth.access_token)
            .header("Client-Id", self.client_id())
            .json(&SendChatMessageBody {
                message,
                broadcaster_id,
                sender_id,
                reply_parent_message_id,
                for_source_only: None,
                pin,
            });

        let _ = self
            .send_twitch_request::<serde_json::Value>(request, "chat message")
            .await?;

        Ok(())
    }

    async fn send_chat_announcement(
        &self,
        message: String,
        broadcaster_id: String,
        moderator_id: String,
        app: &AppHandle,
    ) -> Result<(), AppError> {
        let auth: TwitchAuth = self.get_auth(app).await?;
        let request = self
            .reqwest_client()
            .post(format!("{}/chat/announcements", self.api_endpoint()))
            .bearer_auth(auth.access_token)
            .query(&[
                ("broadcaster_id", broadcaster_id),
                ("moderator_id", moderator_id),
            ])
            .header("Client-Id", self.client_id())
            .json(&SendChatAnnouncementBody {
                message,
                color: None,
                for_source_only: None,
            });

        let _ = self
            .send_twitch_request::<serde_json::Value>(request, "chat announcement")
            .await?;

        Ok(())
    }

    async fn ban_user(
        &self,
        broadcaster_id: String,
        moderator_id: String,
        user_id: String,
        app: &AppHandle,
        duration: Option<u64>,
    ) -> Result<(), AppError> {
        let auth: TwitchAuth = self.get_auth(app).await?;
        let request = self
            .reqwest_client()
            .post(format!("{}/moderation/bans", self.api_endpoint()))
            .bearer_auth(auth.access_token)
            .header("Client-Id", self.client_id())
            .query(&[
                ("broadcaster_id", broadcaster_id),
                ("moderator_id", moderator_id),
            ])
            .json(&BanUserBody {
                data: BanUserData {
                    user_id,
                    duration,
                    reason: None,
                },
            });

        let _ = self
            .send_twitch_request::<serde_json::Value>(request, "ban user")
            .await?;

        Ok(())
    }

    async fn unban_user(
        &self,
        broadcaster_id: String,
        moderator_id: String,
        user_id: String,
        app: &AppHandle,
    ) -> Result<(), AppError> {
        let auth: TwitchAuth = self.get_auth(app).await?;
        let request = self
            .reqwest_client()
            .delete(format!("{}/moderation/bans", self.api_endpoint()))
            .bearer_auth(auth.access_token)
            .header("Client-Id", self.client_id())
            .query(&[
                ("broadcaster_id", broadcaster_id),
                ("moderator_id", moderator_id),
                ("user_id", user_id),
            ]);

        let _ = self
            .send_twitch_request::<serde_json::Value>(request, "unban user")
            .await?;

        Ok(())
    }

    async fn get_banned_users(
        &self,
        broadcaster_id: String,
        app: &AppHandle,
        after: Option<String>,
        before: Option<String>,
        first: Option<u32>,
    ) -> Result<Option<BannedUsersResponse>, AppError> {
        let auth: TwitchAuth = self.get_auth(app).await?;
        let mut query: Vec<(&str, String)> = vec![
            ("broadcaster_id", broadcaster_id),
            ("first", first.unwrap_or(100).min(100).to_string()),
        ];

        if let Some(after) = after {
            query.push(("after", after));
        }
        if let Some(before) = before {
            query.push(("before", before));
        }
        let request = self
            .reqwest_client()
            .get(format!("{}/moderation/banned", self.api_endpoint()))
            .bearer_auth(auth.access_token)
            .header("Client-Id", self.client_id())
            .query(&query);

        let response = self
            .send_twitch_request::<BannedUsersResponse>(request, "get banned users")
            .await?;

        Ok(response)
    }

    async fn get_all_banned_users(
        &self,
        broadcaster_id: String,
        app: &AppHandle,
    ) -> Result<Vec<BannedUser>, AppError> {
        let mut all_users = Vec::new();
        let mut cursor: Option<String> = None;

        loop {
            let response = self
                .get_banned_users(broadcaster_id.clone(), app, cursor.clone(), None, Some(100))
                .await?;

            let Some(response) = response else {
                break;
            };

            let is_last_page = response.data.is_empty();
            all_users.extend(response.data);

            if is_last_page || response.pagination.cursor.is_none() {
                break;
            }

            cursor = response.pagination.cursor;
        }

        Ok(all_users)
    }

    async fn get_chatters(
        &self,
        broadcaster_id: String,
        moderator_id: String,
        app: &AppHandle,
        after: Option<String>,
        first: Option<u32>,
    ) -> Result<Option<ChattersResponse>, AppError> {
        let auth: TwitchAuth = self.get_auth(app).await?;
        let mut query: Vec<(&str, String)> = vec![
            ("broadcaster_id", broadcaster_id),
            ("moderator_id", moderator_id),
            ("first", first.unwrap_or(1000).to_string()),
        ];

        if let Some(after) = after {
            query.push(("after", after));
        }
        let request = self
            .reqwest_client()
            .get(format!("{}/chat/chatters", self.api_endpoint()))
            .bearer_auth(auth.access_token)
            .header("Client-Id", self.client_id())
            .query(&query);

        let response = self
            .send_twitch_request::<ChattersResponse>(request, "get chatters")
            .await?;

        Ok(response)
    }

    async fn get_top_games(
        &self,
        app: &AppHandle,
        after: Option<String>,
        before: Option<String>,
        first: Option<u32>,
    ) -> Result<Option<GetTopGamesResponse>, AppError> {
        let auth: TwitchAuth = self.get_auth(app).await?;
        let mut query: Vec<(&str, String)> =
            vec![("first", first.unwrap_or(100).min(100).to_string())];

        if let Some(after) = after {
            query.push(("after", after));
        }
        if let Some(before) = before {
            query.push(("before", before));
        }
        let request = self
            .reqwest_client()
            .get(format!("{}/games/top", self.api_endpoint()))
            .bearer_auth(auth.access_token)
            .header("Client-Id", self.client_id())
            .query(&query);

        let response = self
            .send_twitch_request::<GetTopGamesResponse>(request, "get top games")
            .await?;

        Ok(response)
    }

    async fn search_categories(
        &self,
        app: &AppHandle,
        query: String,
        after: Option<String>,
        first: Option<u32>,
    ) -> Result<Option<SearchCategoriesResponse>, AppError> {
        let auth: TwitchAuth = self.get_auth(app).await?;
        let mut params: Vec<(&str, String)> = vec![
            ("query", query),
            ("first", first.unwrap_or(100).min(100).to_string()),
        ];

        if let Some(after) = after {
            params.push(("after", after));
        }
        let request = self
            .reqwest_client()
            .get(format!("{}/search/categories", self.api_endpoint()))
            .bearer_auth(auth.access_token)
            .header("Client-Id", self.client_id())
            .query(&params);

        let response = self
            .send_twitch_request::<SearchCategoriesResponse>(request, "search categories")
            .await?;

        Ok(response)
    }

    async fn modify_channel_information(
        &self,
        broadcaster_id: String,
        app: &AppHandle,
        body: ModifyChannelInformationBody,
    ) -> Result<(), AppError> {
        let auth: TwitchAuth = self.get_auth(app).await?;
        let request = self
            .reqwest_client()
            .patch(format!("{}/channels", self.api_endpoint()))
            .bearer_auth(auth.access_token)
            .header("Client-Id", self.client_id())
            .query(&[("broadcaster_id", broadcaster_id.clone())])
            .json(&body);

        let _ = self
            .send_twitch_request::<serde_json::Value>(request, "modify channel information")
            .await?;

        Ok(())
    }

    async fn update_chat_settings(
        &self,
        broadcaster_id: String,
        moderator_id: String,
        app: &AppHandle,
        body: UpdateChatSettingsBody,
    ) -> Result<(), AppError> {
        let auth: TwitchAuth = self.get_auth(app).await?;
        let request = self
            .reqwest_client()
            .patch(format!("{}/chat/settings", self.api_endpoint()))
            .bearer_auth(auth.access_token)
            .header("Client-Id", self.client_id())
            .query(&[
                ("broadcaster_id", broadcaster_id.clone()),
                ("moderator_id", moderator_id),
            ])
            .json(&body);

        let _ = self
            .send_twitch_request::<serde_json::Value>(request, "update chat settings")
            .await?;

        Ok(())
    }

    async fn pin_chat_message(
        &self,
        broadcaster_id: String,
        moderator_id: String,
        message_id: String,
        duration_seconds: Option<u32>,
        app: &AppHandle,
    ) -> Result<(), AppError> {
        let auth: TwitchAuth = self.get_auth(app).await?;
        let mut query: Vec<(&str, String)> = vec![
            ("broadcaster_id", broadcaster_id),
            ("moderator_id", moderator_id),
            ("message_id", message_id),
        ];

        if let Some(duration) = duration_seconds {
            query.push(("duration_seconds", duration.to_string()));
        }
        let request = self
            .reqwest_client()
            .put(format!("{}/chat/pins", self.api_endpoint()))
            .bearer_auth(auth.access_token)
            .header("Client-Id", self.client_id())
            .query(&query);

        let _ = self
            .send_twitch_request::<serde_json::Value>(request, "pin chat message")
            .await?;

        Ok(())
    }

    async fn create_clip(
        &self,
        broadcaster_id: String,
        title: Option<String>,
        duration: Option<u32>,
        app: &AppHandle,
    ) -> Result<(), AppError> {
        let auth: TwitchAuth = self.get_auth(app).await?;
        let request = self
            .reqwest_client()
            .post(format!("{}/clips", self.api_endpoint()))
            .bearer_auth(auth.access_token)
            .header("Client-Id", self.client_id())
            .query(&[
                ("broadcaster_id", broadcaster_id.clone()),
                ("title", title.unwrap_or_default()),
                ("duration", duration.unwrap_or(30).to_string()),
            ]);

        let _ = self
            .send_twitch_request::<serde_json::Value>(request, "create clip")
            .await?;

        Ok(())
    }

    async fn delete_chat_messages(
        &self,
        broadcaster_id: String,
        moderator_id: String,
        message_id: Option<String>,
        app: &AppHandle,
    ) -> Result<(), AppError> {
        let auth: TwitchAuth = self.get_auth(app).await?;
        let mut query: Vec<(&str, String)> = vec![
            ("broadcaster_id", broadcaster_id),
            ("moderator_id", moderator_id),
        ];

        if let Some(message_id) = message_id {
            query.push(("message_id", message_id));
        }

        let request = self
            .reqwest_client()
            .delete(format!("{}/moderation/chat", self.api_endpoint()))
            .bearer_auth(auth.access_token)
            .header("Client-Id", self.client_id())
            .query(&query);

        let _ = self
            .send_twitch_request::<serde_json::Value>(request, "delete chat messages")
            .await?;

        Ok(())
    }

    async fn add_channel_moderator(
        &self,
        broadcaster_id: String,
        user_id: String,
        app: &AppHandle,
    ) -> Result<(), AppError> {
        let auth: TwitchAuth = self.get_auth(app).await?;
        let request = self
            .reqwest_client()
            .post(format!("{}/moderation/moderators", self.api_endpoint()))
            .bearer_auth(auth.access_token)
            .header("Client-Id", self.client_id())
            .query(&[("broadcaster_id", broadcaster_id), ("user_id", user_id)]);

        let _ = self
            .send_twitch_request::<serde_json::Value>(request, "add channel moderator")
            .await?;

        Ok(())
    }

    async fn remove_channel_moderator(
        &self,
        broadcaster_id: String,
        user_id: String,
        app: &AppHandle,
    ) -> Result<(), AppError> {
        let auth: TwitchAuth = self.get_auth(app).await?;
        let request = self
            .reqwest_client()
            .delete(format!("{}/moderation/moderators", self.api_endpoint()))
            .bearer_auth(auth.access_token)
            .header("Client-Id", self.client_id())
            .query(&[("broadcaster_id", broadcaster_id), ("user_id", user_id)]);

        let _ = self
            .send_twitch_request::<serde_json::Value>(request, "remove channel moderator")
            .await?;

        Ok(())
    }

    async fn add_channel_vip(
        &self,
        broadcaster_id: String,
        user_id: String,
        app: &AppHandle,
    ) -> Result<(), AppError> {
        let auth: TwitchAuth = self.get_auth(app).await?;
        let request = self
            .reqwest_client()
            .post(format!("{}/channels/vips", self.api_endpoint()))
            .bearer_auth(auth.access_token)
            .header("Client-Id", self.client_id())
            .query(&[("broadcaster_id", broadcaster_id), ("user_id", user_id)]);

        let _ = self
            .send_twitch_request::<serde_json::Value>(request, "add channel vip")
            .await?;

        Ok(())
    }

    async fn remove_channel_vip(
        &self,
        broadcaster_id: String,
        user_id: String,
        app: &AppHandle,
    ) -> Result<(), AppError> {
        let auth: TwitchAuth = self.get_auth(app).await?;
        let request = self
            .reqwest_client()
            .delete(format!("{}/channels/vips", self.api_endpoint()))
            .bearer_auth(auth.access_token)
            .header("Client-Id", self.client_id())
            .query(&[("broadcaster_id", broadcaster_id), ("user_id", user_id)]);

        let _ = self
            .send_twitch_request::<serde_json::Value>(request, "remove channel vip")
            .await?;

        Ok(())
    }

    async fn create_poll(
        &self,
        body: CreatePollBody,
        app: &AppHandle,
    ) -> Result<Option<CreatePollResponse>, AppError> {
        let auth: TwitchAuth = self.get_auth(app).await?;
        let request = self
            .reqwest_client()
            .post(format!("{}/polls", self.api_endpoint()))
            .bearer_auth(auth.access_token)
            .header("Client-Id", self.client_id())
            .json(&body);

        let response = self
            .send_twitch_request::<CreatePollResponse>(request, "create poll")
            .await?;

        Ok(response)
    }

    async fn end_poll(&self, body: EndPollBody, app: &AppHandle) -> Result<(), AppError> {
        let auth: TwitchAuth = self.get_auth(app).await?;
        let request = self
            .reqwest_client()
            .patch(format!("{}/polls", self.api_endpoint()))
            .bearer_auth(auth.access_token)
            .header("Client-Id", self.client_id())
            .json(&body);

        let _ = self
            .send_twitch_request::<serde_json::Value>(request, "end poll")
            .await?;

        Ok(())
    }

    async fn create_prediction(
        &self,
        body: CreatePredictionBody,
        app: &AppHandle,
    ) -> Result<Option<CreatePredictionResponse>, AppError> {
        let auth: TwitchAuth = self.get_auth(app).await?;
        let request = self
            .reqwest_client()
            .post(format!("{}/predictions", self.api_endpoint()))
            .bearer_auth(auth.access_token)
            .header("Client-Id", self.client_id())
            .json(&body);

        let response = self
            .send_twitch_request::<CreatePredictionResponse>(request, "create prediction")
            .await?;

        Ok(response)
    }

    async fn end_prediction(
        &self,
        body: EndPredictionBody,
        app: &AppHandle,
    ) -> Result<(), AppError> {
        let auth: TwitchAuth = self.get_auth(app).await?;
        let request = self
            .reqwest_client()
            .patch(format!("{}/predictions", self.api_endpoint()))
            .bearer_auth(auth.access_token)
            .header("Client-Id", self.client_id())
            .json(&body);

        let _ = self
            .send_twitch_request::<serde_json::Value>(request, "end prediction")
            .await?;

        Ok(())
    }

    async fn sign_out(&self, app: &AppHandle) -> Result<(), AppError> {
        let database_service = app.state::<DatabaseService>();
        self.set_authorized(&database_service, None, false, true)
            .await
    }
}
