use entity::{
    alerts::{AlertVariant, AlertVariationConditions, TtsType, ViewType},
    messages::MessageType,
};
use sea_orm_migration::{prelude::*, sea_orm::sqlx::types::Uuid};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        let tts_settings = String::from(r#"{"gender":"Male"}"#);
        let text_style = String::from(
            r#"{"bold":true,"font_size":60,"italics":false,"letter_spacing":0,"text_color":"rgb(255,255,255,1)","underline":false,"word_spacing":0,"animation":"No","animation_variant":"AllText"}"#,
        );
        manager
            .exec_stmt(
                Query::insert()
                    .into_table("alerts")
                    .columns([
                        "id",
                        "type",
                        "audio",
                        "audio_volume",
                        "image",
                        "alert_variant",
                        "video_volume",
                        "group_id",
                        "name",
                        "view_type",
                        "status",
                        "amount",
                        "delay",
                        "duration",
                        "variation_conditions",
                        "title_style",
                        "message_style",
                        "video",
                        "tts_volume",
                        "tts_type",
                        "tts_settings",
                    ])
                    .values_panic([
                        Uuid::parse_str("ba234e82-7a86-4f77-850b-f2d739902595")
                            .unwrap()
                            .into(),
                        MessageType::Donation.into(),
                        "alert.mp3".into(),
                        50.into(),
                        "image.gif".into(),
                        AlertVariant::ImageAndAudio.into(),
                        50.into(),
                        "1".into(),
                        "default".into(),
                        ViewType::Top.into(),
                        true.into(),
                        50.into(),
                        0.into(),
                        3000.into(),
                        AlertVariationConditions::Random.into(),
                        text_style.clone().into(),
                        text_style.into(),
                        "video.mp4".into(),
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
                    .from_table("alerts")
                    .and_where(Expr::col("id").eq("default"))
                    .to_owned(),
            )
            .await?;
        Ok(())
    }
}
