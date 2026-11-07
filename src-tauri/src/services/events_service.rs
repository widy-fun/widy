use crate::{
    services::{
        CommandAuctionAction, ExchangeRatesService, WebSocketBroadcaster, media::MediaService,
        obs_service::ObsService, tts::TtsService,
    },
    utils::{
        check_donation_exist, check_if_user_anonymous, get_alert_by_amount, get_audio,
        get_message_text, remove_black_listed_words, remove_links, replace_variables,
    },
};
use chrono::Utc;
use database::{
    AssistantActionsRepository, CommandsActionsRepository, DatabaseService, DonationsRepository,
    FollowsRepository, GoalsRepository, RaidsRepository, RedemptionsRepository, SettingsRepository,
    SubscriptionsRepository, VariablesRepository,
};
use entity::{
    alerts::Alert,
    assistant_actions::AssistantAction,
    commands_actions::CommandAction,
    donations::Donation,
    followers::Follow,
    goals::GoalType,
    messages::{ClientMessage, MessageType},
    obs::{ObsAction, ObsActionType},
    raids::Raid,
    redemptions::Redemption,
    rewards::RewardType,
    services::ServiceType,
    settings::Currency,
    subscriptions::Subscription,
    tts::{Tts, TtsSettings},
    variables::Variable,
};
use model::error::{AppError, log_and_wrap_error};
use model::events::{
    AppEvent, EventMessage, UnifiedBannedUser, UnifiedChatMessage, UnifiedChatMessageDelete,
};
use tauri::{AppHandle, Manager};
use uuid::Uuid;

pub struct EventsService;

