use crate::services::assistant::{AssistantService, InputDeviceInfo};
use model::error::AppError;
use tauri::{AppHandle, State};

#[tauri::command]
pub async fn get_input_devices(
    app: AppHandle,
    assistant_service: State<'_, AssistantService>,
) -> Result<Vec<InputDeviceInfo>, AppError> {
    assistant_service.get_input_devices(&app).await
}
