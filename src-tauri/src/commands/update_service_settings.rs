use crate::{error::AppError, repositories::ServicesRepository, services::DatabaseService};
use entity::services::{ServiceSettings, ServiceType};
use tauri::State;

#[tauri::command]
pub async fn update_service_settings(
    database_service: State<'_, DatabaseService>,
    id: ServiceType,
    settings: ServiceSettings,
) -> Result<(), AppError> {
    database_service.update_service_settings(id, settings).await
}
