use sea_orm_migration::{prelude::*, schema::*};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table("assistant_actions")
                    .if_not_exists()
                    .col(pk_uuid("id"))
                    .col(uuid_uniq("message_id"))
                    .col(string("type"))
                    .col(json_binary_null("data"))
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table("assistant_actions").to_owned())
            .await
    }
}
