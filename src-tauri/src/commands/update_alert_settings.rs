use crate::services::WebSocketBroadcaster;
use database::{AlertsRepository, DatabaseService};
use entity::alerts::*;
use model::error::AppError;
use model::events::{AppEvent, EventMessage};
use tauri::State;

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
