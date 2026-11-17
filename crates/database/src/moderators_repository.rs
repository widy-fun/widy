use crate::DatabaseService;
use async_trait::async_trait;
use entity::moderators::*;
use model::error::{AppError, log_and_wrap_error};
use sea_orm::{ActiveValue::Set, EntityTrait};
use uuid::Uuid;

#[async_trait]
pub trait ModeratorsRepository: Send + Sync {
    async fn get_moderators(&self) -> Result<Vec<Model>, AppError>;
    async fn get_moderator_by_id(&self, id: Uuid) -> Result<Option<Model>, AppError>;
    async fn update_moderator(&self, moderator: Model) -> Result<(), AppError>;
    async fn create_moderator(&self, moderator: Model) -> Result<(), AppError>;
    async fn delete_moderator_by_id(&self, id: Uuid) -> Result<(), AppError>;
}

#[async_trait]
impl ModeratorsRepository for DatabaseService {
    async fn get_moderators(&self) -> Result<Vec<Model>, AppError> {
        Entity::find()
            .all(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Get moderators error", e))
    }
    async fn get_moderator_by_id(&self, id: Uuid) -> Result<Option<Model>, AppError> {
        Entity::find_by_id(id)
            .one(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Get moderator by id error", e))
    }

    async fn update_moderator(&self, moderator: Model) -> Result<(), AppError> {
        Entity::update(ActiveModel {
            id: Set(moderator.id),
            name: Set(moderator.name),
        })
        .exec(&self.connection)
        .await
        .map_err(|e| log_and_wrap_error("Update moderator error", e))?;
        Ok(())
    }
    async fn create_moderator(&self, moderator: Model) -> Result<(), AppError> {
        Entity::insert(ActiveModel {
            id: Set(moderator.id),
            name: Set(moderator.name),
        })
        .exec(&self.connection)
        .await
        .map_err(|e| log_and_wrap_error("Crate moderator error", e))?;
        Ok(())
    }
    async fn delete_moderator_by_id(&self, id: Uuid) -> Result<(), AppError> {
        Entity::delete_by_id(id)
            .exec(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Delete moderator by id error", e))?;
        Ok(())
    }
}
