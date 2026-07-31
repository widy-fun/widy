use crate::{error::AppError, services::DestreamService};
use tauri::{AppHandle, State};

#[tauri::command]
pub async fn destream_connect(
    app: AppHandle,
    destream_service: State<'_, DestreamService>,
) -> Result<(), AppError> {
    destream_service.connect(&app).await
}
