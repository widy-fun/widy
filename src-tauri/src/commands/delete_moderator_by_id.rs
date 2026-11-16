use database::{DatabaseService, ModeratorsRepository};
use model::error::AppError;
use tauri::State;
use uuid::Uuid;

#[tauri::command]
pub async fn delete_moderator_by_id(
    database_service: State<'_, DatabaseService>,
    id: Uuid,
) -> Result<(), AppError> {
    database_service.delete_moderator_by_id(id).await
}
