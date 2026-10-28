use database::{DatabaseService, ServicesRepository};
use entity::services::*;
use model::error::AppError;
use tauri::State;

#[tauri::command]
pub async fn update_service_auth(
    database_service: State<'_, DatabaseService>,
    id: ServiceType,
    auth: Option<ServiceAuth>,
    authorized: bool,
) -> Result<(), AppError> {
    database_service
        .update_service_auth(id, auth, authorized)
        .await
}
