use crate::{error::AppError, services::DatabaseService, utils::log_and_wrap_error};
use async_trait::async_trait;
use entity::assistant_settings::*;
use sea_orm::{ActiveValue::Set, EntityTrait};

#[async_trait]
pub trait AssistantSettingsRepository: Send + Sync {
    async fn get_assistant_settings(&self) -> Result<Option<Model>, AppError>;
    async fn update_assistant_settings(&self, assistant_settings: Model) -> Result<(), AppError>;
}

#[async_trait]
impl AssistantSettingsRepository for DatabaseService {
    async fn get_assistant_settings(&self) -> Result<Option<Model>, AppError> {
        Entity::find_by_id(1)
            .one(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Get assistant settings error", e))
    }
    async fn update_assistant_settings(&self, assistant_settings: Model) -> Result<(), AppError> {
        Entity::update(ActiveModel {
            id: Set(assistant_settings.id),
            tool_calling_provider: Set(assistant_settings.tool_calling_provider),
            tool_calling_model: Set(assistant_settings.tool_calling_model),
            stt_model: Set(assistant_settings.stt_model),
            stt_language: Set(assistant_settings.stt_language),
            device_id: Set(assistant_settings.device_id),
            enable_on_start: Set(assistant_settings.enable_on_start),
            vad_threshold: Set(assistant_settings.vad_threshold),
            wake_threshold: Set(assistant_settings.wake_threshold),
            silence_hangover_frames: Set(assistant_settings.silence_hangover_frames),
        })
        .exec(&self.connection)
        .await
        .map_err(|e| log_and_wrap_error("Update assistant settings error", e))?;
        Ok(())
    }
}
