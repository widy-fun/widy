use crate::{error::AppError, repositories::GoalsRepository, services::DatabaseService};
use entity::goals::*;
use tauri::State;

#[tauri::command]
pub async fn get_not_ended_goal(
    database_service: State<'_, DatabaseService>,
    r#type: GoalType,
) -> Result<Option<Model>, AppError> {
    database_service.get_not_ended_goal(r#type).await
}
