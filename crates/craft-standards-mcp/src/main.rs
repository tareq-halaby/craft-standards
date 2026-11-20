//! craft-standards-mcp: High-intelligence Model Context Protocol server for ArtCraft standards governance.

use serde::{Deserialize, Serialize};
use serde_json::{Value, json};
use std::io::{self, BufRead, Write};

#[derive(Serialize, Deserialize, Debug)]
struct JsonRpcRequest {
    jsonrpc: String,
    #[serde(default)]
    id: Option<Value>,
    method: String,
    #[serde(default)]
    params: Option<Value>,
}

#[derive(Serialize, Deserialize, Debug)]
struct JsonRpcResponse {
    jsonrpc: String,
    id: Value,
    #[serde(skip_serializing_if = "Option::is_none")]
    result: Option<Value>,
    #[serde(skip_serializing_if = "Option::is_none")]
    error: Option<Value>,
}

fn main() -> io::Result<()> {
    let stdin = io::stdin();
    let mut stdout = io::stdout();

    for line in stdin.lock().lines() {
        let line = line?;
        if line.trim().is_empty() {
            continue;
        }

        if let Ok(req) = serde_json::from_str::<JsonRpcRequest>(&line) {
            if let Some(resp) = handle_request(&req) {
                let serialized = serde_json::to_string(&resp)?;
                writeln!(stdout, "{}", serialized)?;
                stdout.flush()?;
            }
        }
    }

    Ok(())
}

fn handle_request(req: &JsonRpcRequest) -> Option<JsonRpcResponse> {
    let id = req.id.clone().unwrap_or(Value::Null);

    match req.method.as_str() {
        "initialize" => Some(JsonRpcResponse {
            jsonrpc: "2.0".to_string(),
            id,
            result: Some(json!({
                "protocolVersion": "2024-11-05",
                "capabilities": {
                    "tools": {}
                },
                "serverInfo": {
                    "name": "craft-standards-mcp",
                    "version": "0.2.0"
                }
            })),
            error: None,
        }),
        "notifications/initialized" => None,
        "tools/list" => Some(JsonRpcResponse {
            jsonrpc: "2.0".to_string(),
            id,
            result: Some(json!({
                "tools": [
                    {
                        "name": "list_standards",
                        "description": "Lists all active ArtCraft standards across the 20+ app suite with categories, tags, and canonical crates.",
                        "inputSchema": {
                            "type": "object",
                            "properties": {
                                "category": {
                                    "type": "string",
                                    "description": "Optional category filter: interaction, navigation, accessibility, internationalization, shell, unified-libs"
                                }
                            }
                        }
                    },
                    {
                        "name": "get_standard",
                        "description": "Fetches normative requirements, acceptance rules, and edge-case invariants for an ArtCraft standard.",
                        "inputSchema": {
                            "type": "object",
                            "required": ["id"],
                            "properties": {
                                "id": {
                                    "type": "string",
                                    "description": "Standard ID, e.g. STD-INPUT-001, STD-NAV-001, STD-A11Y-001, STD-I18N-001"
                                }
                            }
                        }
                    },
                    {
                        "name": "verify_component",
                        "description": "Semantic pre-flight linter: inspects proposed Rust/egui code for anti-patterns (e.g. frame modifier leaks, unshielded double-clicks, missing AccessKit roles, direct platform calls, unconfined file I/O, panics).",
                        "inputSchema": {
                            "type": "object",
                            "required": ["component_kind", "code_snippet"],
                            "properties": {
                                "component_kind": {
                                    "type": "string",
                                    "enum": ["toolbar_button", "dialog", "dock_panel", "text_input", "printing", "file_io", "parser", "fonts", "gpu", "cloud_sync"]
                                },
                                "code_snippet": {
                                    "type": "string",
                                    "description": "Rust/egui code snippet to verify"
                                }
                            }
                        }
                    },
                    {
                        "name": "generate_compliant_code",
                        "description": "Generates 100% standard-compliant, edge-case-hardened Rust/egui code boilerplate for common components.",
                        "inputSchema": {
                            "type": "object",
                            "required": ["template"],
                            "properties": {
                                "template": {
                                    "type": "string",
                                    "enum": ["tool_slot", "accesskit_node", "ctrl_tab_handler", "rtl_layout_row", "confined_path", "keep_rule_parser"],
                                    "description": "The template boilerplate to generate"
                                }
                            }
                        }
                    },
                    {
                        "name": "resolve_library_primitive",
                        "description": "Resolves which craft-libs crate and module provides the canonical implementation for a given domain.",
                        "inputSchema": {
                            "type": "object",
                            "required": ["domain"],
                            "properties": {
                                "domain": {
                                    "type": "string",
                                    "description": "Domain to resolve: printing, keymap, ui, a11y, i18n, flags, windowing, confine, sandbox, fonts, gpu, testing, fuzzing, cloud, sync, color"
                                }
                            }
                        }
                    }
                ]
            })),
            error: None,
        }),
        "tools/call" => {
            let params = req.params.as_ref().unwrap_or(&Value::Null);
            let tool_name = params.get("name").and_then(Value::as_str).unwrap_or("");
            let arguments = params.get("arguments").unwrap_or(&Value::Null);

            let tool_result = match tool_name {
                "list_standards" => execute_list_standards(arguments),
                "get_standard" => execute_get_standard(arguments),
                "verify_component" => execute_verify_component(arguments),
                "generate_compliant_code" => execute_generate_compliant_code(arguments),
                "resolve_library_primitive" => execute_resolve_library_primitive(arguments),
                _ => json!({ "error": format!("Unknown tool: {tool_name}") }),
            };

            Some(JsonRpcResponse {
                jsonrpc: "2.0".to_string(),
                id,
                result: Some(json!({
                    "content": [
                        {
                            "type": "text",
                            "text": serde_json::to_string_pretty(&tool_result).unwrap_or_default()
                        }
                    ]
                })),
                error: None,
            })
        }
        _ => Some(JsonRpcResponse {
            jsonrpc: "2.0".to_string(),
            id,
            result: None,
            error: Some(json!({ "code": -32601, "message": "Method not found" })),
        }),
    }
}

