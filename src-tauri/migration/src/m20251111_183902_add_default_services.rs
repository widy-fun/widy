use entity::services::*;
use sea_orm_migration::prelude::*;
use sea_orm_migration::sea_orm::entity::*;
#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        let connection = manager.get_connection();
        ActiveModel {
            id: Set(ServiceType::Streamelements),
            authorized: Set(false),
            auth: Set(None),
            settings: Set(None),
        }
        .insert(connection)
        .await?;

        ActiveModel {
            id: Set(ServiceType::Twitch),
            authorized: Set(false),
            auth: Set(None),
            settings: Set(None),
        }
        .insert(connection)
        .await?;
        Ok(())
    }
    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        let connection = manager.get_connection();
        Entity::delete_by_id(ServiceType::Streamelements)
            .exec(connection)
            .await?;
        Entity::delete_by_id(ServiceType::Twitch)
            .exec(connection)
            .await?;
        Ok(())
    }
}
