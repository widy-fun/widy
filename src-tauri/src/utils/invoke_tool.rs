use entity::{
    assistant_actions::{
        AssistantAction,
        AssistantActionData::{BanUser, PlayAlert},
        AssistantActionType, BanUserData,
    },
    messages::MessageType,
};
use tauri::{AppHandle, Manager};

use crate::{
    error::AppError,
    repositories::AlertsRepository,
    services::{
        DatabaseService, EventsService,
        assistant::tool_calling_service::ToolCall,
        kick::{KickService, traits::KickApi},
        twitch::{TwitchService, traits::TwitchApi},
    },
};

pub async fn invoke_tool(app: &AppHandle, tool_call: ToolCall) -> Result<(), AppError> {
    match tool_call.name.as_str() {
        "ban_user" => {
            let platform = tool_call
                .arguments
                .get("platform")
                .cloned()
                .unwrap_or_default();
            let username = tool_call
                .arguments
                .get("username")
                .cloned()
                .unwrap_or_default();
            match platform.as_str().to_lowercase().as_str() {
                "twitch" => {
                    let twitch_service = app.state::<TwitchService>();
                    let auth = twitch_service.get_auth(app).await?;
                    let chat_messages_buffer =
                        twitch_service.chat_messages_buffer.lock().unwrap().clone();
                    let message = chat_messages_buffer
                        .iter()
                        .find(|m| m.sender.username == username)
                        .cloned()
                        .ok_or(AppError::Custom("User not found".to_string()))?;
                    twitch_service
                        .ban_user(
                            twitch_service.client_id(),
                            auth.user_id,
                            message.sender.id,
                            app,
                        )
                        .await?;
                }
                "kick" => {
                    let kick_service = app.state::<KickService>();
                    let user_info = kick_service.get_user_info(app).await?;
                    let chat_messages_buffer =
                        kick_service.chat_messages_buffer.lock().unwrap().clone();
                    let message = chat_messages_buffer
                        .iter()
                        .find(|m| m.sender.username == username)
                        .cloned()
                        .ok_or(AppError::Custom("User not found".to_string()))?;
                    kick_service
                        .ban_user(message.sender.id.parse::<u64>()?, user_info.user_id, app)
                        .await?;
                    let message_id = uuid::Uuid::new_v4();
                    EventsService::assistant_action(
                        AssistantAction {
                            id: uuid::Uuid::new_v4(),
                            message_id,
                            r#type: AssistantActionType::BanUser,
                            data: BanUser(BanUserData {
                                name: message.sender.username,
                                platform: platform.try_into().map_err(|e| AppError::Custom(e))?,
                                id: message.sender.id,
                            }),
                        },
                        app,
                    )
                    .await?;
                }
                _ => {}
            };
        }
        "play_alert" => {
            let database_service = app.state::<DatabaseService>();
            let alert = database_service
                .get_alert_by_name(
                    tool_call
                        .arguments
                        .get("name")
                        .ok_or(AppError::Custom("Not found alert name".to_string()))?
                        .clone(),
                    MessageType::AssistantAction,
                )
                .await?
                .ok_or(AppError::Custom("Not found alert by name".to_string()))?;
            let message_id = uuid::Uuid::new_v4();
            EventsService::assistant_action(
                AssistantAction {
                    id: uuid::Uuid::new_v4(),
                    message_id,
                    r#type: AssistantActionType::PlayAlert,
                    data: PlayAlert(alert),
                },
                app,
            )
            .await?;
        }
        _ => {}
    }
    Ok(())
}
