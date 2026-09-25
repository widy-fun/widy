use std::{
    collections::HashMap,
    sync::{Arc, Mutex},
};

use ort::session::Session;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct AudioConfig {
    pub sample_rate: u32,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct PiperInferenceConfig {
    pub noise_scale: f32,
    pub length_scale: f32,
    pub noise_w: f32,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
pub struct PiperModelConfig {
    pub audio: AudioConfig,
    pub inference: PiperInferenceConfig,
    pub num_speakers: u32,
    pub phoneme_id_map: HashMap<char, Vec<i64>>,
}
#[derive(Clone, Debug)]
pub struct Piper {
    pub session: Arc<Mutex<Session>>,
    pub config: Arc<PiperModelConfig>,
}
