use std::{collections::HashMap, sync::Arc};

use foundry_local_sdk::{
    ChatCompletionRequestMessage, ChatCompletionRequestSystemMessage,
    ChatCompletionRequestUserMessage, ChatCompletionTools, ChatToolChoice, FinishReason, Model,
};
use futures::StreamExt;
use serde::{Deserialize, Serialize};

use crate::{error::AppError, services::assistant::models::Tool};

#[derive(Default, Debug)]
pub struct ToolCallState {
    pub current_tool_id: String,
    pub current_tool_name: String,
    pub current_tool_args: String,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct ToolCall {
    pub name: String,
    pub arguments: HashMap<String, String>,
}
pub struct ToolCallingService;

impl ToolCallingService {
    pub async fn handle_tool_calling(
        model: Arc<Model>,
        text: &str,
    ) -> Result<Vec<ToolCall>, AppError> {
        let messages: Vec<ChatCompletionRequestMessage> = vec![
                        ChatCompletionRequestSystemMessage::from(
                            "You are a helpful AI assistant. If necessary, you can use any provided tools to answer the question.",
                        )
                        .into(),
                        ChatCompletionRequestUserMessage::from(text).into(),
                    ];
        let tools = Tool::get_tools::<ChatCompletionTools>()?;
        let client = model
            .create_chat_client()
            .max_tokens(512)
            .tool_choice(ChatToolChoice::Required);

        let mut state = ToolCallState::default();
        let mut tool_calls: Vec<ToolCall> = vec![];
        let mut stream = client
            .complete_streaming_chat(&messages, Some(&tools))
            .await?;
        while let Some(chunk) = stream.next().await {
            let chunk = chunk?;
            if let Some(choice) = chunk.choices.first() {
                if let Some(ref tool_calls) = choice.delta.tool_calls {
                    for tc in tool_calls {
                        if let Some(ref id) = tc.id {
                            state.current_tool_id = id.clone();
                        }
                        if let Some(ref func) = tc.function {
                            if let Some(ref name) = func.name {
                                state.current_tool_name = name.clone();
                            }
                            if let Some(ref args) = func.arguments {
                                state.current_tool_args.push_str(args);
                            }
                        }
                    }
                }
                if choice.finish_reason == Some(FinishReason::ToolCalls) {
                    tool_calls.push(ToolCall {
                        name: state.current_tool_name.clone(),
                        arguments: serde_json::from_str(&state.current_tool_args)?,
                    });
                }
            }
        }
        Ok(tool_calls)
    }
}
