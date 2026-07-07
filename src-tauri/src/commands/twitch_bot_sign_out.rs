use entity::services::ServiceType;
use tauri::{AppHandle, State};

use crate::services::twitch::{traits::TwitchApi, TwitchBotService};

#[tauri::command]
pub async fn twitch_bot_sign_out(
    app: AppHandle,
    twitch_bot_service: State<'_, TwitchBotService>,
) -> Result<(), String> {
    twitch_bot_service
        .sign_out(&app, ServiceType::TwitchBot)
        .await?;
    Ok(())
}
