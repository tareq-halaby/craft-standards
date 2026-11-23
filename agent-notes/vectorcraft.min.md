# VectorCraft Workspace Note (OpenWiki)
- App: `VectorCraft` (Crate: `crates/vectorcraft-ui`)
- Reference Benchmark: Adobe Illustrator / Inkscape
- Primary Framework: Rust `egui 0.29`, `wgpu 22.0`, `accesskit 0.17`

## Domain Overview
Vector illustration studio with precision Bézier curves, path boolean ops, and stroke styling.

## Muscle Memory Hotkeys
- `V=Direct Select, P=Pen (anchor point math), A=Direct Edit, Space+Drag=Pan`

## Invariants to Preserve
- Never call raw `std::fs` in UI components; route file reads/writes via `craft-fs`.
- Keep tool cycle logic shielded against rapid double-clicks (`STD-INPUT-001`).
- Support AccessKit accessible roles and labels on all widgets (`STD-A11Y-001`).
- Mirror layout dynamically when `ui.ctx().is_rtl()` is true (`STD-I18N-001`).
