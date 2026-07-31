use tauri::{AppHandle, State};

use crate::{error::AppError, services::TributeService};

#[tauri::command]
pub async fn tribute_sign_out(
    app: AppHandle,
    tribute_service: State<'_, TributeService>,
) -> Result<(), AppError> {
    tribute_service.sign_out(&app).await
}