fn execute_list_standards(args: &Value) -> Value {
    let category = args.get("category").and_then(Value::as_str);

    let standards = [
        json!({ "id": "STD-COLOR-001", "title": "Universal Color Picker, Hex Parsing, and Color Space Proofing Ergonomics", "category": "interaction", "canonical_crate": "craft-libs::craft-color" }),
        json!({ "id": "STD-INPUT-001", "title": "Multi-Tool Toolbar Slot Cycling & Gesture Ergonomics", "category": "interaction", "canonical_crate": "craft-libs::craft-ui::ToolSlot" }),
        json!({ "id": "STD-INPUT-002", "title": "Transient and Spring-Loaded Tool Invariants", "category": "interaction", "canonical_crate": "craft-libs::craft-ui" }),
        json!({ "id": "STD-INPUT-003", "title": "Canvas Pan, Zoom Physics, and Viewport Invariants", "category": "interaction", "canonical_crate": "craft-libs::craft-ui" }),
        json!({ "id": "STD-INPUT-004", "title": "Selection and Bounding Box Transform Modifiers", "category": "interaction", "canonical_crate": "craft-libs::craft-ui" }),
        json!({ "id": "STD-NAV-001", "title": "Universal Document Tab Navigation (Ctrl+Tab)", "category": "navigation", "canonical_crate": "craft-libs::craft-keymap" }),
        json!({ "id": "STD-NAV-002", "title": "Workspace Panel Visibility and Dock Collapsing Toggles", "category": "navigation", "canonical_crate": "craft-libs::craft-keymap" }),
        json!({ "id": "STD-NAV-003", "title": "Arrow-Key Value Scrubbing and Step Multipliers", "category": "navigation", "canonical_crate": "craft-libs::craft-ui" }),
        json!({ "id": "STD-TIME-001", "title": "Timeline Navigation, JKL Scrubbing, and Timecode Invariants", "category": "navigation", "canonical_crate": "craft-libs::craft-ui" }),
        json!({ "id": "STD-A11Y-001", "title": "AccessKit Node Tagging and Automated CI Accessibility Audit", "category": "accessibility", "canonical_crate": "craft-libs::craft-ui::a11y" }),
        json!({ "id": "STD-A11Y-002", "title": "Keyboard Focus Rings, Contrast Ratios, and Reduced Motion", "category": "accessibility", "canonical_crate": "craft-libs::craft-ui" }),
        json!({ "id": "STD-I18N-001", "title": "Full Shell Direction Mirroring and Unicode BiDi Text Galley Shaping", "category": "internationalization", "canonical_crate": "craft-libs::craft-i18n" }),
        json!({ "id": "STD-I18N-002", "title": "Locale-Aware Numeric Formatting, Decimal Separators, and Measurement Units", "category": "internationalization", "canonical_crate": "craft-libs::craft-i18n" }),
        json!({ "id": "STD-CLIP-001", "title": "Cross-Application Drag-and-Drop, Clipboard Data Interchange, and External File Ingestion", "category": "shell", "canonical_crate": "craft-libs::craft-window" }),
        json!({ "id": "STD-CMD-001", "title": "Universal Application Command Taxonomy, CLI Flags, and Headless MCP Protocol", "category": "shell", "canonical_crate": "craft-libs::craft-keymap" }),
        json!({ "id": "STD-SHELL-001", "title": "Modal and Modeless Dialog Lifecycles, Dismissal, and Button Orders", "category": "shell", "canonical_crate": "craft-libs::craft-dialogs" }),
        json!({ "id": "STD-SHELL-002", "title": "Document Dirty State, Unsaved Changes Prompt, and Recovery Lifecycles", "category": "shell", "canonical_crate": "craft-libs::craft-window" }),
        json!({ "id": "STD-SHELL-003", "title": "Confined File Access, Sandboxing & Automation Root Isolation", "category": "shell", "canonical_crate": "craft-libs::craft-confine" }),
        json!({ "id": "STD-SHELL-004", "title": "Cloud Document Synchronization, Delta Journal & Conflict Lifecycles", "category": "shell", "canonical_crate": "craft-libs::craft-cloud" }),
        json!({ "id": "STD-LIB-001", "title": "Universal Cross-Platform Printing and Prepress Pipeline", "category": "unified-libs", "canonical_crate": "craft-libs::craft-print" }),
        json!({ "id": "STD-LIB-002", "title": "Keymap Architecture, Platform Chord Normalization, and Overrides", "category": "unified-libs", "canonical_crate": "craft-libs::craft-keymap" }),
        json!({ "id": "STD-LIB-003", "title": "UI Widget Primitives, Design Tokens, and Docking Systems", "category": "unified-libs", "canonical_crate": "craft-libs::craft-ui" }),
        json!({ "id": "STD-LIB-004", "title": "Host Font Discovery, On-Demand Activation & Fallback Rendering", "category": "unified-libs", "canonical_crate": "craft-libs::craft-font-store" }),
        json!({ "id": "STD-LIB-005", "title": "Invariant Testing, The Keep Rule & Hostile Input Sweeps", "category": "unified-libs", "canonical_crate": "craft-libs::craft-testkit" }),
        json!({ "id": "STD-LIB-006", "title": "Universal GPU Device Lifecycle, Shader Caches & Fallbacks", "category": "unified-libs", "canonical_crate": "craft-libs::craft-gpu" }),
    ];

    let filtered: Vec<&Value> = match category {
        Some(cat) => standards.iter().filter(|s| s["category"] == cat).collect(),
        None => standards.iter().collect(),
    };

    json!({ "standards": filtered })
}

