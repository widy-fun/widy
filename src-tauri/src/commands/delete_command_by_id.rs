use tauri::State;

use crate::{repositories::CommandsRepository, services::DatabaseService};

#[tauri::command]
pub async fn delete_command_by_id(
    database_service: State<'_, DatabaseService>,
    id: String,
) -> Result<(), String> {
    database_service.delete_command_by_id(&id).await
}
