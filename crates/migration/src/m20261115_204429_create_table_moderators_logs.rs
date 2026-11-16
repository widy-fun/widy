use sea_orm_migration::{prelude::*, schema::*};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table("moderators_logs")
                    .if_not_exists()
                    .col(pk_uuid("id"))
                    .col(uuid("moderator_id"))
                    .col(string("event_type"))
                    .col(integer("created_at"))
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table("moderators_logs").to_owned())
            .await
    }
}
