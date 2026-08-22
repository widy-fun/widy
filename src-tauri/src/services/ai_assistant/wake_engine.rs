use std::path::PathBuf;

use ndarray::{Array1, Array2, Array3, Array4};
use ort::{session::Session, value::TensorRef};

use crate::{
    constants::{TARGET_SR, VAD_FRAME},
    error::AppError,
};

pub struct WakeResult {
    pub vad: f32,
    pub wake: f32,
}

pub struct WakeEngine {
    vad_leftover: Vec<f32>,
    mel: Session,
    embedding: Session,
    vad: Session,
    wake: Session,
    vad_h: Array3<f32>,
    vad_c: Array3<f32>,
    mel_history: Vec<f32>,
    embedding_history: Vec<f32>,
    wake_frames: usize,
}

impl WakeEngine {
    pub fn new(wake_word_path: PathBuf) -> Result<Self, AppError> {
        let mel =
            Session::builder()?.commit_from_file(wake_word_path.join("melspectrogram.onnx"))?;

        let embedding =
            Session::builder()?.commit_from_file(wake_word_path.join("embedding_model.onnx"))?;

        let vad = Session::builder()?.commit_from_file(wake_word_path.join("silero_vad.onnx"))?;

        let wake =
            Session::builder()?.commit_from_file(wake_word_path.join("hey_jarvis_v0.1.onnx"))?;

        let wake_frames = 16;

        Ok(Self {
            mel,
            embedding,
            vad,
            wake,
            vad_h: Array3::zeros((2, 1, 64)),
            vad_c: Array3::zeros((2, 1, 64)),
            mel_history: Vec::with_capacity(97 * 32),
            embedding_history: Vec::with_capacity(120 * 96),
            wake_frames,
            vad_leftover: vec![],
        })
    }

    pub fn process(&mut self, audio: &[f32]) -> Result<WakeResult, AppError> {
        let vad_score = self.process_vad(audio)?;

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

    fn process_vad(&mut self, audio: &[f32]) -> Result<f32, AppError> {
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

    pub fn reset_wake(&mut self) {
        self.mel_history.clear();

        self.embedding_history.clear();
    }

    fn reset_vad(&mut self) {
        self.vad_h.fill(0.0);

        self.vad_c.fill(0.0);
    }
}
