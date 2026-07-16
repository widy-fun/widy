use tauri::{AppHandle, Manager};
use uuid::Uuid;

use crate::{repositories::AlertsRepository, services::DatabaseService};

pub async fn get_alert_by_amount(
    app: &AppHandle,
    amount: f64,
    r#type: entity::messages::MessageType,
) -> Result<Option<entity::alerts::Alert>, String> {
    let database_service = app.state::<DatabaseService>();
    let default_alert = database_service
        .get_alert_by_id(Uuid::parse_str("ba234e82-7a86-4f77-850b-f2d739902595").unwrap())
        .await?;
    let alert = database_service
        .get_equal_amount_alert(amount, r#type.clone())
        .await
        .unwrap_or(None);
    if alert.is_some() {
        return Ok(alert);
    }
    let alert = database_service
        .get_grater_amount_alert(amount, r#type.clone())
        .await
        .unwrap_or(None);
    if alert.is_some() {
        return Ok(alert);
    }
    let alert = database_service
        .get_random_alert(r#type)
        .await
        .unwrap_or(None);
    if alert.is_some() {
        return Ok(alert);
    }

    Ok(default_alert)
}
