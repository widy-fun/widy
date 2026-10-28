use database::{DatabaseService, WidgetsRepository};
use entity::widgets::*;
use model::error::AppError;
use tauri::State;

#[tauri::command]
pub async fn get_widgets(
    database_service: State<'_, DatabaseService>,
) -> Result<Vec<Model>, AppError> {
    database_service.get_widgets().await
}
