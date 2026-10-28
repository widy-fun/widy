use crate::services::twitch::TwitchService;
use model::error::AppError;
use tauri::{AppHandle, State};

#[tauri::command]
pub async fn twitch_connect(
    app: AppHandle,
    twitch_service: State<'_, TwitchService>,
) -> Result<(), AppError> {
    twitch_service.connect(&app).await
}
