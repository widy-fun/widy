use sea_orm_migration::prelude::*;
#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .exec_stmt(
                Query::insert()
                    .into_table("maption_settings")
                    .columns([
                        "id",
                        "price_for_meter",
                        "latitude",
                        "longitude",
                        "new_donation_adding_time",
                        "timer_adding_time",
                        "is_greater_timer_adding_time",
                        "is_new_donation_adding_time",
                    ])
                    .values_panic([
                        1.into(),
                        "1".into(),
                        "-16.5004".into(),
                        "-151.7415".into(),
                        30000.into(),
                        120000.into(),
                        false.into(),
                        true.into(),
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
                    .from_table("maption_settings")
                    .and_where(Expr::col("id").eq(1))
                    .to_owned(),
            )
            .await?;

        Ok(())
    }
}
