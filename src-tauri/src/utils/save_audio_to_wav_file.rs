use crate::utils::audio_to_wav_bytes;
use model::error::AppError;

pub async fn save_audio_to_wav_file(
    audio: &[f32],
    sample_rate: u32,
    path: &str,
) -> Result<(), AppError> {
    let wav_bytes = audio_to_wav_bytes(audio, sample_rate)?;
    tokio::fs::write(path, wav_bytes)
        .await
        .map_err(|e| AppError::Piper(format!("Failed to write file: {e}")))
}
