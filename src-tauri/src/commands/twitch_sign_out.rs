use entity::services::ServiceType;
use tauri::{AppHandle, State};

use crate::{
    error::AppError,
    services::twitch::{TwitchService, traits::TwitchApi},
};

#[tauri::command]
pub async fn twitch_sign_out(
    app: AppHandle,
    twitch_service: State<'_, TwitchService>,
) -> Result<(), AppError> {
    twitch_service.sign_out(&app, ServiceType::Twitch).await?;
    Ok(())
}
