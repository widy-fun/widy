use tauri::State;

use crate::{
    error::AppError,
    services::twitch::{TwitchDeviceCodeResponse, TwitchService, traits::TwitchApi},
};

#[tauri::command]
pub async fn get_device_code(
    twitch_service: State<'_, TwitchService>,
    reqwest_client: State<'_, reqwest::Client>,
) -> Result<TwitchDeviceCodeResponse, AppError> {
    let device_code_response = twitch_service.get_device_code(&reqwest_client).await?;
    Ok(device_code_response)
}
