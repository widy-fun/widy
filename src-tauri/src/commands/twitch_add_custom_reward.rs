use entity::services::ServiceType;
use tauri::{AppHandle, State};

use crate::{
    error::AppError,
    services::twitch::{TwitchService, traits::TwitchApi},
};

#[tauri::command]
pub async fn twitch_add_custom_reward(
    app: AppHandle,
    twitch_service: State<'_, TwitchService>,
    reward: entity::rewards::Reward,
) -> Result<(), AppError> {
    let auth = twitch_service.get_auth(&app, ServiceType::Twitch).await?;
    twitch_service
        .add_custom_reward(&app, &auth, &reward)
        .await?;

    return Ok(());
}