impl EventsService {
    pub async fn goal(
        database_service: &DatabaseService,
        websocket_broadcaster: &WebSocketBroadcaster,
        amount: f64,
        r#type: GoalType,
    ) -> Result<(), AppError> {
        database_service
            .update_goal_amount(amount, r#type.clone())
            .await?;
        match database_service.get_not_ended_goal(r#type).await {
            Ok(goal) => {
                let event_message = EventMessage {
                    event: AppEvent::Goal,
                    data: goal,
                };
                websocket_broadcaster.broadcast_event_message(&event_message);
            }
            Err(e) => return Err(e),
        }
        Ok(())
    }

    pub async fn donation(
        service_id: String,
        service: ServiceType,
        name: Option<String>,
        target_currency: Currency,
        target_amount: f64,
        message: Option<String>,
        app: &AppHandle,
    ) -> Result<(), AppError> {
        let media_service = app.state::<MediaService>();
        let database_service = app.state::<DatabaseService>();
        let websocket_broadcaster = app.state::<WebSocketBroadcaster>();
        let exchange_rates_service = app.state::<ExchangeRatesService>();
        let settings = database_service
            .get_settings()
            .await?
            .ok_or(AppError::DbError("No settings found".to_string()))?;

        check_donation_exist(app, &service_id).await?;

        let user_name = check_if_user_anonymous(name);
        let id = Uuid::new_v4();
        let created_at = Utc::now().timestamp();
        let message_id = Uuid::new_v4();

        let exchanged_amount = exchange_rates_service
            .calculate_amount_by_currency(
                settings.currency.clone(),
                target_currency.clone(),
                target_amount,
            )
            .await;
        let media = media_service
            .get_media(&message, &exchanged_amount, app, MessageType::Donation)
            .await;

        let text = get_message_text(message, &settings.black_list, settings.remove_links);

        let mut alert = get_alert_by_amount(app, exchanged_amount, MessageType::Donation)
            .await?
            .ok_or(AppError::Custom("Alert not found".to_string()))?;

        let audio = get_audio(text.clone(), app, &id, &alert).await;

        let variables = database_service.get_variables().await?;
        let variables = [
            vec![
                Variable {
                    name: "currency".to_string(),
                    value: target_currency.as_str().to_string(),
                    ..Default::default()
                },
                Variable {
                    name: "user_name".to_string(),
                    value: user_name.clone(),
                    ..Default::default()
                },
                Variable {
                    name: "amount".to_string(),
                    value: target_amount.to_string(),
                    ..Default::default()
                },
            ],
            variables,
        ]
        .concat();
        alert.title_template = replace_variables(&alert.title_template, variables);

        let client_message = ClientMessage {
            id: message_id,
            r#type: MessageType::Donation,
            created_at: created_at.clone(),
            follow: None,
            subscription: None,
            raid: None,
            redemption: None,
            command_action: None,
            assistant_action: None,
            donation: Some(Donation {
                id,
                user_name,
                message_id: message_id,
                amount: target_amount.clone(),
                text,
                audio,
                currency: target_currency.clone(),
                service,
                service_id,
                played: false,
                exchanged_amount: Some(exchanged_amount.clone()),
                exchanged_currency: Some(settings.currency.clone()),
                created_at,
                media: media.clone(),
                alert: Some(alert),
            }),
        };

        let _ = Self::goal(
            &database_service,
            &websocket_broadcaster,
            exchanged_amount,
            entity::goals::GoalType::Donation,
        )
        .await
        .map_err(|e| log_and_wrap_error("Update goal", e));

        let _ = database_service
            .save_donation_message(client_message.clone())
            .await
            .map_err(|e| log_and_wrap_error("Save donation message", e));

        let event_message = EventMessage {
            event: AppEvent::Message,
            data: client_message.clone(),
        };

        websocket_broadcaster.broadcast_event_message(&event_message);

        let event_message = EventMessage {
            event: AppEvent::Donation,
            data: client_message.clone(),
        };

        websocket_broadcaster.broadcast_event_message(&event_message);

        let event_message = EventMessage {
            event: AppEvent::Alert,
            data: client_message.clone(),
        };

        websocket_broadcaster.broadcast_event_message(&event_message);

        if !media.is_none() {
            let event_message = EventMessage {
                event: AppEvent::Media,
                data: client_message,
            };

            websocket_broadcaster.broadcast_event_message(&event_message);
        }
        Ok(())
    }

    pub async fn subscription(
        subscription: Subscription,
        goal_type: GoalType,
        app: &AppHandle,
    ) -> Result<(), AppError> {
        let websocket_broadcaster = app.state::<WebSocketBroadcaster>();
        let database_service = app.state::<DatabaseService>();
        let variables = database_service.get_variables().await?;
        let variables = [
            vec![
                Variable {
                    name: "user_name".to_string(),
                    value: subscription.user_name.clone(),
                    ..Default::default()
                },
                Variable {
                    name: "total".to_string(),
                    value: subscription.total.to_string(),
                    ..Default::default()
                },
            ],
            variables,
        ]
        .concat();
        let alert = match subscription.alert {
            Some(alert) => Some(Alert {
                title_template: replace_variables(&alert.title_template, variables),
                ..alert
            }),
            None => None,
        };

        let message_type = if subscription.is_gift {
            MessageType::GiftSubscription
        } else {
            MessageType::Subscription
        };

        let client_message = ClientMessage {
            id: subscription.message_id.clone(),
            r#type: message_type,
            created_at: subscription.subscribed_at.clone(),
            donation: None,
            follow: None,
            raid: None,
            redemption: None,
            command_action: None,
            assistant_action: None,
            subscription: Some(Subscription {
                alert,
                ..subscription
            }),
        };
        let event_message = EventMessage {
            event: AppEvent::Message,
            data: client_message.clone(),
        };
        websocket_broadcaster.broadcast_event_message(&event_message);
        let event_message = EventMessage {
            event: AppEvent::Alert,
            data: client_message.clone(),
        };
        websocket_broadcaster.broadcast_event_message(&event_message);
        let event_message = EventMessage {
            event: AppEvent::ChannelSubscription,
            data: client_message.clone(),
        };
        websocket_broadcaster.broadcast_event_message(&event_message);
        let _ = database_service
            .save_subscribe_message(client_message)
            .await
            .map_err(|e| log_and_wrap_error("Save subscribe message", e));
        let _ = Self::goal(
            &database_service,
            &websocket_broadcaster,
            subscription.total as f64,
            goal_type,
        )
        .await
        .map_err(|e| log_and_wrap_error("Update goal", e));

        Ok(())
    }

    pub async fn redemption(
        redemption: Redemption,
        reward_type: RewardType,
        tts_settings: TtsSettings,
        obs_action: Option<ObsAction>,
        app: &AppHandle,
    ) -> Result<(), AppError> {
        let tts_service = app.state::<TtsService>();
        let database_service = app.state::<DatabaseService>();

        if reward_type == RewardType::OBS
            && let Some(obs_action) = obs_action
        {
            let obs_service = app.state::<ObsService>();
            match obs_action.r#type {
                ObsActionType::Filter if let Some(filter) = &obs_action.filter => {
                    obs_service.set_filter(filter).await?;
                }
                _ => {}
            }
        }

        let media = match reward_type {
            RewardType::Media => {
                let media_service = app.state::<MediaService>();
                media_service
                    .get_media(&redemption.user_input, &0.0, &app, MessageType::Redemption)
                    .await
            }
            _ => None,
        };
        let tts = match reward_type {
            RewardType::TTS => match &redemption.user_input {
                Some(text) => {
                    let settings = database_service
                        .get_settings()
                        .await?
                        .ok_or(AppError::DbError("No settings found".to_string()))?;

                    let text = remove_black_listed_words(text, &settings.black_list);
                    let text = if settings.remove_links {
                        remove_links(&text)
                    } else {
                        text
                    };

                    let audio = tts_service
                        .make_audio(
                            &text,
                            &redemption.id.to_string(),
                            &app,
                            tts_settings.clone(),
                        )
                        .await?;

                    Some(Tts {
                        r#type: tts_settings.r#type,
                        volume: tts_settings.volume,
                        audio,
                    })
                }
                None => None,
            },
            _ => None,
        };

        let websocket_broadcaster = app.state::<WebSocketBroadcaster>();

        let created_at = Utc::now().timestamp();
        let client_message = ClientMessage {
            id: redemption.message_id,
            r#type: MessageType::Redemption,
            created_at,
            donation: None,
            follow: None,
            subscription: None,
            command_action: None,
            assistant_action: None,
            redemption: Some(Redemption {
                media,
                tts,
                ..redemption
            }),
            raid: None,
        };
        let _ = database_service
            .save_redemption_message(client_message.clone())
            .await
            .map_err(|e| log_and_wrap_error("Save redemption goal", e));
        let event_message = EventMessage {
            event: AppEvent::Message,
            data: client_message.clone(),
        };
        websocket_broadcaster.broadcast_event_message(&event_message);
        let event_message = EventMessage {
            event: AppEvent::Redemption,
            data: client_message.clone(),
        };
        websocket_broadcaster.broadcast_event_message(&event_message);

        Ok(())
    }

