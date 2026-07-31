use tauri::State;

use crate::{
    error::AppError,
    services::{NsfwService, WindowInfo},
};

#[tauri::command]
pub async fn get_windows(
    nsfw_service: State<'_, NsfwService>,
) -> Result<Vec<WindowInfo>, AppError> {
    nsfw_service.get_windows().await
}
