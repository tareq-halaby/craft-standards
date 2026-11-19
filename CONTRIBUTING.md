# Contributing to ArtCraft Standards (`craft-standards`)

Thank you for your interest in contributing to **`craft-standards`**! This repository is the authoritative single source of truth for user experience invariants, ergonomic contracts, AI agent rules, and unified library architecture across the entire 20+ ArtCraft suite.

Whether you are a core maintainer, an app contributor, a design systems engineer, or an autonomous AI agent working through **`storytold/autocraft`**, this guide details how to propose, refine, audit, and upstream standards.

---

## 1. The Standards Mission: Why We Specify

Every standard in this repository exists to solve three concrete problems:
1. **Ecosystem Cohesion ("The ArtCraft Soul"):** A user switching between PhotoCraft, DesignCraft, EffectCraft, VectorCraft, WordCraft, or CADCraft must experience identical muscle memory for fundamental interactions (tool cycling, zoom/pan physics, tab navigation, dialog dismissal, and focus traversal).
2. **Zero Redundant Work:** We eliminate triplicate engineering where identical interaction patterns are debated, coded, and tested separately across individual app repositories.
3. **AI Agent & AutoCraft Alignment:** Autonomous coding agents in `storytold/autocraft` and IDEs rely on structured, machine-readable contracts to avoid hallucinating APIs or introducing subtle ergonomic bugs.

---

