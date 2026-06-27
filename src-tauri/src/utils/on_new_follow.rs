use entity::{
    followers::Follow,
    goals::GoalType,
    messages::{ClientMessage, MessageType},
};
use tauri::{AppHandle, Manager};

use crate::{
    enums::AppEvent,
    repositories::FollowsRepository,
    services::{DatabaseService, EventMessage, WebSocketBroadcaster},
    utils::goal_handler,
};

pub async fn on_new_follow(
    follow: Follow,
    goal_type: GoalType,
    app: &AppHandle,
) -> Result<(), String> {
    let websocket_broadcaster = app.state::<WebSocketBroadcaster>();
    let database_service = app.state::<DatabaseService>();
    let client_message = ClientMessage {
        id: follow.message_id.clone(),
        r#type: MessageType::Follow,
        created_at: follow.followed_at.clone(),
        donation: None,
        subscription: None,
        raid: None,
        redemption: None,
        follow: Some(follow),
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
    let _ = database_service.save_follow_message(client_message).await;
    let _ = goal_handler(&database_service, &websocket_broadcaster, 1, goal_type).await;
    Ok(())
}
