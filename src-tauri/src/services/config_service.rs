use std::path::PathBuf;

use tauri::{path::BaseDirectory, AppHandle, Manager};

use crate::constants::{SQLITE_DB, STATIC_DIR};

#[derive(Clone, Debug)]
pub struct ConfigService {
    pub db_path: PathBuf,
    pub widget_path: PathBuf,
    pub widgets_path: PathBuf,
    pub auc_fighter_path: PathBuf,
    pub static_path: PathBuf,
    pub assets_path: PathBuf,
    pub client_id: String,
    pub widy_sol_program_id: String,
    pub tmp_path: PathBuf,
    pub audio_path: PathBuf,
    pub nsfw_model_path: PathBuf,
}

impl ConfigService {
    pub fn new(app: &AppHandle) -> Result<Self, String> {
        #[cfg(not(debug_assertions))]
        let client_id: String = env!("TWITCH_CLIENT_ID").to_string();
        #[cfg(not(debug_assertions))]
        let widy_sol_program_id: String = env!("WIDY_SOL_PROGRAM_ID").to_string();

        #[cfg(debug_assertions)]
        let client_id: String =
            std::env::var("TWITCH_CLIENT_ID").expect("TWITCH_CLIENT_ID must be set");
        #[cfg(debug_assertions)]
        let widy_sol_program_id: String =
            std::env::var("WIDY_SOL_PROGRAM_ID").expect("WIDY_SOL_PROGRAM_ID must be set");

        let db_path = app
            .path()
            .resolve(SQLITE_DB.to_string(), BaseDirectory::AppLocalData)
            .map_err(|e| format!("Failed to resolve database path: {}", e))?;
        let widget_path = app
            .path()
            .resolve("dist-widget", BaseDirectory::Resource)
            .map_err(|e| format!("Failed to resolve widget path: {}", e))?;
        let nsfw_model_path = app
            .path()
            .resolve("nsfw/erax_nsfw_yolo11m.onnx", BaseDirectory::Resource)
            .map_err(|e| format!("Failed to resolve widget path: {}", e))?;
        let widgets_path = app
            .path()
            .resolve("widgets", BaseDirectory::AppLocalData)
            .map_err(|e| format!("Failed to resolve widgets path: {}", e))?;

        let auc_fighter_path = app
            .path()
            .resolve("auc-fighter", BaseDirectory::Resource)
            .map_err(|e| format!("Failed to resolve auc-fighter path: {}", e))?;
        let static_path = app
            .path()
            .resolve(format!("{}", STATIC_DIR), BaseDirectory::AppLocalData)
            .map_err(|e| format!("Failed to resolve static directory path: {}", e))?;
        let audio_path = app
            .path()
            .resolve(format!("{}/audio", STATIC_DIR), BaseDirectory::AppLocalData)
            .map_err(|e| format!("Failed to resolve audio directory path: {}", e))?;
        let assets_path = app
            .path()
            .resolve("assets", BaseDirectory::Resource)
            .map_err(|e| format!("Failed to resolve assets path: {}", e))?;
        let tmp_path = app
            .path()
            .temp_dir()
            .map_err(|e| format!("Failed to resolve tmp path: {}", e))?;
        Ok(Self {
            db_path,
            widget_path,
            auc_fighter_path,
            static_path,
            assets_path,
            client_id,
            widy_sol_program_id,
            widgets_path,
            tmp_path,
            audio_path,
            nsfw_model_path,
        })
    }
}
