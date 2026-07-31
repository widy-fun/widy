use crate::{
    constants::USDT_MULTIPLICATION,
    error::AppError::{self},
    repositories::{DonationsRepository, ServicesRepository},
    services::{
        AppEvent, DatabaseService, DeepLinkHandler, DeepLinkQueryParams, EventMessage,
        EventsService, WebSocketBroadcaster, WidyNetwork,
    },
    traits::ItemsBuffer,
};
use base64::{Engine, engine::general_purpose};
use chrono::Utc;
use entity::services::{ServiceAuth, ServiceType, WidyAuth};
use serde::Deserialize;
use std::{
    collections::HashMap,
    sync::{Arc, Mutex},
    time::Duration,
};
use tauri::{AppHandle, Manager};
use tokio_util::sync::CancellationToken;
use tonlib_core::cell::{BagOfCells, Cell};

const BASE_INTERVAL: Duration = Duration::from_secs(1);
const MAX_INTERVAL: Duration = Duration::from_secs(60);

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
struct TracesResponse {
    traces: Vec<Trace>,
}
#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
struct Trace {
    transactions: Option<HashMap<String, Transaction>>,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
struct Transaction {
    trace_id: Option<String>,
    out_msgs: Option<Vec<Message>>,
    emulated: Option<bool>,
}
#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
struct Message {
    hash: Option<String>,
    opcode: Option<String>,
    message_content: Option<MessageContent>,
}
#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
struct MessageContent {
    body: Option<String>,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
struct DonationEvent {
    op_code: u32,
    query_id: u64,
    amount: u64,
    sender: String,
    name: String,
    message: String,
}

#[derive(Debug, Clone, Deserialize)]
#[allow(dead_code)]
struct TonTraceAccounts {
    accounts: Vec<String>,
    hash: String,
}
trait StringTail {
    fn load_snake_string(&self) -> Result<String, AppError>;
}
impl StringTail for Cell {
    fn load_snake_string(&self) -> Result<String, AppError> {
        let mut bytes = Vec::new();
        let mut current = self.clone();

        loop {
            let mut parser = current.parser();
            let available = parser.remaining_bytes();
            let chunk = parser
                .load_bytes(available)
                .map_err(|e| AppError::ParseError(e.to_string()))?;
            bytes.extend_from_slice(&chunk);

            if current.references().is_empty() {
                break;
            }

            current = (*current.references()[0]).clone();
        }

        Ok(String::from_utf8(bytes).map_err(|e| AppError::ParseError(e.to_string()))?)
    }
}

impl DeepLinkHandler for WidyTonService {
    fn can_handle(&self, url: &url::Url) -> bool {
        let Some(query) = url.query() else {
            return false;
        };
        let Ok(query_params) = serde_qs::from_str::<DeepLinkQueryParams>(query) else {
            return false;
        };

        url.host_str() == Some("create-donation-account")
            && query_params.network == WidyNetwork::Ton
    }

    fn handle(&self, url: &url::Url, app: &AppHandle) {
        let Some(query) = url.query() else {
            return;
        };

        let Ok(query_params) = serde_qs::from_str::<DeepLinkQueryParams>(query) else {
            ::log::error!("Failed to parse deep link query params");
            return;
        };

        let nonce: Arc<Mutex<Option<String>>> = self.nonce.clone();

        let is_nonce_valid = {
            let mut nonce_guard = nonce.lock().unwrap();
            if nonce_guard.as_ref() == Some(&query_params.nonce) {
                *nonce_guard = None;
                true
            } else {
                false
            }
        };

        if !is_nonce_valid {
            return;
        }

        let app_clone = app.clone();

        tauri::async_runtime::spawn(async move {
            let widy_ton_service = app_clone.state::<Arc<WidyTonService>>();
            let database_service = app_clone.state::<DatabaseService>();
            let websocket_broadcaster = app_clone.state::<WebSocketBroadcaster>();

            let _ = database_service
                .update_service(entity::services::Model {
                    id: ServiceType::WidyTon,
                    auth: Some(ServiceAuth::Widy(WidyAuth {
                        donation_account_name: query_params.donation_account_name.clone(),
                        user: query_params.user.clone(),
                        donation_account_address: query_params.donation_account_address.clone(),
                    })),
                    settings: None,
                    authorized: true,
                })
                .await;

            if let Err(e) = widy_ton_service.connect(&app_clone).await {
                ::log::error!("Service connection error: {}", e);
                return;
            }

            websocket_broadcaster.broadcast_event_message(&EventMessage {
                event: AppEvent::CreateDonationAccount,
                data: query_params,
            });
        });
    }
}

pub struct WidyTonService {
    pub nonce: Arc<Mutex<Option<String>>>,
    cancellation_token: Arc<Mutex<CancellationToken>>,
    donations_buffer: Arc<Mutex<ItemsBuffer<String>>>,
}

impl WidyTonService {
    pub fn new() -> Self {
        Self {
            nonce: Arc::new(Mutex::new(None)),
            cancellation_token: Arc::new(Mutex::new(CancellationToken::new())),
            donations_buffer: Arc::new(Mutex::new(ItemsBuffer::new(1001))),
        }
    }

    pub async fn connect(&self, app: &AppHandle) -> Result<(), AppError> {
        {
            let mut cancellation_token = self.cancellation_token.lock().unwrap();
            *cancellation_token = CancellationToken::new();
        }
        let database_service = app.state::<DatabaseService>();
        let latest_donations = database_service
            .get_latest_donations_by_service(ServiceType::WidyTon, 1000)
            .await?;
        {
            let mut donations_buffer = self.donations_buffer.lock().unwrap();
            for donation in latest_donations {
                donations_buffer.push(donation.service_id);
            }
        }

        let service = database_service
            .get_service_with_auth_by_id(ServiceType::WidyTon)
            .await?;
        if let Some(entity::services::Model {
            authorized: true,
            auth: Some(ServiceAuth::Widy(auth)),
            ..
        }) = service
        {
            self.poll_traces(app.clone(), auth.donation_account_address)
                .await;
        }

        Ok(())
    }

