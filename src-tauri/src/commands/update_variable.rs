use database::{DatabaseService, VariablesRepository};
use entity::variables::Model;
use model::error::AppError;
use tauri::State;

#[tauri::command]
pub async fn update_variable(
    database_service: State<'_, DatabaseService>,
    variable: Model,
) -> Result<(), AppError> {
    database_service.update_variable(variable).await
}
