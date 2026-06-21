use crate::{repositories::RewardsRepository, services::DatabaseService};
use entity::rewards::Model;
use tauri::State;

#[tauri::command]
pub async fn update_reward_settings(
    database_service: State<'_, DatabaseService>,
    reward: Model,
) -> Result<(), String> {
    database_service
        .update_reward_settings(reward)
        .await
        .map_err(|e| e.to_string())
}
