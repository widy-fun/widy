use std::collections::HashMap;

use serde::{Deserialize, Serialize};

use crate::services::assistant::models::Tool;

#[derive(Debug, Clone, Deserialize)]

pub struct ModelsResponse {
    pub models: Vec<Model>,
    #[serde(rename = "nextPageToken")]
    pub next_page_token: String,
}
#[derive(Debug, Clone, Deserialize)]

pub struct Model {
    pub name: String,
    pub version: String,
    #[serde(rename = "displayName")]
    pub display_name: String,
}

#[derive(Debug, Clone, Serialize)]

pub struct InteractionsBody {
    pub model: Option<String>,
    pub input: String,
    pub tools: Option<Vec<GeminiTool>>,
    pub generation_config: Option<GenerationConfig>,
}

#[derive(Debug, Clone, Serialize)]
pub struct GenerationConfig {
    pub max_output_tokens: Option<u64>,
    pub tool_choice: Option<ToolChoiceConfig>,
}
#[derive(Debug, Clone, Serialize)]
pub struct ToolChoiceConfig {
    pub allowed_tools: Option<AllowedTools>,
}
#[derive(Debug, Clone, Serialize)]
pub struct AllowedTools {
    pub mode: Option<String>,
    pub tools: Option<Vec<String>>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GeminiTool {
    #[serde(rename = "type")]
    pub tool_type: String,

    pub name: String,

    pub description: String,

    pub parameters: JsonSchema,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct JsonSchema {
    #[serde(rename = "type")]
    pub r#type: String,

    pub properties: std::collections::HashMap<String, Property>,

    pub required: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Property {
    #[serde(rename = "type")]
    pub r#type: String,

    #[serde(skip_serializing_if = "Option::is_none")]
    pub description: Option<String>,

    #[serde(rename = "enum", skip_serializing_if = "Option::is_none")]
    pub enum_values: Option<Vec<String>>,

    #[serde(skip_serializing_if = "Option::is_none")]
    pub items: Option<Box<Property>>,

    #[serde(skip_serializing_if = "Option::is_none")]
    pub properties: Option<HashMap<String, Property>>,

    #[serde(skip_serializing_if = "Option::is_none")]
    pub required: Option<Vec<String>>,
}

impl From<Tool> for GeminiTool {
    fn from(tool: Tool) -> GeminiTool {
        GeminiTool {
            tool_type: tool.r#type,
            name: tool.function.name,
            description: tool.function.description,
            parameters: JsonSchema {
                r#type: tool.function.parameters.r#type,
                properties: tool
                    .function
                    .parameters
                    .properties
                    .into_iter()
                    .map(|(k, v)| {
                        (
                            k,
                            Property {
                                r#type: v.r#type,
                                description: Some(v.description),
                                enum_values: None,
                                items: None,
                                properties: None,
                                required: None,
                            },
                        )
                    })
                    .collect(),
                required: tool.function.parameters.required,
            },
        }
    }
}

#[derive(Debug, Deserialize)]
pub struct InteractionResponse {
    pub id: String,
    pub status: String,
    pub model: String,
    pub object: String,
    pub steps: Option<Vec<InteractionStep>>,
    #[serde(default)]
    pub output_text: Option<String>,
    #[serde(default)]
    pub created: Option<String>,
    #[serde(default)]
    pub updated: Option<String>,
}
#[derive(Debug, Deserialize)]
pub struct InteractionStep {
    pub id: Option<String>,
    pub r#type: Option<String>,
    pub name: Option<String>,
    #[serde(default)]
    pub arguments: Option<HashMap<String, String>>,
}
