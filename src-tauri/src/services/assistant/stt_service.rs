use std::sync::Arc;

use foundry_local_sdk::{LiveAudioTranscriptionSession, Model, openai::AudioClient};
use futures::StreamExt;
use tauri::{AppHandle, Manager};

use crate::{
    constants::TARGET_SR,
    error::AppError,
    services::{
        AppEvent, ConfigService, EventMessage, WebSocketBroadcaster,
        assistant::{AssistantService, AssistantServiceStatus, linear_resampler::LinearResampler},
    },
    utils::{log_and_wrap_error, save_audio_to_wav_file},
};
use tokio::{fs, sync::mpsc::Receiver};

pub enum Transcribe {
    Start,
    Audio(Vec<f32>),
    Stop,
    Cancel,
}

pub struct SttService;

impl SttService {
    pub fn start_transcription_session(
        model: Arc<Model>,
        language: String,
        app: AppHandle,
        mut transcribe_rx: Receiver<Transcribe>,
        is_streaming: bool,
    ) -> Result<(), AppError> {
        tokio::spawn(async move {
            let config_service = app.state::<ConfigService>();
            let audio_client = model.create_audio_client();
            let mut session: Option<LiveAudioTranscriptionSession> = None;
            let assistant_service = app.state::<AssistantService>();
            let websocket_broadcaster = app.state::<WebSocketBroadcaster>();
            let mut session_buffer: Vec<f32> = Vec::new();

            while let Some(chunk) = transcribe_rx.recv().await {
                match chunk {
                    Transcribe::Start => {
                        if is_streaming {
                            if let Some(old) = session.take() {
                                log::warn!(
                                    "Received Start while a session was active; stopping previous session"
                                );
                                Self::stop_live_transcription_session(
                                    old,
                                    "Stop previous session on restart",
                                )
                                .await;
                            }
                            session = Self::start_live_transcription_session(
                                &audio_client,
                                &language,
                                &app,
                                &assistant_service,
                            )
                            .await;
                        } else {
                            session_buffer.clear();
                        }
                        websocket_broadcaster.broadcast_event_message(&EventMessage {
                            event: AppEvent::StartTranscribe,
                            data: true,
                        });
                        log::info!("Start transcribe.");
                    }
                    Transcribe::Audio(frame) => {
                        if is_streaming {
                            if let Some(session) = session.as_mut() {
                                let bytes = LinearResampler::pcm_f32_to_le_bytes(&frame);
                                if let Err(e) = session.append(&bytes, None).await {
                                    log_and_wrap_error("Append audio frame error", e);
                                }
                            }
                        } else {
                            session_buffer.extend(frame);
                        }
                    }
                    Transcribe::Stop => {
                        websocket_broadcaster.broadcast_event_message(&EventMessage {
                            event: AppEvent::StopTranscribe,
                            data: true,
                        });
                        if is_streaming {
                            if let Some(session) = session.take() {
                                Self::stop_live_transcription_session(session, "End audio session")
                                    .await;
                            }
                        } else {
                            let audio_file_path = format!(
                                "{}/{}.wav",
                                config_service.audio_path.to_string_lossy(),
                                uuid::Uuid::new_v4().to_string()
                            );
                            let _ = save_audio_to_wav_file(
                                &session_buffer,
                                TARGET_SR,
                                &audio_file_path,
                            )
                            .await;
                            session_buffer.clear();
                            let response = audio_client
                                .transcribe(audio_file_path.clone())
                                .await
                                .map_err(|e| log_and_wrap_error("Transcribe audio", e))
                                .unwrap();
                            let text = response.text.trim();
                            fs::remove_file(&audio_file_path)
                                .await
                                .map_err(|e| log_and_wrap_error("Remove audio file", e))
                                .unwrap();
                            if !text.is_empty() {
                                let _ = assistant_service
                                    .handle_tool_calling(&app, text, true)
                                    .await
                                    .map_err(|e| log_and_wrap_error("Handle tool calling", e));
                            }
                        }
                    }
                    Transcribe::Cancel => {
                        if is_streaming {
                            if let Some(session) = session.take() {
                                Self::stop_live_transcription_session(session, "Cancel session")
                                    .await;
                            }
                        } else {
                            session_buffer.clear();
                        }

                        if let Err(e) = model.unload().await {
                            log_and_wrap_error("Unload model", e);
                        }

                        Self::set_status(&assistant_service, AssistantServiceStatus::Stopped);
                    }
                }
            }
        });

        Ok(())
    }

    async fn start_live_transcription_session(
        audio_client: &AudioClient,
        language: &str,
        app: &AppHandle,
        assistant_service: &AssistantService,
    ) -> Option<LiveAudioTranscriptionSession> {
        let mut new_session = audio_client.create_live_transcription_session();
        new_session.settings.language = Some(language.into());

        if let Err(e) = new_session.start(None).await {
            log_and_wrap_error("Start transcription session", e);
            Self::cancel_token(assistant_service);
            return None;
        }
        if let Err(e) = SttService::transcribe_live_session(app.clone(), &new_session).await {
            log_and_wrap_error("Start STT transcription listener", e);
            Self::stop_live_transcription_session(
                new_session,
                "Stop session after listener failure",
            )
            .await;
            Self::cancel_token(assistant_service);
            return None;
        }

        Some(new_session)
    }

    async fn stop_live_transcription_session(
        session: LiveAudioTranscriptionSession,
        context: &str,
    ) {
        if let Err(e) = session.stop(None).await {
            log_and_wrap_error(context, e);
        }
    }

    fn cancel_token(assistant_service: &AssistantService) {
        match assistant_service.cancellation_token.lock() {
            Ok(token) => token.cancel(),
            Err(poisoned) => {
                log::error!("Cancellation token mutex poisoned, recovering");
                poisoned.into_inner().cancel();
            }
        }
    }

    fn set_status(assistant_service: &AssistantService, new_status: AssistantServiceStatus) {
        match assistant_service.status.lock() {
            Ok(mut status) => *status = new_status,
            Err(poisoned) => {
                log::error!("Status mutex poisoned, recovering");
                *poisoned.into_inner() = new_status;
            }
        }
    }

    async fn transcribe_live_session(
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
                                    let _ = assistant_service
                                        .handle_tool_calling(&app, text, true)
                                        .await
                                        .map_err(|e| log_and_wrap_error("Handle tool calling", e));
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
