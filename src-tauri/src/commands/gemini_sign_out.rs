use tauri::{AppHandle, State};

use crate::{error::AppError, services::gemini::GeminiService};

#[tauri::command]
pub async fn gemini_sign_out(
    app: AppHandle,
    gemini_service: State<'_, GeminiService>,
) -> Result<(), AppError> {
    gemini_service.sign_out(&app).await
}
