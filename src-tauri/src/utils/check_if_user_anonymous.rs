pub fn check_if_user_anonymous(name: Option<String>) -> String {
    let user_name = match name {
        Some(name) => match name.as_str() {
            "" => "Anonymous".to_string(),
            _ => name,
        },
        None => "Anonymous".to_string(),
    };
    user_name
}
