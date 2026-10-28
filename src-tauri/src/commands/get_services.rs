use database::{DatabaseService, ServicesRepository};
use entity::services::*;
use model::error::AppError;
use tauri::State;

#[tauri::command]
pub async fn get_services(
    database_service: State<'_, DatabaseService>,
) -> Result<Vec<Model>, AppError> {
    database_service.get_services().await
}
