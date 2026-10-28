use database::{AlertsRepository, DatabaseService};
use entity::messages::MessageType;
use model::error::AppError;
use tauri::{AppHandle, Manager};

pub async fn get_random_alert(
    app: &AppHandle,
    r#type: MessageType,
) -> Result<Option<entity::alerts::Alert>, AppError> {
    let database_service = app.state::<DatabaseService>();
    database_service.get_random_alert(r#type).await
}
