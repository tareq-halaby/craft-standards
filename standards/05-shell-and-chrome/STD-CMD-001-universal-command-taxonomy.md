---
id: STD-CMD-001
title: Universal Application Command Taxonomy, CLI Flags, and Headless MCP Protocol
category: shell
status: active
canonical_crate: craft-libs::craft-keymap
wiki_reference: https://craft.wiki/apps/connect-ai/overview/
affected_apps: [all]
---

# STD-CMD-001: Universal Application Command Taxonomy, CLI Flags, and Headless MCP Protocol

## 1. Abstract
As documented on [Craft Wiki: Connect an AI Assistant](https://craft.wiki/apps/connect-ai/overview/), every ArtCraft application provides an autonomous CLI binary (`<app>-cli`, such as `photocraft-cli`, `vectorcraft-cli`, `wordcraft-cli`) implementing the Model Context Protocol (MCP). This standard specifies uniform CLI invocation flags, headless vs windowed execution lifecycles, and a standardized core command ID taxonomy.

---

## 2. Normative CLI Invariants

### 2.1 The MCP Gateway Command
* Every application crate must compile a companion CLI executable named `<app>-cli` (e.g. `vectorcraft-cli.exe` on Windows, `/usr/bin/vectorcraft-cli` on Linux).
* Running `<app>-cli mcp` starts a stdio JSON-RPC MCP server compliant with MCP specification `2024-11-05`.

### 2.2 Windowed vs. Headless Execution
* **Windowed Control Mode:**
  * When an app is launched with `--control <port>` (e.g. `vectorcraft --control 7979`), it starts an internal IPC server.
  * When `<app>-cli mcp` launches, it attempts to connect to the active port to drive the visible GUI window.
* **Headless Background Mode:**
  * If no running GUI window is found on the control port, the CLI runs headlessly in the background, operating on documents directly in memory without window allocations.

---

## 3. Core Universal Command Taxonomy

Every ArtCraft application's command catalog must expose these standard command IDs with identical parameters:

| Command ID | Standard Shortcut | Parameters | Description |
| :--- | :--- | :--- | :--- |
| `file.new` | `Cmd+N` / `Ctrl+N` | `{ width?, height?, preset? }` | Create a new document. |
| `file.open` | `Cmd+O` / `Ctrl+O` | `{ path }` | Open document from disk. |
| `file.save` | `Cmd+S` / `Ctrl+S` | `{}` | Save current document. |
| `file.saveAs` | `Cmd+Shift+S` / `Ctrl+Shift+S` | `{ path }` | Save copy with new path. |
| `file.close` | `Cmd+W` / `Ctrl+W` | `{}` | Close active tab (STD-SHELL-002). |
| `edit.undo` | `Cmd+Z` / `Ctrl+Z` | `{}` | Revert last undoable transaction. |
| `edit.redo` | `Cmd+Shift+Z` / `Ctrl+Y` | `{}` | Re-apply reverted transaction. |
| `window.nextDocument` | `Ctrl+Tab` | `{}` | Advance to next tab (STD-NAV-001). |
| `window.previousDocument` | `Ctrl+Shift+Tab` | `{}` | Revert to previous tab. |
| `view.fit` | `Cmd+0` / `Ctrl+0` | `{}` | Fit canvas on screen (STD-INPUT-003). |
| `view.actualPixels` | `Cmd+1` / `Ctrl+1` | `{}` | Zoom to 100% 1:1 pixel scale. |
| `tool.select` | Variable | `{ tool }` | Select tool by string ID (STD-INPUT-001). |
| `app.quit` | `Cmd+Q` / `Ctrl+Q` | `{}` | Safe application exit. |
