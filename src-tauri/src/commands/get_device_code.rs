use tauri::State;

use crate::services::twitch::{traits::TwitchApi, TwitchDeviceCodeResponse, TwitchService};

#[tauri::command]
pub async fn get_device_code(
    twitch_service: State<'_, TwitchService>,
    reqwest_client: State<'_, reqwest::Client>,
) -> Result<TwitchDeviceCodeResponse, String> {
    let device_code_response = twitch_service.get_device_code(&reqwest_client).await?;

    Ok(device_code_response)
}
