use crate::services::DatabaseService;
use async_trait::async_trait;
use entity::nsfw_settings::*;
use sea_orm::{ActiveValue::Set, EntityTrait};

#[async_trait]
pub trait NsfwRepository: Send + Sync {
    async fn get_nsfw_settings(&self) -> Result<Option<Model>, String>;
    async fn update_nsfw_settings(&self, nsfw_settings: Model) -> Result<(), String>;
}

#[async_trait]
impl NsfwRepository for DatabaseService {
    async fn get_nsfw_settings(&self) -> Result<Option<Model>, String> {
        Entity::find_by_id(1)
            .one(&self.connection)
            .await
            .map_err(|e| {
                log::error!("Get nsfw settings error: {}", e);
                e.to_string()
            })
    }
    async fn update_nsfw_settings(&self, nsfw_settings: Model) -> Result<(), String> {
        Entity::update(ActiveModel {
            id: Set(nsfw_settings.id),
            labels_confidence: Set(nsfw_settings.labels_confidence),
            blur_timeout_duration: Set(nsfw_settings.blur_timeout_duration),
        })
        .exec(&self.connection)
        .await
        .map_err(|e| {
            log::error!("Update nsfw_settings error: {}", e);
            e.to_string()
        })?;
        Ok(())
    }
}
