use crate::services::DatabaseService;
use crate::services::media::kick_extractor::KickClipExtractor;
use crate::services::media::media_parser::MediaParser;
use crate::services::media::tiktok_extractor::TikTokExtractor;
use crate::services::media::twitch_extractor::TwitchClipExtractor;
use crate::services::media::youtube_extractor::YoutubeExtractor;
use crate::services::media::youtube_search_extractor::YoutubeSearchExtractor;
use crate::{repositories::MediaSettingsRepository, utils::log_and_wrap_error};
use entity::{
    media::{Media, MediaType},
    media_settings::MediaPlatformSettings,
    messages::MessageType,
};
use reqwest::Client;
use tauri::{AppHandle, Manager};

#[derive(Debug)]
pub struct YoutubeInfo {
    pub video_id: String,
    pub title: String,
    pub url: String,
    pub thumbnail_url: Option<String>,
    pub duration: Option<u64>,
    pub view_count: Option<u64>,
}

pub struct MediaService {
    pub reqwest_client: reqwest::Client,
}

impl MediaService {
    pub fn new(reqwest_client: reqwest::Client) -> Self {
        Self { reqwest_client }
    }

    pub async fn get_media(
        &self,
        text: &Option<String>,
        amount: &f64,
        app: &AppHandle,
        message_type: MessageType,
    ) -> Option<Media> {
        let database_service = app.state::<DatabaseService>();
        let media_settings = match database_service.get_media_settings().await {
            Ok(Some(media_settings)) => media_settings,
            Ok(None) => return None,
            Err(e) => {
                log::error!("{}", e.to_string());
                return None;
            }
        };

        let url_media = self.get_url_media(text.as_ref()?)?;

        match url_media.media_type {
            MediaType::Twitch => {
                if !media_settings.twitch.enabled {
                    return None;
                }
                self.check_donation_min_amount(amount, &message_type, &media_settings.twitch)?;

                let twitch_clip_info = self
                    .get_twitch_clip_info(&url_media.url)
                    .await
                    .map_err(|e| log_and_wrap_error("Get twitch clip info", e))
                    .ok()?;
                let temporary_src = match twitch_clip_info.formats.first() {
                    Some(format) => Some(format.url.clone()),
                    _ => None,
                };
                let duration = twitch_clip_info.duration.unwrap_or(0.0);
                let view_count = twitch_clip_info.view_count.unwrap_or(0);

                if media_settings.twitch.min_views > view_count {
                    return None;
                }

                return Some(Media {
                    url: url_media.url,
                    media_type: url_media.media_type,
                    expires: None,
                    temporary_src,
                    title: twitch_clip_info.title,
                    creator: twitch_clip_info.curator,
                    thumbnail_url: twitch_clip_info.thumbnail_url,
                    duration: Some(duration),
                    view_count: Some(view_count),
                });
            }
            MediaType::TikTok => {
                if !media_settings.tiktok.enabled {
                    return None;
                }
                self.check_donation_min_amount(amount, &message_type, &media_settings.tiktok)?;

                let tiktok_info = self
                    .get_tiktok_info(&url_media.url)
                    .await
                    .map_err(|e| log_and_wrap_error("Get tiktok info", e))
                    .ok()?;
                let view_count = tiktok_info.view_count.unwrap_or(0) as u64;
                let duration = tiktok_info.duration.unwrap_or(0.0);
                let thumbnail_url = match tiktok_info.thumbnails.first() {
                    Some(t) => Some(t.clone()),
                    _ => None,
                };

                if media_settings.tiktok.min_views > view_count {
                    return None;
                }

                return Some(Media {
                    url: url_media.url,
                    media_type: url_media.media_type,
                    expires: None,
                    temporary_src: Some(tiktok_info.id),
                    thumbnail_url,
                    duration: Some(duration),
                    title: tiktok_info.title,
                    view_count: Some(view_count),
                    creator: tiktok_info.artist,
                });
            }
            MediaType::Youtube => {
                if !media_settings.youtube.enabled {
                    return None;
                }
                self.check_donation_min_amount(amount, &message_type, &media_settings.youtube)?;

                let youtube_video_info = self
                    .get_youtube_video_info(&url_media.url)
                    .await
                    .map_err(|e| log_and_wrap_error("Get youtube video info", e))
                    .ok()?;
                let view_count = youtube_video_info.view_count.unwrap_or(0);

                if media_settings.youtube.min_views > view_count {
                    return None;
                }

                return Some(Media {
                    url: url_media.url,
                    media_type: url_media.media_type,
                    expires: None,
                    temporary_src: Some(youtube_video_info.id),
                    thumbnail_url: youtube_video_info.thumbnail,
                    title: youtube_video_info.title,
                    duration: youtube_video_info.duration,
                    view_count: Some(view_count),
                    creator: youtube_video_info.channel,
                });
            }
            MediaType::Kick => {
                if !media_settings.kick.enabled {
                    return None;
                }
                self.check_donation_min_amount(amount, &message_type, &media_settings.kick)?;

                let kick_clip_info = self
                    .get_kick_clip_info(&url_media.url)
                    .await
                    .map_err(|e| log_and_wrap_error("Get kick clip info", e))
                    .ok()?;

                let view_count = kick_clip_info.view_count.unwrap_or(0);

                if media_settings.kick.min_views > view_count {
                    return None;
                }

                return Some(Media {
                    url: url_media.url,
                    media_type: url_media.media_type,
                    expires: None,
                    temporary_src: Some(kick_clip_info.clip_url),
                    title: kick_clip_info.title,
                    creator: kick_clip_info.uploader,
                    thumbnail_url: kick_clip_info.thumbnail_url,
                    duration: kick_clip_info.duration,
                    view_count: Some(view_count),
                });
            }
        }
    }

    fn check_donation_min_amount(
        &self,
        amount: &f64,
        message_type: &MessageType,
        media_platform_settings: &MediaPlatformSettings,
    ) -> Option<bool> {
        if let MessageType::Donation = message_type {
            if media_platform_settings.min_amount as f64 > *amount {
                return None;
            }
        }
        Some(true)
    }
}

impl TikTokExtractor for MediaService {
    fn reqwest_client(&self) -> &Client {
        &self.reqwest_client
    }
}

impl TwitchClipExtractor for MediaService {
    fn reqwest_client(&self) -> &Client {
        &self.reqwest_client
    }
}

impl KickClipExtractor for MediaService {
    fn reqwest_client(&self) -> &Client {
        &self.reqwest_client
    }
}

impl YoutubeSearchExtractor for MediaService {
    fn reqwest_client(&self) -> &Client {
        &self.reqwest_client
    }
}

impl YoutubeExtractor for MediaService {
    fn reqwest_client(&self) -> &Client {
        &self.reqwest_client
    }
}

impl MediaParser for MediaService {}
