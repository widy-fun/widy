use crate::{
    error::AppError,
    repositories::SettingsRepository,
    services::{AppEvent, DatabaseService, EventMessage, WebSocketBroadcaster},
};
use entity::settings::*;
use tauri::{AppHandle, Manager, State};

#[tauri::command]
pub async fn update_settings(
    app: AppHandle,
    database_service: State<'_, DatabaseService>,
    settings: Model,
) -> Result<(), AppError> {
    database_service.update_settings(settings.clone()).await?;
    let websocket_broadcaster = app.state::<WebSocketBroadcaster>();
    websocket_broadcaster.broadcast_event_message(&EventMessage {
        event: AppEvent::Settings,
        data: settings,
    });
    Ok(())
}
