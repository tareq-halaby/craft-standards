---
id: STD-INPUT-001
title: Multi-Tool Toolbar Slot Cycling & Gesture Ergonomics
category: interaction
status: active
canonical_crate: craft-libs::craft-ui
widget: ToolSlot
affected_apps: [photocraft, designcraft, effectcraft, vectorcraft]
---

# STD-INPUT-001: Multi-Tool Toolbar Slot Cycling & Gesture Ergonomics

## 1. Abstract
In creative applications with nested tool slots (Photoshop, Illustrator, InDesign, After Effects), toolbar buttons often represent a group of tools. This standard specifies how users interact with multi-tool slot buttons via mouse clicks, hold gestures, and modifier keys.

---

## 2. Normative Behavioral Requirements

### 2.1 Single Click (Primary Pointer Button)
* Clicking an unselected slot button selects the tool currently displayed on that slot.
* The application remembers the last-selected tool in each slot across document switches and application sessions.
* Clicking an already-selected slot button does not deselect the tool.

### 2.2 Alt / Option + Click (Cycling)
* `Alt`/`Option` + Primary Click cycles the slot to the next tool in its group in defined group order.
* When the last tool in the group is reached, cycling immediately wraps to the first tool (`(index + 1) % len`).
* Cycling updates the visible icon and tooltip immediately and sets the active tool.
* Cycling does **not** open the flyout menu.
* **Rapid Alt-Clicks:** Fast successive Alt-clicks must cycle through successive tools rapidly.
* **Double-Click Suppression:** Because egui's default double-click detector ignores modifier keys, implementations must track modified click state and explicitly prevent modified clicks from triggering double-click dialogs (such as Tool Options or Shape Settings).

### 2.3 Long-Press & Drag Gestures (Flyout Activation)
* Holding down the primary mouse button on a multi-tool button for more than **350ms** (`LONG_PRESS = 0.35`) opens the flyout popup menu.
* Dragging the pointer away from the button while holding primary down also opens the flyout.
* Releasing the mouse button that ended the hold must **not** register as a click on the slot.
* Secondary click (Right-click) opens the flyout popup immediately.

### 2.4 Flyout Dismissal & Navigation
* An open flyout closes when:
  1. The user selects a tool from the flyout.
  2. The user clicks anywhere outside the flyout.
  3. The user presses `Escape`.
  4. The user clicks the originating slot button again.

---

## 3. Implementation Invariants (Rust / egui)

### 3.1 Modifier Detection on Release
Implementations must inspect modifiers on the primary release event rather than relying on current frame `ui.input(|i| i.modifiers.alt)`:

```rust
let click_mods = ui.input(|i| {
    i.events.iter().find_map(|e| match e {
        egui::Event::PointerButton { button: egui::PointerButton::Primary, pressed: false, modifiers, .. } => Some(*modifiers),
        _ => None,
    }).unwrap_or(i.modifiers)
});
```

### 3.2 Canonical Implementation
All applications should utilize `craft_ui::ToolSlot` rather than maintaining hand-rolled button logic.
