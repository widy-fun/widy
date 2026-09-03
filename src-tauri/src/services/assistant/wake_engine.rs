use std::path::PathBuf;

use ndarray::{Array2, Array3, Array4};
use ort::{session::Session, value::TensorRef};

use crate::{
    error::AppError, services::assistant::vad_engine::VadEngine, utils::log_and_wrap_error,
};

pub struct WakeResult {
    pub vad: f32,
    pub wake: f32,
}

pub struct WakeEngine {
    mel: Session,
    embedding: Session,
    wake: Session,
    mel_history: Vec<f32>,
    embedding_history: Vec<f32>,
    wake_frames: usize,
    vad_engine: VadEngine,
}

impl WakeEngine {
    pub async fn new(wake_word_path: PathBuf) -> Result<Self, AppError> {
        let vad_engine = VadEngine::new(wake_word_path.clone()).await?;
        let wake_word_path_clone = wake_word_path.clone();
        let mel = tokio::task::spawn_blocking(move || -> Result<Session, AppError> {
            Ok(Session::builder()?
                .commit_from_file(wake_word_path_clone.join("melspectrogram.onnx"))?)
        })
        .await?
        .map_err(|e| log_and_wrap_error("Build melspectrogram session", e))?;
        let wake_word_path_clone = wake_word_path.clone();
        let embedding = tokio::task::spawn_blocking(move || -> Result<Session, AppError> {
            Ok(Session::builder()?
                .commit_from_file(wake_word_path_clone.join("embedding_model.onnx"))?)
        })
        .await?
        .map_err(|e| log_and_wrap_error("Build embedding session", e))?;
        let wake =
            tokio::task::spawn_blocking(move || -> Result<Session, AppError> {
                Ok(Session::builder()?
                    .commit_from_file(wake_word_path.join("hey_jarvis_v0.1.onnx"))?)
            })
            .await?
            .map_err(|e| log_and_wrap_error("Build hey_jarvis session", e))?;

        let wake_frames = 16;

        Ok(Self {
            mel,
            embedding,
            vad_engine,
            wake,
            mel_history: Vec::with_capacity(97 * 32),
            embedding_history: Vec::with_capacity(120 * 96),
            wake_frames,
        })
    }

    pub fn process(&mut self, audio: &[f32]) -> Result<WakeResult, AppError> {
        let vad_score = self.vad_engine.process_vad(audio)?;

        if vad_score < 0.1 {
            return Ok(WakeResult {
                vad: vad_score,
                wake: 0.0,
            });
        }

        let pcm_i16: Vec<i16> = audio
            .iter()
            .map(|x| (x.clamp(-1.0, 1.0) * 32767.0) as i16)
            .collect();

        let input = Array2::from_shape_vec(
            (1, pcm_i16.len()),
            pcm_i16.iter().map(|x| *x as f32).collect(),
        )?;

        let outputs = self
            .mel
            .run(ort::inputs!["input" => TensorRef::from_array_view(input.view())?])?;

        let (_, mel_data) = outputs[0].try_extract_tensor::<f32>()?;

        for x in mel_data {
            self.mel_history.push(*x / 10.0 + 2.0);
        }

        const MAX_MEL: usize = 97 * 10 * 32;

        if self.mel_history.len() > MAX_MEL {
            let remove = self.mel_history.len() - MAX_MEL;

            self.mel_history.drain(..remove);
        }

        let frames = self.mel_history.len() / 32;

        if frames < 76 {
            return Ok(WakeResult {
                vad: vad_score,
                wake: 0.0,
            });
        }

        let start = (frames - 76) * 32;

        let window = self.mel_history[start..start + 76 * 32].to_vec();

        let embedding_input = Array4::from_shape_vec((1, 76, 32, 1), window)?;

        let outputs = self.embedding.run(ort::inputs![
            "input_1" =>
                TensorRef::from_array_view(
                    embedding_input.view()
                )?
        ])?;

        let (_, embedding_data) = outputs[0].try_extract_tensor::<f32>()?;

        self.embedding_history.extend_from_slice(embedding_data);

        const MAX_EMBEDDINGS: usize = 120 * 96;

        if self.embedding_history.len() > MAX_EMBEDDINGS {
            let remove = self.embedding_history.len() - MAX_EMBEDDINGS;

            self.embedding_history.drain(..remove);
        }

        let needed = self.wake_frames * 96;

        if self.embedding_history.len() < needed {
            return Ok(WakeResult {
                vad: vad_score,
                wake: 0.0,
            });
        }

        let start = self.embedding_history.len() - needed;

        let features = self.embedding_history[start..].to_vec();

        let wake_input = Array3::from_shape_vec((1, self.wake_frames, 96), features)?;

        let outputs = self.wake.run(ort::inputs![
            "x.1" =>
                TensorRef::from_array_view(
                    wake_input.view()
                )?
        ])?;

        let (_, prediction) = outputs[0].try_extract_tensor::<f32>()?;

        let wake_score = prediction.first().copied().unwrap_or(0.0);

        Ok(WakeResult {
            vad: vad_score,
            wake: wake_score,
        })
    }

    pub fn reset_wake(&mut self) {
        self.mel_history.clear();
        self.embedding_history.clear();
    }
}