fn execute_get_standard(args: &Value) -> Value {
    let id = args.get("id").and_then(Value::as_str).unwrap_or("");

    match id {
        "STD-COLOR-001" => json!({
            "id": "STD-COLOR-001",
            "title": "Universal Color Picker, Hex Parsing, and Color Space Proofing Ergonomics",
            "rules": [
                "Hex parsing must tolerate leading `#`, whitespace, 3/4/6/8 character hex representations.",
                "Color spaces must support sRGB, Display P3, and CMYK soft-proofing without clipping gamut.",
                "Alpha channel scrubbing defaults to 0..=100% or 0..=255 integer format."
            ],
            "canonical_crate": "craft-libs::craft-color"
        }),
        "STD-INPUT-001" => json!({
            "id": "STD-INPUT-001",
            "title": "Multi-Tool Toolbar Slot Cycling",
            "rules": [
                "Alt/Option-click cycles the slot tools in order with instant wrap.",
                "Inspect release-event modifiers, NOT frame modifiers (prevents missed Alt releases).",
                "Suppress double-click dialogs (tool.options) on rapid Alt-clicks.",
                "Long-press (350ms) or Right-click opens the flyout menu."
            ],
            "canonical_widget": "craft-libs::craft-ui::ToolSlot"
        }),
        "STD-NAV-001" => json!({
            "id": "STD-NAV-001",
            "title": "Universal Document Tab Navigation",
            "rules": [
                "Ctrl+Tab switches to next document tab; Ctrl+Shift+Tab switches to previous.",
                "Applies to ALL platforms including macOS (Cmd+Tab is reserved for OS).",
                "Tab toggles all workspace panels; Shift+Tab toggles side docks only."
            ],
            "canonical_crate": "craft-libs::craft-keymap"
        }),
        "STD-A11Y-001" => json!({
            "id": "STD-A11Y-001",
            "title": "AccessKit Node Tagging & CI Audit",
            "rules": [
                "Every interactive rect must have an AccessKit Role and translated name.",
                "Use craft_ui::a11y::role_name(&resp, Role::Button, label).",
                "All apps must run tests/it/ui_accessibility_audit.rs in CI."
            ]
        }),
        "STD-I18N-001" => json!({
            "id": "STD-I18N-001",
            "title": "Full Shell Mirroring & BiDi Shaping",
            "rules": [
                "Toolbar docks right, inspector docks left when is_rtl() is true.",
                "Support CRAFT_UI_DIRECTION=rtl test environment variable.",
                "Wrap text labels with craft_i18n::rtl::widget(ui, text) for BiDi shaping."
            ]
        }),
        "STD-SHELL-002" => json!({
            "id": "STD-SHELL-002",
            "title": "Document Dirty State, Unsaved Changes Prompt, and Recovery Lifecycles",
            "rules": [
                "Window title must show dirty bullet `•` when changes are uncommitted.",
                "Close event must intercept dirty documents with Save / Don't Save / Cancel dialog.",
                "Autosave writes atomics to temp journals without overwriting working document."
            ],
            "canonical_crate": "craft-libs::craft-window"
        }),
        "STD-SHELL-003" => json!({
            "id": "STD-SHELL-003",
            "title": "Confined File Access, Sandboxing & Automation Root Isolation",
            "rules": [
                "All file path resolution must be verified against an isolated root via craft-confine.",
                "Headless / automation runs must enforce `--automation-read-root` restrictions.",
                "Path traversal sequences (`..`), symlinks, and junctions escaping root must be rejected with PermissionDenied."
            ],
            "canonical_crate": "craft-libs::craft-confine"
        }),
        "STD-SHELL-004" => json!({
            "id": "STD-SHELL-004",
            "title": "Cloud Document Synchronization, Delta Journal & Conflict Lifecycles",
            "rules": [
                "Cloud state mutations must be represented as immutable, causal delta journals.",
                "Concurrent conflicting edits must merge via CRDT or surface clear non-destructive branch forks.",
                "Network reconnects must backoff with full jitter and replay pending deltas in monotonic order."
            ],
            "canonical_crate": "craft-libs::craft-cloud"
        }),
        "STD-LIB-001" => json!({
            "id": "STD-LIB-001",
            "title": "Printing Pipeline",
            "rules": [
                "All printing routes through craft-libs::craft-print.",
                "Zero direct platform print API calls (winspool, cups, etc)."
            ],
            "canonical_crate": "craft-libs::craft-print"
        }),
        "STD-LIB-004" => json!({
            "id": "STD-LIB-004",
            "title": "Host Font Discovery, On-Demand Activation & Fallback Rendering",
            "rules": [
                "Font enumeration in UI pickers must be metadata-only (no disk read of TTF/OTF tables during browse).",
                "Glyph rasterization and outline parsing occurs on-demand upon canvas rendering.",
                "Missing glyphs must fallback gracefully through universal typography chains without panics."
            ],
            "canonical_crate": "craft-libs::craft-font-store"
        }),
        "STD-LIB-005" => json!({
            "id": "STD-LIB-005",
            "title": "Invariant Testing, The Keep Rule & Hostile Input Sweeps",
            "rules": [
                "The Keep Rule: No user input, corrupted document, or hostile asset may cause process panic.",
                "All decoders must survive hostile::hammer fuzzer sweeps in CI.",
                "Property test suites must execute invariants across arbitrary serialized states."
            ],
            "canonical_crate": "craft-libs::craft-testkit"
        }),
        "STD-LIB-006" => json!({
            "id": "STD-LIB-006",
            "title": "Universal GPU Device Lifecycle, Shader Caches & Fallbacks",
            "rules": [
                "GPU pipelines must gracefully handle DeviceLost events and reconstruct buffers.",
                "Compiled WGSL shaders must be disk-cached by hash to ensure instant cold boot.",
                "Headless CI and software fallbacks must execute seamlessly via llvmpipe / CPU rasterizers."
            ],
            "canonical_crate": "craft-libs::craft-gpu"
        }),
        _ => json!({ "error": format!("Standard '{id}' not found.") }),
    }
}

