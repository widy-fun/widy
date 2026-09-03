use crate::{
    error::AppError,
    services::assistant::{AssistantService, AssistantStatus},
};
use tauri::State;

#[tauri::command]
pub async fn get_assistant_status(
    assistant_service: State<'_, AssistantService>,
) -> Result<AssistantStatus, AppError> {
    assistant_service.get_assistant_status()
}
