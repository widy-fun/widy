use crate::{
    error::AppError,
    services::ai_assistant::{AiAssistantService, InputDeviceInfo},
};
use tauri::{AppHandle, State};

#[tauri::command]
pub async fn start_assistant(
    app: AppHandle,
    ai_assistant_service: State<'_, AiAssistantService>,
    device_info: InputDeviceInfo,
) -> Result<(), AppError> {
    ai_assistant_service.start(&app, device_info).await
}
