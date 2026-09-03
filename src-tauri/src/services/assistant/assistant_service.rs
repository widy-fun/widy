use std::{
    collections::{HashMap, VecDeque},
    str::FromStr,
    sync::{Arc, Mutex},
    time::Duration,
};

use cpal::{
    DeviceId, SampleFormat, Stream, StreamConfig,
    traits::{DeviceTrait, HostTrait, StreamTrait},
};
use entity::{
    assistant_settings::AssistantProvider,
    services::{ServiceAuth, ServiceType},
};
use rubato::{Async, Resampler, audioadapter_buffers::direct::SequentialSliceOfVecs};
use serde::{Deserialize, Serialize};
use tauri::{AppHandle, Manager};
use tokio::sync::mpsc::{self, Sender};
use tokio_util::sync::CancellationToken;

use crate::{
    constants::{
        FRAME_SIZE, MAX_UTTERANCE_FRAMES, SILENCE_HANGOVER_FRAMES, TARGET_SR, VAD_THRESHOLD,
        WAKE_THRESHOLD,
    },
    error::AppError,
    repositories::{AssistantSettingsRepository, ServicesRepository},
    services::{
        ConfigService, DatabaseService,
        assistant::{
            linear_resampler::LinearResampler,
            stt_service::{SttService, Transcribe},
            wake_engine::WakeEngine,
        },
        gemini::{GeminiService, models::InteractionsBody, traits::GeminiApi},
    },
    utils::log_and_wrap_error,
};

#[derive(Debug, Clone, Serialize, Deserialize)]

pub enum AssistantServiceStatus {
    Stopped,
    Stopping,
    Starting,
    Started,
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
}

impl AssistantService {
    pub fn new() -> Self {
        Self {
            cancellation_token: Arc::new(Mutex::new(CancellationToken::new())),
            status: Arc::new(Mutex::new(AssistantServiceStatus::Stopped)),
        }
    }

    pub async fn start(
        &self,
        app: AppHandle,
        assistant_settings: entity::assistant_settings::Model,
    ) -> Result<(), AppError> {
        let database_service = app.state::<DatabaseService>();
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
            .ok_or(AppError::Custom("Not found input device".to_string()))?;

        let wake_engine = WakeEngine::new(config_service.wake_word_path.clone()).await?;

        let model = SttService::load_model(
            config_service.foundry_local_cache_path.clone(),
            "nemotron-speech-streaming-en-0.6b",
        )
        .await?;

        let (input_tx, input_rx) = mpsc::channel::<Vec<f32>>(32);

        let (transcribe_tx, transcribe_rx) = mpsc::channel::<Transcribe>(256);

        let (stream, input_sr) = self.build_audio_input_stream(device, input_tx)?;

        stream.play()?;

        SttService::start_transcription_session(
            model,
            assistant_settings.language,
            app,
            transcribe_rx,
        )
        .await?;

        self.run_audio_loop(input_rx, input_sr, wake_engine, transcribe_tx)
            .await?;

        Ok(())
    }

    fn build_audio_input_stream(
        &self,
        device: InputDeviceInfo,
        input_tx: Sender<Vec<f32>>,
    ) -> Result<(Stream, u32), AppError> {
        let host = cpal::default_host();
        let device = host
            .device_by_id(
                &DeviceId::from_str(&device.id)
                    .map_err(|e| log_and_wrap_error("Get input device by id error", e))?,
            )
            .ok_or(AppError::Audio("Device id not found".to_string()))?;
        let supported = device.default_input_config()?;
        let input_sr = supported.sample_rate();
        let channels = supported.channels() as usize;
        let format = supported.sample_format();
        let config: StreamConfig = supported.clone().into();
        let err_fn = |e| {
            log::error!("Audio error: {}", e);
        };
        let stream = match format {
            SampleFormat::F32 => {
                let tx = input_tx.clone();

                device.build_input_stream(
                    config,
                    move |data: &[f32], _| {
                        let mono = LinearResampler::stereo_f32_to_mono(data, channels);
                        let _ = tx.try_send(mono);
                    },
                    err_fn,
                    None,
                )?
            }

            SampleFormat::I16 => {
                let tx = input_tx.clone();

                device.build_input_stream(
                    config,
                    move |data: &[i16], _| {
                        let mono: Vec<f32> = LinearResampler::stereo_i16_to_mono(data, channels);
                        let _ = tx.try_send(mono);
                    },
                    err_fn,
                    None,
                )?
            }

            SampleFormat::U16 => {
                let tx = input_tx.clone();

                device.build_input_stream(
                    config,
                    move |data: &[u16], _| {
                        let mono: Vec<f32> = LinearResampler::stereo_u16_to_mono(data, channels);
                        let _ = tx.try_send(mono);
                    },
                    err_fn,
                    None,
                )?
            }

            _ => return Err(AppError::Audio("Stream error".to_string())),
        };
        Ok((stream, input_sr))
    }

