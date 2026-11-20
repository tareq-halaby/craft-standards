<p align="center">
  <a href="https://getartcraft.com/">
    <img alt="ArtCraft" src="assets/artcraft-studio.svg" width="128">
  </a>
</p>

<h1 align="center">ArtCraft Standards (`craft-standards`)</h1>

<p align="center">
  <b>The Single Source of Truth for UX Invariants, Shared Ergonomic Contracts, and AI Agent Governance across the entire ArtCraft Suite.</b>
</p>

<p align="center">
  <img alt="License: MIT OR Apache-2.0" src="https://img.shields.io/badge/license-MIT%20%2F%20Apache--2.0-3a3a3a?style=flat-square">
  <img alt="Status: active" src="https://img.shields.io/badge/status-active-success?style=flat-square">
  <a href="https://tareq-halaby.github.io/craft-standards/"><img alt="Live Dashboard" src="https://img.shields.io/badge/Dashboard-GitHub%20Pages-brightgreen?style=flat-square"></a>
  <img alt="MCP: enabled" src="https://img.shields.io/badge/MCP-craft--standards--mcp-blue?style=flat-square">
  <img alt="AutoCraft: integrated" src="https://img.shields.io/badge/AutoCraft-integrated-purple?style=flat-square">
  <img alt="Apps: 20+" src="https://img.shields.io/badge/ArtCraft%20Apps-20%2B-orange?style=flat-square">
</p>

---

## The ArtCraft Ecosystem Roster

`craft-standards` governs interaction, accessibility, localization, keymaps, and shared library contracts across all **20+ applications** in the ArtCraft suite:

| Category | Applications | Primary Invariants & Standards |
| :--- | :--- | :--- |
| **AI & Generative Media** | **ArtCraft Studio** | Generative prompts, prompt history, model settings, latency & streaming state. |
| **Graphics & Design** | **PhotoCraft**, **VectorCraft**, **LightCraft**, **DesignCraft**, **FigCraft**, **TextureCraft**, **MaterialCraft** | Multi-tool cycling (`STD-INPUT-001`), Canvas pan/zoom (`STD-INPUT-003`), Transform constraints (`STD-INPUT-004`). |
| **Video & Effects** | **FilmCraft**, **EffectCraft**, **AniCraft** | Timeline scrubbing (`STD-NAV-003`), Keyframe navigation, Track solo/mute, Render preview contracts. |
| **Audio** | **SoundCraft** | Decibel meter colors, Waveform zoom, Audio scrub gestures, Clip snapping. |
| **CAD & Drafting** | **CADCraft** | Precision coordinate entry, Snapping grid, Orthogonal constraint modifiers. |
| **Office & Productivity** | **WordCraft**, **GridCraft**, **DeckCraft**, **PdfCraft** | Document tabs (`STD-NAV-001`), AccessKit tree (`STD-A11Y-001`), Unit conversion (`STD-I18N-002`), Dirty indicators (`STD-SHELL-002`). |
| **Developer Tools** | **Craft Anything** | Visual plugin builder, extension manifests, MCP integration. |
| **Third-Party & Mail** | **SolidCraft**, **MailCraft** | Shell layout mirroring (`STD-I18N-001`), Focus rings (`STD-A11Y-002`), Universal shortcuts. |
| **Suite Infrastructure** | **Craft Launcher**, **craft-libs**, **craft-wiki**, **autocraft** | Unified update checks, MCP gateway, shared crates (`craft-ui`, `craft-print`, `craft-keymap`). |

---

## The Storytold Architecture Quad

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
│   PhotoCraft │ DesignCraft │ FilmCraft │ WordCraft │ CADCraft │ ...    │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Directory Structure

