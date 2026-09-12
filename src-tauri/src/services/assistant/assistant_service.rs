use std::{
    collections::VecDeque,
    path::PathBuf,
    str::FromStr,
    sync::{Arc, Mutex},
};

use cpal::{
    DeviceId, SampleFormat, Stream,
    traits::{DeviceTrait, HostTrait, StreamTrait},
};
use entity::{assistant_settings::ToolCallingProvider, messages::MessageType};
use foundry_local_sdk::{FoundryLocalConfig, FoundryLocalManager, LogLevel, Model};
use serde::{Deserialize, Serialize};
use tauri::{AppHandle, Manager};
use tokio::sync::mpsc::{self, Sender};
use tokio_util::sync::CancellationToken;

use crate::{
    error::AppError,
    repositories::{AlertsRepository, AssistantSettingsRepository},
    services::{
        AppEvent, ConfigService, DatabaseService, EventMessage, WebSocketBroadcaster,
        assistant::{
            linear_resampler::LinearResampler,
            stt_service::{SttService, Transcribe},
            tool_calling_service::ToolCallingService,
            vad_engine::VadEngine,
            wake_engine::WakeEngine,
        },
        gemini::GeminiService,
        kick::KickService,
        twitch::TwitchService,
    },
    utils::{invoke_tool, log_and_wrap_error},
};

const FRAME_SIZE: usize = 1280;

#[derive(Debug, Clone, Serialize, Deserialize)]

pub enum AssistantServiceStatus {
    Stopped,
    Stopping,
    Starting,
    Started,
    DownloadingModel,
}
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct InputDeviceInfo {
    pub id: String,
    pub name: String,
    pub selected: bool,
    pub default: bool,
}

#[derive(Serialize, Clone)]
pub struct AssistantStatus {
    pub status: AssistantServiceStatus,
}

pub struct AssistantService {
    pub cancellation_token: Arc<Mutex<CancellationToken>>,
    pub status: Arc<Mutex<AssistantServiceStatus>>,
    pub tool_calling_model: Arc<Mutex<Option<Arc<Model>>>>,
}

impl AssistantService {
    pub fn new() -> Self {
        Self {
            cancellation_token: Arc::new(Mutex::new(CancellationToken::new())),
            status: Arc::new(Mutex::new(AssistantServiceStatus::Stopped)),
            tool_calling_model: Arc::new(Mutex::new(None)),
        }
    }

    pub async fn start(
        &self,
        app: AppHandle,
        assistant_settings: entity::assistant_settings::Model,
    ) -> Result<(), AppError> {
        let database_service = app.state::<DatabaseService>();
        let config_service = app.state::<ConfigService>();
        database_service
            .update_assistant_settings(assistant_settings.clone())
            .await?;

        {
            let mut status = self.status.lock().unwrap();
            match *status {
                AssistantServiceStatus::Stopped => {
                    *status = AssistantServiceStatus::Starting;
                }
                _ => {
                    return Ok(());
                }
            }
            let mut cancellation_token = self.cancellation_token.lock().unwrap();
            *cancellation_token = CancellationToken::new();
        }
        if assistant_settings.tool_calling_provider == ToolCallingProvider::Local {
            let tool_calling_model = self
                .load_model(
                    &assistant_settings.tool_calling_model,
                    config_service.foundry_path.clone(),
                )
                .await?;
            *self.tool_calling_model.lock().unwrap() = Some(tool_calling_model);
        }
        tauri::async_runtime::spawn(async move {
            let assistant_service = app.state::<AssistantService>();

            if let Err(e) = assistant_service
                .build(app.clone(), assistant_settings)
                .await
            {
                log_and_wrap_error("Build assistant", e);
                *assistant_service.status.lock().unwrap() = AssistantServiceStatus::Stopped;
            }
        });

        Ok(())
    }

