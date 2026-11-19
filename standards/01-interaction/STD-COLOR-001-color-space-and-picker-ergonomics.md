---
id: STD-COLOR-001
title: Universal Color Picker, Hex Parsing, and Color Space Proofing Ergonomics
category: interaction
status: active
canonical_crate: craft-libs::craft-color
wiki_reference: https://craft.wiki/apps/vectorcraft/prepare-artwork-for-cmyk-print/
affected_apps: [photocraft, designcraft, vectorcraft, lightcraft, texturecraft, materialcraft]
---

# STD-COLOR-001: Universal Color Picker, Hex Parsing, and Color Space Proofing Ergonomics

## 1. Abstract
As documented on [Craft Wiki: Prepare artwork for CMYK print](https://craft.wiki/apps/vectorcraft/prepare-artwork-for-cmyk-print/), color manipulation across graphics and design apps must be consistent, color-space aware, and ergonomically rapid. This standard dictates color picker interaction gestures, hex code parsing resilience, and color management soft-proofing invariants.

---

## 2. Normative Behavioral Requirements

### 2.1 The HUD Color Picker Gesture
* While painting with any brush or pencil tool:
  * Holding **`Shift + Alt + Right-Click`** (or `Ctrl + Option + Cmd` on macOS) displays the floating **HUD Color Wheel / Strip** directly under the pointer cursor.
  * Dragging while held changes Hue (horizontally) and Saturation/Brightness (vertically).
  * Releasing the chord instantly commits the sampled color and hides the HUD.

### 2.2 Eyedropper Sampling Invariants
* **Transient Eyedropper:** While any painting, shape, or gradient tool is active, holding **`Alt`/`Option`** temporarily switches the cursor to the Eyedropper. Clicking or dragging samples the pixel color under the cursor. Releasing `Alt` restores the prior tool immediately.
* **Sample Scope Options:** Applications must support Point Sample, $3\times 3$ Average, and $5\times 5$ Average sampling modes.

### 2.3 Resilient Hex Color Parsing
Hex text fields must parse diverse user inputs flexibly without rejecting or throwing errors:
* 6-digit hex: `#RRGGBB` or `RRGGBB`.
* 3-digit shorthand: `#RGB` or `RGB` (expanded to `#RRGGBB`).
* 8-digit alpha hex: `#RRGGBBAA` (preserving alpha transparency channel).
* Discards leading or trailing whitespace and `#` automatically.

### 2.4 Color Space and CMYK Proofing
* All RGB canvases default to standard **sRGB IEC61966-2.1** or **Display P3** with tagged ICC profiles.
* **Proof Colors (`Cmd+Y` / `Ctrl+Y`):** Toggles soft-proofing simulating output on the target CMYK or print profile (via `craft-cms` / LittleCMS) without altering underlying document pixel values.
* **Gamut Warning (`Cmd+Shift+Y` / `Ctrl+Shift+Y`):** Highlights pixels falling outside the target output color gamut with a customizable warning mask.
