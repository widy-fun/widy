use tauri::{AppHandle, State};

use crate::services::DonatePayService;

#[tauri::command]
pub async fn donate_pay_sign_out(
    app: AppHandle,
    donate_pay_service: State<'_, DonatePayService>,
) -> Result<(), String> {
    donate_pay_service.sign_out(&app).await
}
