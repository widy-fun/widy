use crate::{error::AppError, services::claude::ClaudeService};
use tauri::{AppHandle, State};

#[tauri::command]
pub async fn claude_connect(
    app: AppHandle,
    claude_service: State<'_, ClaudeService>,
) -> Result<(), AppError> {
    claude_service.connect(&app).await
}
