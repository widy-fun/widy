use crate::{repositories::CommandsRepository, services::DatabaseService};
use entity::commands::*;
use tauri::State;

#[tauri::command]
pub async fn update_command(
    database_service: State<'_, DatabaseService>,
    command: Model,
) -> Result<(), String> {
    database_service.update_command(command).await
}
