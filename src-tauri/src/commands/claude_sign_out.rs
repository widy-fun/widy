use tauri::{AppHandle, State};

use crate::{error::AppError, services::claude::ClaudeService};

#[tauri::command]
pub async fn claude_sign_out(
    app: AppHandle,
    claude_service: State<'_, ClaudeService>,
) -> Result<(), AppError> {
    claude_service.sign_out(&app).await
}