    pub async fn build(
        &self,
        app: AppHandle,
        assistant_settings: entity::assistant_settings::Model,
    ) -> Result<(), AppError> {
        let config_service = app.state::<ConfigService>();
        let websocket_broadcaster: tauri::State<'_, WebSocketBroadcaster> =
            app.state::<WebSocketBroadcaster>();
        let device = self
            .get_input_devices(&app)
            .await?
            .iter()
            .find(|d| d.id == assistant_settings.device_id)
            .cloned()
            .ok_or(AppError::Audio("Not found input device".to_string()))?;

        let wake_engine = WakeEngine::new(config_service.wake_word_path.clone()).await?;

        let vad_engine = VadEngine::new(config_service.wake_word_path.clone()).await?;

        let (input_tx, input_rx) = mpsc::channel::<Vec<f32>>(100);

        let (transcribe_tx, transcribe_rx) = mpsc::channel::<Transcribe>(256);

        let input_stream = self.build_audio_input_stream(device, input_tx)?;

        let model = self
            .load_model(
                &assistant_settings.stt_model,
                config_service.foundry_path.clone(),
            )
            .await?;

        SttService::start_transcription_session(
            model,
            assistant_settings.stt_language.clone(),
            app.clone(),
            transcribe_rx,
        )?;

        input_stream.play()?;

        self.run_audio_loop(
            input_rx,
            wake_engine,
            vad_engine,
            transcribe_tx,
            &websocket_broadcaster,
            assistant_settings,
        )
        .await?;

        Ok(())
    }

    fn build_audio_input_stream(
        &self,
        device: InputDeviceInfo,
        input_tx: Sender<Vec<f32>>,
    ) -> Result<Stream, AppError> {
        let host = cpal::default_host();
        let device = host
            .device_by_id(
                &DeviceId::from_str(&device.id)
                    .map_err(|e| log_and_wrap_error("Get input device by id error", e))?,
            )
            .ok_or(AppError::Audio("Device id not found".to_string()))?;

        let default_config = device.default_input_config()?;
        let device_rate = default_config.sample_rate();
        let device_channels = default_config.channels();
        let sample_format = default_config.sample_format();

        let mic_config = cpal::StreamConfig {
            channels: device_channels,
            sample_rate: device_rate,
            buffer_size: cpal::BufferSize::Default,
        };
        let err_fn = |_| {
            // log::error!("Microphone stream error: {}", e);
        };
        let input_stream = match sample_format {
            SampleFormat::F32 => {
                let tx = input_tx.clone();

                device.build_input_stream(
                    mic_config,
                    move |data: &[f32], _| {
                        let bytes =
                            LinearResampler::convert_audio(data, device_channels, device_rate);
                        if !bytes.is_empty() {
                            let _ = tx.try_send(bytes);
                        }
                    },
                    err_fn,
                    None,
                )?
            }

            SampleFormat::I16 => {
                let tx = input_tx.clone();

                device.build_input_stream(
                    mic_config,
                    move |data: &[i16], _| {
                        let samples: Vec<f32> =
                            data.iter().map(|&s| s as f32 / i16::MAX as f32).collect();
                        let bytes =
                            LinearResampler::convert_audio(&samples, device_channels, device_rate);
                        if !bytes.is_empty() {
                            let _ = tx.try_send(bytes);
                        }
                    },
                    err_fn,
                    None,
                )?
            }

            SampleFormat::U16 => {
                let tx = input_tx.clone();

                device.build_input_stream(
                    mic_config,
                    move |data: &[u16], _| {
                        let samples: Vec<f32> = data
                            .iter()
                            .map(|&s| (s as f32 / u16::MAX as f32) * 2.0 - 1.0)
                            .collect();
                        let bytes =
                            LinearResampler::convert_audio(&samples, device_channels, device_rate);
                        if !bytes.is_empty() {
                            let _ = tx.try_send(bytes);
                        }
                    },
                    err_fn,
                    None,
                )?
            }

            _ => {
                return Err(AppError::Audio(
                    "Unsupported input sample format".to_string(),
                ));
            }
        };
        Ok(input_stream)
    }

    async fn run_audio_loop(
        &self,
        mut rx: mpsc::Receiver<Vec<f32>>,
        mut wake_engine: WakeEngine,
        mut vad_engine: VadEngine,
        transcribe_tx: Sender<Transcribe>,
        websocket_broadcaster: &tauri::State<'_, WebSocketBroadcaster>,
        assistant_settings: entity::assistant_settings::Model,
    ) -> Result<(), AppError> {
        let mut audio_buffer: VecDeque<f32> = VecDeque::new();
        let mut is_recording = false;
        let mut silence_frames: u32 = 0;
        let cancellation_token = { self.cancellation_token.lock().unwrap().clone() };
        log::info!("Start AI assistant.");
        {
            let mut status = self.status.lock().unwrap();
            *status = AssistantServiceStatus::Started;
        }

        loop {
            tokio::select! {
                res = rx.recv() => {
                    match res {
                        Some(chunk) => {
                            self.process_audio_chunk(&chunk,  &mut audio_buffer, &mut wake_engine, &mut vad_engine, &mut is_recording,  &mut silence_frames, &transcribe_tx,websocket_broadcaster,&assistant_settings).await?;
                        }
                        None => {
                            break;
                        }
                    }
                }
                _ = cancellation_token.cancelled() => {
                            log::info!("Stopping AI assistant.");
                            let _= transcribe_tx.send(Transcribe::Cancel).await;
                            let tool_calling_model = self.tool_calling_model.lock().unwrap().clone();
                              if let Some(tool_calling_model) = tool_calling_model {
                                     tool_calling_model.unload().await?;
                              }
                            break;
                        }

            }
        }

        Ok(())
    }

