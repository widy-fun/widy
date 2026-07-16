use tauri::State;
use uuid::Uuid;

use crate::{
    repositories::CommandsRepository,
    services::{CommandsService, DatabaseService},
};

#[tauri::command]
pub async fn delete_command_by_id(
    database_service: State<'_, DatabaseService>,
    commands_service: State<'_, CommandsService>,
    id: Uuid,
) -> Result<(), String> {
    commands_service.remove_timer(id);
    database_service.delete_command_by_id(id).await
}
