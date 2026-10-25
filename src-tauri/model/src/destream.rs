use entity::settings::Currency;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Deserialize, Serialize)]
#[allow(dead_code)]
pub struct DestreamEvent {
    pub r#type: u32,
    pub target: EventTarget,
    pub arguments: Vec<EventArgument>,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct EventArgument {
    #[serde(rename = "testData")]
    pub test_data: Vec<Donation>,
    pub data: Vec<Donation>,
}
#[derive(Debug, Clone, Deserialize, Serialize)]
#[allow(dead_code)]
pub struct Donation {
    pub id: String,
    pub description: Option<String>,
    pub username: Option<String>,
    pub moderated: bool,
    #[serde(rename = "userDisplayCurrencyId")]
    pub user_display_currency_id: Currency,
    #[serde(rename = "userDisplayCurrencyAmount")]
    pub user_display_currency_amount: f64,
    #[serde(rename = "sourceCurrencyId")]
    pub source_currency_id: Currency,
    #[serde(rename = "sourceCurrencyAmount")]
    pub source_currency_amount: f64,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub enum EventTarget {
    #[serde(rename = "newDonationsReceived")]
    NewDonationsReceived,
}
