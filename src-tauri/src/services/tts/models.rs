use std::{
    collections::HashMap,
    sync::{Arc, Mutex},
};

use ort::session::Session;
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize, Clone, Serialize)]

pub struct PiperLanguage {
    pub code: String,
    pub family: String,
    pub region: String,
    pub name_english: String,
    pub country_english: String,
}

#[derive(Debug, Deserialize, Clone, Serialize)]
pub struct PiperFileInfo {
    pub size_bytes: u64,
    #[allow(dead_code)]
    pub md5_digest: String,
}

#[derive(Debug, Deserialize, Clone, Serialize)]
pub struct PiperVoice {
    pub key: String,
    pub name: String,
    pub language: PiperLanguage,
    pub quality: String,
    pub num_speakers: u32,
    pub files: HashMap<String, PiperFileInfo>,
    #[serde(default)]
    pub aliases: Vec<String>,
}

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

pub type PiperVoices = HashMap<String, PiperVoice>;

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
