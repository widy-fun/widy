use database::{DatabaseService, RewardsRepository};
use entity::rewards::*;
use model::error::AppError;
use tauri::State;

#[tauri::command]
pub async fn get_rewards(
    database_service: State<'_, DatabaseService>,
) -> Result<Vec<Reward>, AppError> {
    database_service.get_rewards().await
}
