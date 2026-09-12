use crate::{
    error::AppError,
    services::gemini::models::{InteractionResponse, InteractionsBody, ModelsResponse},
    utils::send_request,
};
use async_trait::async_trait;

#[async_trait]
pub trait GeminiApi: Send + Sync {
    fn base_api(&self) -> String;

    async fn get_models_list(
        &self,
        reqwest_client: &reqwest::Client,
        api_key: String,
    ) -> Result<Option<ModelsResponse>, AppError> {
        let request = reqwest_client
            .get(format!("{}/models", self.base_api()))
            .query(&[("key", api_key)]);

        let response = send_request::<ModelsResponse>(request, "get models list", "Gemini").await?;
        Ok(response)
    }

    async fn interactions(
        &self,
        reqwest_client: &reqwest::Client,
        api_key: String,
        body: InteractionsBody,
    ) -> Result<Option<InteractionResponse>, AppError> {
        let request = reqwest_client
            .post(format!("{}/interactions", self.base_api()))
            .header("x-goog-api-key", api_key)
            .timeout(std::time::Duration::from_mins(5))
            .json(&body);

        let response =
            send_request::<InteractionResponse>(request, "model interactions", "Gemini").await?;
        Ok(response)
    }
}
