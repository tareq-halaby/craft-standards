---
id: STD-SHELL-002
title: Document Dirty State, Unsaved Changes Prompt, and Recovery Lifecycles
category: shell
status: active
canonical_crate: craft-libs::craft-window
affected_apps: [photocraft, designcraft, effectcraft, vectorcraft, wordcraft]
---

# STD-SHELL-002: Document Dirty State, Unsaved Changes Prompt, and Recovery Lifecycles

## 1. Abstract
Specifies how document modifications, window dirty indicators, and close confirmations function across the suite.

---

## 2. Normative Requirements

### 2.1 Dirty Indicators
* Any modification that pushes an entry to the undo history marks the document as **dirty** (modified).
* **Tab Indicator:** A dirty document displays an asterisk (`*`) or bullet marker adjacent to its file title in the tab strip.
* **Window Chrome:** On macOS, the window close button displays an unsaved state dot.

### 2.2 Close Confirmation Sequence
* Closing a dirty document tab (`Ctrl+W` / `Cmd+W` or clicking the tab close button $\times$) prompts the user:
  * "Save changes to document '{title}' before closing?"
  * Actions: **Save** (Primary), **Don't Save** (Destructive), **Cancel** (Aborts close).
* Quitting the application (`Cmd+Q` / `Ctrl+Q` or window close) evaluates all open documents:
  * Prompts individually or offers a "Save All / Review Changes" multi-document review sheet.

### 2.3 Autosave & Crash Recovery
* Applications write periodic background recovery snapshots every $N$ minutes (default: 5 minutes) to user app data.
* Upon startup after an abnormal termination, applications automatically detect orphaned recovery journals and prompt the user to restore unsaved documents.