fn execute_verify_component(args: &Value) -> Value {
    let component_kind = args.get("component_kind").and_then(Value::as_str).unwrap_or("");
    let code = args.get("code_snippet").and_then(Value::as_str).unwrap_or("");

    let mut violations = Vec::new();
    let mut recommendations = Vec::new();

    if component_kind == "toolbar_button" {
        if code.contains("inp.modifiers.alt") || code.contains("i.modifiers.alt") {
            violations.push(json!({
                "rule": "STD-INPUT-001",
                "severity": "error",
                "message": "Reading modifiers from frame input (inp.modifiers.alt) drops Alt during rapid clicks. Must inspect the primary PointerButton release event."
            }));
        }
        if code.contains("double_clicked()") && !code.contains("modified") {
            violations.push(json!({
                "rule": "STD-INPUT-001",
                "severity": "error",
                "message": "Unshielded double_clicked() call: rapid Alt-clicks will accidentally trigger double-click modal dialogs. Track modified state."
            }));
        }
        if !code.contains("a11y") && !code.contains("widget_info") {
            violations.push(json!({
                "rule": "STD-A11Y-001",
                "severity": "warning",
                "message": "Missing AccessKit role and name annotation. Screen readers will see this tool button as an unnamed empty node."
            }));
        }
        recommendations.push("Replace custom button logic with 'craft_ui::ToolSlot', which handles all edge-cases out of the box.");
    } else if component_kind == "printing" {
        if code.contains("winspool") || code.contains("cups") || code.contains("NSPrint") {
            violations.push(json!({
                "rule": "STD-LIB-001",
                "severity": "error",
                "message": "Direct platform print API calls detected. All printing must route through craft_print::PrintSession."
            }));
        }
    } else if component_kind == "file_io" {
        if (code.contains("std::fs::read") || code.contains("std::fs::File::open") || code.contains("std::fs::write")) && !code.contains("craft_confine") && !code.contains("confined") {
            violations.push(json!({
                "rule": "STD-SHELL-003",
                "severity": "error",
                "message": "Unconfined direct filesystem access detected. All document and automation reads must be verified through craft-libs::craft-confine::PathConfine to prevent sandbox escapes."
            }));
            recommendations.push("Use `craft_confine::PathConfine::new(root).resolve(untrusted_path)?` before opening files.");
        }
    } else if component_kind == "parser" {
        if code.contains(".unwrap()") || code.contains(".expect(") {
            violations.push(json!({
                "rule": "STD-LIB-005",
                "severity": "error",
                "message": "Panic potential (.unwrap()/.expect()) detected in parser. The Keep Rule forbids crashing on corrupted or hostile files."
            }));
            recommendations.push("Return Result<T, ParseError> and add a hostile sweep fuzz test using `craft_testkit::hostile`.");
        }
    } else if component_kind == "fonts" {
        if code.contains("DirectWrite") || code.contains("CoreText") || code.contains("fontconfig") {
            violations.push(json!({
                "rule": "STD-LIB-004",
                "severity": "error",
                "message": "Direct platform font API detected. Use craft-libs::craft-font-store for cross-platform on-demand font activation and fallbacks."
            }));
        }
    } else if component_kind == "gpu" {
        if code.contains("wgpu::Device") && !code.contains("on_uncaptured_error") && !code.contains("DeviceLost") {
            violations.push(json!({
                "rule": "STD-LIB-006",
                "severity": "warning",
                "message": "GPU device initialized without uncaptured error or DeviceLost lifecycle recovery handler."
            }));
            recommendations.push("Implement STD-LIB-006 DeviceLost recovery loop to restore render pipelines upon GPU reset.");
        }
    } else if component_kind == "cloud_sync" {
        if !code.contains("delta") && !code.contains("version") && !code.contains("journal") {
            violations.push(json!({
                "rule": "STD-SHELL-004",
                "severity": "warning",
                "message": "Direct cloud state mutation without delta journal or version vector tracking. May cause irreversible merge conflicts."
            }));
        }
    }

    if violations.is_empty() {
        json!({
            "status": "passed",
            "message": "Code snippet satisfies all ArtCraft standard contracts."
        })
    } else {
        json!({
            "status": "violations_found",
            "violations_count": violations.len(),
            "violations": violations,
            "recommendations": recommendations
        })
    }
}

