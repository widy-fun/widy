use crate::services::kick::KickSessionService;
use model::error::AppError;
use tauri::{AppHandle, State};

#[tauri::command]
pub async fn kick_session_sign_out(
    app: AppHandle,
    kick_session_service: State<'_, KickSessionService>,
) -> Result<(), AppError> {
    kick_session_service.sign_out(&app).await
}
