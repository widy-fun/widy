use crate::{error::AppError, services::fish_audio::FishAudioService};
use tauri::{AppHandle, State};

#[tauri::command]
pub async fn fish_audio_connect(
    app: AppHandle,
    fish_audio_service: State<'_, FishAudioService>,
) -> Result<(), AppError> {
    fish_audio_service.connect(&app).await
}
