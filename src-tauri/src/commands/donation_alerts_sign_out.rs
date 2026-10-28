use crate::services::DonationAlertsService;
use model::error::AppError;
use tauri::{AppHandle, State};

#[tauri::command]
pub async fn donation_alerts_sign_out(
    app: AppHandle,
    donation_alerts_service: State<'_, DonationAlertsService>,
) -> Result<(), AppError> {
    donation_alerts_service.sign_out(&app).await
}
