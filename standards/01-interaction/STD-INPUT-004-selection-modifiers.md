---
id: STD-INPUT-004
title: Selection and Bounding Box Transform Modifiers
category: interaction
status: active
canonical_crate: craft-libs::craft-ui
affected_apps: [photocraft, designcraft, effectcraft, vectorcraft]
---

# STD-INPUT-004: Selection and Bounding Box Transform Modifiers

## 1. Abstract
Defines standard modifier behaviors when selecting, transforming, or duplicating objects and pixel selections on canvas.

---

## 2. Normative Requirements

### 2.1 Selection Combining Modifiers
* **Click / Drag:** Creates a new selection, replacing existing selections.
* **`Shift` + Click / Drag:** **Add to Selection** (Union $\cup$).
* **`Alt`/`Option` + Click / Drag:** **Subtract from Selection** (Difference $\setminus$).
* **`Shift` + `Alt`/`Option` + Drag:** **Intersect Selection** (Intersection $\cap$).

### 2.2 Transform Handle Constraints
* **Corner Handle Drag:**
  * By default, scales proportionally (or non-proportionally depending on app defaults).
  * Holding **`Shift`** constrains aspect ratio or forces 1:1 square/circular aspect.
  * Holding **`Alt`/`Option`** scales outward symmetrically from the **center anchor point** rather than from the opposite corner.
* **Rotation Handle Drag:**
  * Dragging outside any bounding corner rotates the selection.
  * Holding **`Shift`** snaps rotation angles to strict **$15^\circ$ increments** ($0^\circ, 15^\circ, 30^\circ, 45^\circ, 60^\circ, 75^\circ, 90^\circ$).

### 2.3 Clone / Duplicate on Drag
* Holding **`Alt`/`Option`** while dragging an existing selected object or layer creates an in-place duplicate and moves the duplicate.
