use crate::services::DonatePayService;
use model::error::AppError;
use tauri::{AppHandle, State};

#[tauri::command]
pub async fn donate_pay_connect(
    app: AppHandle,
    donate_pay_service: State<'_, DonatePayService>,
) -> Result<(), AppError> {
    donate_pay_service.connect(&app).await
}
