use crate::{repositories::RewardsRepository, services::DatabaseService};
use entity::rewards::*;
use tauri::State;

#[tauri::command]
pub async fn get_rewards(
    database_service: State<'_, DatabaseService>,
) -> Result<Vec<Model>, String> {
    database_service.get_rewards().await
}
