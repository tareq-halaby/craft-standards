---
id: STD-I18N-001
title: Full Shell Direction Mirroring and Unicode BiDi Text Galley Shaping
category: internationalization
status: active
canonical_crate: craft-libs::craft-i18n
affected_apps: [photocraft, designcraft, effectcraft, vectorcraft, wordcraft]
---

# STD-I18N-001: Full Shell Direction Mirroring and Unicode BiDi Text Galley Shaping

## 1. Abstract
Right-to-Left (RTL) scripts (Arabic, Hebrew, Persian, Urdu) require complete layout mirroring of the desktop shell and correct bidirectional text shaping. This standard formalizes shell mirroring and Unicode BiDi classification.

---

## 2. Normative Requirements

### 2.1 Shell Direction Determination
* Direction follows the current active UI language:
  ```rust
  pub fn is_rtl() -> bool {
      craft_i18n::current().dir() == craft_i18n::Dir::Rtl
  }
  ```
* **Testing Override:** Every application must support the environment variable `CRAFT_UI_DIRECTION=rtl` (or `ltr`) to allow developers and automated tests to evaluate mirrored layouts regardless of installed language catalogs.

### 2.2 Layout Mirroring Invariants
When `is_rtl()` is true:
* **Menu Bar:** Anchors to the right edge and flows leftwards.
* **Toolbox:** Docks on the right side of the main window.
* **Inspectors / Panels:** Dock on the left side of the main window.
* **Flyout Menus:** Open inward towards the canvas (pivot `Align2::RIGHT_TOP` on the left dock or `Align2::LEFT_TOP` on the right dock).
* **Canvas Coordinates:** Canvas document coordinates remain unmirrored. Only the surrounding window chrome mirrors.

### 2.3 Unicode BiDi Text Galley Shaping
* User-facing text containing RTL characters must be shaped through `craft_i18n::rtl::widget(ui, text)`.
* Logical source strings must never be pre-reversed. The Unicode BiDi algorithm determines visual glyph order while retaining logical cursor positions.
