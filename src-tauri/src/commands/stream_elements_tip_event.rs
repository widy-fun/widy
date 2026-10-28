use crate::services::{StreamElementsEvent, StreamElementsService, StreamElementsTip};
use model::error::AppError;
use tauri::{AppHandle, State};

#[tauri::command]
pub async fn stream_elements_tip_event(
    app: AppHandle,
    stream_elements_service: State<'_, StreamElementsService>,
    event: StreamElementsEvent<StreamElementsTip>,
) -> Result<(), AppError> {
    stream_elements_service
        .tip_event(app.clone(), event)
        .await?;
    Ok(())
}
