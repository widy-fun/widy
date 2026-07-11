use sea_orm_migration::{prelude::*, schema::*};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table("redemptions")
                    .if_not_exists()
                    .col(pk_uuid("id"))
                    .col(string("user_id"))
                    .col(string_null("user_name"))
                    .col(string_null("user_input"))
                    .col(uuid_uniq("message_id"))
                    .col(string("external_id"))
                    .col(string("reward_id"))
                    .col(string("title"))
                    .col(string_null("description"))
                    .col(integer("cost"))
                    .col(string("platform"))
                    .col(string("type"))
                    .col(float("points_currency_ratio"))
                    .col(string_null("media"))
                    .col(json_null("alert"))
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table("redemptions").to_owned())
            .await
    }
}
