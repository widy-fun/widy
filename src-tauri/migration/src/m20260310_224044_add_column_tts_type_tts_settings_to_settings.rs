use entity::settings::{EdgeTtsSettings, Gender, TtsSettings, TtsType};
use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .alter_table(
                Table::alter()
                    .table(Settings::Table)
                    .add_column(
                        ColumnDef::new(Settings::TtsType)
                            .text()
                            .default(TtsType::Edge),
                    )
                    .to_owned(),
            )
            .await?;
        manager
            .alter_table(
                Table::alter()
                    .table(Settings::Table)
                    .add_column(ColumnDef::new(Settings::TtsSettings).text().default(
                        TtsSettings::Edge(EdgeTtsSettings {
                            gender: Gender::Male,
                        }),
                    ))
                    .to_owned(),
            )
            .await?;

        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .alter_table(
                Table::alter()
                    .table(Settings::Table)
                    .drop_column(Settings::TtsType)
                    .to_owned(),
            )
            .await?;
        manager
            .alter_table(
                Table::alter()
                    .table(Settings::Table)
                    .drop_column(Settings::TtsSettings)
                    .to_owned(),
            )
            .await?;

        Ok(())
    }
}
#[derive(Iden)]
enum Settings {
    Table,
    TtsType,
    TtsSettings,
}
