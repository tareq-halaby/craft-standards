---
id: STD-LIB-004
title: Host Font Discovery, On-Demand Activation & Fallback Rendering
category: unified-libs
status: active
canonical_crate: craft-libs::craft-font-store
wiki_reference: https://craft.wiki/architecture/font-store/
affected_apps: [wordcraft, deckcraft, pdfcraft, figcraft, vectorcraft, photocraft, designcraft]
---

# STD-LIB-004: Host Font Discovery, On-Demand Activation & Fallback Rendering

## 1. Abstract

Modern creative applications across desktop, web (Wasm), and headless cloud rendering environments require access to expansive typographic catalogs without bloating release binaries. As codified in Storytold `RFC-0034`, web and headless builds cannot inspect host operating system font directories directly and must not bundle hundreds of megabytes of font faces. Instead, the hosting service or page (`craft-web-host`) provides structured font catalogs via `craft-font-index`.

This standard establishes the normative lifecycle for font catalog ingestion, on-demand activation, and non-destructive missing font fallbacks across the ArtCraft suite.

---

## 2. Normative Behavioral Requirements

### 2.1 Index Ingestion vs Binary Downloads
1. A build receives one or more font catalogs formatted as `craft-font-index` manifests (containing family name, style, weight, PostScript name, sha256 checksum, and HTTPS URL template).
2. Manifest validation MUST occur synchronously upon receipt. If a manifest specifies an insecure `http://` URL, an invalid SHA-256 hash, or an invalid path, the entire index MUST be rejected.
3. Font families listed in valid indexes MUST appear immediately in application font selection menus (`Family` dropdowns) without initiating any network downloads.

### 2.2 On-Demand Activation (Never Fetch on Browse)
- **Zero-Network Browsing Invariant:** Browsing font dropdowns, rolling the mouse wheel over font lists, or opening the "Find Font" dialog MUST NOT fetch font binaries.
- **On-Use Trigger:** A font binary (`.ttf`, `.otf`, `.woff2`) MUST only be downloaded when an open document actively applies that typeface to a text run or layer.
- **Checksum Verification:** Downloaded font bytes MUST match the catalog's SHA-256 hash before parsing. Mismatched or truncated files MUST be rejected immediately.

### 2.3 Non-Destructive Fallback Rendering
When a document requires a font face that has not yet downloaded or fails to download:
1. The text run MUST be rendered using the application's metric-compatible fallback typeface (e.g. `Inter` for sans-serif, `Instrument Serif` for serif).
2. The layer's stored font family attribute MUST NOT be altered or overwritten.
3. The font's arrival in the background MUST trigger a visual redraw without adding an entry to the user's Undo/Redo history stack.
4. If the font cannot be obtained, the Missing Fonts dialog MUST prompt the user for replacement or retry.

### 2.4 Agent and Script Permissions
AI coding agents, scripts, and MCP connections MUST NOT add font index sources or enable external network font downloads without user consent. Agents attempting to register unauthorized font sources MUST receive `Error::NotAllowed`.

---

## 3. Implementation Invariants (Rust / craft-font-store)

```rust
use std::collections::HashMap;

#[derive(Debug, Clone)]
pub struct FontFaceMeta {
    pub postscript_name: String,
    pub style: String,
    pub weight: u16,
    pub sha256: [u8; 32],
    pub download_url: String,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum FontState {
    CatalogOnly,
    Fetching,
    Activated(Vec<u8>),
    Failed(String),
}

pub struct FontCatalog {
    families: HashMap<String, Vec<FontFaceMeta>>,
    cache: HashMap<String, FontState>,
}

impl FontCatalog {
    pub fn new() -> Self {
        Self {
            families: HashMap::new(),
            cache: HashMap::new(),
        }
    }

    /// Lists available families for UI dropdowns without triggering network requests
    pub fn list_families(&self) -> Vec<&str> {
        self.families.keys().map(|s| s.as_str()).collect()
    }

    /// Triggers font activation only when a text layer requests glyph layout
    pub fn request_face(&mut self, postscript_name: &str) -> Option<&FontState> {
        if !self.cache.contains_key(postscript_name) {
            // Initiate background on-demand download
            self.cache.insert(postscript_name.to_string(), FontState::Fetching);
        }
        self.cache.get(postscript_name)
    }
}
```

---

## 4. Verification & Automated Testing

Every text-handling ArtCraft application MUST pass the following automated test cases:
1. `test_menu_listing_triggers_zero_fetches`: Ensures browsing font menus produces zero network I/O.
2. `test_sha256_mismatch_fails_activation`: Verifies corrupted font downloads draw in fallback and never panic.
3. `test_activation_leaves_undo_history_clean`: Asserts that background font arrivals do not dirty documents.
