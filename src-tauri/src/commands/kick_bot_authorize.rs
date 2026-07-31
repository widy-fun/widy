use tauri::{AppHandle, State};

use crate::{
    error::AppError,
    services::kick::{KickBotService, traits::KickApi},
};

#[tauri::command]
pub async fn kick_bot_authorize(
    app: AppHandle,
    kick_bot_service: State<'_, KickBotService>,
) -> Result<(), AppError> {
    kick_bot_service.authorize(&app).await
}
