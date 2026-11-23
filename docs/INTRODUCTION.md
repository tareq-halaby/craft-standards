# ArtCraft Standards & Reference App Guide

> **Practical UI Recipes, Shared Crates, and Industry Reference Mappings for the 20+ ArtCraft Creative Desktop Applications**  
> *Developer Companion · Respecting App Individuality · Token-Lean Agent Workflows*  
> **Live Companion Portal:** [https://tareq-halaby.github.io/craft-standards/](https://tareq-halaby.github.io/craft-standards/)

---

## 1. Core Philosophy: Practical Recipes & Reference-App Individuality

The **ArtCraft Creative Suite** by Storytold is an ecosystem of **20+ desktop applications in Rust** (*PhotoCraft, VectorCraft, FilmCraft, CADCraft, WordCraft*, and more) built by over **6,000+ community contributors and maintainers**.

In fast-moving Rust codebases with modern GUI frameworks (like `egui` and `wgpu`), **the code is the documentation**. A rigid, top-down governance manual quickly drifts out of date. 

Furthermore, **apps intentionally behave differently based on their specific reference applications**:
* **PhotoCraft** should feel familiar to **Adobe Photoshop / Krita** users (raster layers, marquee tools, canvas zoom physics).
* **FilmCraft** should feel familiar to **DaVinci Resolve / Premiere Pro** editors (JKL playhead scrubbing, multi-track timeline, razor cuts).
* **CADCraft** should feel familiar to **AutoCAD / Blender** designers (precision Cartesian coordinates, snapping grids, modal transformations).

**`craft-standards`** exists not to homogenize apps, but to serve as a **practical developer companion**:
1. **Reference-App Mappings:** Documenting each app's industry lineage so contributors and agents know which conventions to follow.
2. **Shared Foundation Crates:** Providing reusable recipes for cross-cutting infrastructure where divergence causes bugs (AccessKit accessibility trees, safe file sandboxing via `craft-fs`, BiDi/RTL spatial mirroring).
3. **Token-Lean Agent Snippets (< 50 lines):** Offering compact, token-efficient code snippets for AI coding agents (Claude Code, Cursor, AutoCraft) to avoid context window bloat.

---

## 2. When to Share vs. When to Specialize

```
┌────────────────────────────────────────────────────────────────────────┐
│                   THE ARTCRAFT CONVERGENCE BOUNDARY                    │
├───────────────────────────────────┬────────────────────────────────────┤
│   SHARED FOUNDATIONS              │   APP-SPECIFIC INDIVIDUALITY       │
│   (Cross-Cutting Infrastructure)  │   (Reference-App Aligned)          │
├───────────────────────────────────┼────────────────────────────────────┤
│ • AccessKit a11y Node Tagging     │ • Tool cycling & canvas gestures   │
│ • Sandboxed File I/O (craft-fs)   │ • Timeline playhead & track logic  │
│ • Full Shell BiDi & RTL Mirroring │ • Precision coordinate snapping    │
│ • Clean-Room Licensing Checks     │ • Custom domain shaders & viewports│
│ • Windowing & GPU device fallbacks│ • Domain keymaps (Photoshop vs CAD)│
└───────────────────────────────────┴────────────────────────────────────┘
```

---

## 3. Reference App Lineage Roster

Each ArtCraft application intentionally draws ergonomics and workflows from its benchmark creative tool:

| Application | Domain | Industry Reference Benchmark | Primary Ergonomic Metaphor |
| :--- | :--- | :--- | :--- |
| **PhotoCraft** | Graphics | Adobe Photoshop / Krita | Raster layers, blend modes, canvas pan/zoom, marquee selection |
| **FilmCraft** | Video | DaVinci Resolve / Premiere Pro | Multi-track timeline, JKL shuttle scrubbing, playhead, razor cut |
| **VectorCraft** | Graphics | Adobe Illustrator / Inkscape | Bézier pen tool, vector anchor points, path math |
| **CADCraft** | CAD / 3D | AutoCAD / FreeCAD / Blender | Precision Cartesian coordinates, snapping grid, orthogonal views |
| **WordCraft** | Productivity | InDesign / Typora / Markdown | Typographic galleys, document sections, markdown rendering |
| **AniCraft** | Animation | Blender Grease Pencil / Toon Boom | Frame-by-frame timeline, keyframing, onion skinning |
| **SoundCraft** | Audio | Audacity / Pro Tools | Audio waveforms, decibel meters, clip snapping |
| **LightCraft** | Photography | Adobe Lightroom / Capture One | Non-destructive RAW processing, exposure curves, color wheels |
| **TextureCraft** | 3D Texturing | Substance Designer / Painter | Procedural PBR node graphs, UV mapping, texture baking |
| **MaterialCraft** | Shaders | Blender Shader Editor | Node-based material graphs, real-time viewport shading |
| **FigCraft** | UI / Vector | Figma | Frames, auto-layout, nested vector components |
| **DeckCraft** | Presentations| Apple Keynote / PowerPoint | Slide master templates, layout canvas, presenter notes |
| **GridCraft** | Data | Excel / LibreOffice Calc | Cell grid, formula parsing, tabular data view |
| **PdfCraft** | Prepress | Adobe Acrobat / PDF-XChange | Prepress proofing, vector annotations, page management |
| **SolidCraft** | 3D Modeling | SolidWorks / Rhino | Parametric B-Rep solid modeling, constraint solver |
| **MailCraft** | Communication| Superhuman / Thunderbird | Rapid keyboard triage, split pane preview, offline IMAP cache |
| **Craft Anything** | DevTools | VS Code / Node-RED | Visual extension builder, canvas pipelines, MCP integration |
| **ArtCraft Studio** | AI Studio | ComfyUI / Automatic1111 | Node-based generative workflows, latent streaming, prompt queues |

---

## 4. Token-Lean Agent Philosophy (OpenWiki Aligned)

In agentic development, injecting multi-page markdown documents burns precious context window tokens and slows inference. 

`craft-standards` adheres to a **token-lean, code-first approach**:
* **Ultra-Compact Snippets:** Every recipe provides a `< 150 token` prompt snippet with exact Rust types and function signatures.
* **OpenWiki Integration:** Compatible with multi-repo agent architectures (such as [langchain-ai/openwiki](https://github.com/langchain-ai/openwiki)), allowing agents to read and write modular workspace notes without token bloat.
* **Code as Documentation:** Prioritizes copy-pasteable `egui 0.29+` and `wgpu` code snippets over abstract philosophical text.

---

## 5. Explore the Companion Portal

* 🌐 **Companion Portal:** [https://tareq-halaby.github.io/craft-standards/](https://tareq-halaby.github.io/craft-standards/)
* 🎨 **Reference App Lineage:** [https://tareq-halaby.github.io/craft-standards/#matrix](https://tareq-halaby.github.io/craft-standards/#matrix)
* 💡 **Developer FAQ:** [https://tareq-halaby.github.io/craft-standards/#faq](https://tareq-halaby.github.io/craft-standards/#faq)
