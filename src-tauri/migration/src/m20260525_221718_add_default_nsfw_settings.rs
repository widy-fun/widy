use entity::nsfw_settings::*;
use sea_orm_migration::{
    prelude::*,
    sea_orm::{ActiveModelTrait, ActiveValue::Set},
};

use crate::m20260525_204303_create_table_nsfw_settings::NsfwSettings;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        let connection = manager.get_connection();

        ActiveModel {
            id: Set(1),
            labels_confidence: Set(LabelsConfidence {
                anus: 30,
                make_love: 80,
                nipple: 10,
                penis: 30,
                vagina: 30,
            }),
            blur_timeout_duration: Set(1500),
        }
        .insert(connection)
        .await?;
        Ok(())
    }
    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .exec_stmt(
                Query::delete()
                    .from_table(NsfwSettings::Table)
                    .and_where(Expr::col(NsfwSettings::Id).eq(1))
                    .to_owned(),
            )
            .await?;

        Ok(())
    }
}
