use crate::{error::AppError, repositories::VariablesRepository, services::DatabaseService};
use entity::variables::*;
use tauri::State;

#[tauri::command]
pub async fn get_variables(
    database_service: State<'_, DatabaseService>,
) -> Result<Vec<Variable>, AppError> {
    database_service.get_variables().await
}
