use entity::services::ServiceType;
use tauri::{AppHandle, State};
use uuid::Uuid;

use crate::services::twitch::{traits::TwitchApi, TwitchService};

#[tauri::command]
pub async fn twitch_remove_custom_reward(
    app: AppHandle,
    twitch_service: State<'_, TwitchService>,
    id: Uuid,
) -> Result<(), String> {
    let auth = twitch_service.check_auth(&app, ServiceType::Twitch).await?;
    twitch_service.remove_custom_reward(&app, &auth, id).await?;

    return Ok(());
}
