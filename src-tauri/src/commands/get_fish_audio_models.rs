use crate::services::fish_audio::{FishAudioService, fish_audio_api::FishAudioApi};
use model::error::AppError;
use model::fish_audio::{FishAudioListModelsFilter, FishAudioListModelsResponse};
use tauri::{AppHandle, State};

#[tauri::command]
pub async fn get_fish_audio_models(
    app: AppHandle,
    fish_audio_service: State<'_, FishAudioService>,
    page_size: u64,
    page_number: u64,
    filter: FishAudioListModelsFilter,
) -> Result<Option<FishAudioListModelsResponse>, AppError> {
    fish_audio_service
        .get_models(&app, page_size, page_number, filter)
        .await
}
