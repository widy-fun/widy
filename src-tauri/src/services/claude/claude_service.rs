use std::collections::HashMap;

use entity::{
    assistant_settings::ToolCallingModel,
    services::{ApiKeyAuth, ServiceAuth, ServiceType},
};
use tauri::{AppHandle, Manager};

use crate::{
    error::AppError,
    repositories::ServicesRepository,
    services::{
        DatabaseService,
        assistant::tool_calling_service::ToolCall,
        claude::{
            models::{ClaudeMessage, ClaudeTool, ContentBlock, MessagesBody},
            traits::ClaudeApi,
        },
    },
};

#[derive(Clone)]
pub struct ClaudeService {
    base_api: String,
    pub tool_calling_models: Vec<ToolCallingModel>,
}

impl ClaudeService {
    pub fn new() -> Self {
        Self {
            base_api: "https://api.anthropic.com/v1".to_string(),
            tool_calling_models: vec![
                ToolCallingModel {
                    id: "claude-fable-5-1".into(),
                    display_name: "Claude Fable 5.1".into(),
                },
                ToolCallingModel {
                    id: "claude-opus-5".into(),
                    display_name: "Claude Opus 5".into(),
                },
                ToolCallingModel {
                    id: "claude-sonnet-5".into(),
                    display_name: "Claude Sonnet 5".into(),
                },
                ToolCallingModel {
                    id: "claude-fable-5".into(),
                    display_name: "Claude Fable 5".into(),
                },
                ToolCallingModel {
                    id: "claude-opus-4-8".into(),
                    display_name: "Claude Opus 4.8".into(),
                },
                ToolCallingModel {
                    id: "claude-opus-4-7".into(),
                    display_name: "Claude Opus 4.7".into(),
                },
                ToolCallingModel {
                    id: "claude-sonnet-4-6".into(),
                    display_name: "Claude Sonnet 4.6".into(),
                },
                ToolCallingModel {
                    id: "claude-opus-4-6".into(),
                    display_name: "Claude Opus 4.6".into(),
                },
                ToolCallingModel {
                    id: "claude-opus-4-5-20251101".into(),
                    display_name: "Claude Opus 4.5".into(),
                },
                ToolCallingModel {
                    id: "claude-haiku-4-5-20251001".into(),
                    display_name: "Claude Haiku 4.5".into(),
                },
                ToolCallingModel {
                    id: "claude-sonnet-4-5-20250929".into(),
                    display_name: "Claude Sonnet 4.5".into(),
                },
            ],
        }
    }

    pub async fn connect(&self, app: &AppHandle) -> Result<(), AppError> {
        let database_service = app.state::<DatabaseService>();
        let reqwest_client = app.state::<reqwest::Client>();
        let service = database_service
            .get_service_with_auth_by_id(ServiceType::Claude)
            .await?;
        if let Some(entity::services::Model {
            id: ServiceType::Claude,
            auth: Some(ServiceAuth::ApiKey(auth)),
            ..
        }) = service
        {
            match self
                .get_models_list(&reqwest_client, auth.api_key.clone())
                .await
            {
                Err(e) => {
                    database_service
                        .update_service_auth(
                            ServiceType::Claude,
                            Some(ServiceAuth::ApiKey(ApiKeyAuth {
                                api_key: auth.api_key.clone(),
                            })),
                            false,
                        )
                        .await?;
                    return Err(e);
                }
                Ok(_) => {}
            };

            database_service
                .update_service_auth(
                    ServiceType::Claude,
                    Some(ServiceAuth::ApiKey(ApiKeyAuth {
                        api_key: auth.api_key.clone(),
                    })),
                    true,
                )
                .await?;
        }
        Ok(())
    }

    pub async fn handle_tool_calling(
        &self,
        app: &AppHandle,
        assistant_settings: entity::assistant_settings::Model,
        text: &str,
    ) -> Result<Vec<ToolCall>, AppError> {
        let database_service = app.state::<DatabaseService>();
        let reqwest_client = app.state::<reqwest::Client>();
        let service = database_service
            .get_service_with_auth_by_id(ServiceType::Claude)
            .await?
            .ok_or(AppError::DbError("Not found claude service".to_string()))?;

        let mut tool_calls: Vec<ToolCall> = vec![];
        if let Some(ServiceAuth::ApiKey(auth)) = service.auth {
            let claude_tools = assistant_settings
                .tools
                .0
                .into_iter()
                .map(ClaudeTool::from)
                .collect();

            let messages_response: crate::services::claude::models::MessagesResponse = self
                .messages(
                    &reqwest_client,
                    auth.api_key,
                    MessagesBody {
                        model: assistant_settings.tool_calling_model.id,
                        max_tokens: assistant_settings.max_tokens,
                        messages: vec![ClaudeMessage {
                            role: "user".to_string(),
                            content: serde_json::Value::String(text.to_string()),
                        }],
                        tools: Some(claude_tools),
                    },
                )
                .await?
                .ok_or(AppError::Custom("Not found tools".to_string()))?;
            for block in messages_response.content {
                if let ContentBlock::ToolUse { name, input, .. } = block {
                    let arguments: HashMap<String, String> = input
                        .as_object()
                        .map(|map| {
                            map.iter()
                                .map(|(k, v)| {
                                    let value = match v {
                                        serde_json::Value::String(s) => s.clone(),
                                        other => other.to_string(),
                                    };
                                    (k.clone(), value)
                                })
                                .collect()
                        })
                        .unwrap_or_default();

                    tool_calls.push(ToolCall { name, arguments });
                }
            }
        }
        Ok(tool_calls)
    }

    pub async fn sign_out(&self, app: &AppHandle) -> Result<(), AppError> {
        let database_service = app.state::<DatabaseService>();
        database_service
            .update_service(entity::services::Model {
                id: ServiceType::Claude,
                settings: None,
                auth: None,
                authorized: false,
            })
            .await?;
        Ok(())
    }
}

impl ClaudeApi for ClaudeService {
    fn base_api(&self) -> String {
        self.base_api.clone()
    }
}
