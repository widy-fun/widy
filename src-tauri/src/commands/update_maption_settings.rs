use database::{DatabaseService, MaptionSettingsRepository};
use entity::maption_settings::*;
use model::error::AppError;
use tauri::State;

#[tauri::command]
pub async fn update_maption_settings(
    database_service: State<'_, DatabaseService>,
    maption_settings: Model,
) -> Result<(), AppError> {
    database_service
        .update_maption_settings(maption_settings.clone())
        .await
}
