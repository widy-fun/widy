use entity::services::ServiceType;
use tauri::{AppHandle, State};

use crate::services::kick::{traits::KickApi, KickService};

#[tauri::command]
pub async fn kick_add_custom_reward(
    app: AppHandle,
    kick_service: State<'_, KickService>,
    reward: entity::rewards::Reward,
) -> Result<(), String> {
    let auth = kick_service.check_auth(&app, ServiceType::Kick).await?;
    kick_service.add_custom_reward(&app, &auth, &reward).await?;
    Ok(())
}
