use tauri::{AppHandle, State};

use crate::services::twitch::TwitchBotService;

#[tauri::command]
pub async fn twitch_bot_connect(
    app: AppHandle,
    twitch_bot_service: State<'_, TwitchBotService>,
) -> Result<(), String> {
    twitch_bot_service.connect(&app).await
}
