use entity::services::ServiceType;
use tauri::{AppHandle, State};

use crate::services::kick::{traits::KickApi, KickService};

#[tauri::command]
pub async fn kick_remove_custom_reward(
    app: AppHandle,
    kick_service: State<'_, KickService>,
    id: String,
) -> Result<(), String> {
    let auth = kick_service.check_auth(&app, ServiceType::Kick).await?;
    kick_service.remove_custom_reward(&app, &auth, &id).await?;
    return Ok(());
}
