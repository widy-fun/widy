use database::{DatabaseService, ModeratorsRepository};
use entity::moderators::Model;
use model::error::AppError;
use tauri::State;

#[tauri::command]
pub async fn update_moderator(
    database_service: State<'_, DatabaseService>,
    moderator: Model,
) -> Result<(), AppError> {
    database_service.update_moderator(moderator).await
}
