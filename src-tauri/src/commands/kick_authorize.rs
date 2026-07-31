use tauri::{AppHandle, State};

use crate::{
    error::AppError,
    services::kick::{KickService, traits::KickApi},
};

#[tauri::command]
pub async fn kick_authorize(
    app: AppHandle,
    kick_service: State<'_, KickService>,
) -> Result<(), AppError> {
    kick_service.authorize(&app).await
}
