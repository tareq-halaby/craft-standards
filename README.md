<p align="center">
  <a href="https://getartcraft.com/">
    <img alt="ArtCraft" src="assets/artcraft-studio.svg" width="128">
  </a>
</p>

<h1 align="center">ArtCraft Standards &amp; Reference App Guide (`craft-standards`)</h1>

<p align="center">
  <b>Practical UI Recipes, Shared Crates &amp; Reference-App Mappings for the 20+ ArtCraft Creative Desktop Applications.</b>
</p>

<p align="center">
  <img alt="License: MIT OR Apache-2.0" src="https://img.shields.io/badge/license-MIT%20%2F%20Apache--2.0-3a3a3a?style=flat-square">
  <img alt="Status: active" src="https://img.shields.io/badge/status-active-success?style=flat-square">
  <a href="https://tareq-halaby.github.io/craft-standards/"><img alt="Live Dashboard" src="https://img.shields.io/badge/Dashboard-GitHub%20Pages-brightgreen?style=flat-square"></a>
  <img alt="Languages" src="https://img.shields.io/badge/i18n-EN%20%7C%20AR%20%7C%20DE%20%7C%20ES%20%7C%20FR%20%7C%20JA-informational?style=flat-square">
  <img alt="MCP: enabled" src="https://img.shields.io/badge/MCP-craft--standards--mcp-blue?style=flat-square">
  <img alt="AutoCraft: integrated" src="https://img.shields.io/badge/AutoCraft-integrated-purple?style=flat-square">
  <img alt="Apps: 20+" src="https://img.shields.io/badge/ArtCraft%20Apps-20%2B-orange?style=flat-square">
</p>

