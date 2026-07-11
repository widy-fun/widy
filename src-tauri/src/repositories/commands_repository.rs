use async_trait::async_trait;
use entity::commands::*;
use migration::Expr;
use sea_orm::{ActiveValue::Set, ColumnTrait, EntityTrait, QueryFilter};

use crate::services::DatabaseService;

#[async_trait]
pub trait CommandsRepository: Send + Sync {
    async fn get_command_by_id(&self, external_id: &String) -> Result<Option<Model>, String>;
    async fn get_command_by_chat_trigger(&self, trigger: &String) -> Result<Option<Model>, String>;
    async fn get_commands(&self) -> Result<Vec<Model>, String>;
    async fn create_command(&self, command: Model) -> Result<(), String>;
    async fn update_command(&self, command: Model) -> Result<(), String>;
    async fn delete_command_by_id(&self, id: &String) -> Result<(), String>;
}

#[async_trait]
impl CommandsRepository for DatabaseService {
    async fn get_commands(&self) -> Result<Vec<Model>, String> {
        Entity::find().all(&self.connection).await.map_err(|e| {
            log::error!("Get commands error: {}", e.to_string());
            e.to_string()
        })
    }
    async fn create_command(&self, command: Model) -> Result<(), String> {
        Entity::insert(ActiveModel {
            id: Set(command.id),
            name: Set(command.name),
            description: Set(command.description),
            chat: Set(command.chat),
            chat_bot: Set(command.chat_bot),
            timer: Set(command.timer),
            alert: Set(command.alert),
            source_type: Set(command.source_type),
        })
        .exec(&self.connection)
        .await
        .map_err(|e| {
            log::error!("Create reward error: {}", e);
            e.to_string()
        })?;

        Ok(())
    }

    async fn get_command_by_id(&self, id: &String) -> Result<Option<Model>, String> {
        Entity::find()
            .filter(Column::Id.eq(id))
            .one(&self.connection)
            .await
            .map_err(|e| {
                log::error!("Get command by id error: {}", e.to_string());
                e.to_string()
            })
    }

    async fn get_command_by_chat_trigger(&self, trigger: &String) -> Result<Option<Model>, String> {
        Entity::find()
            .filter(Expr::cust_with_values(
                "json_extract(source, '$.trigger') = ?",
                [trigger],
            ))
            .one(&self.connection)
            .await
            .map_err(|e| {
                log::error!("Get command by chat trigger error: {}", e.to_string());
                e.to_string()
            })
    }

    async fn delete_command_by_id(&self, id: &String) -> Result<(), String> {
        Entity::delete_by_id(id)
            .exec(&self.connection)
            .await
            .map_err(|e| {
                log::error!("Delete command by id error: {}", e);
                e.to_string()
            })?;
        Ok(())
    }

    async fn update_command(&self, command: Model) -> Result<(), String> {
        Entity::update(ActiveModel {
            id: Set(command.id),
            name: Set(command.name),
            description: Set(command.description),
            chat: Set(command.chat),
            chat_bot: Set(command.chat_bot),
            timer: Set(command.timer),
            alert: Set(command.alert),
            source_type: Set(command.source_type),
        })
        .exec(&self.connection)
        .await
        .map_err(|e| {
            log::error!("Update command settings error: {}", e);
            e.to_string()
        })?;

        Ok(())
    }
}
