use sea_orm_migration::{prelude::*, schema::*};
#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table("donations")
                    .if_not_exists()
                    .col(pk_uuid("id"))
                    .col(string("service_id"))
                    .col(uuid_uniq("message_id"))
                    .col(double("amount"))
                    .col(string("user_name"))
                    .col(string("currency"))
                    .col(string_null("text"))
                    .col(string_null("audio"))
                    .col(string("service"))
                    .col(json_binary_null("media"))
                    .col(boolean("played"))
                    .col(double_null("exchanged_amount"))
                    .col(string_null("exchanged_currency"))
                    .col(big_integer("created_at"))
                    .col(json_binary_null("alert"))
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table("donations").to_owned())
            .await
    }
}
