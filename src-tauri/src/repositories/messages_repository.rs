use async_trait::async_trait;
use entity::{
    commands_actions, donations, followers, messages::*, raids, redemptions, subscriptions,
};

use crate::{error::AppError, services::DatabaseService, utils::log_and_wrap_error};
use sea_orm::{ColumnTrait, EntityTrait, QueryFilter, QueryOrder, QuerySelect};

#[async_trait]
pub trait MessagesRepository: Send + Sync {
    async fn get_messages(
        &self,
        limit: &u64,
        offset: &u64,
        exclude_donations: &bool,
        exclude_subscriptions: &bool,
        exclude_follows: &bool,
        exclude_raids: &bool,
        exclude_redemptions: &bool,
        exclude_commands_actions: &bool,
    ) -> Result<Vec<ClientMessage>, AppError>;
}

#[async_trait]
impl MessagesRepository for DatabaseService {
    async fn get_messages(
        &self,
        limit: &u64,
        offset: &u64,
        exclude_donations: &bool,
        exclude_subscriptions: &bool,
        exclude_follows: &bool,
        exclude_raids: &bool,
        exclude_redemptions: &bool,
        exclude_commands_actions: &bool,
    ) -> Result<Vec<ClientMessage>, AppError> {
        let mut query = Entity::find()
            .left_join(donations::Entity)
            .left_join(followers::Entity)
            .left_join(subscriptions::Entity)
            .left_join(redemptions::Entity)
            .left_join(raids::Entity)
            .left_join(commands_actions::Entity);

        if *exclude_donations {
            query = query.filter(donations::Column::Id.is_null());
        }
        if *exclude_subscriptions {
            query = query.filter(subscriptions::Column::Id.is_null());
        }
        if *exclude_follows {
            query = query.filter(followers::Column::Id.is_null());
        }
        if *exclude_raids {
            query = query.filter(raids::Column::Id.is_null());
        }
        if *exclude_redemptions {
            query = query.filter(redemptions::Column::Id.is_null());
        }
        if *exclude_commands_actions {
            query = query.filter(commands_actions::Column::Id.is_null());
        }
        let client_messages: Vec<ClientMessage> = query
            .order_by_desc(Column::CreatedAt)
            .limit(*limit)
            .offset(*offset)
            .into_partial_model()
            .all(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Get messages errorr", e))?;

        Ok(client_messages)
    }
}
