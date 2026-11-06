use crate::services::ExchangeRatesService;
use std::collections::HashMap;
use tauri::State;

#[tauri::command]
pub async fn get_exchange_rates(
    exchange_rates_service: State<'_, ExchangeRatesService>,
) -> Result<Option<HashMap<String, String>>, ()> {
    let rates = exchange_rates_service.get_exchange_rates().await;
    Ok(rates)
}
