use crate::{error::AppError, services::ai_assistant::AiAssistantService};
use tauri::State;

#[tauri::command]
pub async fn stop_assistant(
    ai_assistant_service: State<'_, AiAssistantService>,
) -> Result<(), AppError> {
    ai_assistant_service.stop()
}
