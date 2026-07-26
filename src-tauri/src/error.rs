use serde::Serialize;
use thiserror::Error;

#[derive(Debug, Error, Serialize)]
pub enum AppError {
    #[error("HTTP request failed: {0}")]
    HttpRequest(String),

    #[error("HTTP error: status {status}, body: {body}")]
    HttpStatus { status: u16, body: String },

    #[error("Failed to parse response: {0}")]
    ParseError(String),
}

impl From<reqwest::Error> for AppError {
    fn from(error: reqwest::Error) -> Self {
        if let Some(status) = error.status() {
            Self::HttpStatus {
                status: status.as_u16(),
                body: error.to_string(),
            }
        } else {
            Self::HttpRequest(error.to_string())
        }
    }
}
