use std::sync::Arc;

use foundry_local_sdk::{LiveAudioTranscriptionSession, Model, openai::AudioClient};
use futures::StreamExt;
use tauri::{AppHandle, Manager};

use crate::{
    error::AppError,
    services::{
        AppEvent, EventMessage, WebSocketBroadcaster,
        assistant::{AssistantService, AssistantServiceStatus, linear_resampler::LinearResampler},
    },
    utils::log_and_wrap_error,
};
use tokio::sync::mpsc::Receiver;

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
    ) -> Result<(), AppError> {
        tokio::spawn(async move {
            let audio_client = model.create_audio_client();
            let mut session: Option<LiveAudioTranscriptionSession> = None;
            let assistant_service = app.state::<AssistantService>();
            let websocket_broadcaster = app.state::<WebSocketBroadcaster>();

            while let Some(chunk) = transcribe_rx.recv().await {
                match chunk {
                    Transcribe::Start => {
                        if let Some(old) = session.take() {
                            log::warn!(
                                "Received Start while a session was active; stopping previous session"
                            );
                            Self::stop_session(old, "Stop previous session on restart").await;
                        }
                        session =
                            Self::start_session(&audio_client, &language, &app, &assistant_service)
                                .await;
                        websocket_broadcaster.broadcast_event_message(&EventMessage {
                            event: AppEvent::StartTranscribe,
                            data: true,
                        });
                        log::info!("Start transcribe.");
                    }
                    Transcribe::Audio(frame) => {
                        if let Some(session) = session.as_mut() {
                            let bytes = LinearResampler::pcm_f32_to_le_bytes(&frame);
                            if let Err(e) = session.append(&bytes, None).await {
                                log_and_wrap_error("Append audio frame error", e);
                            }
                        }
                    }
                    Transcribe::Stop => {
                        if let Some(session) = session.take() {
                            Self::stop_session(session, "End audio session").await;
                            websocket_broadcaster.broadcast_event_message(&EventMessage {
                                event: AppEvent::StopTranscribe,
                                data: true,
                            });
                        }
                    }
                    Transcribe::Cancel => {
                        if let Some(session) = session.take() {
                            Self::stop_session(session, "Cancel session").await;
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

    async fn start_session(
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
        if let Err(e) = SttService::transcribe(app.clone(), &new_session).await {
            log_and_wrap_error("Start STT transcription listener", e);
            Self::stop_session(new_session, "Stop session after listener failure").await;
            Self::cancel_token(assistant_service);
            return None;
        }

        Some(new_session)
    }

    async fn stop_session(session: LiveAudioTranscriptionSession, context: &str) {
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
