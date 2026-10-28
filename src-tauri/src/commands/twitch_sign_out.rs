use crate::services::twitch::{TwitchApi, TwitchService};
use model::error::AppError;
use tauri::{AppHandle, State};

#[tauri::command]
pub async fn twitch_sign_out(
    app: AppHandle,
    twitch_service: State<'_, TwitchService>,
) -> Result<(), AppError> {
    twitch_service.sign_out(&app).await?;
    Ok(())
}
