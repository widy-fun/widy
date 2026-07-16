use chrono::Utc;
use entity::{
    alerts::TtsType,
    commands::UserLevel,
    commands_actions::CommandAction,
    donations::Donation,
    followers::Follow,
    goals::GoalType,
    messages::{ClientMessage, MessageType},
    raids::Raid,
    redemptions::Redemption,
    rewards::{Platform, RewardType},
    services::ServiceType,
    settings::Currency,
    subscriptions::Subscription,
};
use serde::Serialize;
use tauri::{AppHandle, Manager};
use tokio::sync::Mutex;
use uuid::Uuid;

use crate::{
    repositories::{
        CommandsActionsRepository, DonationsRepository, FollowsRepository, GoalsRepository,
        RaidsRepository, RedemptionsRepository, SettingsRepository, SubscriptionsRepository,
    },
    services::{
        DatabaseService, EventMessage, ExchangeRatesService, MediaService, TtsService,
        WebSocketBroadcaster,
    },
    utils::{get_alert_by_amount, remove_black_listed_words, remove_links},
};

#[derive(Serialize, Clone, Debug)]
pub enum AppEvent {
    Message,
    Media,
    Alert,
    SkipAlert,
    SkipPlayingAlert,
    SkipPlayingMedia,
    ReplayAlert,
    AlertPlaying,
    AlertPlayed,
    MediaPlaying,
    MediaPaused,
    PauseMedia,
    MediaPlayed,
    MediaEnd,
    MediaError,
    PlayMedia,
    SkipMedia,
    ReplayMedia,
    UpdateAlert,
    MakeAudioError,
    Settings,
    MediaSettings,
    StartAucFighterMatch,
    PauseAucFighterMatch,
    ResumeAucFighterMatch,
    AucFighterMatchEnd,
    AucFighterMatchPlaying,
    AucFighterMatchPaused,
    UpdateAucFighterMatch,
    CancelAucFighterMatch,
    AucFighterSettings,
    Goal,
    CreateDonationAccount,
    WidgetViewStorage,
    WidgetControlStorage,
    NsfwDetection,
    NsfwSettings,
    Donation,
    Redemption,
    ChatMessage,
    ChatMessageDelete,
    CommandAction,
}
impl AppEvent {
    pub fn as_str(e: AppEvent) -> &'static str {
        match e {
            AppEvent::Message => "Message",
            AppEvent::Media => "Media",
            AppEvent::SkipAlert => "SkipAlert",
            AppEvent::SkipPlayingAlert => "SkipPlayingAlert",
            AppEvent::SkipMedia => "SkipMedia",
            AppEvent::SkipPlayingMedia => "SkipPlayingMedia",
            AppEvent::AlertPlaying => "AlertPlaying",
            AppEvent::MediaPlaying => "MediaPlaying",
            AppEvent::MediaPaused => "MediaPaused",
            AppEvent::PauseMedia => "PauseMedia",
            AppEvent::MediaEnd => "MediaEnd",
            AppEvent::MediaError => "MediaError",
            AppEvent::ReplayMedia => "ReplayMedia",
            AppEvent::PlayMedia => "PlayMedia",
            AppEvent::MediaPlayed => "MediaPlayed",
            AppEvent::AlertPlayed => "AlertPlayed",
            AppEvent::MakeAudioError => "MakeAudioError",
            AppEvent::UpdateAlert => "UpdateAlert",
            AppEvent::ReplayAlert => "AlertsSettings",
            AppEvent::Settings => "Settings",
            AppEvent::MediaSettings => "MediaSettings",
            AppEvent::StartAucFighterMatch => "StartAucFighterMatch",
            AppEvent::PauseAucFighterMatch => "PauseAucFighterMatch",
            AppEvent::ResumeAucFighterMatch => "ResumeAucFighterMatch",
            AppEvent::AucFighterMatchEnd => "AucFighterMatchEnd",
            AppEvent::AucFighterMatchPlaying => "AucFighterMatchPlaying",
            AppEvent::AucFighterMatchPaused => "AucFighterMatchPaused",
            AppEvent::UpdateAucFighterMatch => "UpdateAucFighterMatch",
            AppEvent::CancelAucFighterMatch => "CancelAucFighterMatch",
            AppEvent::AucFighterSettings => "AucFighterSettings",
            AppEvent::Goal => "Goal",
            AppEvent::CreateDonationAccount => "CreateDonationAccount",
            AppEvent::WidgetViewStorage => "WidgetViewStorage",
            AppEvent::WidgetControlStorage => "WidgetControlStorage",
            AppEvent::NsfwDetection => "NsfwDetection",
            AppEvent::NsfwSettings => "NsfwSettings",
            AppEvent::Alert => "Alert",
            AppEvent::Donation => "Donation",
            AppEvent::Redemption => "Redemption",
            AppEvent::ChatMessage => "ChatMessage",
            AppEvent::ChatMessageDelete => "ChatMessageDelete",
            AppEvent::CommandAction => "CommandAction",
        }
    }
}

