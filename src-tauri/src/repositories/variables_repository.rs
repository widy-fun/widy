use crate::{error::AppError, services::DatabaseService, utils::log_and_wrap_error};
use async_trait::async_trait;
use entity::variables::*;
use sea_orm::{ActiveValue::Set, EntityTrait};
use uuid::Uuid;

#[async_trait]
pub trait VariablesRepository: Send + Sync {
    async fn get_variables(&self) -> Result<Vec<Model>, AppError>;
    async fn get_variable_by_id(&self, id: Uuid) -> Result<Option<Model>, AppError>;
    async fn update_variable(&self, variable: Model) -> Result<(), AppError>;
    async fn create_variable(&self, variable: Model) -> Result<(), AppError>;
}

#[async_trait]
impl VariablesRepository for DatabaseService {
    async fn get_variables(&self) -> Result<Vec<Model>, AppError> {
        Entity::find()
            .all(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Get variables error", e))
    }
    async fn get_variable_by_id(&self, id: Uuid) -> Result<Option<Model>, AppError> {
        Entity::find_by_id(id)
            .one(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Get variable by id error", e))
    }
    async fn update_variable(&self, variable: Model) -> Result<(), AppError> {
        Entity::update(ActiveModel {
            id: Set(variable.id),
            name: Set(variable.name),
            description: Set(variable.description),
            value: Set(variable.value),
        })
        .exec(&self.connection)
        .await
        .map_err(|e| log_and_wrap_error("Update variable error", e))?;
        Ok(())
    }
    async fn create_variable(&self, variable: Model) -> Result<(), AppError> {
        Entity::insert(ActiveModel {
            id: Set(variable.id),
            name: Set(variable.name),
            description: Set(variable.description),
            value: Set(variable.value),
        })
        .exec(&self.connection)
        .await
        .map_err(|e| log_and_wrap_error("Crate variable error", e))?;
        Ok(())
    }
}
