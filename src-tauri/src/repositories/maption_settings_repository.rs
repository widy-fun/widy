use crate::{error::AppError, services::DatabaseService, utils::log_and_wrap_error};
use async_trait::async_trait;
use entity::maption_settings::*;
use sea_orm::{ActiveValue::Set, EntityTrait};

#[async_trait]
pub trait MaptionSettingsRepository: Send + Sync {
    async fn get_maption_settings(&self) -> Result<Option<Model>, AppError>;
    async fn update_maption_settings(&self, settings: Model) -> Result<(), AppError>;
}

#[async_trait]
impl MaptionSettingsRepository for DatabaseService {
    async fn get_maption_settings(&self) -> Result<Option<Model>, AppError> {
        Entity::find_by_id(1)
            .one(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Get maption settings error", e))
    }
    async fn update_maption_settings(&self, maption_settings: Model) -> Result<(), AppError> {
        Entity::update(ActiveModel {
            price_for_meter: Set(maption_settings.price_for_meter),
            latitude: Set(maption_settings.latitude),
            longitude: Set(maption_settings.longitude),
            timer_adding_time: Set(maption_settings.timer_adding_time),
            new_donation_adding_time: Set(maption_settings.new_donation_adding_time),
            is_greater_timer_adding_time: Set(maption_settings.is_greater_timer_adding_time),
            is_new_donation_adding_time: Set(maption_settings.is_new_donation_adding_time),
            id: Set(1),
        })
        .exec(&self.connection)
        .await
        .map_err(|e| log_and_wrap_error("Update maption settings error", e))?;
        Ok(())
    }
}
