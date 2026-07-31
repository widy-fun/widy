use async_trait::async_trait;
use entity::{alerts, commands::*};
use migration::Expr;
use sea_orm::{ActiveModelTrait, ActiveValue::Set, ColumnTrait, EntityTrait, QueryFilter};
use uuid::Uuid;

use crate::{
    error::AppError, repositories::AlertsRepository, services::DatabaseService,
    utils::log_and_wrap_error,
};

#[async_trait]
pub trait CommandsRepository: Send + Sync {
    async fn get_command_by_id(&self, id: Uuid) -> Result<Option<Command>, AppError>;
    async fn get_command_by_chat_trigger(
        &self,
        trigger: &String,
    ) -> Result<Option<Command>, AppError>;
    async fn get_commands(&self) -> Result<Vec<Command>, AppError>;
    async fn create_command(&self, command: Command) -> Result<(), AppError>;
    async fn update_command(&self, command: Command) -> Result<(), AppError>;
    async fn delete_command_by_id(&self, id: Uuid) -> Result<(), AppError>;
}

#[async_trait]
impl CommandsRepository for DatabaseService {
    async fn get_commands(&self) -> Result<Vec<Command>, AppError> {
        Entity::find()
            .left_join(entity::alerts::Entity)
            .into_partial_model()
            .all(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Get commands error", e))
    }
    async fn create_command(&self, command: Command) -> Result<(), AppError> {
        let query_builder = ActiveModel::builder()
            .set_id(command.id)
            .set_name(command.name)
            .set_chat(command.chat)
            .set_chat_bot(command.chat_bot)
            .set_description(command.description)
            .set_source_type(command.source_type)
            .set_timer(command.timer)
            .set_is_enabled(command.is_enabled);

        let query_builder_clone = query_builder.clone();

        if let Some(alert) = command.alert {
            query_builder_clone
                .set_alert(alert)
                .insert(&self.connection)
                .await
                .map_err(|e| log_and_wrap_error("Save command error", e))?;
            return Ok(());
        }
        query_builder
            .insert(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Save command error", e))?;

        Ok(())
    }

    async fn get_command_by_id(&self, id: Uuid) -> Result<Option<Command>, AppError> {
        Entity::find()
            .left_join(entity::alerts::Entity)
            .filter(Column::Id.eq(id))
            .into_partial_model()
            .one(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Get command by id error", e))
    }

    async fn get_command_by_chat_trigger(
        &self,
        trigger: &String,
    ) -> Result<Option<Command>, AppError> {
        Entity::find()
            .left_join(entity::alerts::Entity)
            .filter(Expr::cust_with_values(
                "json_extract(chat, '$.trigger') = ?",
                [trigger],
            ))
            .into_partial_model()
            .one(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Get command by chat trigger error", e))
    }

    async fn delete_command_by_id(&self, id: Uuid) -> Result<(), AppError> {
        Entity::delete_by_id(id)
            .exec(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Delete command by id error", e))?;
        entity::alerts::Entity::delete_many()
            .filter(entity::alerts::Column::CommandId.eq(id))
            .exec(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Delete alert by command_id error", e))?;
        Ok(())
    }

    async fn update_command(&self, command: Command) -> Result<(), AppError> {
        if let Some(alert) = command.alert {
            let active_model = alerts::ActiveModel {
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
                title_template: Set(alert.title_template),
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
            };
            let old_alert = self.get_alert_by_id(alert.id).await?;
            if old_alert.is_none() {
                alerts::Entity::insert(active_model)
                    .exec(&self.connection)
                    .await
                    .map_err(|e| log_and_wrap_error("Insert alert error", e))?;
            } else {
                alerts::Entity::update(active_model)
                    .exec(&self.connection)
                    .await
                    .map_err(|e| log_and_wrap_error("Update alert error", e))?;
            }
        }

        ActiveModel {
            id: Set(command.id),
            name: Set(command.name),
            description: Set(command.description),
            chat: Set(command.chat),
            timer: Set(command.timer),
            chat_bot: Set(command.chat_bot),
            source_type: Set(command.source_type),
            is_enabled: Set(command.is_enabled),
        }
        .save(&self.connection)
        .await
        .map_err(|e| log_and_wrap_error("Update command error", e))?;

        Ok(())
    }
}
