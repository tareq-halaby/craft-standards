---
id: STD-A11Y-002
title: Keyboard Focus Rings, Contrast Ratios, and Reduced Motion
category: accessibility
status: active
canonical_crate: craft-libs::craft-ui
affected_apps: [photocraft, designcraft, effectcraft, vectorcraft, wordcraft, craft-launcher]
---

# STD-A11Y-002: Keyboard Focus Rings, Contrast Ratios, and Reduced Motion

## 1. Abstract
Specifies visual accessibility standards including focus indicators, contrast minimums, and system preference responsiveness.

---

## 2. Normative Requirements

### 2.1 Focus Ring Geometry & Visibility
* Controls receiving keyboard focus must draw an explicit **Focus Ring**:
  * Minimum stroke thickness: **$2.0$ px**.
  * Contrast ratio against adjacent background: $\ge 3:1$.
  * Never suppressed or set to transparent for keyboard interactions.
  * May be suppressed for mouse/touch interactions if the app tracks pointer vs keyboard input mode.

### 2.2 Contrast Minimums (WCAG 2.2 AA)
* **Body Text and UI Labels:** Minimum contrast ratio of **$4.5:1$** against background.
* **Large Text ($\ge 18$pt or $\ge 14$pt bold):** Minimum contrast ratio of **$3.0:1$**.
* **Essential Icons and Borders:** Minimum contrast ratio of **$3.0:1$**.

### 2.3 Reduced Motion
* When the operating system reports `prefers-reduced-motion`:
  * All non-essential animations (dock sliding, dropdown fading, canvas smooth transitions) must be disabled or replaced with instant cuts.
