use tauri::State;

use crate::{
    error::AppError,
    services::ai_assistant::{AiAssistantService, InputDeviceInfo},
};

#[tauri::command]
pub async fn get_input_devices(
    ai_assistant_service: State<'_, AiAssistantService>,
) -> Result<Vec<InputDeviceInfo>, AppError> {
    ai_assistant_service.get_input_devices()
}
