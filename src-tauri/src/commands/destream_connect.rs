use crate::services::DestreamService;
use tauri::{AppHandle, State};

#[tauri::command]
pub async fn destream_connect(
    app: AppHandle,
    destream_service: State<'_, DestreamService>,
) -> Result<(), String> {
    destream_service.connect(&app).await
}
