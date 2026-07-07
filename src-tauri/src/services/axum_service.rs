use crate::constants::HTTP_WIDGET_PORT;
use crate::repositories::{
    AlertsRepository, AucFighterSettingsRepository, GoalsRepository, MediaSettingsRepository,
    MessagesRepository, NsfwRepository, ServicesRepository, SettingsRepository, WidgetsRepository,
};
use crate::services::kick::traits::KickApi;
use crate::services::kick::{KickBotService, KickService};
use crate::services::{
    AppEvent, ConfigService, DatabaseService, EventMessage, WebSocketBroadcaster,
};
use crate::utils::validate_csp;
use axum::extract::ws::{Message, WebSocket};
use axum::extract::{Path, Query};
use axum::http::HeaderValue;
use axum::http::StatusCode;
use axum::response::Redirect;
use axum::routing::patch;
use axum::Json;
use axum::{
    extract::{State, WebSocketUpgrade},
    response::Response,
    routing::get,
    Router,
};
use entity::goals::GoalType;
use entity::messages::ClientMessage;
use entity::services::{ServiceAuth, ServiceType};
use futures::{sink::SinkExt, stream::StreamExt};
use http::header;
use serde::{Deserialize, Serialize};
use std::path::PathBuf;
use tauri::{AppHandle, Manager};
use tokio::fs;
use tokio::sync::mpsc;
use tower_http::cors::Any;
use tower_http::cors::CorsLayer;
use tower_http::services::{ServeDir, ServeFile};
type Tx = mpsc::UnboundedSender<Message>;

#[derive(Debug, Clone, Serialize)]
pub enum GrantType {
    #[serde(rename = "refresh_token")]
    RefreshToken,
    #[serde(rename = "authorization_code")]
    AuthorizationCode,
}
// impl GrantType {
//     pub fn to_string(t: GrantType) -> String {
//         match t {
//             RefreshToken => "refresh_token".to_string(),
//             AuthorizationCode => "authorization_code".to_string(),
//         }
//     }
// }

#[derive(Debug, Deserialize)]
struct DonationsQuery {
    pub limit: u64,
    pub offset: u64,
    pub exclude_donations: bool,
    pub exclude_subscriptions: bool,
    pub exclude_follows: bool,
    pub exclude_raids: bool,
    pub exclude_redemptions: bool,
}
#[derive(Debug, Deserialize)]
struct GoalsQuery {
    pub r#type: GoalType,
}

#[derive(Debug, Deserialize)]
pub struct KickAuthCallbackQuery {
    pub code: String,
    pub state: String,
}

#[derive(Clone)]
struct AxumState {
    app: AppHandle,
}

#[derive(Clone, Debug)]
pub struct AxumService {
    widget_path: PathBuf,
    static_path: PathBuf,
    auc_fighter_path: PathBuf,
}

impl AxumService {
    pub fn new(widget_path: &PathBuf, static_path: &PathBuf, auc_fighter_path: &PathBuf) -> Self {
        Self {
            widget_path: widget_path.clone(),
            static_path: static_path.clone(),
            auc_fighter_path: auc_fighter_path.clone(),
        }
    }

