use async_trait::async_trait;
use entity::{
    assistant_actions,
    messages::{self, ClientMessage},
};

use crate::{error::AppError, services::DatabaseService, utils::log_and_wrap_error};

#[async_trait]
pub trait AssistantActionsRepository: Send + Sync {
    async fn save_assistant_action_message(
        &self,
        client_message: ClientMessage,
    ) -> Result<(), AppError>;
}

#[async_trait]
impl AssistantActionsRepository for DatabaseService {
    async fn save_assistant_action_message(
        &self,
        client_message: ClientMessage,
    ) -> Result<(), AppError> {
        if let Some(assistant_action) = client_message.assistant_action {
            assistant_actions::ActiveModel::builder()
                .set_id(assistant_action.id)
                .set_type(assistant_action.r#type)
                .set_data(assistant_action.data)
                .set_message(
                    messages::ActiveModel::builder()
                        .set_id(client_message.id)
                        .set_type(client_message.r#type)
                        .set_created_at(client_message.created_at),
                )
                .insert(&self.connection)
                .await
                .map_err(|e| log_and_wrap_error("Save assistant action error", e))?;
        }

        Ok(())
    }
}
