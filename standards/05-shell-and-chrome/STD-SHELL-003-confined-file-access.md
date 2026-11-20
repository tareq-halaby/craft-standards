---
id: STD-SHELL-003
title: Confined File Access, Sandboxing & Automation Root Isolation
category: shell
status: active
canonical_crate: craft-libs::craft-confine
wiki_reference: https://craft.wiki/architecture/confinement/
affected_apps: [all]
---

# STD-SHELL-003: Confined File Access, Sandboxing & Automation Root Isolation

## 1. Abstract

When ArtCraft applications are driven by automated workflows, AI agents (`storytold/autocraft`), or headless CI pipelines (`<app>-cli mcp`), the application process MUST NOT access, inspect, or modify files outside designated folders. As documented in Storytold `RFC-0015` and demonstrated by security audit findings (e.g., EffectCraft #2131 F-11 and SoundCraft #1224), application sandboxes frequently suffer from path traversal escapes via relative `..` tokens, symbolic links, Windows directory junctions, UNC network shares, 8.3 short names, and secondary file reads declared inside documents (e.g. linked external footage, fonts, or LUTs).

This standard establishes the normative contract for directory confinement across the entire ArtCraft suite via `craft-libs::craft-confine`.

---

## 2. Normative Behavioral Requirements

### 2.1 Mandatory Confinement CLI Flags
Every ArtCraft application CLI providing a headless or MCP automation entry point MUST accept:
1. `--automation-read-root <DIR>` (repeatable): Defines allowed read directories.
2. `--automation-write-root <DIR>` (repeatable): Defines allowed write directories.

Any write root MUST also be considered readable. A read root that is not also declared as a write root MUST NOT be written to: save, overwrite, create, rename, or delete operations inside read-only roots MUST be refused.

### 2.2 Fail-Closed Invariant
An automation or agent entry point (`<app>-cli mcp` or batch worker) MUST run confined. If neither `--automation-read-root` nor `--automation-write-root` is supplied at startup, the CLI MUST refuse execution and exit with status code `64` (`EX_USAGE`) before initializing the engine.

### 2.3 Path Canonicalization & Boundary Evaluation
Path boundaries MUST NOT be evaluated by string prefix comparison. The confinement engine MUST:
1. Fully resolve all symlinks and Windows NTFS directory junctions (`std::fs::canonicalize`).
2. Collapse all `.` and `..` segments.
3. Resolve Windows 8.3 short names to their canonical long names prior to evaluation.
4. On case-insensitive file systems (Windows, macOS APFS default), perform case-folded component comparison.
5. Reject raw UNC paths (`\\server\share`) and raw device paths (`\\?\`) unless their target target canonicalizes strictly within an allowed root.

```
Allowed Root:    /sandbox/project
Attempted Path:  /sandbox/project/../project-secrets/key.pem  --> REFUSED (Escapes root)
Attempted Path:  /sandbox/project-other/asset.png             --> REFUSED (Prefix collision)
Attempted Path:  /sandbox/project/symlink_to_etc_passwd       --> REFUSED (Target outside)
```

### 2.4 Document-Embedded Asset Leaks
When opening a document that contains external asset references (e.g. linked video footage in FilmCraft, composite vector fonts in VectorCraft, or audio sample tracks in SoundCraft):
- If any referenced asset canonicalizes outside the active read roots, the engine MUST refuse to read or decode that asset.
- The document MUST open with the asset marked as `Unresolved (Sandboxed)`.
- The engine MUST NOT crash or silently bypass confinement.

### 2.5 Bridge Mode Fails Closed
When an agent connects to a running desktop GUI instance (`mcp --connect <PORT>` or `--bridge`), the connection MUST be refused unless the target desktop process is enforcing identical confinement roots. Connecting a confined CLI to an unrestricted desktop process is strictly forbidden.

---

## 3. Implementation Invariants (Rust / craft-confine)

```rust
use std::path::{Path, PathBuf};
use std::fs;

#[derive(Debug, Clone)]
pub struct ConfinementContext {
    pub read_roots: Vec<PathBuf>,
    pub write_roots: Vec<PathBuf>,
}

#[derive(Debug, PartialEq, Eq)]
pub enum ConfinementError {
    UnconfinedAccessAttempted(PathBuf),
    ReadOnlyViolation(PathBuf),
    SymlinkEscape(PathBuf),
    InvalidRoot(PathBuf),
}

impl ConfinementContext {
    pub fn new(reads: Vec<PathBuf>, writes: Vec<PathBuf>) -> Result<Self, ConfinementError> {
        let mut canonical_reads = Vec::new();
        let mut canonical_writes = Vec::new();

        for r in reads {
            let canon = fs::canonicalize(&r).map_err(|_| ConfinementError::InvalidRoot(r))?;
            canonical_reads.push(canon);
        }
        for w in writes {
            let canon = fs::canonicalize(&w).map_err(|_| ConfinementError::InvalidRoot(w))?;
            canonical_writes.push(canon.clone());
            canonical_reads.push(canon); // Write roots are inherently readable
        }

        Ok(Self {
            read_roots: canonical_reads,
            write_roots: canonical_writes,
        })
    }

    /// Verifies that a target path is strictly inside allowed read roots
    pub fn verify_read(&self, path: &Path) -> Result<PathBuf, ConfinementError> {
        let canonical = fs::canonicalize(path).map_err(|_| ConfinementError::UnconfinedAccessAttempted(path.to_path_buf()))?;
        if self.read_roots.iter().any(|root| canonical.starts_with(root)) {
            Ok(canonical)
        } else {
            Err(ConfinementError::UnconfinedAccessAttempted(canonical))
        }
    }

    /// Verifies that a target path is strictly inside allowed write roots
    pub fn verify_write(&self, path: &Path) -> Result<PathBuf, ConfinementError> {
        let parent = path.parent().unwrap_or(path);
        let canonical_parent = fs::canonicalize(parent).map_err(|_| ConfinementError::ReadOnlyViolation(path.to_path_buf()))?;
        if self.write_roots.iter().any(|root| canonical_parent.starts_with(root)) {
            Ok(path.to_path_buf())
        } else {
            Err(ConfinementError::ReadOnlyViolation(path.to_path_buf()))
        }
    }
}
```

---

## 4. Verification & Automated Testing

Every application CLI MUST pass the shared `craft-libs::craft-confine` escape test suite:
1. `test_rejects_parent_traversal`: Ensures `..` escapes fail.
2. `test_rejects_symlink_pointing_outside`: Symlinks to `/etc` or `C:\Windows` are refused.
3. `test_rejects_hardlink_overwrite`: Ensures write targets through hard links do not mutate outside files.
4. `test_headless_startup_fails_without_roots`: Checks that `<app>-cli mcp` exits with code 64 if roots are missing.
