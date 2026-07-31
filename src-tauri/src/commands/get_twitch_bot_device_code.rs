use tauri::State;

use crate::{
    error::AppError,
    services::twitch::{TwitchBotService, TwitchDeviceCodeResponse, traits::TwitchApi},
};

#[tauri::command]
pub async fn get_twitch_bot_device_code(
    twitch_bot_service: State<'_, TwitchBotService>,
    reqwest_client: State<'_, reqwest::Client>,
) -> Result<TwitchDeviceCodeResponse, AppError> {
    twitch_bot_service.get_device_code(&reqwest_client).await
}
