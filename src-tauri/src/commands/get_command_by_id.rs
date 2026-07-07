use crate::{repositories::CommandsRepository, services::DatabaseService};
use entity::commands::*;
use tauri::State;

#[tauri::command]
pub async fn get_command_by_id(
    database_service: State<'_, DatabaseService>,
    id: String,
) -> Result<Option<Model>, String> {
    database_service.get_command_by_id(&id).await
}
