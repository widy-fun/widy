use crate::{error::AppError, repositories::WidgetsRepository, services::DatabaseService};
use entity::widgets::*;
use tauri::State;

#[tauri::command]
pub async fn get_widgets(
    database_service: State<'_, DatabaseService>,
) -> Result<Vec<Model>, AppError> {
    database_service.get_widgets().await
}
