use serde::Deserialize;

#[derive(Deserialize, Debug)]
pub struct TranscriptionResponse {
    pub text: String,
}
