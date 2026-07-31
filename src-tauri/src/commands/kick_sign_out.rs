use entity::services::ServiceType;
use tauri::{AppHandle, State};

use crate::{
    error::AppError,
    services::kick::{KickService, traits::KickApi},
};

#[tauri::command]
pub async fn kick_sign_out(
    app: AppHandle,
    kick_service: State<'_, KickService>,
) -> Result<(), AppError> {
    kick_service.sign_out(&app, ServiceType::Kick).await
}
