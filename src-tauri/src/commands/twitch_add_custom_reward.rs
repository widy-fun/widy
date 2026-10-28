use crate::services::twitch::{TwitchApi, TwitchService};
use model::error::AppError;
use tauri::{AppHandle, State};

#[tauri::command]
pub async fn twitch_add_custom_reward(
    app: AppHandle,
    twitch_service: State<'_, TwitchService>,
    reward: entity::rewards::Reward,
) -> Result<(), AppError> {
    twitch_service.add_custom_reward(&app, &reward).await?;
    Ok(())
}
