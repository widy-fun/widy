use entity::settings::*;

use crate::{error::AppError, services::DatabaseService, utils::log_and_wrap_error};
use async_trait::async_trait;
use sea_orm::{ActiveValue::Set, EntityTrait};

#[async_trait]
pub trait SettingsRepository: Send + Sync {
    async fn get_settings(&self) -> Result<Option<Model>, AppError>;
    async fn update_settings(&self, settings: Model) -> Result<(), AppError>;
}

#[async_trait]
impl SettingsRepository for DatabaseService {
    async fn get_settings(&self) -> Result<Option<Model>, AppError> {
        Entity::find_by_id(1)
            .one(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Get settings error", e))
    }
    async fn update_settings(&self, settings: Model) -> Result<(), AppError> {
        Entity::update(ActiveModel {
            moderation_duration: Set(settings.moderation_duration),
            alert_paused: Set(settings.alert_paused),
            remove_links: Set(settings.remove_links),
            black_list: Set(settings.black_list),
            language: Set(settings.language),
            currency: Set(settings.currency),
            id: Set(1),
            widget_token: Set(settings.widget_token),
        })
        .exec(&self.connection)
        .await
        .map_err(|e| log_and_wrap_error("Update settings error", e))?;
        Ok(())
    }
}
