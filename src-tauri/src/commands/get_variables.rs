use database::{DatabaseService, VariablesRepository};
use entity::variables::*;
use model::error::AppError;
use tauri::State;

#[tauri::command]
pub async fn get_variables(
    database_service: State<'_, DatabaseService>,
) -> Result<Vec<Variable>, AppError> {
    database_service.get_variables().await
}
