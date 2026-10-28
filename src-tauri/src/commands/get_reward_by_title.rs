use database::{DatabaseService, RewardsRepository};
use entity::rewards::*;
use model::error::AppError;
use tauri::State;

#[tauri::command]
pub async fn get_reward_by_title(
    database_service: State<'_, DatabaseService>,
    title: String,
    platform: Platform,
) -> Result<Option<Reward>, AppError> {
    database_service.get_reward_by_title(&title, platform).await
}
