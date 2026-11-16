use database::{DatabaseService, TokensRepository};
use entity::tokens::*;
use model::error::AppError;
use tauri::State;

#[tauri::command]
pub async fn rotate_token(
    database_service: State<'_, DatabaseService>,
    token: Model,
) -> Result<(), AppError> {
    database_service.rotate_token(token).await
}
