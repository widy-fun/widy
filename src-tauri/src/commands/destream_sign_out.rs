use tauri::{AppHandle, State};

use crate::{error::AppError, services::DestreamService};

#[tauri::command]
pub async fn destream_sign_out(
    app: AppHandle,
    destream_service: State<'_, DestreamService>,
) -> Result<(), AppError> {
    destream_service.sign_out(&app).await
}
