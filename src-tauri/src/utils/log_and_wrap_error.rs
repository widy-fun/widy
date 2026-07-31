use crate::error::AppError;

pub fn log_and_wrap_error<E>(context: &str, e: E) -> AppError
where
    E: Into<AppError>,
{
    let err = e.into();
    log::error!("{context}: {err}");
    err
}
