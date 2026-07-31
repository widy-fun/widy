use entity::widgets::Manifest;
use futures::StreamExt;
use tauri::State;
use tokio::{fs, io::AsyncWriteExt};
use uuid::Uuid;

use crate::{error::AppError, services::ConfigService, utils::log_and_wrap_error};

pub async fn download_widget(
    reqwest_client: &State<'_, reqwest::Client>,
    config_service: &State<'_, ConfigService>,
    manifest: &Manifest,
    id: Uuid,
) -> Result<(), AppError> {
    let widget = format!("{}-v{}", manifest.id, manifest.version);
    let widget_url = format!(
        "https://github.com/widy-fun/widgets/releases/download/{}/{}.zip",
        widget, widget
    );

    let mut stream = reqwest_client
        .get(&widget_url)
        .send()
        .await
        .map_err(|e| log_and_wrap_error("Filed to download widget", e))?
        .bytes_stream();

    fs::create_dir_all(&config_service.widgets_path)
        .await
        .map_err(|e| log_and_wrap_error("Filed to crate widgets directory", e))?;

    let zip_path = config_service.tmp_path.join(format!("{}.zip", widget));

    let mut zip_file = tokio::fs::File::create(zip_path.clone())
        .await
        .map_err(|e| log_and_wrap_error("Filed to crate widgets zip file", e))?;

    while let Some(Result::Ok(chunk)) = stream.next().await {
        zip_file
            .write_all(&chunk)
            .await
            .map_err(|e| log_and_wrap_error("Filed write to zip file", e))?;
    }

    let extract_path = config_service
        .widgets_path
        .join(&manifest.id.to_string())
        .join(&id.to_string());
    let zip_path_clone = zip_path.clone();
    tokio::task::spawn_blocking(move || -> Result<(), AppError> {
        let file = std::fs::File::open(&zip_path_clone)
            .map_err(|e| log_and_wrap_error("Filed to open widget zip file", e))?;
        let mut archive = zip::ZipArchive::new(file)
            .map_err(|e| log_and_wrap_error("Filed to crate zip reader", e))?;
        archive
            .extract(&extract_path)
            .map_err(|e| log_and_wrap_error("Filed to extract files from zip file", e))?;
        Ok(())
    })
    .await
    .map_err(|e| AppError::Custom(e.to_string()))??;

    fs::remove_file(&zip_path)
        .await
        .map_err(|e| log_and_wrap_error("Filed to remove tmp zip file", e))?;
    Ok(())
}
