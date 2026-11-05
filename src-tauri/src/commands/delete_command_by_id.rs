use crate::services::CommandsService;
use database::{CommandsRepository, DatabaseService};
use model::error::AppError;
use tauri::State;
use uuid::Uuid;

#[tauri::command]
pub async fn delete_command_by_id(
    database_service: State<'_, DatabaseService>,
    commands_service: State<'_, CommandsService>,
    id: Uuid,
) -> Result<(), AppError> {
    commands_service.remove_timer(id);
    database_service.delete_command_by_id(id).await?;
    let commands = database_service.get_commands().await?;
    *commands_service.commands.lock().unwrap() = commands;
    Ok(())
}
