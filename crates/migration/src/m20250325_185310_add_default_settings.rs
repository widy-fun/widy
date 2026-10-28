use entity::settings::Currency;
use sea_orm_migration::{prelude::*, sea_orm::sqlx::types::Uuid};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .exec_stmt(
                Query::insert()
                    .into_table("settings")
                    .columns([
                        "id",
                        "moderation_duration",
                        "alert_paused",
                        "remove_links",
                        "black_list",
                        "language",
                        "currency",
                        "widget_token",
                    ])
                    .values_panic([
                        1.into(),
                        0.into(),
                        false.into(),
                        false.into(),
                        "".into(),
                        "en".into(),
                        Currency::EUR.into(),
                        Uuid::new_v4().to_string().into(),
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
                    .from_table("settings")
                    .and_where(Expr::col("id").eq(1))
                    .to_owned(),
            )
            .await?;

        Ok(())
    }
}
