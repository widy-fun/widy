use crate::services::kick::{KickApi, KickService};
use model::error::AppError;
use tauri::{AppHandle, State};

#[tauri::command]
pub async fn kick_authorize(
    app: AppHandle,
    kick_service: State<'_, KickService>,
) -> Result<(), AppError> {
    kick_service.authorize(&app).await
}
