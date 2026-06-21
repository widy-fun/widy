use sea_orm_migration::prelude::*;

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        let labels_confidence =
            String::from(r#"{"anus":30,"make_love":80,"nipple":10,"penis":30,"vagina":30}"#);
        manager
            .exec_stmt(
                Query::insert()
                    .into_table("nsfw_settings")
                    .columns(["id", "labels_confidence", "blur_timeout_duration"])
                    .values_panic([1.into(), labels_confidence.into(), 1500.into()])
                    .to_owned(),
            )
            .await?;
        Ok(())
    }
    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .exec_stmt(
                Query::delete()
                    .from_table("nsfw_settings")
                    .and_where(Expr::col("id").eq(1))
                    .to_owned(),
            )
            .await?;

        Ok(())
    }
}
