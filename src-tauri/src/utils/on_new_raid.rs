use entity::{
    messages::{ClientMessage, MessageType},
    raids::Raid,
};
use tauri::{AppHandle, Manager};

use crate::{
    enums::AppEvent,
    repositories::RaidsRepository,
    services::{DatabaseService, EventMessage, WebSocketBroadcaster},
};

pub async fn on_new_raid(raid: Raid, app: &AppHandle) -> Result<(), String> {
    let websocket_broadcaster = app.state::<WebSocketBroadcaster>();
    let database_service = app.state::<DatabaseService>();
    let client_message = ClientMessage {
        id: raid.message_id.clone(),
        r#type: MessageType::Raid,
        created_at: raid.created_at,
        donation: None,
        follow: None,
        subscription: None,
        redemption: None,
        raid: Some(raid),
    };
    let event_message = EventMessage {
        event: AppEvent::Message,
        data: client_message.clone(),
    };
    websocket_broadcaster
        .broadcast_event_message(&event_message)
        .await;
    let event_message = EventMessage {
        event: AppEvent::Alert,
        data: client_message.clone(),
    };
    websocket_broadcaster
        .broadcast_event_message(&event_message)
        .await;
    let _ = database_service.save_raid_message(client_message).await;

    Ok(())
}
