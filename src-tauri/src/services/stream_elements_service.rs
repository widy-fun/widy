use crate::services::EventsService;
use entity::{services::ServiceType, settings::Currency};
use model::error::{AppError, log_and_wrap_error};
use serde::{Deserialize, Serialize};
use tauri::AppHandle;

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct StreamElementsEvent<T> {
    channel: String,
    provider: String,
    r#type: String,
    #[serde(rename = "createdAt")]
    created_at: String,
    #[serde(rename = "isMock")]
    is_mock: Option<bool>,
    data: T,
    #[serde(rename = "updatedAt")]
    updated_at: String,
    _id: String,
    #[serde(rename = "activityId")]
    activity_id: String,
    #[serde(rename = "sessionEventsCount")]
    session_events_count: u64,
}
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct StreamElementsTip {
    amount: f64,
    avatar: String,
    #[serde(rename = "displayName")]
    display_name: Option<String>,
    username: Option<String>,
    #[serde(rename = "providerId")]
    provider_id: Option<String>,
    gifted: Option<bool>,
    currency: Option<Currency>,
    message: Option<String>,
}

#[derive(Clone, Debug)]
pub struct StreamElementsService {}

impl StreamElementsService {
    pub fn new() -> Self {
        Self {}
    }

    pub async fn tip_event(
        &self,
        app: AppHandle,
        event: StreamElementsEvent<StreamElementsTip>,
    ) -> Result<(), AppError> {
        EventsService::donation(
            event._id,
            ServiceType::Streamelements,
            event.data.username,
            event.data.currency.unwrap_or(Currency::USD),
            event.data.amount,
            event.data.message,
            &app,
        )
        .await
        .map_err(|e| log_and_wrap_error("StreamElements donate event", e))?;
        Ok(())
    }
}
