pub use sea_orm_migration::prelude::*;
mod m20250324_201351_create_messages_table;
mod m20250324_221133_create_table_settings;
mod m20250325_171158_create_table_alerts;
mod m20250325_185301_add_default_alert;
mod m20250325_185310_add_default_settings;
mod m20250405_190810_create_table_media_settings;
mod m20250405_190835_add_default_media_settings;
mod m20250711_124016_crate_table_auction_settings;
mod m20250711_124829_add_default_auction_settings;
mod m20250717_152323_create_table_maption_settings;
mod m20250717_152358_add_default_maption_settings;
mod m20250819_113411_create_table_auc_fighter_settings;
mod m20250819_113447_add_default_auc_fighter_settings;
mod m20250911_130555_create_table_goals;
mod m20251111_172605_create_table_services;
mod m20251111_183902_add_default_services;
mod m20251212_023401_create_donations_table;
mod m20251219_012429_create_table_followers;
mod m20251219_211909_create_table_subscriptions;
mod m20251224_193112_create_table_raids;
mod m20260131_232002_add_widy_sol_service;
mod m20260214_231116_add_widy_ton_service;
mod m20260306_172034_add_donation_alerts_service;
mod m20260307_000508_add_stream_labs_service;
mod m20260308_122456_add_donatello_service;
mod m20260308_122513_add_donatik_service;
mod m20260318_195439_create_table_widgets;
mod m20260525_204303_create_table_nsfw_settings;
mod m20260525_221718_add_default_nsfw_settings;
mod m20260530_134422_add_donatepay_service;
mod m20260603_222729_add_destream_service;
mod m20260605_175133_add_tribute_service;
mod m20260612_150622_create_table_rewards;
mod m20260612_153247_create_table_redemptions;
mod m20260625_110014_add_kick_service;
mod m20260703_175302_create_table_commands;
mod m20260704_230414_add_kick_bot_service;
mod m20260704_230421_add_twitch_bot_service;

pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m20250324_201351_create_messages_table::Migration),
            Box::new(m20250324_221133_create_table_settings::Migration),
            Box::new(m20250325_171158_create_table_alerts::Migration),
            Box::new(m20250325_185301_add_default_alert::Migration),
            Box::new(m20250325_185310_add_default_settings::Migration),
            Box::new(m20250405_190810_create_table_media_settings::Migration),
            Box::new(m20250405_190835_add_default_media_settings::Migration),
            Box::new(m20250711_124016_crate_table_auction_settings::Migration),
            Box::new(m20250711_124829_add_default_auction_settings::Migration),
            Box::new(m20250717_152323_create_table_maption_settings::Migration),
            Box::new(m20250717_152358_add_default_maption_settings::Migration),
            Box::new(m20250819_113411_create_table_auc_fighter_settings::Migration),
            Box::new(m20250819_113447_add_default_auc_fighter_settings::Migration),
            Box::new(m20250911_130555_create_table_goals::Migration),
            Box::new(m20251111_172605_create_table_services::Migration),
            Box::new(m20251111_183902_add_default_services::Migration),
            Box::new(m20251212_023401_create_donations_table::Migration),
            Box::new(m20251219_012429_create_table_followers::Migration),
            Box::new(m20251219_211909_create_table_subscriptions::Migration),
            Box::new(m20251224_193112_create_table_raids::Migration),
            Box::new(m20260131_232002_add_widy_sol_service::Migration),
            Box::new(m20260214_231116_add_widy_ton_service::Migration),
            Box::new(m20260306_172034_add_donation_alerts_service::Migration),
            Box::new(m20260307_000508_add_stream_labs_service::Migration),
            Box::new(m20260308_122456_add_donatello_service::Migration),
            Box::new(m20260308_122513_add_donatik_service::Migration),
            Box::new(m20260318_195439_create_table_widgets::Migration),
            Box::new(m20260525_204303_create_table_nsfw_settings::Migration),
            Box::new(m20260525_221718_add_default_nsfw_settings::Migration),
            Box::new(m20260530_134422_add_donatepay_service::Migration),
            Box::new(m20260603_222729_add_destream_service::Migration),
            Box::new(m20260605_175133_add_tribute_service::Migration),
            Box::new(m20260612_150622_create_table_rewards::Migration),
            Box::new(m20260612_153247_create_table_redemptions::Migration),
            Box::new(m20260625_110014_add_kick_service::Migration),
            Box::new(m20260703_175302_create_table_commands::Migration),
            Box::new(m20260704_230414_add_kick_bot_service::Migration),
            Box::new(m20260704_230421_add_twitch_bot_service::Migration),
        ]
    }
}
