# Universal Instructions for AI Coding Agents in ArtCraft Repositories

> **Authority:** This document is maintained by `storytold/craft-standards`. All AI agents (AutoCraft bots, Antigravity, Cursor, Copilot, Claude Code) working on PhotoCraft, DesignCraft, EffectCraft, VectorCraft, WordCraft, Craft Launcher, or craft-libs **MUST** follow these invariants.

---

## 1. Golden Rules of ArtCraft Development

1. **Never Re-invent Shared Primitives:**
   Before implementing a UI widget, printing function, keymap logic, or dialog, check `craft-libs`. If a primitive exists (`craft-ui`, `craft-keymap`, `craft-i18n`, `craft-print`), use it. If it doesn't, propose or implement it upstream in `craft-libs`, not in an isolated app codebase.

2. **Modifier Semantics on Release Events:**
   In egui, users release keys rapidly. When checking modifiers for clicks (e.g. `Alt`-click), **never** check `ui.input(|i| i.modifiers.alt)` in the click handler. Always read modifiers from the primary button release event (`resp.interact_pointer_pos()`, pointer release event records), or use `craft-ui::ToolSlot`.

3. **Suppress Double-Clicks on Modified Clicks:**
   egui's `resp.double_clicked()` ignores modifiers. A user rapidly Alt-clicking to cycle tools must **never** inadvertently fire a double-click action (e.g., opening Tool Options). Always track whether the current or previous click was modified.

4. **Document Tab Switching Invariant:**
   Every ArtCraft application with multiple document tabs **must** bind `Ctrl+Tab` to `window.nextDocument` and `Ctrl+Shift+Tab` to `window.previousDocument` on all operating systems (including macOS).

5. **Mandatory AccessKit Tagging:**
   Every custom interactive rect allocated with `ui.interact` or `allocate_exact_size` must be tagged with an AccessKit `Role` and translated label (`name`), using `craft-ui::a11y` helpers. Never leave a clickable control unnamed.

6. **Right-to-Left (RTL) Layout Invariance:**
   UI layout direction follows `craft_i18n::is_rtl()`. Primary toolbars dock on the right in RTL; inspectors dock on the left; flyouts open inward toward the canvas. Text labels must pass through `craft_i18n::rtl::widget(ui, text)` for automatic BiDi Unicode shaping.

---

## 2. Standard ID Cross-Reference

When tasked with implementing or modifying features, consult the corresponding standard in `standards/`:

| Standard ID | Domain | Mandatory Acceptance Rule |
| :--- | :--- | :--- |
| **`STD-INPUT-001`** | Multi-Tool Buttons | Alt/Option-click cycles slot tools with instant wrap. Long-press (350ms) opens flyout. Suppress double-click dialogs. |
| **`STD-NAV-001`** | Tab Navigation | `Ctrl+Tab` / `Ctrl+Shift+Tab` cycle tabs in MRU or spatial order. `Tab` hides all panels; `Shift+Tab` hides side docks. |
| **`STD-A11Y-001`** | Accessibility | Interactive controls must possess AccessKit names/roles. Run `ui_accessibility_audit` in CI. |
| **`STD-I18N-001`** | RTL & Shaping | Shell layout mirrors under RTL. Text runs resolve Unicode BiDi without changing stored data. |
| **`STD-LIB-001`** | Printing | Cross-platform output routes through `craft-print` / `craft-winprint-gdi`, never platform APIs directly. |

---

## 3. Pre-Flight Verification Checklist for Agents

Before completing any PR or code edit involving UI or user input:
- [ ] Did I use `craft-libs` primitives instead of hand-rolling UI or system logic?
- [ ] Are keyboard shortcuts registered via `craft-keymap` without conflicting with global chords?
- [ ] Does my click handler handle fast clicks without breaking modifier detection?
- [ ] Did I add AccessKit labels/roles to all new interactive controls?
- [ ] Did I test or verify layout under `CRAFT_UI_DIRECTION=rtl`?
- [ ] Are all user-facing strings routed through `craft-i18n` with zero hardcoded English literals?