    pub async fn command_action(
        command_action: CommandAction,
        app: &AppHandle,
    ) -> Result<(), AppError> {
        let websocket_broadcaster = app.state::<WebSocketBroadcaster>();
        let database_service = app.state::<DatabaseService>();
        let created_at = Utc::now().timestamp();
        let client_message = ClientMessage {
            id: command_action.message_id,
            r#type: MessageType::CommandAction,
            created_at,
            donation: None,
            follow: None,
            subscription: None,
            redemption: None,
            raid: None,
            assistant_action: None,
            command_action: Some(command_action),
        };
        let _ = database_service
            .save_command_action_message(client_message.clone())
            .await
            .map_err(|e| log_and_wrap_error("Save command action message", e));
        let event_message = EventMessage {
            event: AppEvent::Message,
            data: client_message.clone(),
        };
        websocket_broadcaster.broadcast_event_message(&event_message);
        let event_message = EventMessage {
            event: AppEvent::CommandAction,
            data: client_message.clone(),
        };
        websocket_broadcaster.broadcast_event_message(&event_message);

        Ok(())
    }

    pub async fn assistant_action(
        assistant_action: AssistantAction,
        app: &AppHandle,
    ) -> Result<(), AppError> {
        let websocket_broadcaster = app.state::<WebSocketBroadcaster>();
        let database_service = app.state::<DatabaseService>();
        let created_at = Utc::now().timestamp();
        let client_message = ClientMessage {
            id: assistant_action.message_id,
            r#type: MessageType::AssistantAction,
            created_at,
            donation: None,
            follow: None,
            subscription: None,
            redemption: None,
            raid: None,
            command_action: None,
            assistant_action: Some(assistant_action),
        };

        let _ = database_service
            .save_assistant_action_message(client_message.clone())
            .await
            .map_err(|e| log_and_wrap_error("Save assistant action message", e));

        let event_message = EventMessage {
            event: AppEvent::Message,
            data: client_message.clone(),
        };
        websocket_broadcaster.broadcast_event_message(&event_message);
        let event_message = EventMessage {
            event: AppEvent::AssistantAction,
            data: client_message.clone(),
        };
        websocket_broadcaster.broadcast_event_message(&event_message);

        Ok(())
    }