    pub async fn process_audio_chunk(
        &self,
        chunk: &Vec<f32>,
        audio_buffer: &mut VecDeque<f32>,
        wake_engine: &mut WakeEngine,
        vad_engine: &mut VadEngine,
        is_recording: &mut bool,
        silence_frames: &mut u32,
        transcribe_tx: &Sender<Transcribe>,
        websocket_broadcaster: &tauri::State<'_, WebSocketBroadcaster>,
        assistant_settings: &entity::assistant_settings::Model,
    ) -> Result<(), AppError> {
        audio_buffer.extend(chunk);
        while audio_buffer.len() >= FRAME_SIZE {
            let frame: Vec<f32> = audio_buffer.drain(..FRAME_SIZE).collect();
            let vad_score = vad_engine.process(&frame)?;
            let wake_score = match vad_score {
                v if *is_recording || v < 0.1 => 0.0,
                _ => wake_engine.process(&frame)?,
            };
            if vad_score >= assistant_settings.vad_threshold
                && wake_score >= assistant_settings.wake_threshold
            {
                websocket_broadcaster.broadcast_event_message(&EventMessage {
                    event: AppEvent::AssistantStartTranscribe,
                    data: true,
                });
                wake_engine.reset_wake();
                *is_recording = true;
                *silence_frames = 0;
                let _ = transcribe_tx.send(Transcribe::Start).await;
                log::info!("Start transcribe.");
            }

            if *is_recording {
                let _ = transcribe_tx.send(Transcribe::Audio(frame)).await;

                if vad_score >= assistant_settings.vad_threshold {
                    *silence_frames = 0;
                } else {
                    *silence_frames += 1;
                }

                let hit_silence_end = *silence_frames >= assistant_settings.silence_hangover_frames;

                if hit_silence_end {
                    let _ = transcribe_tx.send(Transcribe::Stop).await;
                    vad_engine.reset_vad();
                    *is_recording = false;
                    *silence_frames = 0;
                    websocket_broadcaster.broadcast_event_message(&EventMessage {
                        event: AppEvent::AssistantStopTranscribe,
                        data: true,
                    });
                }
            }
        }
        Ok(())
    }

    pub async fn get_input_devices(
        &self,
        app: &AppHandle,
    ) -> Result<Vec<InputDeviceInfo>, AppError> {
        let database_service = app.state::<DatabaseService>();
        let assistant_settings = database_service
            .get_assistant_settings()
            .await?
            .ok_or(AppError::Custom("Not found assistant settings".to_string()))?;
        let host = cpal::default_host();
        let mut input_devices_info: Vec<InputDeviceInfo> = vec![];
        let default_device = host
            .default_input_device()
            .ok_or(AppError::Audio("Not found default device".to_string()))?;
        let devices = host.input_devices()?.collect::<Vec<_>>();
        for device in devices {
            let id = device.id()?.to_string();
            let selected = assistant_settings.device_id == device.id()?.to_string();
            input_devices_info.push(InputDeviceInfo {
                id: id.clone(),
                name: device.description()?.name().to_string(),
                selected,
                default: id == default_device.id()?.to_string(),
            });
        }
        Ok(input_devices_info)
    }

