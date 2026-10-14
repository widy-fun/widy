use crate::{error::AppError, repositories::VariablesRepository, services::DatabaseService};
use entity::variables::Model;
use tauri::State;

#[tauri::command]
pub async fn create_variable(
    database_service: State<'_, DatabaseService>,
    variable: Model,
) -> Result<(), AppError> {
    database_service.create_variable(variable).await
}
