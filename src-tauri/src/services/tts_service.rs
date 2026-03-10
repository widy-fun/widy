use entity::settings::TtsType;
use lingua::{Language, LanguageDetector};
use msedge_tts::{
    tts::{client::connect_async, SpeechConfig},
    voice::get_voices_list_async,
};
use std::path::PathBuf;
use tauri::{AppHandle, Manager};
use tokio::{fs::File, io::AsyncWriteExt};

use crate::{repositories::SettingsRepository, services::DatabaseService};

#[derive(Clone, Debug)]
pub struct TtsService {
    audio_path: PathBuf,
}
impl TtsService {
    pub fn new(audio_path: &PathBuf) -> Self {
        Self {
            audio_path: audio_path.clone(),
        }
    }
    pub async fn make_audio(
        &self,
        text: &str,
        file_name: &str,
        app: &AppHandle,
    ) -> Result<String, String> {
        let language = self
            .detect_language(text, app.clone())
            .map(|lang| lang)
            .unwrap_or_else(|| Language::English);

        let settings = app
            .state::<DatabaseService>()
            .get_settings()
            .await?
            .ok_or_else(|| "Settings not found".to_string())?;

        match settings.tts_type {
            TtsType::Google => self.make_google_audio(text, file_name, &language).await,
            TtsType::Edge => match self.make_edge_audio(text, file_name, &language).await {
                Ok(result) => Ok(result),
                Err(_) => self.make_google_audio(text, file_name, &language).await,
            },
        }
    }

    async fn make_google_audio(
        &self,
        text: &str,
        file_name: &str,
        language: &Language,
    ) -> Result<String, String> {
        let mut audio_bytes = Vec::new();
        for text_parts in self.split_text(text, 100) {
            let encoded_text = urlencoding::encode(&text_parts);

            let url = format!(
                "https://translate.google.com/translate_tts?ie=UTF-8&q={}&tl={}&total=1&idx=0&textlen={}&client=tw-ob",
                encoded_text,
                language.iso_code_639_1(),
                text_parts.chars().count()
            );

            let response = reqwest::get(url).await.map_err(|e| e.to_string())?;
            if !response.status().is_success() {
                return Err(format!(
                    "Failed to get audio from Google TTS: {}",
                    response.status()
                ));
            }

            let bytes = response.bytes().await.map_err(|e| e.to_string())?;
            audio_bytes.extend_from_slice(&bytes);
        }

        let audio_file_path = self.audio_path.join(format!("{}.mp3", file_name));
        let mut file = File::create(audio_file_path)
            .await
            .map_err(|e| e.to_string())?;
        file.write_all(&audio_bytes)
            .await
            .map_err(|e| e.to_string())?;

        Ok(format!("{}.mp3", file_name))
    }

    async fn make_edge_audio(
        &self,
        text: &str,
        file_name: &str,
        language: &Language,
    ) -> Result<String, String> {
        let voices = get_voices_list_async().await.map_err(|e| e.to_string())?;
        for voice in &voices {
            if let Some(locale) = &voice.locale {
                if locale.contains(&language.iso_code_639_1().to_string()) {
                    let config = SpeechConfig::from(voice);
                    let mut tts = connect_async().await.map_err(|e| e.to_string())?;
                    let audio = tts
                        .synthesize(text, &config)
                        .await
                        .map_err(|e| e.to_string())?;
                    let audio_file_path = self.audio_path.join(format!("{}.mp3", file_name));
                    let mut file = File::create(audio_file_path)
                        .await
                        .map_err(|e| e.to_string())?;
                    file.write_all(&audio.audio_bytes)
                        .await
                        .map_err(|e| e.to_string())?;
                    break;
                }
            }
        }
        Ok(format!("{}.mp3", file_name))
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

    fn detect_language(&self, text: &str, app: AppHandle) -> Option<Language> {
        let language_detector = app.state::<LanguageDetector>();
        language_detector.detect_language_of(text)
    }
}
