# EffectCraft Workspace Note (OpenWiki)
- App: `EffectCraft` (Crate: `crates/effectcraft-ui`)
- Reference Benchmark: After Effects / Nuke
- Primary Framework: Rust `egui 0.29`, `wgpu 22.0`, `accesskit 0.17`

## Domain Overview
Motion graphics & visual VFX compositor with node trees, keyframe graphs, and layer blending.

## Muscle Memory Hotkeys
- `V=Select, J/K/L=Shuttle Playback, B=Blade Cut, Space=Play/Pause`

## Invariants to Preserve
- Never call raw `std::fs` in UI components; route file reads/writes via `craft-fs`.
- Keep tool cycle logic shielded against rapid double-clicks (`STD-INPUT-001`).
- Support AccessKit accessible roles and labels on all widgets (`STD-A11Y-001`).
- Mirror layout dynamically when `ui.ctx().is_rtl()` is true (`STD-I18N-001`).
