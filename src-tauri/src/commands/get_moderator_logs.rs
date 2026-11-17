use database::{DatabaseService, ModeratorsLogsRepository};
use entity::moderators_logs::*;
use model::error::AppError;
use tauri::State;
use uuid::Uuid;

#[tauri::command]
pub async fn get_moderator_logs(
    database_service: State<'_, DatabaseService>,
    id: Uuid,
    limit: u64,
    offset: u64,
) -> Result<Vec<Model>, AppError> {
    database_service
        .get_moderator_logs(id, &limit, &offset)
        .await
}
