---
id: STD-LIB-001
title: Universal Cross-Platform Printing and Prepress Pipeline
category: unified-libs
status: active
canonical_crate: craft-libs::craft-print
supporting_crates: [craft-winprint-gdi, craft-pdf, craft-prepress]
affected_apps: [photocraft, designcraft, vectorcraft, wordcraft]
---

# STD-LIB-001: Universal Cross-Platform Printing and Prepress Pipeline

## 1. Abstract
Printing across desktop operating systems involves disparate backends: Windows GDI / XPS on Windows, CUPS on Linux and FreeBSD, and CoreGraphics/NSPrintOperation on macOS. This standard dictates that all ArtCraft applications must route document output through `craft-libs::craft-print` rather than writing platform-specific print code.

---

## 2. Normative Architecture

```
┌─────────────────────────────────────────────────────────────┐
│              Application (Document Output API)              │
│       PhotoCraft │ DesignCraft │ VectorCraft │ WordCraft    │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 craft-libs::craft-print                     │
│    (Unified Print Job, Pagination, Page Setup Dialog)       │
└──────┬───────────────────────┼───────────────────────┬──────┘
       │                       │                       │
       ▼                       ▼                       ▼
┌──────────────┐        ┌──────────────┐        ┌─────────────┐
│Windows GDI   │        │CUPS Backend  │        │PDF / Proof  │
│(winprint-gdi)│        │(macOS/Linux) │        │(craft-pdf)  │
└──────────────┘        └──────────────┘        └─────────────┘
```

---

## 3. Normative Requirements

1. **Zero Direct Platform Calls:** No ArtCraft application may directly link against `winspool.drv`, `winprint`, or native macOS printing headers. All calls pass through `craft_print::PrintSession`.
2. **Color Management & Prepress:** Print pipelines must pass document ICC profiles through `craft_cms` / LittleCMS. CMYK spot colors and separations route through `craft_prepress`.
3. **Print Preview Fidelity:** The print dialog preview must render via `craft_pdf` or identical rasterizer to guarantee WYSIWYG parity between preview and printer output.
