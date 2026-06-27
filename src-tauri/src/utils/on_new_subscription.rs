use entity::{
    goals::GoalType,
    messages::{ClientMessage, MessageType},
    subscriptions::Subscription,
};
use tauri::{AppHandle, Manager};

use crate::{
    enums::AppEvent,
    repositories::SubscriptionsRepository,
    services::{DatabaseService, EventMessage, WebSocketBroadcaster},
    utils::goal_handler,
};

pub async fn on_new_subscription(
    subscription: Subscription,
    goal_type: GoalType,
    app: &AppHandle,
) -> Result<(), String> {
    let websocket_broadcaster = app.state::<WebSocketBroadcaster>();
    let database_service = app.state::<DatabaseService>();
    let client_message = ClientMessage {
        id: subscription.message_id.clone(),
        r#type: MessageType::Subscription,
        created_at: subscription.subscribed_at.clone(),
        donation: None,
        follow: None,
        raid: None,
        redemption: None,
        subscription: Some(subscription.clone()),
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
    let _ = database_service
        .save_subscribe_message(client_message)
        .await;
    let _ = goal_handler(
        &database_service,
        &websocket_broadcaster,
        subscription.total,
        goal_type,
    )
    .await;

    Ok(())
}
