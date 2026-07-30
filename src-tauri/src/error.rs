use serde::Serialize;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum AppError {
    #[error("HTTP request failed: {0}")]
    HttpRequest(String),

    #[error("HTTP error: status {status}, body: {body}")]
    HttpStatus { status: u16, body: String },

    #[error("Failed to parse response: {0}")]
    ParseError(String),

    #[error("Configuration error: {0}")]
    Config(String),

    #[error("Database error: {0}")]
    DbError(#[from] sea_orm::DbErr),

    #[error("{0}")]
    Custom(String),

    #[error("IO error: {0}")]
    Io(#[from] std::io::Error),
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

impl Serialize for AppError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_str(&self.to_string())
    }
}
