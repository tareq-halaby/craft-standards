# AutoCraft Integration: Pre-Implementation Verification Gate

> **Scope:** This document defines the protocol for **`storytold/autocraft`** automated agents when processing GitHub issues, feature requests, and pull requests across the ArtCraft organization.

---

## 1. The Verification Gate Protocol

When an AutoCraft agent is assigned an issue:

```
┌─────────────────────────────────────────────────────────────────┐
│                    AutoCraft Issue Pipeline                     │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                                 ▼
                     ┌───────────────────────┐
                     │ Issue Ingestion/Triage│
                     └───────────┬───────────┘
                                 │
                                 ▼
                     ┌───────────────────────┐
                     │ Pre-Implementation    │
                     │ Standards Gate        │ ◄── Queries craft-standards-mcp
                     └───────────┬───────────┘
                                 │
                   ┌─────────────┴─────────────┐
                   │                           │
            [Matches Standard]          [No Standard Yet]
                   │                           │
                   ▼                           ▼
        Inject normative rules       Flag for human review
        into generation context      or follow baseline AGENTS.md
                   │                           │
                   └─────────────┬─────────────┘
                                 │
                                 ▼
                     ┌───────────────────────┐
                     │ Code Implementation   │
                     └───────────┬───────────┘
                                 │
                                 ▼
                     ┌───────────────────────┐
                     │ Automated CI & Review │ ◄── Runs xtask audit-standards
                     └───────────────────────┘
```

---

## 2. Mandatory Verification Queries

Before generating a patch or opening a PR, AutoCraft must run these automated checks:

1. **Primitive Lookup (`resolve_library_primitive`):**
   * If the change introduces printing, PDF generation, keybindings, dialogs, or multi-tool buttons, the agent must check if an authoritative crate in `craft-libs` provides the primitive.

2. **Component Validation (`verify_component`):**
   * Any PR touching `toolbar.rs`, `panels/*.rs`, or `dialogs/*.rs` must be checked against:
     - Release modifier handling (`STD-INPUT-001`).
     - AccessKit tagging (`STD-A11Y-001`).
     - RTL direction handling (`STD-I18N-001`).

3. **Shortcut Conflict Check (`lookup_shortcuts`):**
   * Any new keybinding must be cross-checked against the global ArtCraft keymap schema to prevent chord collisions.

---

## 3. AutoCraft Review Bot Criteria

When AutoCraft acts as an automated reviewer on PRs:
* Reject PRs that hand-roll custom widgets when `craft-ui` provides the canonical implementation.
* Reject PRs introducing interactive controls that lack AccessKit labels or roles.
* Require that multi-tool buttons support `Alt`/`Option`-click cycling and guard against rapid-click double-clicks.
