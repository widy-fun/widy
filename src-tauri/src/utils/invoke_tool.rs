use entity::{
    assistant_actions::{
        AssistantAction,
        AssistantActionData::{
            BanUser, ChangeChannel, PinMessage, PlayAlert, PlayMedia, UnbanUser, UpdateChatSettings,
        },
        AssistantActionType, ChanelData, ChatSettingsData, MediaData, PinedMessageData, UserData,
    },
    donations::{Media, MediaType},
    messages::MessageType,
};
use tauri::{AppHandle, Manager};

use crate::{
    error::AppError,
    repositories::AlertsRepository,
    services::{
        AppEvent, DatabaseService, EventMessage, EventsService, MediaService, WebSocketBroadcaster,
        assistant::tool_calling_service::ToolCall,
        kick::{
            self, KickService, KickSessionService, PatchChanelBody,
            traits::{KickApi, KickSessionApi},
        },
        twitch::{self, ModifyChannelInformationBody, TwitchService, traits::TwitchApi},
    },
};

pub async fn invoke_tool(app: &AppHandle, tool_call: ToolCall) -> Result<(), AppError> {
    match tool_call.name.as_str() {
        "ban_user" => {
            let platform = tool_call
                .arguments
                .get("platform")
                .cloned()
                .unwrap_or_default();
            let username = tool_call
                .arguments
                .get("username")
                .cloned()
                .unwrap_or_default();
            let duration = tool_call
                .arguments
                .get("duration")
                .cloned()
                .unwrap_or_default()
                .parse::<u64>()
                .ok();
            let user_data = match platform.as_str().to_lowercase().as_str() {
                "twitch" => {
                    let twitch_service = app.state::<TwitchService>();
                    let auth = twitch_service.get_auth(app).await?;
                    let chat_messages_buffer =
                        twitch_service.chat_messages_buffer.lock().unwrap().clone();
                    let message = chat_messages_buffer
                        .iter()
                        .find(|m| m.sender.username == username)
                        .cloned()
                        .ok_or(AppError::Custom("User not found".to_string()))?;
                    twitch_service
                        .ban_user(
                            auth.user_id.clone(),
                            auth.user_id,
                            message.sender.id.clone(),
                            app,
                            duration.clone(),
                        )
                        .await?;
                    Some(UserData {
                        name: message.sender.username,
                        platform: entity::rewards::Platform::Twitch,
                        id: message.sender.id,
                    })
                }
                "kick" => {
                    let kick_service = app.state::<KickService>();
                    let user_info = kick_service.get_user_info(app).await?;
                    let chat_messages_buffer =
                        kick_service.chat_messages_buffer.lock().unwrap().clone();
                    let message = chat_messages_buffer
                        .iter()
                        .find(|m| m.sender.username == username)
                        .cloned()
                        .ok_or(AppError::Custom("User not found".to_string()))?;
                    kick_service
                        .ban_user(
                            message.sender.id.parse::<u64>()?,
                            user_info.user_id,
                            app,
                            duration.clone(),
                        )
                        .await?;
                    Some(UserData {
                        name: message.sender.username,
                        platform: entity::rewards::Platform::Kick,
                        id: message.sender.id,
                    })
                }
                _ => None,
            };
            if let Some(user_data) = user_data {
                let message_id = uuid::Uuid::new_v4();
                EventsService::assistant_action(
                    AssistantAction {
                        id: uuid::Uuid::new_v4(),
                        message_id,
                        r#type: AssistantActionType::BanUser,
                        data: BanUser(user_data),
                    },
                    app,
                )
                .await?;
            }
        }
        "unban_user" => {
            let platform = tool_call
                .arguments
                .get("platform")
                .cloned()
                .unwrap_or_default();
            let username = tool_call
                .arguments
                .get("username")
                .cloned()
                .unwrap_or_default();

            let user_data = match platform.as_str().to_lowercase().as_str() {
                "twitch" => {
                    let twitch_service = app.state::<TwitchService>();
                    let auth = twitch_service.get_auth(app).await?;
                    let banned_users = twitch_service
                        .get_all_banned_users(auth.user_id.clone(), app)
                        .await?;
                    let banned_user = banned_users
                        .iter()
                        .find(|b| b.user_name == username)
                        .ok_or(AppError::Custom("Not found banned user".to_string()))?;
                    twitch_service
                        .unban_user(
                            auth.user_id.clone(),
                            auth.user_id,
                            banned_user.user_id.clone(),
                            app,
                        )
                        .await?;
                    Some(UserData {
                        name: banned_user.user_name.clone(),
                        platform: entity::rewards::Platform::Twitch,
                        id: banned_user.user_id.clone(),
                    })
                }
                "kick" => {
                    let kick_service = app.state::<KickService>();
                    let kick_session_service = app.state::<KickSessionService>();
                    let bans_info = kick_session_service
                        .get_bans(app)
                        .await?
                        .ok_or(AppError::Custom("Bans info empty".to_string()))?;

                    let ban_info = bans_info
                        .iter()
                        .find(|b| b.banned_user.username == username)
                        .ok_or(AppError::Custom("Not found ban info".to_string()))?;
                    let user_info = kick_service.get_user_info(app).await?;

                    kick_service
                        .unban_user(ban_info.banned_user.id, user_info.user_id, app)
                        .await?;
                    Some(UserData {
                        name: ban_info.banned_user.username.clone(),
                        platform: entity::rewards::Platform::Kick,
                        id: ban_info.banned_user.id.to_string(),
                    })
                }
                _ => None,
            };
            if let Some(user_data) = user_data {
                let message_id = uuid::Uuid::new_v4();
                EventsService::assistant_action(
                    AssistantAction {
                        id: uuid::Uuid::new_v4(),
                        message_id,
                        r#type: AssistantActionType::UnbanUser,
                        data: UnbanUser(user_data),
                    },
                    app,
                )
                .await?;
            }
        }
        "pin_message" => {
            let platform = tool_call
                .arguments
                .get("platform")
                .cloned()
                .unwrap_or_default();
            let message = tool_call
                .arguments
                .get("message")
                .cloned()
                .unwrap_or_default();

            let pined_message = match platform.as_str().to_lowercase().as_str() {
                "twitch" => {
                    let twitch_service = app.state::<TwitchService>();
                    let auth = twitch_service.get_auth(app).await?;
                    twitch_service
                        .send_chat_message(
                            message.clone(),
                            auth.user_id.clone(),
                            auth.user_id,
                            None,
                            app,
                            Some(true),
                        )
                        .await?;
                    Some(PinedMessageData {
                        message,
                        platform: entity::rewards::Platform::Twitch,
                    })
                }
                "kick" => {
                    let kick_session_service = app.state::<KickSessionService>();
                    kick_session_service
                        .pin_message(app, message.clone())
                        .await?;
                    Some(PinedMessageData {
                        message,
                        platform: entity::rewards::Platform::Kick,
                    })
                }
                _ => None,
            };
            if let Some(pined_message) = pined_message {
                let message_id = uuid::Uuid::new_v4();
                EventsService::assistant_action(
                    AssistantAction {
                        id: uuid::Uuid::new_v4(),
                        message_id,
                        r#type: AssistantActionType::PinMessage,
                        data: PinMessage(pined_message),
                    },
                    app,
                )
                .await?;
            }
        }
        "delete_chat_messages" => {
            let platform = tool_call
                .arguments
                .get("platform")
                .cloned()
                .unwrap_or_default();

            match platform.as_str().to_lowercase().as_str() {
                "twitch" => {
                    let twitch_service = app.state::<TwitchService>();
                    let auth = twitch_service.get_auth(app).await?;
                    twitch_service
                        .delete_chat_messages(auth.user_id.clone(), auth.user_id, None, app)
                        .await?;
                }
                "kick" => {
                    let kick_session_service = app.state::<KickSessionService>();
                    kick_session_service.delete_chat_messages(app).await?;
                }
                _ => {}
            };
        }
        "change_channel_title" => {
            let platform = tool_call
                .arguments
                .get("platform")
                .cloned()
                .unwrap_or_default();
            let title = tool_call
                .arguments
                .get("title")
                .cloned()
                .unwrap_or_default();

            let chanel = match platform.as_str().to_lowercase().as_str() {
                "twitch" => {
                    let twitch_service = app.state::<TwitchService>();
                    let auth = twitch_service.get_auth(app).await?;
                    twitch_service
                        .modify_channel_information(
                            auth.user_id,
                            app,
                            ModifyChannelInformationBody {
                                title: Some(title.clone()),
                                ..Default::default()
                            },
                        )
                        .await?;
                    Some(ChanelData {
                        title: Some(title),
                        platform: entity::rewards::Platform::Twitch,
                        category: None,
                    })
                }
                "kick" => {
                    let kick_service = app.state::<KickService>();
                    kick_service
                        .patch_channel(
                            PatchChanelBody {
                                stream_title: Some(title.clone()),
                                ..Default::default()
                            },
                            app,
                        )
                        .await?;
                    Some(ChanelData {
                        title: Some(title),
                        platform: entity::rewards::Platform::Kick,
                        category: None,
                    })
                }
                _ => None,
            };
            if let Some(chanel) = chanel {
                let message_id = uuid::Uuid::new_v4();
                EventsService::assistant_action(
                    AssistantAction {
                        id: uuid::Uuid::new_v4(),
                        message_id,
                        r#type: AssistantActionType::ChangeChannelTitle,
                        data: ChangeChannel(chanel),
                    },
                    app,
                )
                .await?;
            }
        }
        "change_channel_category" => {
            let platform = tool_call
                .arguments
                .get("platform")
                .cloned()
                .unwrap_or_default();
            let category = tool_call
                .arguments
                .get("category")
                .cloned()
                .unwrap_or_default();

            let chanel = match platform.as_str().to_lowercase().as_str() {
                "twitch" => {
                    let twitch_service = app.state::<TwitchService>();
                    let auth = twitch_service.get_auth(app).await?;
                    let response = twitch_service
                        .search_categories(app, category.clone(), None, None)
                        .await?
                        .ok_or(AppError::Custom("Categories empty".to_string()))?;
                    twitch_service
                        .modify_channel_information(
                            auth.user_id,
                            app,
                            ModifyChannelInformationBody {
                                game_id: Some(
                                    response
                                        .data
                                        .first()
                                        .ok_or(AppError::Custom("Not found game".to_string()))?
                                        .id
                                        .clone(),
                                ),
                                ..Default::default()
                            },
                        )
                        .await?;
                    Some(ChanelData {
                        title: None,
                        platform: entity::rewards::Platform::Twitch,
                        category: Some(category),
                    })
                }
                "kick" => {
                    let kick_service = app.state::<KickService>();
                    let response = kick_service
                        .search_categories(category.clone(), app)
                        .await?
                        .ok_or(AppError::Custom("Categories empty".to_string()))?;
                    kick_service
                        .patch_channel(
                            PatchChanelBody {
                                category_id: Some(
                                    response
                                        .data
                                        .first()
                                        .ok_or(AppError::Custom("Not found category".to_string()))?
                                        .id,
                                ),
                                ..Default::default()
                            },
                            app,
                        )
                        .await?;
                    Some(ChanelData {
                        title: None,
                        platform: entity::rewards::Platform::Kick,
                        category: Some(category),
                    })
                }
                _ => None,
            };
            if let Some(chanel) = chanel {
                let message_id = uuid::Uuid::new_v4();
                EventsService::assistant_action(
                    AssistantAction {
                        id: uuid::Uuid::new_v4(),
                        message_id,
                        r#type: AssistantActionType::ChangeChannelCategory,
                        data: ChangeChannel(chanel),
                    },
                    app,
                )
                .await?;
            }
        }
        "on_followers_mode" => {
            let platform = tool_call
                .arguments
                .get("platform")
                .cloned()
                .unwrap_or_default();

            let chat_settings = match platform.as_str().to_lowercase().as_str() {
                "twitch" => {
                    let twitch_service = app.state::<TwitchService>();
                    let auth = twitch_service.get_auth(app).await?;
                    twitch_service
                        .update_chat_settings(
                            auth.user_id.clone(),
                            auth.user_id,
                            app,
                            twitch::UpdateChatSettingsBody {
                                follower_mode: Some(true),
                                ..Default::default()
                            },
                        )
                        .await?;

                    Some(ChatSettingsData {
                        platform: entity::rewards::Platform::Twitch,
                    })
                }
                "kick" => {
                    let kick_session_service = app.state::<KickSessionService>();
                    kick_session_service
                        .update_chat_settings(
                            kick::UpdateChatSettingsBody {
                                followers_mode: Some(true),
                                following_min_duration: Some(1),
                                ..Default::default()
                            },
                            app,
                        )
                        .await?;
                    Some(ChatSettingsData {
                        platform: entity::rewards::Platform::Kick,
                    })
                }
                _ => None,
            };
            if let Some(chat_settings) = chat_settings {
                let message_id = uuid::Uuid::new_v4();
                EventsService::assistant_action(
                    AssistantAction {
                        id: uuid::Uuid::new_v4(),
                        message_id,
                        r#type: AssistantActionType::AddFollowMode,
                        data: UpdateChatSettings(chat_settings),
                    },
                    app,
                )
                .await?;
            }
        }
        "off_followers_mode" => {
            let platform = tool_call
                .arguments
                .get("platform")
                .cloned()
                .unwrap_or_default();

            let chat_settings = match platform.as_str().to_lowercase().as_str() {
                "twitch" => {
                    let twitch_service = app.state::<TwitchService>();
                    let auth = twitch_service.get_auth(app).await?;
                    twitch_service
                        .update_chat_settings(
                            auth.user_id.clone(),
                            auth.user_id,
                            app,
                            twitch::UpdateChatSettingsBody {
                                follower_mode: Some(false),
                                ..Default::default()
                            },
                        )
                        .await?;

                    Some(ChatSettingsData {
                        platform: entity::rewards::Platform::Twitch,
                    })
                }
                "kick" => {
                    let kick_session_service = app.state::<KickSessionService>();
                    kick_session_service
                        .update_chat_settings(
                            kick::UpdateChatSettingsBody {
                                followers_mode: Some(false),
                                ..Default::default()
                            },
                            app,
                        )
                        .await?;
                    Some(ChatSettingsData {
                        platform: entity::rewards::Platform::Kick,
                    })
                }
                _ => None,
            };
            if let Some(chat_settings) = chat_settings {
                let message_id = uuid::Uuid::new_v4();
                EventsService::assistant_action(
                    AssistantAction {
                        id: uuid::Uuid::new_v4(),
                        message_id,
                        r#type: AssistantActionType::RemoveFollowMode,
                        data: UpdateChatSettings(chat_settings),
                    },
                    app,
                )
                .await?;
            }
        }
        "on_emotes_mode" => {
            let platform = tool_call
                .arguments
                .get("platform")
                .cloned()
                .unwrap_or_default();

            let chat_settings = match platform.as_str().to_lowercase().as_str() {
                "twitch" => {
                    let twitch_service = app.state::<TwitchService>();
                    let auth = twitch_service.get_auth(app).await?;
                    twitch_service
                        .update_chat_settings(
                            auth.user_id.clone(),
                            auth.user_id,
                            app,
                            twitch::UpdateChatSettingsBody {
                                emote_mode: Some(true),
                                ..Default::default()
                            },
                        )
                        .await?;

                    Some(ChatSettingsData {
                        platform: entity::rewards::Platform::Twitch,
                    })
                }
                "kick" => {
                    let kick_session_service = app.state::<KickSessionService>();
                    kick_session_service
                        .update_chat_settings(
                            kick::UpdateChatSettingsBody {
                                emotes_mode: Some(true),
                                ..Default::default()
                            },
                            app,
                        )
                        .await?;
                    Some(ChatSettingsData {
                        platform: entity::rewards::Platform::Kick,
                    })
                }
                _ => None,
            };
            if let Some(chat_settings) = chat_settings {
                let message_id = uuid::Uuid::new_v4();
                EventsService::assistant_action(
                    AssistantAction {
                        id: uuid::Uuid::new_v4(),
                        message_id,
                        r#type: AssistantActionType::AddEmotesMode,
                        data: UpdateChatSettings(chat_settings),
                    },
                    app,
                )
                .await?;
            }
        }
        "off_emotes_mode" => {
            let platform = tool_call
                .arguments
                .get("platform")
                .cloned()
                .unwrap_or_default();

            let chat_settings = match platform.as_str().to_lowercase().as_str() {
                "twitch" => {
                    let twitch_service = app.state::<TwitchService>();
                    let auth = twitch_service.get_auth(app).await?;
                    twitch_service
                        .update_chat_settings(
                            auth.user_id.clone(),
                            auth.user_id,
                            app,
                            twitch::UpdateChatSettingsBody {
                                emote_mode: Some(false),
                                ..Default::default()
                            },
                        )
                        .await?;

                    Some(ChatSettingsData {
                        platform: entity::rewards::Platform::Twitch,
                    })
                }
                "kick" => {
                    let kick_session_service = app.state::<KickSessionService>();
                    kick_session_service
                        .update_chat_settings(
                            kick::UpdateChatSettingsBody {
                                emotes_mode: Some(false),
                                ..Default::default()
                            },
                            app,
                        )
                        .await?;
                    Some(ChatSettingsData {
                        platform: entity::rewards::Platform::Kick,
                    })
                }
                _ => None,
            };
            if let Some(chat_settings) = chat_settings {
                let message_id = uuid::Uuid::new_v4();
                EventsService::assistant_action(
                    AssistantAction {
                        id: uuid::Uuid::new_v4(),
                        message_id,
                        r#type: AssistantActionType::RemoveEmotesMode,
                        data: UpdateChatSettings(chat_settings),
                    },
                    app,
                )
                .await?;
            }
        }
        "on_subscribers_mode" => {
            let platform = tool_call
                .arguments
                .get("platform")
                .cloned()
                .unwrap_or_default();

            let chat_settings = match platform.as_str().to_lowercase().as_str() {
                "twitch" => {
                    let twitch_service = app.state::<TwitchService>();
                    let auth = twitch_service.get_auth(app).await?;
                    twitch_service
                        .update_chat_settings(
                            auth.user_id.clone(),
                            auth.user_id,
                            app,
                            twitch::UpdateChatSettingsBody {
                                subscriber_mode: Some(true),
                                ..Default::default()
                            },
                        )
                        .await?;

                    Some(ChatSettingsData {
                        platform: entity::rewards::Platform::Twitch,
                    })
                }
                "kick" => {
                    let kick_session_service = app.state::<KickSessionService>();
                    kick_session_service
                        .update_chat_settings(
                            kick::UpdateChatSettingsBody {
                                subscribers_mode: Some(true),
                                ..Default::default()
                            },
                            app,
                        )
                        .await?;
                    Some(ChatSettingsData {
                        platform: entity::rewards::Platform::Kick,
                    })
                }
                _ => None,
            };
            if let Some(chat_settings) = chat_settings {
                let message_id = uuid::Uuid::new_v4();
                EventsService::assistant_action(
                    AssistantAction {
                        id: uuid::Uuid::new_v4(),
                        message_id,
                        r#type: AssistantActionType::AddSubscribersMode,
                        data: UpdateChatSettings(chat_settings),
                    },
                    app,
                )
                .await?;
            }
        }
        "off_subscribers_mode" => {
            let platform = tool_call
                .arguments
                .get("platform")
                .cloned()
                .unwrap_or_default();

            let chat_settings = match platform.as_str().to_lowercase().as_str() {
                "twitch" => {
                    let twitch_service = app.state::<TwitchService>();
                    let auth = twitch_service.get_auth(app).await?;
                    twitch_service
                        .update_chat_settings(
                            auth.user_id.clone(),
                            auth.user_id,
                            app,
                            twitch::UpdateChatSettingsBody {
                                subscriber_mode: Some(false),
                                ..Default::default()
                            },
                        )
                        .await?;

                    Some(ChatSettingsData {
                        platform: entity::rewards::Platform::Twitch,
                    })
                }
                "kick" => {
                    let kick_session_service = app.state::<KickSessionService>();
                    kick_session_service
                        .update_chat_settings(
                            kick::UpdateChatSettingsBody {
                                subscribers_mode: Some(false),
                                ..Default::default()
                            },
                            app,
                        )
                        .await?;
                    Some(ChatSettingsData {
                        platform: entity::rewards::Platform::Kick,
                    })
                }
                _ => None,
            };
            if let Some(chat_settings) = chat_settings {
                let message_id = uuid::Uuid::new_v4();
                EventsService::assistant_action(
                    AssistantAction {
                        id: uuid::Uuid::new_v4(),
                        message_id,
                        r#type: AssistantActionType::RemoveSubscribersMode,
                        data: UpdateChatSettings(chat_settings),
                    },
                    app,
                )
                .await?;
            }
        }
        "on_slow_mode" => {
            let platform = tool_call
                .arguments
                .get("platform")
                .cloned()
                .unwrap_or_default();

            let chat_settings = match platform.as_str().to_lowercase().as_str() {
                "twitch" => {
                    let twitch_service = app.state::<TwitchService>();
                    let auth = twitch_service.get_auth(app).await?;
                    twitch_service
                        .update_chat_settings(
                            auth.user_id.clone(),
                            auth.user_id,
                            app,
                            twitch::UpdateChatSettingsBody {
                                slow_mode: Some(true),
                                ..Default::default()
                            },
                        )
                        .await?;

                    Some(ChatSettingsData {
                        platform: entity::rewards::Platform::Twitch,
                    })
                }
                "kick" => {
                    let kick_session_service = app.state::<KickSessionService>();
                    kick_session_service
                        .update_chat_settings(
                            kick::UpdateChatSettingsBody {
                                slow_mode: Some(true),
                                message_interval: Some(1),
                                ..Default::default()
                            },
                            app,
                        )
                        .await?;
                    Some(ChatSettingsData {
                        platform: entity::rewards::Platform::Kick,
                    })
                }
                _ => None,
            };
            if let Some(chat_settings) = chat_settings {
                let message_id = uuid::Uuid::new_v4();
                EventsService::assistant_action(
                    AssistantAction {
                        id: uuid::Uuid::new_v4(),
                        message_id,
                        r#type: AssistantActionType::AddSlowMode,
                        data: UpdateChatSettings(chat_settings),
                    },
                    app,
                )
                .await?;
            }
        }
        "off_slow_mode" => {
            let platform = tool_call
                .arguments
                .get("platform")
                .cloned()
                .unwrap_or_default();

            let chat_settings = match platform.as_str().to_lowercase().as_str() {
                "twitch" => {
                    let twitch_service = app.state::<TwitchService>();
                    let auth = twitch_service.get_auth(app).await?;
                    twitch_service
                        .update_chat_settings(
                            auth.user_id.clone(),
                            auth.user_id,
                            app,
                            twitch::UpdateChatSettingsBody {
                                slow_mode: Some(false),
                                ..Default::default()
                            },
                        )
                        .await?;

                    Some(ChatSettingsData {
                        platform: entity::rewards::Platform::Twitch,
                    })
                }
                "kick" => {
                    let kick_session_service = app.state::<KickSessionService>();
                    kick_session_service
                        .update_chat_settings(
                            kick::UpdateChatSettingsBody {
                                slow_mode: Some(false),
                                ..Default::default()
                            },
                            app,
                        )
                        .await?;
                    Some(ChatSettingsData {
                        platform: entity::rewards::Platform::Kick,
                    })
                }
                _ => None,
            };
            if let Some(chat_settings) = chat_settings {
                let message_id = uuid::Uuid::new_v4();
                EventsService::assistant_action(
                    AssistantAction {
                        id: uuid::Uuid::new_v4(),
                        message_id,
                        r#type: AssistantActionType::RemoveSlowMode,
                        data: UpdateChatSettings(chat_settings),
                    },
                    app,
                )
                .await?;
            }
        }
        "play_alert" => {
            let database_service = app.state::<DatabaseService>();
            let alert = database_service
                .get_alert_by_name(
                    tool_call
                        .arguments
                        .get("name")
                        .ok_or(AppError::Custom("Not found alert name".to_string()))?
                        .clone(),
                    MessageType::AssistantAction,
                )
                .await?
                .ok_or(AppError::Custom("Not found alert by name".to_string()))?;
            let message_id = uuid::Uuid::new_v4();
            EventsService::assistant_action(
                AssistantAction {
                    id: uuid::Uuid::new_v4(),
                    message_id,
                    r#type: AssistantActionType::PlayAlert,
                    data: PlayAlert(alert),
                },
                app,
            )
            .await?;
        }
        "skip_media" => {
            let websocket_broadcaster = app.state::<WebSocketBroadcaster>();
            websocket_broadcaster.broadcast_event_message(&EventMessage {
                event: AppEvent::SkipPlayingMedia,
                data: None::<String>,
            });
        }
        "skip_tts" => {
            let websocket_broadcaster = app.state::<WebSocketBroadcaster>();
            websocket_broadcaster.broadcast_event_message(&EventMessage {
                event: AppEvent::SkipPlayingTts,
                data: None::<String>,
            });
        }
        "skip_alert" => {
            let websocket_broadcaster = app.state::<WebSocketBroadcaster>();
            websocket_broadcaster.broadcast_event_message(&EventMessage {
                event: AppEvent::SkipPlayingAlert,
                data: None::<String>,
            });
        }
        "play_media" => {
            let name = tool_call
                .arguments
                .get("name")
                .cloned()
                .ok_or(AppError::Custom("Media name empty".to_string()))?;
            let media_service = app.state::<MediaService>();
            let videos = media_service.search_youtube(app, &name).await?;
            let message_id = uuid::Uuid::new_v4();
            let first_video = videos
                .first()
                .ok_or(AppError::Custom("Not found video".to_string()))?;

            EventsService::assistant_action(
                AssistantAction {
                    id: uuid::Uuid::new_v4(),
                    message_id,
                    r#type: AssistantActionType::PlayMedia,
                    data: PlayMedia(MediaData {
                        title: first_video.title.clone(),
                        media: Media {
                            url: first_video.url.clone(),
                            media_type: MediaType::Youtube,
                            expires: None,
                            temporary_src: Some(first_video.video_id.clone()),
                        },
                    }),
                },
                app,
            )
            .await?;
        }
        _ => {}
    }
    Ok(())
}
