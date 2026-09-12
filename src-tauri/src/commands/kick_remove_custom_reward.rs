use tauri::{AppHandle, State};
use uuid::Uuid;

use crate::{
    error::AppError,
    services::kick::{KickService, traits::KickApi},
};

#[tauri::command]
pub async fn kick_remove_custom_reward(
    app: AppHandle,
    kick_service: State<'_, KickService>,
    id: Uuid,
) -> Result<(), AppError> {
    kick_service.remove_custom_reward(&app, id).await?;
    return Ok(());
}