    pub async fn run(&self, app: &AppHandle) -> Result<(), String> {
        let widget_path = self.widget_path.clone();
        let static_path = self.static_path.clone();
        let auc_fighter_path = self.auc_fighter_path.clone();
        #[cfg(debug_assertions)]
        let cors = CorsLayer::new()
            .allow_origin(HeaderValue::from_static("http://localhost:12553"))
            .allow_origin(HeaderValue::from_static("http://localhost:1420"))
            .allow_methods(Any)
            .allow_headers(Any);
        #[cfg(not(debug_assertions))]
        let cors = CorsLayer::new()
            .allow_origin(HeaderValue::from_static("http://localhost:12553"))
            .allow_origin(HeaderValue::from_static("http://tauri.localhost"))
            .allow_methods(Any)
            .allow_headers(Any);

        let axum_router: Router = Router::new()
            .route("/ws", get(AxumService::websocket_handler))
            .route("/kick/auth/callback", get(AxumService::kick_auth_callback))
            .route(
                "/kick-bot/auth/callback",
                get(AxumService::kick_bot_auth_callback),
            )
            .route("/api/alerts", get(AxumService::get_alerts))
            .route("/api/settings", get(AxumService::get_settings))
            .route("/api/messages", get(AxumService::get_messages))
            .route("/api/goals", get(AxumService::get_not_ended_goal))
            .route("/api/widgets/{id}", get(AxumService::get_widget_by_id))
            .route(
                "/api/widgets/view/storage/{id}",
                patch(AxumService::update_widget_view_storage),
            )
            .route(
                "/api/widgets/control/storage/{id}",
                patch(AxumService::update_widget_control_storage),
            )
            .route(
                "/api/auc-fighter-settings",
                get(AxumService::get_auc_fighter_settings),
            )
            .route(
                "/widgets/{id}/{widget_type}/{*file_path}",
                get(AxumService::widgets_handler),
            )
            .nest_service("/static", ServeDir::new(&static_path))
            .nest_service(
                "/widget",
                ServeDir::new(&widget_path)
                    .fallback(ServeFile::new(widget_path.join("index.html"))),
            )
            .nest_service(
                "/auc-fighter",
                ServeDir::new(&auc_fighter_path)
                    .fallback(ServeFile::new(auc_fighter_path.join("default.htm"))),
            )
            .fallback_service(
                ServeDir::new(&widget_path)
                    .fallback(ServeFile::new(widget_path.join("index.html"))),
            )
            .layer(cors)
            .with_state(AxumState { app: app.clone() });

        let listener = match tokio::net::TcpListener::bind(("127.0.0.1", HTTP_WIDGET_PORT)).await {
            Ok(listener) => listener,
            Err(e) => {
                log::error!("Axum tcp listener error: {}", e.to_string());
                return Err(e.to_string());
            }
        };

        let server = axum::serve(listener, axum_router);

        tauri::async_runtime::spawn(async move {
            if let Err(e) = server.await {
                log::error!("Server error: {}", e);
            }
        });

        Ok(())
    }

    async fn widgets_handler(
        Path((id, widget_type, file_path)): Path<(String, String, String)>,
        State(state): State<AxumState>,
    ) -> Result<Response, StatusCode> {
        let database_service = state.app.state::<DatabaseService>();
        if let Ok(Some(widget)) = database_service.get_widget_by_id(id).await {
            let config_service = state.app.state::<ConfigService>();
            let is_dev = widget.dev_path.clone().is_some();
            let widget_path = match widget.dev_path.clone() {
                Some(dev_path) => PathBuf::new().join(&dev_path),
                None => config_service
                    .widgets_path
                    .clone()
                    .join(&widget.manifest.id)
                    .join(widget.id),
            };
            let base_path = widget_path.join(&widget_type).join(file_path);

            let canonical = base_path
                .canonicalize()
                .map_err(|_| StatusCode::NOT_FOUND)?;

            let widgets_root = widget_path
                .canonicalize()
                .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

            if !canonical.starts_with(&widgets_root) {
                return Err(StatusCode::FORBIDDEN);
            }

            let content = fs::read(&canonical)
                .await
                .map_err(|_| StatusCode::NOT_FOUND)?;

            let mime = mime_guess::from_path(&canonical).first_or_octet_stream();

            let csp_value = validate_csp(widget.manifest.csp, is_dev).unwrap_or_else(|_| {
                "default-src 'self'; style-src 'self' 'unsafe-inline';".to_string()
            });

            let response = Response::builder()
                .status(StatusCode::OK)
                .header(header::CONTENT_TYPE, mime.as_ref())
                .header(header::CONTENT_SECURITY_POLICY, csp_value)
                .body(axum::body::Body::from(content))
                .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

            return Ok(response);
        }
        return Err(StatusCode::NOT_FOUND);
    }

    async fn get_messages(
        Query(params): Query<DonationsQuery>,
        State(state): State<AxumState>,
    ) -> Result<Json<Vec<ClientMessage>>, StatusCode> {
        let database_service = state.app.state::<DatabaseService>();
        let client_messages = database_service
            .get_messages(
                &params.limit,
                &params.offset,
                &params.exclude_donations,
                &params.exclude_subscriptions,
                &params.exclude_follows,
                &params.exclude_raids,
                &params.exclude_redemptions,
            )
            .await
            .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

        Ok(Json(client_messages))
    }

