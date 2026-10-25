use model::twitch::TwitchDeviceCodeResponse;
use tauri::State;

use crate::{
    error::AppError,
    services::twitch::{TwitchApi, TwitchService},
};

#[tauri::command]
pub async fn get_device_code(
    twitch_service: State<'_, TwitchService>,
) -> Result<TwitchDeviceCodeResponse, AppError> {
    let device_code_response = twitch_service.get_device_code().await?;
    Ok(device_code_response)
}
