use tauri::{AppHandle, State};

use crate::services::kick::{traits::KickApi, KickBotService};

#[tauri::command]
pub async fn kick_bot_authorize(
    app: AppHandle,
    kick_bot_service: State<'_, KickBotService>,
) -> Result<(), String> {
    kick_bot_service.authorize(&app).await
}
