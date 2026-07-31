use crate::{error::AppError, repositories::RewardsRepository, services::DatabaseService};
use entity::rewards::*;
use tauri::State;
use uuid::Uuid;

#[tauri::command]
pub async fn get_reward_by_id(
    database_service: State<'_, DatabaseService>,
    id: Uuid,
) -> Result<Option<Reward>, AppError> {
    database_service.get_reward_by_id(id).await
}
