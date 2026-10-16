use std::collections::HashMap;

use entity::variables::Variable;

pub fn replace_variables(text: &str, variables: Vec<Variable>) -> String {
    let values: HashMap<&str, &str> = variables
        .iter()
        .map(|v| (v.name.as_str(), v.value.as_str()))
        .collect();

    let mut out = String::with_capacity(text.len());
    let mut rest = text;

    while let Some(start) = rest.find("{{") {
        out.push_str(&rest[..start]);
        let after = &rest[start + 2..];

        match after.find("}}") {
            Some(end) => {
                let name = after[..end].trim();
                match values.get(name) {
                    Some(value) => out.push_str(value),
                    None => out.push_str(&rest[start..start + end + 4]),
                }
                rest = &after[end + 2..];
            }
            None => {
                out.push_str(&rest[start..]);
                rest = "";
                break;
            }
        }
    }

    out.push_str(rest);
    out
}

#[cfg(test)]
mod test {
    use uuid::Uuid;

    use super::*;

    fn var(name: &str, value: &str) -> Variable {
        Variable {
            id: Uuid::new_v4(),
            name: name.to_string(),
            description: String::new(),
            value: value.to_string(),
        }
    }

    #[test]
    fn replaces_single_variable() {
        let result = replace_variables("Hello {{name}}!", vec![var("name", "Alex")]);
        assert_eq!(result, "Hello Alex!");
    }

    #[test]
    fn replaces_multiple_variables() {
        let vars = vec![var("name", "Alex"), var("order_id", "42")];
        let result = replace_variables("Hello {{name}}, order {{order_id}}!", vars);
        assert_eq!(result, "Hello Alex, order 42!");
    }

    #[test]
    fn replaces_repeated_variable() {
        let result = replace_variables("{{a}} + {{a}} = 2{{a}}", vec![var("a", "1")]);
        assert_eq!(result, "1 + 1 = 21");
    }

    #[test]
    fn trims_whitespace_inside_braces() {
        let result = replace_variables("Hi {{  name  }}!", vec![var("name", "Alex")]);
        assert_eq!(result, "Hi Alex!");
    }

    #[test]
    fn replaces_adjacent_placeholders() {
        let vars = vec![var("a", "1"), var("b", "2")];
        let result = replace_variables("{{a}}{{b}}", vars);
        assert_eq!(result, "12");
    }

    #[test]
    fn keeps_unknown_variable_as_is() {
        let result = replace_variables("Hi {{ unknown }}!", vec![var("name", "Alex")]);
        assert_eq!(result, "Hi {{ unknown }}!");
    }

    #[test]
    fn replaces_known_and_keeps_unknown() {
        let result = replace_variables("{{name}} {{unknown}}", vec![var("name", "Alex")]);
        assert_eq!(result, "Alex {{unknown}}");
    }

    #[test]
    fn keeps_empty_placeholder() {
        let result = replace_variables("a {{}} b", vec![var("name", "Alex")]);
        assert_eq!(result, "a {{}} b");
    }

    #[test]
    fn keeps_unclosed_placeholder() {
        let result = replace_variables("Hi {{name", vec![var("name", "Alex")]);
        assert_eq!(result, "Hi {{name");
    }

    #[test]
    fn replaces_valid_and_keeps_trailing_unclosed() {
        let result = replace_variables("{{a}} and {{b", vec![var("a", "1"), var("b", "2")]);
        assert_eq!(result, "1 and {{b");
    }

    #[test]
    fn text_without_placeholders_is_unchanged() {
        let result = replace_variables("just text { } }}", vec![var("name", "Alex")]);
        assert_eq!(result, "just text { } }}");
    }

    #[test]
    fn empty_text_returns_empty_string() {
        assert_eq!(replace_variables("", vec![var("name", "Alex")]), "");
    }

    #[test]
    fn empty_variables_list_keeps_text() {
        let result = replace_variables("Hi {{name}}!", vec![]);
        assert_eq!(result, "Hi {{name}}!");
    }

    #[test]
    fn empty_value_replaces_with_empty_string() {
        let result = replace_variables("Hi{{name}}!", vec![var("name", "")]);
        assert_eq!(result, "Hi!");
    }

    #[test]
    fn does_not_expand_recursively() {
        let vars = vec![var("a", "{{b}}"), var("b", "value")];
        let result = replace_variables("{{a}}", vars);
        assert_eq!(result, "{{b}}");
    }

    #[test]
    fn handles_multiline_text() {
        let result = replace_variables(
            "Line1 {{a}}\nLine2 {{b}}\n",
            vec![var("a", "1"), var("b", "2")],
        );
        assert_eq!(result, "Line1 1\nLine2 2\n");
    }
}
