---
id: STD-META-001
title: Standard Specification Authoring, Machine Validation, and MCP Registry Invariants
category: governance
status: active
canonical_crate: craft-standards-mcp
affected_apps: [all]
wiki_reference: https://craft.wiki/contributing/standards/
---

# STD-META-001: Standard Specification Authoring, Machine Validation, and MCP Registry Invariants

## 1. Abstract

The ArtCraft creative suite spans 20+ independent applications, shared crates, and autonomous AI coding agents (such as Antigravity, Cursor, and AutoCraft). Documentation without automated verification quickly drifts and becomes obsolete ("orphan documentation"). 

This standard establishes the normative metamodel for how standards are authored, validated, registered in the Model Context Protocol (MCP) server, verified via CI linting, and exposed through interactive tooling. Every new standard in the Storytold ecosystem MUST adhere to this authoring lifecycle.

---

## 2. Normative Architecture

### 2.1 The Four Mandatory Specification Sections
Every standard specification document (`standards/<category>/STD-XXX-###-<name>.md`) MUST strictly contain the following four top-level sections in order:
1. `## 1. Abstract`: Concise summary of the architectural problem, why standardizing is necessary, and ecosystem impact.
2. `## 2. Normative Behavioral Requirements`: Non-negotiable ergonomic contracts, edge cases, state machines, and lifecycle rules.
3. `## 3. Implementation Invariants`: Canonical Rust, egui, or `craft-libs` data structures, interfaces, and code patterns.
4. `## 4. Verification & Automated Testing`: Reproducible tests, property checks, fuzzing sweeps, or CI verification requirements.

### 2.2 YAML Frontmatter Contract
Specifications MUST begin with strict YAML frontmatter containing:
```yaml
---
id: STD-CAT-001
title: Clear, Descriptive Title
category: interaction | navigation | accessibility | internationalization | shell | unified-libs | governance
status: draft | active | deprecated
canonical_crate: craft-libs::craft-<crate> | craft-standards-mcp
affected_apps: [all] | [photocraft, designcraft, ...]
wiki_reference: https://craft.wiki/...
---
```

### 2.3 The Non-Orphan Invariant (Automated Registry Sync)
A standard document MUST NOT exist in isolation. When adding or modifying a standard, the author (human or AI agent) MUST atomically synchronize all tooling components in a single commit:
1. **MCP Registry Sync (`craft-standards-mcp`):**
   - Must be listed in `execute_list_standards` with correct category and canonical crate.
   - Must be retrievable via `execute_get_standard(id)` with concise normative rules.
   - Must provide verification rules in `execute_verify_component` where applicable.
   - Must map relevant shared crates in `execute_resolve_library_primitive`.
2. **Machine Validation Suite (`xtask`):**
   - Must pass `cargo xtask audit` with 0 errors.
   - Must be cataloged in `cargo xtask list`.
   - Must compile cleanly into `standards-dashboard.html` via `cargo xtask report`.
3. **Documentation Sync:**
   - Must be indexed in `craft-standards/README.md` Active Standards Catalog table.
   - Catalog total counts across badges and headers must match the new total.

### 2.4 Agent Instruction Protocol (Standard-to-Code Workflow)
When an AI agent is instructed to create or update a standard, it MUST execute the canonical 6-step lifecycle:
```text
Step 1: Research & Problem Formulation (craft.wiki + RFCs)
Step 2: Author Normative Spec in standards/<category>/STD-XXX-###.md
Step 3: Update crates/craft-standards-mcp/src/main.rs (Registry + Linter)
Step 4: Update README.md Catalog Index
Step 5: Run xtask Verification (cargo xtask audit && cargo test --workspace)
Step 6: Regenerate Visual Dashboard (cargo xtask report)
```

---

## 3. Implementation Invariants (Rust / xtask / MCP)

### 3.1 Automated Frontmatter Parser & Auditor
```rust
pub fn audit_standard(path: &Path) -> Result<StandardMetadata, AuditError> {
    let content = fs::read_to_string(path)?;
    let frontmatter = parse_frontmatter(&content)
        .ok_or(AuditError::MissingFrontmatter)?;
    
    // Invariant: ID must match STD-[A-Z]+-[0-9]{3}
    if !ID_REGEX.is_match(&frontmatter.id) {
        return Err(AuditError::InvalidIdFormat(frontmatter.id));
    }
    
    // Invariant: Must contain all 4 mandatory headings
    for heading in &["## 1. Abstract", "## 2. Normative", "## 3. Implementation", "## 4. Verification"] {
        if !content.contains(heading) {
            return Err(AuditError::MissingSection(heading.to_string()));
        }
    }
    
    Ok(frontmatter)
}
```

---

## 4. Verification & Automated Testing

1. `test_spec_has_all_sections`: Automated xtask sweep verifying that every `.md` file in `standards/` has sections 1 through 4.
2. `test_mcp_catalog_count_matches_filesystem`: Ensures the count returned by `execute_list_standards` exactly matches the number of audited `.md` files on disk.
3. `test_no_duplicate_ids`: Confirms standard IDs are globally unique across the workspace.