    pub async fn handle_tool_calling(
        &self,
        app: &AppHandle,
        text: &str,
        needs_clarification: bool,
    ) -> Result<(), AppError> {
        let database_service = app.state::<DatabaseService>();
        let assistant_settings = database_service
            .get_assistant_settings()
            .await?
            .ok_or(AppError::Custom("Not found assistant settings".to_string()))?;
        let tool_calls = match assistant_settings.tool_calling_provider {
            ToolCallingProvider::Gemini => {
                let gemini_service = app.state::<GeminiService>();
                gemini_service
                    .handle_tool_calling(app, assistant_settings.tool_calling_model, text)
                    .await?
            }
            ToolCallingProvider::Local => {
                let tool_calling_model = self
                    .tool_calling_model
                    .lock()
                    .unwrap()
                    .clone()
                    .ok_or(AppError::Custom("Tool calling model empty".to_string()))?;
                ToolCallingService::handle_tool_calling(tool_calling_model, text).await?
            }
        };
        for tool_call in tool_calls {
            match tool_call.name.as_str() {
                "ban_user" if needs_clarification => {
                    let platform = tool_call
                        .arguments
                        .get("platform")
                        .cloned()
                        .unwrap_or_default();
                    let users: Vec<String> = match platform.as_str().to_lowercase().as_str() {
                        "twitch" => {
                            let twitch_service = app.state::<TwitchService>();
                            twitch_service
                                .chat_messages_buffer
                                .lock()
                                .unwrap()
                                .clone()
                                .iter()
                                .map(|m| m.sender.username.clone())
                                .collect()
                        }
                        "kick" => {
                            let kick_service = app.state::<KickService>();
                            kick_service
                                .chat_messages_buffer
                                .lock()
                                .unwrap()
                                .clone()
                                .iter()
                                .map(|m| m.sender.username.clone())
                                .collect()
                        }
                        _ => {
                            vec![]
                        }
                    };

                    let text_clarification = format!(
                        "Please select the user you want to ban from this list: {}",
                        users.join(", ")
                    );
                    let _ = Box::pin(self.handle_tool_calling(
                        app,
                        &format!("{} {}", text, text_clarification),
                        false,
                    ))
                    .await
                    .map_err(|e| log_and_wrap_error("Ban user clarification", e));
                }
                "play_alert" if needs_clarification => {
                    let database_service = app.state::<DatabaseService>();
                    let alerts_names: Vec<String> = database_service
                        .get_alerts_by_type(MessageType::AssistantAction)
                        .await?
                        .into_iter()
                        .map(|a| a.name)
                        .collect();
                    let text_clarification = format!(
                        "Please select the alert you want run from this list: {}",
                        alerts_names.join(", ")
                    );
                    let _ = Box::pin(self.handle_tool_calling(
                        app,
                        &format!("{} {}", text, text_clarification),
                        false,
                    ))
                    .await
                    .map_err(|e| log_and_wrap_error("Play alert clarification", e));
                }
                _ => {
                    let _ = invoke_tool(app, tool_call)
                        .await
                        .map_err(|e| log_and_wrap_error("Invoke tool", e));
                }
            }
        }

        Ok(())
    }

    pub async fn get_assistant_provider_models(
        &self,
        app: &AppHandle,
        provider: ToolCallingProvider,
    ) -> Result<Vec<String>, AppError> {
        match provider {
            ToolCallingProvider::Gemini => {
                let gemini_service = app.state::<GeminiService>();
                return Ok(gemini_service.models.lock().unwrap().clone());
            }
            ToolCallingProvider::Local => return Ok(vec!["qwen2.5-0.5b".to_string()]),
        }
    }

    pub fn get_assistant_status(&self) -> Result<AssistantStatus, AppError> {
        let status = self.status.lock().unwrap().clone();
        Ok(AssistantStatus { status })
    }

    async fn load_model(&self, alias: &str, foundry_path: PathBuf) -> Result<Arc<Model>, AppError> {
        let manager = FoundryLocalManager::create(
            FoundryLocalConfig::new("widy")
                .app_data_dir(foundry_path.to_string_lossy())
                .log_level(LogLevel::Fatal),
        )
        .map_err(|e| log_and_wrap_error("Foundry local manager", e))?;
        let model = manager
            .catalog()
            .get_model(alias)
            .await
            .map_err(|e| log_and_wrap_error("Get foundry local model", e))?;
        if !model.is_cached().await? {
            *self.status.lock().unwrap() = AssistantServiceStatus::DownloadingModel;
            model.download(Some(|_| {})).await?;
        }
        model
            .load()
            .await
            .map_err(|e| log_and_wrap_error("Load foundry local model", e))?;
        Ok(model)
    }

    pub fn stop(&self) -> Result<(), AppError> {
        let mut status = self.status.lock().unwrap();
        match *status {
            AssistantServiceStatus::Started => {
                *status = AssistantServiceStatus::Stopping;
            }
            _ => {
                return Ok(());
            }
        }
        self.cancellation_token.lock().unwrap().cancel();

        Ok(())
    }
}
