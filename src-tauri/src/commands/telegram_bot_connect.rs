use crate::{error::AppError, services::telegram_bot::telegram_bot_service::TelegramBotService};
use tauri::{AppHandle, State};

#[tauri::command]
pub async fn telegram_bot_connect(
    app: AppHandle,
    telegram_bot_service: State<'_, TelegramBotService>,
) -> Result<(), AppError> {
    telegram_bot_service.connect(&app).await
}
