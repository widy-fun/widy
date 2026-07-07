use entity::services::{ServiceAuth, ServiceType};
use tauri::State;

use crate::{
    repositories::ServicesRepository,
    services::{
        twitch::{traits::TwitchApi, TwitchBotService},
        DatabaseService,
    },
};

#[tauri::command]
pub async fn get_twitch_bot_token(
    twitch_bot_service: State<'_, TwitchBotService>,
    database_service: State<'_, DatabaseService>,
    reqwest_client: State<'_, reqwest::Client>,
    device_code: String,
) -> Result<(), String> {
    let auth = twitch_bot_service
        .get_token(device_code, &reqwest_client)
        .await?;
    database_service
        .update_service_auth(
            ServiceType::TwitchBot,
            Some(ServiceAuth::Twitch(auth)),
            true,
        )
        .await?;

    Ok(())
}
