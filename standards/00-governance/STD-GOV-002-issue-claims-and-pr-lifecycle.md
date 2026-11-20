---
id: STD-GOV-002
title: Contributor Issue Claims, Single-Concern Commits, and Pull Request Invariants
category: governance
status: active
canonical_crate: craft-standards-mcp
affected_apps: [all]
wiki_reference: https://craft.wiki/contributing/pull-requests/
---

# STD-GOV-002: Contributor Issue Claims, Single-Concern Commits, and Pull Request Invariants

## 1. Abstract

When dozens of human contributors and autonomous AI agents work concurrently across the 20+ ArtCraft repositories, uncoordinated work leads to duplicate pull requests, wasted computational resources, and merge conflicts. As established in `craft-contrib/rfcs/0003-claiming-issues.md` and `craft-contrib/standards/claims.md`, a deterministic **Claiming Protocol** and structured **PR Lifecycle** are required to guarantee smooth distributed collaboration.

---

## 2. Normative Behavioral Requirements

### 2.1 Explicit Issue Claiming Protocol
1. **Never Start Work Unclaimed:** A contributor or AI agent MUST NOT write code or open a pull request without an assigned, claimed tracking issue.
2. **Deterministic Claim Comment:** To claim an issue, the contributor or agent must post:
   ```markdown
   /claim
   ```
   or be assigned by an issue triage maintainer.
3. **Claim Expiration & TTL:**
   - Active claims carry a **72-hour TTL** (time-to-live).
   - If no draft PR or progress comment is linked within 72 hours, the claim is automatically released.
4. **One Issue Per Agent:** An automated agent MUST NOT claim more than one uncompleted task simultaneously within a single repository.

### 2.2 Branch Naming Conventions
Work branches MUST follow the standard taxonomy:
- `feat/<issue-id>-<short-description>` (e.g. `feat/102-tool-slot-cycling`)
- `fix/<issue-id>-<short-description>` (e.g. `fix/205-double-click-shield`)
- `refactor/<issue-id>-<short-description>`
- `standards/<std-id>-<topic>` (for standards specifications)

### 2.3 Single-Concern Commits & Conventional Commit Messages
1. **Atomic Commits:** Each commit MUST address exactly one concern. Mixing bug fixes, UI restyling, and dependency bumps in a single commit is prohibited.
2. **Conventional Commits:** Messages MUST follow `<type>(<scope>): <imperative summary>`:
   ```text
   feat(toolbar): cycle multi-tool slot with Alt-click (STD-INPUT-001)
   fix(confine): reject NTFS directory junctions escaping root (STD-SHELL-003)
   ```
3. **Standard Citations:** Any commit that implements or refactors behavior governed by an ArtCraft standard MUST cite the standard ID in parentheses.

### 2.4 Pull Request Invariants
Every pull request MUST provide:
1. **Issue Reference:** `Closes #<id>` or `Fixes #<id>`.
2. **Standards Citation:** List of relevant `STD-XXX` standards satisfied.
3. **Evidence of Verification:** CLI test execution logs or before/after visual recordings for UI changes.
4. **Keep Rule Adherence:** If new tests are added, they must satisfy the three-line Keep Rule (`STD-LIB-005`).

---

## 3. Implementation Invariants (GitHub Actions / Bot Linter)

```yaml
# .github/workflows/pr-lint.yml
name: PR Lint
on: [pull_request]

jobs:
  validate-pr:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Verify Issue Reference & Standard Citation
        run: |
          if ! grep -qE "(Closes|Fixes) #[0-9]+" <<< "${{ github.event.pull_request.body }}"; then
            echo "Error: PR description must reference a tracking issue (Closes #123)."
            exit 1
          fi
```

---

## 4. Verification & Automated Testing

1. `test_branch_naming_regex`: CI workflow ensures branch names match `^(feat|fix|refactor|standards)\/[0-9]+-[a-z0-9-]+$`.
2. `test_commit_message_citations`: Hook or CI step verifying standard citations for changes to core crates.
3. `test_ttl_claim_expiry`: Scheduled automation that flags stale issue claims older than 72 hours without linked branches.
