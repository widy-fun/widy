use crate::services::twitch::{TwitchApi, TwitchBotService};
use database::{DatabaseService, ServicesRepository};
use entity::services::{ServiceAuth, ServiceType};
use model::error::AppError;
use tauri::State;

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
