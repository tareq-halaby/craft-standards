# Contributing to ArtCraft Standards

Thank you for contributing to the ArtCraft standards repository. This repository defines cross-app invariants, agent rulebooks, and unified library contracts for the ArtCraft suite.

## The Standards Lifecycle

```
Draft ──► Review (RFC Process) ──► Active ──► Upstream to craft-libs
```

1. **Authoring a Standard:**
   - Copy `rfcs/0000-template.md` into `standards/<category>/STD-<CATEGORY>-<NUM>-<slug>.md`.
   - Ensure the YAML frontmatter includes: `id`, `title`, `category`, `status: draft`, `canonical_crate`, `affected_apps`.
2. **Auditing Standards:**
   - Run `cargo run --manifest-path xtask/Cargo.toml -- audit` locally.
   - All standards must pass audit before opening a PR.
3. **Upstreaming to `craft-libs`:**
   - When a standard specifies a reusable UI component or system contract, an accompanying PR should be opened in `storytold/craft-libs` implementing the canonical primitive.
