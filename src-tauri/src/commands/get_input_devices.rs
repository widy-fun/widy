use tauri::{AppHandle, State};

use crate::{
    error::AppError,
    services::assistant::{AssistantService, InputDeviceInfo},
};

#[tauri::command]
pub async fn get_input_devices(
    app: AppHandle,
    assistant_service: State<'_, AssistantService>,
) -> Result<Vec<InputDeviceInfo>, AppError> {
    assistant_service.get_input_devices(&app).await
}
