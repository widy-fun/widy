use entity::assistant_settings::Tool;
use model::error::AppError;

#[tauri::command]
pub async fn get_tools() -> Result<Vec<Tool>, AppError> {
    Ok(Tool::get_tools::<Tool>()?)
}