    async fn poll_traces(&self, app: AppHandle, donation_account_address: String) {
        tauri::async_runtime::spawn(async move {
            let widy_ton_service = app.state::<Arc<WidyTonService>>();
            let reqwest_client = app.state::<reqwest::Client>();

            let mut current_interval = BASE_INTERVAL;
            let cancellation_token =
                { widy_ton_service.cancellation_token.lock().unwrap().clone() };
            let start_utime = Utc::now().timestamp();
            loop {
                tokio::select! {
                    _ = cancellation_token.cancelled() => {
                        break;
                    }
                    _ = tokio::time::sleep(current_interval) => {
                        match widy_ton_service.get_traces(donation_account_address.clone(), &reqwest_client,start_utime).await {
                            Ok(response) => {
                                widy_ton_service.handle_traces(&app,response.traces).await;
                            }
                            Err(e) => {
                                match e {
                                    AppError::HttpStatus { status, .. } => {
                                        if status == 429 {
                                            current_interval = (current_interval + Duration::from_secs(1)).min(MAX_INTERVAL);
                                        }
                                    }
                                    _ => {}

                                }

                            }
                        }
                    }
                }
            }
        });
    }

    fn parse_donation_event(&self, base64: &str) -> Result<DonationEvent, AppError> {
        let boc_bytes = general_purpose::STANDARD
            .decode(base64)
            .map_err(|e| AppError::ParseError(e.to_string()))?;
        let boc = BagOfCells::parse(&boc_bytes).map_err(|e| AppError::ParseError(e.to_string()))?;

        let root = boc
            .single_root()
            .map_err(|e| AppError::ParseError(e.to_string()))?;
        let mut parser = root.parser();

        let op_code = parser
            .load_u32(32)
            .map_err(|e| AppError::ParseError(e.to_string()))?;
        let query_id = parser
            .load_u64(64)
            .map_err(|e| AppError::ParseError(e.to_string()))?;
        let amount = parser
            .load_coins()
            .map_err(|e| AppError::ParseError(e.to_string()))?;
        let sender = parser
            .load_address()
            .map_err(|e| AppError::ParseError(e.to_string()))?;

        let name_cell = parser
            .next_reference()
            .map_err(|e| AppError::ParseError(e.to_string()))?;
        let mut name_parser = name_cell.parser();

        let bytes_len: usize = name_parser.remaining_bytes();
        let name = name_parser
            .load_utf8(bytes_len)
            .map_err(|e| AppError::ParseError(e.to_string()))?;

        let message_cell = parser
            .next_reference()
            .map_err(|e| AppError::ParseError(e.to_string()))?;
        let message = message_cell.load_snake_string()?;

        Ok(DonationEvent {
            op_code,
            query_id,
            amount: amount.to_u64_digits().first().cloned().unwrap_or(0),
            sender: sender.to_string(),
            message,
            name,
        })
    }

    async fn handle_traces(&self, app: &AppHandle, traces: Vec<Trace>) {
        let messages: Vec<&Message> = traces
            .iter()
            .filter_map(|trace| trace.transactions.as_ref())
            .flat_map(|transactions| transactions.values())
            .filter(|tx| tx.emulated == Some(false))
            .flat_map(|tx| tx.out_msgs.as_deref().unwrap_or(&[]))
            .collect();

        for message in messages {
            if let Message {
                hash: Some(hash),
                opcode: Some(opcode),
                message_content: Some(MessageContent { body: Some(body) }),
                ..
            } = message
                && opcode == "0x05a73567"
            {
                {
                    let mut buffer = self.donations_buffer.lock().unwrap();
                    if buffer.iter().any(|message_hash| message_hash == hash) {
                        continue;
                    }
                    buffer.push(hash.to_string());
                }

                if let Ok(event) = self.parse_donation_event(body) {
                    let _ = EventsService::donation(
                        hash.clone(),
                        ServiceType::WidyTon,
                        Some(event.name),
                        entity::settings::Currency::USD,
                        event.amount as f64 / USDT_MULTIPLICATION,
                        Some(event.message),
                        &app,
                    )
                    .await;
                }
            }
        }
    }

    async fn get_traces(
        &self,
        donation_account_address: String,
        reqwest_client: &reqwest::Client,
        start_utime: i64,
    ) -> Result<TracesResponse, AppError> {
        let response = reqwest_client
            .get(format!(
                "https://toncenter.com/api/v3/traces/?account={}&start_utime={}&limit=100",
                donation_account_address, start_utime
            ))
            .send()
            .await?;

        let status = response.status();
        let body = response.text().await?;

        if !status.is_success() {
            return Err(AppError::HttpStatus {
                status: status.as_u16(),
                body,
            });
        }

        let traces_response: TracesResponse =
            serde_json::from_str(&body).map_err(|e| AppError::ParseError(e.to_string()))?;

        Ok(traces_response)
    }

    pub async fn sign_out(&self, app: &AppHandle) -> core::result::Result<(), AppError> {
        let database_service = app.state::<DatabaseService>();
        database_service
            .update_service(entity::services::Model {
                id: ServiceType::WidyTon,
                settings: None,
                auth: None,
                authorized: false,
            })
            .await?;
        {
            self.cancellation_token.lock().unwrap().cancel();
        }
        Ok(())
    }
}
