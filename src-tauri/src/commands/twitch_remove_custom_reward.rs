use crate::services::twitch::{TwitchApi, TwitchService};
use model::error::AppError;
use tauri::{AppHandle, State};
use uuid::Uuid;

#[tauri::command]
pub async fn twitch_remove_custom_reward(
    app: AppHandle,
    twitch_service: State<'_, TwitchService>,
    id: Uuid,
) -> Result<(), AppError> {
    twitch_service.remove_custom_reward(&app, id).await?;
    Ok(())
}
