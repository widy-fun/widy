use std::sync::{Arc, Mutex};

use entity::services::{ServiceAuth, ServiceType};
use tauri::{AppHandle, Manager};
use teloxide::{
    Bot,
    requests::Requester,
    types::{Message, MessageId},
};

use crate::{error::AppError, repositories::ServicesRepository, services::DatabaseService};

pub struct TelegramBotService {
    bot: Arc<Mutex<Option<Bot>>>,
}
impl TelegramBotService {
    pub fn new() -> Self {
        Self {
            bot: Arc::new(Mutex::new(None)),
        }
    }

    pub async fn connect(&self, app: &AppHandle) -> Result<(), AppError> {
        let database_service = app.state::<DatabaseService>();
        let service = database_service
            .get_service_with_auth_by_id(ServiceType::TelegramBot)
            .await?;
        if let Some(entity::services::Model {
            id: ServiceType::TelegramBot,
            auth: Some(ServiceAuth::Token(auth)),
            ..
        }) = service
        {
            let bot = Bot::new(auth.token.clone());
            match bot.get_me().await {
                Ok(_) => {
                    database_service
                        .update_service_auth(
                            ServiceType::TelegramBot,
                            Some(ServiceAuth::Token(auth)),
                            true,
                        )
                        .await?;
                    *self.bot.lock().unwrap() = Some(bot);
                }
                Err(e) => {
                    database_service
                        .update_service_auth(
                            ServiceType::TelegramBot,
                            Some(ServiceAuth::Token(auth)),
                            false,
                        )
                        .await?;
                    return Err(e.into());
                }
            }
        }

        Ok(())
    }

    pub async fn send_message(
        &self,
        channel: String,
        message: String,
    ) -> Result<Message, AppError> {
        let bot = self
            .bot
            .lock()
            .unwrap()
            .clone()
            .ok_or(AppError::TelegramBot("Bot empty".to_string()))?;
        let message = bot.send_message(format!("@{}", channel), message).await?;
        Ok(message)
    }

    pub async fn delete_message(
        &self,
        channel: String,
        message_id: MessageId,
    ) -> Result<(), AppError> {
        let bot = self.bot.lock().unwrap().clone();
        if let Some(bot) = bot {
            bot.delete_message(format!("@{}", channel), message_id)
                .await?;
        }
        Ok(())
    }

    pub async fn sign_out(&self, app: &AppHandle) -> Result<(), AppError> {
        let database_service = app.state::<DatabaseService>();
        database_service
            .update_service(entity::services::Model {
                id: ServiceType::TelegramBot,
                extra: None,
                auth: None,
                authorized: false,
            })
            .await?;
        *self.bot.lock().unwrap() = None;
        Ok(())
    }
}
