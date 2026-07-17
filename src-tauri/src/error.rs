use serde::Serialize;
use thiserror::Error;

#[derive(Debug, Error, Serialize)]
pub enum WidyError {
    #[error("Not found {0}")]
    NotFound(String),
}
