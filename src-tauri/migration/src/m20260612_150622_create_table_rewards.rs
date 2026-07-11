use sea_orm_migration::{prelude::*, schema::*};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table("rewards")
                    .if_not_exists()
                    .col(pk_uuid("id"))
                    .col(string("platform"))
                    .col(string("type"))
                    .col(string_null("external_id"))
                    .col(string("title"))
                    .col(string_null("description"))
                    .col(integer("cost"))
                    .col(string("background_color"))
                    .col(boolean("is_user_input_required"))
                    .col(float("points_currency_ratio"))
                    .col(boolean("is_enabled"))
                    .col(boolean_null("is_max_per_stream_enabled"))
                    .col(integer_null("max_per_stream"))
                    .col(boolean_null("is_max_per_user_per_stream_enabled"))
                    .col(integer_null("max_per_user_per_stream"))
                    .col(boolean_null("is_global_cooldown_enabled"))
                    .col(integer_null("global_cooldown_seconds"))
                    .col(boolean_null("should_redemptions_skip_request_queue"))
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table("rewards").to_owned())
            .await
    }
}
