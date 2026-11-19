---
id: STD-SHELL-002
title: Document Dirty State, Unsaved Changes Prompt, and Recovery Lifecycles
category: shell
status: active
canonical_crate: craft-libs::craft-window
wiki_reference: https://craft.wiki/apps/wordcraft/recovery/
affected_apps: [photocraft, designcraft, effectcraft, vectorcraft, wordcraft]
---

# STD-SHELL-002: Document Dirty State, Unsaved Changes Prompt, and Recovery Lifecycles

## 1. Abstract
As documented on [Craft Wiki: Document Recovery](https://craft.wiki/apps/wordcraft/recovery/), ArtCraft applications protect user work against system crashes or abnormal termination through dirty tracking, safe close confirmation, and local journal snapshots.

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

### 2.3 Autosave & Crash Recovery Invariants (Craft Wiki Parity)
* **Cadence:** Background recovery snapshots are written at most every **10 seconds**, and only when the document has dirty modifications.
* **Non-Destructive Restore:** Restoring a recovered draft opens it as a new, untitled document; restoring **never** overwrites the user's original disk file directly.
* **Privacy & Security Exclusion:** Password-protected or encrypted documents are strictly excluded from unencrypted local recovery snapshots.
* **Lifecycle:** When a document is saved or closed normally, its local recovery snapshot is deleted immediately. Recovery copies persist indefinitely until explicitly restored or discarded.
* **Menu Command:** Every app must expose `File › Recover` to access orphaned recovery snapshots at any time.
