use sea_orm_migration::prelude::*;
#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        let media_platform_settings =
            String::from(r#"{"enabled":false,"video_volume":50,"min_amount":0,"min_views":0}"#);

        manager
            .exec_stmt(
                Query::update()
                    .table("media_settings")
                    .value(Alias::new("kick"), media_platform_settings)
                    .to_owned(),
            )
            .await?;
        Ok(())
    }
    async fn down(&self, _manager: &SchemaManager) -> Result<(), DbErr> {
        Ok(())
    }
}
