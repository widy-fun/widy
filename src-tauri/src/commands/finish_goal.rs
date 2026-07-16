use tauri::State;
use uuid::Uuid;

use crate::{repositories::GoalsRepository, services::DatabaseService};

#[tauri::command]
pub async fn finish_goal(
    database_service: State<'_, DatabaseService>,
    id: Uuid,
) -> Result<(), String> {
    database_service.finish_goal(id).await
}
