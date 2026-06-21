use sea_orm_migration::{prelude::*, schema::*};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table("maption_settings")
                    .if_not_exists()
                    .col(pk_auto("id"))
                    .col(string("price_for_meter"))
                    .col(string("latitude"))
                    .col(string("longitude"))
                    .col(integer("new_donation_adding_time"))
                    .col(integer("timer_adding_time"))
                    .col(boolean("is_greater_timer_adding_time"))
                    .col(boolean("is_new_donation_adding_time"))
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table("maption_settings").to_owned())
            .await
    }
}
