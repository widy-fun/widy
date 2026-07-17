use entity::services::ServiceType;
use tauri::{AppHandle, State};
use uuid::Uuid;

use crate::services::kick::{KickService, traits::KickApi};

#[tauri::command]
pub async fn kick_remove_custom_reward(
    app: AppHandle,
    kick_service: State<'_, KickService>,
    id: Uuid,
) -> Result<(), String> {
    let auth = kick_service.get_auth(&app, ServiceType::Kick).await?;
    kick_service.remove_custom_reward(&app, &auth, id).await?;
    return Ok(());
}
