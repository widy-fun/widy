use model::{
    error::AppError,
    obs::{
        ObsGetSourceFilterListRequest, ObsRequestData, ObsRequestDataType, ObsRequestType,
        ObsResponseData,
    },
};
use tauri::State;
use uuid::Uuid;

use crate::services::obs_service::ObsService;

#[tauri::command]
pub async fn get_obs_source_filters(
    obs_service: State<'_, ObsService>,
    source_uuid: Option<String>,
    source_name: Option<String>,
) -> Result<ObsResponseData, AppError> {
    obs_service
        .send_request::<ObsResponseData>(ObsRequestData {
            request_type: ObsRequestType::GetSourceFilterList,
            request_id: Uuid::new_v4(),
            request_data: Some(ObsRequestDataType::GetSourceFilterList(
                ObsGetSourceFilterListRequest {
                    source_name,
                    source_uuid,
                },
            )),
        })
        .await
}
