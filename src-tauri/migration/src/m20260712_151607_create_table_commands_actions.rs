use sea_orm_migration::{prelude::*, schema::*};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table("commands_actions")
                    .if_not_exists()
                    .col(pk_uuid("id"))
                    .col(string("user_name"))
                    .col(string_null("user_input"))
                    .col(uuid("command_id"))
                    .col(string("command_name"))
                    .col(uuid_uniq("message_id"))
                    .col(string_null("platform"))
                    .col(json_binary_null("media"))
                    .col(json_binary_null("alert"))
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table("commands_actions").to_owned())
            .await
    }
}
