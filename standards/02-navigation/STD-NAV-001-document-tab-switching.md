---
id: STD-NAV-001
title: Universal Document Tab Navigation, Closure, and Lifecycle Ergonomics
category: navigation
status: active
canonical_crate: craft-libs::craft-keymap
wiki_reference: https://craft.wiki/apps/vectorcraft/work-in-several-windows/
affected_apps: [all]
---

# STD-NAV-001: Universal Document Tab Navigation, Closure, and Lifecycle Ergonomics

## 1. Abstract
As documented on [Craft Wiki: Work in several windows](https://craft.wiki/apps/vectorcraft/work-in-several-windows/), power users manage dozens of active documents across tab strips. This standard specifies universal tab switching shortcuts, closing mechanics (`Ctrl+W`), tab reopening (`Ctrl+Shift+T`), pointer gestures (middle-click to close), and contextual menu actions across all ArtCraft applications.

---

## 2. Normative Keyboard Shortcuts

| Action | Primary Shortcut (Win/Linux) | macOS Equivalent | Description |
| :--- | :--- | :--- | :--- |
| **Next Tab** | `Ctrl+Tab` | `Ctrl+Tab` | Advances to next document tab (wraps to start). |
| **Previous Tab** | `Ctrl+Shift+Tab` | `Ctrl+Shift+Tab` | Reverts to previous document tab (wraps to end). |
| **Close Tab** | `Ctrl+W` | `Cmd+W` | Closes active document tab (prompts if dirty per STD-SHELL-002). |
| **Close All Tabs** | `Ctrl+Shift+W` / `Ctrl+Alt+W` | `Cmd+Option+W` | Closes all open tabs across the active window. |
| **Reopen Closed Tab** | `Ctrl+Shift+T` | `Cmd+Shift+T` | Reopens the most recently closed document tab. |
| **Jump to Tab 1–8** | `Ctrl+1` to `Ctrl+8` | `Cmd+1` to `Cmd+8` | Instantly activates document tab at index $1$ through $8$. |
| **Jump to Last Tab** | `Ctrl+9` | `Cmd+9` | Instantly activates the rightmost (last) document tab. |
| **Toggle All Panels** | `Tab` | `Tab` | Hides/shows all UI chrome panels (clean canvas view). |
| **Toggle Side Docks** | `Shift+Tab` | `Shift+Tab` | Hides/shows secondary inspector side docks only. |

### 2.1 The macOS `Ctrl+Tab` Invariant
* On macOS, `Ctrl+Tab` and `Ctrl+Shift+Tab` are **strictly required** for tab cycling.
* `Cmd+Tab` is hard-reserved by macOS for system application switching and must **never** be intercepted by ArtCraft apps.

---

## 3. Pointer & Mouse Gestures on Tab Strips

### 3.1 Tab Closure Gestures
* **Close Button ($\times$):** Clicking the close icon on any tab closes that tab immediately.
* **Middle-Click on Tab:** Clicking any tab with the middle mouse button (scroll wheel click) closes that tab directly without needing to aim for the small close icon.

### 3.2 Tab Creation & Empty Area Gestures
* **Double-Click Empty Strip:** Double-clicking on the empty space of the tab strip triggers `file.open` (File Open dialog) or `file.new` (New Document dialog).
* **Tab Reordering:** Dragging a tab horizontally allows reordering its position within the strip. Dragging away from the strip tears it off into an independent floating OS window.

---

## 4. Tab Context Menu (Right-Click)

Right-clicking any document tab must display a standardized context menu:
1. **Close (`Ctrl+W` / `Cmd+W`)**
2. **Close Others:** Closes every document tab except the clicked tab.
3. **Close Tabs to the Right:** Closes all tabs positioned to the right of the target.
4. **Close Saved:** Closes all clean (non-dirty) documents, leaving modified files open.
5. **Close All (`Ctrl+Shift+W` / `Cmd+Option+W`)**
6. *--- (Separator) ---*
7. **Copy Full Path:** Copies the absolute file path to the clipboard.
8. **Reveal in File Manager:** Opens Windows Explorer / macOS Finder / Linux file manager with the document selected.

---

## 5. Focus Precedence Hierarchy

When an inline text edit field, rename prompt, or modal dialog is active:
* Keystrokes belong to the active text field.
* `Tab` inserts a tab or advances form focus.
* Global tab shortcuts (`Ctrl+Tab`, `Ctrl+W`) are bypassed until the text field yields focus via `Escape` or `Enter`.