```text
craft-standards/
├── standards/                    # Normative behavioral specifications
│   ├── 01-interaction/           # Tool cycling, spring-loaded tools, canvas manipulation
│   ├── 02-navigation/            # Document tab switching (Ctrl+Tab), panel toggles
│   ├── 03-accessibility/         # AccessKit role tagging, focus rings, CI audits
│   ├── 04-internationalization/  # Full shell mirroring, Unicode BiDi galley shaping
│   ├── 05-shell-and-chrome/      # Dialog lifecycles, dirty state, dock behavior
│   └── 06-unified-libs/          # Contracts for craft-print, craft-i18n, craft-ui
├── schemas/                      # Machine-readable JSON schemas
│   ├── standard.schema.json      # Standard specification metadata schema
│   ├── keymap.schema.json        # Keymap and shortcut validation schema
│   └── tokens.schema.json        # Theme design token schema
├── agents/                       # Machine-readable instructions for AI agents
│   ├── AGENTS.md                 # Universal instructions for AI coding agents
│   ├── autocraft-gate.md         # Pre-implementation verification for AutoCraft
│   └── skills/                   # Antigravity, Cursor, and Claude Code skills
├── crates/
│   └── craft-standards-mcp/      # Embedded stdio MCP server for agents
├── xtask/                        # Developer CLI (cargo xtask audit | list)
└── .github/workflows/ci.yml      # Automated CI workflow
```

---

## Active Standards Catalog

