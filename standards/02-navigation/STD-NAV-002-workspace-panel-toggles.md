---
id: STD-NAV-002
title: Workspace Panel Visibility and Dock Collapsing Toggles
category: navigation
status: active
canonical_crate: craft-libs::craft-keymap
affected_apps: [photocraft, designcraft, effectcraft, vectorcraft]
---

# STD-NAV-002: Workspace Panel Visibility and Dock Collapsing Toggles

## 1. Abstract
Specifies global hotkeys for clearing the workspace to focus on the document canvas.

---

## 2. Normative Requirements

### 2.1 Tab Invariants
* **`Tab` (Toggle All Panels):**
  * Hides all floating and docked UI panels (Toolbox, Control/Options Bar, Inspector Docks).
  * Only the document canvas and native menu bar remain visible.
  * Pressing `Tab` again restores all hidden panels to their exact prior positions and docked states.
  * **Guard:** Must be ignored when a text field, inline layer rename, or modal dialog has active keyboard focus.

### 2.2 Shift+Tab Invariants
* **`Shift+Tab` (Toggle Side Docks Only):**
  * Hides secondary inspector and panel docks on the left and right sides.
  * Keeps the primary vertical toolbox and top options bar visible.
  * Pressing `Shift+Tab` again un-hides the side docks.
