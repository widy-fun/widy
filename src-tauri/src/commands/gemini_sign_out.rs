use crate::services::gemini::GeminiService;
use model::error::AppError;
use tauri::{AppHandle, State};

#[tauri::command]
pub async fn gemini_sign_out(
    app: AppHandle,
    gemini_service: State<'_, GeminiService>,
) -> Result<(), AppError> {
    gemini_service.sign_out(&app).await
}