## 2. The Standard Lifecycle (RFC Process)

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌──────────────────────┐
│  1. Proposal │ ──► │ 2. Draft RFC │ ──► │  3. Active   │ ──► │  4. Upstream Shared  │
│  (Discussion)│     │  (Audit OK)  │     │  (Approved)  │     │  Primitive (craft-libs│
└──────────────┘     └──────────────┘     └──────────────┘     └──────────────────────┘
```

### Stage 1: Problem Identification & Cross-App Audit
Before proposing a new standard:
* Verify whether the pattern already exists in one or more ArtCraft applications.
* Run `cargo xtask drift-scan` to see if sibling applications already diverge on this behavior.
* Discuss the concept in [GitHub Discussions](https://github.com/tareq-halaby/craft-standards/discussions) or the ArtCraft Discord `#architecture` channel.

### Stage 2: Authoring a Draft Standard
1. Copy `rfcs/0000-template.md` into the appropriate subfolder under `standards/`:
   * `01-interaction/`: Mouse/pen gestures, tools, canvas manipulation, modifiers.
   * `02-navigation/`: Tabs, panel visibility, value scrubbing, timeline navigation.
   * `03-accessibility/`: AccessKit tagging, keyboard focus, contrast ratios, reduced motion.
   * `04-internationalization/`: Shell mirroring, Unicode BiDi text shaping, numerals, units.
   * `05-shell-and-chrome/`: Dialog lifecycles, dirty states, clipboard, command taxonomies.
   * `06-unified-libs/`: Architectural contracts for `craft-libs` crates.
2. Follow the standard naming convention: `STD-<CATEGORY>-<NUMBER>-<slug>.md` (e.g. `STD-NAV-004-split-view-docking.md`).
3. Set `status: draft` in the YAML frontmatter.

### Stage 3: Review & Acceptance
* Open a Pull Request against `main`.
* Ensure automated CI checks pass (`cargo xtask audit` and `cargo test`).
* Gather feedback from at least two application maintainers.
* Once approved, change frontmatter status to `status: active`.

### Stage 4: Upstreaming to `craft-libs`
Standards that specify reusable UI components or system contracts (e.g., `ToolSlot` widget, `a11y` helpers, or `craft-print` sessions) must be paired with an upstream implementation PR in **`storytold/craft-libs`**.

---

## 3. Anatomy of a Standard Specification

Every standard document must contain valid YAML frontmatter matching `schemas/standard.schema.json` and the following normative sections:

```markdown
---
id: STD-CATEGORY-001
title: Clear Descriptive Title
category: interaction # interaction | navigation | accessibility | internationalization | shell | unified-libs
status: draft         # draft | active | deprecated
canonical_crate: craft-libs::craft-ui
wiki_reference: https://craft.wiki/path/to/guide/ (optional but recommended)
affected_apps: [all]  # or specific app names from the ecosystem roster
---

# STD-CATEGORY-001: Clear Descriptive Title

## 1. Abstract
2–3 paragraphs explaining the invariant, why it exists, common historical bugs, and real cross-suite context.

## 2. Normative Behavioral Requirements
Detailed, unambiguous rules using RFC 2119 keywords (MUST, MUST NOT, SHOULD, MAY):
- Pointer and click behaviors (single click, double click, hold timers)
- Keyboard modifier semantics (Shift, Alt/Option, Ctrl/Cmd)
- Viewport and canvas invariants

## 3. Implementation Invariants (Rust / egui)
Concrete, copy-pasteable Rust/egui code snippets illustrating:
- The correct normative implementation
- Anti-patterns to avoid (e.g. reading frame modifiers instead of pointer release events)

## 4. Edge Cases & Failure Modes
Explicit handling for:
- Rapid successive clicks / key presses
- Focus loss mid-gesture
- Cancellation via Escape
- Touch / pen pressure vs mouse input

## 5. Verification & Automated Testing
Exact test strategy (e.g. integration test in `tests/it/`, linter checks, or CI audits).
```

---

## 4. Developer Tooling: The `xtask` CLI

We provide a custom developer CLI in `xtask` to audit, test, and maintain standards:

### 1. Audit Standards Metadata
Validates that every markdown file in `standards/` has compliant frontmatter, unique IDs, valid categories, and recognized app names:
```bash
cargo run --manifest-path xtask/Cargo.toml -- audit
```

### 2. List Registered Standards
Outputs a formatted terminal table of all registered standards:
```bash
cargo run --manifest-path xtask/Cargo.toml -- list
```

### 3. Run the Cross-App Drift Scanner
Scans sibling application repositories on your machine (`photocraft`, `designcraft`, `vectorcraft`, `effectcraft`, `wordcraft`) and outputs a live compliance matrix:
```bash
cargo run --manifest-path xtask/Cargo.toml -- drift-scan
```

### 4. Regenerate the Interactive HTML Dashboard
Generates or updates the standalone `standards-dashboard.html` with interactive search and category filtering:
```bash
cargo run --manifest-path xtask/Cargo.toml -- report
```

---

## 5. Testing & Code Quality

Before opening a pull request, run the full validation suite locally:

```bash
# 1. Audit all standards documents
cargo run --manifest-path xtask/Cargo.toml -- audit

# 2. Run all unit tests on the MCP server
cargo test --manifest-path crates/craft-standards-mcp/Cargo.toml

# 3. Check compilation
cargo check --workspace
```

---

## 6. Guidelines for AI Agents (`autocraft`, Cursor, Copilot)

If you are an autonomous AI agent working in an ArtCraft repository:
1. **Consult Before Coding:** Query `craft-standards-mcp` or read `agents/AGENTS.md` before implementing any UI control, keymap binding, or platform capability.
2. **Never Re-invent Primitives:** If a widget or primitive exists in `craft-libs`, use it. Do not write local custom implementations of toolbars, keymaps, or printing logic.
3. **Verify Compliance:** Use the `verify_component` MCP tool to pre-flight check your code for unhandled release modifiers, unshielded double-clicks, and missing AccessKit roles.

---

## 7. Community & Communication

* **GitHub Discussions:** [https://github.com/tareq-halaby/craft-standards/discussions](https://github.com/tareq-halaby/craft-standards/discussions)
* **Discord Community:** Join the `#architecture` channel on the [ArtCraft Discord](https://discord.gg/artcraft).
* **Code of Conduct:** We are committed to an open, welcoming, and harassment-free environment for all contributors.
