use tauri::{AppHandle, State};

use crate::{
    error::AppError,
    services::twitch::{TwitchApi, TwitchBotService},
};

#[tauri::command]
pub async fn twitch_bot_sign_out(
    app: AppHandle,
    twitch_bot_service: State<'_, TwitchBotService>,
) -> Result<(), AppError> {
    twitch_bot_service.sign_out(&app).await?;
    Ok(())
}
