use tauri::{AppHandle, State};

use crate::services::KickService;

#[tauri::command]
pub async fn kick_sign_out(
    app: AppHandle,
    kick_service: State<'_, KickService>,
) -> Result<(), String> {
    kick_service.sign_out(&app).await
}
