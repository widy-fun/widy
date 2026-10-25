use entity::{commands::UserLevel, rewards::Platform};
use serde::Serialize;

use crate::{
    kick::UserBannedData,
    twitch::{BadgeInfo, ChannelBanEvent, ChannelChatMessageDeleteEvent, ChannelChatMessageEvent},
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
    TtsPlayed,
    TtsPlaying,
    ReplayTts,
    SkipTts,
    SkipPlayingTts,
    StartTranscribe,
    StopTranscribe,
    AssistantAction,
    ChannelUserBanned,
    ChannelSubscription,
    CommandAuctionAction,
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
            AppEvent::TtsPlayed => "TtsPlayed",
            AppEvent::TtsPlaying => "TtsPlaying",
            AppEvent::ReplayTts => "ReplayTts",
            AppEvent::SkipTts => "SkipTts",
            AppEvent::SkipPlayingTts => "SkipPlayingTts",
            AppEvent::StartTranscribe => "StartTranscribe",
            AppEvent::StopTranscribe => "StopTranscribe",
            AppEvent::AssistantAction => "AssistantAction",
            AppEvent::ChannelUserBanned => "ChannelUserBanned",
            AppEvent::ChannelSubscription => "ChannelSubscription",
            AppEvent::CommandAuctionAction => "CommandAuctionAction",
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

#[derive(Debug, Clone, Serialize)]
pub struct BannedTargetUser {
    pub id: String,
    pub username: String,
    pub display_name: Option<String>,
}

#[derive(Debug, Clone, Serialize)]
pub struct BanIssuedBy {
    pub id: String,
    pub username: String,
}

#[derive(Debug, Clone, Serialize)]
pub struct UnifiedBannedUser {
    pub platform: Platform,
    pub event_id: Option<String>,
    pub channel_id: Option<String>,
    pub target_user: BannedTargetUser,
    pub banned_by: Option<BanIssuedBy>,
    pub reason: Option<String>,
    pub banned_at: Option<String>,
    pub ends_at: Option<String>,
    pub permanent: bool,
}

#[derive(Serialize, Clone, Debug)]
pub struct EventMessage<T> {
    pub event: AppEvent,
    pub data: T,
}

impl From<UserBannedData> for UnifiedBannedUser {
    fn from(d: UserBannedData) -> Self {
        UnifiedBannedUser {
            platform: Platform::Kick,
            event_id: Some(d.id),
            channel_id: None,
            target_user: BannedTargetUser {
                id: d.user.id.to_string(),
                username: d.user.username,
                display_name: None,
            },
            banned_by: Some(BanIssuedBy {
                id: d.banned_by.id.to_string(),
                username: d.banned_by.username,
            }),
            reason: None,
            banned_at: None,
            ends_at: None,
            permanent: d.permanent,
        }
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

impl UnifiedChatMessage {
    pub fn from_twitch(
        e: ChannelChatMessageEvent,
        created_at: String,
        all_badges_info: &Vec<BadgeInfo>,
    ) -> Self {
        let is_broadcaster = e.badges.iter().any(|b| b.set_id == "broadcaster");
        let is_moderator = e.badges.iter().any(|b| b.set_id == "moderator");
        let is_subscriber = e.badges.iter().any(|b| b.set_id == "subscriber");
        let is_vip = e.badges.iter().any(|b| b.set_id == "vip");

        let cheer_bits = e.cheer.as_ref().map(|c| c.bits);

        let message_type = match e.message_type.as_str() {
            "channel_points_highlighted" => ChatMessageType::ChannelPointsHighlighted,
            "channel_points_sub_only" => ChatMessageType::ChannelPointsSubOnly,
            "user_intro" => ChatMessageType::UserIntro,
            "power_ups_message_effect" => ChatMessageType::PowerUpMessageEffect,
            "power_ups_gigantified_emote" => ChatMessageType::PowerUpGigantifiedEmote,
            other => ChatMessageType::Unknown(other.to_string()),
        };

        let fragments = e
            .message
            .fragments
            .into_iter()
            .map(|f| ChatFragment {
                text: f.text.clone(),
                kind: match f.r#type.as_str() {
                    "emote" => FragmentKind::Emote {
                        id: f.emote.as_ref().map(|x| x.id.clone()).unwrap_or_default(),
                        emote_set_id: f.emote.as_ref().map(|x| x.emote_set_id.clone()),
                        owner_id: f.emote.as_ref().map(|x| x.owner_id.clone()),
                        formats: f.emote.map(|x| x.format).unwrap_or_default(),
                    },
                    "mention" => FragmentKind::Mention {
                        user_id: f
                            .mention
                            .as_ref()
                            .map(|x| x.user_id.clone())
                            .unwrap_or_default(),
                        username: f
                            .mention
                            .as_ref()
                            .map(|x| x.user_name.clone())
                            .unwrap_or_default(),
                        login: f.mention.map(|x| x.user_login).unwrap_or_default(),
                    },
                    "cheermote" => FragmentKind::Cheermote {
                        prefix: f
                            .cheermote
                            .as_ref()
                            .map(|x| x.prefix.clone())
                            .unwrap_or_default(),
                        bits: f.cheermote.as_ref().map(|x| x.bits).unwrap_or(0),
                        tier: f.cheermote.map(|x| x.tier).unwrap_or(0),
                    },
                    _ => FragmentKind::Text,
                },
            })
            .collect();
        let mut is_bot = false;
        let badges = e
            .badges
            .iter()
            .map(|b| {
                is_bot = is_bot || b.set_id == "bot-badge";
                UnifiedBadge {
                    id: b.id.clone(),
                    set_id: b.set_id.clone(),
                    label: Some(b.info.clone()).filter(|i| !i.is_empty()),
                    image_url: all_badges_info
                        .iter()
                        .find(|a| a.set_id == b.set_id)
                        .and_then(|badge| {
                            badge
                                .versions
                                .first()
                                .map(|version| version.image_url_1x.clone())
                        }),
                }
            })
            .collect();

        Self {
            id: e.message_id,
            platform: Platform::Twitch,
            channel_id: e.broadcaster_user_id,
            channel_name: e.broadcaster_user_login,
            created_at,

            sender: UnifiedSender {
                id: e.chatter_user_id,
                username: e.chatter_user_name,
                login: e.chatter_user_login,
                color: Some(e.color).filter(|c| !c.is_empty()),
                avatar_url: None,
                channel_url: None,
                is_verified: None,
                badges,
                roles: SenderRoles {
                    is_broadcaster,
                    is_moderator,
                    is_subscriber,
                    is_verified: false,
                    is_bot,
                    is_vip,
                },
            },

            content: UnifiedContent {
                text: e.message.text,
                fragments,
                message_type,
                reply: e.reply.map(|r| ReplyInfo {
                    parent_message_id: r.parent_message_id,
                    parent_message_body: r.parent_message_body,
                    parent_user_id: r.parent_user_id,
                    parent_username: r.parent_user_name,
                    thread_message_id: Some(r.thread_message_id),
                    thread_user_id: Some(r.thread_user_id),
                }),
                cheer_bits,
                donation: None,
            },

            metadata: UnifiedMetadata {
                raw_message_ref: None,
                channel_points_reward_id: e.channel_points_custom_reward_id,
                source_channel_id: e.source_broadcaster_user_id,
                source_channel_login: e.source_broadcaster_user_login,
                source_message_id: e.source_message_id,
                is_source_only: e.is_source_only,
                live_chat_id: None,
                has_display_content: None,
            },
        }
    }
}

impl From<ChannelChatMessageDeleteEvent> for UnifiedChatMessageDelete {
    fn from(e: ChannelChatMessageDeleteEvent) -> Self {
        Self {
            platform: Platform::Twitch,
            channel_id: Some(e.broadcaster_user_id),
            message_id: e.message_id,
            target_user: Some(DeletedMessageUser {
                id: e.target_user_id,
                username: e.target_user_name,
                login: e.target_user_login,
            }),
        }
    }
}

impl From<ChannelBanEvent> for UnifiedBannedUser {
    fn from(e: ChannelBanEvent) -> Self {
        UnifiedBannedUser {
            platform: Platform::Twitch,
            event_id: None,
            channel_id: Some(e.broadcaster_user_id),
            target_user: BannedTargetUser {
                id: e.user_id,
                username: e.user_login,
                display_name: Some(e.user_name),
            },
            banned_by: Some(BanIssuedBy {
                id: e.moderator_user_id,
                username: e.moderator_user_login,
            }),
            reason: Some(e.reason).filter(|r| !r.is_empty()),
            banned_at: Some(e.banned_at),
            ends_at: Some(e.ends_at),
            permanent: e.is_permanent,
        }
    }
}
