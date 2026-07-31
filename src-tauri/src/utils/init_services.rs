use crate::error::AppError;
use crate::services::kick::{KickBotService, KickService};
use crate::services::twitch::traits::TwitchApi;
use crate::services::twitch::{TwitchBotService, TwitchService};
use crate::services::{
    AxumService, CommandsService, ConfigService, DatabaseService, DeepLinkDispatcherService,
    DestreamService, DonatePayService, DonationAlertsService, ExchangeRatesService, MediaService,
    NsfwService, StreamElementsService, StreamLabsService, TributeService, TtsService,
    WebSocketBroadcaster, WidySolService, WidyTonService,
};
use crate::utils::copy_assets_to_static;
use lingua::Language::{
    Arabic, Chinese, English, French, German, Hindi, Portuguese, Russian, Spanish, Ukrainian,
};
use lingua::LanguageDetectorBuilder;
use serde::Serialize;
use std::sync::Arc;
use std::time::Duration;
use tauri::{AppHandle, Manager};
use tokio::sync::Mutex;

#[derive(Clone, Debug, Serialize)]

pub struct InitialState {
    pub error: Option<AppError>,
}

pub async fn init_services(app: AppHandle) -> Result<(), AppError> {
    let version = app.package_info().version.to_string();

    //http client
    let user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36";
    let reqwest_client = reqwest::Client::builder()
        .user_agent(user_agent)
        .connect_timeout(Duration::from_secs(10))
        .timeout(Duration::from_secs(30))
        .build()
        .map_err(|e| {
            log::error!("reqwest build error: {}", e);
            AppError::Custom(e.to_string())
        })?;
    let result = reqwest_client.get("https://google.com").send().await;
    if let Err(_) = result {
        return Err(AppError::Internet("Not connected".to_string()));
    }
    app.manage(reqwest_client);

    //config
    let config_service = ConfigService::new(&app)?;
    app.manage(config_service.clone());

    //db
    let database_service = DatabaseService::new(&config_service.db_path, &version).await?;
    app.manage(database_service);

    //exchange
    let mut exchange_rates_service = ExchangeRatesService::new();
    exchange_rates_service.get_exchange_rates().await;
    app.manage(Mutex::new(exchange_rates_service));

    //ws
    let websocket_broadcaster = WebSocketBroadcaster::new();
    app.manage(websocket_broadcaster);

    //axum
    let axum_service = AxumService::new(
        &config_service.widget_path,
        &config_service.static_path,
        &config_service.auc_fighter_path,
    );
    axum_service.start(&app).await?;
    app.manage(axum_service);
    copy_assets_to_static(&config_service.assets_path, &config_service.static_path)?;

    //language detector
    let language_detector = LanguageDetectorBuilder::from_languages(&[
        English, French, German, Spanish, Russian, Ukrainian, Portuguese, Hindi, Chinese, Arabic,
    ])
    .build();
    app.manage(language_detector);

    //tts
    let tts_service = TtsService::new(&config_service.audio_path);
    app.manage(tts_service);

    //media
    let media_service = MediaService::new();
    app.manage(media_service);

    //twitch
    let twitch_service = TwitchService::new(config_service.twitch_client_id.clone());
    let _ = twitch_service.connect(&app).await;
    app.manage(twitch_service.clone());

    //twitch bot
    let twitch_bot_service = TwitchBotService::new(
        config_service.twitch_client_id,
        twitch_service.auth_endpoint(),
        twitch_service.api_endpoint(),
        twitch_service.eventsub_endpoint(),
    );
    let _ = twitch_bot_service.connect(&app).await;
    app.manage(twitch_bot_service);

    //kick
    let kick_service = KickService::new(
        config_service.kick_client_id,
        config_service.kick_token_endpoint,
        config_service.kick_redirect_uri,
        config_service.app_token.clone(),
    );
    let _ = kick_service.connect(&app).await;
    app.manage(kick_service);

    //kick bot
    let kick_bot_service = KickBotService::new(
        config_service.kick_bot_client_id,
        config_service.kick_bot_token_endpoint,
        config_service.kick_bot_redirect_uri,
        config_service.app_token,
    );
    let _ = kick_bot_service.connect(&app).await;
    app.manage(kick_bot_service);

    //stream elements
    let stream_elements_service = StreamElementsService::new();
    app.manage(stream_elements_service);

    //widy sol
    let widy_sol_service = Arc::new(WidySolService::new(&config_service.widy_sol_program_id));
    let _ = widy_sol_service.connect(&app).await;
    app.manage(widy_sol_service.clone());

    //widy sol
    let widy_ton_service = Arc::new(WidyTonService::new());
    let _ = widy_ton_service.connect(&app).await;
    app.manage(widy_ton_service.clone());

    //donation alerts
    let donation_alerts_service = DonationAlertsService::new();
    let _ = donation_alerts_service.connect(&app).await;
    app.manage(donation_alerts_service);

    //stream labs
    let stream_labs_service = StreamLabsService::new();
    let _ = stream_labs_service.connect(&app).await;
    app.manage(stream_labs_service);

    //donate pay
    let donate_pay_service = DonatePayService::new();
    let _ = donate_pay_service.connect(&app).await;
    app.manage(donate_pay_service);

    //destream
    let destream_service = DestreamService::new();
    let _ = destream_service.connect(&app).await;
    app.manage(destream_service);

    //tribute
    let tribute_service = TributeService::new();
    let _ = tribute_service.connect(&app).await;
    app.manage(tribute_service);

    //deep link
    let mut deep_link_dispatcher_service = DeepLinkDispatcherService::new();
    deep_link_dispatcher_service.register(widy_sol_service);
    deep_link_dispatcher_service.register(widy_ton_service);
    app.manage(deep_link_dispatcher_service);

    //nsfw
    let nsfw_service = NsfwService::new();
    app.manage(nsfw_service);

    //commands
    let commands_service = CommandsService::new();
    commands_service.start(&app).await?;
    app.manage(commands_service);

    Ok(())
}
