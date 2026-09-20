use crate::{error::AppError, services::kick::KickSessionService};
use tauri::{AppHandle, State};

#[tauri::command]
pub async fn kick_session_connect(
    app: AppHandle,
    kick_session_service: State<'_, KickSessionService>,
) -> Result<(), AppError> {
    kick_session_service.connect(&app).await
}
