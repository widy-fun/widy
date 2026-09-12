use entity::services::{ServiceAuth, ServiceType};
use tauri::State;

use crate::{
    error::AppError,
    repositories::ServicesRepository,
    services::{
        DatabaseService,
        twitch::{TwitchService, traits::TwitchApi},
    },
};

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
