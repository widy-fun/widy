use crate::{repositories::RewardsRepository, services::DatabaseService};
use entity::rewards::*;
use tauri::State;

#[tauri::command]
pub async fn get_reward_by_title(
    database_service: State<'_, DatabaseService>,
    title: String,
    platform: Platform,
) -> Result<Option<Model>, String> {
    database_service.get_reward_by_title(&title, platform).await
}
