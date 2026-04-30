use entity::widget::Manifest;
use tauri::State;

use crate::{
    repositories::WidgetsRepository,
    services::{ConfigService, DatabaseService},
    utils::download_widget,
};

#[tauri::command]
pub async fn update_widget(
    reqwest_client: State<'_, reqwest::Client>,
    config_service: State<'_, ConfigService>,
    database_service: State<'_, DatabaseService>,
    manifest: Manifest,
    id: String,
) -> Result<(), String> {
    download_widget(&reqwest_client, &config_service, &manifest, &id).await?;
    database_service.update_widget(manifest, id).await?;
    Ok(())
}