#[derive(Debug, Clone, Serialize)]
pub struct UnifiedChatMessageDelete {
    pub platform: Platform,
    pub channel_id: Option<String>,
    pub message_id: String,
    pub target_user: Option<DeletedMessageUser>,
}

#[derive(Debug, Clone, Serialize)]
pub struct DeletedMessageUser {
    pub id: String,
    pub username: String,
    pub login: String,
}

#[derive(Debug, Clone, Serialize)]
pub struct ModerationInfo {
    pub ai_moderated: bool,
    pub violated_rules: Vec<String>,
}

#[derive(Debug, Clone, Serialize)]
pub struct UnifiedChatMessage {
    pub id: String,
    pub platform: Platform,
    pub channel_id: String,
    pub channel_name: String,
    pub sender: UnifiedSender,
    pub content: UnifiedContent,
    pub metadata: UnifiedMetadata,
    pub created_at: String,
}

#[derive(Debug, Clone, Serialize)]
pub enum ChatMessageType {
    Text,
    // Twitch
    ChannelPointsHighlighted,
    ChannelPointsSubOnly,
    UserIntro,
    PowerUpMessageEffect,
    PowerUpGigantifiedEmote,
    // YouTube
    SuperChat {
        amount_micros: u64,
        currency: String,
        amount_display: String,
        tier: u32,
    },
    SuperSticker {
        sticker_id: String,
        alt_text: String,
        amount_micros: u64,
        currency: String,
        tier: u32,
    },
    FanFunding {
        amount_micros: u64,
        currency: String,
        amount_display: String,
    },
    MemberMilestone {
        member_month: u32,
        level_name: String,
    },
    NewSponsor {
        level_name: String,
        is_upgrade: bool,
    },
    MembershipGifting {
        count: i32,
        level_name: String,
    },
    GiftMembershipReceived {
        level_name: String,
        gifter_channel_id: String,
        associated_message_id: String,
    },
    GiftEvent {
        gift_name: String,
        jewels_amount: i32,
        has_visual_effect: bool,
        combo_count: i32,
    },
    Poll {
        question: String,
        options: Vec<PollOption>,
        status: String,
    },
    UserBanned {
        ban_type: String,
        duration_seconds: Option<u64>,
    },

    Unknown(String),
}

#[derive(Debug, Clone, Serialize)]
pub struct PollOption {
    pub text: String,
    pub tally: String,
}

#[derive(Debug, Clone, Serialize)]
pub struct UnifiedSender {
    pub id: String,
    pub username: String,
    pub login: String,
    pub color: Option<String>,
    pub badges: Vec<UnifiedBadge>,
    pub avatar_url: Option<String>,  // YouTube: profileImageUrl
    pub channel_url: Option<String>, // YouTube: channelUrl
    pub is_verified: Option<bool>,   // YouTube: isVerified
    pub roles: SenderRoles,
}

#[derive(Debug, Clone, Serialize)]
pub struct UnifiedBadge {
    pub id: String,
    pub set_id: String,
    pub label: Option<String>, // Twitch: info
    pub image_url: Option<String>,
}

