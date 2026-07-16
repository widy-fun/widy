use async_trait::async_trait;
use entity::{
    commands_actions,
    messages::{self, ClientMessage},
};

use crate::services::DatabaseService;

#[async_trait]
pub trait CommandsActionsRepository: Send + Sync {
    async fn save_command_action_message(
        &self,
        client_message: ClientMessage,
    ) -> Result<(), String>;
}

#[async_trait]
impl CommandsActionsRepository for DatabaseService {
    async fn save_command_action_message(
        &self,
        client_message: ClientMessage,
    ) -> Result<(), String> {
        if let Some(command_action) = client_message.command_action {
            commands_actions::ActiveModel::builder()
                .set_id(command_action.id)
                .set_command_id(command_action.command_id)
                .set_command_name(command_action.command_name)
                .set_media(command_action.media)
                .set_platform(command_action.platform)
                .set_user_input(command_action.user_input)
                .set_user_name(command_action.user_name)
                .set_alert(command_action.alert)
                .set_message(
                    messages::ActiveModel::builder()
                        .set_id(client_message.id)
                        .set_type(client_message.r#type)
                        .set_created_at(client_message.created_at),
                )
                .insert(&self.connection)
                .await
                .map_err(|e| {
                    log::error!("Save command action error: {}", e.to_string());
                    e.to_string()
                })?;
        }

        Ok(())
    }
}
