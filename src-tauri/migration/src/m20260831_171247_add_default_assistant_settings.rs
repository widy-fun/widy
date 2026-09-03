use entity::assistant_settings::AssistantProvider;
use sea_orm_migration::prelude::*;
#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .exec_stmt(
                Query::insert()
                    .into_table("assistant_settings")
                    .columns(["id", "provider", "model", "language", "device_id"])
                    .values_panic([
                        1.into(),
                        AssistantProvider::Gemini.into(),
                        "gemini-3.6-flash".into(),
                        "en".into(),
                        "0".into(),
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
                    .from_table("assistant_settings")
                    .and_where(Expr::col("id").eq(1))
                    .to_owned(),
            )
            .await?;

        Ok(())
    }
}
