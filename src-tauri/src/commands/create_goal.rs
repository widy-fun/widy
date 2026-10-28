use crate::services::WebSocketBroadcaster;
use database::{DatabaseService, GoalsRepository};
use entity::goals::*;
use model::error::AppError;
use model::events::{AppEvent, EventMessage};
use tauri::{AppHandle, Manager, State};

#[tauri::command]
pub async fn create_goal(
    app: AppHandle,
    database_service: State<'_, DatabaseService>,
    goal: Model,
) -> Result<(), AppError> {
    database_service.create_goal(goal.clone()).await?;

    let websocket_broadcaster = app.state::<WebSocketBroadcaster>();
    websocket_broadcaster.broadcast_event_message(&EventMessage {
        event: AppEvent::Goal,
        data: goal,
    });
    Ok(())
}
