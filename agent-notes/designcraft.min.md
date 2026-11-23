# DesignCraft Workspace Note (OpenWiki)
- App: `DesignCraft` (Crate: `crates/designcraft-ui`)
- Reference Benchmark: InDesign / Affinity Publisher
- Primary Framework: Rust `egui 0.29`, `wgpu 22.0`, `accesskit 0.17`

## Domain Overview
Multi-page publication designer with master pages, linked text frames, and bleed margins.

## Muscle Memory Hotkeys
- `V=Selection, T=Text Frame, P=Page Navigation, Ctrl+Tab=Spread Toggle`

## Invariants to Preserve
- Never call raw `std::fs` in UI components; route file reads/writes via `craft-fs`.
- Keep tool cycle logic shielded against rapid double-clicks (`STD-INPUT-001`).
- Support AccessKit accessible roles and labels on all widgets (`STD-A11Y-001`).
- Mirror layout dynamically when `ui.ctx().is_rtl()` is true (`STD-I18N-001`).
