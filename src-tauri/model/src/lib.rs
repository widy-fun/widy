use serde::{Deserialize, Serialize};
pub mod axum;
pub mod claude;
pub mod destream;
pub mod donate_pay;
pub mod donation_alerts;
pub mod events;
pub mod fish_audio;
pub mod gemini;
pub mod kick;
pub mod openai;
pub mod tribute;
pub mod tts;
pub mod twitch;

#[derive(Debug, Clone, Copy, Serialize, Deserialize)]
pub enum DonationSort {
    Newest,
    Largest,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub enum GrantType {
    #[serde(rename = "refresh_token")]
    RefreshToken,
    #[serde(rename = "authorization_code")]
    AuthorizationCode,
}
// impl GrantType {
//     pub fn to_string(t: GrantType) -> String {
//         match t {
//             RefreshToken => "refresh_token".to_string(),
//             AuthorizationCode => "authorization_code".to_string(),
//         }
//     }
// }
