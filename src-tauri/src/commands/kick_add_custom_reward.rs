use crate::services::KickService;
use tauri::{AppHandle, State};

#[tauri::command]
pub async fn kick_add_custom_reward(
    app: AppHandle,
    kick_service: State<'_, KickService>,
    reward: entity::rewards::Model,
) -> Result<(), String> {
    let auth = kick_service.check_auth(&app).await?;
    kick_service.add_custom_reward(&app, &auth, &reward).await?;
    Ok(())
}
