---
id: STD-NAV-003
title: Arrow-Key Value Scrubbing and Step Multipliers
category: navigation
status: active
canonical_crate: craft-libs::craft-ui
affected_apps: [photocraft, designcraft, effectcraft, vectorcraft, wordcraft]
---

# STD-NAV-003: Arrow-Key Value Scrubbing and Step Multipliers

## 1. Abstract
Specifies keyboard scrubbing rules for numeric input fields, sliders, and timeline position indicators.

---

## 2. Normative Requirements

### 2.1 Up / Down Arrow Steps in Numeric Fields
* **Plain `Up` / `Down`:** Steps the numeric value by **$1.0$** unit (or the field's base resolution).
* **`Shift` + `Up` / `Down`:** **$10\times$ Step Multiplier** (e.g., jumps by $10$ px, $10\%$, or $10$ pt).
* **`Alt`/`Option` + `Up` / `Down`:** **$0.1\times$ Fine Multiplier** (e.g., steps by $0.1$ px or $0.1\%$).

### 2.2 Object Nudge on Canvas
* With an object or layer selected on the canvas:
  * **Plain Arrow Keys:** Nudges the object by **$1$ pixel**.
  * **`Shift` + Arrow Keys:** Nudges the object by **$10$ pixels**.
