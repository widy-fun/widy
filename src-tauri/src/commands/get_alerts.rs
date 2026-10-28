use database::{AlertsRepository, DatabaseService};
use entity::alerts::*;
use model::error::AppError;
use tauri::State;

#[tauri::command]
pub async fn get_alerts(
    database_service: State<'_, DatabaseService>,
) -> Result<Vec<Alert>, AppError> {
    database_service.get_alerts().await
}
