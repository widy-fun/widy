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
    twitch_service.add_custom_reward(&app, &reward).await?;
    return Ok(());
}
