use entity::media_settings::*;

use crate::{error::AppError, services::DatabaseService, utils::log_and_wrap_error};
use async_trait::async_trait;
use sea_orm::{ActiveValue::Set, EntityTrait};
#[async_trait]
pub trait MediaSettingsRepository: Send + Sync {
    async fn get_media_settings(&self) -> Result<Option<Model>, AppError>;
    async fn update_media_settings(&self, media_settings: Model) -> Result<(), AppError>;
}

#[async_trait]
impl MediaSettingsRepository for DatabaseService {
    async fn get_media_settings(&self) -> Result<Option<Model>, AppError> {
        Entity::find_by_id(1)
            .one(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Get media settings error", e))
    }

    async fn update_media_settings(&self, alert: Model) -> Result<(), AppError> {
        Entity::update(ActiveModel {
            id: Set(alert.id),
            youtube: Set(alert.youtube),
            twitch: Set(alert.twitch),
            tiktok: Set(alert.tiktok),
        })
        .exec(&self.connection)
        .await
        .map_err(|e| log_and_wrap_error("Update media settings error", e))?;
        Ok(())
    }
}
