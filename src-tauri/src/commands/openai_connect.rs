use crate::services::openai::OpenAIService;
use model::error::AppError;
use tauri::{AppHandle, State};

#[tauri::command]
pub async fn openai_connect(
    app: AppHandle,
    openai_service: State<'_, OpenAIService>,
) -> Result<(), AppError> {
    openai_service.connect(&app).await
}
