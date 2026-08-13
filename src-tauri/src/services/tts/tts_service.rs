use entity::alerts::{TtsSettings, TtsType};
use lingua::{Language, LanguageDetector};
use msedge_tts::{
    tts::{SpeechConfig, client::connect_async},
    voice::get_voices_list_async,
};
use std::{
    collections::HashMap,
    fs,
    path::PathBuf,
    sync::{Arc, Mutex},
};
use tauri::{AppHandle, Manager};
use tokio::{fs::File, io::AsyncWriteExt};

use crate::{
    error::AppError,
    services::tts::{models::Piper, traits::PiperTts},
    utils::log_and_wrap_error,
};

#[derive(Clone, Debug)]
pub struct TtsService {
    audio_path: PathBuf,
    piper_voices_path: PathBuf,
    piper_path: PathBuf,
    piper_sessions: Arc<Mutex<HashMap<String, Piper>>>,
}
impl TtsService {
    pub fn new(audio_path: &PathBuf, piper_voices_path: &PathBuf, piper_path: &PathBuf) -> Self {
        Self {
            audio_path: audio_path.clone(),
            piper_voices_path: piper_voices_path.clone(),
            piper_path: piper_path.clone(),
            piper_sessions: Arc::new(Mutex::new(HashMap::new())),
        }
    }
    pub async fn make_audio(
        &self,
        text: &str,
        file_name: &str,
        app: &AppHandle,
        tts_type: TtsType,
        tts_settings: Option<TtsSettings>,
    ) -> Result<String, AppError> {
        let language = self
            .detect_language(text, app)
            .map(|lang| lang)
            .unwrap_or_else(|| Language::English);

        fs::create_dir_all(&self.audio_path).map_err(|e| {
            log_and_wrap_error("Create audio dir error", AppError::Io(e.to_string()))
        })?;

        match tts_type {
            TtsType::Google => self.make_google_audio(text, file_name, &language).await,
            TtsType::Edge => match self.make_edge_audio(text, file_name, &language).await {
                Ok(result) => Ok(result),
                Err(_) => self.make_google_audio(text, file_name, &language).await,
            },
            TtsType::Piper => {
                self.make_piper_audio(text, file_name, &language, tts_settings)
                    .await
            }
        }
    }

    async fn make_google_audio(
        &self,
        text: &str,
        file_name: &str,
        language: &Language,
    ) -> Result<String, AppError> {
        let mut audio_bytes = Vec::new();
        for text_parts in self.split_text(text, 100) {
            let encoded_text = urlencoding::encode(&text_parts);

            let url = format!(
                "https://translate.google.com/translate_tts?ie=UTF-8&q={}&tl={}&total=1&idx=0&textlen={}&client=tw-ob",
                encoded_text,
                language.iso_code_639_1(),
                text_parts.chars().count()
            );

            let response = reqwest::get(url)
                .await
                .map_err(|e| log_and_wrap_error("Google send tts request error", e))?;
            if !response.status().is_success() {
                let status = response.status();
                let body = response
                    .text()
                    .await
                    .map_err(|e| log_and_wrap_error("Google tts read body error", e))?;
                return Err(log_and_wrap_error(
                    "Failed to get audio from Google TTS",
                    AppError::HttpStatus {
                        status: status.as_u16(),
                        body,
                    },
                ));
            }

            let bytes = response
                .bytes()
                .await
                .map_err(|e| log_and_wrap_error("Google tts read bytes error", e))?;
            audio_bytes.extend_from_slice(&bytes);
        }

        let audio_file_path = self.audio_path.join(format!("{}.mp3", file_name));
        let mut file = File::create(audio_file_path).await.map_err(|e| {
            log_and_wrap_error(
                "Create google tts audio file error",
                AppError::Io(e.to_string()),
            )
        })?;
        file.write_all(&audio_bytes).await.map_err(|e| {
            log_and_wrap_error(
                "Write google tts audio file error",
                AppError::Io(e.to_string()),
            )
        })?;

        Ok(format!("{}.mp3", file_name))
    }

    async fn make_edge_audio(
        &self,
        text: &str,
        file_name: &str,
        language: &Language,
    ) -> Result<String, AppError> {
        let voices = get_voices_list_async().await.map_err(|e| {
            log_and_wrap_error("Get edge tts voices error", AppError::Custom(e.to_string()))
        })?;
        for voice in &voices {
            if let Some(locale) = &voice.locale {
                if locale.contains(&language.iso_code_639_1().to_string()) {
                    let config = SpeechConfig::from(voice);
                    let mut tts = connect_async().await.map_err(|e| {
                        log_and_wrap_error(
                            "Edge tts connect error",
                            AppError::Custom(e.to_string()),
                        )
                    })?;
                    let audio = tts.synthesize(text, &config).await.map_err(|e| {
                        log_and_wrap_error(
                            "Edge tts synthesize error",
                            AppError::Custom(e.to_string()),
                        )
                    })?;
                    let audio_file_path = self.audio_path.join(format!("{}.mp3", file_name));
                    let mut file = File::create(audio_file_path).await.map_err(|e| {
                        log_and_wrap_error(
                            "Edge tts create file error",
                            AppError::Io(e.to_string()),
                        )
                    })?;
                    file.write_all(&audio.audio_bytes).await.map_err(|e| {
                        log_and_wrap_error("Edge tts write file error", AppError::Io(e.to_string()))
                    })?;
                    break;
                }
            }
        }
        Ok(format!("{}.mp3", file_name))
    }

    async fn make_piper_audio(
        &self,
        text: &str,
        file_name: &str,
        language: &Language,
        tts_settings: Option<TtsSettings>,
    ) -> Result<String, AppError> {
        let voice_key = self.get_voice_key(language, tts_settings)?;
        let piper = self.build_piper(&voice_key).await?;
        let audio = self.piper_synthesize(text, language, piper).await?;
        let audio_file_path = self.audio_path.join(format!("{}.wav", file_name));
        self.save_audio_to_wav_file(&audio, 22050, &audio_file_path)
            .await
            .map_err(|e| {
                log_and_wrap_error(
                    "Failed to save piper audio to wav",
                    AppError::Piper(e.to_string()),
                )
            })?;
        Ok(format!("{}.wav", file_name))
    }

    fn split_text(&self, sentence: &str, max_length: usize) -> Vec<String> {
        let mut result = Vec::new();
        let mut current_part = String::new();

        for word in sentence.split_whitespace() {
            if word.chars().count() > max_length {
                result.push(word.to_string());
                continue;
            }
            if current_part.chars().count()
                + word.chars().count()
                + (if current_part.is_empty() { 0 } else { 1 })
                > max_length
            {
                result.push(current_part);
                current_part = String::new();
            }

            if !current_part.is_empty() {
                current_part.push(' ');
            }

            current_part.push_str(word);
        }

        if !current_part.is_empty() {
            result.push(current_part);
        }

        result
    }

    pub fn detect_language(&self, text: &str, app: &AppHandle) -> Option<Language> {
        let language_detector = app.state::<LanguageDetector>();
        language_detector.detect_language_of(text)
    }
}

impl PiperTts for TtsService {
    fn piper_voices_path(&self) -> PathBuf {
        self.piper_voices_path.clone()
    }

    fn piper_path(&self) -> PathBuf {
        self.piper_path.clone()
    }

    fn piper_sessions(&self) -> Arc<Mutex<HashMap<String, Piper>>> {
        self.piper_sessions.clone()
    }
}
