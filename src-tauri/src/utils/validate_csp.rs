use entity::widgets::Csp;

use crate::error::AppError;

fn validate_csp_source(value: &str, is_dev: bool) -> Result<(), AppError> {
    if value.is_empty() {
        return Err(AppError::Custom("CSP source value is empty".to_string()));
    }

    if value
        .chars()
        .any(|c| c.is_whitespace() || c == ';' || c == '\'' || c == '"')
    {
        return Err(AppError::Custom(format!(
            "CSP source '{value}' contains illegal characters (whitespace, ';', or quotes)"
        )));
    }

    let is_valid = value.starts_with("https://")
        || value.starts_with("wss://")
        || (is_dev && value.starts_with("ws://localhost"));

    if !is_valid {
        return Err(AppError::Custom(format!(
            "CSP source '{value}' must start with https:// or wss://{}",
            if is_dev { " or ws://localhost" } else { "" }
        )));
    }

    Ok(())
}

fn validate_csp_sources(values: &[String], is_dev: bool) -> Result<(), AppError> {
    for v in values {
        validate_csp_source(v, is_dev)?;
    }
    Ok(())
}

fn as_slice(values: &Option<Vec<String>>) -> &[String] {
    values.as_deref().unwrap_or(&[])
}

pub fn validate_csp(csp: Option<Csp>, is_dev: bool) -> Result<String, AppError> {
    if let Some(csp) = csp {
        let connect_src = as_slice(&csp.connect_src);
        let img_src = as_slice(&csp.img_src);
        let media_src = as_slice(&csp.media_src);

        validate_csp_sources(connect_src, is_dev)?;
        validate_csp_sources(img_src, is_dev)?;
        validate_csp_sources(media_src, is_dev)?;

        let csp_value = format!(
            "default-src 'self'; connect-src 'self' {}; style-src 'self' 'unsafe-inline'; img-src 'self' {}; media-src 'self' {};",
            connect_src.join(" "),
            img_src.join(" "),
            media_src.join(" "),
        );

        Ok(csp_value)
    } else {
        Ok("default-src 'self'; style-src 'self' 'unsafe-inline';".into())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn validate_csp_none_returns_default_value() {
        let result = validate_csp(None, false).unwrap();
        assert_eq!(
            result,
            "default-src 'self'; style-src 'self' 'unsafe-inline';"
        );
    }

    #[test]
    fn validate_csp_with_valid_sources_returns_combined_csp() {
        let csp = Csp {
            connect_src: Some(vec!["https://example.com".into()]),
            img_src: Some(vec!["https://example.com/image.png".into()]),
            media_src: Some(vec!["wss://media.example.com".into()]),
        };

        let result = validate_csp(Some(csp), false).unwrap();
        assert_eq!(
            result,
            "default-src 'self'; connect-src 'self' https://example.com; style-src 'self' 'unsafe-inline'; img-src 'self' https://example.com/image.png; media-src 'self' wss://media.example.com;"
        );
    }

    #[test]
    fn validate_csp_rejects_empty_source_value() {
        let csp = Csp {
            connect_src: Some(vec!["".into()]),
            img_src: None,
            media_src: None,
        };

        assert!(matches!(
            validate_csp(Some(csp), false),
            Err(AppError::Custom(ref e)) if e == "CSP source value is empty"
        ));
    }

    #[test]
    fn validate_csp_rejects_source_with_illegal_characters() {
        let csp = Csp {
            connect_src: Some(vec!["https://example.com /bad".into()]),
            img_src: None,
            media_src: None,
        };

        assert!(matches!(
            validate_csp(Some(csp), false),
            Err(AppError::Custom(ref e))
                if e.contains("contains illegal characters")
        ));
    }

    #[test]
    fn validate_csp_rejects_invalid_source_scheme() {
        let csp = Csp {
            connect_src: None,
            img_src: Some(vec!["http://example.com".into()]),
            media_src: None,
        };

        assert!(matches!(
            validate_csp(Some(csp), false),
            Err(AppError::Custom(ref e))
                if e.contains("must start with https:// or wss://")
        ));
    }
}
