---
name: craft-standards
description: Query ArtCraft universal standards, pre-flight verify UI components, check keyboard shortcut collisions, and resolve canonical craft-libs primitives.
---

# craft-standards Agent Skill

Use this skill whenever building, modifying, or reviewing features, UI components, keyboard shortcuts, or system integration in any ArtCraft application (PhotoCraft, DesignCraft, EffectCraft, VectorCraft, WordCraft, Craft Launcher, or craft-libs).

## Instructions

1. **Before writing code for UI controls or shortcuts:**
   - Check `craft-standards/standards/` for applicable standards.
   - For multi-tool buttons, enforce `STD-INPUT-001` (release event modifiers, rapid Alt-click cycling, double-click suppression).
   - For tabbed interfaces, enforce `STD-NAV-001` (`Ctrl+Tab` / `Ctrl+Shift+Tab`).
   - For interactive elements, enforce `STD-A11Y-001` (mandatory AccessKit role and name).
   - For layout and text, enforce `STD-I18N-001` (shell mirroring under `is_rtl()`, Unicode BiDi shaping).

2. **Never reinvent core capabilities:**
   - Always route printing through `craft-print`.
   - Always route keymaps through `craft-keymap`.
   - Always route internationalization through `craft-i18n`.
   - Always route shared UI widgets through `craft-ui`.

3. **Running the Linter:**
   - Run `cargo run --manifest-path xtask/Cargo.toml -- audit` to verify standard documents.
