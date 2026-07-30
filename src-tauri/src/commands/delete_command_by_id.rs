use tauri::State;
use uuid::Uuid;

use crate::{
    error::AppError,
    repositories::CommandsRepository,
    services::{CommandsService, DatabaseService},
};

#[tauri::command]
pub async fn delete_command_by_id(
    database_service: State<'_, DatabaseService>,
    commands_service: State<'_, CommandsService>,
    id: Uuid,
) -> Result<(), AppError> {
    commands_service.remove_timer(id);
    let _ = database_service.delete_command_by_id(id).await;
    let commands = database_service.get_commands().await?;
    *commands_service.commands.lock().unwrap() = commands;
    Ok(())
}
