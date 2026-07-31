use entity::services::*;

use crate::{error::AppError, services::DatabaseService, utils::log_and_wrap_error};
use async_trait::async_trait;
use sea_orm::{ActiveModelTrait, ActiveValue::Set, EntityTrait, QuerySelect};
#[async_trait]
pub trait ServicesRepository: Send + Sync {
    async fn get_services(&self) -> Result<Vec<Model>, AppError>;
    async fn get_service_by_id(&self, id: ServiceType) -> Result<Option<Model>, AppError>;
    async fn get_service_with_auth_by_id(&self, id: ServiceType)
    -> Result<Option<Model>, AppError>;
    async fn update_service_settings(
        &self,
        id: ServiceType,
        settings: ServiceSettings,
    ) -> Result<(), AppError>;
    async fn update_service_auth(
        &self,
        id: ServiceType,
        auth: Option<ServiceAuth>,
        authorized: bool,
    ) -> Result<(), AppError>;
    async fn update_service(&self, service: Model) -> Result<(), AppError>;
}

#[async_trait]
impl ServicesRepository for DatabaseService {
    async fn get_services(&self) -> Result<Vec<Model>, AppError> {
        Entity::find()
            .select_only()
            .column(Column::Id)
            .column(Column::Settings)
            .column(Column::Authorized)
            .all(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Get services error", e))
    }
    async fn get_service_by_id(&self, id: ServiceType) -> Result<Option<Model>, AppError> {
        Entity::find_by_id(id)
            .select_only()
            .column(Column::Id)
            .column(Column::Settings)
            .column(Column::Authorized)
            .one(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Get service by id error", e))
    }
    async fn get_service_with_auth_by_id(
        &self,
        id: ServiceType,
    ) -> Result<Option<Model>, AppError> {
        Entity::find_by_id(id)
            .one(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Get service with auth by id error", e))
    }

    async fn update_service_settings(
        &self,
        id: ServiceType,
        settings: ServiceSettings,
    ) -> Result<(), AppError> {
        let pear = self.get_service_by_id(id).await?;
        if let Some(pear) = pear {
            let mut pear: ActiveModel = pear.into();
            pear.settings = Set(Some(settings));
            pear.update(&self.connection)
                .await
                .map_err(|e| log_and_wrap_error("Update service settings error", e))?;
        }

        Ok(())
    }

    async fn update_service(&self, service: Model) -> Result<(), AppError> {
        Entity::update(ActiveModel {
            id: Set(service.id),
            authorized: Set(service.authorized),
            settings: Set(service.settings),
            auth: Set(service.auth),
        })
        .exec(&self.connection)
        .await
        .map_err(|e| log_and_wrap_error("Update service error", e))?;
        Ok(())
    }

    async fn update_service_auth(
        &self,
        id: ServiceType,
        auth: Option<ServiceAuth>,
        authorized: bool,
    ) -> Result<(), AppError> {
        let service = Entity::find_by_id(id)
            .one(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Get service by id error", e))?;
        if let Some(service) = service {
            let mut service_active_model: ActiveModel = service.into();
            service_active_model.auth = Set(auth);
            service_active_model.authorized = Set(authorized);
            service_active_model
                .update(&self.connection)
                .await
                .map_err(|e| log_and_wrap_error("Update service auth error", e))?;
            return Ok(());
        }
        Err(AppError::DbError("Service not found".to_string()))
    }
}
