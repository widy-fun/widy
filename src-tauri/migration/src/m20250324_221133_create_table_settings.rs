use sea_orm_migration::{prelude::*, schema::*};
#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table("settings")
                    .if_not_exists()
                    .col(pk_auto("id"))
                    .col(integer("moderation_duration"))
                    .col(boolean("alert_paused"))
                    .col(integer("tts_volume"))
                    .col(boolean("remove_links"))
                    .col(string("black_list"))
                    .col(string("language"))
                    .col(string("currency"))
                    .col(string("tts_type"))
                    .col(text_null("tts_settings"))
                    .col(string("widget_token"))
                    .to_owned(),
            )
            .await
    }
    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table("settings").to_owned())
            .await
    }
}
