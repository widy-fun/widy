use database::{CommandsRepository, DatabaseService};
use entity::commands::*;
use model::error::AppError;
use tauri::State;

#[tauri::command]
pub async fn get_commands(
    database_service: State<'_, DatabaseService>,
) -> Result<Vec<Command>, AppError> {
    database_service.get_commands().await
}