#[derive(Debug, Clone, Default, Serialize)]
pub struct SenderRoles {
    pub is_broadcaster: bool, // Twitch: broadcaster badge / YouTube: isChatOwner
    pub is_moderator: bool,   // Twitch: moderator badge / YouTube: isChatModerator
    pub is_subscriber: bool,  // Twitch: subscriber badge / YouTube: isChatSponsor
    pub is_verified: bool,    // YouTube: isVerified
    pub is_bot: bool,
    pub is_vip: bool,
}

#[derive(Debug, Clone, Serialize)]
pub struct UnifiedContent {
    pub text: String,
    pub fragments: Vec<ChatFragment>,
    pub message_type: ChatMessageType,
    pub reply: Option<ReplyInfo>,
    pub cheer_bits: Option<u64>,        // Twitch cheermote
    pub donation: Option<DonationInfo>, // YouTube SuperChat/FanFunding/Gift
}
#[derive(Debug, Clone, Serialize)]
pub struct ReplyInfo {
    pub parent_message_id: String,
    pub parent_message_body: String,
    pub parent_user_id: String,
    pub parent_username: String,
    pub thread_message_id: Option<String>,
    pub thread_user_id: Option<String>,
}

#[derive(Debug, Clone, Serialize)]
pub struct ChatFragment {
    pub kind: FragmentKind,
    pub text: String,
}
#[derive(Debug, Clone, Serialize)]
#[serde(tag = "kind")]
pub enum FragmentKind {
    Text,
    Emote {
        id: String,
        emote_set_id: Option<String>,
        owner_id: Option<String>,
        formats: Vec<String>, // "static" | "animated"
    },
    Mention {
        user_id: String,
        username: String,
        login: String,
    },
    Cheermote {
        prefix: String,
        bits: u64,
        tier: u64,
    },
}
#[derive(Debug, Clone, Serialize)]
pub struct DonationInfo {
    pub amount_micros: u64,
    pub currency: String,
    pub amount_display: String,
    pub user_comment: Option<String>,
    pub tier: Option<u32>,
}

#[derive(Debug, Clone, Serialize)]
pub struct UnifiedMetadata {
    pub raw_message_ref: Option<String>,
    pub channel_points_reward_id: Option<String>,
    pub source_channel_id: Option<String>,
    pub source_channel_login: Option<String>,
    pub source_message_id: Option<String>,
    pub is_source_only: Option<bool>,
    pub live_chat_id: Option<String>,      // YouTube: liveChatId
    pub has_display_content: Option<bool>, // YouTube: hasDisplayContent
}

pub struct EventsService;

