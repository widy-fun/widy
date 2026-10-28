use crate::{
    services::ConfigService,
    utils::{download_widget, validate_csp},
};
use database::{DatabaseService, WidgetsRepository};
use entity::widgets::Manifest;
use model::error::AppError;
use tauri::State;
use uuid::Uuid;

#[tauri::command]
pub async fn update_widget(
    reqwest_client: State<'_, reqwest::Client>,
    config_service: State<'_, ConfigService>,
    database_service: State<'_, DatabaseService>,
    manifest: Manifest,
    id: Uuid,
) -> Result<(), AppError> {
    validate_csp(manifest.csp.clone(), false)?;
    download_widget(&reqwest_client, &config_service, &manifest, id).await?;
    database_service.update_widget(manifest, id).await?;
    Ok(())
}
