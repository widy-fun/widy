use crate::services::{AppEvent, EventMessage, WebSocketBroadcaster};
use tauri::{AppHandle, Manager};

pub fn register_shortcuts(app: &AppHandle) -> Result<(), Box<dyn std::error::Error>> {
    #[cfg(desktop)]
    {
        use tauri_plugin_global_shortcut::{
            Code, GlobalShortcutExt, Modifiers, Shortcut, ShortcutState,
        };

        let ctrl_f1_shortcut = Shortcut::new(Some(Modifiers::CONTROL), Code::F1);
        let ctrl_f2_shortcut = Shortcut::new(Some(Modifiers::CONTROL), Code::F2);
        app.plugin(
            tauri_plugin_global_shortcut::Builder::new()
                .with_handler(move |app_handle, shortcut, event| {
                    let app_handle = app_handle.clone();
                    let websocket_broadcaster = app_handle.state::<WebSocketBroadcaster>();
                    if shortcut == &ctrl_f1_shortcut {
                        match event.state() {
                            ShortcutState::Pressed => {
                                websocket_broadcaster.broadcast_event_message(&EventMessage {
                                    event: AppEvent::SkipPlayingAlert,
                                    data: None::<String>,
                                });
                            }
                            _ => {}
                        }
                    } else if shortcut == &ctrl_f2_shortcut {
                        match event.state() {
                            ShortcutState::Pressed => {
                                websocket_broadcaster.broadcast_event_message(&EventMessage {
                                    event: AppEvent::SkipPlayingMedia,
                                    data: None::<String>,
                                });
                            }
                            _ => {}
                        }
                    }
                })
                .build(),
        )?;

        let _ = app
            .global_shortcut()
            .register(ctrl_f1_shortcut)
            .map_err(|e| {
                log::error!("Register ctrl_f1 shortcut error: {}", e.to_string());
            });
        let _ = app
            .global_shortcut()
            .register(ctrl_f2_shortcut)
            .map_err(|e| {
                log::error!("Register ctrl_f2 shortcut error: {}", e.to_string());
            });
        Ok(())
    }
}
