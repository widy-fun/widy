use entity::settings::Currency;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct TributeEvent {
    pub id: String,
    pub data: EventData,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
#[allow(dead_code)]
pub struct EventData {
    pub r#type: EventType,
    pub donation_id: u64,
    pub author: u64,
    pub display_name: Option<String>,
    pub amount: u64,
    pub currency: Currency,
    pub message: Option<String>,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub enum EventType {
    #[serde(rename = "donation")]
    Donation,
}
