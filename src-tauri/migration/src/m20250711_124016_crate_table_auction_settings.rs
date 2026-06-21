use sea_orm_migration::{prelude::*, schema::*};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table("auction_settings")
                    .if_not_exists()
                    .col(pk_auto("id"))
                    .col(integer("leader_change_adding_time"))
                    .col(integer("new_lot_adding_time"))
                    .col(integer("new_donation_adding_time"))
                    .col(integer("timer_adding_time"))
                    .col(boolean("is_greater_timer_adding_time"))
                    .col(boolean("is_show_odds"))
                    .col(boolean("is_show_total_sum"))
                    .col(boolean("is_new_lot_adding_time"))
                    .col(boolean("is_leader_change_adding_time"))
                    .col(boolean("is_new_donation_adding_time"))
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table("auction_settings").to_owned())
            .await
    }
}
