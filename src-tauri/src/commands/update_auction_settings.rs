use database::{AuctionSettingsRepository, DatabaseService};
use entity::auction_settings::*;
use model::error::AppError;
use tauri::State;

#[tauri::command]
pub async fn update_auction_settings(
    database_service: State<'_, DatabaseService>,
    auction_settings: Model,
) -> Result<(), AppError> {
    database_service
        .update_auction_settings(auction_settings.clone())
        .await
}
