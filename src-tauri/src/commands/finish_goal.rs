use database::{DatabaseService, GoalsRepository};
use model::error::AppError;
use tauri::State;
use uuid::Uuid;

#[tauri::command]
pub async fn finish_goal(
    database_service: State<'_, DatabaseService>,
    id: Uuid,
) -> Result<(), AppError> {
    database_service.finish_goal(id).await
}
