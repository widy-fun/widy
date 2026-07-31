use std::sync::Arc;

use tauri::{AppHandle, State};

use crate::{error::AppError, services::WidySolService};

#[tauri::command]
pub async fn widy_sol_sign_out(
    app: AppHandle,
    widy_sol_service: State<'_, Arc<WidySolService>>,
) -> Result<(), AppError> {
    widy_sol_service.sign_out(&app).await?;
    Ok(())
}
