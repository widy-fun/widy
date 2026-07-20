use std::time::Duration;

use crate::{
    repositories::CommandsRepository,
    services::{CommandsService, DatabaseService},
};
use entity::commands::*;
use tauri::{AppHandle, State};

#[tauri::command]
pub async fn update_command(
    app: AppHandle,
    database_service: State<'_, DatabaseService>,
    commands_service: State<'_, CommandsService>,
    command: Command,
) -> Result<(), String> {
    if let Command {
        timer: Some(timer), ..
    } = command.clone()
    {
        if command.is_enabled && !commands_service.is_timer_run(command.id) {
            commands_service.add_timer(
                app,
                Duration::from_mins(timer.mins_passed),
                command.id,
                CommandsService::on_timer_tick,
            );
        } else {
            commands_service.remove_timer(command.id);
        }
    };
    let _ = database_service.update_command(command).await;
    let commands = database_service.get_commands().await?;
    *commands_service.commands.lock().unwrap() = commands;
    Ok(())
}
