use database::{DatabaseService, MediaSettingsRepository};
use entity::media_settings::*;
use model::error::AppError;
use tauri::State;

#[tauri::command]
pub async fn get_media_settings(
    database_service: State<'_, DatabaseService>,
) -> Result<Option<Model>, AppError> {
    database_service.get_media_settings().await
}
