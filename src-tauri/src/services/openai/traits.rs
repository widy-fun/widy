use async_trait::async_trait;

#[async_trait]
pub trait OpenAiApi: Send + Sync {
    fn base_api(&self) -> String;
}
