use entity::settings::Currency;
use sea_orm_migration::prelude::*;

use crate::m20250324_221133_create_table_settings::Settings;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .exec_stmt(
                Query::insert()
                    .into_table(Settings::Table)
                    .columns([
                        Settings::Id,
                        Settings::ModerationDuration,
                        Settings::AlertPaused,
                        Settings::RemoveLinks,
                        Settings::TtsVolume,
                        Settings::BlackList,
                        Settings::Language,
                        Settings::Currency,
                    ])
                    .values_panic([
                        1.into(),
                        0.into(),
                        false.into(),
                        false.into(),
                        50.into(),
                        "".into(),
                        "en".into(),
                        Currency::EUR.into(),
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
                    .from_table(Settings::Table)
                    .and_where(Expr::col(Settings::Id).eq(1))
                    .to_owned(),
            )
            .await?;

        Ok(())
    }
}
