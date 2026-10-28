use database::{DatabaseService, MaptionSettingsRepository};
use entity::maption_settings::*;
use model::error::AppError;
use tauri::State;

#[tauri::command]
pub async fn get_maption_settings(
    database_service: State<'_, DatabaseService>,
) -> Result<Option<Model>, AppError> {
    database_service.get_maption_settings().await
}
