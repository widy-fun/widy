use sea_orm::{ConnectOptions, Database, DatabaseConnection};
pub use services_repository::*;
pub use settings_repository::*;
use std::path::PathBuf;
pub use subscriptions_repository::*;
use tauri::is_dev;
use tokio::fs;
pub use variables_repository::*;
pub use widgets_repository::*;
pub mod alerts_repository;
pub mod assistant_actions_repository;
pub mod assistant_settings_repository;
pub mod auc_fighter_settings_repository;
pub mod auction_settings_repository;
pub mod commands_actions_repository;
pub mod commands_repository;
pub mod donations_repository;
pub mod follows_repository;
pub mod goals_repository;
pub mod maption_settings_repository;
pub mod media_settings_repository;
pub mod messages_repository;
pub mod nsfw_repository;
pub mod raids_repository;
pub mod redemptions_repository;
pub mod rewards_repository;
pub mod services_repository;
pub mod settings_repository;
pub mod subscriptions_repository;
pub mod variables_repository;
pub mod widgets_repository;
pub use alerts_repository::*;
pub use assistant_actions_repository::*;
pub use assistant_settings_repository::*;
pub use auc_fighter_settings_repository::*;
pub use auction_settings_repository::*;
pub use commands_actions_repository::*;
pub use commands_repository::*;
pub use donations_repository::*;
pub use follows_repository::*;
pub use goals_repository::*;
pub use maption_settings_repository::*;
pub use media_settings_repository::*;
pub use messages_repository::*;
use migration::{Migrator, MigratorTrait};
use model::error::AppError;
pub use nsfw_repository::*;
pub use raids_repository::*;
pub use redemptions_repository::*;
pub use rewards_repository::*;

#[derive(Clone, Debug)]
pub struct DatabaseService {
    pub connection: DatabaseConnection,
}
impl DatabaseService {
    pub async fn new(db_path: &PathBuf) -> Result<Self, AppError> {
        let db_url = format!("sqlite://{}?mode=rwc", db_path.to_string_lossy());

        let options = Self::get_connect_options(db_url.clone());

        let connection = Self::establish_connection(options).await?;
        match Self::run_migrations(&connection).await {
            Ok(_) => {
                return Ok(Self { connection });
            }
            Err(_) => {
                fs::rename(db_path, format!("{}.old", db_path.to_string_lossy(),)).await?;
                let options = Self::get_connect_options(db_url);
                let connection = Self::establish_connection(options).await?;
                Self::run_migrations(&connection).await?;
                return Ok(Self { connection });
            }
        }
    }

    fn get_connect_options(db_url: String) -> ConnectOptions {
        let mut options = ConnectOptions::new(db_url);
        options
            .max_connections(100)
            .min_connections(5)
            .sqlx_logging(false)
            .sqlx_logging_level(if is_dev() {
                log::LevelFilter::Info
            } else {
                log::LevelFilter::Error
            });
        options
    }
    async fn establish_connection(options: ConnectOptions) -> Result<DatabaseConnection, AppError> {
        Database::connect(options).await.map_err(|e| {
            log::error!("Database connect error: {}", e);
            AppError::DbError(e.to_string())
        })
    }
    async fn run_migrations(connection: &DatabaseConnection) -> Result<(), AppError> {
        Migrator::up(connection, None).await.map_err(|e| {
            log::error!("Migration error: {}", e);
            AppError::DbError(e.to_string())
        })?;
        log::info!("Migrations run");
        Ok(())
    }
}
