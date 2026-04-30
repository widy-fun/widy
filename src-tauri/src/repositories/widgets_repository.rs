use crate::services::DatabaseService;
use async_trait::async_trait;
use entity::widget::*;
use sea_orm::{ActiveModelTrait, ActiveValue::Set, ColumnTrait, EntityTrait, QueryFilter};

#[async_trait]
pub trait WidgetsRepository: Send + Sync {
    async fn get_widget_by_id(&self, id: String) -> Result<Option<Model>, String>;
    async fn get_widget_by_dev_path(&self, dev_path: String) -> Result<Option<Model>, String>;
    async fn get_widgets(&self) -> Result<Vec<Model>, String>;
    async fn add_widget(
        &self,
        dev_path: Option<String>,
        manifest: Manifest,
        id: String,
    ) -> Result<(), String>;
    async fn delete_widget_by_id(&self, id: String) -> Result<(), String>;
    async fn update_widget(&self, manifest: Manifest, id: String) -> Result<(), String>;
    async fn update_view_storage(
        &self,
        view_storage: String,
        id: String,
    ) -> Result<Option<Model>, String>;
    async fn update_control_storage(
        &self,
        control_storage: String,
        id: String,
    ) -> Result<Option<Model>, String>;
}

#[async_trait]
impl WidgetsRepository for DatabaseService {
    async fn get_widget_by_id(&self, id: String) -> Result<Option<Model>, String> {
        Entity::find()
            .filter(Column::Id.eq(id))
            .one(&self.connection)
            .await
            .map_err(|e| {
                log::error!("Get widget by id error: {}", e);
                e.to_string()
            })
    }

    async fn get_widget_by_dev_path(&self, dev_path: String) -> Result<Option<Model>, String> {
        Entity::find()
            .filter(Column::DevPath.eq(dev_path))
            .one(&self.connection)
            .await
            .map_err(|e| {
                log::error!("Get widget by dev_path error: {}", e);
                e.to_string()
            })
    }

    async fn get_widgets(&self) -> Result<Vec<Model>, String> {
        Entity::find().all(&self.connection).await.map_err(|e| {
            log::error!("Get widgets error: {}", e);
            e.to_string()
        })
    }
    async fn add_widget(
        &self,
        dev_path: Option<String>,
        manifest: Manifest,
        id: String,
    ) -> Result<(), String> {
        ActiveModel::builder()
            .set_id(id)
            .set_manifest(manifest)
            .set_dev_path(dev_path)
            .insert(&self.connection)
            .await
            .map_err(|e| {
                log::error!("Upload widget error: {}", e);
                e.to_string()
            })?;

        Ok(())
    }
    async fn delete_widget_by_id(&self, id: String) -> Result<(), String> {
        Entity::delete_by_id(id)
            .exec(&self.connection)
            .await
            .map_err(|e| {
                log::error!("Delete widget by id error: {}", e);
                e.to_string()
            })?;
        Ok(())
    }

    async fn update_widget(&self, manifest: Manifest, id: String) -> Result<(), String> {
        if let Some(widget) = self.get_widget_by_id(id).await? {
            let mut pear: ActiveModel = widget.into();
            pear.manifest = Set(manifest);
            pear.update(&self.connection).await.map_err(|e| {
                log::error!("Update widget error: {}", e.to_string());
                e.to_string()
            })?;
            return Ok(());
        }
        Err("Widget not found".to_string())
    }
    async fn update_view_storage(
        &self,
        view_storage: String,
        id: String,
    ) -> Result<Option<Model>, String> {
        if let Some(widget) = self.get_widget_by_id(id).await? {
            let mut pear: ActiveModel = widget.into();
            pear.view_storage = Set(Some(view_storage));
            let widget = pear.update(&self.connection).await.map_err(|e| {
                log::error!("Update view storage error: {}", e.to_string());
                e.to_string()
            })?;
            return Ok(Some(widget));
        }
        Ok(None)
    }
    async fn update_control_storage(
        &self,
        control_storage: String,
        id: String,
    ) -> Result<Option<Model>, String> {
        if let Some(widget) = self.get_widget_by_id(id).await? {
            let mut pear: ActiveModel = widget.into();
            pear.control_storage = Set(Some(control_storage));
            let widget = pear.update(&self.connection).await.map_err(|e| {
                log::error!("Update control storage error: {}", e.to_string());
                e.to_string()
            })?;
            return Ok(Some(widget));
        }
        Ok(None)
    }
}
