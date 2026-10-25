use anyhow::Result;
use clap::{Parser, Subcommand};
use entity::settings::Currency;
use mock::CliEvent;
use model::{
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
use uuid::Uuid;

const ENDPOINT: &str = "http://127.0.0.1:3777/events";

#[derive(Parser)]
#[command(
    name = "mock-cli",
    about = "Trigger events and send them to the local server"
)]
struct Cli {
    #[arg(long, default_value_t = 1, help = "Count of events to fire")]
    count: usize,
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    TributeDonation,
    DonationAlertsDonation,
    DestreamDonation,
    DonatePayDonation,
    KickKicksGifted,
}

fn main() -> Result<()> {
    let cli = Cli::parse();
    let client = reqwest::blocking::Client::new();

    for _ in 0..cli.count {
        let event = create_event(&cli.command)?;

        println!("Sending: {}", serde_json::to_string(&event)?);

        let response = client.post(ENDPOINT).json(&event).send()?;
        let status = response.status();
        let text = response.text()?;
        println!("Response [{status}]: {text}");

        if !status.is_success() {
            anyhow::bail!("Server returned {status}");
        }
    }

    Ok(())
}

fn create_event(command: &Commands) -> Result<CliEvent> {
    let mocked_message = "Mocked message".to_string();
    let mocked_name = "mocked_name".to_string();

    let event = match command {
        Commands::TributeDonation => CliEvent::TributeDonation(TributeEvent {
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
        Commands::DonationAlertsDonation => CliEvent::DonationAlertsDonation(DonationMessage {
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
        Commands::DestreamDonation => CliEvent::DestreamDonation(DestreamEvent {
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
        Commands::DonatePayDonation => CliEvent::DonatePayDonation(WidgetEvent {
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
        Commands::KickKicksGifted => CliEvent::Kick(KickPushMessage {
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
    };

    Ok(event)
}
