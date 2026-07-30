use tauri::{AppHandle, Manager, path::BaseDirectory};

use crate::error::AppError;

pub fn resolve_path(
    app: &AppHandle,
    path: impl AsRef<std::path::Path>,
    base: BaseDirectory,
    label: &str,
) -> Result<std::path::PathBuf, AppError> {
    app.path()
        .resolve(path, base)
        .map_err(|e| AppError::Config(format!("Failed to resolve {} path: {}", label, e)))
}
