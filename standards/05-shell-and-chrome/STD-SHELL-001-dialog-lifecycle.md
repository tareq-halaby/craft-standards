---
id: STD-SHELL-001
title: Modal and Modeless Dialog Lifecycles, Dismissal, and Button Orders
category: shell
status: active
canonical_crate: craft-libs::craft-dialogs
affected_apps: [photocraft, designcraft, effectcraft, vectorcraft, wordcraft, craft-launcher]
---

# STD-SHELL-001: Modal and Modeless Dialog Lifecycles, Dismissal, and Button Orders

## 1. Abstract
Specifies dialog behavior, keyboard escape mechanisms, and platform-compliant button ordering.

---

## 2. Normative Requirements

### 2.1 Keyboard Dismissal Rules
* **`Escape` Key:** Always cancels and dismisses the active modal dialog without committing state changes.
* **`Enter` Key:** Commits the default primary action (e.g. "OK", "Save", "Export") unless focus is explicitly on a secondary button (e.g. "Cancel" or "Don't Save").

### 2.2 Button Placement Convention
Dialog action buttons adhere to platform ordering:
* **macOS:** Cancel on the left, Primary Action on the far right.
* **Windows / Linux:** Primary Action on the left/first, Cancel adjacent.

### 2.3 Destructive Action Confirmations
* Any action causing permanent data loss (e.g. "Delete Layer", "Revert Document", "Discard Changes") must display a confirmation dialog.
* The destructive action button must be styled with the warning/destructive theme token (`Tokens::danger`) and must **never** be the default focused button upon dialog opening.
