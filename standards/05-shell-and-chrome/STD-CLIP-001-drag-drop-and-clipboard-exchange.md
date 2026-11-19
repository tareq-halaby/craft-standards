---
id: STD-CLIP-001
title: Cross-Application Drag-and-Drop, Clipboard Data Interchange, and External File Ingestion
category: shell
status: active
canonical_crate: craft-libs::craft-window
wiki_reference: https://craft.wiki/apps/vectorcraft/place-linked-documents/
affected_apps: [all]
---

# STD-CLIP-001: Cross-Application Drag-and-Drop, Clipboard Data Interchange, and External File Ingestion

## 1. Abstract
As documented on [Craft Wiki: Place linked documents](https://craft.wiki/apps/vectorcraft/place-linked-documents/), users routinely copy and drag graphical assets, type, and documents between applications (e.g. copying paths from VectorCraft into PhotoCraft as smart vectors). This standard formalizes clipboard MIME types, drop targets, and cross-suite asset exchange.

---

## 2. Normative Behavioral Requirements

### 2.1 OS Desktop File Drop Invariants
* Dragging one or more image files (PNG, JPEG, TIFF, PSD, SVG, WebP) from the operating system desktop or file manager:
  * **Onto an open document canvas:** Inserts the dropped files as new placed/linked layers centered at the drop point.
  * **Onto the empty tab strip or window chrome:** Opens each dropped file in its own document tab.

### 2.2 Vector & Raster Clipboard Formats
When copying artwork to the system clipboard, applications must write multiple interoperable representations:
1. `image/svg+xml`: Vector paths, strokes, and fills for clean vector exchange between VectorCraft, DesignCraft, and web browsers.
2. `image/png`: 32-bit RGBA raster bitmap with transparency for legacy apps.
3. `text/plain`: Clean extracted text if the selection contains live typography.
4. `application/x-artcraft-object`: High-fidelity internal serializations preserving layer hierarchies and effects.

### 2.3 Non-Blocking Large Asset Ingestion
* Ingesting high-resolution or multi-gigabyte assets must execute asynchronously on background workers without freezing the main UI frame loop.
* The UI displays an inline non-blocking progress ring or status bar message with an immediate `Cancel` button.
