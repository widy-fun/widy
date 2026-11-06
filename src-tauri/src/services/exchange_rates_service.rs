use chrono::Utc;
use entity::settings::Currency;
use serde::Deserialize;
use std::{collections::HashMap, fmt::Debug, sync::Mutex};

#[derive(Debug, Deserialize)]
struct ExchangeRatesResponse {
    data: ExchangeRatesData,
}

#[derive(Clone, Debug, Deserialize)]
struct ExchangeRatesData {
    rates: HashMap<String, String>,
}
pub struct ExchangeRatesService {
    rates: Mutex<Option<HashMap<String, String>>>,
    virtual_rates: HashMap<String, String>,
    fetch_timestamp: Mutex<i64>,
}

impl ExchangeRatesService {
    pub fn new() -> Self {
        let mut virtual_rates: HashMap<String, String> = HashMap::new();
        virtual_rates.insert(
            Currency::as_str(&Currency::BITS).to_string(),
            "100.0".to_string(),
        );
        virtual_rates.insert(
            Currency::as_str(&Currency::KICKS).to_string(),
            "100.0".to_string(),
        );
        Self {
            fetch_timestamp: Mutex::new(0),
            rates: Mutex::new(None),
            virtual_rates,
        }
    }

    pub async fn get_exchange_rates(&self) -> Option<HashMap<String, String>> {
        let now_utc = Utc::now();
        let fetch_timestamp = { self.fetch_timestamp.lock().unwrap().clone() };

        if fetch_timestamp + 5 * 3600 > now_utc.timestamp() {
            return self.rates.lock().unwrap().clone();
        }

        let url = "https://api.coinbase.com/v2/exchange-rates?currency=USD";

        let response = match reqwest::get(url).await {
            Ok(res) => res,
            Err(e) => {
                log::error!("Exchange rates reqwest error: {}", e.to_string());
                return None;
            }
        };

        let exchange_rates: ExchangeRatesResponse = match response.json().await {
            Ok(rates) => rates,
            Err(e) => {
                log::error!("Exchange rates parse response error: {}", e.to_string());
                return None;
            }
        };

        *self.rates.lock().unwrap() = Some(exchange_rates.data.rates.clone());

        *self.fetch_timestamp.lock().unwrap() = Utc::now().timestamp();

        return Some(exchange_rates.data.rates);
    }

    pub async fn calculate_amount_by_currency(
        &self,
        base_currency: Currency,
        target_currency: Currency,
        target_amount: f64,
    ) -> f64 {
        let rates = match self.get_exchange_rates().await {
            Some(rates) => rates,
            _ => return 0.0,
        };
        if base_currency == Currency::USD {
            let target_rate = rates
                .get(target_currency.as_str())
                .unwrap_or(&"1.0".to_string())
                .parse::<f64>()
                .unwrap_or(1.0);
            return target_amount / target_rate;
        }
        let target_rate = if target_currency == Currency::BITS || target_currency == Currency::KICKS
        {
            self.virtual_rates
                .get(target_currency.as_str())
                .unwrap()
                .parse::<f64>()
                .unwrap()
        } else {
            rates
                .get(target_currency.as_str())
                .unwrap_or(&"1.0".to_string())
                .parse::<f64>()
                .unwrap_or(1.0)
        };
        let base_rate = rates
            .get(base_currency.as_str())
            .unwrap_or(&"1.0".to_string())
            .parse::<f64>()
            .unwrap_or(1.0);
        return target_amount / (target_rate / base_rate);
    }
}
