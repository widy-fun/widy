use crate::services::kick::{KickApi, KickService};
use model::error::AppError;
use tauri::{AppHandle, State};

#[tauri::command]
pub async fn kick_add_custom_reward(
    app: AppHandle,
    kick_service: State<'_, KickService>,
    reward: entity::rewards::Reward,
) -> Result<(), AppError> {
    kick_service.add_custom_reward(&app, &reward).await?;
    Ok(())
}
