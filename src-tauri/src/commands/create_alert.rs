use database::{AlertsRepository, DatabaseService};
use entity::alerts::*;
use model::error::AppError;
use tauri::State;

#[tauri::command]
pub async fn create_alert(
    database_service: State<'_, DatabaseService>,
    alert: Model,
) -> Result<(), AppError> {
    database_service.create_alert(alert).await
}
