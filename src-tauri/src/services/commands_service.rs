use entity::services::ServiceAuth;
use tauri::{AppHandle, Manager};

use crate::{
    repositories::{CommandsRepository, ServicesRepository},
    services::{
        kick::{traits::KickApi, KickBotService},
        twitch::{traits::TwitchApi, TwitchBotService},
        DatabaseService,
    },
};

pub struct CommandsService;

impl CommandsService {
    pub async fn kick_chat_message_trigger(
        trigger: &String,
        app: &AppHandle,
        broadcaster_user_id: u64,
        reply_to_message_id: Option<String>,
    ) -> Result<(), String> {
        let database_service = app.state::<DatabaseService>();
        let kick_bot_service = app.state::<KickBotService>();
        let reqwest_client = app.state::<reqwest::Client>();
        let command = database_service
            .get_command_by_chat_trigger(trigger)
            .await?
            .ok_or("Command not found".to_string())?;
        let service = database_service
            .get_service_with_auth_by_id(entity::services::ServiceType::KickBot)
            .await?
            .ok_or("KickBot service not found".to_string())?;

        if let Some(ServiceAuth::Kick(auth)) = service.auth {
            let _ = kick_bot_service
                .post_chat_message(
                    &reqwest_client,
                    auth.access_token,
                    command
                        .chat_bot
                        .ok_or("ChatBot message empty".to_string())?
                        .message,
                    broadcaster_user_id,
                    reply_to_message_id,
                )
                .await;
        }

        Ok(())
    }

    pub async fn twitch_chat_message_trigger(
        trigger: &String,
        app: &AppHandle,
        broadcaster_id: String,
        reply_parent_message_id: Option<String>,
    ) -> Result<(), String> {
        let database_service = app.state::<DatabaseService>();
        let twitch_bot_service = app.state::<TwitchBotService>();
        let reqwest_client = app.state::<reqwest::Client>();
        let command = database_service
            .get_command_by_chat_trigger(trigger)
            .await?
            .ok_or("Command not found".to_string())?;
        let service = database_service
            .get_service_with_auth_by_id(entity::services::ServiceType::TwitchBot)
            .await?
            .ok_or("TwitchBot service not found".to_string())?;

        if let Some(ServiceAuth::Twitch(auth)) = service.auth {
            let _ = twitch_bot_service
                .send_chat_message(
                    &reqwest_client,
                    auth.access_token,
                    command
                        .chat_bot
                        .ok_or("ChatBot message empty".to_string())?
                        .message,
                    broadcaster_id,
                    auth.user_id,
                    None,
                    twitch_bot_service.client_id(),
                )
                .await;
        }

        Ok(())
    }
}
