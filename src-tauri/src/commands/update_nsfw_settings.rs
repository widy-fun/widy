use crate::services::WebSocketBroadcaster;
use database::{DatabaseService, NsfwRepository};
use entity::nsfw_settings::*;
use model::error::AppError;
use model::events::{AppEvent, EventMessage};
use tauri::{AppHandle, Manager, State};

#[tauri::command]
pub async fn update_nsfw_settings(
    app: AppHandle,
    database_service: State<'_, DatabaseService>,
    nsfw_settings: Model,
) -> Result<(), AppError> {
    database_service
        .update_nsfw_settings(nsfw_settings.clone())
        .await?;
    let websocket_broadcaster = app.state::<WebSocketBroadcaster>();
    websocket_broadcaster.broadcast_event_message(&EventMessage {
        event: AppEvent::NsfwSettings,
        data: nsfw_settings,
    });
    Ok(())
}
