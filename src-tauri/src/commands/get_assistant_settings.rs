use database::{AssistantSettingsRepository, DatabaseService};
use entity::assistant_settings::*;
use model::error::AppError;
use tauri::State;

#[tauri::command]
pub async fn get_assistant_settings(
    database_service: State<'_, DatabaseService>,
) -> Result<Option<Model>, AppError> {
    database_service.get_assistant_settings().await
}
