use crate::{error::AppError, services::assistant::AssistantService};
use tauri::State;

#[tauri::command]
pub async fn stop_assistant(
    assistant_service: State<'_, AssistantService>,
) -> Result<(), AppError> {
    assistant_service.stop()
}
