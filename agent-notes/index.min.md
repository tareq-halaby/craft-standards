# ArtCraft Multi-Repo Workspace Map (OpenWiki)
> Root workspace map for Storytold creative desktop applications in Rust.

## Application Lineage & Benchmarks
- `PhotoCraft`: Raster layers, canvas pan/zoom, marquee selection (Benchmark: Adobe Photoshop / Krita)
- `VectorCraft`: Bézier pen tool, vector anchor points, path math (Benchmark: Adobe Illustrator / Inkscape)
- `DesignCraft`: Multi-page layout grids, master spreads, typographic flow (Benchmark: InDesign / Affinity Publisher)
- `FilmCraft`: Multi-track timeline, JKL shuttle scrubbing, razor cut (Benchmark: DaVinci Resolve / Premiere Pro)
- `EffectCraft`: Node and layer compositing, keyframe graph editor (Benchmark: After Effects / Nuke)
- `WordCraft`: Typographic galleys, document sections, BiDi layout (Benchmark: InDesign / Typora)
- `CADCraft`: Precision Cartesian coordinates, orthogonal snapping (Benchmark: AutoCAD / FreeCAD)

## Core Architectural Invariants
1. `STD-INPUT-001`: Toolbar slot cycling with Alt-click/hotkey; shield rapid double-clicks.
2. `STD-NAV-001`: Document tabs cycle via Ctrl+Tab in LRU order; modified tabs prompt 3-button modal [Save, Don't Save, Cancel].
3. `STD-A11Y-001`: Every interactive component must supply AccessKit Node and Role.
4. `STD-SHELL-003`: Direct `std::fs` is forbidden; route all I/O via `craft_fs::AutomationRoot`.
5. `STD-I18N-001`: Observe `ui.ctx().is_rtl()` and mirror inspector/timeline layouts.
