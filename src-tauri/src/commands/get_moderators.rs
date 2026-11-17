use database::{DatabaseService, ModeratorsRepository};
use entity::moderators::*;
use model::error::AppError;
use tauri::State;

#[tauri::command]
pub async fn get_moderators(
    database_service: State<'_, DatabaseService>,
) -> Result<Vec<Model>, AppError> {
    database_service.get_moderators().await
}
