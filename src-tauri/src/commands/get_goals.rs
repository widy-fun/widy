use crate::{error::AppError, repositories::GoalsRepository, services::DatabaseService};
use entity::goals::*;
use tauri::State;

#[tauri::command]
pub async fn get_goals(
    database_service: State<'_, DatabaseService>,
    limit: u64,
    offset: u64,
) -> Result<Vec<Model>, AppError> {
    database_service.get_goals(limit, offset).await
}
