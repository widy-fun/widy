use crate::{error::AppError, services::DatabaseService, utils::log_and_wrap_error};
use async_trait::async_trait;
use entity::variables::*;
use sea_orm::{ActiveValue::Set, ColumnTrait, EntityTrait, QueryFilter};
use uuid::Uuid;

#[async_trait]
pub trait VariablesRepository: Send + Sync {
    async fn get_variables(&self) -> Result<Vec<Variable>, AppError>;
    async fn get_variable_by_id(&self, id: Uuid) -> Result<Option<Model>, AppError>;
    async fn get_variable_by_name(&self, name: String) -> Result<Option<Model>, AppError>;
    async fn get_variables_by_names(&self, names: Vec<String>) -> Result<Vec<Model>, AppError>;
    async fn update_variable(&self, variable: Model) -> Result<(), AppError>;
    async fn create_variable(&self, variable: Model) -> Result<(), AppError>;
    async fn delete_variable_by_id(&self, id: Uuid) -> Result<(), AppError>;
}

#[async_trait]
impl VariablesRepository for DatabaseService {
    async fn get_variables(&self) -> Result<Vec<Variable>, AppError> {
        Entity::find()
            .into_partial_model()
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
    async fn get_variable_by_name(&self, name: String) -> Result<Option<Model>, AppError> {
        Entity::find()
            .filter(Column::Name.eq(name))
            .one(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Get variable by name error", e))
    }
    async fn get_variables_by_names(&self, names: Vec<String>) -> Result<Vec<Model>, AppError> {
        Entity::find()
            .filter(Column::Name.is_in(names))
            .all(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Get variables by names error", e))
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
    async fn delete_variable_by_id(&self, id: Uuid) -> Result<(), AppError> {
        Entity::delete_by_id(id)
            .exec(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Delete variable by id error", e))?;
        Ok(())
    }
}
