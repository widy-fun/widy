use std::sync::LazyLock;

use entity::media::MediaType;
use regex::{Regex, bytes::RegexSet};

static YOUTUBE: LazyLock<RegexSet> = LazyLock::new(|| {
    RegexSet::new([
        r"youtube\.com/watch\?v=",
        r"youtu\.be/",
        r"youtube\.com/shorts/",
    ])
    .expect("Wrong youtube regex")
});

static TWITCH: LazyLock<RegexSet> = LazyLock::new(|| {
    RegexSet::new([r"twitch\.tv/\w+/clip/", r"clips\.twitch\.tv/"]).expect("Wrong twitch regex")
});

static TIKTOK: LazyLock<RegexSet> =
    LazyLock::new(|| RegexSet::new([r"tiktok\.com/"]).expect("Wrong tiktok regex"));

static KICK: LazyLock<RegexSet> =
    LazyLock::new(|| RegexSet::new([r"kick\.com/"]).expect("Wrong kick regex"));

static URL_REGEX: LazyLock<Regex> =
    LazyLock::new(|| Regex::new(r"https?://[^\s<>]+").expect("Wrong url regex"));

pub struct UrlMedia {
    pub url: String,
    pub media_type: MediaType,
}

pub trait MediaParser {
    fn get_url_media(&self, text: &str) -> Option<UrlMedia> {
        let url = URL_REGEX.find(text)?.as_str();
        let media_type = self.get_media_type(url.as_bytes())?;

        Some(UrlMedia {
            url: url.to_owned(),
            media_type,
        })
    }

    fn get_media_type(&self, url: &[u8]) -> Option<MediaType> {
        if YOUTUBE.is_match(url) {
            Some(MediaType::Youtube)
        } else if TWITCH.is_match(url) {
            Some(MediaType::Twitch)
        } else if TIKTOK.is_match(url) {
            Some(MediaType::TikTok)
        } else if KICK.is_match(url) {
            Some(MediaType::Kick)
        } else {
            None
        }
    }
}
