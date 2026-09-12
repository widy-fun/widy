use std::path::{Path, PathBuf};

use ndarray::{Array2, Array3, Array4};
use ort::{session::Session, value::TensorRef};

use crate::{error::AppError, utils::log_and_wrap_error};

const WAKE_FRAMES: usize = 16;
const EMBEDDING_FEATURE_DIM: usize = 96;
const MEL_BINS_PER_FRAME: usize = 32;
const EMBEDDING_WINDOW_FRAMES: usize = 76;
const MEL_NORMALIZE_SCALE: f32 = 10.0;
const MEL_NORMALIZE_OFFSET: f32 = 2.0;
const PCM16_FULL_SCALE: f32 = 32767.0;
const MAX_MEL: usize = 97 * 10 * 32;
const MAX_EMBEDDINGS: usize = 120 * 96;

pub struct WakeEngine {
    mel: Session,
    embedding: Session,
    wake: Session,
    mel_history: Vec<f32>,
    embedding_history: Vec<f32>,
}

impl WakeEngine {
    pub async fn new(wake_word_path: PathBuf) -> Result<Self, AppError> {
        let mel = Self::load_session(
            &wake_word_path,
            "melspectrogram.onnx",
            "Build melspectrogram session",
        )
        .await?;
        let embedding = Self::load_session(
            &wake_word_path,
            "embedding_model.onnx",
            "Build embedding session",
        )
        .await?;
        let wake = Self::load_session(
            &wake_word_path,
            "hey_jarvis_v0.1.onnx",
            "Build hey_jarvis session",
        )
        .await?;

        Ok(Self {
            mel,
            embedding,
            wake,
            mel_history: Vec::with_capacity(MAX_MEL),
            embedding_history: Vec::with_capacity(MAX_EMBEDDINGS),
        })
    }

    async fn load_session(
        dir: &Path,
        filename: &str,
        error_context: &'static str,
    ) -> Result<Session, AppError> {
        let path = dir.join(filename);
        tokio::task::spawn_blocking(move || -> Result<Session, AppError> {
            Ok(Session::builder()?
                .with_log_level(ort::logging::LogLevel::Fatal)?
                .commit_from_file(path)?)
        })
        .await?
        .map_err(|e| log_and_wrap_error(error_context, e))
    }

    pub fn process(&mut self, audio: &[f32]) -> Result<f32, AppError> {
        let mel_frames = self.run_mel(audio)?;
        self.mel_history.extend(mel_frames);
        Self::truncate_front(&mut self.mel_history, MAX_MEL);

        let Some(embedding_data) = self.run_embedding()? else {
            return Ok(0.0);
        };

        self.embedding_history.extend_from_slice(&embedding_data);
        Self::truncate_front(&mut self.embedding_history, MAX_EMBEDDINGS);

        self.run_wake()
    }

    fn run_mel(&mut self, audio: &[f32]) -> Result<Vec<f32>, AppError> {
        let pcm_as_f32: Vec<f32> = audio
            .iter()
            .map(|x| (x.clamp(-1.0, 1.0) * PCM16_FULL_SCALE) as i16 as f32)
            .collect();

        let input = Array2::from_shape_vec((1, pcm_as_f32.len()), pcm_as_f32)?;

        let outputs = self
            .mel
            .run(ort::inputs!["input" => TensorRef::from_array_view(input.view())?])?;
        let (_, mel_data) = outputs[0].try_extract_tensor::<f32>()?;

        Ok(mel_data
            .iter()
            .map(|x| x / MEL_NORMALIZE_SCALE + MEL_NORMALIZE_OFFSET)
            .collect())
    }

    fn run_embedding(&mut self) -> Result<Option<Vec<f32>>, AppError> {
        let frames = self.mel_history.len() / MEL_BINS_PER_FRAME;
        if frames < EMBEDDING_WINDOW_FRAMES {
            return Ok(None);
        }

        let start = (frames - EMBEDDING_WINDOW_FRAMES) * MEL_BINS_PER_FRAME;
        let window =
            self.mel_history[start..start + EMBEDDING_WINDOW_FRAMES * MEL_BINS_PER_FRAME].to_vec();

        let embedding_input =
            Array4::from_shape_vec((1, EMBEDDING_WINDOW_FRAMES, MEL_BINS_PER_FRAME, 1), window)?;

        let outputs = self.embedding.run(ort::inputs![
            "input_1" => TensorRef::from_array_view(embedding_input.view())?
        ])?;
        let (_, embedding_data) = outputs[0].try_extract_tensor::<f32>()?;

        Ok(Some(embedding_data.to_vec()))
    }

    fn run_wake(&mut self) -> Result<f32, AppError> {
        let needed = WAKE_FRAMES * EMBEDDING_FEATURE_DIM;
        if self.embedding_history.len() < needed {
            return Ok(0.0);
        }

        let start = self.embedding_history.len() - needed;
        let features = self.embedding_history[start..].to_vec();

        let wake_input = Array3::from_shape_vec((1, WAKE_FRAMES, EMBEDDING_FEATURE_DIM), features)?;

        let outputs = self.wake.run(ort::inputs![
            "x.1" => TensorRef::from_array_view(wake_input.view())?
        ])?;
        let (_, prediction) = outputs[0].try_extract_tensor::<f32>()?;

        Ok(prediction.first().copied().unwrap_or(0.0))
    }

    pub fn reset_wake(&mut self) {
        self.mel_history.clear();
        self.embedding_history.clear();
    }

    fn truncate_front<T>(buf: &mut Vec<T>, max: usize) {
        if buf.len() > max {
            let remove = buf.len() - max;
            buf.drain(..remove);
        }
    }
}
