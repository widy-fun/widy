use std::time::Duration;

use entity::commands::*;
use tauri::{AppHandle, State};

use crate::{
    repositories::CommandsRepository,
    services::{CommandsService, DatabaseService},
};

#[tauri::command]
pub async fn create_command(
    app: AppHandle,
    database_service: State<'_, DatabaseService>,
    commands_service: State<'_, CommandsService>,
    command: Command,
) -> Result<(), String> {
    database_service.create_command(command.clone()).await?;
    if let Some(timer) = command.clone().timer {
        commands_service.add_timer(
            app,
            Duration::from_mins(timer.mins_passed),
            command.id,
            CommandsService::on_timer_tick,
        );
    };
    Ok(())
}
