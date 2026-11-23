# PhotoCraft Workspace Note (OpenWiki)
- App: `PhotoCraft` (Crate: `crates/photocraft-ui`)
- Reference Benchmark: Adobe Photoshop / Krita
- Primary Framework: Rust `egui 0.29`, `wgpu 22.0`, `accesskit 0.17`

## Domain Overview
Raster image editor with non-destructive layers, selection masks, and hardware canvas.

## Muscle Memory Hotkeys
- `V=Move, B=Brush (cycles), M=Marquee, Space+Drag=Pan, Ctrl+Tab=LRU Docs`

## Invariants to Preserve
- Never call raw `std::fs` in UI components; route file reads/writes via `craft-fs`.
- Keep tool cycle logic shielded against rapid double-clicks (`STD-INPUT-001`).
- Support AccessKit accessible roles and labels on all widgets (`STD-A11Y-001`).
- Mirror layout dynamically when `ui.ctx().is_rtl()` is true (`STD-I18N-001`).
