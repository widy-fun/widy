use crate::services::twitch::TwitchBotService;
use model::error::AppError;
use tauri::{AppHandle, State};

#[tauri::command]
pub async fn twitch_bot_connect(
    app: AppHandle,
    twitch_bot_service: State<'_, TwitchBotService>,
) -> Result<(), AppError> {
    twitch_bot_service.connect(&app).await
}
