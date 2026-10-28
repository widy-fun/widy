use database::{AuctionSettingsRepository, DatabaseService};
use entity::auction_settings::*;
use model::error::AppError;
use tauri::State;

#[tauri::command]
pub async fn get_auction_settings(
    database_service: State<'_, DatabaseService>,
) -> Result<Option<Model>, AppError> {
    database_service.get_auction_settings().await
}
