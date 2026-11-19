---
id: STD-LIB-003
title: UI Widget Primitives, Design Tokens, and Docking Systems
category: unified-libs
status: active
canonical_crate: craft-libs::craft-ui
affected_apps: [photocraft, designcraft, effectcraft, vectorcraft, wordcraft, craft-launcher]
---

# STD-LIB-003: UI Widget Primitives, Design Tokens, and Docking Systems

## 1. Abstract
Specifies core UI component contracts provided by `craft-libs::craft-ui`.

---

## 2. Canonical Shared Components

1. **`ToolSlot`:**
   * Encapsulates `STD-INPUT-001` (primary click select, Alt-click cycling, 350ms long press flyout, double-click suppression).
2. **`TabBar`:**
   * Encapsulates `STD-NAV-001` (tab reordering, dirty indicators `*`, close buttons, and `Ctrl+Tab` navigation).
3. **`Dock`:**
   * Multi-panel docking system supporting collapsible sidebars, auto-hide tabs, and floating tear-off windows.
4. **`ThemeTokens`:**
   * Standardized dark, medium-gray, and light themes with semantic color tokens (`background`, `surface`, `border`, `text_primary`, `accent`, `danger`, `focus_ring`).
