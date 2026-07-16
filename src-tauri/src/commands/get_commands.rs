use crate::{repositories::CommandsRepository, services::DatabaseService};
use entity::commands::*;
use tauri::State;

#[tauri::command]
pub async fn get_commands(
    database_service: State<'_, DatabaseService>,
) -> Result<Vec<Command>, String> {
    database_service.get_commands().await
}
