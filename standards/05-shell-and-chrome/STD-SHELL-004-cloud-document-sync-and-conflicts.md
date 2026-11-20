---
id: STD-SHELL-004
title: Cloud Document Synchronization, Delta Journal & Conflict Lifecycles
category: shell
status: active
canonical_crate: craft-libs::craft-cloud
wiki_reference: https://craft.wiki/architecture/cloud-sync/
affected_apps: [all]
---

# STD-SHELL-004: Cloud Document Synchronization, Delta Journal & Conflict Lifecycles

## 1. Abstract

With the introduction of Storytold Cloud Accounts (`RFC-0025`), live multiplayer collaboration (`RFC-0020`), and cross-device document sync (`RFC-0024`), ArtCraft applications must handle document synchronization gracefully across desktop, web, and mobile endpoints. Disconnected network states, simultaneous multi-device offline edits, and server merge races frequently cause catastrophic data loss when applications use primitive "last-write-wins" file overwrites.

This standard establishes the normative contract for local delta journaling, optimistic updates, offline caches, and visual three-way merge conflict resolution via `craft-libs::craft-cloud`.

---

## 2. Normative Behavioral Requirements

### 2.1 Offline-First Delta Journaling
1. Every edit in a cloud-enabled document MUST be appended to a local binary change journal (`.craft-journal`) before being transmitted across the network.
2. In the event of network disruption or abnormal power loss, the local journal MUST remain authoritative.
3. The application MUST continue allowing full local editing while offline without modal blocking or network error dialogues.

### 2.2 Conflict Detection & Zero-Data-Loss Invariant
When the local client attempts to sync changes to the cloud document storage service:
- If the server's base revision does not match the client's original base revision (indicating that another device has committed changes in the interim), the client MUST NOT overwrite the cloud document.
- The engine MUST attempt an automated three-way merge using operational transformation / CRDT primitives where document semantics allow it (e.g. text runs in WordCraft, non-overlapping canvas layers in PhotoCraft).
- If conflicting edits overlap (e.g. concurrent edits to the same vector path or conflicting keyframe timings), the engine MUST flag the document as `Conflict Pending`.
- The engine MUST create an immutable local snapshot of the user's conflicting edits (`DocumentName (Conflicted Copy - DeviceName).craft`) ensuring zero user work is ever destroyed.

### 2.3 Visual Conflict Resolution UI
When a conflict occurs:
1. The shell window MUST display a non-modal conflict indicator banner at the top of the canvas / viewport:
   `"Cloud Sync Conflict: This document was modified on another device."`
2. Clicking the banner MUST open the unified Craft Conflict Resolver:
   - Option A: **Keep Local Changes** (replaces cloud with current device version).
   - Option B: **Accept Cloud Changes** (archives local edits into version history).
   - Option C: **Keep Both** (preserves both versions side-by-side as separate document tabs).

---

## 3. Implementation Invariants (Rust / craft-cloud)

```rust
use std::path::PathBuf;

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum SyncStatus {
    Synced,
    Syncing,
    OfflineLocalOnly,
    ConflictDetected {
        server_rev: u64,
        local_rev: u64,
        conflict_copy_path: PathBuf,
    },
}

pub struct CloudDocumentHandle {
    pub document_id: String,
    pub base_revision: u64,
    pub pending_deltas: Vec<Vec<u8>>,
    pub status: SyncStatus,
}

impl CloudDocumentHandle {
    /// Handles push rejection from cloud sync endpoint
    pub fn handle_sync_rejection(&mut self, server_head_rev: u64, backup_dir: &std::path::Path) {
        if server_head_rev != self.base_revision {
            let conflict_filename = format!("{}_conflict_{}.craft", self.document_id, server_head_rev);
            let conflict_path = backup_dir.join(conflict_filename);

            // Archive local state safely before prompting user
            self.status = SyncStatus::ConflictDetected {
                server_rev: server_head_rev,
                local_rev: self.base_revision + self.pending_deltas.len() as u64,
                conflict_copy_path: conflict_path,
            };
        }
    }
}
```

---

## 4. Verification & Automated Testing

Every cloud-enabled ArtCraft application MUST pass:
1. `test_offline_editing_appends_to_local_journal`: Asserts that disconnected edits are preserved in local journals.
2. `test_sync_rejection_creates_immutable_conflict_snapshot`: Asserts that server revision collisions never silently overwrite local edits.
3. `test_conflict_banner_triggers_non_modal_prompt`: Verifies that sync conflicts do not lock the UI with modal dialogs.
