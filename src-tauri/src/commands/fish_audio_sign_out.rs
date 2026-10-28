use crate::services::fish_audio::FishAudioService;
use model::error::AppError;
use tauri::{AppHandle, State};

#[tauri::command]
pub async fn fish_audio_sign_out(
    app: AppHandle,
    fish_audio_service: State<'_, FishAudioService>,
) -> Result<(), AppError> {
    fish_audio_service.sign_out(&app).await
}
