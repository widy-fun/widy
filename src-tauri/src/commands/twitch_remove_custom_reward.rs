use tauri::{AppHandle, State};

use crate::services::TwitchService;

#[tauri::command]
pub async fn twitch_remove_custom_reward(
    app: AppHandle,
    twitch_service: State<'_, TwitchService>,
    id: String,
) -> Result<(), String> {
    let auth = twitch_service.check_auth(&app).await?;
    twitch_service
        .remove_custom_reward(&app, &auth, &id)
        .await?;

    return Ok(());
}
