use std::io::Cursor;

use hound::{SampleFormat, WavSpec, WavWriter};

use crate::error::AppError;

pub fn audio_to_wav_bytes(audio: &[f32], sample_rate: u32) -> Result<Vec<u8>, AppError> {
    let spec = WavSpec {
        channels: 1,
        sample_rate,
        bits_per_sample: 32,
        sample_format: SampleFormat::Float,
    };

    let mut cursor = Cursor::new(Vec::new());
    {
        let mut writer = WavWriter::new(&mut cursor, spec)
            .map_err(|e| AppError::Piper(format!("Failed to create WAV writer: {e}")))?;

        for &sample in audio {
            writer
                .write_sample(sample)
                .map_err(|e| AppError::Piper(format!("Failed to write sample: {e}")))?;
        }

        writer
            .finalize()
            .map_err(|e| AppError::Piper(format!("Failed to finalize WAV file: {e}")))?;
    }

    Ok(cursor.into_inner())
}
