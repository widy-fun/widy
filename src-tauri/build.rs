fn main() {
    stage_vc_runtime_dlls();
    stage_foundry_local_dlls();
    tauri_build::build();
}

fn stage_vc_runtime_dlls() {
    use std::path::PathBuf;

    println!("cargo:rerun-if-env-changed=WIDY_VC_REDIST_DIRS");

    let Some(redist_dirs) = std::env::var_os("WIDY_VC_REDIST_DIRS") else {
        return;
    };
    if std::env::var("CARGO_CFG_TARGET_OS").as_deref() != Ok("windows") {
        return;
    }

    let dest = PathBuf::from(std::env::var("CARGO_MANIFEST_DIR").unwrap()).join("thirdparty-libs");
    std::fs::create_dir_all(&dest).expect("create thirdparty-libs staging dir");

    let mut copied: Vec<String> = Vec::new();
    for dir in std::env::split_paths(&redist_dirs) {
        for entry in std::fs::read_dir(&dir)
            .unwrap_or_else(|e| panic!("WIDY_VC_REDIST_DIRS: read {}: {e}", dir.display()))
            .flatten()
        {
            let src = entry.path();
            let name = src
                .file_name()
                .and_then(|s| s.to_str())
                .unwrap_or("")
                .to_string();
            let lower = name.to_lowercase();
            let wanted = lower.ends_with(".dll")
                && (lower.starts_with("msvcp140")
                    || lower.starts_with("vcruntime140")
                    || lower.starts_with("vcomp140"));
            if wanted {
                std::fs::copy(&src, dest.join(&name))
                    .unwrap_or_else(|e| panic!("copy {}: {e}", src.display()));
                copied.push(lower);
            }
        }
    }

    for required in ["msvcp140.dll", "vcruntime140.dll"] {
        if !copied.iter().any(|n| n == required) {
            panic!(
                "WIDY_VC_REDIST_DIRS is set but {required} was not found in it; \
                 the app-local VC++ runtime would be incomplete and Widy would \
                 crash on machines without a current redist"
            );
        }
    }
    println!(
        "cargo:warning=Staged {} VC++ runtime DLL(s) for app-local deployment",
        copied.len()
    );
}

fn stage_foundry_local_dlls() {
    use std::path::PathBuf;

    let manifest_dir =
        PathBuf::from(std::env::var("CARGO_MANIFEST_DIR").expect("CARGO_MANIFEST_DIR not set"));

    let target_dir = manifest_dir
        .parent()
        .expect("src-tauri should have a parent directory")
        .join("src-tauri")
        .join("target");

    let profile = std::env::var("PROFILE").unwrap_or_else(|_| "debug".into());

    let build_dir = target_dir.join(&profile).join("build");

    let dest = manifest_dir.join("thirdparty-libs");

    std::fs::create_dir_all(&dest).expect("create thirdparty-libs staging dir");

    let mut foundry_out = None;

    if let Ok(entries) = std::fs::read_dir(&build_dir) {
        for entry in entries.flatten() {
            let path = entry.path();

            let name = entry.file_name();
            let name = name.to_string_lossy();

            if name.starts_with("foundry-local-sdk-") {
                let out = path.join("out");

                if out.exists() {
                    foundry_out = Some(out);
                    break;
                }
            }
        }
    }

    let Some(foundry_out) = foundry_out else {
        println!(
            "cargo:warning=foundry-local-sdk OUT_DIR not found in {}",
            build_dir.display()
        );
        return;
    };

    println!("cargo:rerun-if-changed={}", foundry_out.display());

    let mut copied = 0usize;
    for entry in std::fs::read_dir(&foundry_out)
        .unwrap_or_else(|e| panic!("read {}: {e}", foundry_out.display()))
        .flatten()
    {
        let src = entry.path();

        if !entry.file_type().map(|t| t.is_file()).unwrap_or(false) {
            continue;
        }

        let name = src
            .file_name()
            .and_then(|s| s.to_str())
            .unwrap_or("")
            .to_string();

        std::fs::copy(&src, dest.join(&name))
            .unwrap_or_else(|e| panic!("copy {}: {e}", src.display()));
        copied += 1;
    }

    println!(
        "cargo:warning=Staged {} foundry-local-sdk file(s) from {}",
        copied,
        foundry_out.display()
    );
}
