//! craft-standards-mcp: Model Context Protocol server for ArtCraft standards governance.

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
                    "version": "0.1.0"
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
                        "description": "Lists all active ArtCraft standards across interaction, navigation, a11y, i18n, and unified libraries.",
                        "inputSchema": {
                            "type": "object",
                            "properties": {
                                "category": {
                                    "type": "string",
                                    "description": "Optional category filter: interaction, navigation, accessibility, internationalization, unified-libs"
                                }
                            }
                        }
                    },
                    {
                        "name": "get_standard",
                        "description": "Fetches normative requirements, acceptance rules, and implementation invariants for an ArtCraft standard.",
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
                        "description": "Pre-flight verification: checks proposed UI code for common ArtCraft anti-patterns (e.g. unhandled release modifiers, missing AccessKit labels, rapid-click double clicks).",
                        "inputSchema": {
                            "type": "object",
                            "required": ["component_kind", "code_snippet"],
                            "properties": {
                                "component_kind": {
                                    "type": "string",
                                    "enum": ["toolbar_button", "dialog", "dock_panel", "text_input"]
                                },
                                "code_snippet": {
                                    "type": "string",
                                    "description": "Rust/egui code snippet to analyze"
                                }
                            }
                        }
                    },
                    {
                        "name": "resolve_library_primitive",
                        "description": "Resolves which craft-libs crate and module provides canonical implementation for a technical domain.",
                        "inputSchema": {
                            "type": "object",
                            "required": ["domain"],
                            "properties": {
                                "domain": {
                                    "type": "string",
                                    "description": "Domain to resolve: printing, keymap, ui, a11y, i18n, flags, windowing"
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
        json!({
            "id": "STD-INPUT-001",
            "title": "Multi-Tool Toolbar Slot Cycling & Gesture Ergonomics",
            "category": "interaction",
            "canonical_crate": "craft-libs::craft-ui::ToolSlot"
        }),
        json!({
            "id": "STD-NAV-001",
            "title": "Universal Document Tab Navigation (Ctrl+Tab)",
            "category": "navigation",
            "canonical_crate": "craft-libs::craft-keymap"
        }),
        json!({
            "id": "STD-A11Y-001",
            "title": "AccessKit Node Tagging and Automated CI Accessibility Audit",
            "category": "accessibility",
            "canonical_crate": "craft-libs::craft-ui::a11y"
        }),
        json!({
            "id": "STD-I18N-001",
            "title": "Full Shell Direction Mirroring and Unicode BiDi Text Galley Shaping",
            "category": "internationalization",
            "canonical_crate": "craft-libs::craft-i18n"
        }),
        json!({
            "id": "STD-LIB-001",
            "title": "Universal Cross-Platform Printing and Prepress Pipeline",
            "category": "unified-libs",
            "canonical_crate": "craft-libs::craft-print"
        }),
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
        "STD-INPUT-001" => json!({
            "id": "STD-INPUT-001",
            "title": "Multi-Tool Toolbar Slot Cycling",
            "rules": [
                "Alt/Option-click cycles the slot tools in order with instant wrap.",
                "Inspect release-event modifiers, NOT frame modifiers (prevents missed Alt releases).",
                "Suppress double-click dialogs (tool.options) on rapid Alt-clicks.",
                "Long-press (350ms) or Right-click opens the flyout menu."
            ],
            "canonical_widget": "craft_ui::ToolSlot"
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
        "STD-LIB-001" => json!({
            "id": "STD-LIB-001",
            "title": "Printing Pipeline",
            "rules": [
                "All printing routes through craft-libs::craft-print.",
                "Zero direct platform print API calls (winspool, cups, etc)."
            ]
        }),
        _ => json!({ "error": format!("Standard '{id}' not found.") }),
    }
}

fn execute_verify_component(args: &Value) -> Value {
    let component_kind = args.get("component_kind").and_then(Value::as_str).unwrap_or("");
    let code = args.get("code_snippet").and_then(Value::as_str).unwrap_or("");

    let mut warnings = Vec::new();

    if component_kind == "toolbar_button" {
        if code.contains("inp.modifiers.alt") || code.contains("i.modifiers.alt") {
            warnings.push("Potential Bug (STD-INPUT-001): Reading modifiers from frame input instead of release event drops Alt on rapid key release.");
        }
        if code.contains("double_clicked()") && !code.contains("modified") {
            warnings.push("Potential Bug (STD-INPUT-001): Double-click is unshielded from modified clicks; rapid Alt-clicks will falsely trigger double-click dialogs.");
        }
        if !code.contains("a11y") && !code.contains("widget_info") {
            warnings.push("Violation (STD-A11Y-001): Interactive button lacks AccessKit accessible role and label.");
        }
    }

    if warnings.is_empty() {
        json!({ "status": "passed", "message": "Component adheres to ArtCraft standards." })
    } else {
        json!({ "status": "warnings_detected", "warnings": warnings })
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
        _ => json!({ "error": format!("No standard library mapped for domain: '{domain}'. Consider proposing one.") }),
    }
}
