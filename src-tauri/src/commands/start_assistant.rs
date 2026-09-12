use crate::{error::AppError, services::assistant::AssistantService};
use tauri::{AppHandle, State};

#[tauri::command]
pub async fn start_assistant(
    app: AppHandle,
    assistant_service: State<'_, AssistantService>,
    assistant_settings: entity::assistant_settings::Model,
) -> Result<(), AppError> {
    assistant_service.start(app, assistant_settings).await
}
