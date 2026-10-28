use crate::services::claude::ClaudeService;
use model::error::AppError;
use tauri::{AppHandle, State};

#[tauri::command]
pub async fn claude_connect(
    app: AppHandle,
    claude_service: State<'_, ClaudeService>,
) -> Result<(), AppError> {
    claude_service.connect(&app).await
}
