use serde::de::DeserializeOwned;

pub async fn send_request<T: DeserializeOwned>(
    request: reqwest::RequestBuilder,
    context: &str,
    service: &str,
) -> Result<Option<T>, String> {
    let response = request.send().await.map_err(|e| {
        log::error!("{service}: {context} request failed: {e}");
        e.to_string()
    })?;

    let status = response.status();
    let body = response.text().await.map_err(|e| {
        log::error!("{service}: {context} failed to read response body: {e}");
        e.to_string()
    })?;

    if !status.is_success() {
        log::error!("{service}: {context} error ({status}): {body}");
        return Err(body);
    }

    if body.trim().is_empty() {
        return Ok(None);
    }

    serde_json::from_str(&body).map(Some).map_err(|e| {
        log::error!("{service}: {context} failed to parse response: {e}");
        e.to_string()
    })
}
