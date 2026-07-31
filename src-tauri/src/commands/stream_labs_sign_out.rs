use tauri::{AppHandle, State};

use crate::{error::AppError, services::StreamLabsService};

#[tauri::command]
pub async fn stream_labs_sign_out(
    app: AppHandle,
    stream_labs_service: State<'_, StreamLabsService>,
) -> Result<(), AppError> {
    stream_labs_service.sign_out(&app).await
}
