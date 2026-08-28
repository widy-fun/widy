pub const SQLITE_DB: &str = "database.db";
pub const HTTP_WIDGET_PORT: u16 = 12553;
pub const STATIC_DIR: &str = "static";
pub const USDT_MULTIPLICATION: f64 = 1_000_000.00;
pub const NSFW_LABELS: &[&str] = &["anus", "make_love", "nipple", "penis", "vagina"];
pub const BOS: char = '^';
pub const EOS: char = '$';
pub const PAD: char = '_';
pub const TARGET_SR: u32 = 16_000;

// 80 ms @ 16 kHz.
pub const FRAME_SIZE: usize = 1280;

// Silero VAD frame.
// Для v5 при 16 kHz допустимы 512/1024/1536.
// Здесь используем 512.
pub const VAD_FRAME: usize = 512;

pub const VAD_THRESHOLD: f32 = 0.5;
pub const WAKE_THRESHOLD: f32 = 0.5;
pub const SILENCE_HANGOVER_FRAMES: u32 = 20;

// Safety valve so a stuck-open mic doesn't buffer forever.
pub const MAX_UTTERANCE_FRAMES: usize = TARGET_SR as usize * 15; // ~15s

pub const OPENAI_API_URL: &str = "https://api.openai.com/v1/responses";

pub const TRANSCRIPTION_URL: &str = "https://api.openai.com/v1/audio/transcriptions";
