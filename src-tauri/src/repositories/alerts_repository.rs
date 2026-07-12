use crate::services::DatabaseService;
use async_trait::async_trait;
use entity::{alerts::*, messages::MessageType};
use rand::seq::IndexedRandom;

use sea_orm::{ActiveValue::Set, ColumnTrait, EntityTrait, QueryFilter};
#[async_trait]
pub trait AlertsRepository: Send + Sync {
    async fn get_alerts(&self) -> Result<Vec<Alert>, String>;
    async fn get_grater_amount_alert(
        &self,
        amount: f64,
        r#type: MessageType,
    ) -> Result<Option<Alert>, String>;
    async fn get_equal_amount_alert(
        &self,
        amount: f64,
        r#type: MessageType,
    ) -> Result<Option<Alert>, String>;
    async fn get_random_alert(&self, r#type: MessageType) -> Result<Option<Alert>, String>;
    async fn get_alert_by_id(&self, id: String) -> Result<Option<Alert>, String>;
    async fn update_alert_settings(&self, alert: Model) -> Result<(), String>;
    async fn create_alert(&self, alert: Model) -> Result<(), String>;
    async fn delete_alert_by_id(&self, id: String) -> Result<(), String>;
}

#[async_trait]
impl AlertsRepository for DatabaseService {
    async fn get_grater_amount_alert(
        &self,
        amount: f64,
        r#type: MessageType,
    ) -> Result<Option<Alert>, String> {
        Entity::find()
            .filter(Column::Type.eq(r#type))
            .filter(Column::Amount.lt(amount))
            .filter(Column::VariationConditions.eq(AlertVariationConditions::AmountIsGreater))
            .into_partial_model()
            .one(&self.connection)
            .await
            .map_err(|e| {
                log::error!("Get grater amount alert error: {}", e);
                e.to_string()
            })
    }
    async fn get_equal_amount_alert(
        &self,
        amount: f64,
        r#type: MessageType,
    ) -> Result<Option<Alert>, String> {
        Entity::find()
            .filter(Column::Type.eq(r#type))
            .filter(Column::Amount.eq(amount))
            .filter(Column::VariationConditions.eq(AlertVariationConditions::AmountIsEqual))
            .into_partial_model()
            .one(&self.connection)
            .await
            .map_err(|e| {
                log::error!("Get equal amount alert error: {}", e);
                e.to_string()
            })
    }
    async fn get_random_alert(&self, r#type: MessageType) -> Result<Option<Alert>, String> {
        let alerts: Vec<Alert> = Entity::find()
            .filter(Column::Type.eq(r#type))
            .filter(Column::VariationConditions.eq(AlertVariationConditions::Random))
            .into_partial_model()
            .all(&self.connection)
            .await
            .map_err(|e| {
                log::error!("Get alerts by type error: {}", e);
                e.to_string()
            })?;
        let mut rng = rand::rng();
        let random_alert = alerts.choose(&mut rng).cloned();

        Ok(random_alert)
    }
    async fn get_alerts(&self) -> Result<Vec<Alert>, String> {
        Entity::find()
            .into_partial_model()
            .all(&self.connection)
            .await
            .map_err(|e| {
                log::error!("Get alerts settings error: {}", e);
                e.to_string()
            })
    }
    async fn get_alert_by_id(&self, id: String) -> Result<Option<Alert>, String> {
        Entity::find_by_id(id)
            .into_partial_model()
            .one(&self.connection)
            .await
            .map_err(|e| {
                log::error!("Get alert by id error: {}", e);
                e.to_string()
            })
    }
    async fn update_alert_settings(&self, alert: Model) -> Result<(), String> {
        Entity::update(ActiveModel {
            id: Set(alert.id),
            audio: Set(alert.audio),
            image: Set(alert.image),
            name: Set(alert.name),
            r#type: Set(alert.r#type),
            status: Set(alert.status),
            amount: Set(alert.amount),
            variation_conditions: Set(alert.variation_conditions),
            group_id: Set(alert.group_id),
            audio_volume: Set(alert.audio_volume),
            view_type: Set(alert.view_type),
            title_style: Set(alert.title_style),
            message_style: Set(alert.message_style),
            video_volume: Set(alert.video_volume),
            video: Set(alert.video),
            alert_variant: Set(alert.alert_variant),
            delay: Set(alert.delay),
            duration: Set(alert.duration),
            reward_id: Set(alert.reward_id),
            command_id: Set(alert.command_id),
            tts_volume: Set(alert.tts_volume),
            tts_type: Set(alert.tts_type),
            tts_settings: Set(alert.tts_settings),
        })
        .exec(&self.connection)
        .await
        .map_err(|e| {
            log::error!("Update alert settings error: {}", e);
            e.to_string()
        })?;
        Ok(())
    }
    async fn create_alert(&self, alert: Model) -> Result<(), String> {
        Entity::insert(ActiveModel {
            id: Set(alert.id),
            audio: Set(alert.audio),
            image: Set(alert.image),
            name: Set(alert.name),
            r#type: Set(alert.r#type),
            status: Set(alert.status),
            amount: Set(alert.amount),
            variation_conditions: Set(alert.variation_conditions),
            group_id: Set(alert.group_id),
            audio_volume: Set(alert.audio_volume),
            view_type: Set(alert.view_type),
            title_style: Set(alert.title_style),
            message_style: Set(alert.message_style),
            video_volume: Set(alert.video_volume),
            video: Set(alert.video),
            alert_variant: Set(alert.alert_variant),
            delay: Set(alert.delay),
            duration: Set(alert.duration),
            reward_id: Set(alert.reward_id),
            command_id: Set(alert.command_id),
            tts_volume: Set(alert.tts_volume),
            tts_type: Set(alert.tts_type),
            tts_settings: Set(alert.tts_settings),
        })
        .exec(&self.connection)
        .await
        .map_err(|e| {
            log::error!("Create alert error: {}", e);
            e.to_string()
        })?;
        Ok(())
    }
    async fn delete_alert_by_id(&self, id: String) -> Result<(), String> {
        Entity::delete_by_id(id)
            .exec(&self.connection)
            .await
            .map_err(|e| {
                log::error!("Delete alert by id error: {}", e);
                e.to_string()
            })?;
        Ok(())
    }
}
