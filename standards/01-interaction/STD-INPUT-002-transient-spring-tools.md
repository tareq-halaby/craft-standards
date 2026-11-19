---
id: STD-INPUT-002
title: Transient and Spring-Loaded Tool Invariants
category: interaction
status: active
canonical_crate: craft-libs::craft-ui
affected_apps: [photocraft, designcraft, effectcraft, vectorcraft]
---

# STD-INPUT-002: Transient and Spring-Loaded Tool Invariants

## 1. Abstract
Spring-loaded (transient) tools allow users to temporarily activate a navigation or inspection tool (such as Hand or Zoom) while another creative tool is active, returning immediately to the original tool upon releasing the key.

---

## 2. Normative Requirements

### 2.1 The Spacebar Pan Invariant
* While inside a document canvas, holding `Space` temporarily switches the active tool to the **Hand tool** regardless of the currently selected tool (unless a text editing caret is active inside a text frame).
* While `Space` is held, dragging with the primary mouse button pans the viewport.
* Releasing `Space` instantly restores the previously active tool, preserving any in-progress tool settings.

### 2.2 Quick-Tap vs. Hold (Spring Threshold)
* Any tool key pressed and held for more than **200ms** acts as a spring-loaded temporary switch. Releasing the key reverts to the prior tool.
* A quick tap (< 200ms) permanently switches the active tool to that shortcut's tool.

### 2.3 Modifier Intersections
* `Space + Cmd` (macOS) / `Space + Ctrl` (Win/Linux): Temporarily activates the **Zoom In** tool.
* `Space + Cmd + Alt` (macOS) / `Space + Ctrl + Alt` (Win/Linux): Temporarily activates the **Zoom Out** tool.
* Clicking or dragging while these chords are held zooms the viewport centered on the mouse position. Releasing the chord returns to the previous tool immediately.
