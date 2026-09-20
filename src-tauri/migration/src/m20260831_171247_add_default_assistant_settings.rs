use entity::{
    alerts::TtsType,
    assistant_settings::{Tool, ToolCallingModel, ToolCallingProvider},
};
use sea_orm_migration::{prelude::*, sea_query::value::prelude::serde_json};
#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        let tools = Tool::get_tools::<Tool>().unwrap_or(vec![]);
        let tools_json = serde_json::to_string(&tools).unwrap();
        let tts_settings = String::from(r#"{"gender":"Male"}"#);
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
                        "tools",
                        "max_tokens",
                        "max_chars",
                        "tts_volume",
                        "tts_type",
                        "tts_settings",
                    ])
                    .values_panic([
                        1.into(),
                        ToolCallingProvider::Gemini.into(),
                        ToolCallingModel {
                            id: "gemini-3.5-flash-lite".into(),
                            display_name: "Gemini 3.5 Flash Lite".into(),
                        }
                        .into(),
                        "nemotron-3.5-asr-streaming-0.6b".into(),
                        "en".into(),
                        "0".into(),
                        false.into(),
                        0.4.into(),
                        0.3.into(),
                        40.into(),
                        tools_json.into(),
                        512.into(),
                        1000.into(),
                        50.into(),
                        TtsType::Edge.into(),
                        tts_settings.into(),
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
