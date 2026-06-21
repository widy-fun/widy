use entity::settings::{Currency, TtsType};
use sea_orm_migration::{prelude::*, sea_orm::sqlx::types::Uuid};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        let tts_settings = String::from(r#"{"gender":"Male"}"#);

        manager
            .exec_stmt(
                Query::insert()
                    .into_table("settings")
                    .columns([
                        "id",
                        "moderation_duration",
                        "alert_paused",
                        "tts_volume",
                        "remove_links",
                        "black_list",
                        "language",
                        "currency",
                        "tts_type",
                        "tts_settings",
                        "widget_token",
                    ])
                    .values_panic([
                        1.into(),
                        0.into(),
                        false.into(),
                        50.into(),
                        false.into(),
                        "".into(),
                        "en".into(),
                        Currency::EUR.into(),
                        TtsType::Edge.into(),
                        tts_settings.into(),
                        Uuid::new_v4().to_string().into(),
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
                    .from_table("settings")
                    .and_where(Expr::col("id").eq(1))
                    .to_owned(),
            )
            .await?;

        Ok(())
    }
}
