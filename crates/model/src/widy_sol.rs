use anchor_client::anchor_lang::event;
use anchor_lang::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone)]
#[event]
pub struct DonationEvent {
    pub message: Option<String>,
    pub name: Option<String>,
    pub amount: u64,
    pub donation_referral_amount: u64,
    pub user_amount: u64,
    pub user_referral_amount: u64,
    pub fee_recipient_amount: u64,
    pub user: Pubkey,
    pub sender: Pubkey,
    pub fee_recipient: Pubkey,
    pub donation_referral: Pubkey,
    pub user_referral: Pubkey,
}

#[derive(Debug, Clone, Deserialize, Serialize, PartialEq)]
#[serde(rename_all = "lowercase")]
pub enum WidyNetwork {
    Ton,
    Sol,
}

#[derive(Debug, Clone, Deserialize, Serialize)]
pub struct DeepLinkQueryParams {
    pub nonce: String,
    pub donation_account_name: String,
    pub donation_account_address: String,
    pub user: String,
    pub network: WidyNetwork,
}
