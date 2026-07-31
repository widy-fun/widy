use entity::alerts::*;
use tauri::State;

use crate::{
    error::AppError,
    repositories::AlertsRepository,
    services::{AppEvent, DatabaseService, EventMessage, WebSocketBroadcaster},
};

#[tauri::command]
pub async fn update_alert_settings(
    database_service: State<'_, DatabaseService>,
    websocket_broadcaster: State<'_, WebSocketBroadcaster>,
    alert: Model,
) -> Result<(), AppError> {
    database_service
        .update_alert_settings(alert.clone())
        .await?;
    websocket_broadcaster.broadcast_event_message(&EventMessage {
        event: AppEvent::UpdateAlert,
        data: alert,
    });
    Ok(())
}
