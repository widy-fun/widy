use crate::{error::AppError, repositories::VariablesRepository, services::DatabaseService};
use entity::variables::Model;
use tauri::State;

#[tauri::command]
pub async fn update_variable(
    database_service: State<'_, DatabaseService>,
    variable: Model,
) -> Result<(), AppError> {
    database_service.update_variable(variable).await
}
