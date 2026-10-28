use database::{DatabaseService, SettingsRepository};
use entity::settings::*;
use model::error::AppError;
use tauri::State;

#[tauri::command]
pub async fn get_settings(
    database_service: State<'_, DatabaseService>,
) -> Result<Option<Model>, AppError> {
    database_service.get_settings().await
}
