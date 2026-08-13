use crate::{
    error::AppError,
    services::tts::{TtsService, models::PiperVoices, traits::PiperTts},
};
use tauri::State;

#[tauri::command]
pub async fn get_piper_voices(tts_service: State<'_, TtsService>) -> Result<PiperVoices, AppError> {
    tts_service.get_piper_voices()
}
