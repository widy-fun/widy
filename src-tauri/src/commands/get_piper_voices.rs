use crate::{
    error::AppError,
    services::tts::{PiperTts, TtsService},
};
use entity::tts::PiperVoice;
use tauri::State;

#[tauri::command]
pub async fn get_piper_voices(
    tts_service: State<'_, TtsService>,
) -> Result<Vec<PiperVoice>, AppError> {
    tts_service.get_piper_voices()
}
