use entity::commands::AuctionAction;

use crate::services::UnifiedChatMessage;

pub fn calc_command_auction_action_amount(
    auction_action: &AuctionAction,
    message: &UnifiedChatMessage,
) -> f32 {
    let regular_luck_modifier = auction_action.regular_luck_modifier;
    let subscriber_luck_modifier = message
        .sender
        .roles
        .is_subscriber
        .then_some(auction_action.subscriber_luck_modifier)
        .unwrap_or(1.0);
    let moderator_luck_modifier = message
        .sender
        .roles
        .is_subscriber
        .then_some(auction_action.moderator_luck_modifier)
        .unwrap_or(1.0);
    let vip_luck_modifier = message
        .sender
        .roles
        .is_subscriber
        .then_some(auction_action.vip_luck_modifier)
        .unwrap_or(1.0);
    let amount = regular_luck_modifier
        * subscriber_luck_modifier
        * vip_luck_modifier
        * moderator_luck_modifier;
    amount
}
