use database::{DatabaseService, DonationsRepository};
use entity::donations::Donation;
use model::DonationSort;
use model::error::AppError;
use tauri::State;

#[tauri::command]
pub async fn get_donations(
    database_service: State<'_, DatabaseService>,
    from: Option<i64>,
    to: Option<i64>,
    limit: u64,
    sort: DonationSort,
) -> Result<Vec<Donation>, AppError> {
    database_service.get_donations(from, to, limit, sort).await
}
