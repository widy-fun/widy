use entity::widgets;
use tauri::State;
use tokio::fs;

use crate::{
    error::AppError,
    repositories::WidgetsRepository,
    services::{ConfigService, DatabaseService},
    utils::log_and_wrap_error,
};

#[tauri::command]
pub async fn delete_widget(
    database_service: State<'_, DatabaseService>,
    config_service: State<'_, ConfigService>,
    widget: widgets::Model,
) -> Result<(), AppError> {
    database_service
        .delete_widget_by_id(widget.id.clone())
        .await?;
    if widget.dev_path.is_none() {
        fs::remove_dir_all(
            config_service
                .widgets_path
                .join(widget.manifest.id.to_string())
                .join(widget.id.to_string()),
        )
        .await
        .map_err(|e| log_and_wrap_error("Remove widget dir error", e))?;
    }
    Ok(())
}
