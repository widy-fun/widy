use tauri::{AppHandle, State};

use crate::{
    error::AppError,
    services::twitch::{TwitchApi, TwitchService},
};

#[tauri::command]
pub async fn twitch_sign_out(
    app: AppHandle,
    twitch_service: State<'_, TwitchService>,
) -> Result<(), AppError> {
    twitch_service.sign_out(&app).await?;
    Ok(())
}
