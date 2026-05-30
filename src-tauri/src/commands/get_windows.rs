use tauri::State;

use crate::services::{NsfwService, WindowInfo};

#[tauri::command]
pub async fn get_windows(nsfw_service: State<'_, NsfwService>) -> Result<Vec<WindowInfo>, String> {
    nsfw_service.get_windows().await
}
