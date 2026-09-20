use async_trait::async_trait;

use crate::{
    error::AppError,
    services::openai::models::{ModelsResponse, OpenAIResponse, OpenAIResponsesBody},
    utils::send_request,
};

#[async_trait]
pub trait OpenAiApi: Send + Sync {
    fn base_api(&self) -> String;

    async fn get_models_list(
        &self,
        reqwest_client: &reqwest::Client,
        api_key: String,
    ) -> Result<Option<ModelsResponse>, AppError> {
        let request = reqwest_client
            .get(format!("{}/models", self.base_api()))
            .bearer_auth(api_key);

        let response = send_request::<ModelsResponse>(request, "get models list", "OpenAI").await?;

        Ok(response)
    }

    async fn responses(
        &self,
        reqwest_client: &reqwest::Client,
        api_key: String,
        body: OpenAIResponsesBody,
    ) -> Result<Option<OpenAIResponse>, AppError> {
        let request = reqwest_client
            .post(format!("{}/responses", self.base_api()))
            .bearer_auth(api_key)
            .timeout(std::time::Duration::from_mins(5))
            .json(&body);

        let response = send_request::<OpenAIResponse>(request, "model responses", "OpenAI").await?;

        Ok(response)
    }
}
