use tauri::State;
use uuid::Uuid;

use crate::{error::AppError, repositories::AlertsRepository, services::DatabaseService};

#[tauri::command]
pub async fn delete_alert_by_id(
    database_service: State<'_, DatabaseService>,
    id: Uuid,
) -> Result<(), AppError> {
    database_service.delete_alert_by_id(id).await
}
