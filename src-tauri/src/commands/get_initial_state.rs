use crate::{error::AppError, utils::InitialState};

use tauri::State;

#[tauri::command]
pub async fn get_initial_state(
    initial_state: State<'_, InitialState>,
) -> Result<InitialState, AppError> {
    Ok(initial_state.inner().clone())
}
