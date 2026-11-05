use model::{
    error::AppError,
    obs::{
        ObsGetSceneItemListRequest, ObsRequestData, ObsRequestDataType, ObsRequestType,
        ObsResponseData,
    },
};
use tauri::State;
use uuid::Uuid;

use crate::services::obs_service::ObsService;

#[tauri::command]
pub async fn get_obs_scene_sources(
    obs_service: State<'_, ObsService>,
    scene_uuid: Option<String>,
    scene_name: Option<String>,
) -> Result<ObsResponseData, AppError> {
    obs_service
        .send_request::<ObsResponseData>(ObsRequestData {
            request_type: ObsRequestType::GetSceneItemList,
            request_id: Uuid::new_v4(),
            request_data: Some(ObsRequestDataType::GetSceneItemList(
                ObsGetSceneItemListRequest {
                    scene_name,
                    scene_uuid,
                },
            )),
        })
        .await
}
