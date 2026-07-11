use entity::messages::MessageType;
use tauri::{AppHandle, Manager};

use crate::{repositories::AlertsRepository, services::DatabaseService};

pub async fn get_random_alert(
    app: &AppHandle,
    r#type: MessageType,
) -> Result<Option<entity::alerts::Alert>, String> {
    let database_service = app.state::<DatabaseService>();
    database_service.get_random_alert(r#type).await
}
