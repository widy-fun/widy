use crate::{
    error::AppError, repositories::AssistantSettingsRepository, services::DatabaseService,
};
use entity::assistant_settings::*;
use tauri::State;

#[tauri::command]
pub async fn update_assistant_settings(
    database_service: State<'_, DatabaseService>,
    assistant_settings: Model,
) -> Result<(), AppError> {
    database_service
        .update_assistant_settings(assistant_settings.clone())
        .await
}
