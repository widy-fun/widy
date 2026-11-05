use crate::services::obs_service::ObsService;
use model::error::AppError;
use tauri::{AppHandle, State};

#[tauri::command]
pub async fn obs_connect(
    app: AppHandle,
    obs_service: State<'_, ObsService>,
) -> Result<(), AppError> {
    obs_service.connect(&app).await
}
