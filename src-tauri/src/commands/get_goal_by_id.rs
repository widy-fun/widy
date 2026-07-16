use crate::{repositories::GoalsRepository, services::DatabaseService};
use entity::goals::*;
use tauri::State;
use uuid::Uuid;

#[tauri::command]
pub async fn get_goal_by_id(
    database_service: State<'_, DatabaseService>,
    id: Uuid,
) -> Result<Option<Model>, String> {
    database_service.get_goal_by_id(id).await
}
