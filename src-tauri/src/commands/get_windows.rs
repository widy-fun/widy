use crate::services::{NsfwService, WindowInfo};
use model::error::AppError;
use tauri::State;

#[tauri::command]
pub async fn get_windows(
    nsfw_service: State<'_, NsfwService>,
) -> Result<Vec<WindowInfo>, AppError> {
    nsfw_service.get_windows().await
}
