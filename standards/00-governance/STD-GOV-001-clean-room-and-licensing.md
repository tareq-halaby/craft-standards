---
id: STD-GOV-001
title: Clean-Room Reverse Engineering, Patent Isolation, and Dependency License Allowlist Invariants
category: governance
status: active
canonical_crate: craft-standards-mcp
affected_apps: [all]
wiki_reference: https://craft.wiki/contributing/clean-room/
---

# STD-GOV-001: Clean-Room Reverse Engineering, Patent Isolation, and Dependency License Allowlist Invariants

## 1. Abstract

ArtCraft creative applications achieve compatibility with legacy proprietary formats and workflows (such as Adobe PSD/AI, Apple ProRes, Figma `.fig`, and Autodesk DXF). To protect the Storytold ecosystem from intellectual property infringement, copyright contamination, and patent encumbrances, all interoperability engineering MUST adhere to rigorous **Clean-Room Reverse Engineering** practices as codified in `craft-contrib/standards/clean-room.md`.

Furthermore, to maintain Apache-2.0 / MIT commercial viability, all third-party Rust crates and web packages must satisfy strict **License Allowlist Invariants** (`craft-contrib/standards/licences.md`).

---

## 2. Normative Behavioral Requirements

### 2.1 The Two-Team Clean-Room Isolation Model
When reverse-engineering proprietary file formats, network protocols, or proprietary algorithms:
1. **Analysis Team (Dirty Room):**
   - Inspects binary payloads, executes legacy software in tracing sandboxes, or analyzes packet dumps.
   - May read decompiled machine output or protocol traces.
   - **MUST NEVER write code** intended for inclusion in ArtCraft or `craft-libs`.
   - Produces solely abstract functional specifications and wire-format documentation.
2. **Implementation Team (Clean Room / AI Agents):**
   - Implements the feature or codec strictly from the abstract specification produced by the Analysis Team.
   - **MUST NEVER inspect** proprietary binaries, decompiled source code, leaked internal SDKs, or reverse engineering disassemblers (Ghidra, IDA Pro).
   - If an AI coding agent is employed, its prompts MUST NOT be seeded with copyrighted proprietary headers or decompiled snippets.

### 2.2 Strict Dependency License Allowlist
All crates introduced into `Cargo.toml` across ArtCraft applications MUST match the approved permissive licenses:
- **Approved Permissive Licenses:**
  - `MIT`
  - `Apache-2.0` (preferred for explicit patent grant)
  - `BSD-2-Clause` / `BSD-3-Clause`
  - `ISC`
  - `CC0-1.0` / `Unlicense`
- **Conditionally Allowed (Dual-Licensed):**
  - Any crate dual-licensed where at least one option is MIT or Apache-2.0 (e.g. `MIT OR Apache-2.0`).
- **Strictly Prohibited Licenses:**
  - `GPL-2.0`, `GPL-3.0`, `AGPL-3.0` (viral copyleft contaminates application distribution).
  - `SSPL`, `BSL-1.1` (non-OSI commercial restrictions).
  - Proprietary or unstated licensing without explicit public grant.

### 2.3 Automated CI License Auditing (`cargo deny`)
1. Every ArtCraft workspace MUST run `cargo-deny` in CI checking:
   ```toml
   [licenses]
   allow = ["MIT", "Apache-2.0", "BSD-2-Clause", "BSD-3-Clause", "ISC"]
   confidence-threshold = 0.8
   ```
2. Pull requests introducing unapproved licenses MUST be automatically blocked.

---

## 3. Implementation Invariants (Rust / cargo-deny)

```toml
# .cargo/deny.toml
[licenses]
unlicensed = "reject"
allow = [
    "MIT",
    "Apache-2.0",
    "BSD-3-Clause",
    "BSD-2-Clause",
    "ISC",
    "CC0-1.0",
    "Zlib"
]
copyleft = "reject"

[bans]
multiple-versions = "warn"
deny = [
    # Explicitly banned copyleft or tainted crates
    { name = "gpl-crypto-crate" },
]
```

---

## 4. Verification & Automated Testing

1. `test_clean_room_provenance`: Every external format parser in `craft-libs` must cite its public specification source or Clean-Room document ID in its module docstring.
2. `test_cargo_deny_licenses`: Automated CI job executing `cargo deny check licenses` on every pull request.
3. `test_no_gpl_dependencies`: Linter check inspecting `cargo metadata` dependency graph for viral copyleft licenses.
