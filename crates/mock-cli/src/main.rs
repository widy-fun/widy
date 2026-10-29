use anyhow::Result;
use clap::{Parser, Subcommand};
use database::{AlertsRepository, DatabaseService};
use entity::{
    alerts::{
        self, AlertVariant, AlertVariationConditions, TextAnimation, TextAnimationVariant,
        TextStyle, ViewType,
    },
    messages::MessageType,
    settings::Currency,
    tts::{EdgeTtsExtra, Gender, TtsExtra, TtsSettings, TtsType},
};
use model::{
    CliEvent,
    destream::{DestreamEvent, EventArgument},
    donate_pay::{EventNotification, EventResult, InnerData, NotificationType, WidgetEvent},
    donation_alerts::{Donation, DonationMessage, DonationMessageData, DonationMessageResult},
    kick::{
        Event, EventPayload, Gift, KickPub, KickPubData, KickPushMessage, KicksGiftedData,
        KicksSender,
    },
    tribute::{EventData, EventType, TributeEvent},
};
use rand::RngExt;
use std::path::PathBuf;
use uuid::Uuid;

const ENDPOINT: &str = "http://127.0.0.1:3777/events";

const IDENTIFIER: &str = "fun.widy.client";

#[derive(Parser)]
#[command(
    name = "mock-cli",
    about = "Trigger mock events and manage the mocked database"
)]
struct Cli {
    /// Count of items to create/fire (works anywhere on the command line)
    #[arg(long, global = true, default_value_t = 1)]
    count: usize,
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Send mock events to the local server
    Event {
        #[command(subcommand)]
        kind: EventKind,
    },
    /// Manage the mocked database
    Db {
        #[command(subcommand)]
        action: DbAction,
    },
}

#[derive(Subcommand)]
enum EventKind {
    /// Donation events: `event donate <platform>`
    Donate {
        #[command(subcommand)]
        platform: DonatePlatform,
    },
    /// Kick events: `event kick <event>`
    Kick {
        #[command(subcommand)]
        event: KickEvent,
    },
}

#[derive(Subcommand)]
enum DonatePlatform {
    Tribute,
    DonationAlerts,
    Destream,
    DonatePay,
}

#[derive(Subcommand)]
enum KickEvent {
    KicksGifted,
}

#[derive(Subcommand)]
enum DbAction {
    Create {
        #[command(subcommand)]
        entity: DbEntity,
    },
}

#[derive(Subcommand)]
enum DbEntity {
    Alerts,
}

#[tokio::main]
async fn main() -> Result<()> {
    let cli = Cli::parse();

    match cli.command {
        Commands::Event { kind } => run_events(&kind, cli.count).await,
        Commands::Db { action } => run_db(&action, cli.count).await,
    }
}

async fn run_events(kind: &EventKind, count: usize) -> Result<()> {
    let client = reqwest::Client::new();

    for _ in 0..count {
        let event = create_event(kind)?;

        println!("Sending: {}", serde_json::to_string(&event)?);

        let response = client.post(ENDPOINT).json(&event).send().await?;
        let status = response.status();
        let text = response.text().await?;
        println!("Response [{status}]: {text}");

        if !status.is_success() {
            anyhow::bail!("Server returned {status}");
        }
    }

    Ok(())
}

async fn run_db(action: &DbAction, count: usize) -> Result<()> {
    let path = app_local_data_dir()?;
    let database_service = DatabaseService::new(&path.join("mocked_database.db")).await?;
    for _ in 0..count {
        create_database_action(action, &database_service).await?;
    }
    Ok(())
}

async fn create_database_action(
    action: &DbAction,
    database_service: &DatabaseService,
) -> Result<()> {
    match action {
        DbAction::Create { entity } => match entity {
            DbEntity::Alerts => {
                let text_style = TextStyle {
                    font_size: 60,
                    text_color: "rgb(255,255,255,1)".to_string(),
                    bold: true,
                    italics: false,
                    underline: false,
                    letter_spacing: 0,
                    word_spacing: 0,
                    animation: TextAnimation::No,
                    animation_variant: TextAnimationVariant::AllText,
                };
                database_service
                    .create_alert(alerts::Model {
                        id: Uuid::new_v4(),
                        r#type: MessageType::Donation,
                        audio: None,
                        audio_volume: 50,
                        image: None,
                        alert_variant: AlertVariant::Audio,
                        video: None,
                        video_volume: 50,
                        group_id: "1".to_string(),
                        name: "mocked_alert".to_string(),
                        view_type: ViewType::Top,
                        status: true,
                        amount: 50,
                        delay: 0,
                        duration: 3000,
                        variation_conditions: AlertVariationConditions::Random,
                        tts_settings: TtsSettings {
                            r#type: TtsType::Edge,
                            volume: 50,
                            extra: Some(TtsExtra::Edge(EdgeTtsExtra {
                                gender: Gender::Male,
                            })),
                            models: None,
                        },
                        title_style: text_style.clone(),
                        title_template: "{{user_name}} donated {{amount}} {{currency}}".to_string(),
                        message_style: text_style,
                        reward_id: None,
                        command_id: None,
                    })
                    .await?
            }
        },
    }
    Ok(())
}