    async fn get_not_ended_goal(
        Query(params): Query<GoalsQuery>,
        State(state): State<AxumState>,
    ) -> Result<Json<Option<entity::goals::Model>>, StatusCode> {
        let database_service = state.app.state::<DatabaseService>();
        let goal = database_service
            .get_not_ended_goal(params.r#type)
            .await
            .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

        Ok(Json(goal))
    }

    async fn get_widget_by_id(
        Path(id): Path<String>,
        State(state): State<AxumState>,
    ) -> Result<Json<Option<entity::widgets::Model>>, StatusCode> {
        let database_service = state.app.state::<DatabaseService>();
        let widget = database_service
            .get_widget_by_id(id)
            .await
            .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

        Ok(Json(widget))
    }
    async fn update_widget_view_storage(
        State(state): State<AxumState>,
        Path(id): Path<String>,
        body: String,
    ) -> Result<StatusCode, StatusCode> {
        let database_service = state.app.state::<DatabaseService>();
        if let Some(widget) = database_service
            .update_view_storage(body.clone(), id)
            .await
            .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
        {
            let websocket_broadcaster = state.app.state::<WebSocketBroadcaster>();
            websocket_broadcaster
                .broadcast_event_message(&EventMessage {
                    event: AppEvent::WidgetViewStorage,
                    data: widget,
                })
                .await;
            return Ok(StatusCode::OK);
        }
        Ok(StatusCode::NOT_FOUND)
    }

    async fn update_widget_control_storage(
        State(state): State<AxumState>,
        Path(id): Path<String>,
        body: String,
    ) -> Result<StatusCode, StatusCode> {
        let database_service = state.app.state::<DatabaseService>();
        if let Some(widget) = database_service
            .update_control_storage(body.clone(), id)
            .await
            .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?
        {
            let websocket_broadcaster = state.app.state::<WebSocketBroadcaster>();
            websocket_broadcaster
                .broadcast_event_message(&EventMessage {
                    event: AppEvent::WidgetControlStorage,
                    data: widget,
                })
                .await;
            return Ok(StatusCode::OK);
        }
        Ok(StatusCode::NOT_FOUND)
    }

    async fn get_auc_fighter_settings(
        State(state): State<AxumState>,
    ) -> Result<Json<Option<entity::auc_fighter_settings::Model>>, StatusCode> {
        let database_service = state.app.state::<DatabaseService>();
        let settings = database_service
            .get_auc_fighter_settings()
            .await
            .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

        Ok(Json(settings))
    }

    async fn get_alerts(
        State(state): State<AxumState>,
    ) -> Result<Json<Vec<entity::alerts::Model>>, StatusCode> {
        let database_service = state.app.state::<DatabaseService>();
        let alerts = database_service
            .get_alerts()
            .await
            .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

        Ok(Json(alerts))
    }

    async fn kick_auth_callback(
        Query(params): Query<KickAuthCallbackQuery>,
        State(state): State<AxumState>,
    ) -> Result<Redirect, StatusCode> {
        let reqwest_client = state.app.state::<reqwest::Client>();
        let kick_service = state.app.state::<KickService>();
        let database_service = state.app.state::<DatabaseService>();
        let auth = kick_service.tokens(&reqwest_client, params).await?;
        let _ = database_service
            .update_service_auth(ServiceType::Kick, Some(ServiceAuth::Kick(auth)), true)
            .await;
        let _ = kick_service.connect(&state.app.clone()).await;
        Ok(Redirect::to("https://kick.com"))
    }

    async fn kick_bot_auth_callback(
        Query(params): Query<KickAuthCallbackQuery>,
        State(state): State<AxumState>,
    ) -> Result<Redirect, StatusCode> {
        let reqwest_client = state.app.state::<reqwest::Client>();
        let kick_bot_service = state.app.state::<KickBotService>();
        let database_service = state.app.state::<DatabaseService>();
        let auth = kick_bot_service.tokens(&reqwest_client, params).await?;
        let _ = database_service
            .update_service_auth(ServiceType::KickBot, Some(ServiceAuth::Kick(auth)), true)
            .await;
        let _ = kick_bot_service.connect(&state.app.clone()).await;
        Ok(Redirect::to("https://kick.com"))
    }

    async fn get_settings(
        State(state): State<AxumState>,
    ) -> Result<Json<Option<entity::settings::Model>>, StatusCode> {
        let database_service = state.app.state::<DatabaseService>();
        let settings: Option<entity::settings::Model> = database_service
            .get_settings()
            .await
            .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

        Ok(Json(settings))
    }

    async fn websocket_handler(
        ws: WebSocketUpgrade,
        State(axum_state): State<AxumState>,
    ) -> Response {
        ws.on_upgrade(move |socket| AxumService::handle_socket(socket, axum_state))
    }

    async fn handle_socket(socket: WebSocket, axum_state: AxumState) {
        let (mut sender, mut receiver) = socket.split();

        let (tx, mut rx) = mpsc::unbounded_channel();

        let app_handle = axum_state.app;

        let websocket_broadcaster = app_handle.state::<WebSocketBroadcaster>();

        let connection_id = websocket_broadcaster.add_connection(tx.clone()).await;

        if let Err(e) = AxumService::send_settings(tx, app_handle.clone()).await {
            log::error!("WebSocket send error: {}", e);
            websocket_broadcaster.remove_connection(connection_id).await;
            return;
        }

        let app_handle_clone: AppHandle = app_handle.clone();
        let outgoing_task = tauri::async_runtime::spawn(async move {
            let websocket_broadcaster = app_handle_clone.state::<WebSocketBroadcaster>();

            while let Some(message) = rx.recv().await {
                if let Err(e) = sender.send(message).await {
                    log::error!("WebSocket send error: {}", e);
                    break;
                }
            }
            websocket_broadcaster.remove_connection(connection_id).await;
        });

        while let Some(msg) = receiver.next().await {
            match msg {
                Ok(Message::Text(text)) => websocket_broadcaster.broadcast_text(text).await,

                Ok(Message::Close(_)) => {
                    log::info!("WebSocket connection closed");
                    break;
                }
                Ok(Message::Ping(data)) => {
                    if let Err(e) = websocket_broadcaster
                        .send_to_client(connection_id, Message::Pong(data))
                        .await
                    {
                        log::error!("WebSocket pong error: {}", e);
                        websocket_broadcaster.remove_connection(connection_id).await;
                        break;
                    }
                }
                // Ok(Message::Pong(_)) => {
                // }
                Err(e) => {
                    log::error!("WebSocket error: {}", e);
                    break;
                }
                _ => {}
            }
        }

        outgoing_task.abort();
        websocket_broadcaster.remove_connection(connection_id).await;
        log::info!("WebSocket connection ended");
    }

    async fn send_settings(tx: Tx, app: AppHandle) -> Result<(), String> {
        let database_service = app.state::<DatabaseService>();

        let settings = database_service.get_settings().await?;
        if let Some(settings) = settings {
            let json = serde_json::to_string(&EventMessage {
                event: AppEvent::Settings,
                data: settings,
            })
            .map_err(|e| e.to_string())?;

            tx.send(Message::Text(json.into()))
                .map_err(|e| e.to_string())?;
        }

        let media_settings = database_service.get_media_settings().await?;
        if let Some(media_settings) = media_settings {
            let json = serde_json::to_string(&EventMessage {
                event: AppEvent::MediaSettings,
                data: media_settings,
            })
            .map_err(|e| e.to_string())?;

            tx.send(Message::Text(json.into()))
                .map_err(|e| e.to_string())?;
        }

        let alerts = database_service.get_alerts().await?;
        let json = serde_json::to_string(&EventMessage {
            event: AppEvent::Alerts,
            data: alerts,
        })
        .map_err(|e| e.to_string())?;

        tx.send(Message::Text(json.into()))
            .map_err(|e| e.to_string())?;

        let auc_fighter_settings = database_service.get_auc_fighter_settings().await?;
        if let Some(auc_fighter_settings) = auc_fighter_settings {
            let json = serde_json::to_string(&EventMessage {
                event: AppEvent::AucFighterSettings,
                data: auc_fighter_settings,
            })
            .map_err(|e| e.to_string())?;

            tx.send(Message::Text(json.into()))
                .map_err(|e| e.to_string())?;
        }

        let nsfw_settings = database_service.get_nsfw_settings().await?;
        if let Some(nsfw_settings) = nsfw_settings {
            let json = serde_json::to_string(&EventMessage {
                event: AppEvent::NsfwSettings,
                data: nsfw_settings,
            })
            .map_err(|e| e.to_string())?;

            tx.send(Message::Text(json.into()))
                .map_err(|e| e.to_string())?;
        }

        Ok(())
    }
}
