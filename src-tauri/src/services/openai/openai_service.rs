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
        openai::{
            models::{OpenAIOutput, OpenAIResponsesBody, OpenAITool},
            traits::OpenAiApi,
        },
    },
};

#[derive(Clone)]
pub struct OpenAIService {
    base_api: String,
    pub tool_calling_models: Vec<ToolCallingModel>,
}

impl OpenAIService {
    pub fn new() -> Self {
        Self {
            base_api: "https://api.openai.com/v1".to_string(),
            tool_calling_models: vec![
                // GPT-3.5 chat models (chat endpoint, exclude *-instruct which is completions-only)
                ToolCallingModel {
                    id: "gpt-3.5-turbo".into(),
                    display_name: "gpt-3.5-turbo".into(),
                },
                ToolCallingModel {
                    id: "gpt-3.5-turbo-16k".into(),
                    display_name: "gpt-3.5-turbo-16k".into(),
                },
                ToolCallingModel {
                    id: "gpt-3.5-turbo-1106".into(),
                    display_name: "gpt-3.5-turbo-1106".into(),
                },
                ToolCallingModel {
                    id: "gpt-3.5-turbo-0125".into(),
                    display_name: "gpt-3.5-turbo-0125".into(),
                },
                // GPT-4o
                ToolCallingModel {
                    id: "gpt-4o".into(),
                    display_name: "gpt-4o".into(),
                },
                ToolCallingModel {
                    id: "gpt-4o-2024-05-13".into(),
                    display_name: "gpt-4o-2024-05-13".into(),
                },
                ToolCallingModel {
                    id: "gpt-4o-2024-08-06".into(),
                    display_name: "gpt-4o-2024-08-06".into(),
                },
                ToolCallingModel {
                    id: "gpt-4o-2024-11-20".into(),
                    display_name: "gpt-4o-2024-11-20".into(),
                },
                ToolCallingModel {
                    id: "gpt-4o-mini".into(),
                    display_name: "gpt-4o-mini".into(),
                },
                ToolCallingModel {
                    id: "gpt-4o-mini-2024-07-18".into(),
                    display_name: "gpt-4o-mini-2024-07-18".into(),
                },
                // o-series reasoning models
                ToolCallingModel {
                    id: "o1".into(),
                    display_name: "o1".into(),
                },
                ToolCallingModel {
                    id: "o1-2024-12-17".into(),
                    display_name: "o1-2024-12-17".into(),
                },
                ToolCallingModel {
                    id: "o3".into(),
                    display_name: "o3".into(),
                },
                ToolCallingModel {
                    id: "o3-2025-04-16".into(),
                    display_name: "o3-2025-04-16".into(),
                },
                ToolCallingModel {
                    id: "o3-mini".into(),
                    display_name: "o3-mini".into(),
                },
                ToolCallingModel {
                    id: "o3-mini-2025-01-31".into(),
                    display_name: "o3-mini-2025-01-31".into(),
                },
                ToolCallingModel {
                    id: "o4-mini".into(),
                    display_name: "o4-mini".into(),
                },
                ToolCallingModel {
                    id: "o4-mini-2025-04-16".into(),
                    display_name: "o4-mini-2025-04-16".into(),
                },
                // GPT-4.1
                ToolCallingModel {
                    id: "gpt-4.1".into(),
                    display_name: "gpt-4.1".into(),
                },
                ToolCallingModel {
                    id: "gpt-4.1-2025-04-14".into(),
                    display_name: "gpt-4.1-2025-04-14".into(),
                },
                ToolCallingModel {
                    id: "gpt-4.1-mini".into(),
                    display_name: "gpt-4.1-mini".into(),
                },
                ToolCallingModel {
                    id: "gpt-4.1-mini-2025-04-14".into(),
                    display_name: "gpt-4.1-mini-2025-04-14".into(),
                },
                ToolCallingModel {
                    id: "gpt-4.1-nano".into(),
                    display_name: "gpt-4.1-nano".into(),
                },
                ToolCallingModel {
                    id: "gpt-4.1-nano-2025-04-14".into(),
                    display_name: "gpt-4.1-nano-2025-04-14".into(),
                },
                // GPT-5
                ToolCallingModel {
                    id: "gpt-5".into(),
                    display_name: "gpt-5".into(),
                },
                ToolCallingModel {
                    id: "gpt-5-2025-08-07".into(),
                    display_name: "gpt-5-2025-08-07".into(),
                },
                ToolCallingModel {
                    id: "gpt-5-chat-latest".into(),
                    display_name: "gpt-5-chat-latest".into(),
                },
                ToolCallingModel {
                    id: "gpt-5-mini".into(),
                    display_name: "gpt-5-mini".into(),
                },
                ToolCallingModel {
                    id: "gpt-5-mini-2025-08-07".into(),
                    display_name: "gpt-5-mini-2025-08-07".into(),
                },
                ToolCallingModel {
                    id: "gpt-5-nano".into(),
                    display_name: "gpt-5-nano".into(),
                },
                ToolCallingModel {
                    id: "gpt-5-nano-2025-08-07".into(),
                    display_name: "gpt-5-nano-2025-08-07".into(),
                },
                ToolCallingModel {
                    id: "gpt-5-codex".into(),
                    display_name: "gpt-5-codex".into(),
                },
                ToolCallingModel {
                    id: "gpt-5-pro".into(),
                    display_name: "gpt-5-pro".into(),
                },
                ToolCallingModel {
                    id: "gpt-5-pro-2025-10-06".into(),
                    display_name: "gpt-5-pro-2025-10-06".into(),
                },
                // GPT-5.1
                ToolCallingModel {
                    id: "gpt-5.1".into(),
                    display_name: "gpt-5.1".into(),
                },
                ToolCallingModel {
                    id: "gpt-5.1-2025-11-13".into(),
                    display_name: "gpt-5.1-2025-11-13".into(),
                },
                ToolCallingModel {
                    id: "gpt-5.1-chat-latest".into(),
                    display_name: "gpt-5.1-chat-latest".into(),
                },
                ToolCallingModel {
                    id: "gpt-5.1-codex".into(),
                    display_name: "gpt-5.1-codex".into(),
                },
                ToolCallingModel {
                    id: "gpt-5.1-codex-mini".into(),
                    display_name: "gpt-5.1-codex-mini".into(),
                },
                ToolCallingModel {
                    id: "gpt-5.1-codex-max".into(),
                    display_name: "gpt-5.1-codex-max".into(),
                },
                // GPT-5.2
                ToolCallingModel {
                    id: "gpt-5.2".into(),
                    display_name: "gpt-5.2".into(),
                },
                ToolCallingModel {
                    id: "gpt-5.2-2025-12-11".into(),
                    display_name: "gpt-5.2-2025-12-11".into(),
                },
                ToolCallingModel {
                    id: "gpt-5.2-chat-latest".into(),
                    display_name: "gpt-5.2-chat-latest".into(),
                },
                ToolCallingModel {
                    id: "gpt-5.2-pro".into(),
                    display_name: "gpt-5.2-pro".into(),
                },
                ToolCallingModel {
                    id: "gpt-5.2-pro-2025-12-11".into(),
                    display_name: "gpt-5.2-pro-2025-12-11".into(),
                },
                ToolCallingModel {
                    id: "gpt-5.2-codex".into(),
                    display_name: "gpt-5.2-codex".into(),
                },
                // GPT-5.3
                ToolCallingModel {
                    id: "gpt-5.3-chat-latest".into(),
                    display_name: "gpt-5.3-chat-latest".into(),
                },
                ToolCallingModel {
                    id: "gpt-5.3-codex".into(),
                    display_name: "gpt-5.3-codex".into(),
                },
                // GPT-5.4
                ToolCallingModel {
                    id: "gpt-5.4".into(),
                    display_name: "gpt-5.4".into(),
                },
                ToolCallingModel {
                    id: "gpt-5.4-2026-03-05".into(),
                    display_name: "gpt-5.4-2026-03-05".into(),
                },
                ToolCallingModel {
                    id: "gpt-5.4-pro".into(),
                    display_name: "gpt-5.4-pro".into(),
                },
                ToolCallingModel {
                    id: "gpt-5.4-pro-2026-03-05".into(),
                    display_name: "gpt-5.4-pro-2026-03-05".into(),
                },
                ToolCallingModel {
                    id: "gpt-5.4-mini".into(),
                    display_name: "gpt-5.4-mini".into(),
                },
                ToolCallingModel {
                    id: "gpt-5.4-mini-2026-03-17".into(),
                    display_name: "gpt-5.4-mini-2026-03-17".into(),
                },
                ToolCallingModel {
                    id: "gpt-5.4-nano".into(),
                    display_name: "gpt-5.4-nano".into(),
                },
                ToolCallingModel {
                    id: "gpt-5.4-nano-2026-03-17".into(),
                    display_name: "gpt-5.4-nano-2026-03-17".into(),
                },
                // GPT-5.5
                ToolCallingModel {
                    id: "gpt-5.5".into(),
                    display_name: "gpt-5.5".into(),
                },
                ToolCallingModel {
                    id: "gpt-5.5-2026-04-23".into(),
                    display_name: "gpt-5.5-2026-04-23".into(),
                },
                ToolCallingModel {
                    id: "gpt-5.5-pro".into(),
                    display_name: "gpt-5.5-pro".into(),
                },
                ToolCallingModel {
                    id: "gpt-5.5-pro-2026-04-23".into(),
                    display_name: "gpt-5.5-pro-2026-04-23".into(),
                },
                // GPT-5.6
                ToolCallingModel {
                    id: "gpt-5.6-sol".into(),
                    display_name: "gpt-5.6-sol".into(),
                },
                ToolCallingModel {
                    id: "gpt-5.6-terra".into(),
                    display_name: "gpt-5.6-terra".into(),
                },
                ToolCallingModel {
                    id: "gpt-5.6-luna".into(),
                    display_name: "gpt-5.6-luna".into(),
                },
                // Latest aliases / newest generation
                ToolCallingModel {
                    id: "chat-latest".into(),
                    display_name: "chat-latest".into(),
                },
                ToolCallingModel {
                    id: "gpt-6-astra".into(),
                    display_name: "gpt-6-astra".into(),
                },
            ],
        }
    }

