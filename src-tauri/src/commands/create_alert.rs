use entity::alerts::*;
use tauri::State;

use crate::{error::AppError, repositories::AlertsRepository, services::DatabaseService};

#[tauri::command]
pub async fn create_alert(
    database_service: State<'_, DatabaseService>,
    alert: Model,
) -> Result<(), AppError> {
    database_service.create_alert(alert).await
}
