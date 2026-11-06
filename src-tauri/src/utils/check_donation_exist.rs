use database::{DatabaseService, DonationsRepository};
use model::error::AppError;
use tauri::{AppHandle, Manager};

pub async fn check_donation_exist(app: &AppHandle, service_id: &str) -> Result<(), AppError> {
    let database_service = app.state::<DatabaseService>();
    match database_service
        .get_donation_by_service_id(service_id.to_string())
        .await
    {
        Ok(old_donation) => {
            if old_donation.is_some() {
                return Err(AppError::DbError("Donation exist".to_string()));
            }
        }
        Err(e) => return Err(e),
    };
    Ok(())
}
