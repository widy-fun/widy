use async_trait::async_trait;
use entity::{
    followers::{self, Column, Entity, Model},
    messages::{self, ClientMessage},
    services::ServiceType,
};
use sea_orm::{ColumnTrait, EntityTrait, QueryFilter};

use crate::{error::AppError, services::DatabaseService, utils::log_and_wrap_error};

#[async_trait]
pub trait FollowsRepository: Send + Sync {
    async fn save_follow_message(&self, client_message: ClientMessage) -> Result<(), AppError>;
    async fn get_follow(
        &self,
        user_id: String,
        service: ServiceType,
    ) -> Result<Option<Model>, AppError>;
}

#[async_trait]
impl FollowsRepository for DatabaseService {
    async fn save_follow_message(&self, client_message: ClientMessage) -> Result<(), AppError> {
        if let Some(follow) = client_message.follow {
            followers::ActiveModel::builder()
                .set_followed_at(follow.followed_at)
                .set_id(follow.id)
                .set_played(follow.played)
                .set_service(follow.service)
                .set_service_id(follow.service_id)
                .set_user_name(follow.user_name)
                .set_user_id(follow.user_id)
                .set_alert(follow.alert)
                .set_message(
                    messages::ActiveModel::builder()
                        .set_id(client_message.id)
                        .set_type(client_message.r#type)
                        .set_created_at(client_message.created_at),
                )
                .insert(&self.connection)
                .await
                .map_err(|e| log_and_wrap_error("Save follow message error", e))?;
        }

        Ok(())
    }
    async fn get_follow(
        &self,
        user_id: String,
        service: ServiceType,
    ) -> Result<Option<Model>, AppError> {
        Entity::find()
            .filter(Column::UserId.eq(user_id))
            .filter(Column::Service.eq(service))
            .one(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Get follow error", e))
    }
}
