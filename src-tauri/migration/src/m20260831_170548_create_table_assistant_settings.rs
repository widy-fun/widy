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
                    .col(string("tool_calling_provider"))
                    .col(json_binary("tool_calling_model"))
                    .col(string("stt_model"))
                    .col(string("stt_language"))
                    .col(string("device_id"))
                    .col(boolean("enable_on_start"))
                    .col(float("vad_threshold"))
                    .col(float("wake_threshold"))
                    .col(integer("silence_hangover_frames"))
                    .col(json_binary("tools"))
                    .col(integer("max_tokens"))
                    .col(integer("max_chars"))
                    .col(integer("tts_volume"))
                    .col(string("tts_type"))
                    .col(json_binary_null("tts_settings"))
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
