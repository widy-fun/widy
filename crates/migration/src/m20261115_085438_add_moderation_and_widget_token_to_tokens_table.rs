use entity::tokens::TokenType;
use sea_orm::prelude::Uuid;
use sea_orm_migration::prelude::*;
#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .exec_stmt(
                Query::insert()
                    .into_table("tokens")
                    .columns(["id", "type", "token"])
                    .values_panic([
                        1.into(),
                        TokenType::Moderation.into(),
                        Uuid::new_v4().into(),
                    ])
                    .values_panic([2.into(), TokenType::Widget.into(), Uuid::new_v4().into()])
                    .to_owned(),
            )
            .await?;
        Ok(())
    }
    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .exec_stmt(
                Query::delete()
                    .from_table("tokens")
                    .and_where(Expr::col("id").eq(1))
                    .and_where(Expr::col("id").eq(2))
                    .to_owned(),
            )
            .await?;

        Ok(())
    }
}
