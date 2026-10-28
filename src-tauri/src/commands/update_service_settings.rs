use database::{DatabaseService, ServicesRepository};
use entity::services::{ServiceExtra, ServiceType};
use model::error::AppError;
use tauri::State;

#[tauri::command]
pub async fn update_service_settings(
    database_service: State<'_, DatabaseService>,
    id: ServiceType,
    settings: ServiceExtra,
) -> Result<(), AppError> {
    database_service.update_service_settings(id, settings).await
}
