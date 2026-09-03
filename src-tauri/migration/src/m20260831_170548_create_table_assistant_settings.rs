use sea_orm_migration::{prelude::*, schema::*};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table("assistant_settings")
                    .if_not_exists()
                    .col(pk_auto("id"))
                    .col(string("provider"))
                    .col(string("model"))
                    .col(string("language"))
                    .col(string("device_id"))
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table("assistant_settings").to_owned())
            .await
    }
}
