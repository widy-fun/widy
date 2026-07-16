use std::{
    collections::HashMap,
    future::Future,
    sync::{Arc, Mutex},
    time::Duration,
};

use entity::{
    commands::Command, commands_actions::CommandAction, messages::ClientMessage, rewards::Platform,
    services::ServiceAuth,
};
use tauri::{AppHandle, Manager};
use tokio::{task::AbortHandle, time::interval};
use uuid::Uuid;

use crate::{
    repositories::{CommandsRepository, ServicesRepository},
    services::{
        kick::{traits::KickApi, KickBotService, KickService},
        twitch::{traits::TwitchApi, TwitchBotService, TwitchService},
        websocket_broadcaster, DatabaseService, EventsService, UnifiedChatMessage,
        WebSocketBroadcaster,
    },
};

pub struct CommandsService {
    timers: Arc<Mutex<HashMap<Uuid, AbortHandle>>>,
}

impl CommandsService {
    pub fn new() -> Self {
        Self {
            timers: Arc::new(Mutex::new(HashMap::new())),
        }
    }

    pub async fn start_timers(&self, app: &AppHandle) -> Result<(), String> {
        let database_service = app.state::<DatabaseService>();
        let commands = database_service.get_commands().await?;
        for command in commands {
            if let Command {
                is_enabled: true,
                timer: Some(timer),
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
    ) -> Result<(), String> {
        let database_service = app.state::<DatabaseService>();
        let kick_bot_service = app.state::<KickBotService>();
        let reqwest_client = app.state::<reqwest::Client>();
        let trigger = message.content.text;
        let command = database_service
            .get_command_by_chat_trigger(&trigger)
            .await?
            .ok_or("Command not found".to_string())?;
        let broadcaster_user_id: u64 = message
            .channel_id
            .parse()
            .map_err(|_| "Channel id parse error".to_string())?;

        if let Command {
            is_enabled: true,
            chat: Some(chat),
            chat_bot: Some(chat_bot),
            ..
        } = command.clone()
        {
            if !message.sender.roles.has_any_level(&chat.user_levels) {
                return Err("Not allowed".to_string());
            }

            let reply_to_message_id: Option<String> = match command.clone().chat_bot {
                Some(chat_bot) => {
                    if chat_bot.replay {
                        Some(message.id)
                    } else {
                        None
                    }
                }
                None => None,
            };
            let service = database_service
                .get_service_with_auth_by_id(entity::services::ServiceType::KickBot)
                .await?
                .ok_or("KickBot service not found".to_string())?;
            if let Some(ServiceAuth::Kick(auth)) = service.clone().auth {
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
        }

        if let Command {
            is_enabled: true,
            alert: Some(alert),
            ..
        } = command.clone()
        {
            let command_action = CommandAction {
                id: Uuid::new_v4(),
                user_name: message.sender.username,
                user_input: Some(trigger.clone()),
                command_id: command.id,
                command_name: command.name,
                message_id: Uuid::new_v4(),
                platform: Platform::Kick,
                media: None,
                alert: Some(alert),
            };
            let _ = EventsService::command_action(command_action, app).await;
        }

        Ok(())
    }

    pub async fn twitch_chat_message_trigger(
        message: UnifiedChatMessage,
        app: &AppHandle,
    ) -> Result<(), String> {
        let database_service = app.state::<DatabaseService>();
        let twitch_bot_service = app.state::<TwitchBotService>();
        let reqwest_client = app.state::<reqwest::Client>();
        let trigger = message.content.text;
        let command = database_service
            .get_command_by_chat_trigger(&trigger)
            .await?
            .ok_or("Command not found".to_string())?;
        let broadcaster_id = message.channel_id;
        if let Command {
            is_enabled: true,
            chat: Some(chat),
            chat_bot: Some(chat_bot),
            ..
        } = command.clone()
        {
            if !message.sender.roles.has_any_level(&chat.user_levels) {
                return Err("Not allowed".to_string());
            }

            let reply_to_message_id: Option<String> = match command.clone().chat_bot {
                Some(chat_bot) => {
                    if chat_bot.replay {
                        Some(message.id)
                    } else {
                        None
                    }
                }
                None => None,
            };
            let service = database_service
                .get_service_with_auth_by_id(entity::services::ServiceType::TwitchBot)
                .await?
                .ok_or("TwitchBot service not found".to_string())?;

            if let Some(ServiceAuth::Twitch(auth)) = service.clone().auth {
                let _ = twitch_bot_service
                    .send_chat_message(
                        &reqwest_client,
                        auth.access_token,
                        chat_bot.message,
                        broadcaster_id,
                        auth.user_id,
                        reply_to_message_id,
                        twitch_bot_service.client_id(),
                    )
                    .await;
            }
        }

        if let Command {
            is_enabled: true,
            alert: Some(alert),
            ..
        } = command.clone()
        {
            let command_action = CommandAction {
                id: Uuid::new_v4(),
                user_name: message.sender.username,
                user_input: Some(trigger.clone()),
                command_id: command.id,
                command_name: command.name,
                message_id: Uuid::new_v4(),
                platform: Platform::Twitch,
                media: None,
                alert: Some(alert),
            };
            let _ = EventsService::command_action(command_action, app).await;
        }
        Ok(())
    }

    pub async fn on_timer_tick(app: AppHandle, command_id: Uuid) {
        let database_service = app.state::<DatabaseService>();
        let command = database_service.get_command_by_id(command_id).await;
        if let Ok(Some(Command {
            is_enabled: true,
            timer: Some(timer),
            chat_bot: Some(chat_bot),
            ..
        })) = command.clone()
        {
            if chat_bot.platforms.contains(&Platform::Kick) {
                let _ = Self::kick_timer_chat_message(&app, timer.message).await;
            }
            if chat_bot.platforms.contains(&Platform::Twitch) {
                let _ = Self::twitch_timer_chat_message(&app, timer.message).await;
            }
        }
        if let Ok(Some(Command {
            id,
            name,
            is_enabled: true,
            timer: Some(timer),
            alert: Some(alert),
            ..
        })) = command
        {
            let command_action = CommandAction {
                id: Uuid::new_v4(),
                user_name: "Timer".to_string(),
                user_input: Some(timer.clone().message),
                command_id: id,
                command_name: name,
                message_id: Uuid::new_v4(),
                platform: Platform::Kick,
                media: None,
                alert: Some(alert),
            };
            let _ = EventsService::command_action(command_action, &app).await;
        }
    }

    pub async fn kick_timer_chat_message(app: &AppHandle, message: String) -> Result<(), String> {
        let database_service = app.state::<DatabaseService>();
        let kick_bot_service = app.state::<KickBotService>();
        let kick_service = app.state::<KickService>();
        let reqwest_client = app.state::<reqwest::Client>();
        let service = database_service
            .get_service_with_auth_by_id(entity::services::ServiceType::KickBot)
            .await?;

        if let Some(entity::services::Model {
            auth: Some(ServiceAuth::Kick(auth)),
            ..
        }) = service
        {
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
        }

        Ok(())
    }

    pub async fn twitch_timer_chat_message(app: &AppHandle, message: String) -> Result<(), String> {
        let database_service = app.state::<DatabaseService>();
        let twitch_bot_service = app.state::<TwitchBotService>();
        let twitch_service = app.state::<TwitchService>();
        let reqwest_client = app.state::<reqwest::Client>();
        let bot_service = database_service
            .get_service_with_auth_by_id(entity::services::ServiceType::TwitchBot)
            .await?;
        let service = database_service
            .get_service_with_auth_by_id(entity::services::ServiceType::Twitch)
            .await?;
       
        if let Some(entity::services::Model {
            auth: Some(ServiceAuth::Twitch(auth)),
            ..
        }) = bot_service  && let Some(entity::services::Model {
        auth: Some(ServiceAuth::Twitch(twitch_auth)),
        ..
    }) = service
        {
            twitch_bot_service
                .send_chat_message(
                    &reqwest_client,
                    auth.access_token,
                    message,
                    broadcaster_id,
                    auth.user_id,
                    None,
                    twitch_bot_service.client_id(),
                )
                .await?
        }

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
