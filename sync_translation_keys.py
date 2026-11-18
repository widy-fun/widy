import json
import re
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(r"D:\projects\widy")
TRANSLATIONS = ROOT / "shared" / "translation"
TARGETS = {
    "ar.json": "ar",
    "de.json": "de",
    "es.json": "es",
    "fr.json": "fr",
    "hi.json": "hi",
    "pt.json": "pt",
    "ru.json": "ru",
    "ua.json": "uk",
    "zh.json": "zh-CN",
}

def leaves(value, prefix=""):
    result = set()
    for key, child in value.items():
        path = f"{prefix}.{key}" if prefix else key
        if isinstance(child, dict):
            result |= leaves(child, path)
        else:
            result.add(path)
    return result

def get_placeholder_tokens(text):
    patterns = re.compile(r"\{\{[^{}]+\}\}|\{[^{}]+\}")
    tokens = {}
    for index, match in enumerate(patterns.findall(text)):
        token = f"___PH{index}___"
        tokens[token] = match.group(0) if hasattr(match, "group") else match
        text = text.replace(match, token, 1)
    return text, tokens

def translate(text, target):
    if not text or re.fullmatch(r"[\s\d]+", text):
        return text
    protected, tokens = get_placeholder_tokens(text)
    params = urllib.parse.urlencode({
        "client": "gtx",
        "sl": "en",
        "tl": target,
        "dt": "t",
        "q": protected,
    })
    request = urllib.request.Request(
        "https://translate.googleapis.com/translate_a/single?" + params,
        headers={"User-Agent": "Mozilla/5.0"},
    )
    with urllib.request.urlopen(request, timeout=20) as response:
        payload = json.load(response)
    translated = "".join(part[0] for part in payload[0] if part and part[0])
    for token, placeholder in tokens.items():
        translated = translated.replace(token, placeholder)
        translated = translated.replace(token.lower(), placeholder)
    return translated

def sync(source, locale, target):
    if isinstance(source, dict):
        result = {}
        for key, source_value in source.items():
            if key in locale:
                locale_value = locale[key]
                if isinstance(source_value, dict) and isinstance(locale_value, dict):
                    result[key] = sync(source_value, locale_value, target)
                else:
                    result[key] = locale_value
            else:
                result[key] = sync(source_value, {}, target)
        return result
    return source if target is None else translate(source, target)

base_path = TRANSLATIONS / "en.json"
with base_path.open("r", encoding="utf-8") as handle:
    base = json.load(handle)

for filename, target in TARGETS.items():
    path = TRANSLATIONS / filename
    with path.open("r", encoding="utf-8") as handle:
        locale = json.load(handle)

    before_missing = sorted(leaves(base) - leaves(locale))
    before_extra = sorted(leaves(locale) - leaves(base))
    merged = sync(base, locale, target)

    with path.open("w", encoding="utf-8", newline="\n") as handle:
        json.dump(merged, handle, ensure_ascii=False, indent="\t")
        handle.write("\n")

    with path.open("r", encoding="utf-8") as handle:
        verified = json.load(handle)
    after_missing = sorted(leaves(base) - leaves(verified))
    after_extra = sorted(leaves(verified) - leaves(base))

    print(f"{filename}: added={len(before_missing)} removed_extra={len(before_extra)}")
    if before_missing:
        print("  missing before: " + ", ".join(before_missing))
    if before_extra:
        print("  extra before: " + ", ".join(before_extra))
    print(f"{filename}: validation missing={len(after_missing)} extra={len(after_extra)}")
