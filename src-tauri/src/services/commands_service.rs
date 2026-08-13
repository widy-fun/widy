use entity::{
    commands::{Command, PostType},
    commands_actions::CommandAction,
    rewards::Platform,
    services::ServiceType,
};
use std::{
    collections::HashMap,
    future::Future,
    sync::{Arc, Mutex},
    time::Duration,
};
use tauri::{AppHandle, Manager};
use tokio::{task::AbortHandle, time::interval};
use uuid::Uuid;

use crate::{
    error::AppError,
    repositories::CommandsRepository,
    services::{
        DatabaseService, EventsService, UnifiedChatMessage,
        kick::{KickBotService, KickService, traits::KickApi},
        twitch::{TwitchBotService, TwitchService, traits::TwitchApi},
    },
    traits::ChatMessageBuffer,
};

pub struct CommandsService {
    timers: Arc<Mutex<HashMap<Uuid, AbortHandle>>>,
    pub commands: Arc<Mutex<Vec<Command>>>,
}

impl CommandsService {
    pub fn new() -> Self {
        Self {
            timers: Arc::new(Mutex::new(HashMap::new())),
            commands: Arc::new(Mutex::new(vec![])),
        }
    }

    pub async fn start(&self, app: &AppHandle) -> Result<(), AppError> {
        let database_service = app.state::<DatabaseService>();
        let commands = database_service.get_commands().await?;
        *self.commands.lock().unwrap() = commands.clone();
        for command in commands {
            if let Command {
                is_enabled: true,
                timer_source: Some(timer),
                ..
            } = command
            {
                self.add_timer(
                    app.clone(),
                    Duration::from_mins(timer.mins_passed),
                    command.id,
                    Self::on_timer_tick,
                );
            }
        }
        Ok(())
    }

    pub async fn kick_chat_message_trigger(
        message: UnifiedChatMessage,
        app: &AppHandle,
    ) -> Result<(), AppError> {
        let kick_bot_service = app.state::<KickBotService>();
        let kick_service = app.state::<KickService>();
        let commands_service = app.state::<CommandsService>();
        let reqwest_client = app.state::<reqwest::Client>();
        let text = message.content.text;
        let mut parts = text.splitn(2, char::is_whitespace);
        let trigger = parts.next().unwrap_or("");
        let rest_text = parts.next().unwrap_or("").trim_start();
        let command = {
            let commands = commands_service.commands.lock().unwrap();
            commands
                .iter()
                .find(|c| {
                    c.chat_source
                        .as_ref()
                        .map_or(false, |chat| &chat.trigger == trigger)
                })
                .cloned()
        };
        let command = command.ok_or(AppError::Custom("Command not found".to_string()))?;
        let broadcaster_user_id: u64 = message
            .channel_id
            .parse()
            .map_err(|_| AppError::Custom("Channel id parse error".to_string()))?;

        if let Command {
            is_enabled: true,
            chat_source: Some(chat),
            chat_bot_action: Some(chat_bot),
            ..
        } = command.clone()
        {
            if !message.sender.roles.has_any_level(&chat.user_levels) {
                return Err(AppError::Custom("Not allowed".to_string()));
            }

            let reply_to_message_id: Option<String> = match command.clone().chat_bot_action {
                Some(chat_bot) => {
                    if chat_bot.replay {
                        Some(message.id)
                    } else {
                        None
                    }
                }
                None => None,
            };
            let auth = kick_service.get_auth(app, ServiceType::Kick).await?;
            let _ = kick_bot_service
                .post_chat_message(
                    &reqwest_client,
                    auth.access_token,
                    chat_bot.message,
                    broadcaster_user_id,
                    reply_to_message_id,
                )
                .await;
        }

        if let Command {
            is_enabled: true,
            alert: Some(alert),
            ..
        } = command.clone()
        {
            let command_action = CommandAction {
                id: Uuid::new_v4(),
                user_name: message.sender.username.clone(),
                user_input: Some(text.clone()),
                command_id: command.id,
                command_name: command.name.clone(),
                message_id: Uuid::new_v4(),
                platform: Some(Platform::Kick),
                media: None,
                tts: None,
                alert: Some(alert),
            };
            let _ = EventsService::command_action(command_action, app).await;
        }

        if let Command {
            is_enabled: true,
            tts_action: Some(tts_action),
            ..
        } = command.clone()
        {
            let command_action = CommandAction {
                id: Uuid::new_v4(),
                user_name: message.sender.username,
                user_input: Some(rest_text.to_string()),
                command_id: command.id,
                command_name: command.name.clone(),
                message_id: Uuid::new_v4(),
                platform: Some(Platform::Kick),
                media: None,
                tts: None,
                alert: None,
            };

            let _ =
                EventsService::command_tts_action(rest_text, tts_action, app, command_action).await;
        }

        Ok(())
    }

