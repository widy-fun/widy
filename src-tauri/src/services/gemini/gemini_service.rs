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
        gemini::{
            models::{GeminiTool, InteractionsBody},
            traits::GeminiApi,
        },
    },
};

#[derive(Clone, Debug)]
pub struct GeminiService {
    base_api: String,
    pub tool_calling_models: Vec<ToolCallingModel>,
}

impl GeminiService {
    pub fn new() -> Self {
        Self {
            base_api: "https://generativelanguage.googleapis.com/v1beta".to_string(),
            tool_calling_models: vec![
                // Gemini 2.5 family
                ToolCallingModel {
                    id: "gemini-2.5-flash".into(),
                    display_name: "Gemini 2.5 Flash".into(),
                },
                ToolCallingModel {
                    id: "gemini-2.5-pro".into(),
                    display_name: "Gemini 2.5 Pro".into(),
                },
                ToolCallingModel {
                    id: "gemini-2.5-flash-lite".into(),
                    display_name: "Gemini 2.5 Flash-Lite".into(),
                },
                // Gemini "latest" aliases
                ToolCallingModel {
                    id: "gemini-flash-latest".into(),
                    display_name: "Gemini Flash Latest".into(),
                },
                ToolCallingModel {
                    id: "gemini-flash-lite-latest".into(),
                    display_name: "Gemini Flash-Lite Latest".into(),
                },
                ToolCallingModel {
                    id: "gemini-pro-latest".into(),
                    display_name: "Gemini Pro Latest".into(),
                },
                // Gemini 3.x family
                ToolCallingModel {
                    id: "gemini-3-flash-preview".into(),
                    display_name: "Gemini 3 Flash Preview".into(),
                },
                ToolCallingModel {
                    id: "gemini-3.1-pro-preview".into(),
                    display_name: "Gemini 3.1 Pro Preview".into(),
                },
                ToolCallingModel {
                    id: "gemini-3.1-pro-preview-customtools".into(),
                    display_name: "Gemini 3.1 Pro Preview Custom Tools".into(),
                },
                ToolCallingModel {
                    id: "gemini-3.1-flash-lite-preview".into(),
                    display_name: "Gemini 3.1 Flash Lite Preview".into(),
                },
                ToolCallingModel {
                    id: "gemini-3.1-flash-lite".into(),
                    display_name: "Gemini 3.1 Flash Lite".into(),
                },
                ToolCallingModel {
                    id: "gemini-3.5-flash".into(),
                    display_name: "Gemini 3.5 Flash".into(),
                },
                ToolCallingModel {
                    id: "gemini-3.5-flash-lite".into(),
                    display_name: "Gemini 3.5 Flash Lite".into(),
                },
                ToolCallingModel {
                    id: "gemini-3.6-flash".into(),
                    display_name: "Gemini 3.6 Flash".into(),
                },
                ToolCallingModel {
                    id: "gemini-3.7-flash".into(),
                    display_name: "Gemini 3.7 Flash".into(),
                },
                ToolCallingModel {
                    id: "gemini-3.8-flash".into(),
                    display_name: "Gemini 3.8 Flash".into(),
                },
                // Gemini Omni
                ToolCallingModel {
                    id: "gemini-omni-flash-preview".into(),
                    display_name: "Gemini Omni Flash Preview".into(),
                },
                ToolCallingModel {
                    id: "gemini-omni-1.1-flash".into(),
                    display_name: "Gemini Omni 1.1 Flash".into(),
                },
                // Gemma 4 instruct
                ToolCallingModel {
                    id: "gemma-4-26b-a4b-it".into(),
                    display_name: "Gemma 4 26B A4B IT".into(),
                },
                ToolCallingModel {
                    id: "gemma-4-31b-it".into(),
                    display_name: "Gemma 4 31B IT".into(),
                },
                // Agentic / action-taking models
                ToolCallingModel {
                    id: "gemini-robotics-er-2-preview".into(),
                    display_name: "Gemini Robotics-ER 2 Preview".into(),
                },
                ToolCallingModel {
                    id: "gemini-2.5-computer-use-preview-10-2025".into(),
                    display_name: "Gemini 2.5 Computer Use Preview 10-2025".into(),
                },
                ToolCallingModel {
                    id: "antigravity-preview-05-2026".into(),
                    display_name: "Antigravity Agent Preview".into(),
                },
                ToolCallingModel {
                    id: "deep-research-max-preview-04-2026".into(),
                    display_name: "Deep Research Max Preview (Apr-21-2026)".into(),
                },
                ToolCallingModel {
                    id: "deep-research-preview-04-2026".into(),
                    display_name: "Deep Research Preview (Apr-21-2026)".into(),
                },
                ToolCallingModel {
                    id: "deep-research-pro-preview-12-2025".into(),
                    display_name: "Deep Research Pro Preview (Dec-12-2025)".into(),
                },
            ],
        }
    }

    pub async fn connect(&self, app: &AppHandle) -> Result<(), AppError> {
        let database_service = app.state::<DatabaseService>();
        let reqwest_client = app.state::<reqwest::Client>();
        let service = database_service
            .get_service_with_auth_by_id(ServiceType::Gemini)
            .await?;
        if let Some(entity::services::Model {
            id: ServiceType::Gemini,
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
                            ServiceType::Gemini,
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
                    ServiceType::Gemini,
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
            .get_service_with_auth_by_id(ServiceType::Gemini)
            .await?
            .ok_or(AppError::DbError("Not found gemini service".to_string()))?;
        let mut tool_calls: Vec<ToolCall> = vec![];
        if let Some(ServiceAuth::ApiKey(auth)) = service.auth {
            let gemini_tools = assistant_settings
                .tools
                .0
                .into_iter()
                .map(GeminiTool::from)
                .collect();
            let interaction_response = self
                .interactions(
                    &reqwest_client,
                    auth.api_key,
                    InteractionsBody {
                        model: Some(assistant_settings.tool_calling_model.id),
                        input: text.to_string(),
                        generation_config: None,
                        tools: Some(gemini_tools),
                    },
                )
                .await?
                .ok_or(AppError::Custom("Not found tools".to_string()))?;
            if let Some(steps) = interaction_response.steps {
                for step in steps {
                    tool_calls.push(ToolCall {
                        name: step.name.unwrap_or_default(),
                        arguments: step.arguments.unwrap_or_default(),
                    });
                }
            }
        }
        Ok(tool_calls)
    }
    pub async fn sign_out(&self, app: &AppHandle) -> Result<(), AppError> {
        let database_service = app.state::<DatabaseService>();
        database_service
            .update_service(entity::services::Model {
                id: ServiceType::Gemini,
                settings: None,
                auth: None,
                authorized: false,
            })
            .await?;
        Ok(())
    }
}

impl GeminiApi for GeminiService {
    fn base_api(&self) -> String {
        self.base_api.clone()
    }
}
