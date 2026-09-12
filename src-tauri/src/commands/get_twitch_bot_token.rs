use entity::services::{ServiceAuth, ServiceType};
use tauri::State;

use crate::{
    error::AppError,
    repositories::ServicesRepository,
    services::{
        DatabaseService,
        twitch::{TwitchBotService, traits::TwitchApi},
    },
};

#[tauri::command]
pub async fn get_twitch_bot_token(
    twitch_bot_service: State<'_, TwitchBotService>,
    database_service: State<'_, DatabaseService>,
    device_code: String,
) -> Result<(), AppError> {
    let auth = twitch_bot_service.get_token(device_code).await?;
    database_service
        .update_service_auth(
            ServiceType::TwitchBot,
            Some(ServiceAuth::Twitch(auth)),
            true,
        )
        .await?;

    Ok(())
}
