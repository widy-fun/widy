use serde::Serialize;
use thiserror::Error;

#[derive(Debug, Error, Serialize)]
pub enum WidyError {
    #[error("Item not found {0}")]
    NotFound(String),
}
