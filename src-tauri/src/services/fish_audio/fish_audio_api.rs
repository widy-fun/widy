use crate::services::fish_audio::FishAudioService;
use crate::utils::send_request;
use database::{DatabaseService, ServicesRepository};
use entity::services::{ApiKeyAuth, ServiceAuth, ServiceType};
use model::error::AppError;
use model::fish_audio::{FishAudioListModelsFilter, FishAudioListModelsResponse, TtsRequestBody};
use tauri::{AppHandle, Manager};

#[async_trait::async_trait]
pub trait FishAudioApi {
    fn reqwest_client(&self) -> reqwest::Client;

    fn base_url(&self) -> String;

    async fn get_auth(&self, app: &AppHandle) -> Result<ApiKeyAuth, AppError> {
        let database_service = app.state::<DatabaseService>();

        let service = database_service
            .get_service_with_auth_by_id(ServiceType::FishAudio)
            .await?;

        let service = service.ok_or(AppError::DbError("Service not found".to_string()))?;

        let auth = match service.auth {
            Some(ServiceAuth::ApiKey(auth)) => auth,
            _ => {
                return Err(AppError::DbError(
                    "No FishAudio authentication found".to_string(),
                ));
            }
        };
        Ok(auth)
    }

    async fn get_api_credits(&self, app: &AppHandle) -> Result<(), AppError> {
        let auth = self.get_auth(app).await?;
        let request = self
            .reqwest_client()
            .get(format!("{}/wallet/self/api-credit", self.base_url()))
            .bearer_auth(auth.api_key);
        let _ = send_request::<serde_json::Value>(
            request,
            "get api credits",
            ServiceType::FishAudio.as_str(),
        )
        .await?;
        Ok(())
    }

    async fn get_models(
        &self,
        app: &AppHandle,
        page_size: u64,
        page_number: u64,
        filter: FishAudioListModelsFilter,
    ) -> Result<Option<FishAudioListModelsResponse>, AppError> {
        let auth = self.get_auth(app).await?;
        let mut query: Vec<(&str, String)> = vec![
            ("page_size", page_size.to_string()),
            ("page_number", page_number.to_string()),
        ];

        if let Some(title) = filter.title {
            query.push(("title", title));
        }
        if let Some(language) = filter.language {
            query.push(("language", language));
        }

        let request = self
            .reqwest_client()
            .get(format!("{}/model", self.base_url()))
            .bearer_auth(auth.api_key)
            .query(&query);
        let response = send_request::<FishAudioListModelsResponse>(
            request,
            "get models",
            ServiceType::FishAudio.as_str(),
        )
        .await?;
        Ok(response)
    }

    async fn tts(&self, app: &AppHandle, body: TtsRequestBody) -> Result<Vec<u8>, AppError> {
        let auth = self.get_auth(app).await?;
        let response = self
            .reqwest_client()
            .post(format!("{}/v1/tts", self.base_url()))
            .header("model", "s2.1-pro-free")
            .bearer_auth(auth.api_key)
            .json(&body)
            .send()
            .await?;
        let bytes = response.bytes().await?;
        Ok(bytes.into())
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
