use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Serialize, Deserialize)]
pub struct ObsMessage {
    pub d: ObsData,
    pub op: u8,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct HelloData {
    pub authentication: Authentication,
    #[serde(rename = "obsStudioVersion")]
    pub obs_studio_version: String,
    #[serde(rename = "obsWebSocketVersion")]
    pub obs_websocket_version: String,
    #[serde(rename = "rpcVersion")]
    pub rpc_version: u32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Authentication {
    pub challenge: String,
    pub salt: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct IdentifyData {
    #[serde(rename = "rpcVersion")]
    pub rpc_version: u32,
    pub authentication: String,
}
#[derive(Debug, Serialize, Deserialize)]
pub struct IdentifiedData {
    #[serde(rename = "negotiatedRpcVersion")]
    pub negotiated_rpc_version: u8,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct ObsRequestData {
    pub request_type: ObsRequestType,
    pub request_id: Uuid,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub request_data: Option<ObsRequestDataType>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct ObsResponseData {
    pub request_type: ObsRequestType,
    pub request_id: Uuid,
    pub response_data: Option<ObsResponseDataType>,
    pub request_status: ObsRequestStatus,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ObsRequestStatus {
    pub result: bool,
    pub code: u32,
    pub comment: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ObsGetInputListResponse {
    pub inputs: Vec<ObsInput>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct ObsGetSceneItemListRequest {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub scene_name: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub scene_uuid: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct ObsGetSourceFilterListRequest {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub source_name: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub source_uuid: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct ObsSetSourceFilterEnabledRequest {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub source_name: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub source_uuid: Option<Uuid>,
    pub filter_name: String,
    pub filter_enabled: bool,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct ObsGetSceneListResponse {
    pub current_program_scene_name: Option<String>,
    pub current_program_scene_uuid: Option<String>,
    pub current_preview_scene_name: Option<String>,
    pub current_preview_scene_uuid: Option<String>,
    pub scenes: Vec<ObsScene>,
}
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ObsGetSceneItemListResponse {
    #[serde(rename = "sceneItems")]
    pub scene_items: Vec<ObsSceneItem>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct ObsScene {
    pub scene_index: u32,
    pub scene_name: String,
    pub scene_uuid: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ObsSceneItem {
    pub scene_item_id: u32,
    pub scene_item_index: u32,
    pub source_name: String,
    pub source_uuid: String,
    pub source_type: String,
    pub input_kind: Option<String>,
    pub is_group: Option<bool>,
    pub scene_item_enabled: bool,
    pub scene_item_locked: bool,
    pub scene_item_blend_mode: String,
    pub scene_item_transform: ObsSceneItemTransform,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ObsSceneItemTransform {
    pub position_x: f64,
    pub position_y: f64,
    pub scale_x: f64,
    pub scale_y: f64,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct ObsInput {
    pub input_name: String,
    pub input_uuid: String,
    pub input_kind: String,
    pub unversioned_input_kind: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct ObsGetSourceFilterListResponse {
    pub filters: Vec<ObsSourceFilter>,
}
#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(rename_all = "camelCase")]
pub struct ObsSourceFilter {
    pub filter_enabled: bool,
    pub filter_index: u32,
    pub filter_kind: String,
    pub filter_name: String,
    pub filter_settings: serde_json::Value,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(untagged)]
pub enum ObsData {
    Hello(HelloData),
    Identified(IdentifiedData),
    Identify(IdentifyData),
    Response(ObsResponseData),
    Request(ObsRequestData),
}
#[derive(Debug, Serialize, Deserialize, Clone, Copy)]
pub enum ObsRequestType {
    GetInputList,
    GetSceneItemList,
    GetSceneList,
    GetSourceFilterList,
    SetSourceFilterEnabled,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(untagged)]
pub enum ObsResponseDataType {
    GetInputList(ObsGetInputListResponse),
    GetSceneList(ObsGetSceneListResponse),
    GetSceneItemList(ObsGetSceneItemListResponse),
    GetSourceFilterList(ObsGetSourceFilterListResponse),
}

#[derive(Debug, Serialize, Deserialize, Clone)]
#[serde(untagged)]
pub enum ObsRequestDataType {
    GetSceneItemList(ObsGetSceneItemListRequest),
    GetSourceFilterList(ObsGetSourceFilterListRequest),
    SetSourceFilterEnabled(ObsSetSourceFilterEnabledRequest),
}
