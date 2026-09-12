use std::path::PathBuf;

use ndarray::{Array1, Array3};
use ort::{session::Session, value::TensorRef};

use crate::{constants::TARGET_SR, error::AppError, utils::log_and_wrap_error};

const VAD_FRAME: usize = 512;

pub struct VadEngine {
    vad: Session,
    vad_leftover: Vec<f32>,
    vad_h: Array3<f32>,
    vad_c: Array3<f32>,
    sr: Array1<i64>,
}

impl VadEngine {
    pub async fn new(wake_word_path: PathBuf) -> Result<Self, AppError> {
        let vad = tokio::task::spawn_blocking(move || -> Result<Session, AppError> {
            Ok(Session::builder()?
                .with_log_level(ort::logging::LogLevel::Fatal)?
                .commit_from_file(wake_word_path.join("silero_vad.onnx"))?)
        })
        .await?
        .map_err(|e| log_and_wrap_error("Build VAD session", e))?;

        Ok(Self {
            vad,
            vad_h: Array3::zeros((2, 1, 64)),
            vad_c: Array3::zeros((2, 1, 64)),
            vad_leftover: Vec::with_capacity(VAD_FRAME * 2),
            sr: Array1::from_elem(1, TARGET_SR as i64),
        })
    }

    pub fn process(&mut self, audio: &[f32]) -> Result<f32, AppError> {
        self.vad_leftover.extend_from_slice(audio);

        let mut offset = 0;
        let mut max_score = 0.0_f32;
        let mut processed = false;

        while offset + VAD_FRAME <= self.vad_leftover.len() {
            let chunk = &self.vad_leftover[offset..offset + VAD_FRAME];

            let input = ndarray::ArrayView2::from_shape((1, VAD_FRAME), chunk)?;

            let outputs = self.vad.run(ort::inputs! {
                "input" => TensorRef::from_array_view(input)?,
                "sr" => TensorRef::from_array_view(self.sr.view())?,
                "h" => TensorRef::from_array_view(self.vad_h.view())?,
                "c" => TensorRef::from_array_view(self.vad_c.view())?,
            })?;

            let (_, output) = outputs[0].try_extract_tensor::<f32>()?;

            if let Some(score) = output.first() {
                max_score = max_score.max(*score);
                processed = true;
            }

            let (_, h) = outputs[1].try_extract_tensor::<f32>()?;

            let (_, c) = outputs[2].try_extract_tensor::<f32>()?;

            self.vad_h.as_slice_mut().unwrap().copy_from_slice(h);

            self.vad_c.as_slice_mut().unwrap().copy_from_slice(c);

            offset += VAD_FRAME;
        }

        if offset > 0 {
            let remaining = self.vad_leftover.len() - offset;

            self.vad_leftover.copy_within(offset.., 0);

            self.vad_leftover.truncate(remaining);
        }

        Ok(if processed { max_score } else { 0.0 })
    }

    pub fn reset_vad(&mut self) {
        self.vad_h.fill(0.0);
        self.vad_c.fill(0.0);
        self.vad_leftover.clear();
    }
}
