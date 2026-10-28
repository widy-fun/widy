use database::{DatabaseService, RewardsRepository};
use entity::rewards::Model;
use model::error::AppError;
use tauri::State;

#[tauri::command]
pub async fn update_reward_settings(
    database_service: State<'_, DatabaseService>,
    reward: Model,
) -> Result<(), AppError> {
    database_service.update_reward_settings(reward).await
}
