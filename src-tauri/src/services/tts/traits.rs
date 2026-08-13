use std::{
    collections::HashMap,
    fs,
    io::Cursor,
    path::PathBuf,
    sync::{Arc, Mutex},
};

use async_trait::async_trait;
use entity::alerts::TtsSettings;
use hound::{SampleFormat, WavSpec, WavWriter};
use lingua::Language;
use ndarray::{Array2, arr1};
use ort::{session::Session, value::Tensor};

use crate::{
    constants::{BOS, EOS, PAD},
    error::AppError,
    services::tts::models::{Piper, PiperModelConfig, PiperVoices},
    utils::log_and_wrap_error,
};

#[async_trait]
pub trait PiperTts: Send + Sync {
    fn piper_voices_path(&self) -> PathBuf;
    fn piper_path(&self) -> PathBuf;
    fn piper_sessions(&self) -> Arc<Mutex<HashMap<String, Piper>>>;

    async fn build_piper(&self, voice_key: &str) -> Result<Piper, AppError> {
        let sessions_handle = self.piper_sessions();
        {
            let piper_sessions = sessions_handle.lock().unwrap();
            if let Some(piper_session) = piper_sessions.get(voice_key) {
                return Ok(piper_session.clone());
            }
        }
        let model_path = self.piper_voices_path().join(format!("{}.onnx", voice_key));
        let config_path = self
            .piper_voices_path()
            .join(format!("{}.onnx.json", voice_key));

        let config_file = tokio::task::spawn_blocking(move || std::fs::read_to_string(config_path))
            .await
            .map_err(|e| {
                log_and_wrap_error(
                    "Failed to read piper config file",
                    AppError::Io(e.to_string()),
                )
            })??;
        let config: PiperModelConfig = serde_json::from_str(&config_file).map_err(|e| {
            log_and_wrap_error(
                "Failed to parse piper config file",
                AppError::ParseError(e.to_string()),
            )
        })?;

        let model_path_clone = model_path.clone();
        let session = tokio::task::spawn_blocking(move || {
            Session::builder()
                .map_err(|e| log_and_wrap_error("ort build error", AppError::Piper(e.to_string())))?
                .commit_from_file(model_path_clone)
                .map_err(|e| {
                    log_and_wrap_error("ort load model error", AppError::Piper(e.to_string()))
                })
        })
        .await
        .map_err(|e| {
            log_and_wrap_error("spawn_blocking join error", AppError::Piper(e.to_string()))
        })??;

        let mut piper_sessions = sessions_handle.lock().unwrap();
        let piper_session = Piper {
            session: Arc::new(Mutex::new(session)),
            config: Arc::new(config),
        };
        piper_sessions.insert(voice_key.to_string(), piper_session.clone());
        Ok(piper_session)
    }

    async fn piper_synthesize(
        &self,
        text: &str,
        language: &Language,
        piper: Piper,
    ) -> Result<Vec<f32>, AppError> {
        let phonemes = espeak_ng::text_to_ipa(&language.iso_code_639_1().to_string(), text)
            .map_err(|e| {
                log_and_wrap_error("Get phonemes error", AppError::Piper(e.to_string()))
            })?;

        let audio = self.run_piper_inference(&piper, &phonemes)?;
        Ok(audio)
    }

