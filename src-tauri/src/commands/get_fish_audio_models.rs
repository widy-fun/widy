use crate::{
    error::AppError,
    services::fish_audio::{
        FishAudioService,
        models::{FishAudioListModelsFilter, FishAudioListModelsResponse},
        traits::FishAudioApi,
    },
};
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
