use crate::services::openai::OpenAIService;
use model::error::AppError;
use tauri::{AppHandle, State};

#[tauri::command]
pub async fn openai_sign_out(
    app: AppHandle,
    openai_service: State<'_, OpenAIService>,
) -> Result<(), AppError> {
    openai_service.sign_out(&app).await
}
