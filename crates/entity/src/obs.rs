use sea_orm::FromJsonQueryResult;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize, FromJsonQueryResult)]
pub struct ObsAction {
    pub r#type: ObsActionType,
    pub filter: Option<ObsFilterAction>,
}

#[derive(Debug, Clone, PartialEq, Eq, Deserialize, Serialize)]
pub enum ObsActionType {
    Filter,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct ObsFilterAction {
    pub scene_uuid: Option<Uuid>,
    pub scene_name: Option<String>,
    pub source_uuid: Option<Uuid>,
    pub source_name: Option<String>,
    pub filter_name: Option<String>,
    pub filter_duration: Option<u64>,
}
