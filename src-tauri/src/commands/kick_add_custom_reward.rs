use entity::services::ServiceType;
use tauri::{AppHandle, State};

use crate::{
    error::AppError,
    services::kick::{KickService, traits::KickApi},
};

#[tauri::command]
pub async fn kick_add_custom_reward(
    app: AppHandle,
    kick_service: State<'_, KickService>,
    reward: entity::rewards::Reward,
) -> Result<(), AppError> {
    let auth = kick_service.get_auth(&app, ServiceType::Kick).await?;
    kick_service.add_custom_reward(&app, &auth, &reward).await?;
    Ok(())
}
