use database::{CommandsRepository, DatabaseService};
use entity::commands::*;
use model::error::AppError;
use tauri::State;
use uuid::Uuid;

#[tauri::command]
pub async fn get_command_by_id(
    database_service: State<'_, DatabaseService>,
    id: Uuid,
) -> Result<Option<Command>, AppError> {
    database_service.get_command_by_id(id).await
}
