use crate::utils::{remove_black_listed_words, remove_links};

pub fn get_message_text(
    message: Option<String>,
    black_list: &str,
    is_remove_links: bool,
) -> Option<String> {
    match message {
        Some(text) => {
            let text_without_black_listed_words = remove_black_listed_words(&text, &black_list);
            if is_remove_links {
                Some(remove_links(&text_without_black_listed_words))
            } else {
                Some(text_without_black_listed_words)
            }
        }
        None => None,
    }
}
