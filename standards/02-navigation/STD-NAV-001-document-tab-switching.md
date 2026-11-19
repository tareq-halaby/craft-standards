---
id: STD-NAV-001
title: Universal Document Tab Navigation and Panel Visibility Shortcuts
category: navigation
status: active
canonical_crate: craft-libs::craft-keymap
affected_apps: [photocraft, designcraft, effectcraft, vectorcraft, wordcraft]
---

# STD-NAV-001: Universal Document Tab Navigation and Panel Visibility Shortcuts

## 1. Abstract
This standard defines universal keyboard navigation shortcuts for multi-document tabs and workspace panel visibility across all ArtCraft desktop applications.

---

## 2. Normative Behavioral Requirements

### 2.1 Document Tab Navigation Chords
* **Next Document:** `Ctrl+Tab`
  * Moves focus and active viewport to the next document in tab order (or Most Recently Used order depending on preferences).
  * Wraps from the last tab to the first tab.
* **Previous Document:** `Ctrl+Shift+Tab`
  * Moves focus and active viewport to the previous document in tab order.
  * Wraps from the first tab to the last tab.
* **Platform Invariant:**
  * `Ctrl+Tab` is the standard on **all platforms, including macOS**.
  * On macOS, `Cmd+Tab` is strictly reserved by the operating system for application switching and must never be intercepted or mapped by ArtCraft apps.

### 2.2 Workspace Panel Visibility Toggles
* **Show/Hide All Panels:** `Tab`
  * When no text input field has focus, pressing `Tab` toggles the visibility of all application chrome panels (Toolbox, Inspector/Dock, Options Bar), leaving only the canvas and menu bar visible.
  * Pressing `Tab` again restores the previous panel layout.
* **Show/Hide Side Panels Only:** `Shift+Tab`
  * Toggles visibility of docked secondary inspector panels while keeping the primary toolbox and options bar visible.

### 2.3 Focus Precedence Hierarchy
When a text edit field, dialog input, or inline rename is active, keystrokes belong to the text field:
* `Tab` inserts a tab character or advances to the next form control stop.
* Global shortcuts are bypassed until the text field yields focus via `Escape` or `Enter`.
