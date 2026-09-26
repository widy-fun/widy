use entity::services::{ApiKeyAuth, ServiceAuth, ServiceType};
use tauri::{AppHandle, Manager};

use crate::{
    error::AppError,
    repositories::ServicesRepository,
    services::{
        DatabaseService,
        fish_audio::{models::FishAudioListModelsFilter, traits::FishAudioApi},
    },
};

pub struct FishAudioService {
    reqwest_client: reqwest::Client,
    base_url: String,
}

impl FishAudioService {
    pub fn new(reqwest_client: reqwest::Client) -> Self {
        Self {
            reqwest_client,
            base_url: "https://api.fish.audio".to_string(),
        }
    }

    pub async fn connect(&self, app: &AppHandle) -> Result<(), AppError> {
        let auth = self.get_auth(app).await?;
        let database_service = app.state::<DatabaseService>();
        match self
            .get_models(
                app,
                1,
                1,
                FishAudioListModelsFilter {
                    language: Some("en".to_string()),
                    ..Default::default()
                },
            )
            .await
        {
            Err(e) => {
                database_service
                    .update_service_auth(
                        ServiceType::FishAudio,
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
                ServiceType::FishAudio,
                Some(ServiceAuth::ApiKey(ApiKeyAuth {
                    api_key: auth.api_key.clone(),
                })),
                true,
            )
            .await?;
        Ok(())
    }

    pub async fn sign_out(&self, app: &AppHandle) -> Result<(), AppError> {
        let database_service = app.state::<DatabaseService>();
        database_service
            .update_service(entity::services::Model {
                id: ServiceType::FishAudio,
                extra: None,
                auth: None,
                authorized: false,
            })
            .await?;
        Ok(())
    }
}

impl FishAudioApi for FishAudioService {
    fn reqwest_client(&self) -> reqwest::Client {
        self.reqwest_client.clone()
    }

    fn base_url(&self) -> String {
        self.base_url.clone()
    }
}
