use tauri::State;
use uuid::Uuid;

use crate::{error::AppError, repositories::GoalsRepository, services::DatabaseService};

#[tauri::command]
pub async fn finish_goal(
    database_service: State<'_, DatabaseService>,
    id: Uuid,
) -> Result<(), AppError> {
    database_service.finish_goal(id).await
}
