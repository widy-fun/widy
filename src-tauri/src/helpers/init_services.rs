use crate::services::assistant::AssistantService;
use crate::services::claude::ClaudeService;
use crate::services::fish_audio::FishAudioService;
use crate::services::gemini::GeminiService;
use crate::services::kick::{KickBotService, KickService, KickSessionService};
use crate::services::media::MediaService;
use crate::services::obs_service::ObsService;
use crate::services::openai::OpenAIService;
use crate::services::telegram_bot::telegram_bot_service::TelegramBotService;
use crate::services::tts::TtsService;
use crate::services::twitch::{TwitchBotService, TwitchService};
use crate::services::{
    AxumService, CommandsService, ConfigService, DeepLinkDispatcherService, DestreamService,
    DonatePayService, DonationAlertsService, ExchangeRatesService, NsfwService,
    StreamElementsService, StreamLabsService, TributeService, WebSocketBroadcaster, WidySolService,
    WidyTonService,
};
use crate::utils::copy_assets_to_static;
use database::DatabaseService;
use lingua::Language::{
    Arabic, Chinese, English, French, German, Hindi, Portuguese, Russian, Spanish, Ukrainian,
};
use lingua::LanguageDetectorBuilder;
use model::error::AppError;
use std::sync::Arc;
use std::time::Duration;
use tauri::{AppHandle, Manager};

pub async fn init_services(app: AppHandle) -> Result<(), AppError> {
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
    let response = reqwest_client.get("https://google.com").send().await;
    if let Err(_) = response {
        return Err(AppError::Internet("Not connected".to_string()));
    }
    app.manage(reqwest_client.clone());

    //config
    let config_service = ConfigService::new(&app)?;
    app.manage(config_service.clone());

    //db
    let database_service = DatabaseService::new(&config_service.db_path).await?;
    app.manage(database_service);

    //exchange
    let exchange_rates_service = ExchangeRatesService::new();
    exchange_rates_service.get_exchange_rates().await;
    app.manage(exchange_rates_service);

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
    let tts_service = TtsService::new(
        &config_service.audio_path,
        &config_service.piper_voices_path,
        &config_service.piper_path,
    );
    app.manage(tts_service);

    //media
    let media_service = MediaService::new(reqwest_client.clone());
    app.manage(media_service);

    //commands
    let commands_service = CommandsService::new();
    commands_service.start(&app).await?;
    app.manage(commands_service);

    //twitch bot
    let twitch_bot_service = TwitchBotService::new(
        config_service.twitch_client_id.clone(),
        reqwest_client.clone(),
        config_service.twitch_auth_endpoint.clone(),
        config_service.twitch_api_endpoint.clone(),
        config_service.twitch_eventsub_endpoint.clone(),
    );
    app.manage(twitch_bot_service);

    //twitch
    let twitch_service = TwitchService::new(
        config_service.twitch_client_id,
        reqwest_client.clone(),
        config_service.twitch_auth_endpoint.clone(),
        config_service.twitch_api_endpoint.clone(),
        config_service.twitch_eventsub_endpoint.clone(),
    );
    app.manage(twitch_service.clone());

    //kick bot
    let kick_bot_service = KickBotService::new(
        config_service.kick_bot_client_id,
        config_service.kick_bot_token_endpoint,
        config_service.kick_bot_redirect_uri,
        config_service.app_token.clone(),
        reqwest_client.clone(),
    );
    app.manage(kick_bot_service);

    //kick session
    let kick_session_service = KickSessionService::new(reqwest_client.clone());
    app.manage(kick_session_service);

    //kick
    let kick_service = KickService::new(
        config_service.kick_client_id,
        config_service.kick_token_endpoint,
        config_service.kick_redirect_uri,
        config_service.app_token.clone(),
        reqwest_client.clone(),
    );
    app.manage(kick_service);

    //stream elements
    let stream_elements_service = StreamElementsService::new();
    app.manage(stream_elements_service);

    //widy sol
    let widy_sol_service = Arc::new(WidySolService::new(&config_service.widy_sol_program_id));
    app.manage(widy_sol_service.clone());

    //widy sol
    let widy_ton_service = Arc::new(WidyTonService::new());
    app.manage(widy_ton_service.clone());

    //donation alerts
    let donation_alerts_service = DonationAlertsService::new();
    app.manage(donation_alerts_service);

    //stream labs
    let stream_labs_service = StreamLabsService::new();
    app.manage(stream_labs_service);

    //donate pay
    let donate_pay_service = DonatePayService::new();
    app.manage(donate_pay_service);

    //destream
    let destream_service = DestreamService::new();
    app.manage(destream_service);

    //tribute
    let tribute_service = TributeService::new();
    app.manage(tribute_service);

    //deep link
    let mut deep_link_dispatcher_service = DeepLinkDispatcherService::new();
    deep_link_dispatcher_service.register(widy_sol_service);
    deep_link_dispatcher_service.register(widy_ton_service);
    app.manage(deep_link_dispatcher_service);

    //nsfw
    let nsfw_service = NsfwService::new();
    app.manage(nsfw_service);

    //openai
    let openai_service = OpenAIService::new();
    app.manage(openai_service);

    //gemini
    let gemini_service = GeminiService::new();
    app.manage(gemini_service);

    //claude
    let claude_service = ClaudeService::new();
    app.manage(claude_service);

    //fish audio
    let fish_audio_service = FishAudioService::new(reqwest_client.clone());
    app.manage(fish_audio_service);

    //telegram bot
    let telegram_bot_service = TelegramBotService::new();
    app.manage(telegram_bot_service);

    //obs
    let obs_service = ObsService::new();
    app.manage(obs_service);

    //ai assistant
    let assistant_service = AssistantService::new();
    app.manage(assistant_service);

    let kick_service = app.state::<KickService>();
    let obs_service = app.state::<ObsService>();
    let telegram_bot_service = app.state::<TelegramBotService>();
    let fish_audio_service = app.state::<FishAudioService>();
    let claude_service = app.state::<ClaudeService>();
    let gemini_service = app.state::<GeminiService>();
    let openai_service = app.state::<OpenAIService>();
    let tribute_service = app.state::<TributeService>();
    let destream_service = app.state::<DestreamService>();
    let donate_pay_service = app.state::<DonatePayService>();
    let stream_labs_service = app.state::<StreamLabsService>();
    let donation_alerts_service = app.state::<DonationAlertsService>();
    let widy_ton_service = app.state::<Arc<WidyTonService>>();
    let widy_sol_service = app.state::<Arc<WidySolService>>();
    let kick_session_service = app.state::<KickSessionService>();
    let kick_bot_service = app.state::<KickBotService>();
    let twitch_service = app.state::<TwitchService>();
    let twitch_bot_service = app.state::<TwitchBotService>();

    let _ = tokio::join!(
        kick_service.connect(&app),
        obs_service.connect(&app),
        telegram_bot_service.connect(&app),
        fish_audio_service.connect(&app),
        claude_service.connect(&app),
        gemini_service.connect(&app),
        openai_service.connect(&app),
        tribute_service.connect(&app),
        destream_service.connect(&app),
        donate_pay_service.connect(&app),
        stream_labs_service.connect(&app),
        donation_alerts_service.connect(&app),
        widy_ton_service.connect(&app),
        widy_sol_service.connect(&app),
        kick_session_service.connect(&app),
        kick_bot_service.connect(&app),
        twitch_service.connect(&app),
        twitch_bot_service.connect(&app),
    );

    Ok(())
}
