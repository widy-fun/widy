use serde::de::DeserializeOwned;

use crate::{error::AppError, utils::log_and_wrap_error};

pub async fn send_request<T: DeserializeOwned>(
    request: reqwest::RequestBuilder,
    context: &str,
    service: &str,
) -> Result<Option<T>, AppError> {
    let response = request
        .send()
        .await
        .map_err(|e| log_and_wrap_error(&format!("{service}: {context} request failed"), e))?;

    let status = response.status();
    let body = response.text().await.map_err(|e| {
        log_and_wrap_error(
            &format!("{service}: {context} failed to read response body"),
            e,
        )
    })?;

    if !status.is_success() {
        return Err(log_and_wrap_error(
            &format!("{service}: {context} error"),
            AppError::HttpStatus {
                status: status.as_u16(),
                body,
            },
        ));
    }

    if body.trim().is_empty() {
        return Ok(None);
    }

    serde_json::from_str(&body).map(Some).map_err(|e| {
        log_and_wrap_error(
            &format!("{service}: {context} failed to parse response"),
            AppError::ParseError(e.to_string()),
        )
    })
}