    pub async fn command_tts_action(
        text: &str,
        tts_settings: TtsSettings,
        app: &AppHandle,
        command_action: CommandAction,
    ) -> Result<(), AppError> {
        let websocket_broadcaster = app.state::<WebSocketBroadcaster>();
        let database_service = app.state::<DatabaseService>();
        let tts_service = app.state::<TtsService>();
        let settings = database_service
            .get_settings()
            .await?
            .ok_or(AppError::DbError("No settings found".to_string()))?;
        let text = {
            let text_without_black_listed_words =
                remove_black_listed_words(text, &settings.black_list);

            if settings.remove_links {
                remove_links(&text_without_black_listed_words)
            } else {
                text_without_black_listed_words
            }
        };
        let created_at = Utc::now().timestamp();
        let audio = tts_service
            .make_audio(
                &remove_links(&text),
                &command_action.id.to_string(),
                &app,
                tts_settings.clone(),
            )
            .await?;

        let command_action = CommandAction {
            tts: Some(Tts {
                r#type: tts_settings.r#type,
                volume: tts_settings.volume,
                audio,
            }),
            ..command_action
        };
        let client_message = ClientMessage {
            id: command_action.message_id,
            r#type: MessageType::CommandAction,
            created_at,
            donation: None,
            follow: None,
            subscription: None,
            redemption: None,
            raid: None,
            assistant_action: None,
            command_action: Some(command_action),
        };

        let _ = database_service
            .save_command_action_message(client_message.clone())
            .await
            .map_err(|e| log_and_wrap_error("Save command action message", e));
        let event_message = EventMessage {
            event: AppEvent::Message,
            data: client_message.clone(),
        };
        websocket_broadcaster.broadcast_event_message(&event_message);
        let event_message = EventMessage {
            event: AppEvent::CommandAction,
            data: client_message.clone(),
        };
        websocket_broadcaster.broadcast_event_message(&event_message);
        Ok(())
    }

    pub async fn follow(
        follow: Follow,
        goal_type: GoalType,
        app: &AppHandle,
    ) -> Result<(), AppError> {
        let websocket_broadcaster = app.state::<WebSocketBroadcaster>();
        let database_service = app.state::<DatabaseService>();
        let old_follow = database_service
            .get_follow(follow.user_id.clone(), follow.service.clone())
            .await?;
        if old_follow.is_some() {
            return Err(AppError::Custom("Follow exist".to_string()));
        }
        let variables = database_service.get_variables().await?;
        let variables = [
            vec![Variable {
                name: "user_name".to_string(),
                value: follow.user_name.clone(),
                ..Default::default()
            }],
            variables,
        ]
        .concat();
        let alert = match follow.alert {
            Some(alert) => Some(Alert {
                title_template: replace_variables(&alert.title_template, variables),
                ..alert
            }),
            None => None,
        };
        let client_message = ClientMessage {
            id: follow.message_id.clone(),
            r#type: MessageType::Follow,
            created_at: follow.followed_at.clone(),
            donation: None,
            subscription: None,
            raid: None,
            redemption: None,
            command_action: None,
            assistant_action: None,
            follow: Some(Follow { alert, ..follow }),
        };
        let event_message = EventMessage {
            event: AppEvent::Message,
            data: client_message.clone(),
        };
        websocket_broadcaster.broadcast_event_message(&event_message);
        let event_message = EventMessage {
            event: AppEvent::Alert,
            data: client_message.clone(),
        };
        websocket_broadcaster.broadcast_event_message(&event_message);
        let _ = database_service
            .save_follow_message(client_message)
            .await
            .map_err(|e| log_and_wrap_error("Save follow message", e));
        let _ = Self::goal(&database_service, &websocket_broadcaster, 1.0, goal_type)
            .await
            .map_err(|e| log_and_wrap_error("Update goal", e));
        Ok(())
    }

