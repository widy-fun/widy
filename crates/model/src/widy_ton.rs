use serde::Deserialize;
use std::collections::HashMap;

#[derive(Debug, Clone, Deserialize)]
pub struct TracesResponse {
    pub traces: Vec<Trace>,
}
#[derive(Debug, Clone, Deserialize)]
pub struct Trace {
    pub transactions: Option<HashMap<String, Transaction>>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct Transaction {
    pub trace_id: Option<String>,
    pub out_msgs: Option<Vec<Message>>,
    pub emulated: Option<bool>,
}
#[derive(Debug, Clone, Deserialize)]
pub struct Message {
    pub hash: Option<String>,
    pub opcode: Option<String>,
    pub message_content: Option<MessageContent>,
}
#[derive(Debug, Clone, Deserialize)]
pub struct MessageContent {
    pub body: Option<String>,
}

#[derive(Debug, Clone, Deserialize)]
pub struct DonationEvent {
    pub op_code: u32,
    pub query_id: u64,
    pub amount: u64,
    pub sender: String,
    pub name: String,
    pub message: String,
}

#[derive(Debug, Clone, Deserialize)]
pub struct TonTraceAccounts {
    pub accounts: Vec<String>,
    pub hash: String,
}
