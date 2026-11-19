# Universal Instructions for AI Coding Agents in ArtCraft Repositories

> **Authority:** This document is maintained by `storytold/craft-standards`. All AI agents (AutoCraft bots, Antigravity, Cursor, Copilot, Claude Code) working across the entire ArtCraft application suite and shared libraries **MUST** adhere to these invariants.

---

## 1. Scope of the ArtCraft Suite

These standards govern all creative, productivity, CAD, audio, and media applications in the ecosystem:
* **AI & Generative Media:** ArtCraft Studio
* **Graphics & Design:** PhotoCraft, VectorCraft, LightCraft, DesignCraft, FigCraft, TextureCraft, MaterialCraft
* **Video & Effects:** FilmCraft, EffectCraft, AniCraft
* **Audio:** SoundCraft
* **CAD & Drafting:** CADCraft
* **Office & Productivity:** WordCraft, GridCraft, DeckCraft, PdfCraft
* **Developer Tools:** Craft Anything
* **Third-Party & Mail:** SolidCraft, MailCraft
* **Infrastructure:** Craft Launcher, craft-libs, craft-wiki, autocraft

---

## 2. Golden Rules of ArtCraft Development

1. **Never Re-invent Shared Primitives:**
   Before implementing a UI widget, printing function, keymap logic, or dialog, check `craft-libs`. If a primitive exists (`craft-ui`, `craft-keymap`, `craft-i18n`, `craft-print`, `craft-window`), use it. Propose or implement missing primitives upstream in `craft-libs`, never in an isolated app codebase.

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

7. **Unified Cross-Platform Printing:**
   Any document printing or page setup logic must route through `craft-libs::craft-print`. Never call Windows GDI, WinSpool, or CUPS directly from an application crate.

---

## 3. Pre-Flight Verification Checklist for Agents

Before completing any PR or code edit involving UI or user input:
- [ ] Did I use `craft-libs` primitives instead of hand-rolling UI or system logic?
- [ ] Are keyboard shortcuts registered via `craft-keymap` without conflicting with global chords?
- [ ] Does my click handler handle fast clicks without breaking modifier detection?
- [ ] Did I add AccessKit labels/roles to all new interactive controls?
- [ ] Did I test or verify layout under `CRAFT_UI_DIRECTION=rtl`?
- [ ] Are all user-facing strings routed through `craft-i18n` with zero hardcoded English literals?