    pub async fn raid(raid: Raid, app: &AppHandle) -> Result<(), AppError> {
        let websocket_broadcaster = app.state::<WebSocketBroadcaster>();
        let database_service = app.state::<DatabaseService>();
        let variables = database_service.get_variables().await?;
        let variables = [
            vec![Variable {
                name: "user_name".to_string(),
                value: raid.from_broadcaster_user_name.clone(),
                ..Default::default()
            }],
            variables,
        ]
        .concat();
        let alert = match raid.alert {
            Some(alert) => Some(Alert {
                title_template: replace_variables(&alert.title_template, variables),
                ..alert
            }),
            None => None,
        };
        let client_message = ClientMessage {
            id: raid.message_id.clone(),
            r#type: MessageType::Raid,
            created_at: raid.created_at,
            donation: None,
            follow: None,
            subscription: None,
            redemption: None,
            command_action: None,
            assistant_action: None,
            raid: Some(Raid { alert, ..raid }),
        };
        let event_message = EventMessage {
            event: AppEvent::Message,
            data: client_message.clone(),
        };
        websocket_broadcaster.broadcast_event_message(&event_message);

        let event_message = EventMessage {
            event: AppEvent::Alert,
            data: client_message.clone(),
        };
        websocket_broadcaster.broadcast_event_message(&event_message);
        let _ = database_service
            .save_raid_message(client_message)
            .await
            .map_err(|e| log_and_wrap_error("Save raid message", e));

        Ok(())
    }

    pub async fn chat_message(
        chat_message: UnifiedChatMessage,
        app: &AppHandle,
    ) -> Result<(), AppError> {
        let websocket_broadcaster = app.state::<WebSocketBroadcaster>();
        let event_message = EventMessage {
            event: AppEvent::ChatMessage,
            data: chat_message,
        };
        websocket_broadcaster.broadcast_event_message(&event_message);

        Ok(())
    }

    pub async fn command_auction_action(
        command_auction_action: CommandAuctionAction,
        app: &AppHandle,
    ) -> Result<(), AppError> {
        let websocket_broadcaster = app.state::<WebSocketBroadcaster>();
        let event_message = EventMessage {
            event: AppEvent::CommandAuctionAction,
            data: command_auction_action,
        };
        websocket_broadcaster.broadcast_event_message(&event_message);

        Ok(())
    }

    pub async fn chat_message_delete(
        event: UnifiedChatMessageDelete,
        app: &AppHandle,
    ) -> Result<(), AppError> {
        let websocket_broadcaster = app.state::<WebSocketBroadcaster>();
        let event_message = EventMessage {
            event: AppEvent::ChatMessageDelete,
            data: event,
        };
        websocket_broadcaster.broadcast_event_message(&event_message);

        Ok(())
    }

    pub async fn user_banned_in_chat(
        data: UnifiedBannedUser,
        app: &AppHandle,
    ) -> Result<(), AppError> {
        let websocket_broadcaster = app.state::<WebSocketBroadcaster>();
        let event_message = EventMessage {
            event: AppEvent::ChannelUserBanned,
            data,
        };
        websocket_broadcaster.broadcast_event_message(&event_message);
        Ok(())
    }
}
