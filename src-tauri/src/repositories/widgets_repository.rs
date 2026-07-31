use crate::{error::AppError, services::DatabaseService, utils::log_and_wrap_error};
use async_trait::async_trait;
use entity::widgets::*;
use sea_orm::{ActiveModelTrait, ActiveValue::Set, ColumnTrait, EntityTrait, QueryFilter};
use uuid::Uuid;

#[async_trait]
pub trait WidgetsRepository: Send + Sync {
    async fn get_widget_by_id(&self, id: Uuid) -> Result<Option<Model>, AppError>;
    async fn get_widget_by_dev_path(&self, dev_path: String) -> Result<Option<Model>, AppError>;
    async fn get_widgets(&self) -> Result<Vec<Model>, AppError>;
    async fn add_widget(
        &self,
        dev_path: Option<String>,
        manifest: Manifest,
        id: Uuid,
    ) -> Result<(), AppError>;
    async fn delete_widget_by_id(&self, id: Uuid) -> Result<(), AppError>;
    async fn update_widget(&self, manifest: Manifest, id: Uuid) -> Result<(), AppError>;
    async fn update_view_storage(
        &self,
        view_storage: String,
        id: Uuid,
    ) -> Result<Option<Model>, AppError>;
    async fn update_control_storage(
        &self,
        control_storage: String,
        id: Uuid,
    ) -> Result<Option<Model>, AppError>;
}

#[async_trait]
impl WidgetsRepository for DatabaseService {
    async fn get_widget_by_id(&self, id: Uuid) -> Result<Option<Model>, AppError> {
        Entity::find()
            .filter(Column::Id.eq(id))
            .one(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Get widget by id error", e))
    }

    async fn get_widget_by_dev_path(&self, dev_path: String) -> Result<Option<Model>, AppError> {
        Entity::find()
            .filter(Column::DevPath.eq(dev_path))
            .one(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Get widget by dev_path error", e))
    }

    async fn get_widgets(&self) -> Result<Vec<Model>, AppError> {
        Entity::find()
            .all(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Get widgets error", e))
    }
    async fn add_widget(
        &self,
        dev_path: Option<String>,
        manifest: Manifest,
        id: Uuid,
    ) -> Result<(), AppError> {
        ActiveModel::builder()
            .set_id(id)
            .set_manifest(manifest)
            .set_dev_path(dev_path)
            .insert(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Upload widget error", e))?;

        Ok(())
    }
    async fn delete_widget_by_id(&self, id: Uuid) -> Result<(), AppError> {
        Entity::delete_by_id(id)
            .exec(&self.connection)
            .await
            .map_err(|e| log_and_wrap_error("Delete widget by id error", e))?;
        Ok(())
    }

    async fn update_widget(&self, manifest: Manifest, id: Uuid) -> Result<(), AppError> {
        if let Some(widget) = self.get_widget_by_id(id).await? {
            let mut pear: ActiveModel = widget.into();
            pear.manifest = Set(manifest);
            pear.update(&self.connection)
                .await
                .map_err(|e| log_and_wrap_error("Update widget error", e))?;
            return Ok(());
        }
        Err(AppError::DbError("Widget not found".to_string()))
    }
    async fn update_view_storage(
        &self,
        view_storage: String,
        id: Uuid,
    ) -> Result<Option<Model>, AppError> {
        if let Some(widget) = self.get_widget_by_id(id).await? {
            let mut pear: ActiveModel = widget.into();
            pear.view_storage = Set(Some(view_storage));
            let widget = pear
                .update(&self.connection)
                .await
                .map_err(|e| log_and_wrap_error("Update view storage error", e))?;
            return Ok(Some(widget));
        }
        Ok(None)
    }
    async fn update_control_storage(
        &self,
        control_storage: String,
        id: Uuid,
    ) -> Result<Option<Model>, AppError> {
        if let Some(widget) = self.get_widget_by_id(id).await? {
            let mut pear: ActiveModel = widget.into();
            pear.control_storage = Set(Some(control_storage));
            let widget = pear
                .update(&self.connection)
                .await
                .map_err(|e| log_and_wrap_error("Update control storage error", e))?;
            return Ok(Some(widget));
        }
        Ok(None)
    }
}
