use model::{
    error::AppError,
    obs::{ObsRequestData, ObsRequestType, ObsResponseData},
};
use tauri::State;
use uuid::Uuid;

use crate::services::obs_service::ObsService;

#[tauri::command]
pub async fn get_obs_scenes(
    obs_service: State<'_, ObsService>,
) -> Result<ObsResponseData, AppError> {
    obs_service
        .send_request::<ObsResponseData>(ObsRequestData {
            request_type: ObsRequestType::GetSceneList,
            request_id: Uuid::new_v4(),
            request_data: None,
        })
        .await
}