    async fn run_audio_loop(
        &self,
        mut rx: mpsc::Receiver<Vec<f32>>,
        input_sr: u32,
        mut wake_engine: WakeEngine,
        transcribe_tx: Sender<Transcribe>,
    ) -> Result<(), AppError> {
        let mut resampler = if input_sr != TARGET_SR {
            Some(LinearResampler::create_resampler(input_sr)?)
        } else {
            None
        };

        let mut raw_buffer: VecDeque<f32> = VecDeque::new();
        let mut audio_buffer: VecDeque<f32> = VecDeque::new();
        let mut is_recording = false;
        let mut speech_len: usize = 0; // no longer need to store the samples, just track length
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
                            self.process_audio_chunk(&chunk, &mut resampler, &mut raw_buffer, &mut audio_buffer, &mut wake_engine, &mut is_recording, &mut speech_len, &mut silence_frames, &transcribe_tx).await?;
                        }
                        None => {
                            break;
                        }
                    }
                }
                _ = cancellation_token.cancelled() => {
                            log::info!("Stopping AI assistant.");
                            let _= transcribe_tx.send(Transcribe::Cancel).await;
                            break;
                        }
                _ = tokio::time::sleep(Duration::from_millis(100)) => {
                    continue;
                }
            }
        }

        Ok(())
    }

    pub async fn process_audio_chunk(
        &self,
        chunk: &Vec<f32>,
        resampler: &mut Option<Async<f32>>,
        raw_buffer: &mut VecDeque<f32>,
        audio_buffer: &mut VecDeque<f32>,
        wake_engine: &mut WakeEngine,
        is_recording: &mut bool,
        speech_len: &mut usize,
        silence_frames: &mut u32,
        transcribe_tx: &Sender<Transcribe>,
    ) -> Result<(), AppError> {
        if let Some(resampler) = resampler.as_mut() {
            raw_buffer.extend(chunk);

            while raw_buffer.len() >= resampler.input_frames_next() {
                let needed = resampler.input_frames_next();
                let input_chunk: Vec<f32> = raw_buffer.drain(..needed).collect();
                let input_channels: Vec<Vec<f32>> = vec![input_chunk];

                let input_adapter = SequentialSliceOfVecs::new(&input_channels, 1, needed)?;

                let out_frames = resampler.output_frames_next();
                let mut output_channels: Vec<Vec<f32>> = vec![vec![0.0f32; out_frames]; 1];
                let mut output_adapter =
                    SequentialSliceOfVecs::new_mut(&mut output_channels, 1, out_frames)?;

                resampler.process_into_buffer(&input_adapter, &mut output_adapter, None)?;

                audio_buffer.extend(output_channels[0].iter().copied());
            }
        } else {
            audio_buffer.extend(chunk);
        }

        while audio_buffer.len() >= FRAME_SIZE {
            let frame: Vec<f32> = audio_buffer.drain(..FRAME_SIZE).collect();

            let result = wake_engine.process(&frame)?;

            if result.vad >= VAD_THRESHOLD && result.wake >= WAKE_THRESHOLD {
                wake_engine.reset_wake();
                *is_recording = true;
                *speech_len = 0;
                *silence_frames = 0;
                let _ = transcribe_tx.send(Transcribe::Start).await;
                log::info!("Start transcribe.");
            }

            if *is_recording {
                *speech_len += frame.len();
                let _ = transcribe_tx.send(Transcribe::Audio(frame)).await;

                if result.vad >= VAD_THRESHOLD {
                    *silence_frames = 0;
                } else {
                    *silence_frames += 1;
                }

                let hit_silence_end = *silence_frames >= SILENCE_HANGOVER_FRAMES;
                let hit_max_len = *speech_len >= MAX_UTTERANCE_FRAMES;

                if hit_silence_end || hit_max_len {
                    let _ = transcribe_tx.send(Transcribe::End).await;
                    *is_recording = false;
                    *silence_frames = 0;
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
            .ok_or(AppError::Custom("Not found default device".to_string()))?;
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

    pub async fn ask_llm(&self, app: &AppHandle, text: &str) -> Result<(), AppError> {
        let gemini_service = app.state::<GeminiService>();
        let database_service = app.state::<DatabaseService>();
        let assistant_settings = database_service
            .get_assistant_settings()
            .await?
            .ok_or(AppError::Custom("Not found assistant settings".to_string()))?;
        let reqwest_client = app.state::<reqwest::Client>();
        match assistant_settings.provider {
            AssistantProvider::Gemini => {
                let service = database_service
                    .get_service_with_auth_by_id(ServiceType::Gemini)
                    .await?
                    .ok_or(AppError::Custom("Not found gemini service".to_string()))?;
                if let Some(ServiceAuth::ApiKey(auth)) = service.auth {
                    let interaction_response = gemini_service
                        .interactions(
                            &reqwest_client,
                            auth.api_key,
                            InteractionsBody {
                                model: Some(assistant_settings.model),
                                input: text.to_string(),
                                generation_config: None,
                                tools: Some(gemini_service.get_tools()),
                            },
                        )
                        .await?
                        .ok_or(AppError::Custom("Not found tools".to_string()))?;
                    if let Some(steps) = interaction_response.steps {
                        for step in steps {
                            self.invoke_tool(
                                &step.name.unwrap_or("default".to_string()),
                                step.arguments.unwrap_or(HashMap::new()),
                            );
                        }
                    }
                }
            }
        }

        Ok(())
    }

    pub async fn get_assistant_provider_models(
        &self,
        app: &AppHandle,
        provider: AssistantProvider,
    ) -> Result<Vec<String>, AppError> {
        match provider {
            AssistantProvider::Gemini => {
                let gemini_service = app.state::<GeminiService>();
                return Ok(gemini_service.models.lock().unwrap().clone());
            }
            _ => return Ok(vec![]),
        }
    }

    fn invoke_tool(&self, name: &str, arguments: HashMap<String, String>) {
        match name {
            "ban_user" => {
                println!("ban_user");
            }
            "pin_message" => {
                println!("pin_message");
            }
            _ => {}
        }
    }

    pub fn get_assistant_status(&self) -> Result<AssistantStatus, AppError> {
        let status = self.status.lock().unwrap().clone();
        Ok(AssistantStatus { status })
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
