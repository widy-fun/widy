use crate::services::twitch::{TwitchApi, TwitchService};
use database::{DatabaseService, ServicesRepository};
use entity::services::{ServiceAuth, ServiceType};
use model::error::AppError;
use tauri::State;

#[tauri::command]
pub async fn get_token(
    twitch_service: State<'_, TwitchService>,
    database_service: State<'_, DatabaseService>,
    device_code: String,
) -> Result<(), AppError> {
    let auth = twitch_service.get_token(device_code).await?;
    database_service
        .update_service_auth(ServiceType::Twitch, Some(ServiceAuth::Twitch(auth)), true)
        .await?;
    Ok(())
}
