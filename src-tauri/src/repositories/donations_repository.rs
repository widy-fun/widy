use async_trait::async_trait;
use entity::{
    donations::{self, Column, Donation, Entity},
    messages::{self, ClientMessage},
    services::ServiceType,
};
use serde::{Deserialize, Serialize};

use crate::{error::AppError, services::DatabaseService, utils::log_and_wrap_error};
use sea_orm::{ColumnTrait, EntityTrait, QueryFilter, QueryOrder, QuerySelect};

#[derive(Debug, Clone, Copy, Serialize, Deserialize)]
pub enum DonationSort {
    Newest,
    Largest,
}

#[async_trait]
pub trait DonationsRepository: Send + Sync {
    async fn get_donations(
        &self,
        from: Option<i64>,
        to: Option<i64>,
        limit: u64,
        sort: DonationSort,
    ) -> Result<Vec<Donation>, AppError>;
    async fn get_donation_by_service_id(
        &self,
        service_id: String,
    ) -> Result<Option<donations::Model>, AppError>;
    async fn get_latest_donations_by_service(
        &self,
        service: ServiceType,
        limit: u64,
    ) -> Result<Vec<donations::Model>, AppError>;
    async fn save_donation_message(&self, client_message: ClientMessage) -> Result<(), AppError>;
}

#[async_trait]
impl DonationsRepository for DatabaseService {
    async fn get_donations(
        &self,
        from: Option<i64>,
        to: Option<i64>,
        limit: u64,
        sort: DonationSort,
    ) -> Result<Vec<Donation>, AppError> {
        let mut query = Entity::find();
        if let Some(from) = from {
            query = query.filter(Column::CreatedAt.gte(from));
        }
        if let Some(to) = to {
            query = query.filter(Column::CreatedAt.lt(to));
        }
        match sort {
            DonationSort::Largest => {
                query = query.order_by_desc(Column::ExchangedAmount);
            }
            _ => {}
        }

        query
            .order_by_desc(Column::CreatedAt)
            .limit(limit)
            .into_partial_model::<Donation>()
            .all(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Get donations error", e))
    }

    async fn get_donation_by_service_id(
        &self,
        service_id: String,
    ) -> Result<Option<donations::Model>, AppError> {
        donations::Entity::find()
            .filter(donations::Column::ServiceId.eq(service_id))
            .one(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Get donation by service id error", e))
    }

    async fn get_latest_donations_by_service(
        &self,
        service: ServiceType,
        limit: u64,
    ) -> Result<Vec<donations::Model>, AppError> {
        donations::Entity::find()
            .filter(donations::Column::Service.eq(service))
            .order_by_desc(donations::Column::CreatedAt)
            .limit(limit)
            .all(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Get latest donation by service error", e))
    }

    async fn save_donation_message(&self, client_message: ClientMessage) -> Result<(), AppError> {
        if let Some(donation) = client_message.donation {
            donations::ActiveModel::builder()
                .set_amount(donation.amount)
                .set_audio(donation.audio)
                .set_created_at(donation.created_at)
                .set_currency(donation.currency)
                .set_exchanged_amount(donation.exchanged_amount)
                .set_exchanged_currency(donation.exchanged_currency)
                .set_id(donation.id)
                .set_media(donation.media)
                .set_played(donation.played)
                .set_service(donation.service)
                .set_service_id(donation.service_id)
                .set_text(donation.text)
                .set_user_name(donation.user_name)
                .set_alert(donation.alert)
                .set_message(
                    messages::ActiveModel::builder()
                        .set_id(client_message.id)
                        .set_type(client_message.r#type)
                        .set_created_at(client_message.created_at),
                )
                .insert(&self.connection)
                .await
                .map_err(|e| log_and_wrap_error("Save donation message error", e))?;
        }

        Ok(())
    }
}
