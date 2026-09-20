use async_trait::async_trait;

use crate::{
    error::AppError,
    services::claude::models::{MessagesBody, MessagesResponse, ModelsResponse},
    utils::send_request,
};

#[async_trait]
pub trait ClaudeApi: Send + Sync {
    fn base_api(&self) -> String;

    async fn get_models_list(
        &self,
        reqwest_client: &reqwest::Client,
        api_key: String,
    ) -> Result<Option<ModelsResponse>, AppError> {
        let request = reqwest_client
            .get(format!("{}/models", self.base_api()))
            .header("x-api-key", api_key)
            .header("anthropic-version", "2023-06-01");

        let response = send_request::<ModelsResponse>(request, "get models list", "Claude").await?;
        Ok(response)
    }

    async fn messages(
        &self,
        reqwest_client: &reqwest::Client,
        api_key: String,
        body: MessagesBody,
    ) -> Result<Option<MessagesResponse>, AppError> {
        let request = reqwest_client
            .post(format!("{}/messages", self.base_api()))
            .header("x-api-key", api_key)
            .header("anthropic-version", "2023-06-01")
            .timeout(std::time::Duration::from_mins(5))
            .json(&body);

        let response =
            send_request::<MessagesResponse>(request, "model messages", "Claude").await?;
        Ok(response)
    }
}
