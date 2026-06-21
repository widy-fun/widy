use sea_orm_migration::{prelude::*, schema::*};
#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table("nsfw_settings")
                    .if_not_exists()
                    .col(pk_auto("id"))
                    .col(json_binary("labels_confidence"))
                    .col(integer("blur_timeout_duration"))
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table("nsfw_settings").to_owned())
            .await
    }
}
