use std::{path::PathBuf, sync::Arc};

use foundry_local_sdk::{
    FoundryLocalConfig, FoundryLocalManager, LiveAudioTranscriptionSession, Model,
};
use futures::StreamExt;
use tauri::{AppHandle, Manager};

use crate::{
    error::AppError,
    services::assistant::{
        AssistantService, AssistantServiceStatus, linear_resampler::LinearResampler,
    },
    utils::log_and_wrap_error,
};
use tokio::sync::mpsc::Receiver;

pub enum Transcribe {
    Start,
    Audio(Vec<f32>),
    End,
    Cancel,
}

pub struct SttService;

impl SttService {
    pub async fn load_model(
        foundry_local_cache_path: PathBuf,
        alias: &str,
    ) -> Result<Arc<Model>, AppError> {
        let manager = FoundryLocalManager::create(
            FoundryLocalConfig::new("widy")
                .model_cache_dir(foundry_local_cache_path.to_string_lossy()),
        )
        .map_err(|e| log_and_wrap_error("Foundry local manager", e))?;
        let model = manager
            .catalog()
            .get_model(alias)
            .await
            .map_err(|e| log_and_wrap_error("Get foundry local model", e))?;
        model
            .load()
            .await
            .map_err(|e| log_and_wrap_error("Load foundry local model", e))?;
        Ok(model)
    }

    pub async fn start_transcription_session(
        model: Arc<Model>,
        language: String,
        app: AppHandle,
        mut transcribe_rx: Receiver<Transcribe>,
    ) -> Result<(), AppError> {
        tokio::spawn(async move {
            let audio_client = model.create_audio_client();
            let mut session: Option<LiveAudioTranscriptionSession> = None;
            let assistant_service = app.state::<AssistantService>();

            while let Some(chunk) = transcribe_rx.recv().await {
                match chunk {
                    Transcribe::Start => {
                        let mut new_session = audio_client.create_live_transcription_session();
                        new_session.settings.language = Some(language.as_str().into());

                        if let Err(e) = new_session.start(None).await {
                            log_and_wrap_error("Start transcription session", e);
                            assistant_service
                                .cancellation_token
                                .lock()
                                .unwrap()
                                .cancel();
                            continue;
                        }

                        let _ = SttService::transcribe(app.clone(), &new_session).await;
                        session = Some(new_session);
                    }
                    Transcribe::Audio(frame) => {
                        if let Some(session) = session.as_mut() {
                            let bytes = LinearResampler::pcm_f32_to_le_bytes(&frame);
                            if let Err(e) = session.append(&bytes, None).await {
                                log_and_wrap_error("Append audio frame error", e);
                            }
                        } else {
                            log::warn!("Audio frame received before session start");
                        }
                    }
                    Transcribe::End => {
                        if let Some(session) = session.take() {
                            if let Err(e) = session.stop(None).await {
                                log_and_wrap_error("End audio session", e);
                            }
                        }
                    }
                    Transcribe::Cancel => {
                        if let Some(session) = session.take() {
                            let _ = session
                                .stop(None)
                                .await
                                .map_err(|e| log_and_wrap_error("Cancel session", e));
                        }
                        let _ = model
                            .unload()
                            .await
                            .map_err(|e| log_and_wrap_error("Unload model", e));
                        let mut status = assistant_service.status.lock().unwrap();
                        *status = AssistantServiceStatus::Stopped;
                    }
                }
            }
        });

        Ok(())
    }

    async fn transcribe(
        app: AppHandle,
        session: &LiveAudioTranscriptionSession,
    ) -> Result<(), AppError> {
        let mut stream = session.get_stream().await?;
        tokio::spawn(async move {
            let assistant_service = app.state::<AssistantService>();
            while let Some(result) = stream.next().await {
                match result {
                    Ok(r) => {
                        if let Some(content) = r.content.first() {
                            if r.is_final {
                                let text = content.text.trim();
                                if !text.is_empty() {
                                    log::info!("{text}");
                                    let _ = assistant_service
                                        .ask_llm(&app, text)
                                        .await
                                        .map_err(|e| log_and_wrap_error("Ask LLM", e));
                                }
                            }
                        }
                    }
                    Err(e) => {
                        log_and_wrap_error("Transcription stream error", e);
                        break;
                    }
                }
            }
        });
        Ok(())
    }
}
