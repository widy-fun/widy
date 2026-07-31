use tauri::{AppHandle, State};

use crate::{error::AppError, services::twitch::TwitchService};

#[tauri::command]
pub async fn twitch_connect(
    app: AppHandle,
    twitch_service: State<'_, TwitchService>,
) -> Result<(), AppError> {
    twitch_service.connect(&app).await
}