    pub async fn twitch_chat_message_trigger(
        message: UnifiedChatMessage,
        app: &AppHandle,
    ) -> Result<(), AppError> {
        let twitch_bot_service = app.state::<TwitchBotService>();
        let twitch_service = app.state::<TwitchService>();
        let commands_service = app.state::<CommandsService>();
        let reqwest_client = app.state::<reqwest::Client>();
        let text = message.content.text;
        let mut parts = text.splitn(2, char::is_whitespace);
        let trigger = parts.next().unwrap_or("");
        let rest_text = parts.next().unwrap_or("").trim_start();
        let command = {
            let commands = commands_service.commands.lock().unwrap();
            commands
                .iter()
                .find(|c| {
                    c.chat_source
                        .as_ref()
                        .map_or(false, |chat| &chat.trigger == trigger)
                })
                .cloned()
        };
        let command = command.ok_or(AppError::Custom("Command not found".to_string()))?;
        if let Command {
            is_enabled: true,
            chat_source: Some(chat),
            chat_bot_action: Some(chat_bot),
            ..
        } = command.clone()
        {
            if !message.sender.roles.has_any_level(&chat.user_levels) {
                return Err(AppError::Custom("Not allowed".to_string()));
            }

            let reply_to_message_id: Option<String> = match command.clone().chat_bot_action {
                Some(chat_bot) => {
                    if chat_bot.replay {
                        Some(message.id)
                    } else {
                        None
                    }
                }
                None => None,
            };
            let auth = twitch_service.get_auth(app, ServiceType::Twitch).await?;
            let bot_auth = twitch_bot_service
                .get_auth(app, ServiceType::TwitchBot)
                .await?;

            let _ = twitch_bot_service
                .send_chat_message(
                    &reqwest_client,
                    bot_auth.access_token,
                    chat_bot.message,
                    auth.user_id,
                    bot_auth.user_id,
                    reply_to_message_id,
                    twitch_bot_service.client_id(),
                )
                .await;
        }

        if let Command {
            is_enabled: true,
            alert: Some(alert),
            ..
        } = command.clone()
        {
            let command_action = CommandAction {
                id: Uuid::new_v4(),
                user_name: message.sender.username.clone(),
                user_input: Some(text.clone()),
                command_id: command.id,
                command_name: command.name.clone(),
                message_id: Uuid::new_v4(),
                platform: Some(Platform::Twitch),
                media: None,
                tts: None,
                alert: Some(alert),
            };
            let _ = EventsService::command_action(command_action, app).await;
        }

        if let Command {
            is_enabled: true,
            tts_action: Some(tts_action),
            ..
        } = command.clone()
        {
            let command_action = CommandAction {
                id: Uuid::new_v4(),
                user_name: message.sender.username,
                user_input: Some(rest_text.to_string()),
                command_id: command.id,
                command_name: command.name.clone(),
                message_id: Uuid::new_v4(),
                platform: Some(Platform::Twitch),
                media: None,
                tts: None,
                alert: None,
            };

            let _ =
                EventsService::command_tts_action(rest_text, tts_action, app, command_action).await;
        }

        Ok(())
    }

    pub async fn on_timer_tick(app: AppHandle, command_id: Uuid) {
        let database_service = app.state::<DatabaseService>();
        let command = database_service.get_command_by_id(command_id).await;
        if let Ok(Some(Command {
            is_enabled: true,
            timer_source: Some(timer_source),
            chat_bot_action: Some(chat_bot),
            ..
        })) = command.clone()
        {
            if chat_bot.platforms.contains(&Platform::Kick) {
                let _ = Self::kick_timer_chat_message(
                    &app,
                    timer_source.clone().message,
                    timer_source.clone().lines_passed,
                )
                .await;
            }
            if chat_bot.platforms.contains(&Platform::Twitch) {
                if timer_source.post_type == PostType::Announcement {
                    let _ = Self::twitch_timer_chat_announcement(
                        &app,
                        timer_source.clone().message,
                        timer_source.clone().lines_passed,
                    )
                    .await;
                } else {
                    let _ = Self::twitch_timer_chat_message(
                        &app,
                        timer_source.clone().message,
                        timer_source.clone().lines_passed,
                    )
                    .await;
                }
            }
        }

        if let Ok(Some(Command {
            id,
            name,
            is_enabled: true,
            timer_source: Some(timer_source),
            alert: Some(alert),
            ..
        })) = command.clone()
        {
            let command_action = CommandAction {
                id: Uuid::new_v4(),
                user_name: "Timer".to_string(),
                user_input: Some(timer_source.clone().message),
                command_id: id,
                command_name: name,
                message_id: Uuid::new_v4(),
                platform: None,
                media: None,
                tts: None,
                alert: Some(alert),
            };
            let _ = EventsService::command_action(command_action, &app).await;
        }

        if let Ok(Some(Command {
            id,
            name,
            is_enabled: true,
            timer_source: Some(timer_source),
            tts_action: Some(tts_action),
            ..
        })) = command.clone()
        {
            let text = timer_source.message;
            let command_action = CommandAction {
                id: Uuid::new_v4(),
                user_name: "Timer".to_string(),
                user_input: Some(text.clone()),
                command_id: id,
                command_name: name,
                message_id: Uuid::new_v4(),
                platform: None,
                media: None,
                tts: None,
                alert: None,
            };
            let _ =
                EventsService::command_tts_action(&text, tts_action, &app, command_action).await;
        }
    }

