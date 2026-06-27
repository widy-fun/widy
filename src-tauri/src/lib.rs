pub mod commands;
pub mod constants;
pub mod enums;
pub mod repositories;
pub mod services;
pub mod utils;
use crate::commands::*;
use tauri::Manager;
use tauri_plugin_deep_link::DeepLinkExt;
use tokio::sync::Mutex;
use utils::register_shortcuts;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let mut builder = tauri::Builder::default()
        .plugin(tauri_plugin_deep_link::init())
        .plugin(tauri_plugin_opener::init());

    #[cfg(debug_assertions)]
    {
        let devtools = tauri_plugin_devtools::init();
        builder = builder.plugin(devtools);
    }

    #[cfg(not(debug_assertions))]
    {
        use tauri_plugin_log::RotationStrategy;

        let log_plugin = tauri_plugin_log::Builder::new()
            .level(log::LevelFilter::Error)
            .rotation_strategy(RotationStrategy::KeepSome(2))
            .build();

        builder = builder.plugin(log_plugin);
    }

    builder
        .setup(|app: &mut tauri::App| {
            let app_handle = app.handle().clone();
            register_shortcuts(&app_handle)?;
            app.deep_link().register("widy")?;
            app.deep_link().on_open_url(move |event| {
                let deep_link_dispatcher_service =
                    app_handle.state::<services::DeepLinkDispatcherService>();
                for url in event.urls() {
                    deep_link_dispatcher_service.dispatch(&url, &app_handle);
                }
            });
            Ok(())
        })
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_single_instance::init(|_, _, _| {}))
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .manage(ExecutionFlag(Mutex::new(false)))
        .invoke_handler(tauri::generate_handler![
            get_alert_by_id,
            get_alerts,
            get_settings,
            update_alert_settings,
            create_alert,
            delete_alert_by_id,
            update_settings,
            get_media_settings,
            update_media_settings,
            get_auction_settings,
            get_maption_settings,
            update_auction_settings,
            update_maption_settings,
            get_auc_fighter_settings,
            update_auc_fighter_settings,
            create_goal,
            update_goal_settings,
            get_goals,
            get_goal_by_id,
            get_not_ended_goal,
            get_not_ended_goals,
            finish_goal,
            update_service_auth,
            get_services,
            get_service_by_id,
            stream_elements_tip_event,
            get_exchange_rates,
            get_device_code,
            get_token,
            twitch_connect,
            get_messages,
            update_service_settings,
            get_service_with_auth_by_id,
            twitch_sign_out,
            get_widy_nonce,
            widy_sol_sign_out,
            widy_ton_sign_out,
            donation_alerts_connect,
            donation_alerts_sign_out,
            stream_labs_connect,
            stream_labs_sign_out,
            get_widget_by_id,
            add_widget,
            get_widgets,
            delete_widget,
            install_widget,
            update_widget,
            get_windows,
            start_nsfw,
            stop_nsfw,
            get_nsfw_settings,
            update_nsfw_settings,
            donate_pay_connect,
            donate_pay_sign_out,
            destream_connect,
            destream_sign_out,
            tribute_connect,
            tribute_sign_out,
            get_rewards,
            twitch_add_custom_reward,
            twitch_remove_custom_reward,
            get_reward_by_id,
            update_reward_settings,
            kick_authorize,
            kick_sign_out,
            kick_add_custom_reward,
            kick_remove_custom_reward,
            get_reward_by_title,
            init
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
