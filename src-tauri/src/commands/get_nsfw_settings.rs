use crate::{repositories::NsfwRepository, services::DatabaseService};
use entity::nsfw_settings::*;
use tauri::State;

#[tauri::command]
pub async fn get_nsfw_settings(
    database_service: State<'_, DatabaseService>,
) -> Result<Option<Model>, String> {
    database_service.get_nsfw_settings().await
}
