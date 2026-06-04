use tauri::{AppHandle, State};

use crate::services::DestreamService;

#[tauri::command]
pub async fn destream_sign_out(
    app: AppHandle,
    destream_service: State<'_, DestreamService>,
) -> Result<(), String> {
    destream_service.sign_out(&app).await
}
