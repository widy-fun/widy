use sea_orm_migration::{prelude::*, schema::*};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table("commands")
                    .if_not_exists()
                    .col(pk_uuid("id"))
                    .col(string("name"))
                    .col(string_null("description"))
                    .col(json_binary("source"))
                    .col(json_binary("action"))
                    .col(string("source_type"))
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table("commands").to_owned())
            .await
    }
}
