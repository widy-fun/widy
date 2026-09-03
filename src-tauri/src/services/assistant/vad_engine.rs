use std::path::PathBuf;

use ndarray::{Array1, Array2, Array3};
use ort::{session::Session, value::TensorRef};

use crate::{
    constants::{TARGET_SR, VAD_FRAME},
    error::AppError,
    utils::log_and_wrap_error,
};

pub struct VadEngine {
    vad: Session,
    vad_leftover: Vec<f32>,
    vad_h: Array3<f32>,
    vad_c: Array3<f32>,
}

impl VadEngine {
    pub async fn new(wake_word_path: PathBuf) -> Result<Self, AppError> {
        let vad = tokio::task::spawn_blocking(move || -> Result<Session, AppError> {
            Ok(Session::builder()?.commit_from_file(wake_word_path.join("silero_vad.onnx"))?)
        })
        .await?
        .map_err(|e| log_and_wrap_error("Build VAD session", e))?;

        Ok(Self {
            vad,
            vad_h: Array3::zeros((2, 1, 64)),
            vad_c: Array3::zeros((2, 1, 64)),
            vad_leftover: vec![],
        })
    }

    pub fn process_vad(&mut self, audio: &[f32]) -> Result<f32, AppError> {
        self.vad_leftover.extend_from_slice(audio);
        let mut scores = Vec::new();
        let mut offset = 0;

        while self.vad_leftover.len() - offset >= VAD_FRAME {
            let chunk = &self.vad_leftover[offset..offset + VAD_FRAME];

            let input = Array2::from_shape_vec((1, VAD_FRAME), chunk.to_vec())?;
            let sr = Array1::from_vec(vec![TARGET_SR as i64]);

            let outputs = self.vad.run(ort::inputs! {
                "input" => TensorRef::from_array_view(input.view())?,
                "sr" => TensorRef::from_array_view(sr.view())?,
                "h" => TensorRef::from_array_view(self.vad_h.view())?,
                "c" => TensorRef::from_array_view(self.vad_c.view())?,
            })?;

            let (_, output) = outputs[0].try_extract_tensor::<f32>()?;
            if let Some(score) = output.first() {
                scores.push(*score);
            }

            let (_, h) = outputs[1].try_extract_tensor::<f32>()?;
            let (_, c) = outputs[2].try_extract_tensor::<f32>()?;
            self.vad_h = Array3::from_shape_vec((2, 1, 64), h.to_vec())?;
            self.vad_c = Array3::from_shape_vec((2, 1, 64), c.to_vec())?;

            offset += VAD_FRAME;
        }

        self.vad_leftover.drain(..offset);

        if scores.is_empty() {
            return Ok(0.0);
        }
        Ok(scores.into_iter().fold(0.0_f32, f32::max))
    }

    fn reset_vad(&mut self) {
        self.vad_h.fill(0.0);

        self.vad_c.fill(0.0);
    }
}
