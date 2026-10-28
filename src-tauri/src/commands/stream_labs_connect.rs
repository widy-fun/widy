use crate::services::StreamLabsService;
use model::error::AppError;
use tauri::{AppHandle, State};

#[tauri::command]
pub async fn stream_labs_connect(
    app: AppHandle,
    stream_labs_service: State<'_, StreamLabsService>,
) -> Result<(), AppError> {
    stream_labs_service.connect(&app).await
}
