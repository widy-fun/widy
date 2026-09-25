use tauri::{AppHandle, State};

use crate::{error::AppError, services::fish_audio::FishAudioService};

#[tauri::command]
pub async fn fish_audio_sign_out(
    app: AppHandle,
    fish_audio_service: State<'_, FishAudioService>,
) -> Result<(), AppError> {
    fish_audio_service.sign_out(&app).await
}
