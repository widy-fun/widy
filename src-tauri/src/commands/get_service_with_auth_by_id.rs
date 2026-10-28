use database::{DatabaseService, ServicesRepository};
use entity::services::*;
use model::error::AppError;
use tauri::State;

#[tauri::command]
pub async fn get_service_with_auth_by_id(
    database_service: State<'_, DatabaseService>,
    id: ServiceType,
) -> Result<Option<Model>, AppError> {
    database_service.get_service_with_auth_by_id(id).await
}