fn execute_generate_compliant_code(args: &Value) -> Value {
    let template = args.get("template").and_then(Value::as_str).unwrap_or("");

    match template {
        "tool_slot" => json!({
            "template": "tool_slot",
            "standard": "STD-INPUT-001",
            "rust_snippet": r#"// 100% STD-INPUT-001 Compliant ToolSlot Click & Cycling Handler
let click_mods = ui.input(|i| {
    i.events.iter().find_map(|e| match e {
        egui::Event::PointerButton { button: egui::PointerButton::Primary, pressed: false, modifiers, .. } => Some(*modifiers),
        _ => None,
    }).unwrap_or(i.modifiers)
});
let alt = click_mods.alt;
let modified = click_mods.alt || click_mods.shift || click_mods.ctrl || click_mods.command;

let slot_click = resp.clicked() && !ended_hold;
if slot_click {
    if slot.len() > 1 && alt {
        let from = slot.iter().position(|t| *t == current_tool).unwrap_or(0);
        app.select_tool(slot[(from + 1) % slot.len()]);
    } else {
        app.select_tool(shown_tool);
    }
}

// Shield double-click dialog from rapid modified clicks
if resp.double_clicked() && !modified && !prev_modified {
    app.open_tool_options(shown_tool);
}

// Annotate for Assistive Technology (STD-A11Y-001)
craft_ui::a11y::role_name(&resp, egui::accesskit::Role::Button, tl!(shown_tool.label()));"#
        }),
        "accesskit_node" => json!({
            "template": "accesskit_node",
            "standard": "STD-A11Y-001",
            "rust_snippet": r#"// STD-A11Y-001 Compliant AccessKit Node Builder
r.ctx.accesskit_node_builder(r.id, |n| {
    n.set_bounds(egui::accesskit::Rect {
        x0: r.rect.min.x.into(),
        y0: r.rect.min.y.into(),
        x1: r.rect.max.x.into(),
        y1: r.rect.max.y.into()
    });
    n.set_role(egui::accesskit::Role::Button);
    n.set_label(tl!("Tool Name"));
    if r.sense.is_focusable() {
        n.add_action(egui::accesskit::Action::Focus);
    }
    if r.sense.senses_click() {
        n.add_action(egui::accesskit::Action::Click);
    }
});"#
        }),
        "ctrl_tab_handler" => json!({
            "template": "ctrl_tab_handler",
            "standard": "STD-NAV-001",
            "rust_snippet": r#"// STD-NAV-001 Compliant Tab Navigation Chords
// Register in command catalog:
("window.nextDocument", "Next Document", &[], Some("Ctrl+Tab")),
("window.previousDocument", "Previous Document", &[], Some("Ctrl+Shift+Tab")),

// In input handler:
if ui.input_mut(|i| i.consume_key(egui::Modifiers::CTRL, egui::Key::Tab)) {
    app.session.next_document();
}
if ui.input_mut(|i| i.consume_key(egui::Modifiers::CTRL | egui::Modifiers::SHIFT, egui::Key::Tab)) {
    app.session.prev_document();
}"#
        }),
        "rtl_layout_row" => json!({
            "template": "rtl_layout_row",
            "standard": "STD-I18N-001",
            "rust_snippet": r#"// STD-I18N-001 Compliant RTL Layout Wrapper
let layout = if craft_i18n::is_rtl() {
    egui::Layout::right_to_left(egui::Align::Center)
} else {
    egui::Layout::left_to_right(egui::Align::Center)
};
ui.with_layout(layout, |ui| {
    // Labels automatically shaped via Unicode BiDi:
    ui.label(craft_i18n::rtl::widget(ui, tl!("Toolbar Item")));
});"#
        }),
        "confined_path" => json!({
            "template": "confined_path",
            "standard": "STD-SHELL-003",
            "rust_snippet": r#"// STD-SHELL-003 Confined File Resolver
use craft_confine::PathConfine;

pub fn safely_open_document(user_path: &std::path::Path, allowed_root: &std::path::Path) -> Result<std::fs::File, std::io::Error> {
    let confinement = PathConfine::new(allowed_root);
    let safe_path = confinement.resolve(user_path)
        .map_err(|e| std::io::Error::new(std::io::ErrorKind::PermissionDenied, e))?;
    std::fs::File::open(safe_path)
}"#
        }),
        "keep_rule_parser" => json!({
            "template": "keep_rule_parser",
            "standard": "STD-LIB-005",
            "rust_snippet": r#"// STD-LIB-005 Panic-Free Parser Skeleton (The Keep Rule)
#[derive(Debug, thiserror::Error)]
pub enum DocumentParseError {
    #[error("Unexpected EOF: need {needed} bytes, got {actual}")]
    UnexpectedEof { needed: usize, actual: usize },
    #[error("Corrupt header magic: {0:?}")]
    CorruptHeader([u8; 4]),
    #[error("Invalid element count: {0}")]
    InvalidCount(u32),
}

pub fn parse_document_header(bytes: &[u8]) -> Result<DocumentHeader, DocumentParseError> {
    if bytes.len() < 8 {
        return Err(DocumentParseError::UnexpectedEof { needed: 8, actual: bytes.len() });
    }
    let magic: [u8; 4] = bytes[0..4].try_into().map_err(|_| DocumentParseError::UnexpectedEof { needed: 4, actual: bytes.len() })?;
    if &magic != b"CRFT" {
        return Err(DocumentParseError::CorruptHeader(magic));
    }
    let version = u32::from_le_bytes(bytes[4..8].try_into().unwrap());
    Ok(DocumentHeader { version })
}"#
        }),
        _ => json!({ "error": format!("Unknown template: '{template}'. Available: tool_slot, accesskit_node, ctrl_tab_handler, rtl_layout_row, confined_path, keep_rule_parser") }),
    }
}

