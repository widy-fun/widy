use tauri::{AppHandle, State};

use crate::{error::AppError, services::telegram_bot::telegram_bot_service::TelegramBotService};

#[tauri::command]
pub async fn telegram_bot_sign_out(
    app: AppHandle,
    telegram_bot_service: State<'_, TelegramBotService>,
) -> Result<(), AppError> {
    telegram_bot_service.sign_out(&app).await
}
