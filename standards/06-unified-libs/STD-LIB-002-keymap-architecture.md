---
id: STD-LIB-002
title: Keymap Architecture, Platform Chord Normalization, and Overrides
category: unified-libs
status: active
canonical_crate: craft-libs::craft-keymap
affected_apps: [photocraft, designcraft, effectcraft, vectorcraft, wordcraft]
---

# STD-LIB-002: Keymap Architecture, Platform Chord Normalization, and Overrides

## 1. Abstract
Specifies the canonical keymap representation used across ArtCraft applications via `craft-libs::craft-keymap`.

---

## 2. Normative Architecture

### 2.1 Abstract Platform Modifiers
Keybindings are declared using logical modifiers that normalize automatically by operating system:
* `PrimaryModifier`: `Command` on macOS, `Control` on Windows and Linux.
* `SecondaryModifier`: `Option` on macOS, `Alt` on Windows and Linux.

### 2.2 Storage & Override Serialization
* All user shortcut overrides are serialized in JSON matching `schemas/keymap.schema.json`.
* Default shortcut tables declare command identifiers (e.g. `file.save`, `edit.undo`, `view.fitOnScreen`).

### 2.3 Conflict Resolution Rules
When a key combination matches multiple commands across scopes:
1. Active modal dialog / text input field captures keystroke.
2. Active tool-specific hotkey.
3. Active document / canvas scope hotkey.
4. Global application shell command.
