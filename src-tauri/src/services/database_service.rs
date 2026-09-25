use migration::{Migrator, MigratorTrait};
use sea_orm::{ConnectOptions, Database, DatabaseConnection};
use std::path::PathBuf;
use tauri::is_dev;
use tokio::fs;

use crate::error::AppError;

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
