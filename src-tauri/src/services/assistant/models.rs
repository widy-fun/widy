use std::collections::HashMap;

use serde::{Deserialize, Serialize, de::DeserializeOwned};
use serde_json::json;

use crate::error::AppError;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Tool {
    pub r#type: String, // "function"
    pub function: FunctionDef,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FunctionDef {
    pub name: String,
    pub description: String,
    pub parameters: Parameters,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Parameters {
    pub r#type: String, // "object"
    pub properties: HashMap<String, PropertySchema>,
    pub required: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PropertySchema {
    pub r#type: String, // "string"
    pub description: String,
}

impl Tool {
    pub fn get_tools<T: DeserializeOwned>() -> Result<Vec<T>, AppError> {
        let tools = serde_json::from_value(json!([
        {
            "type": "function",
            "function": {
                "name": "play_alert",
                "description": "Play alert.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string",
                            "description": "Alert name"
                        }
                    },
                    "required": ["name"]
                }
            }
        },
        {
            "type": "function",
            "function": {
                "name": "pin_message",
                "description": "Pin a message in a channel.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "channel_id": {
                            "type": "string",
                            "description": "Chanel id"
                        },
                        "message": {
                            "type": "string",
                            "description": "Message"
                        }
                    },
                    "required": ["channel_id","message"]
                }
            }
        },
        {
            "type": "function",
            "function": {
                "name": "ban_user",
                "description": "Ban a user from the channel.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "username": {
                            "type": "string",
                            "description": "User name in channel."
                        },
                        "platform": {
                            "type": "string",
                            "description": "Twitch, Kick, Youtube."
                        }
                    },
                    "required": ["username","platform"]
                }
            }
        }
        ]))?;
        Ok(tools)
    }
}
