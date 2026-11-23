# WordCraft Workspace Note (OpenWiki)
- App: `WordCraft` (Crate: `crates/wordcraft-core`)
- Reference Benchmark: InDesign / Typora / Markdown
- Primary Framework: Rust `egui 0.29`, `wgpu 22.0`, `accesskit 0.17`

## Domain Overview
Distraction-free publishing studio with Cosmic-Text bidirectional shaping and live layout.

## Muscle Memory Hotkeys
- `Ctrl+B=Bold, Ctrl+I=Italic, Ctrl+Tab=Document Buffer, Ctrl+S=Safe Flush`

## Invariants to Preserve
- Never call raw `std::fs` in UI components; route file reads/writes via `craft-fs`.
- Keep tool cycle logic shielded against rapid double-clicks (`STD-INPUT-001`).
- Support AccessKit accessible roles and labels on all widgets (`STD-A11Y-001`).
- Mirror layout dynamically when `ui.ctx().is_rtl()` is true (`STD-I18N-001`).