    pub async fn kick_timer_chat_message(
        app: &AppHandle,
        message: String,
        lines_passed: u64,
    ) -> Result<(), AppError> {
        let kick_bot_service = app.state::<KickBotService>();
        let kick_service = app.state::<KickService>();
        let auth = kick_service.get_auth(app, ServiceType::Kick).await?;
        let chat_messages_buffer = { kick_service.chat_messages_buffer.lock().unwrap().clone() };
        if chat_messages_buffer.is_message_not_lines_passed(message.clone(), lines_passed as usize)
        {
            return Err(AppError::Custom("Bot message not passed lines".to_string()));
        }
        let reqwest_client = app.state::<reqwest::Client>();
        let user_info = kick_service
            .get_user_info(&reqwest_client, &auth.access_token)
            .await?;
        kick_bot_service
            .post_chat_message(
                &reqwest_client,
                auth.access_token,
                message,
                user_info.user_id,
                None,
            )
            .await?;

        Ok(())
    }

    pub async fn twitch_timer_chat_message(
        app: &AppHandle,
        message: String,
        lines_passed: u64,
    ) -> Result<(), AppError> {
        let twitch_bot_service = app.state::<TwitchBotService>();
        let twitch_service = app.state::<TwitchService>();
        let bot_auth = twitch_bot_service
            .get_auth(app, ServiceType::TwitchBot)
            .await?;
        let auth = twitch_service.get_auth(app, ServiceType::Twitch).await?;
        let chat_messages_buffer = { twitch_service.chat_messages_buffer.lock().unwrap().clone() };
        if chat_messages_buffer.is_message_not_lines_passed(message.clone(), lines_passed as usize)
        {
            return Err(AppError::Custom("Bot message not passed lines".to_string()));
        }
        let reqwest_client = app.state::<reqwest::Client>();

        twitch_bot_service
            .send_chat_message(
                &reqwest_client,
                bot_auth.access_token,
                message,
                auth.user_id,
                bot_auth.user_id,
                None,
                twitch_bot_service.client_id(),
            )
            .await?;

        Ok(())
    }

    pub async fn twitch_timer_chat_announcement(
        app: &AppHandle,
        message: String,
        lines_passed: u64,
    ) -> Result<(), AppError> {
        let twitch_bot_service = app.state::<TwitchBotService>();
        let twitch_service = app.state::<TwitchService>();
        let bot_auth = twitch_bot_service
            .get_auth(app, ServiceType::TwitchBot)
            .await?;
        let auth = twitch_service.get_auth(app, ServiceType::Twitch).await?;
        let chat_messages_buffer = { twitch_service.chat_messages_buffer.lock().unwrap().clone() };
        if chat_messages_buffer.is_message_not_lines_passed(message.clone(), lines_passed as usize)
        {
            return Err(AppError::Custom("Bot message not passed lines".to_string()));
        }
        let reqwest_client = app.state::<reqwest::Client>();

        twitch_bot_service
            .send_chat_announcement(
                &reqwest_client,
                bot_auth.access_token,
                message,
                auth.user_id,
                bot_auth.user_id,
                twitch_bot_service.client_id(),
            )
            .await?;

        Ok(())
    }

    pub fn add_timer<F, Fut>(
        &self,
        app: AppHandle,
        period: Duration,
        command_id: Uuid,
        mut on_tick: F,
    ) -> Uuid
    where
        F: FnMut(AppHandle, Uuid) -> Fut + Send + 'static,
        Fut: Future<Output = ()> + Send + 'static,
    {
        let task = tokio::spawn(async move {
            let mut tick = interval(period);

            tick.tick().await;
            loop {
                tick.tick().await;
                on_tick(app.clone(), command_id).await;
            }
        });

        self.timers
            .lock()
            .unwrap()
            .insert(command_id, task.abort_handle());

        command_id
    }

    pub fn remove_timer(&self, command_id: Uuid) -> bool {
        if let Some(handle) = self.timers.lock().unwrap().remove(&command_id) {
            handle.abort();
            true
        } else {
            false
        }
    }

    pub fn is_timer_run(&self, command_id: Uuid) -> bool {
        self.timers.lock().unwrap().contains_key(&command_id)
    }
}
