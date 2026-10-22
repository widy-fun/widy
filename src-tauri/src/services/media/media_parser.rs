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

#[cfg(test)]
mod tests {
    use super::*;

    struct TestParser;

    impl MediaParser for TestParser {}

    #[test]
    fn identifies_supported_platform_urls() {
        let parser = TestParser;

        let test_cases = [
            ("https://www.youtube.com/watch?v=video123", MediaType::Youtube),
            ("https://youtu.be/video123", MediaType::Youtube),
            (
                "https://www.twitch.tv/channel/clip/ClipSlug",
                MediaType::Twitch,
            ),
            ("https://clips.twitch.tv/ClipSlug", MediaType::Twitch),
            ("https://www.tiktok.com/@user/video/123", MediaType::TikTok),
            ("https://kick.com/channel/clips/clip_123", MediaType::Kick),
        ];

        for (url, expected_type) in test_cases {
            assert_eq!(
                parser.get_media_type(url.as_bytes()),
                Some(expected_type),
                "failed to classify {url}"
            );
        }
    }

    #[test]
    fn extracts_supported_url_from_surrounding_text() {
        let parsed = TestParser
            .get_url_media("Check out this clip: https://kick.com/channel/clips/clip_123")
            .unwrap();

        assert_eq!(
            parsed.url,
            "https://kick.com/channel/clips/clip_123"
        );
        assert_eq!(parsed.media_type, MediaType::Kick);
    }

    #[test]
    fn returns_none_when_text_has_no_url() {
        assert!(TestParser.get_url_media("No link here").is_none());
    }

    #[test]
    fn returns_none_for_unsupported_url() {
        assert!(TestParser
            .get_url_media("https://example.com/video")
            .is_none());
        assert_eq!(
            TestParser.get_media_type(b"https://example.com/video"),
            None
        );
    }

    #[test]
    fn identifies_platform_when_url_is_embedded_in_a_byte_slice() {
        assert_eq!(
            TestParser.get_media_type(b"prefix https://www.youtube.com/shorts/video123 suffix"),
            Some(MediaType::Youtube)
        );
    }
}
