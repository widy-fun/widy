use model::error::AppError;
use tauri::{AppHandle, State};

use crate::services::obs_service::ObsService;

#[tauri::command]
pub async fn obs_sign_out(
    app: AppHandle,
    obs_service: State<'_, ObsService>,
) -> Result<(), AppError> {
    obs_service.sign_out(&app).await
}
