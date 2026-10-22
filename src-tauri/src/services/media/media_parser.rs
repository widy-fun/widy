use std::sync::LazyLock;

use entity::media::MediaType;
use regex::Regex;
use url::Url;

static URL_REGEX: LazyLock<Regex> =
    LazyLock::new(|| Regex::new(r"https?://[^\s<>]+").expect("Wrong url regex"));

pub struct UrlMedia {
    pub url: String,
    pub media_type: MediaType,
}

fn host_is(host: &str, domain: &str) -> bool {
    host.strip_suffix(domain)
        .is_some_and(|prefix| prefix.is_empty() || prefix.ends_with('.'))
}

pub trait MediaParser {
    fn get_url_media(&self, text: &str) -> Option<UrlMedia> {
        let url = Url::parse(URL_REGEX.find(text)?.as_str()).ok()?;
        let media_type = self.get_media_type(&url)?;

        Some(UrlMedia {
            url: url.into(),
            media_type,
        })
    }

    fn get_media_type(&self, url: &Url) -> Option<MediaType> {
        let host = url.host_str()?;

        if host_is(host, "youtube.com") || host_is(host, "youtu.be") {
            Some(MediaType::Youtube)
        } else if host_is(host, "twitch.tv") {
            Some(MediaType::Twitch)
        } else if host_is(host, "tiktok.com") {
            Some(MediaType::TikTok)
        } else if host_is(host, "kick.com") {
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

    fn media_type(url: &str) -> Option<MediaType> {
        TestParser.get_media_type(&Url::parse(url).unwrap())
    }

    #[test]
    fn identifies_supported_platform_urls() {
        let test_cases = [
            (
                "https://www.youtube.com/watch?v=video123",
                MediaType::Youtube,
            ),
            ("https://youtu.be/video123", MediaType::Youtube),
            (
                "https://www.twitch.tv/channel/clip/ClipSlug",
                MediaType::Twitch,
            ),
            ("https://clips.twitch.tv/ClipSlug", MediaType::Twitch),
            ("https://www.tiktok.com/@user/video/123", MediaType::TikTok),
            ("https://vm.tiktok.com/abc/", MediaType::TikTok),
            ("https://kick.com/channel/clips/clip_123", MediaType::Kick),
        ];

        for (url, expected_type) in test_cases {
            assert_eq!(
                media_type(url),
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

        assert_eq!(parsed.url, "https://kick.com/channel/clips/clip_123");
        assert_eq!(parsed.media_type, MediaType::Kick);
    }

    #[test]
    fn returns_none_when_text_has_no_url() {
        assert!(TestParser.get_url_media("No link here").is_none());
    }

    #[test]
    fn returns_none_for_unsupported_url() {
        assert!(
            TestParser
                .get_url_media("https://example.com/video")
                .is_none()
        );
        assert_eq!(media_type("https://example.com/video"), None);
    }

    #[test]
    fn rejects_lookalike_hosts() {
        assert_eq!(media_type("https://evilyoutube.com/watch?v=1"), None);
        assert_eq!(media_type("https://youtube.com.evil.com/watch?v=1"), None);
        assert_eq!(media_type("https://example.com/?u=youtube.com"), None);
    }

    #[test]
    fn extracts_url_embedded_in_text() {
        let parsed = TestParser
            .get_url_media("prefix https://www.youtube.com/shorts/video123 suffix")
            .unwrap();
        assert_eq!(parsed.media_type, MediaType::Youtube);
    }
}
