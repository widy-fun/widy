use model::{
    destream::DestreamEvent, donate_pay::WidgetEvent, donation_alerts::DonationMessage,
    kick::KickPushMessage, tribute::TributeEvent,
};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub enum CliEvent {
    TributeDonation(TributeEvent),
    DonationAlertsDonation(DonationMessage),
    DestreamDonation(DestreamEvent),
    DonatePayDonation(WidgetEvent),
    Kick(KickPushMessage),
}
