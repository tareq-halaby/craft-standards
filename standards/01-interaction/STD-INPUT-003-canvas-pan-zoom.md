---
id: STD-INPUT-003
title: Canvas Pan, Zoom Physics, and Viewport Invariants
category: interaction
status: active
canonical_crate: craft-libs::craft-ui
affected_apps: [photocraft, designcraft, effectcraft, vectorcraft, wordcraft]
---

# STD-INPUT-003: Canvas Pan, Zoom Physics, and Viewport Invariants

## 1. Abstract
Specifies mouse wheel, pointer drag, and double-click behaviors for document canvas navigation.

---

## 2. Normative Requirements

### 2.1 Mouse Wheel & Trackpad Physics
* **Vertical Scroll:** Moves viewport vertically.
* **Horizontal Scroll (`Shift` + Wheel):** Moves viewport horizontally.
* **Smooth Zoom (`Ctrl`/`Cmd` + Wheel):**
  * Zooms the viewport smoothly anchored directly at the pointer cursor position.
  * Zoom ratios follow geometric progression (`... 25%, 33.3%, 50%, 66.7%, 100%, 150%, 200%, 300%, 400%, 600%, 800% ...`).
* **Middle Mouse Button Drag:** Directly pans the canvas without requiring keyboard modifiers.

### 2.2 Double-Click Resets
* **Double-clicking the Hand tool button:** Resets view to **Fit on Screen** (`Cmd+0` / `Ctrl+0`).
* **Double-clicking the Zoom tool button:** Resets view to **100% Actual Pixels** (`Cmd+1` / `Ctrl+1`).

### 2.3 Pixel Grid Display
* At zoom levels $\ge 500\%$, applications should display a subtle, non-printing 1px pixel grid boundary overlaying pixel edges.
