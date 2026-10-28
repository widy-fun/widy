use crate::services::NsfwService;
use model::error::AppError;
use tauri::State;

#[tauri::command]
pub fn stop_nsfw(nsfw_service: State<'_, NsfwService>) -> Result<(), AppError> {
    nsfw_service.stop()
}
