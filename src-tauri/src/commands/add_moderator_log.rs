use database::{DatabaseService, ModeratorsLogsRepository};
use entity::moderators_logs::*;
use model::error::AppError;
use tauri::State;

#[tauri::command]
pub async fn add_moderator_log(
    database_service: State<'_, DatabaseService>,
    moderator_log: Model,
) -> Result<(), AppError> {
    database_service.add_moderator_log(moderator_log).await
}
