use database::{DatabaseService, ModeratorsRepository};
use entity::moderators::*;
use model::error::AppError;
use tauri::State;
use uuid::Uuid;

#[tauri::command]
pub async fn get_moderator_by_id(
    database_service: State<'_, DatabaseService>,
    id: Uuid,
) -> Result<Option<Model>, AppError> {
    database_service.get_moderator_by_id(id).await
}
