use database::{AlertsRepository, DatabaseService};
use entity::alerts::*;
use model::error::AppError;
use tauri::State;
use uuid::Uuid;

#[tauri::command]
pub async fn get_alert_by_id(
    database_service: State<'_, DatabaseService>,
    id: Uuid,
) -> Result<Option<Alert>, AppError> {
    database_service.get_alert_by_id(id).await
}
