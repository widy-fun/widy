use tauri::State;

use crate::{error::AppError, services::NsfwService};

#[tauri::command]
pub fn stop_nsfw(nsfw_service: State<'_, NsfwService>) -> Result<(), AppError> {
    nsfw_service.stop()
}
