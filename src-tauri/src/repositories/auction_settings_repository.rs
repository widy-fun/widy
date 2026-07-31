use crate::{error::AppError, services::DatabaseService, utils::log_and_wrap_error};
use async_trait::async_trait;
use entity::auction_settings::*;
use sea_orm::{ActiveValue::Set, EntityTrait};

#[async_trait]
pub trait AuctionSettingsRepository: Send + Sync {
    async fn get_auction_settings(&self) -> Result<Option<Model>, AppError>;
    async fn update_auction_settings(&self, settings: Model) -> Result<(), AppError>;
}

#[async_trait]
impl AuctionSettingsRepository for DatabaseService {
    async fn get_auction_settings(&self) -> Result<Option<Model>, AppError> {
        Entity::find_by_id(1)
            .one(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Get auction settings error", e))
    }
    async fn update_auction_settings(&self, auction_settings: Model) -> Result<(), AppError> {
        Entity::update(ActiveModel {
            leader_change_adding_time: Set(auction_settings.leader_change_adding_time),
            new_lot_adding_time: Set(auction_settings.new_lot_adding_time),
            new_donation_adding_time: Set(auction_settings.new_donation_adding_time),
            timer_adding_time: Set(auction_settings.timer_adding_time),
            is_greater_timer_adding_time: Set(auction_settings.is_greater_timer_adding_time),
            is_show_odds: Set(auction_settings.is_show_odds),
            is_show_total_sum: Set(auction_settings.is_show_total_sum),
            is_new_lot_adding_time: Set(auction_settings.is_new_lot_adding_time),
            is_new_donation_adding_time: Set(auction_settings.is_new_donation_adding_time),
            is_leader_change_adding_time: Set(auction_settings.is_leader_change_adding_time),
            id: Set(1),
        })
        .exec(&self.connection)
        .await
        .map_err(|e| log_and_wrap_error("Update auction settings error", e))?;
        Ok(())
    }
}