    fn run_piper_inference(&self, piper: &Piper, phonemes: &str) -> Result<Vec<f32>, AppError> {
        let mut session = piper.session.lock().map_err(|e| {
            log_and_wrap_error("failed to lock session", AppError::Piper(e.to_string()))
        })?;
        let ids = self.phonemes_to_ids(&piper.config, phonemes);
        let input_len = ids.len();

        let input_array = Array2::from_shape_vec((1, input_len), ids).map_err(|e| {
            log_and_wrap_error(
                "failed to create input array",
                AppError::Piper(e.to_string()),
            )
        })?;

        let input_tensor = Tensor::<i64>::from_array(input_array).map_err(|e| {
            log_and_wrap_error(
                "failed to create input tensor",
                AppError::Piper(e.to_string()),
            )
        })?;

        let lengths_tensor = Tensor::<i64>::from_array(arr1(&[input_len as i64])).map_err(|e| {
            log_and_wrap_error(
                "failed to create lengths tensor",
                AppError::Piper(e.to_string()),
            )
        })?;

        let scales_tensor = Tensor::<f32>::from_array(arr1(&[
            piper.config.inference.noise_scale,
            piper.config.inference.length_scale,
            piper.config.inference.noise_w,
        ]))
        .map_err(|e| {
            log_and_wrap_error(
                "failed to create scales tensor",
                AppError::Piper(e.to_string()),
            )
        })?;

        let outputs = if piper.config.num_speakers > 1 {
            let speaker_tensor = Tensor::<i64>::from_array(arr1(&[0_i64])).map_err(|e| {
                log_and_wrap_error(
                    "failed to create speaker tensor",
                    AppError::Piper(e.to_string()),
                )
            })?;

            session
                .run(ort::inputs![
                    input_tensor,
                    lengths_tensor,
                    scales_tensor,
                    speaker_tensor
                ])
                .map_err(|e| {
                    log_and_wrap_error("inference failed", AppError::Piper(e.to_string()))
                })?
        } else {
            session
                .run(ort::inputs![input_tensor, lengths_tensor, scales_tensor])
                .map_err(|e| {
                    log_and_wrap_error("inference failed", AppError::Piper(e.to_string()))
                })?
        };

        let (_, audio_tensor) = outputs[0].try_extract_tensor::<f32>().map_err(|e| {
            log_and_wrap_error(
                "failed to extract audio tensor",
                AppError::Piper(e.to_string()),
            )
        })?;

        Ok(audio_tensor.to_vec())
    }

    fn phonemes_to_ids(&self, config: &PiperModelConfig, phonemes: &str) -> Vec<i64> {
        let map = &config.phoneme_id_map;

        let pad_id = *map.get(&PAD).and_then(|v| v.first()).unwrap_or(&0);

        let bos_id = *map.get(&BOS).and_then(|v| v.first()).unwrap_or(&0);

        let eos_id = *map.get(&EOS).and_then(|v| v.first()).unwrap_or(&0);

        let mut ids = Vec::with_capacity((phonemes.len() + 1) * 2);

        ids.push(bos_id);

        for ch in phonemes.chars() {
            if let Some(entry) = map.get(&ch).and_then(|v| v.first()) {
                ids.push(*entry);
                ids.push(pad_id);
            }
        }

        ids.push(eos_id);

        ids
    }

    async fn save_audio_to_wav_file(
        &self,
        audio: &[f32],
        sample_rate: u32,
        path: &PathBuf,
    ) -> Result<(), AppError> {
        let wav_bytes = self.audio_to_wav_bytes(audio, sample_rate)?;
        tokio::fs::write(path, wav_bytes)
            .await
            .map_err(|e| AppError::Piper(format!("Failed to write file: {e}")))
    }

    fn audio_to_wav_bytes(&self, audio: &[f32], sample_rate: u32) -> Result<Vec<u8>, AppError> {
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

    fn get_piper_voices(&self) -> Result<PiperVoices, AppError> {
        let piper_voices = fs::read_to_string(self.piper_path().join("voices.json"))
            .map_err(|e| log_and_wrap_error("Failed to read piper voices file", e))?;
        let piper_voices: PiperVoices = serde_json::from_str(&piper_voices).map_err(|e| {
            log_and_wrap_error(
                "Failed to parse piper voices file",
                AppError::ParseError(e.to_string()),
            )
        })?;
        Ok(piper_voices)
    }
    fn get_voice_key(
        &self,
        language: &Language,
        tts_settings: Option<TtsSettings>,
    ) -> Result<String, AppError> {
        if let Some(TtsSettings::Piper(settings)) = tts_settings {
            let voice_key = settings
                .voices
                .get(&language.iso_code_639_1().to_string())
                .cloned()
                .ok_or(AppError::Piper("Not found voice key".to_string()))?;
            return Ok(voice_key);
        }
        Err(AppError::Piper("Piper tts settings empty".to_string()))
    }
}
