use std::num::ParseIntError;

use foundry_local_sdk::FoundryLocalError;
use ndarray::ShapeError;
use ort::session::builder::SessionBuilder;
use serde::Serialize;
use thiserror::Error;
use tokio::task::JoinError;
use xcap::XCapError;
use zip::result::ZipError;

#[derive(Debug, Clone, Error, Serialize)]
#[serde(tag = "kind", content = "data")]
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
    DbError(String),

    #[error("Zip error: {0}")]
    Zip(String),

    #[error("WidySol error: {0}")]
    WidySol(String),

    #[error("StreamLabs error: {0}")]
    StreamLabs(String),

    #[error("Websocket error: {0}")]
    Websocket(String),

    #[error("NSFW error: {0}")]
    NSFW(String),

    #[error("{0}")]
    Custom(String),

    #[error("IO error: {0}")]
    Io(String),

    #[error("Internet error: {0}")]
    Internet(String),

    #[error("Piper error: {0}")]
    Piper(String),

    #[error("STT error: {0}")]
    STT(String),

    #[error("Audio error: {0}")]
    Audio(String),

    #[error("Ort error: {0}")]
    Ort(String),
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

impl From<sea_orm::DbErr> for AppError {
    fn from(err: sea_orm::DbErr) -> Self {
        AppError::DbError(err.to_string())
    }
}

impl From<std::io::Error> for AppError {
    fn from(err: std::io::Error) -> Self {
        AppError::Io(err.to_string())
    }
}

impl From<ZipError> for AppError {
    fn from(err: ZipError) -> Self {
        AppError::Zip(err.to_string())
    }
}

impl From<anchor_client::ClientError> for AppError {
    fn from(err: anchor_client::ClientError) -> Self {
        AppError::WidySol(err.to_string())
    }
}

impl From<XCapError> for AppError {
    fn from(err: XCapError) -> Self {
        AppError::Custom(err.to_string())
    }
}

impl From<cpal::Error> for AppError {
    fn from(err: cpal::Error) -> Self {
        AppError::Audio(err.to_string())
    }
}

impl From<ort::Error> for AppError {
    fn from(err: ort::Error) -> Self {
        AppError::Ort(err.to_string())
    }
}

impl From<ShapeError> for AppError {
    fn from(err: ShapeError) -> Self {
        AppError::Custom(err.to_string())
    }
}

impl From<FoundryLocalError> for AppError {
    fn from(err: FoundryLocalError) -> Self {
        AppError::Ort(err.to_string())
    }
}

impl From<JoinError> for AppError {
    fn from(err: JoinError) -> Self {
        AppError::Custom(err.to_string())
    }
}

impl From<serde_json::Error> for AppError {
    fn from(err: serde_json::Error) -> Self {
        AppError::ParseError(err.to_string())
    }
}

impl From<ParseIntError> for AppError {
    fn from(err: ParseIntError) -> Self {
        AppError::Custom(err.to_string())
    }
}

impl From<ort::Error<SessionBuilder>> for AppError {
    fn from(err: ort::Error<SessionBuilder>) -> Self {
        AppError::Ort(err.to_string())
    }
}
