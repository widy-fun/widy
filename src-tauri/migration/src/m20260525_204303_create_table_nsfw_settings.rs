use sea_orm_migration::{prelude::*, schema::*};
#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(NsfwSettings::Table)
                    .if_not_exists()
                    .col(pk_auto(NsfwSettings::Id))
                    .col(json_binary(NsfwSettings::LabelsConfidence))
                    .col(integer(NsfwSettings::BlurTimeoutDuration))
                    .to_owned(),
            )
            .await?;

        Ok(())
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(NsfwSettings::Table).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
pub enum NsfwSettings {
    #[sea_orm(iden = "nsfw_settings")]
    Table,
    Id,
    LabelsConfidence,
    BlurTimeoutDuration,
}
