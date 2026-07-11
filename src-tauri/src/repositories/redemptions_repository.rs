use async_trait::async_trait;
use entity::{messages::ClientMessage, redemptions::*};
use sea_orm::{ColumnTrait, EntityTrait, QueryFilter};

use crate::services::DatabaseService;

#[async_trait]
pub trait RedemptionsRepository: Send + Sync {
    async fn save_redemption_message(&self, client_message: ClientMessage) -> Result<(), String>;
    async fn get_redemption_by_external_id(
        &self,
        external_id: &String,
    ) -> Result<Option<Model>, String>;
}

#[async_trait]
impl RedemptionsRepository for DatabaseService {
    async fn save_redemption_message(&self, client_message: ClientMessage) -> Result<(), String> {
        if let Some(redemption) = client_message.redemption {
            entity::redemptions::ActiveModel::builder()
                .set_id(redemption.id)
                .set_user_id(redemption.user_id)
                .set_user_name(redemption.user_name)
                .set_user_input(redemption.user_input)
                .set_reward_id(redemption.reward_id)
                .set_external_id(redemption.external_id)
                .set_title(redemption.title)
                .set_description(redemption.description)
                .set_cost(redemption.cost)
                .set_platform(redemption.platform)
                .set_type(redemption.r#type)
                .set_points_currency_ratio(redemption.points_currency_ratio)
                .set_audio(redemption.audio)
                .set_image(redemption.image)
                .set_video(redemption.video)
                .set_media(redemption.media)
                .set_alert_variant(redemption.alert_variant)
                .set_video_volume(redemption.video_volume)
                .set_audio_volume(redemption.audio_volume)
                .set_duration(redemption.duration)
                .set_delay(redemption.delay)
                .set_alert(redemption.alert)
                .set_message(
                    entity::messages::ActiveModel::builder()
                        .set_id(client_message.id)
                        .set_type(client_message.r#type)
                        .set_created_at(client_message.created_at),
                )
                .insert(&self.connection)
                .await
                .map_err(|e| {
                    log::error!("Save redemption message error: {}", e);
                    e.to_string()
                })?;
        }

        Ok(())
    }
    async fn get_redemption_by_external_id(
        &self,
        external_id: &String,
    ) -> Result<Option<Model>, String> {
        Entity::find()
            .filter(Column::ExternalId.eq(external_id))
            .one(&self.connection)
            .await
            .map_err(|e| {
                log::error!("Get redemption by id error: {}", e.to_string());
                e.to_string()
            })
    }
}
