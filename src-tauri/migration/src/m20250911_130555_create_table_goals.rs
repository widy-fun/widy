use sea_orm_migration::{prelude::*, schema::*};
#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table("goals")
                    .if_not_exists()
                    .col(pk_uuid("id"))
                    .col(string("title"))
                    .col(integer("amount_raise"))
                    .col(integer("start_raising"))
                    .col(integer("current_amount"))
                    .col(integer("end_date"))
                    .col(integer("start_date"))
                    .col(boolean("ended"))
                    .col(string("type"))
                    .col(boolean("goal_amount_limits"))
                    .col(boolean("widget_background"))
                    .col(integer("bar_height"))
                    .col(integer("rounding_radius"))
                    .col(integer("bar_stroke_thickness"))
                    .col(string("background_bar_color"))
                    .col(string("progress_bar_color"))
                    .col(string("widget_background_color"))
                    .col(string("goal_title_type"))
                    .col(string("goal_progress_bar"))
                    .col(string("remaining_time"))
                    .col(string("progress_bar_layout"))
                    .col(text("title_style"))
                    .col(text("progress_style"))
                    .col(text("limits_style"))
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table("goals").to_owned())
            .await
    }
}
