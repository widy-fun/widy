use tauri::{AppHandle, State};
use uuid::Uuid;

use crate::{
    error::AppError,
    services::twitch::{TwitchApi, TwitchService},
};

#[tauri::command]
pub async fn twitch_remove_custom_reward(
    app: AppHandle,
    twitch_service: State<'_, TwitchService>,
    id: Uuid,
) -> Result<(), AppError> {
    twitch_service.remove_custom_reward(&app, id).await?;
    Ok(())
}
