use entity::widgets::Manifest;
use tauri::State;
use uuid::Uuid;

use crate::{
    error::AppError,
    repositories::WidgetsRepository,
    services::{ConfigService, DatabaseService},
    utils::{download_widget, validate_csp},
};

#[tauri::command]
pub async fn install_widget(
    reqwest_client: State<'_, reqwest::Client>,
    config_service: State<'_, ConfigService>,
    database_service: State<'_, DatabaseService>,
    manifest: Manifest,
) -> Result<(), AppError> {
    validate_csp(manifest.csp.clone(), false)?;
    let id = Uuid::new_v4();
    download_widget(&reqwest_client, &config_service, &manifest, id).await?;
    database_service.add_widget(None, manifest, id).await?;
    Ok(())
}