impl EventsService {
    pub async fn goal(
        database_service: &DatabaseService,
        websocket_broadcaster: &WebSocketBroadcaster,
        amount: u32,
        r#type: GoalType,
    ) -> Result<(), String> {
        database_service
            .update_goal_amount(amount, r#type.clone())
            .await?;
        match database_service.get_not_ended_goal(r#type).await {
            Ok(goal) => {
                let event_message = EventMessage {
                    event: AppEvent::Goal,
                    data: goal,
                };
                websocket_broadcaster
                    .broadcast_event_message(&event_message)
                    .await;
            }
            Err(_) => todo!(),
        }
        Ok(())
    }

    pub async fn donation(
        service_id: String,
        service: ServiceType,
        name: Option<String>,
        target_currency: Currency,
        target_amount: f64,
        message: Option<String>,
        app: &AppHandle,
    ) -> Result<(), String> {
        let user_name = match name {
            Some(name) => match name.as_str() {
                "" => "Anonymous".to_string(),
                _ => name,
            },
            None => "Anonymous".to_string(),
        };
        let media_service = app.state::<MediaService>();
        let database_service = app.state::<DatabaseService>();
        let tts_service = app.state::<TtsService>();
        let websocket_broadcaster = app.state::<WebSocketBroadcaster>();
        let exchange_rates_service_mutex = app.state::<Mutex<ExchangeRatesService>>();

        database_service
            .get_donation_by_service_id(service_id.clone())
            .await?;

        let settings = match database_service.get_settings().await? {
            Some(settings) => settings,
            None => {
                return Err("No settings found".to_string());
            }
        };

        let id = Uuid::new_v4();

        let mut exchange_rates_service = exchange_rates_service_mutex.lock().await;
        let exchanged_amount = exchange_rates_service
            .calculate_amount_by_currency(
                settings.currency.clone(),
                target_currency.clone(),
                target_amount,
            )
            .await;

        let media = media_service
            .get_media(&message, &exchanged_amount, app, MessageType::Donation)
            .await;

        let text = match message {
            Some(text) => {
                let text_without_black_listed_words =
                    remove_black_listed_words(text.as_str(), settings.black_list.as_str());

                if settings.remove_links {
                    Some(remove_links(text_without_black_listed_words.as_str()))
                } else {
                    Some(text_without_black_listed_words)
                }
            }
            None => None,
        };

        let alert = get_alert_by_amount(app, exchanged_amount, MessageType::Donation)
            .await
            .unwrap_or(None);

        let tts_type = match alert.clone() {
            Some(alert) => alert.tts_type,
            _ => TtsType::Edge,
        };

        let audio = if let Some(text) = text.clone() {
            match tts_service
                .make_audio(&remove_links(&text), &id.to_string(), &app, tts_type)
                .await
            {
                Ok(audio) => Some(audio),
                Err(e) => {
                    log::error!("Make audio error: {}", e.to_string());
                    let ws_message = EventMessage {
                        event: AppEvent::MakeAudioError,
                        data: e,
                    };

                    websocket_broadcaster
                        .broadcast_event_message(&ws_message)
                        .await;
                    None
                }
            }
        } else {
            None
        };

        let created_at = Utc::now().timestamp();
        let message_id = Uuid::new_v4();

        let client_message = ClientMessage {
            id: message_id,
            r#type: MessageType::Donation,
            created_at: created_at.clone(),
            follow: None,
            subscription: None,
            raid: None,
            redemption: None,
            command_action: None,
            donation: Some(Donation {
                id,
                user_name,
                message_id: message_id,
                amount: target_amount.clone(),
                text,
                audio,
                currency: target_currency.clone(),
                service,
                service_id,
                played: false,
                exchanged_amount: Some(exchanged_amount.clone()),
                exchanged_currency: Some(settings.currency.clone()),
                created_at,
                media: media.clone(),
                alert: alert,
            }),
        };

        Self::goal(
            &database_service,
            &websocket_broadcaster,
            exchanged_amount as u32,
            entity::goals::GoalType::Donation,
        )
        .await?;

        database_service
            .save_donation_message(client_message.clone())
            .await?;

        let event_message = EventMessage {
            event: AppEvent::Message,
            data: client_message.clone(),
        };

        websocket_broadcaster
            .broadcast_event_message(&event_message)
            .await;

        let event_message = EventMessage {
            event: AppEvent::Donation,
            data: client_message.clone(),
        };

        websocket_broadcaster
            .broadcast_event_message(&event_message)
            .await;

        let event_message = EventMessage {
            event: AppEvent::Alert,
            data: client_message.clone(),
        };

        websocket_broadcaster
            .broadcast_event_message(&event_message)
            .await;

        if !media.is_none() {
            let event_message = EventMessage {
                event: AppEvent::Media,
                data: client_message,
            };

            websocket_broadcaster
                .broadcast_event_message(&event_message)
                .await;
        }
        Ok(())
    }

    pub async fn subscription(
        subscription: Subscription,
        goal_type: GoalType,
        app: &AppHandle,
    ) -> Result<(), String> {
        let websocket_broadcaster = app.state::<WebSocketBroadcaster>();
        let database_service = app.state::<DatabaseService>();
        let client_message = ClientMessage {
            id: subscription.message_id.clone(),
            r#type: MessageType::Subscription,
            created_at: subscription.subscribed_at.clone(),
            donation: None,
            follow: None,
            raid: None,
            redemption: None,
            command_action: None,
            subscription: Some(subscription.clone()),
        };
        let event_message = EventMessage {
            event: AppEvent::Message,
            data: client_message.clone(),
        };
        websocket_broadcaster
            .broadcast_event_message(&event_message)
            .await;
        let event_message = EventMessage {
            event: AppEvent::Alert,
            data: client_message.clone(),
        };
        websocket_broadcaster
            .broadcast_event_message(&event_message)
            .await;
        let _ = database_service
            .save_subscribe_message(client_message)
            .await;
        let _ = Self::goal(
            &database_service,
            &websocket_broadcaster,
            subscription.total,
            goal_type,
        )
        .await;

        Ok(())
    }

    pub async fn redemption(
        redemption: Redemption,
        reward_type: RewardType,
        app: &AppHandle,
    ) -> Result<(), String> {
        let media = match reward_type {
            RewardType::Media => {
                let media_service = app.state::<MediaService>();
                media_service
                    .get_media(&redemption.user_input, &0.0, &app, MessageType::Redemption)
                    .await
            }
            _ => None,
        };
        let websocket_broadcaster = app.state::<WebSocketBroadcaster>();
        let database_service = app.state::<DatabaseService>();
        let created_at = Utc::now().timestamp();
        let client_message = ClientMessage {
            id: redemption.message_id,
            r#type: MessageType::Redemption,
            created_at,
            donation: None,
            follow: None,
            subscription: None,
            command_action: None,
            redemption: Some(Redemption {
                media,
                ..redemption
            }),
            raid: None,
        };
        let _ = database_service
            .save_redemption_message(client_message.clone())
            .await;
        let event_message = EventMessage {
            event: AppEvent::Message,
            data: client_message.clone(),
        };
        websocket_broadcaster
            .broadcast_event_message(&event_message)
            .await;
        let event_message = EventMessage {
            event: AppEvent::Redemption,
            data: client_message.clone(),
        };
        websocket_broadcaster
            .broadcast_event_message(&event_message)
            .await;

        Ok(())
    }

    pub async fn command_action(
        command_action: CommandAction,
        app: &AppHandle,
    ) -> Result<(), String> {
        let websocket_broadcaster = app.state::<WebSocketBroadcaster>();
        let database_service = app.state::<DatabaseService>();
        let created_at = Utc::now().timestamp();
        let client_message = ClientMessage {
            id: command_action.message_id,
            r#type: MessageType::CommandAction,
            created_at,
            donation: None,
            follow: None,
            subscription: None,
            redemption: None,
            raid: None,
            command_action: Some(command_action),
        };
        let _ = database_service
            .save_command_action_message(client_message.clone())
            .await;
        let event_message = EventMessage {
            event: AppEvent::Message,
            data: client_message.clone(),
        };
        websocket_broadcaster
            .broadcast_event_message(&event_message)
            .await;
        let event_message = EventMessage {
            event: AppEvent::CommandAction,
            data: client_message.clone(),
        };
        websocket_broadcaster
            .broadcast_event_message(&event_message)
            .await;
        let _ = database_service
            .save_command_action_message(client_message)
            .await;

        Ok(())
    }

    pub async fn follow(
        follow: Follow,
        goal_type: GoalType,
        app: &AppHandle,
    ) -> Result<(), String> {
        let websocket_broadcaster = app.state::<WebSocketBroadcaster>();
        let database_service = app.state::<DatabaseService>();
        let client_message = ClientMessage {
            id: follow.message_id.clone(),
            r#type: MessageType::Follow,
            created_at: follow.followed_at.clone(),
            donation: None,
            subscription: None,
            raid: None,
            redemption: None,
            command_action: None,
            follow: Some(follow),
        };
        let event_message = EventMessage {
            event: AppEvent::Message,
            data: client_message.clone(),
        };
        websocket_broadcaster
            .broadcast_event_message(&event_message)
            .await;
        let event_message = EventMessage {
            event: AppEvent::Alert,
            data: client_message.clone(),
        };
        websocket_broadcaster
            .broadcast_event_message(&event_message)
            .await;
        let _ = database_service.save_follow_message(client_message).await;
        let _ = Self::goal(&database_service, &websocket_broadcaster, 1, goal_type).await;
        Ok(())
    }

    pub async fn raid(raid: Raid, app: &AppHandle) -> Result<(), String> {
        let websocket_broadcaster = app.state::<WebSocketBroadcaster>();
        let database_service = app.state::<DatabaseService>();
        let client_message = ClientMessage {
            id: raid.message_id.clone(),
            r#type: MessageType::Raid,
            created_at: raid.created_at,
            donation: None,
            follow: None,
            subscription: None,
            redemption: None,
            command_action: None,
            raid: Some(raid),
        };
        let event_message = EventMessage {
            event: AppEvent::Message,
            data: client_message.clone(),
        };
        websocket_broadcaster
            .broadcast_event_message(&event_message)
            .await;
        let event_message = EventMessage {
            event: AppEvent::Alert,
            data: client_message.clone(),
        };
        websocket_broadcaster
            .broadcast_event_message(&event_message)
            .await;
        let _ = database_service.save_raid_message(client_message).await;

        Ok(())
    }

    pub async fn chat_message(
        chat_message: UnifiedChatMessage,
        app: &AppHandle,
    ) -> Result<(), String> {
        let websocket_broadcaster = app.state::<WebSocketBroadcaster>();
        let event_message = EventMessage {
            event: AppEvent::ChatMessage,
            data: chat_message,
        };
        websocket_broadcaster
            .broadcast_event_message(&event_message)
            .await;

        Ok(())
    }

    pub async fn chat_message_delete(
        event: UnifiedChatMessageDelete,
        app: &AppHandle,
    ) -> Result<(), String> {
        let websocket_broadcaster = app.state::<WebSocketBroadcaster>();
        let event_message = EventMessage {
            event: AppEvent::ChatMessageDelete,
            data: event,
        };
        websocket_broadcaster
            .broadcast_event_message(&event_message)
            .await;

        Ok(())
    }

    pub fn parse_kick_content(content: &str) -> Vec<ChatFragment> {
        let mut fragments = Vec::new();
        let mut remaining = content;

        while !remaining.is_empty() {
            if let Some(start) = remaining.find("[emote:") {
                if start > 0 {
                    let text = remaining[..start].trim().to_string();
                    if !text.is_empty() {
                        fragments.push(ChatFragment {
                            kind: FragmentKind::Text,
                            text,
                        });
                    }
                }

                if let Some(end) = remaining[start..].find(']') {
                    let emote_str = &remaining[start + 1..start + end]; // "emote:4148074:HYPERCLAP"
                    let parts: Vec<&str> = emote_str.split(':').collect();
                    if parts.len() == 3 {
                        fragments.push(ChatFragment {
                            text: parts[2].to_string(), // "HYPERCLAP"
                            kind: FragmentKind::Emote {
                                id: parts[1].to_string(), // "4148074"
                                emote_set_id: None,
                                owner_id: None,
                                formats: vec!["static".to_string()],
                            },
                        });
                    }
                    remaining = &remaining[start + end + 1..];
                } else {
                    break;
                }
            } else {
                let text = remaining.trim().to_string();
                if !text.is_empty() {
                    fragments.push(ChatFragment {
                        kind: FragmentKind::Text,
                        text,
                    });
                }
                break;
            }
        }

        fragments
    }

    pub fn strip_kick_emotes(content: &str) -> String {
        let mut result = String::new();
        let mut remaining = content;

        while !remaining.is_empty() {
            if let Some(start) = remaining.find("[emote:") {
                result.push_str(&remaining[..start]);
                if let Some(end) = remaining[start..].find(']') {
                    let parts: Vec<&str> = remaining[start + 1..start + end].split(':').collect();
                    if parts.len() == 3 {
                        result.push_str(parts[2]);
                    }
                    remaining = &remaining[start + end + 1..];
                } else {
                    break;
                }
            } else {
                result.push_str(remaining);
                break;
            }
        }

        result.trim().to_string()
    }
}

impl SenderRoles {
    pub fn has_any_level(&self, levels: &[UserLevel]) -> bool {
        levels.iter().any(|level| match level {
            UserLevel::Streamer => self.is_broadcaster,
            UserLevel::Moderator => self.is_moderator,
            UserLevel::Vip => self.is_vip,
            UserLevel::Subscriber => self.is_subscriber,
            UserLevel::Anyone => true,
        })
    }
}
