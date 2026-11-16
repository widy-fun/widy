use crate::DatabaseService;
use async_trait::async_trait;
use entity::tokens::*;
use model::error::{AppError, log_and_wrap_error};
use sea_orm::{ActiveValue::Set, ColumnTrait, EntityTrait, QueryFilter};
use uuid::Uuid;

#[async_trait]
pub trait TokensRepository: Send + Sync {
    async fn get_token_by_type(&self, r#type: TokenType) -> Result<Option<Model>, AppError>;
    async fn rotate_token(&self, token: Model) -> Result<(), AppError>;
}

#[async_trait]
impl TokensRepository for DatabaseService {
    async fn get_token_by_type(&self, r#type: TokenType) -> Result<Option<Model>, AppError> {
        Entity::find()
            .filter(Column::Type.eq(r#type))
            .one(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Get token by type error", e))
    }
    async fn rotate_token(&self, token: Model) -> Result<(), AppError> {
        Entity::delete_by_id(token.id)
            .exec(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Get token by type error", e))?;
        let new_token = ActiveModel {
            id: Set(token.id),
            r#type: Set(token.r#type),
            token: Set(Uuid::new_v4()),
        };
        Entity::insert(new_token)
            .exec(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Add new token error", e))?;
        Ok(())
    }
}
