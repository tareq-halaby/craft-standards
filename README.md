<p align="center">
  <a href="https://getartcraft.com/">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="docs/brand/artcraft-logo-white.svg">
      <img alt="ArtCraft" src="docs/brand/artcraft-logo.svg" width="200">
    </picture>
  </a>
</p>

<h1 align="center">ArtCraft Standards (`craft-standards`)</h1>

<p align="center">
  <b>The Single Source of Truth for UX Invariants, Shared Ergonomic Contracts, and AI Agent Governance across the ArtCraft Suite.</b><br>
  Governs PhotoCraft, DesignCraft, EffectCraft, VectorCraft, WordCraft, Craft Launcher, and craft-libs.
</p>

<p align="center">
  <img alt="License: MIT OR Apache-2.0" src="https://img.shields.io/badge/license-MIT%20%2F%20Apache--2.0-3a3a3a?style=flat-square">
  <img alt="Status: active" src="https://img.shields.io/badge/status-active-success?style=flat-square">
  <img alt="MCP: enabled" src="https://img.shields.io/badge/MCP-craft--standards--mcp-blue?style=flat-square">
  <img alt="AutoCraft: integrated" src="https://img.shields.io/badge/AutoCraft-integrated-purple?style=flat-square">
</p>

---

## The Storytold Ecosystem Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        The Storytold Quad                              │
├───────────────────┬───────────────────┬────────────────────────────────┤
│    craft-wiki     │  craft-standards  │           craft-libs           │
│   (Knowledge)     │ (Contracts & MCP) │        (Implementation)        │
│                   │                   │                                │
│ • App guides      │ • Behavioral RFCs │ • craft-ui (components)       │
│ • Architecture    │ • MCP server      │ • craft-keymap (shortcuts)     │
│ • Domain context  │ • Agent Skills    │ • craft-i18n (languages/bidi)  │
│ • Release history │ • Linter/xtask    │ • craft-print (printing)       │
│ • Contributor FAQ │ • Keymap schemas  │ • craft-window & craft-dialogs │
└─────────┬─────────┴─────────┬─────────┴───────────────┬────────────────┘
          │                   │                         │
          │                   ▼                         │
          │       ┌────────────────────────┐            │
          │       │  storytold/autocraft   │            │
          │       │  (AI Agent Pipeline)   │            │
          │       └───────────┬────────────┘            │
          │                   │                         │
          ▼                   ▼                         ▼
┌────────────────────────────────────────────────────────────────────────┐
│                   Target Applications & AI Workflows                   │
│   PhotoCraft │ DesignCraft │ EffectCraft │ VectorCraft │ WordCraft     │
└────────────────────────────────────────────────────────────────────────┘
```

## Repository Mandates

1. **Behavioral Invariants ("The ArtCraft Soul"):**
   Specifies how controls, gestures, tabs, modifiers, and viewports behave across the entire suite. If a pattern exists in PhotoCraft, it behaves identically in DesignCraft, EffectCraft, VectorCraft, and WordCraft.

2. **Active Agent Intelligence (`craft-standards-mcp`):**
   Provides an embedded Model Context Protocol (MCP) server and agent skill suite. AI coding agents in **`storytold/autocraft`**, Antigravity, and Cursor query standards before writing code and run pre-flight verification checks.

3. **Unified Libraries Architecture:**
   Catalogs and defines authoritative contracts for shared crates in **`craft-libs`** (`craft-ui`, `craft-keymap`, `craft-i18n`, `craft-print`, `craft-window`), ensuring no app reinvents common primitives.

---

## Directory Structure

```text
craft-standards/
├── standards/                    # Normative behavioral specifications
│   ├── 01-interaction/           # Tool cycling, mouse gestures, canvas manipulation
│   ├── 02-navigation/            # Document tab switching (Ctrl+Tab), panel toggles
│   ├── 03-accessibility/         # AccessKit role tagging, focus rings, CI audits
│   ├── 04-internationalization/  # Full shell mirroring, Unicode BiDi galley shaping
│   ├── 05-shell-and-chrome/      # Dialog lifecycles, dirty state, dock behavior
│   └── 06-unified-libs/          # Contracts for craft-print, craft-i18n, craft-ui
├── schemas/                      # Machine-readable JSON schemas
│   ├── standard.schema.json      # Standard specification metadata schema
│   └── keymap.schema.json        # Keymap and shortcut validation schema
├── agents/                       # Machine-readable instructions for AI agents
│   ├── AGENTS.md                 # Universal instructions for AI coding agents
│   └── autocraft-gate.md         # Pre-implementation verification for AutoCraft
├── crates/
│   └── craft-standards-mcp/      # Embedded stdio MCP server for agents
└── xtask/                        # Validation tools (linting markdown & schemas)
```

---

## Active Standards Catalog

| Standard ID | Title | Canonical Implementation | Status |
| :--- | :--- | :--- | :---: |
| **`STD-INPUT-001`** | [Multi-Tool Button Cycling](standards/01-interaction/STD-INPUT-001-tool-slot-cycling.md) | `craft-libs::craft-ui::ToolSlot` | **Active** |
| **`STD-NAV-001`** | [Document Tab Switching (`Ctrl+Tab`)](standards/02-navigation/STD-NAV-001-document-tab-switching.md) | `craft-libs::craft-keymap` | **Active** |
| **`STD-A11Y-001`** | [AccessKit Node Tagging & CI Audit](standards/03-accessibility/STD-A11Y-001-accesskit-naming-audit.md) | `craft-libs::craft-ui::a11y` | **Active** |
| **`STD-I18N-001`** | [Full Shell Mirroring & BiDi Shaping](standards/04-internationalization/STD-I18N-001-shell-mirroring-and-rtl.md) | `craft-libs::craft-i18n` | **Active** |
| **`STD-LIB-001`** | [Cross-Platform Printing Pipeline](standards/06-unified-libs/STD-LIB-001-printing-pipeline.md) | `craft-libs::craft-print` | **Active** |

---

## Connecting the MCP Server to AI Clients

To connect `craft-standards-mcp` to your AI assistant (Cursor, Claude Desktop, Antigravity, VS Code):

```json
{
  "mcpServers": {
    "craft-standards": {
      "command": "cargo",
      "args": ["run", "--quiet", "--manifest-path", "path/to/craft-standards/crates/craft-standards-mcp/Cargo.toml"]
    }
  }
}
```

Available Tools:
* `list_standards`: Lists all approved standards with summaries and tags.
* `get_standard`: Fetches normative rules, acceptance criteria, and gotchas for a standard.
* `verify_component`: Verifies that proposed Rust/egui UI code adheres to standard modifiers, accessibility tags, and RTL mirroring.
* `resolve_library_primitive`: Returns the canonical `craft-libs` crate for a desired capability.

---

## License

Licensed under either of [Apache License, Version 2.0](LICENSE-APACHE) or [MIT License](LICENSE-MIT) at your option.
