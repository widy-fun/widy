use database::{DatabaseService, ModeratorsRepository};
use entity::moderators::Model;
use model::error::AppError;
use tauri::State;

#[tauri::command]
pub async fn create_moderator(
    database_service: State<'_, DatabaseService>,
    moderator: Model,
) -> Result<(), AppError> {
    database_service.create_moderator(moderator).await
}
