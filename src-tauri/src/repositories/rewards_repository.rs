use async_trait::async_trait;
use entity::rewards::*;
use sea_orm::{ActiveValue::Set, ColumnTrait, EntityTrait, QueryFilter};

use crate::services::DatabaseService;

#[async_trait]
pub trait RewardsRepository: Send + Sync {
    async fn get_reward_by_external_id(
        &self,
        external_id: &String,
        platform: Platform,
    ) -> Result<Option<Reward>, String>;
    async fn get_reward_by_id(&self, external_id: &String) -> Result<Option<Reward>, String>;
    async fn get_reward_by_title(
        &self,
        external_id: &String,
        platform: Platform,
    ) -> Result<Option<Reward>, String>;
    async fn get_rewards(&self) -> Result<Vec<Reward>, String>;
    async fn create_reward(&self, reward: Reward) -> Result<(), String>;
    async fn update_reward_settings(&self, reward: Model) -> Result<(), String>;
    async fn delete_reward_by_id(&self, id: &String) -> Result<(), String>;
}

#[async_trait]
impl RewardsRepository for DatabaseService {
    async fn get_rewards(&self) -> Result<Vec<Reward>, String> {
        Entity::find()
            .left_join(entity::alerts::Entity)
            .into_partial_model()
            .all(&self.connection)
            .await
            .map_err(|e| {
                log::error!("Get rewards error: {}", e.to_string());
                e.to_string()
            })
    }
    async fn create_reward(&self, reward: Reward) -> Result<(), String> {
        let query_builder = ActiveModel::builder()
            .set_id(reward.id)
            .set_platform(reward.platform)
            .set_type(reward.r#type)
            .set_title(reward.title)
            .set_external_id(reward.external_id)
            .set_description(reward.description)
            .set_cost(reward.cost)
            .set_background_color(reward.background_color)
            .set_image(reward.image)
            .set_audio(reward.audio)
            .set_is_user_input_required(reward.is_user_input_required)
            .set_points_currency_ratio(reward.points_currency_ratio)
            .set_video(reward.video)
            .set_video_volume(reward.video_volume)
            .set_audio_volume(reward.audio_volume)
            .set_alert_variant(reward.alert_variant)
            .set_duration(reward.duration)
            .set_delay(reward.delay)
            .set_is_enabled(reward.is_enabled)
            .set_is_max_per_stream_enabled(reward.is_max_per_stream_enabled)
            .set_max_per_stream(reward.max_per_stream)
            .set_is_max_per_user_per_stream_enabled(reward.is_max_per_user_per_stream_enabled)
            .set_max_per_user_per_stream(reward.max_per_user_per_stream)
            .set_is_global_cooldown_enabled(reward.is_global_cooldown_enabled)
            .set_global_cooldown_seconds(reward.global_cooldown_seconds)
            .set_should_redemptions_skip_request_queue(
                reward.should_redemptions_skip_request_queue,
            );

        let query_builder_clone = query_builder.clone();

        if let Some(alert) = reward.alert {
            query_builder_clone
                .set_alert(alert)
                .insert(&self.connection)
                .await
                .map_err(|e| {
                    log::error!("Save reward error: {}", e.to_string());
                    e.to_string()
                })?;
            return Ok(());
        }
        query_builder.insert(&self.connection).await.map_err(|e| {
            log::error!("Save reward error: {}", e.to_string());
            e.to_string()
        })?;

        Ok(())
    }

    async fn get_reward_by_external_id(
        &self,
        external_id: &String,
        platform: Platform,
    ) -> Result<Option<Reward>, String> {
        Entity::find()
            .left_join(entity::alerts::Entity)
            .filter(Column::ExternalId.eq(external_id))
            .filter(Column::Platform.eq(platform))
            .into_partial_model()
            .one(&self.connection)
            .await
            .map_err(|e| {
                log::error!("Get reward by external_id error: {}", e.to_string());
                e.to_string()
            })
    }

    async fn get_reward_by_title(
        &self,
        title: &String,
        platform: Platform,
    ) -> Result<Option<Reward>, String> {
        Entity::find()
            .filter(Column::Title.eq(title))
            .filter(Column::Platform.eq(platform))
            .left_join(entity::alerts::Entity)
            .into_partial_model()
            .one(&self.connection)
            .await
            .map_err(|e| {
                log::error!("Get reward by title error: {}", e.to_string());
                e.to_string()
            })
    }

    async fn get_reward_by_id(&self, id: &String) -> Result<Option<Reward>, String> {
        Entity::find()
            .filter(Column::Id.eq(id))
            .left_join(entity::alerts::Entity)
            .into_partial_model()
            .one(&self.connection)
            .await
            .map_err(|e| {
                log::error!("Get reward by id error: {}", e.to_string());
                e.to_string()
            })
    }

    async fn delete_reward_by_id(&self, id: &String) -> Result<(), String> {
        Entity::delete_by_id(id)
            .exec(&self.connection)
            .await
            .map_err(|e| {
                log::error!("Delete reward by id error: {}", e);
                e.to_string()
            })?;
        entity::alerts::Entity::delete_many()
            .filter(entity::alerts::Column::RewardId.eq(id))
            .exec(&self.connection)
            .await
            .map_err(|e| {
                log::error!("Delete alert  by reward_id error: {}", e);
                e.to_string()
            })?;
        Ok(())
    }

    async fn update_reward_settings(&self, reward: Model) -> Result<(), String> {
        Entity::update(ActiveModel {
            id: Set(reward.id),
            platform: Set(reward.platform),
            r#type: Set(reward.r#type),
            title: Set(reward.title),
            external_id: Set(reward.external_id),
            description: Set(reward.description),
            cost: Set(reward.cost),
            background_color: Set(reward.background_color),
            image: Set(reward.image),
            audio: Set(reward.audio),
            is_user_input_required: Set(reward.is_user_input_required),
            points_currency_ratio: Set(reward.points_currency_ratio),
            video: Set(reward.video),
            video_volume: Set(reward.video_volume),
            audio_volume: Set(reward.audio_volume),
            alert_variant: Set(reward.alert_variant),
            duration: Set(reward.duration),
            delay: Set(reward.delay),
            is_enabled: Set(reward.is_enabled),
            is_max_per_stream_enabled: Set(reward.is_max_per_stream_enabled),
            max_per_stream: Set(reward.max_per_stream),
            is_max_per_user_per_stream_enabled: Set(reward.is_max_per_user_per_stream_enabled),
            max_per_user_per_stream: Set(reward.max_per_user_per_stream),
            is_global_cooldown_enabled: Set(reward.is_global_cooldown_enabled),
            global_cooldown_seconds: Set(reward.global_cooldown_seconds),
            should_redemptions_skip_request_queue: Set(reward.should_redemptions_skip_request_queue),
        })
        .exec(&self.connection)
        .await
        .map_err(|e| {
            log::error!("Update reward settings error: {}", e);
            e.to_string()
        })?;

        Ok(())
    }
}
