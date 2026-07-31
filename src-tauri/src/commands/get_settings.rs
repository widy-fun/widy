use crate::{error::AppError, repositories::SettingsRepository, services::DatabaseService};
use entity::settings::*;
use tauri::State;

#[tauri::command]
pub async fn get_settings(
    database_service: State<'_, DatabaseService>,
) -> Result<Option<Model>, AppError> {
    database_service.get_settings().await
}
