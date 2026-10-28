use crate::services::WebSocketBroadcaster;
use database::{AucFighterSettingsRepository, DatabaseService};
use entity::auc_fighter_settings::*;
use model::error::AppError;
use model::events::{AppEvent, EventMessage};
use tauri::{AppHandle, Manager, State};

#[tauri::command]
pub async fn update_auc_fighter_settings(
    app: AppHandle,
    database_service: State<'_, DatabaseService>,
    auc_fighter_settings: Model,
) -> Result<(), AppError> {
    database_service
        .update_auc_fighter_settings(auc_fighter_settings.clone())
        .await?;
    let websocket_broadcaster = app.state::<WebSocketBroadcaster>();
    websocket_broadcaster.broadcast_event_message(&EventMessage {
        event: AppEvent::AucFighterSettings,
        data: auc_fighter_settings,
    });
    Ok(())
}
