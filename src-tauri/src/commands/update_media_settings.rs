use crate::services::WebSocketBroadcaster;
use database::{DatabaseService, MediaSettingsRepository};
use entity::media_settings::*;
use model::error::AppError;
use model::events::{AppEvent, EventMessage};
use tauri::{AppHandle, Manager, State};

#[tauri::command]
pub async fn update_media_settings(
    app: AppHandle,
    database_service: State<'_, DatabaseService>,
    media_settings: Model,
) -> Result<(), AppError> {
    database_service
        .update_media_settings(media_settings.clone())
        .await?;
    let websocket_broadcaster = app.state::<WebSocketBroadcaster>();
    websocket_broadcaster.broadcast_event_message(&EventMessage {
        event: AppEvent::MediaSettings,
        data: media_settings,
    });
    Ok(())
}
