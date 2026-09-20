#[derive(Debug, serde::Deserialize)]
pub struct ModelsResponse {
    pub object: String,
    pub data: Vec<Model>,
}

#[derive(Debug, serde::Deserialize)]
pub struct Model {
    pub id: String,
    pub object: String,
    pub created: i64,
    pub owned_by: String,
}

use std::collections::HashMap;

use entity::assistant_settings::{Parameters, PropertySchema, Tool};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct OpenAITool {
    pub r#type: String,
    pub name: String,
    pub description: String,
    pub parameters: OpenAIParameters,
    pub strict: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct OpenAIParameters {
    pub r#type: String, // "object"
    pub properties: HashMap<String, PropertySchema>,
    pub required: Vec<String>,
    #[serde(rename = "additionalProperties")]
    pub additional_properties: bool,
}

impl From<Tool> for OpenAITool {
    fn from(tool: Tool) -> Self {
        Self {
            r#type: "function".to_string(),
            name: tool.function.name,
            description: tool.function.description,
            parameters: tool.function.parameters.into(),
            strict: false,
        }
    }
}

impl From<Parameters> for OpenAIParameters {
    fn from(tool: Parameters) -> Self {
        Self {
            r#type: tool.r#type,
            properties: tool.properties,
            required: tool.required,
            additional_properties: false,
        }
    }
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct OpenAIResponsesBody {
    pub model: String,
    pub input: String,
    pub tools: Vec<OpenAITool>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct OpenAIResponse {
    pub output: Vec<OpenAIOutput>,
}

#[derive(Debug, Clone, Deserialize)]
#[serde(tag = "type")]
pub enum OpenAIOutput {
    #[serde(rename = "function_call")]
    FunctionCall {
        id: Option<String>,
        call_id: String,
        name: String,
        arguments: String,
    },

    #[serde(other)]
    Other,
}
