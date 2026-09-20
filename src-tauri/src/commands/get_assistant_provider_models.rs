use crate::{error::AppError, services::assistant::AssistantService};
use entity::assistant_settings::{ToolCallingModel, ToolCallingProvider};
use tauri::{AppHandle, State};

#[tauri::command]
pub async fn get_assistant_provider_models(
    app: AppHandle,
    assistant_service: State<'_, AssistantService>,
    provider: ToolCallingProvider,
) -> Result<Vec<ToolCallingModel>, AppError> {
    assistant_service
        .get_assistant_provider_models(&app, provider)
        .await
}