> [!TIP]
> **Explore the interactive dashboard:** Browse, search, and filter all 28 standards with live interactive sandboxes, the cross-app compliance matrix, and AST drift detection at **[https://tareq-halaby.github.io/craft-standards/](https://tareq-halaby.github.io/craft-standards/)**.

| Standard ID | Title | Category | Canonical Crate |
| :--- | :--- | :--- | :--- |
| **`STD-META-001`** | [Standard of Standardizing & MCP Invariants](standards/00-governance/STD-META-001-standard-of-standardizing.md) | Governance | `craft-standards-mcp` |
| **`STD-GOV-001`** | [Clean-Room & License Allowlist](standards/00-governance/STD-GOV-001-clean-room-and-licensing.md) | Governance | `craft-standards-mcp` |
| **`STD-GOV-002`** | [Issue Claims & PR Lifecycle](standards/00-governance/STD-GOV-002-issue-claims-and-pr-lifecycle.md) | Governance | `craft-standards-mcp` |
| **`STD-COLOR-001`** | [Color Space, Pickers & Proofing](standards/01-interaction/STD-COLOR-001-color-space-and-picker-ergonomics.md) | Interaction | `craft-libs::craft-color` |
| **`STD-INPUT-001`** | [Multi-Tool Button Cycling](standards/01-interaction/STD-INPUT-001-tool-slot-cycling.md) | Interaction | `craft-libs::craft-ui` |
| **`STD-INPUT-002`** | [Transient & Spring-Loaded Tools](standards/01-interaction/STD-INPUT-002-transient-spring-tools.md) | Interaction | `craft-libs::craft-ui` |
| **`STD-INPUT-003`** | [Canvas Pan & Zoom Physics](standards/01-interaction/STD-INPUT-003-canvas-pan-zoom.md) | Interaction | `craft-libs::craft-ui` |
| **`STD-INPUT-004`** | [Selection & Bounding Box Modifiers](standards/01-interaction/STD-INPUT-004-selection-modifiers.md) | Interaction | `craft-libs::craft-ui` |
| **`STD-NAV-001`** | [Document Tab Switching (`Ctrl+Tab`)](standards/02-navigation/STD-NAV-001-document-tab-switching.md) | Navigation | `craft-libs::craft-keymap` |
| **`STD-NAV-002`** | [Workspace Panel Toggles](standards/02-navigation/STD-NAV-002-workspace-panel-toggles.md) | Navigation | `craft-libs::craft-keymap` |
| **`STD-NAV-003`** | [Arrow-Key Value Scrubbing](standards/02-navigation/STD-NAV-003-arrow-key-scrubbing.md) | Navigation | `craft-libs::craft-ui` |
| **`STD-TIME-001`** | [Timeline Navigation & JKL Scrubbing](standards/02-navigation/STD-TIME-001-timeline-and-timecode-navigation.md) | Navigation | `craft-libs::craft-ui` |
| **`STD-A11Y-001`** | [AccessKit Node Tagging & CI Audit](standards/03-accessibility/STD-A11Y-001-accesskit-naming-audit.md) | Accessibility | `craft-libs::craft-ui::a11y` |
| **`STD-A11Y-002`** | [Focus Rings & Reduced Motion](standards/03-accessibility/STD-A11Y-002-keyboard-focus-and-contrast.md) | Accessibility | `craft-libs::craft-ui` |
| **`STD-I18N-001`** | [Shell Mirroring & BiDi Shaping](standards/04-internationalization/STD-I18N-001-shell-mirroring-and-rtl.md) | Internationalization | `craft-libs::craft-i18n` |
| **`STD-I18N-002`** | [Numeric & Unit Formatting](standards/04-internationalization/STD-I18N-002-number-and-locale-formatting.md) | Internationalization | `craft-libs::craft-i18n` |
| **`STD-CLIP-001`** | [Clipboard & Drag-and-Drop Ingestion](standards/05-shell-and-chrome/STD-CLIP-001-drag-drop-and-clipboard-exchange.md) | Shell | `craft-libs::craft-window` |
| **`STD-CMD-001`** | [Command Taxonomy & Headless MCP](standards/05-shell-and-chrome/STD-CMD-001-universal-command-taxonomy.md) | Shell | `craft-libs::craft-keymap` |
| **`STD-SHELL-001`** | [Dialog Lifecycle & Button Order](standards/05-shell-and-chrome/STD-SHELL-001-dialog-lifecycle.md) | Shell | `craft-libs::craft-dialogs` |
| **`STD-SHELL-002`** | [Document Dirty State & Autosave](standards/05-shell-and-chrome/STD-SHELL-002-document-dirty-and-autosave.md) | Shell | `craft-libs::craft-window` |
| **`STD-SHELL-003`** | [Confined File Access & Sandboxing](standards/05-shell-and-chrome/STD-SHELL-003-confined-file-access.md) | Shell | `craft-libs::craft-confine` |
| **`STD-SHELL-004`** | [Cloud Document Sync & Conflicts](standards/05-shell-and-chrome/STD-SHELL-004-cloud-document-sync-and-conflicts.md) | Shell | `craft-libs::craft-cloud` |
| **`STD-LIB-001`** | [Cross-Platform Printing Pipeline](standards/06-unified-libs/STD-LIB-001-printing-pipeline.md) | Unified Libs | `craft-libs::craft-print` |
| **`STD-LIB-002`** | [Keymap Architecture & Overrides](standards/06-unified-libs/STD-LIB-002-keymap-architecture.md) | Unified Libs | `craft-libs::craft-keymap` |
| **`STD-LIB-003`** | [UI Widget Primitives & Tokens](standards/06-unified-libs/STD-LIB-003-ui-widget-primitives.md) | Unified Libs | `craft-libs::craft-ui` |
| **`STD-LIB-004`** | [Host Font Store & Fallbacks](standards/06-unified-libs/STD-LIB-004-host-font-store.md) | Unified Libs | `craft-libs::craft-font-store` |
| **`STD-LIB-005`** | [Invariant Testing & Hostile Sweeps](standards/06-unified-libs/STD-LIB-005-testing-invariants-and-hostile-sweeps.md) | Unified Libs | `craft-libs::craft-testkit` |
| **`STD-LIB-006`** | [GPU Device Lifecycle & Shaders](standards/06-unified-libs/STD-LIB-006-gpu-rendering-pipeline.md) | Unified Libs | `craft-libs::craft-gpu` |

---

## Contributing & Developer Tooling

Run the automated standards auditor locally:
```bash
cargo run --manifest-path xtask/Cargo.toml -- audit
```

List all registered standards:
```bash
cargo run --manifest-path xtask/Cargo.toml -- list
```

Scaffold standard-compliant integration tests adhering to the Keep Rule:
```bash
cargo run --manifest-path xtask/Cargo.toml -- testkit STD-SHELL-003
```

Rebuild the interactive portal:
```bash
cargo run --manifest-path xtask/Cargo.toml -- report
```

### Reusable GitHub Actions Sentinel
Any ArtCraft application repository can integrate the standards gate into `.github/workflows/standards.yml`:
```yaml
name: Standards Gate
on: [pull_request, push]
jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: tareq-halaby/craft-standards/actions/sentinel@main
```
