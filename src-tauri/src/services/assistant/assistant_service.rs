use std::{
    collections::{HashSet, VecDeque},
    path::PathBuf,
    str::FromStr,
    sync::{Arc, Mutex},
};

use cpal::{
    DeviceId, SampleFormat, Stream,
    traits::{DeviceTrait, HostTrait, StreamTrait},
};
use entity::{
    assistant_settings::{ToolCallingModel, ToolCallingProvider},
    messages::MessageType,
};
use foundry_local_sdk::{FoundryLocalConfig, FoundryLocalManager, LogLevel, Model};
use serde::{Deserialize, Serialize};
use tauri::{AppHandle, Manager};
use tokio::sync::mpsc::{self, Sender};
use tokio_util::sync::CancellationToken;

use crate::{
    error::AppError,
    repositories::{AlertsRepository, AssistantSettingsRepository},
    services::{
        ConfigService, DatabaseService,
        assistant::{
            linear_resampler::LinearResampler,
            stt_service::{SttService, Transcribe},
            tool_calling_service::ToolCallingService,
            vad_engine::VadEngine,
            wake_engine::WakeEngine,
        },
        claude::ClaudeService,
        gemini::GeminiService,
        kick::{KickService, KickSessionService, traits::KickSessionApi},
        openai::OpenAIService,
        twitch::{TwitchService, traits::TwitchApi},
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
    tool_calling_models: Vec<ToolCallingModel>,
}

impl AssistantService {
    pub fn new() -> Self {
        Self {
            cancellation_token: Arc::new(Mutex::new(CancellationToken::new())),
            status: Arc::new(Mutex::new(AssistantServiceStatus::Stopped)),
            tool_calling_model: Arc::new(Mutex::new(None)),
            tool_calling_models: vec![
                ToolCallingModel {
                    id: "qwen2.5-0.5b".into(),
                    display_name: "qwen2.5-0.5b (1.0 GB)".into(),
                },
                // Qwen3
                ToolCallingModel {
                    id: "qwen3-0.6b".into(),
                    display_name: "qwen3-0.6b (1.0 GB)".into(),
                },
                ToolCallingModel {
                    id: "qwen3-1.7b".into(),
                    display_name: "qwen3-1.7b (2.0 GB)".into(),
                },
                ToolCallingModel {
                    id: "qwen3-4b".into(),
                    display_name: "qwen3-4b (5.0 GB)".into(),
                },
                ToolCallingModel {
                    id: "qwen3-8b".into(),
                    display_name: "qwen3-8b (9.0 GB)".into(),
                },
                ToolCallingModel {
                    id: "qwen3-14b".into(),
                    display_name: "qwen3-14b (16.0 GB)".into(),
                },
                // Qwen3-VL
                ToolCallingModel {
                    id: "qwen3-vl-2b-instruct".into(),
                    display_name: "qwen3-vl-2b-instruct (3.0 GB)".into(),
                },
                ToolCallingModel {
                    id: "qwen3-vl-4b-instruct".into(),
                    display_name: "qwen3-vl-4b-instruct (5.5 GB)".into(),
                },
                ToolCallingModel {
                    id: "qwen3-vl-8b-instruct".into(),
                    display_name: "qwen3-vl-8b-instruct (10.0 GB)".into(),
                },
                // Qwen2.5 instruct
                ToolCallingModel {
                    id: "qwen2.5-1.5b".into(),
                    display_name: "qwen2.5-1.5b (2.0 GB)".into(),
                },
                ToolCallingModel {
                    id: "qwen2.5-7b".into(),
                    display_name: "qwen2.5-7b (8.0 GB)".into(),
                },
                ToolCallingModel {
                    id: "qwen2.5-14b".into(),
                    display_name: "qwen2.5-14b (16.0 GB)".into(),
                },
                // Qwen2.5-Coder
                ToolCallingModel {
                    id: "qwen2.5-coder-0.5b".into(),
                    display_name: "qwen2.5-coder-0.5b (0.8 GB)".into(),
                },
                ToolCallingModel {
                    id: "qwen2.5-coder-1.5b".into(),
                    display_name: "qwen2.5-coder-1.5b (2.0 GB)".into(),
                },
                ToolCallingModel {
                    id: "qwen2.5-coder-7b".into(),
                    display_name: "qwen2.5-coder-7b (8.0 GB)".into(),
                },
                ToolCallingModel {
                    id: "qwen2.5-coder-14b".into(),
                    display_name: "qwen2.5-coder-14b (16.0 GB)".into(),
                },
                // Qwen3.5
                ToolCallingModel {
                    id: "qwen3.5-0.8b".into(),
                    display_name: "qwen3.5-0.8b (1.2 GB)".into(),
                },
                ToolCallingModel {
                    id: "qwen3.5-2b".into(),
                    display_name: "qwen3.5-2b (2.5 GB)".into(),
                },
                ToolCallingModel {
                    id: "qwen3.5-2b-text".into(),
                    display_name: "qwen3.5-2b-text (2.5 GB)".into(),
                },
                ToolCallingModel {
                    id: "qwen3.5-4b".into(),
                    display_name: "qwen3.5-4b (5.0 GB)".into(),
                },
                ToolCallingModel {
                    id: "qwen3.5-9b".into(),
                    display_name: "qwen3.5-9b (10.0 GB)".into(),
                },
                // Phi-4
                ToolCallingModel {
                    id: "phi-4".into(),
                    display_name: "phi-4 (10.2 GB)".into(),
                },
                ToolCallingModel {
                    id: "phi-4-mini".into(),
                    display_name: "phi-4-mini (4.8 GB)".into(),
                },
                // Mistral / Ministral
                ToolCallingModel {
                    id: "mistral-nemo-12b-instruct".into(),
                    display_name: "mistral-nemo-12b-instruct (13.0 GB)".into(),
                },
                ToolCallingModel {
                    id: "ministral-3-3b-instruct-2512".into(),
                    display_name: "ministral-3-3b-instruct-2512 (4.0 GB)".into(),
                },
                // Other
                ToolCallingModel {
                    id: "gpt-oss-20b".into(),
                    display_name: "gpt-oss-20b (16.0 GB)".into(),
                },
                ToolCallingModel {
                    id: "smollm3-3b".into(),
                    display_name: "smollm3-3b (4.0 GB)".into(),
                },
            ],
        }
    }

    pub async fn start(
        &self,
        app: AppHandle,
        assistant_settings: entity::assistant_settings::Model,
    ) -> Result<(), AppError> {
        let config_service = app.state::<ConfigService>();
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
                    &assistant_settings.tool_calling_model.id,
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

        let stt_model = self
            .load_model(
                &assistant_settings.stt_model,
                config_service.foundry_path.clone(),
            )
            .await?;

        SttService::start_transcription_session(
            stt_model,
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
                            self.process_audio_chunk(&chunk,  &mut audio_buffer, &mut wake_engine, &mut vad_engine, &mut is_recording,  &mut silence_frames, &transcribe_tx,&assistant_settings).await?;
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
                wake_engine.reset_wake();
                *is_recording = true;
                *silence_frames = 0;
                let _ = transcribe_tx.send(Transcribe::Start).await;
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
                    vad_engine.reset_vad();
                    *is_recording = false;
                    *silence_frames = 0;
                    let _ = transcribe_tx.send(Transcribe::Stop).await;
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
                    .handle_tool_calling(app, assistant_settings.clone(), text)
                    .await?
            }
            ToolCallingProvider::Claude => {
                let claude_service = app.state::<ClaudeService>();
                claude_service
                    .handle_tool_calling(app, assistant_settings.clone(), text)
                    .await?
            }
            ToolCallingProvider::OpenAI => {
                let openai_service = app.state::<OpenAIService>();
                openai_service
                    .handle_tool_calling(app, assistant_settings.clone(), text)
                    .await?
            }
            ToolCallingProvider::Local => {
                let tool_calling_model = self
                    .tool_calling_model
                    .lock()
                    .unwrap()
                    .clone()
                    .ok_or(AppError::Custom("Tool calling model empty".to_string()))?;
                ToolCallingService::handle_tool_calling(
                    tool_calling_model,
                    assistant_settings.clone(),
                    text,
                )
                .await?
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
                    let users: Vec<String> = match platform.to_lowercase().as_str() {
                        "twitch" => {
                            let twitch_service = app.state::<TwitchService>();
                            twitch_service
                                .chat_messages_buffer
                                .lock()
                                .unwrap()
                                .iter()
                                .map(|m| m.sender.username.clone())
                                .collect::<HashSet<_>>()
                                .into_iter()
                                .collect()
                        }
                        "kick" => {
                            let kick_service = app.state::<KickService>();
                            kick_service
                                .chat_messages_buffer
                                .lock()
                                .unwrap()
                                .iter()
                                .map(|m| m.sender.username.clone())
                                .collect::<HashSet<_>>()
                                .into_iter()
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
                "unban_user" if needs_clarification => {
                    let platform = tool_call
                        .arguments
                        .get("platform")
                        .cloned()
                        .unwrap_or_default();
                    let users: Vec<String> = match platform.to_lowercase().as_str() {
                        "twitch" => {
                            let twitch_service = app.state::<TwitchService>();
                            let auth = twitch_service.get_auth(app).await?;
                            let banned_users = twitch_service
                                .get_all_banned_users(auth.user_id, app)
                                .await?;
                            banned_users.iter().map(|b| b.user_name.clone()).collect()
                        }
                        "kick" => {
                            let kick_session_service = app.state::<KickSessionService>();
                            let bans_info = kick_session_service
                                .get_bans(app)
                                .await?
                                .ok_or(AppError::Custom("Bans info empty".to_string()))?;

                            bans_info
                                .iter()
                                .map(|b| b.banned_user.username.clone())
                                .collect()
                        }
                        _ => {
                            vec![]
                        }
                    };

                    let text_clarification = format!(
                        "Please select the user you want to unban from this list: {}",
                        users.join(", ")
                    );
                    let _ = Box::pin(self.handle_tool_calling(
                        app,
                        &format!("{} {}", text, text_clarification),
                        false,
                    ))
                    .await
                    .map_err(|e| log_and_wrap_error("Unban user clarification", e));
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
    ) -> Result<Vec<ToolCallingModel>, AppError> {
        match provider {
            ToolCallingProvider::Gemini => {
                let gemini_service = app.state::<GeminiService>();
                return Ok(gemini_service.tool_calling_models.clone());
            }
            ToolCallingProvider::Local => {
                return Ok(self.tool_calling_models.clone());
            }
            ToolCallingProvider::Claude => {
                let claude_service = app.state::<ClaudeService>();
                return Ok(claude_service.tool_calling_models.clone());
            }
            ToolCallingProvider::OpenAI => {
                let openai_service = app.state::<OpenAIService>();
                return Ok(openai_service.tool_calling_models.clone());
            }
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
