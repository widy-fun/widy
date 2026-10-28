use axum::{
    Json, Router,
    extract::{
        State, WebSocketUpgrade,
        ws::{Message, WebSocket},
    },
    http::StatusCode,
    response::{
        Response,
        sse::{Event, KeepAlive, Sse},
    },
    routing::{get, post},
};
use model::CliEvent;
use std::convert::Infallible;
use tokio::sync::broadcast::{self, Sender};
use tokio_stream::{Stream, StreamExt, wrappers::BroadcastStream};

#[derive(Clone)]
struct AppState {
    tribute: broadcast::Sender<String>,
    donation_alerts: broadcast::Sender<String>,
    destream: broadcast::Sender<String>,
    donate_pay: broadcast::Sender<String>,
    kick: broadcast::Sender<String>,
}

async fn event_emit(State(s): State<AppState>, Json(body): Json<serde_json::Value>) -> StatusCode {
    match serde_json::from_value(body) {
        Ok(CliEvent::TributeDonation(e)) => {
            let _ = s.tribute.send(serde_json::to_string(&e).unwrap());
        }
        Ok(CliEvent::DonationAlertsDonation(e)) => {
            let _ = s.donation_alerts.send(serde_json::to_string(&e).unwrap());
        }
        Ok(CliEvent::DestreamDonation(e)) => {
            let _ = s.destream.send(format!(
                "{}{}",
                serde_json::to_string(&e).unwrap(),
                char::from(30)
            ));
        }
        Ok(CliEvent::DonatePayDonation(e)) => {
            let _ = s.donate_pay.send(serde_json::to_string(&e).unwrap());
        }
        Ok(CliEvent::Kick(e)) => {
            let _ = s.kick.send(serde_json::to_string(&e).unwrap());
        }
        Err(_) => return StatusCode::BAD_REQUEST,
    }
    StatusCode::OK
}

async fn tribute_sse(
    State(s): State<AppState>,
) -> Sse<impl Stream<Item = Result<Event, Infallible>>> {
    handle_sse(s.tribute)
}

async fn donation_alerts_ws(ws: WebSocketUpgrade, State(state): State<AppState>) -> Response {
    ws.on_upgrade(move |socket| handle_socket(socket, state.donation_alerts))
}

async fn destream_ws(ws: WebSocketUpgrade, State(state): State<AppState>) -> Response {
    ws.on_upgrade(move |socket| handle_socket(socket, state.destream))
}

async fn donate_pay_ws(ws: WebSocketUpgrade, State(state): State<AppState>) -> Response {
    ws.on_upgrade(move |socket| handle_socket(socket, state.donate_pay))
}

async fn kick_ws(ws: WebSocketUpgrade, State(state): State<AppState>) -> Response {
    ws.on_upgrade(move |socket| handle_socket(socket, state.kick))
}

async fn handle_socket(mut socket: WebSocket, sender: Sender<String>) {
    let mut rx = sender.subscribe();
    loop {
        tokio::select! {
            msg = rx.recv() => match msg {
                Ok(data) => {
                    if socket.send(Message::Text(data.into())).await.is_err() {
                        break;
                    }
                }
                Err(broadcast::error::RecvError::Lagged(_)) => continue,
                Err(broadcast::error::RecvError::Closed) => break,
            },

            incoming = socket.recv() => match incoming {
                Some(Ok(Message::Close(_))) | None | Some(Err(_)) => break,
                Some(Ok(_)) => {}
            },
        }
    }
}

fn handle_sse(sender: Sender<String>) -> Sse<impl Stream<Item = Result<Event, Infallible>>> {
    let stream = BroadcastStream::new(sender.subscribe())
        .filter_map(|m| m.ok())
        .map(|data| Ok(Event::default().data(data)));

    Sse::new(stream).keep_alive(KeepAlive::default())
}

#[tokio::main]
async fn main() {
    let (tribute, _) = broadcast::channel(64);
    let (donation_alerts, _) = broadcast::channel(64);
    let (destream, _) = broadcast::channel(64);
    let (donate_pay, _) = broadcast::channel(64);
    let (kick, _) = broadcast::channel(64);

    let app = Router::new()
        .route("/sse/tribute", get(tribute_sse))
        .route("/ws/donation-alert", get(donation_alerts_ws))
        .route("/ws/destream", get(destream_ws))
        .route("/ws/donate-pay", get(donate_pay_ws))
        .route("/ws/kick", get(kick_ws))
        .route("/events", post(event_emit))
        .with_state(AppState {
            tribute,
            donation_alerts,
            destream,
            donate_pay,
            kick,
        });

    let listener = tokio::net::TcpListener::bind("127.0.0.1:3777")
        .await
        .unwrap();
    println!("mock-server on http://127.0.0.1:3777");
    axum::serve(listener, app).await.unwrap();
}