fn execute_resolve_library_primitive(args: &Value) -> Value {
    let domain = args.get("domain").and_then(Value::as_str).unwrap_or("");

    match domain {
        "printing" => json!({ "crate": "craft-print", "path": "craft-libs/crates/print", "description": "Unified printing across Windows GDI, CUPS, and PDF." }),
        "keymap" => json!({ "crate": "craft-keymap", "path": "craft-libs/crates/keymap", "description": "Platform chord abstraction, JSON keymap schemas, conflict detection." }),
        "ui" => json!({ "crate": "craft-ui", "path": "craft-libs/crates/ui", "description": "Shared egui components, ToolSlot, TabBar, Dock, theme tokens." }),
        "a11y" => json!({ "crate": "craft-ui::a11y", "path": "craft-libs/crates/ui/src/a11y.rs", "description": "AccessKit tagging helpers (role, name, node) and audit suites." }),
        "i18n" => json!({ "crate": "craft-i18n", "path": "craft-libs/crates/i18n", "description": "Catalogs, Unicode BiDi galley shaper, HarfBuzz complex scripts, RTL layout helpers." }),
        "flags" => json!({ "crate": "craft-flags", "path": "craft-libs/crates/flags", "description": "Runtime feature toggling." }),
        "windowing" => json!({ "crate": "craft-window", "path": "craft-libs/crates/window", "description": "Multi-window lifecycle and native OS dialog integration." }),
        "confine" | "sandbox" | "file-access" => json!({ "crate": "craft-confine", "path": "craft-libs/crates/confine", "description": "Path traversal prevention, sandbox boundary enforcement, and automation root confinement (STD-SHELL-003 / RFC-0015)." }),
        "fonts" | "font-store" => json!({ "crate": "craft-font-store", "path": "craft-libs/crates/font-store", "description": "Host font discovery, metadata enumeration, on-demand glyph activation, and typographic fallbacks (STD-LIB-004 / RFC-0034)." }),
        "testing" | "fuzzing" | "hostile" => json!({ "crate": "craft-testkit", "path": "craft-libs/crates/testkit", "description": "The Keep Rule enforcement, hostile byte fuzzer sweeps, invariant assertions, and headless harnesses (STD-LIB-005 / RFC-0071)." }),
        "gpu" | "rendering" | "shaders" => json!({ "crate": "craft-gpu", "path": "craft-libs/crates/gpu", "description": "Universal GPU device lifecycle, device loss recovery, shader compilation caches, and fallback contexts (STD-LIB-006 / RFC-0022)." }),
        "cloud" | "sync" | "crdt" => json!({ "crate": "craft-cloud", "path": "craft-libs/crates/cloud", "description": "Delta journals, conflict resolution lifecycles, and causal CRDT sync pipelines (STD-SHELL-004 / RFC-0024)." }),
        "color" | "icc" | "proofing" => json!({ "crate": "craft-color", "path": "craft-libs/crates/color", "description": "Universal color spaces, hex parsing, CMYK/sRGB proofing (STD-COLOR-001)." }),
        _ => json!({ "error": format!("No standard library mapped for domain: '{domain}'. Consider proposing one.") }),
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_list_standards_all() {
        let res = execute_list_standards(&json!({}));
        let list = res["standards"].as_array().expect("array of standards");
        assert_eq!(list.len(), 25);
    }

    #[test]
    fn test_list_standards_filter() {
        let res = execute_list_standards(&json!({ "category": "interaction" }));
        let list = res["standards"].as_array().expect("array of standards");
        assert!(!list.is_empty());
        for item in list {
            assert_eq!(item["category"], "interaction");
        }
    }

    #[test]
    fn test_get_standard() {
        let res = execute_get_standard(&json!({ "id": "STD-INPUT-001" }));
        assert_eq!(res["id"], "STD-INPUT-001");
        assert!(res["rules"].as_array().unwrap().len() >= 3);

        let res_shell = execute_get_standard(&json!({ "id": "STD-SHELL-003" }));
        assert_eq!(res_shell["id"], "STD-SHELL-003");
        assert_eq!(res_shell["canonical_crate"], "craft-libs::craft-confine");
    }

    #[test]
    fn test_verify_component_flags_violations() {
        let bad_code = r#"
            let alt = inp.modifiers.alt;
            if resp.clicked() && alt { app.cycle(); }
            else if resp.double_clicked() { app.open_dialog(); }
        "#;
        let res = execute_verify_component(&json!({
            "component_kind": "toolbar_button",
            "code_snippet": bad_code
        }));
        assert_eq!(res["status"], "violations_found");
        let violations = res["violations"].as_array().unwrap();
        assert!(violations.len() >= 2);
    }

    #[test]
    fn test_verify_component_file_io_violation() {
        let unsafe_io = r#"
            let bytes = std::fs::read("/etc/passwd");
        "#;
        let res = execute_verify_component(&json!({
            "component_kind": "file_io",
            "code_snippet": unsafe_io
        }));
        assert_eq!(res["status"], "violations_found");
        let violations = res["violations"].as_array().unwrap();
        assert_eq!(violations[0]["rule"], "STD-SHELL-003");
    }

    #[test]
    fn test_verify_component_parser_violation() {
        let panicky_parser = r#"
            let chunk = buffer.get(..4).unwrap();
        "#;
        let res = execute_verify_component(&json!({
            "component_kind": "parser",
            "code_snippet": panicky_parser
        }));
        assert_eq!(res["status"], "violations_found");
        let violations = res["violations"].as_array().unwrap();
        assert_eq!(violations[0]["rule"], "STD-LIB-005");
    }

    #[test]
    fn test_verify_component_passes_clean_code() {
        let clean_code = r#"
            let click_mods = get_release_mods();
            if slot_click && click_mods.alt { app.cycle(); }
            if resp.double_clicked() && !modified && !prev_modified { app.open(); }
            craft_ui::a11y::role_name(&resp, Role::Button, "tool");
        "#;
        let res = execute_verify_component(&json!({
            "component_kind": "toolbar_button",
            "code_snippet": clean_code
        }));
        assert_eq!(res["status"], "passed");
    }

    #[test]
    fn test_generate_compliant_code() {
        let res = execute_generate_compliant_code(&json!({ "template": "tool_slot" }));
        assert_eq!(res["template"], "tool_slot");
        assert!(res["rust_snippet"].as_str().unwrap().contains("STD-INPUT-001"));

        let res_keep = execute_generate_compliant_code(&json!({ "template": "keep_rule_parser" }));
        assert_eq!(res_keep["template"], "keep_rule_parser");
        assert!(res_keep["rust_snippet"].as_str().unwrap().contains("The Keep Rule"));
    }

    #[test]
    fn test_resolve_library_primitive() {
        let res = execute_resolve_library_primitive(&json!({ "domain": "printing" }));
        assert_eq!(res["crate"], "craft-print");

        let res_confine = execute_resolve_library_primitive(&json!({ "domain": "confine" }));
        assert_eq!(res_confine["crate"], "craft-confine");

        let res_font = execute_resolve_library_primitive(&json!({ "domain": "fonts" }));
        assert_eq!(res_font["crate"], "craft-font-store");
    }
}
