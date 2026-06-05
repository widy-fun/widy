use tauri::{AppHandle, State};

use crate::services::TributeService;

#[tauri::command]
pub async fn tribute_sign_out(
    app: AppHandle,
    tribute_service: State<'_, TributeService>,
) -> Result<(), String> {
    tribute_service.sign_out(&app).await
}
