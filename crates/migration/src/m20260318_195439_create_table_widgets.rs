use sea_orm_migration::{prelude::*, schema::*};
#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table("widgets")
                    .if_not_exists()
                    .col(pk_uuid("id"))
                    .col(text("manifest"))
                    .col(string_null("dev_path"))
                    .col(string_null("view_storage"))
                    .col(string_null("control_storage"))
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table("widgets").to_owned())
            .await
    }
}
