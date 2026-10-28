use crate::services::kick::{KickApi, KickService};
use model::error::AppError;
use tauri::{AppHandle, State};
use uuid::Uuid;

#[tauri::command]
pub async fn kick_remove_custom_reward(
    app: AppHandle,
    kick_service: State<'_, KickService>,
    id: Uuid,
) -> Result<(), AppError> {
    kick_service.remove_custom_reward(&app, id).await?;
    return Ok(());
}
