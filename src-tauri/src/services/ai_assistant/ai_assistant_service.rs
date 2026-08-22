use std::{
    collections::VecDeque,
    os::windows::thread,
    str::FromStr,
    sync::{Arc, Mutex, mpsc},
    thread::JoinHandle,
    time::Duration,
};

use cpal::{
    DeviceId, SampleFormat, StreamConfig,
    traits::{DeviceTrait, HostTrait, StreamTrait},
};
use rubato::{Resampler, audioadapter_buffers::direct::SequentialSliceOfVecs};
use serde::{Deserialize, Serialize};
use tauri::{AppHandle, Manager};

use crate::{
    constants::{FRAME_SIZE, TARGET_SR, VAD_THRESHOLD, WAKE_THRESHOLD},
    error::AppError,
    services::{
        ConfigService,
        ai_assistant::{linear_resampler::LinearResampler, wake_engine::WakeEngine},
    },
    utils::log_and_wrap_error,
};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct InputDeviceInfo {
    pub id: String,
    pub name: String,
    pub selected: bool,
}

pub struct AiAssistantService {
    pub selected_input_device: Arc<Mutex<Option<InputDeviceInfo>>>,
}
impl AiAssistantService {
    pub fn new() -> Self {
        Self {
            selected_input_device: Arc::new(Mutex::new(None)),
        }
    }

    pub async fn start(&self, app: &AppHandle, device: InputDeviceInfo) -> Result<(), AppError> {
        let app_clone = app.clone();
        std::thread::spawn(move || {
            let binding = app_clone.clone();
            let ai_assistant_service = binding.state::<AiAssistantService>();
            let _ = ai_assistant_service
                .build_input_audio_stream(app_clone, device)
                .map_err(|e| log_and_wrap_error("Build input audio steam", e));
        });
        Ok(())
    }

    pub fn build_input_audio_stream(
        &self,
        app: AppHandle,
        device: InputDeviceInfo,
    ) -> Result<(), AppError> {
        let config_service = app.state::<ConfigService>().inner().clone();
        {
            *self.selected_input_device.lock().unwrap() = Some(device.clone());
        }
        let host = cpal::default_host();
        let device = host
            .device_by_id(
                &DeviceId::from_str(&device.id)
                    .map_err(|e| log_and_wrap_error("Get input device by id error", e))?,
            )
            .ok_or(AppError::Custom("Device id not found".to_string()))?;

        let engine = WakeEngine::new(config_service.wake_word_path.clone())?;

        let supported = device.default_input_config()?;

        let input_sr = supported.sample_rate();
        let channels = supported.channels() as usize;
        let format = supported.sample_format();

        let (tx, rx) = mpsc::sync_channel::<Vec<f32>>(32);

        let config: StreamConfig = supported.clone().into();

        let err_fn = |err| {
            eprintln!("Audio error: {}", err);
        };

        let stream = match format {
            SampleFormat::F32 => {
                let tx = tx.clone();

                device.build_input_stream(
                    config.clone(),
                    move |data: &[f32], _| {
                        let mono = LinearResampler::stereo_to_mono(data, channels);
                        let _ = tx.try_send(mono);
                    },
                    err_fn,
                    None,
                )?
            }

            SampleFormat::I16 => {
                let tx = tx.clone();

                device.build_input_stream(
                    config.clone(),
                    move |data: &[i16], _| {
                        let mono: Vec<f32> = LinearResampler::stereo_i16_to_mono(data, channels);
                        let _ = tx.try_send(mono);
                    },
                    err_fn,
                    None,
                )?
            }

            SampleFormat::U16 => {
                let tx = tx.clone();

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

            _ => return Err(AppError::Custom("Stream error".to_string())),
        };

        stream.play()?;

        Self::run_audio_loop(rx, input_sr, engine)?;
        Ok(())
    }

    fn run_audio_loop(
        rx: mpsc::Receiver<Vec<f32>>,
        input_sr: u32,
        mut engine: WakeEngine,
    ) -> Result<(), AppError> {
        let mut resampler = if input_sr != TARGET_SR {
            Some(LinearResampler::create_resampler(input_sr)?)
        } else {
            None
        };

        let mut raw_buffer: VecDeque<f32> = VecDeque::new();
        let mut audio_buffer: VecDeque<f32> = VecDeque::new();

        loop {
            let chunk = match rx.recv_timeout(Duration::from_millis(100)) {
                Ok(chunk) => chunk,
                Err(mpsc::RecvTimeoutError::Timeout) => continue,
                Err(mpsc::RecvTimeoutError::Disconnected) => break,
            };

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

                let result = engine.process(&frame)?;

                println!("VAD={:.3}  wake={:.3}", result.vad, result.wake);

                if result.vad >= VAD_THRESHOLD && result.wake >= WAKE_THRESHOLD {
                    engine.reset_wake();
                }
            }
        }

        Ok(())
    }

    pub fn get_input_devices(&self) -> Result<Vec<InputDeviceInfo>, AppError> {
        let host = cpal::default_host();
        let selected_input_device = { self.selected_input_device.lock().unwrap().clone() };
        let mut input_devices_info: Vec<InputDeviceInfo> = vec![];

        let devices = host.input_devices()?.collect::<Vec<_>>();
        for device in devices {
            let selected = if let Some(selected_input_device) = &selected_input_device {
                selected_input_device.id == device.id()?.to_string()
            } else {
                false
            };
            input_devices_info.push(InputDeviceInfo {
                id: device.id()?.to_string(),
                name: device.description()?.name().to_string(),
                selected,
            });
        }
        Ok(input_devices_info)
    }

    pub fn stop(&self) -> Result<(), AppError> {
        Ok(())
    }
}
