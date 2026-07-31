use crate::{error::AppError, repositories::WidgetsRepository, services::DatabaseService};
use entity::widgets::*;
use tauri::State;
use uuid::Uuid;

#[tauri::command]
pub async fn get_widget_by_id(
    database_service: State<'_, DatabaseService>,
    id: Uuid,
) -> Result<Option<Model>, AppError> {
    database_service.get_widget_by_id(id).await
}
