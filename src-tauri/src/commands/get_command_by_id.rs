use crate::{repositories::CommandsRepository, services::DatabaseService};
use entity::commands::*;
use tauri::State;
use uuid::Uuid;

#[tauri::command]
pub async fn get_command_by_id(
    database_service: State<'_, DatabaseService>,
    id: Uuid,
) -> Result<Option<Command>, String> {
    database_service.get_command_by_id(id).await
}
