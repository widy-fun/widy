use crate::DatabaseService;
use async_trait::async_trait;
use entity::moderators_logs::*;
use model::error::AppError;
use model::error::log_and_wrap_error;
use sea_orm::ActiveValue::Set;
use sea_orm::QuerySelect;
use sea_orm::{ColumnTrait, EntityTrait, QueryFilter, QueryOrder};
use uuid::Uuid;

#[async_trait]
pub trait ModeratorsLogsRepository: Send + Sync {
    async fn add_moderator_log(&self, moderator_log: Model) -> Result<(), AppError>;
    async fn get_moderator_logs(
        &self,
        id: Uuid,
        limit: &u64,
        offset: &u64,
    ) -> Result<Vec<Model>, AppError>;
}

#[async_trait]
impl ModeratorsLogsRepository for DatabaseService {
    async fn add_moderator_log(&self, moderator_log: Model) -> Result<(), AppError> {
        Entity::insert(ActiveModel {
            id: Set(moderator_log.id),
            moderator_id: Set(moderator_log.moderator_id),
            event_type: Set(moderator_log.event_type),
            created_at: Set(moderator_log.created_at),
        })
        .exec(&self.connection)
        .await
        .map_err(|e| log_and_wrap_error("Add moderator log error", e))?;

        Ok(())
    }
    async fn get_moderator_logs(
        &self,
        id: Uuid,
        limit: &u64,
        offset: &u64,
    ) -> Result<Vec<Model>, AppError> {
        Entity::find()
            .filter(Column::ModeratorId.eq(id))
            .order_by_desc(Column::CreatedAt)
            .limit(*limit)
            .offset(*offset)
            .all(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Get moderator logs by id error", e))
    }
}
