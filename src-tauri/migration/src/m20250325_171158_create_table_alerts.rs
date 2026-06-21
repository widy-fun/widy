use sea_orm_migration::{prelude::*, schema::*};
#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table("alerts")
                    .if_not_exists()
                    .col(pk_uuid("id"))
                    .col(string("type"))
                    .col(string_null("audio"))
                    .col(integer("audio_volume"))
                    .col(string_null("image"))
                    .col(string("alert_variant"))
                    .col(string_null("video"))
                    .col(integer("video_volume"))
                    .col(string("group_id"))
                    .col(string("name"))
                    .col(string("view_type"))
                    .col(boolean("status"))
                    .col(integer("amount"))
                    .col(integer("delay"))
                    .col(integer("duration"))
                    .col(text("variation_conditions"))
                    .col(text("title_style"))
                    .col(text("message_style"))
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table("alerts").to_owned())
            .await
    }
}
