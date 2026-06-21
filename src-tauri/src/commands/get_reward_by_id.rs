use crate::{repositories::RewardsRepository, services::DatabaseService};
use entity::rewards::*;
use tauri::State;

#[tauri::command]
pub async fn get_reward_by_id(
    database_service: State<'_, DatabaseService>,
    id: String,
) -> Result<Option<Model>, String> {
    database_service.get_reward_by_id(&id).await
}
