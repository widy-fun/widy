use entity::alerts::*;
use tauri::State;

use crate::{repositories::AlertsRepository, services::DatabaseService};

#[tauri::command]
pub async fn create_alert(
    database_service: State<'_, DatabaseService>,
    alert: Model,
) -> Result<(), String> {
    database_service.create_alert(alert).await
}
