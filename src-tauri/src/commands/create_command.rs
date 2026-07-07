use entity::commands::*;
use tauri::State;

use crate::{repositories::CommandsRepository, services::DatabaseService};

#[tauri::command]
pub async fn create_command(
    database_service: State<'_, DatabaseService>,
    command: Model,
) -> Result<(), String> {
    database_service.create_command(command).await
}
