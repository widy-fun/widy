use crate::services::StreamLabsService;
use model::error::AppError;
use tauri::{AppHandle, State};

#[tauri::command]
pub async fn stream_labs_sign_out(
    app: AppHandle,
    stream_labs_service: State<'_, StreamLabsService>,
) -> Result<(), AppError> {
    stream_labs_service.sign_out(&app).await
}
