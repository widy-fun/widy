use chrono::Utc;
use entity::{
    messages::{ClientMessage, MessageType},
    redemptions::Redemption,
    rewards::RewardType,
};
use tauri::{AppHandle, Manager};

use crate::{
    enums::AppEvent,
    repositories::RedemptionsRepository,
    services::{DatabaseService, EventMessage, MediaService, WebSocketBroadcaster},
};

pub async fn on_new_redemption(
    redemption: Redemption,
    reward_type: RewardType,
    app: &AppHandle,
) -> Result<(), String> {
    let media = match reward_type {
        RewardType::Media => {
            let media_service = app.state::<MediaService>();
            media_service
                .get_media(&redemption.user_input, &0.0, &app, MessageType::Redemption)
                .await
        }
        _ => None,
    };
    let websocket_broadcaster = app.state::<WebSocketBroadcaster>();
    let database_service = app.state::<DatabaseService>();
    let created_at = Utc::now().timestamp();
    let client_message = ClientMessage {
        id: redemption.message_id.clone(),
        r#type: MessageType::Redemption,
        created_at,
        donation: None,
        follow: None,
        subscription: None,
        redemption: Some(Redemption {
            media,
            ..redemption
        }),
        raid: None,
    };
    let _ = database_service
        .save_redemption_message(client_message.clone())
        .await;
    let event_message = EventMessage {
        event: AppEvent::Message,
        data: client_message.clone(),
    };
    websocket_broadcaster
        .broadcast_event_message(&event_message)
        .await;
    let event_message = EventMessage {
        event: AppEvent::Redemption,
        data: client_message.clone(),
    };
    websocket_broadcaster
        .broadcast_event_message(&event_message)
        .await;

    Ok(())
}
