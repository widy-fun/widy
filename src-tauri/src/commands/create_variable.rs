use database::{DatabaseService, VariablesRepository};
use entity::variables::Model;
use model::error::AppError;
use tauri::State;

#[tauri::command]
pub async fn create_variable(
    database_service: State<'_, DatabaseService>,
    variable: Model,
) -> Result<(), AppError> {
    database_service.create_variable(variable).await
}
