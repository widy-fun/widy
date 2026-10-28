use crate::services::twitch::{TwitchApi, TwitchBotService};
use model::error::AppError;
use model::twitch::TwitchDeviceCodeResponse;
use tauri::State;

#[tauri::command]
pub async fn get_twitch_bot_device_code(
    twitch_bot_service: State<'_, TwitchBotService>,
) -> Result<TwitchDeviceCodeResponse, AppError> {
    twitch_bot_service.get_device_code().await
}