fn create_event(kind: &EventKind) -> Result<CliEvent> {
    let mocked_message = "Mocked message".to_string();
    let mocked_name = "mocked_name".to_string();

    let event = match kind {
        EventKind::Donate { platform } => match platform {
            DonatePlatform::Tribute => CliEvent::TributeDonation(TributeEvent {
                id: Uuid::new_v4().to_string(),
                data: EventData {
                    r#type: EventType::Donation,
                    donation_id: rand::random(),
                    author: rand::random(),
                    display_name: Some(mocked_name),
                    amount: rand::rng().random_range(100..=100000),
                    currency: Currency::EUR,
                    message: Some(mocked_message),
                },
            }),
            DonatePlatform::DonationAlerts => CliEvent::DonationAlertsDonation(DonationMessage {
                result: DonationMessageResult {
                    channel: "mocked_channel".to_string(),
                    data: DonationMessageData {
                        seq: rand::random(),
                        data: Donation {
                            id: rand::random(),
                            name: mocked_name.clone(),
                            username: Some(mocked_name),
                            message: Some(mocked_message),
                            message_type: "donation".to_string(),
                            payin_system: Some("mocked_payin_system".to_string()),
                            amount: rand::rng().random_range(100.0..=100000.0),
                            amount_in_user_currency: rand::rng().random_range(100.0..=100000.0),
                            currency: Currency::EUR,
                            recipient_name: "mocked_recipient_name".to_string(),
                            is_shown: 0,
                        },
                    },
                },
            }),
            DonatePlatform::Destream => CliEvent::DestreamDonation(DestreamEvent {
                r#type: 1,
                target: model::destream::EventTarget::NewDonationsReceived,
                arguments: vec![EventArgument {
                    test_data: vec![model::destream::Donation {
                        id: Uuid::new_v4().to_string(),
                        description: Some(mocked_message.clone()),
                        username: Some(mocked_name.clone()),
                        moderated: false,
                        user_display_currency_id: Currency::EUR,
                        user_display_currency_amount: rand::rng().random_range(100.0..=100000.0),
                        source_currency_id: Currency::EUR,
                        source_currency_amount: rand::rng().random_range(100.0..=100000.0),
                    }],
                    data: vec![model::destream::Donation {
                        id: Uuid::new_v4().to_string(),
                        description: Some(mocked_message),
                        username: Some(mocked_name),
                        moderated: false,
                        user_display_currency_id: Currency::EUR,
                        user_display_currency_amount: rand::rng().random_range(100.0..=100000.0),
                        source_currency_id: Currency::EUR,
                        source_currency_amount: rand::rng().random_range(100.0..=100000.0),
                    }],
                }],
            }),
            DonatePlatform::DonatePay => CliEvent::DonatePayDonation(WidgetEvent {
                result: EventResult {
                    channel: "mocked_channel".to_string(),
                    data: model::donate_pay::EventData {
                        data: InnerData {
                            event_type: "mocked_event".to_string(),
                            notification: EventNotification {
                                notification_type: NotificationType::Donation,
                                user_id: rand::random(),
                                vars: serde_json::to_string(&model::donate_pay::EventVars {
                                    name: mocked_name,
                                    comment: Some(mocked_message),
                                    sum: rand::rng().random_range(100.0..=100000.0),
                                    target: "mocked_target".to_string(),
                                    video_link: "".to_string(),
                                    video_id: "".to_string(),
                                })?,
                            },
                        },
                        offset: rand::rng().random_range(100..=100000),
                    },
                },
            }),
        },
        EventKind::Kick { event } => match event {
            KickEvent::KicksGifted => CliEvent::Kick(KickPushMessage {
                push: KickPub {
                    r#pub: KickPubData {
                        data: EventPayload {
                            chanel: Some("mocked_chanel".to_string()),
                            data: serde_json::to_string(&KicksGiftedData {
                                gift_transaction_id: Uuid::new_v4().to_string(),
                                message: mocked_message,
                                sender: KicksSender {
                                    id: rand::random(),
                                    username: mocked_name.clone(),
                                    username_color: "mocked_color".to_string(),
                                    profile_picture: "mocked_picture".to_string(),
                                },
                                gift: Gift {
                                    gift_id: Uuid::new_v4().to_string(),
                                    name: mocked_name,
                                    amount: rand::rng().random_range(100..=100000),
                                    r#type: "Kicks".to_string(),
                                    tier: "1".to_string(),
                                    character_limit: 300,
                                    pinned_time: 1,
                                },
                                created_at: "created_at".to_string(),
                                expires_at: "expires_at".to_string(),
                            })?,
                            event: Event::KicksGifted,
                        },
                    },
                },
            }),
        },
    };

    Ok(event)
}

fn app_local_data_dir() -> Result<PathBuf> {
    let base = dirs::data_local_dir()
        .ok_or_else(|| anyhow::anyhow!("could not determine local data dir"))?;
    Ok(base.join(IDENTIFIER))
}
