use std::sync::{Arc, Mutex};

use entity::services::{ApiKeyAuth, ServiceAuth, ServiceType};
use tauri::{AppHandle, Manager};

use crate::{
    error::AppError,
    repositories::ServicesRepository,
    services::{DatabaseService, gemini::traits::GeminiApi},
};

#[derive(Clone, Debug)]
pub struct GeminiService {
    base_api: String,
    pub models: Arc<Mutex<Vec<String>>>,
}

impl GeminiService {
    pub fn new() -> Self {
        Self {
            base_api: "https://generativelanguage.googleapis.com/v1beta".to_string(),
            models: Arc::new(Mutex::new(vec!["gemini-3.6-flash".to_string()])),
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
                Ok(_) => {
                    // if let Some(response) = response {
                    //     *self.models.lock().unwrap() =
                    //         response.models.iter().map(|m| m.name.clone()).collect();
                    // }
                }
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
