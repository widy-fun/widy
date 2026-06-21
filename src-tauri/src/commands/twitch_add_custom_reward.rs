use tauri::{AppHandle, State};

use crate::services::TwitchService;

#[tauri::command]
pub async fn twitch_add_custom_reward(
    app: AppHandle,
    twitch_service: State<'_, TwitchService>,
    reward: entity::rewards::Model,
) -> Result<(), String> {
    let auth = twitch_service.check_auth(&app).await?;
    twitch_service
        .add_custom_reward(&app, &auth, &reward)
        .await?;

    return Ok(());
}
