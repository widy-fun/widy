use crate::services::ExchangeRatesService;
use database::{DatabaseService, MessagesRepository, SettingsRepository};
use entity::{donations::Donation, messages::*};
use model::error::AppError;
use tauri::State;

#[tauri::command]
pub async fn get_messages(
    database_service: State<'_, DatabaseService>,
    exchange_rates_service: State<'_, ExchangeRatesService>,
    limit: u64,
    offset: u64,
    filter: MessagesFilter,
) -> Result<Vec<ClientMessage>, AppError> {
    let mut client_messages = database_service
        .get_messages(
            &limit,
            &offset,
            &filter.exclude_donations,
            &filter.exclude_subscriptions,
            &filter.exclude_follows,
            &filter.exclude_raids,
            &filter.exclude_redemptions,
            &filter.exclude_commands_actions,
            &filter.exclude_assistant_actions,
        )
        .await?;
    let settings = database_service
        .get_settings()
        .await?
        .ok_or(AppError::DbError("No settings".to_string()))?;
    for message in client_messages.iter_mut() {
        if let Some(donation) = &message.donation {
            let exchanged_amount = exchange_rates_service
                .calculate_amount_by_currency(
                    settings.currency.clone(),
                    donation.currency.clone(),
                    donation.amount,
                )
                .await;
            message.donation = Some(Donation {
                exchanged_amount: Some(exchanged_amount),
                exchanged_currency: Some(settings.currency.clone()),
                ..donation.clone()
            });
        }
    }

    return Ok(client_messages);
}
