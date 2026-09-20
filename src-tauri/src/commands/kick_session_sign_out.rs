use tauri::{AppHandle, State};

use crate::{error::AppError, services::kick::KickSessionService};

#[tauri::command]
pub async fn kick_session_sign_out(
    app: AppHandle,
    kick_session_service: State<'_, KickSessionService>,
) -> Result<(), AppError> {
    kick_session_service.sign_out(&app).await
}
