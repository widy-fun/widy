use tauri::{AppHandle, State};

use crate::{error::AppError, services::openai::OpenAIService};

#[tauri::command]
pub async fn openai_sign_out(
    app: AppHandle,
    openai_service: State<'_, OpenAIService>,
) -> Result<(), AppError> {
    openai_service.sign_out(&app).await
}
