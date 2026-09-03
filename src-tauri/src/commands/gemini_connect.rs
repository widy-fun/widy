use crate::{error::AppError, services::gemini::GeminiService};
use tauri::{AppHandle, State};

#[tauri::command]
pub async fn gemini_connect(
    app: AppHandle,
    gemini_service: State<'_, GeminiService>,
) -> Result<(), AppError> {
    gemini_service.connect(&app).await
}
