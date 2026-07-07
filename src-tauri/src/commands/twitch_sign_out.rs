use entity::services::ServiceType;
use tauri::{AppHandle, State};

use crate::services::twitch::{traits::TwitchApi, TwitchService};

#[tauri::command]
pub async fn twitch_sign_out(
    app: AppHandle,
    twitch_service: State<'_, TwitchService>,
) -> Result<(), String> {
    twitch_service.sign_out(&app, ServiceType::Twitch).await?;
    Ok(())
}
