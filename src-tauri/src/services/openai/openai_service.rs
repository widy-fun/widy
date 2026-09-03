use crate::services::openai::traits::OpenAiApi;

#[derive(Clone)]
pub struct OpenAiService {
    base_api: String,
}

impl OpenAiService {
    pub fn new() -> Self {
        Self {
            base_api: "https://api.openai.com/v1".to_string(),
        }
    }
}

impl OpenAiApi for OpenAiService {
    fn base_api(&self) -> String {
        self.base_api.clone()
    }
}
