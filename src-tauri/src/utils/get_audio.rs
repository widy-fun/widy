use crate::{services::tts::TtsService, utils::remove_links};
use entity::alerts::Alert;
use tauri::{AppHandle, Manager};
use uuid::Uuid;

pub async fn get_audio(
    text: Option<String>,
    app: &AppHandle,
    id: &Uuid,
    alert: &Alert,
) -> Option<String> {
    let tts_service = app.state::<TtsService>();
    let audio = if let Some(text) = text {
        match tts_service
            .make_audio(
                &remove_links(&text),
                &id.to_string(),
                &app,
                alert.tts_settings.clone(),
            )
            .await
        {
            Ok(audio) => Some(audio),
            Err(e) => {
                log::error!("Make audio error: {}", e.to_string());
                None
            }
        }
    } else {
        None
    };
    audio
}
