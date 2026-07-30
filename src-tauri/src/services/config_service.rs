use std::path::PathBuf;

use tauri::{AppHandle, Manager, path::BaseDirectory};

use crate::{
    constants::{SQLITE_DB, STATIC_DIR},
    error::AppError,
    utils::resolve_path,
};

macro_rules! load_env {
    ($name:literal) => {{
        #[cfg(not(debug_assertions))]
        {
            env!($name).to_string()
        }
        #[cfg(debug_assertions)]
        {
            std::env::var($name)
                .map_err(|_| AppError::Config(concat!($name, " must be set").to_string()))?
        }
    }};
}

#[derive(Clone, Debug)]
pub struct ConfigService {
    pub db_path: PathBuf,
    pub widget_path: PathBuf,
    pub widgets_path: PathBuf,
    pub auc_fighter_path: PathBuf,
    pub static_path: PathBuf,
    pub assets_path: PathBuf,
    pub twitch_client_id: String,
    pub widy_sol_program_id: String,
    pub tmp_path: PathBuf,
    pub audio_path: PathBuf,
    pub nsfw_model_path: PathBuf,
    pub kick_client_id: String,
    pub kick_token_endpoint: String,
    pub kick_redirect_uri: String,
    pub kick_bot_client_id: String,
    pub kick_bot_token_endpoint: String,
    pub kick_bot_redirect_uri: String,
    pub app_token: String,
}

impl ConfigService {
    pub fn new(app: &AppHandle) -> Result<Self, AppError> {
        let twitch_client_id = load_env!("TWITCH_CLIENT_ID");
        let widy_sol_program_id = load_env!("WIDY_SOL_PROGRAM_ID");
        let kick_client_id = load_env!("KICK_CLIENT_ID");
        let kick_token_endpoint = load_env!("KICK_TOKEN_ENDPOINT");
        let kick_redirect_uri = load_env!("KICK_REDIRECT_URI");
        let kick_bot_client_id = load_env!("KICK_BOT_CLIENT_ID");
        let kick_bot_token_endpoint = load_env!("KICK_BOT_TOKEN_ENDPOINT");
        let kick_bot_redirect_uri = load_env!("KICK_BOT_REDIRECT_URI");
        let app_token = load_env!("APP_TOKEN");

        let db_path = resolve_path(app, SQLITE_DB, BaseDirectory::AppLocalData, "database")?;
        let widget_path = resolve_path(app, "dist-widget", BaseDirectory::Resource, "widget")?;
        let nsfw_model_path = resolve_path(
            app,
            "nsfw/erax_nsfw_yolo11m.onnx",
            BaseDirectory::Resource,
            "nsfw model",
        )?;
        let widgets_path = resolve_path(app, "widgets", BaseDirectory::AppLocalData, "widgets")?;
        let auc_fighter_path =
            resolve_path(app, "auc-fighter", BaseDirectory::Resource, "auc-fighter")?;
        let static_path = resolve_path(
            app,
            STATIC_DIR.to_string(),
            BaseDirectory::AppLocalData,
            "static directory",
        )?;
        let audio_path = resolve_path(
            app,
            format!("{}/audio", STATIC_DIR),
            BaseDirectory::AppLocalData,
            "audio directory",
        )?;
        let assets_path = resolve_path(app, "assets", BaseDirectory::Resource, "assets")?;
        let tmp_path = app
            .path()
            .temp_dir()
            .map_err(|e| AppError::Config(format!("Failed to resolve tmp path: {}", e)))?;

        Ok(Self {
            db_path,
            widget_path,
            auc_fighter_path,
            static_path,
            assets_path,
            twitch_client_id,
            widy_sol_program_id,
            widgets_path,
            tmp_path,
            audio_path,
            nsfw_model_path,
            kick_client_id,
            kick_token_endpoint,
            kick_redirect_uri,
            app_token,
            kick_bot_client_id,
            kick_bot_redirect_uri,
            kick_bot_token_endpoint,
        })
    }
}
