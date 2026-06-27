use tauri::{AppHandle, State};

use crate::services::KickService;

#[tauri::command]
pub async fn kick_authorize(
    app: AppHandle,
    kick_service: State<'_, KickService>,
) -> Result<(), String> {
    kick_service.authorize(&app).await
}
