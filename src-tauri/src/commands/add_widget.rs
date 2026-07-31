use entity::widgets::Manifest;
use tauri::State;
use uuid::Uuid;

use crate::{
    error::AppError, repositories::WidgetsRepository, services::DatabaseService,
    utils::validate_csp,
};

#[tauri::command]
pub async fn add_widget(
    database_service: State<'_, DatabaseService>,
    dev_path: Option<String>,
    manifest: Manifest,
) -> Result<(), AppError> {
    validate_csp(manifest.csp.clone(), true)?;
    if let Some(dev_path) = dev_path.clone() {
        if let Some(_) = database_service
            .get_widget_by_dev_path(dev_path.clone())
            .await?
        {
            return Ok(());
        }
    }

    let id = Uuid::new_v4();
    database_service.add_widget(dev_path, manifest, id).await
}
