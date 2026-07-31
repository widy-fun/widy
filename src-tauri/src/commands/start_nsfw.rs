use crate::{
    error::AppError,
    services::{NsfwService, WindowInfo},
};
use tauri::{AppHandle, State};

#[tauri::command]
pub async fn start_nsfw(
    app: AppHandle,
    nsfw_service: State<'_, NsfwService>,
    window_info: WindowInfo,
) -> Result<(), AppError> {
    nsfw_service.start(app, window_info).await
}
