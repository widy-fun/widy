use tauri::{AppHandle, State};

use crate::{error::AppError, services::twitch::TwitchBotService};

#[tauri::command]
pub async fn twitch_bot_connect(
    app: AppHandle,
    twitch_bot_service: State<'_, TwitchBotService>,
) -> Result<(), AppError> {
    twitch_bot_service.connect(&app).await
}