> 📖 **Companion Overview:** Read the [Reference App & Architecture Guide](docs/INTRODUCTION.md) or explore the live interactive portal at [https://tareq-halaby.github.io/craft-standards/](https://tareq-halaby.github.io/craft-standards/).

---

## The ArtCraft Reference App Roster

In fast-moving Rust codebases with `egui` and `wgpu`, **the code is the documentation**. Individual applications intentionally align with their industry benchmark tools (Photoshop, DaVinci, AutoCAD) to preserve user muscle memory, while relying on shared crates for cross-cutting foundations:

| Application | Category | Industry Reference Benchmark | Primary Ergonomic Focus |
| :--- | :--- | :--- | :--- |
| **PhotoCraft** | Graphics | Adobe Photoshop / Krita | Raster layers, canvas zoom physics, marquee selection |
| **FilmCraft** | Video | DaVinci Resolve / Premiere Pro | Multi-track timeline, JKL shuttle scrubbing, playhead, razor cut |
| **VectorCraft** | Graphics | Adobe Illustrator / Inkscape | Bézier pen tool, vector anchor points, path math |
| **CADCraft** | CAD / 3D | AutoCAD / FreeCAD / Blender | Precision Cartesian coordinates, snapping grid, orthogonal projection |
| **WordCraft** | Productivity | InDesign / Typora / Markdown | Typographic galleys, document sections, markdown rendering |
| **AniCraft** | Animation | Blender Grease Pencil / Toon Boom | Frame-by-frame timeline, keyframing, onion skinning |
| **SoundCraft** | Audio | Audacity / Pro Tools | Audio waveforms, decibel meters, clip snapping |
| **LightCraft** | Photography | Adobe Lightroom / Capture One | Non-destructive RAW processing, exposure curves, color wheels |
| **TextureCraft** | 3D Texturing | Substance Designer / Painter | Procedural PBR node graphs, UV mapping, texture baking |
| **MaterialCraft** | Shaders | Blender Shader Editor | Node-based material graphs, real-time viewport shading |
| **FigCraft** | UI / Vector | Figma | Frames, auto-layout, nested vector components |
| **DeckCraft** | Presentations| Apple Keynote / PowerPoint | Slide master templates, layout canvas, presenter notes |
| **GridCraft** | Data | Excel / LibreOffice Calc | Cell grid, formula parsing, tabular data view |
| **PdfCraft** | Prepress | Adobe Acrobat / PDF-XChange | Prepress proofing, vector annotations, page management |
| **SolidCraft** | 3D Modeling | SolidWorks / Rhino | Parametric B-Rep solid modeling, constraint solver |
| **MailCraft** | Communication| Superhuman / Thunderbird | Rapid keyboard triage, split pane preview, offline IMAP cache |
| **Craft Anything** | DevTools | VS Code / Node-RED | Visual extension builder, canvas pipelines, MCP integration |
| **ArtCraft Studio** | AI Studio | ComfyUI / Automatic1111 | Node-based generative workflows, latent streaming, prompt queues |

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

Generate a benchmark-aligned PR pre-flight checklist for an application:
```bash
cargo run --manifest-path xtask/Cargo.toml -- checklist PhotoCraft
```

Generate token-lean OpenWiki notes (< 400 tokens) for AI coding agents:
```bash
cargo run --manifest-path xtask/Cargo.toml -- openwiki
```

Rebuild the interactive companion portal:
```bash
cargo run --manifest-path xtask/Cargo.toml -- report
```

### Reusable GitHub Actions Sentinel (Automated PR Gate)

To prevent architectural drift and ensure every Pull Request in all 20+ ArtCraft repositories adheres to the standards, downstream applications (e.g. `photocraft`, `vectorcraft`, `cadcraft`, `wordcraft`) integrate the **ArtCraft Standards Sentinel** in `.github/workflows/standards.yml`:

```yaml
name: ArtCraft Standards Gate
on:
  pull_request:
    branches: [main]
  push:
    branches: [main]

jobs:
  standards-gate:
    name: Standards Compliance Audit
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Application Code
        uses: actions/checkout@v4

      - name: Run ArtCraft Standards Sentinel
        uses: tareq-halaby/craft-standards/actions/sentinel@main
        with:
          strict-licensing: 'true'
          strict-confinement: 'true'
```

#### What Sentinel Checks on Every PR:
1. **`STD-SHELL-003` (Confined File Access & Sandboxing)**:
   - Scans Rust source files for unshielded file writes (`std::fs::write`, `std::fs::File::create`) outside the application's designated automation root (`--automation-read-root`, `--automation-write-root`).
2. **`STD-GOV-001` (Clean-Room Reverse Engineering & License Allowlist)**:
   - Rejects viral copyleft dependencies (GPL, AGPL) in `Cargo.toml` and enforces MIT / Apache-2.0 compliance.
3. **`STD-A11Y-001` (AccessKit Accessibility Tree)**:
   - Verifies that new interactive UI components expose `AccessKit` semantic roles and accessible labels.
4. **`STD-INPUT-001` (Multi-Tool Toolbar Cycling)**:
   - Flags rapid-click double-click race conditions and verifies modifier key contracts.
5. **`STD-LIB-005` (The Keep Rule & Hostile Input Sweeps)**:
   - Flags unhandled `.unwrap()` panics in file format parsers and verifies fuzzing contract adherence.

---

## Interactive Documentation Portal (`Craft.wiki` 3-Column Architecture)

The repository provides a zero-dependency, standalone portal deployed live at:
👉 **[https://tareq-halaby.github.io/craft-standards/](https://tareq-halaby.github.io/craft-standards/)**

- **Jakob's Law 3-Column Reader**: Left navigation tree with live search, center reading canvas with interactive sandboxes, production Rust code snippets, and right sticky "On this page" TOC with live ScrollSpy.
- **Reference App Lineage & Capabilities**: App scorecards with industry benchmarks (Photoshop, DaVinci, AutoCAD), shared crate matrix, and practical UI recipes.
- **⌨️ Universal Shortcuts Guide**: Cross-app keymap comparison table mapping muscle memory from reference tools.
- **✅ PR Pre-Flight Checklist Generator**: 1-click generator for benchmark-aligned GitHub pull request descriptions.
- **📄 Token-Lean OpenWiki Export**: Single-click copy/download of ultra-compact agent context (< 400 tokens) minimizing token burn.
- **Full BiDi / RTL Localization**: Complete translations in 6 languages (`en`, `ar`, `de`, `es`, `fr`, `ja`) with full layout and breadcrumb mirroring in Arabic.
- **AI Agent Directives Hub**: 1-click rules generator for Claude Code (`CLAUDE.md`), Cursor (`.cursorrules`), and AutoCraft autonomous pipelines.
