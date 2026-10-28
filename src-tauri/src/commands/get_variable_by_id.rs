use database::{DatabaseService, VariablesRepository};
use entity::variables::*;
use model::error::AppError;
use tauri::State;
use uuid::Uuid;

#[tauri::command]
pub async fn get_variable_by_id(
    database_service: State<'_, DatabaseService>,
    id: Uuid,
) -> Result<Option<Model>, AppError> {
    database_service.get_variable_by_id(id).await
}
