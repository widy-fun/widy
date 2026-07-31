use entity::services::ServiceType;
use tauri::{AppHandle, State};
use uuid::Uuid;

use crate::{
    error::AppError,
    services::twitch::{TwitchService, traits::TwitchApi},
};

#[tauri::command]
pub async fn twitch_remove_custom_reward(
    app: AppHandle,
    twitch_service: State<'_, TwitchService>,
    id: Uuid,
) -> Result<(), AppError> {
    let auth = twitch_service.get_auth(&app, ServiceType::Twitch).await?;
    twitch_service.remove_custom_reward(&app, &auth, id).await?;

    return Ok(());
}
