//! xtask: Developer CLI for auditing craft-standards specifications.

use std::fs;
use std::path::{Path, PathBuf};

fn main() {
    let args: Vec<String> = std::env::args().collect();
    let command = args.get(1).map(String::as_str).unwrap_or("audit");

    match command {
        "audit" => run_audit(),
        "list" => run_list(),
        "help" | "--help" | "-h" => {
            println!("craft-standards xtask CLI");
            println!("Usage: cargo xtask [audit|list]");
        }
        unknown => {
            eprintln!("Unknown command: '{unknown}'. Available: audit, list");
            std::process::exit(1);
        }
    }
}

fn standards_dir() -> PathBuf {
    let manifest = std::env::var("CARGO_MANIFEST_DIR").unwrap_or_else(|_| ".".to_string());
    let mut path = PathBuf::from(manifest);
    if path.file_name().and_then(|n| n.to_str()) == Some("xtask") {
        path.pop();
    }
    path.join("standards")
}

fn collect_standards(dir: &Path) -> Vec<PathBuf> {
    let mut results = Vec::new();
    if let Ok(entries) = fs::read_dir(dir) {
        for entry in entries.flatten() {
            let path = entry.path();
            if path.is_dir() {
                results.extend(collect_standards(&path));
            } else if path.extension().and_then(|e| e.to_str()) == Some("md") {
                results.push(path);
            }
        }
    }
    results
}

fn parse_frontmatter(content: &str) -> Option<(String, String, String, String)> {
    if !content.starts_with("---") {
        return None;
    }

    let end_idx = content[3..].find("---")?;
    let header = &content[3..3 + end_idx];

    let mut id = None;
    let mut title = None;
    let mut category = None;
    let mut status = None;

    for line in header.lines() {
        let line = line.trim();
        if let Some(val) = line.strip_prefix("id:") {
            id = Some(val.trim().to_string());
        } else if let Some(val) = line.strip_prefix("title:") {
            title = Some(val.trim().to_string());
        } else if let Some(val) = line.strip_prefix("category:") {
            category = Some(val.trim().to_string());
        } else if let Some(val) = line.strip_prefix("status:") {
            status = Some(val.trim().to_string());
        }
    }

    Some((id?, title?, category?, status?))
}

fn run_audit() {
    let dir = standards_dir();
    let files = collect_standards(&dir);

    println!("Auditing {} specification files in {:?}...", files.len(), dir);

    let mut errors = 0;
    let mut seen_ids = std::collections::HashSet::new();

    for file in &files {
        let content = match fs::read_to_string(file) {
            Ok(c) => c,
            Err(e) => {
                eprintln!("Error reading {:?}: {e}", file.file_name());
                errors += 1;
                continue;
            }
        };

        match parse_frontmatter(&content) {
            Some((id, title, category, status)) => {
                if !id.starts_with("STD-") {
                    eprintln!("Invalid ID in {:?}: '{}' must start with 'STD-'", file.file_name(), id);
                    errors += 1;
                }
                if !seen_ids.insert(id.clone()) {
                    eprintln!("Duplicate standard ID: '{}' in {:?}", id, file.file_name());
                    errors += 1;
                }
                if !["interaction", "navigation", "accessibility", "internationalization", "shell", "unified-libs"].contains(&category.as_str()) {
                    eprintln!("Invalid category '{}' in {:?}", category, file.file_name());
                    errors += 1;
                }
                if !["draft", "active", "deprecated"].contains(&status.as_str()) {
                    eprintln!("Invalid status '{}' in {:?}", status, file.file_name());
                    errors += 1;
                }
                println!("  [OK] {} - {} ({})", id, title, category);
            }
            None => {
                eprintln!("Missing or invalid YAML frontmatter in {:?}", file.file_name());
                errors += 1;
            }
        }
    }

    if errors == 0 {
        println!("\n✅ Audit passed: {} standards verified with 0 errors.", files.len());
    } else {
        eprintln!("\n❌ Audit failed: {errors} error(s) found.");
        std::process::exit(1);
    }
}

fn run_list() {
    let dir = standards_dir();
    let files = collect_standards(&dir);

    println!("ArtCraft Standards Catalog ({} total):\n", files.len());
    println!("{:<14} | {:<20} | {:<10} | {}", "Standard ID", "Category", "Status", "Title");
    println!("{:-<14}-|-{:-<20}-|-{:-<10}-|-{:-<40}", "", "", "", "");

    for file in &files {
        if let Ok(content) = fs::read_to_string(file) {
            if let Some((id, title, category, status)) = parse_frontmatter(&content) {
                println!("{:<14} | {:<20} | {:<10} | {}", id, category, status, title);
            }
        }
    }
}
