use crate::services::DonatePayService;
use model::error::AppError;
use tauri::{AppHandle, State};

#[tauri::command]
pub async fn donate_pay_sign_out(
    app: AppHandle,
    donate_pay_service: State<'_, DonatePayService>,
) -> Result<(), AppError> {
    donate_pay_service.sign_out(&app).await
}
