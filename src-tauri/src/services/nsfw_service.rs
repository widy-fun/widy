use std::{
    error::Error,
    sync::{
        Arc,
        atomic::{AtomicBool, Ordering},
    },
};
use tokio::sync::Mutex;

use image::{ImageBuffer, Rgb, RgbImage, RgbaImage};
use ndarray::{Array4, Axis};
use ort::{inputs, session::Session, value::Tensor};
use serde::{Deserialize, Serialize};
use tauri::{AppHandle, Manager};
use xcap::Window;

use crate::{
    constants::NSFW_LABELS,
    error::AppError,
    services::{AppEvent, ConfigService, EventMessage, WebSocketBroadcaster},
    utils::log_and_wrap_error,
};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct NsfwDetection {
    pub label: &'static str,
    pub confidence: f32,
}

struct PreparedImage {
    blob: Array4<f32>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct WindowInfo {
    pub title: String,
    pub id: u32,
    pub selected: bool,
}
pub struct NsfwService {
    pub is_stopping: Arc<AtomicBool>,
    pub selected_window: Arc<Mutex<Option<WindowInfo>>>,
}

impl NsfwService {
    pub fn new() -> Self {
        Self {
            is_stopping: Arc::new(AtomicBool::new(false)),
            selected_window: Arc::new(Mutex::new(None)),
        }
    }

    pub async fn start(&self, app: AppHandle, window_info: WindowInfo) -> Result<(), AppError> {
        let mut selected_window = self.selected_window.lock().await;
        if selected_window.is_some() {
            return Ok(());
        }
        let session = Arc::new(Mutex::new(self.build_session(&app)?));
        let session_clone = Arc::clone(&session);
        *selected_window = Some(window_info.clone());
        tauri::async_runtime::spawn(async move {
            let windows = Window::all().unwrap();
            if let Some(window) = windows.iter().find(|&w| w.id().unwrap() == window_info.id) {
                let nsfw_service = app.state::<NsfwService>();
                let websocket_broadcaster = app.state::<WebSocketBroadcaster>();
                let mut session = session_clone.lock().await;
                'nsfw_loop: loop {
                    let is_stopping = nsfw_service.is_stopping.load(Ordering::Relaxed);
                    if is_stopping {
                        let mut selected_window = nsfw_service.selected_window.lock().await;
                        *selected_window = None;
                        nsfw_service.is_stopping.store(false, Ordering::Relaxed);
                        break 'nsfw_loop;
                    }
                    match window.capture_image() {
                        Ok(image_buffer) => {
                            if let Ok(detections) = nsfw_service
                                .detect(&image_buffer, &mut session)
                                .map_err(|e| {
                                    log::error!("Detect image error: {}", e);
                                })
                            {
                                let _ =
                                    websocket_broadcaster.broadcast_event_message(&EventMessage {
                                        event: AppEvent::NsfwDetection,
                                        data: detections,
                                    });
                            }
                        }
                        Err(e) => {
                            *nsfw_service.selected_window.lock().await = None;
                            log::error!("Capture window image error: {}", e);
                            break 'nsfw_loop;
                        }
                    }
                }
            }
        });
        Ok(())
    }

    fn build_session(&self, app: &AppHandle) -> Result<Session, AppError> {
        let config_service = app.state::<ConfigService>();
        Session::builder()
            .map_err(|e| log_and_wrap_error("ort build error", AppError::NSFW(e.to_string())))?
            .commit_from_file(&config_service.nsfw_model_path)
            .map_err(|e| log_and_wrap_error("ort load model error", AppError::NSFW(e.to_string())))
    }

    pub async fn get_windows(&self) -> Result<Vec<WindowInfo>, AppError> {
        let windows = Window::all()?;
        let mut windows_info: Vec<WindowInfo> = vec![];
        let selected_window = self.selected_window.lock().await.clone();
        for window in windows.clone() {
            let window_id = window.id()?;
            let selected = if let Some(selected_window) = &selected_window {
                selected_window.id == window_id
            } else {
                false
            };
            windows_info.push(WindowInfo {
                title: window.title()?,
                id: window_id,
                selected,
            });
        }
        Ok(windows_info)
    }

    fn prepare_image(&self, img: &RgbaImage, target_size: u32) -> PreparedImage {
        let (orig_w, orig_h) = img.dimensions();
        let rgb: RgbImage = ImageBuffer::from_fn(orig_w, orig_h, |x, y| {
            let px = img.get_pixel(x, y);
            let [r, g, b, a] = px.0;
            let alpha = a as f32 / 255.0;
            Rgb([
                (r as f32 * alpha) as u8,
                (g as f32 * alpha) as u8,
                (b as f32 * alpha) as u8,
            ])
        });
        let max_size = orig_w.max(orig_h);
        let mut padded: RgbImage = ImageBuffer::from_pixel(max_size, max_size, Rgb([0u8, 0, 0]));
        image::imageops::replace(&mut padded, &rgb, 0, 0);
        let resized = image::imageops::resize(
            &padded,
            target_size,
            target_size,
            image::imageops::FilterType::Triangle,
        );
        let mut blob = Array4::<f32>::zeros((1, 3, target_size as usize, target_size as usize));
        for (x, y, pixel) in resized.enumerate_pixels() {
            let [r, g, b] = pixel.0;
            blob[[0, 0, y as usize, x as usize]] = r as f32 / 255.0;
            blob[[0, 1, y as usize, x as usize]] = g as f32 / 255.0;
            blob[[0, 2, y as usize, x as usize]] = b as f32 / 255.0;
        }
        PreparedImage { blob }
    }

    fn run_session(
        &self,
        blob: Array4<f32>,
        session: &mut Session,
    ) -> Result<ndarray::Array3<f32>, Box<dyn Error>> {
        let input_tensor = Tensor::from_array(blob)?;
        let outputs = session.run(inputs!["images" => input_tensor])?;
        let output_tensor = outputs[0].try_extract_array::<f32>()?;
        Ok(output_tensor
            .into_owned()
            .into_dimensionality::<ndarray::Ix3>()?)
    }

    fn postprocess(&self, output: &ndarray::ArrayView3<f32>) -> Vec<NsfwDetection> {
        let view = output.index_axis(Axis(0), 0);
        let transposed = view.t();
        let labels_len = NSFW_LABELS.len();
        let mut best: Vec<f32> = vec![0.0; labels_len];
        for row in transposed.rows() {
            let labels_confidence = row.iter().skip(4).take(labels_len);
            for (label_id, &confidence) in labels_confidence.enumerate() {
                if confidence > best[label_id] {
                    best[label_id] = confidence;
                }
            }
        }

        best.into_iter()
            .enumerate()
            .map(|(label_id, confidence)| NsfwDetection {
                label: NSFW_LABELS[label_id],
                confidence,
            })
            .collect()
    }

    fn detect(
        &self,
        img: &RgbaImage,
        session: &mut Session,
    ) -> Result<Vec<NsfwDetection>, Box<dyn Error>> {
        let prep = self.prepare_image(img, 640);
        let raw = self.run_session(prep.blob, session)?;
        let detections = self.postprocess(&raw.view());
        Ok(detections)
    }

    pub fn stop(&self) -> Result<(), AppError> {
        self.is_stopping.store(true, Ordering::Relaxed);
        Ok(())
    }
}
