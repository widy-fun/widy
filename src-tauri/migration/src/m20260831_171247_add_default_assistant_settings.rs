use entity::assistant_settings::ToolCallingProvider;
use sea_orm_migration::prelude::*;
#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .exec_stmt(
                Query::insert()
                    .into_table("assistant_settings")
                    .columns([
                        "id",
                        "tool_calling_provider",
                        "tool_calling_model",
                        "stt_model",
                        "stt_language",
                        "device_id",
                        "enable_on_start",
                        "vad_threshold",
                        "wake_threshold",
                        "silence_hangover_frames",
                    ])
                    .values_panic([
                        1.into(),
                        ToolCallingProvider::Gemini.into(),
                        "gemini-3.6-flash".into(),
                        "nemotron-3.5-asr-streaming-0.6b".into(),
                        "en".into(),
                        "0".into(),
                        false.into(),
                        0.4.into(),
                        0.3.into(),
                        40.into(),
                    ])
                    .to_owned(),
            )
            .await?;
        Ok(())
    }
    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .exec_stmt(
                Query::delete()
                    .from_table("assistant_settings")
                    .and_where(Expr::col("id").eq(1))
                    .to_owned(),
            )
            .await?;

        Ok(())
    }
}
