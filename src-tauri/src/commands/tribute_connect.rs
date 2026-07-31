use crate::{error::AppError, services::TributeService};
use tauri::{AppHandle, State};

#[tauri::command]
pub async fn tribute_connect(
    app: AppHandle,
    tribute_service: State<'_, TributeService>,
) -> Result<(), AppError> {
    tribute_service.connect(&app).await
}
