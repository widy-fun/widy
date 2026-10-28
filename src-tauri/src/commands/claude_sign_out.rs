use crate::services::claude::ClaudeService;
use model::error::AppError;
use tauri::{AppHandle, State};

#[tauri::command]
pub async fn claude_sign_out(
    app: AppHandle,
    claude_service: State<'_, ClaudeService>,
) -> Result<(), AppError> {
    claude_service.sign_out(&app).await
}
