pub const SQLITE_DB: &str = "database.db";
pub const HTTP_WIDGET_PORT: u16 = 12553;
pub const STATIC_DIR: &str = "static";
pub const USDT_MULTIPLICATION: f64 = 1_000_000.00;
pub const NSFW_LABELS: &[&str] = &["anus", "make_love", "nipple", "penis", "vagina"];
pub const BOS: char = '^';
pub const EOS: char = '$';
pub const PAD: char = '_';
pub const TARGET_SR: u32 = 16_000;

pub const NON_STREAMING_STT_MODELS: &[&str] = &[
    "whisper-tiny",
    "whisper-base",
    "whisper-small",
    "whisper-medium",
    "whisper-large-v3-turbo",
    "parakeet-tdt-0.6b-v2",
];

pub const STREAMING_STT_MODELS: &[&str] = &[
    "nemotron-3.5-asr-streaming-0.6b",
    "nemotron-speech-streaming-en-0.6b",
    "nemotron-speech-streaming-es-0.6b",
];
