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
                    .col(json_binary("title_style"))
                    .col(string("title_template"))
                    .col(json_binary("message_style"))
                    .col(uuid_null("reward_id"))
                    .col(uuid_null("command_id"))
                    .col(integer("tts_volume"))
                    .col(string("tts_type"))
                    .col(json_binary_null("tts_settings"))
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
