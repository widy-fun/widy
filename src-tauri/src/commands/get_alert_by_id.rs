use crate::{error::AppError, repositories::AlertsRepository, services::DatabaseService};
use entity::alerts::*;
use tauri::State;
use uuid::Uuid;

#[tauri::command]
pub async fn get_alert_by_id(
    database_service: State<'_, DatabaseService>,
    id: Uuid,
) -> Result<Option<Alert>, AppError> {
    database_service.get_alert_by_id(id).await
}
