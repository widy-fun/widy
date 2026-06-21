use sea_orm_migration::prelude::*;
#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        let media_platform_settings =
            String::from(r#"{"enabled":true,"video_volume":50,"min_amount":0,"min_views":5000}"#);

        manager
            .exec_stmt(
                Query::insert()
                    .into_table("media_settings")
                    .columns(["id", "youtube", "twitch", "tiktok"])
                    .values_panic([
                        1.into(),
                        media_platform_settings.clone().into(),
                        media_platform_settings.clone().into(),
                        media_platform_settings.clone().into(),
                    ])
                    .to_owned(),
            )
            .await?;
        Ok(())
    }
    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .exec_stmt(
                Query::delete()
                    .from_table("media_settings")
                    .and_where(Expr::col("id").eq(1))
                    .to_owned(),
            )
            .await?;

        Ok(())
    }
}
