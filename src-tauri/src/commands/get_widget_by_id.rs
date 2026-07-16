use crate::{repositories::WidgetsRepository, services::DatabaseService};
use entity::widgets::*;
use tauri::State;
use uuid::Uuid;

#[tauri::command]
pub async fn get_widget_by_id(
    database_service: State<'_, DatabaseService>,
    id: Uuid,
) -> Result<Option<Model>, String> {
    database_service.get_widget_by_id(id).await
}
