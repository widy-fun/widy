use crate::{error::AppError, repositories::GoalsRepository, services::DatabaseService};
use entity::goals::*;
use tauri::State;

#[tauri::command]
pub async fn get_not_ended_goals(
    database_service: State<'_, DatabaseService>,
) -> Result<Vec<Model>, AppError> {
    database_service.get_not_ended_goals().await
}
