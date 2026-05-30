use tauri::State;

use crate::services::NsfwService;

#[tauri::command]
pub fn stop_nsfw(nsfw_service: State<'_, NsfwService>) -> Result<(), String> {
    nsfw_service.stop()
}
