use sea_orm_migration::{prelude::*, schema::*};

#[derive(DeriveMigrationName)]
pub struct Migration;

fn goals_table(name: &str, float: bool) -> TableCreateStatement {
    let money = |col: &'static str| if float { double(col) } else { integer(col) };

    Table::create()
        .table(name.to_owned())
        .col(pk_uuid("id"))
        .col(string("title"))
        .col(money("amount_raise"))
        .col(money("start_raising"))
        .col(money("current_amount"))
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
        .col(json_binary("title_style"))
        .col(json_binary("progress_style"))
        .col(json_binary("limits_style"))
        .to_owned()
}

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager.create_table(goals_table("goals_new", true)).await?;

        manager
            .get_connection()
            .execute_unprepared("INSERT INTO goals_new SELECT * FROM goals")
            .await?;

        manager
            .drop_table(Table::drop().table("goals").to_owned())
            .await?;
        manager
            .rename_table(Table::rename().table("goals_new", "goals").to_owned())
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(goals_table("goals_old", false))
            .await?;

        manager
            .get_connection()
            .execute_unprepared(
                "INSERT INTO goals_old
                 SELECT id, title,
                        CAST(amount_raise AS INTEGER),
                        CAST(start_raising AS INTEGER),
                        CAST(current_amount AS INTEGER),
                        end_date, start_date, ended, type,
                        goal_amount_limits, widget_background,
                        bar_height, rounding_radius, bar_stroke_thickness,
                        background_bar_color, progress_bar_color,
                        widget_background_color, goal_title_type,
                        goal_progress_bar, remaining_time, progress_bar_layout,
                        title_style, progress_style, limits_style
                 FROM goals",
            )
            .await?;

        manager
            .drop_table(Table::drop().table("goals").to_owned())
            .await?;
        manager
            .rename_table(Table::rename().table("goals_old", "goals").to_owned())
            .await
    }
}
