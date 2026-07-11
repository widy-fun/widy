use crate::{repositories::AlertsRepository, services::DatabaseService};
use entity::alerts::*;
use tauri::State;

#[tauri::command]
pub async fn get_alerts(
    database_service: State<'_, DatabaseService>,
) -> Result<Vec<Alert>, String> {
    database_service.get_alerts().await
}
