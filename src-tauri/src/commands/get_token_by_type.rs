use database::{DatabaseService, TokensRepository};
use entity::tokens::*;
use model::error::AppError;
use tauri::State;

#[tauri::command]
pub async fn get_token_by_type(
    database_service: State<'_, DatabaseService>,
    r#type: TokenType,
) -> Result<Option<Model>, AppError> {
    database_service.get_token_by_type(r#type).await
}
