use image::{DynamicImage, RgbaImage};
use rten_imageio::image_to_tensor;
use std::{
    error::Error,
    sync::{
        atomic::{AtomicBool, Ordering},
        Arc,
    },
};
use tokio::sync::Mutex;

use serde::{Deserialize, Serialize};
use tauri::{AppHandle, Manager};
use xcap::Window;

use crate::{
    constants::NSFW_LABELS,
    services::{AppEvent, ConfigService, EventMessage, WebSocketBroadcaster},
};
use rten::{FloatOperators, Model, NodeId};
use rten_tensor::prelude::*;
use rten_tensor::NdTensor;

#[derive(Debug, Clone, Serialize, Deserialize)]
struct NsfwDetection {
    pub label: &'static str,
    pub confidence: f32,
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
    pub fn new() -> Result<Self, String> {
        Ok(Self {
            is_stopping: Arc::new(AtomicBool::new(false)),
            selected_window: Arc::new(Mutex::new(None)),
        })
    }

    pub async fn start(&self, app: AppHandle, window_info: WindowInfo) -> Result<(), String> {
        let mut selected_window = self.selected_window.lock().await;
        if selected_window.is_some() {
            return Ok(());
        }
        *selected_window = Some(window_info.clone());

        drop(selected_window);

        self.is_stopping.store(false, Ordering::Relaxed);

        tauri::async_runtime::spawn(async move {
            let windows = Window::all()
                .map_err(|e| {
                    log::error!("Get windows error: {}", e);
                })
                .unwrap();

            if let Some(window) = windows.iter().find(|&w| {
                w.id()
                    .map_err(|e| {
                        log::error!("Get window ID error: {}", e);
                    })
                    .unwrap()
                    == window_info.id
            }) {
                let config_service = app.state::<ConfigService>();
                let nsfw_service = app.state::<NsfwService>();
                let websocket_broadcaster = app.state::<WebSocketBroadcaster>();
                let model = Model::load_file(config_service.nsfw_model_path.clone())
                    .map_err(|e| {
                        log::error!("Load NSFW model error: {}", e);
                    })
                    .unwrap();
                let images_id = model
                    .node_id("images")
                    .map_err(|e| {
                        log::error!("Get images node ID error: {}", e);
                    })
                    .unwrap();
                let output0_id = model
                    .node_id("output0")
                    .map_err(|e| {
                        log::error!("Get output0 node ID error: {}", e);
                    })
                    .unwrap();

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
                                .detect(image_buffer, &model, &images_id, &output0_id)
                                .map_err(|e| {
                                    log::error!("Detect image error: {}", e);
                                })
                            {
                                let _ = websocket_broadcaster
                                    .broadcast_event_message(&EventMessage {
                                        event: AppEvent::NsfwDetection,
                                        data: detections,
                                    })
                                    .await;
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

    pub async fn get_windows(&self) -> Result<Vec<WindowInfo>, String> {
        let windows = Window::all().map_err(|e| {
            log::error!("Get windows error: {}", e);
            e.to_string()
        })?;
        let mut windows_info: Vec<WindowInfo> = vec![];
        let selected_window = self.selected_window.lock().await.clone();
        for window in windows.clone() {
            let window_id = window.id().map_err(|e| {
                log::error!("Get window ID error: {}", e);
                e.to_string()
            })?;
            let selected = if let Some(selected_window) = &selected_window {
                selected_window.id == window_id
            } else {
                false
            };
            windows_info.push(WindowInfo {
                title: window.title().map_err(|e| {
                    log::error!("Get window title error: {}", e);
                    e.to_string()
                })?,
                id: window_id,
                selected,
            });
        }
        Ok(windows_info)
    }

    fn detect(
        &self,
        img: RgbaImage,
        model: &Model,
        images_id: &NodeId,
        output0_id: &NodeId,
    ) -> Result<Vec<NsfwDetection>, Box<dyn Error>> {
        let image = image_to_tensor(DynamicImage::ImageRgba8(img))?.with_new_axis(0);
        let image = image.resize_image([640, 640])?;
        let [output] = model.run_n(vec![(*images_id, image.view().into())], [*output0_id], None)?;
        let output: NdTensor<f32, 3> = output.try_into()?;
        let scores = output.slice((.., 4.., ..));
        let num_boxes = scores.shape()[2];
        let detections = NSFW_LABELS
            .iter()
            .enumerate()
            .map(|(class_id, label)| {
                let max_confidence = (0..num_boxes)
                    .map(|box_idx| scores[[0, class_id, box_idx]])
                    .fold(0.0, f32::max);

                NsfwDetection {
                    label,
                    confidence: max_confidence,
                }
            })
            .collect();

        Ok(detections)
    }

    pub fn stop(&self) -> Result<(), String> {
        self.is_stopping.store(true, Ordering::Relaxed);
        Ok(())
    }
}