    pub async fn connect(&self, app: &AppHandle) -> Result<(), AppError> {
        let database_service = app.state::<DatabaseService>();
        let reqwest_client = app.state::<reqwest::Client>();
        let service = database_service
            .get_service_with_auth_by_id(ServiceType::OpenAI)
            .await?;
        if let Some(entity::services::Model {
            id: ServiceType::OpenAI,
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
                            ServiceType::OpenAI,
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
                    ServiceType::OpenAI,
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
            .get_service_with_auth_by_id(ServiceType::OpenAI)
            .await?
            .ok_or(AppError::DbError("Not found OpenAI service".to_string()))?;

        let mut tool_calls = Vec::new();

        if let Some(ServiceAuth::ApiKey(auth)) = service.auth {
            let tools = assistant_settings
                .tools
                .0
                .into_iter()
                .map(OpenAITool::from)
                .collect::<Vec<_>>();

            let response = self
                .responses(
                    &reqwest_client,
                    auth.api_key,
                    OpenAIResponsesBody {
                        model: assistant_settings.tool_calling_model.id,
                        input: text.to_string(),
                        tools,
                    },
                )
                .await?
                .ok_or(AppError::Custom("OpenAI response was empty".to_string()))?;

            for output in response.output {
                if let OpenAIOutput::FunctionCall {
                    name, arguments, ..
                } = output
                {
                    let arguments: HashMap<String, String> = serde_json::from_str(&arguments)
                        .map_err(|e| AppError::Custom(format!("Invalid tool arguments: {e}")))?;

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
                id: ServiceType::OpenAI,
                settings: None,
                auth: None,
                authorized: false,
            })
            .await?;
        Ok(())
    }
}

impl OpenAiApi for OpenAIService {
    fn base_api(&self) -> String {
        self.base_api.clone()
    }
}
