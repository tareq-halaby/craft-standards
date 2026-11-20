---
id: STD-LIB-005
title: Invariant Testing, The Keep Rule & Hostile Input Sweeps
category: unified-libs
status: active
canonical_crate: craft-libs::craft-testkit
wiki_reference: https://craft.wiki/contributing/testing/
affected_apps: [all]
---

# STD-LIB-005: Invariant Testing, The Keep Rule & Hostile Input Sweeps

## 1. Abstract

High-assurance creative tools and automated agent pipelines require strict testing disciplines. As codified in Storytold `RFC-0071` and `craft-contrib/standards/testing.md`, testing must guard concrete behavioral invariants rather than superficial code coverage percentages. Code changes frequently introduce subtle ergonomic regressions or panics when encountering hostile, truncated, or corrupt media inputs.

This standard codifies the normative requirements for the **Keep Rule**, quarantine lifecycles, and automated hostile mutation sweeps across all ArtCraft crates via `craft-libs::craft-testkit`.

---

## 2. Normative Behavioral Requirements

### 2.1 The Keep Rule (Three-Line Invariant Test)
Every unit, integration, or regression test in an ArtCraft codebase MUST satisfy all three criteria of the Keep Rule:
1. **Invariant:** States what behavioral contract the test guards in a single concise sentence.
2. **Plausible Breaking Change:** Identifies an accidental, realistic code mutation (e.g. dropped branch, off-by-one, inverted modifier, changed default) that would cause this test to fail.
3. **Only This Test:** Confirms that no other existing test or shared suite assertion would catch that breaking change.

Any test that cannot justify all three requirements MUST NOT be added, and existing redundant tests SHOULD be pruned.

### 2.2 Quarantine & Failure Rules
1. A contributor or AI agent MUST NOT delete, weaken, ignore, or bypass a test to make CI pass.
2. A test that fails consistently MUST NOT be quarantined: the underlying code bug or invalid test expectation MUST be resolved.
3. A test identified as non-deterministic (flaky) MAY only be quarantined using `#[ignore = "flaky: #<issue>"]` in an isolated pull request that references an open tracking issue.

### 2.3 Hostile Input & Zero-Panic Guarantee
Parsers, image decoders, project file loaders, and CLI/MCP command handlers MUST NEVER panic (`panic!`, `unwrap()`, or `expect()`) on malformed inputs:
- Every crate handling external files (images, audio, vector SVG, documents) MUST maintain an automated hostile mutation sweep (`craft_testkit::hostile::hammer`).
- Sweeps MUST exercise random bit-flips, byte truncations, corrupted header sizes, and extreme boundary coordinates.
- Parsers MUST return clean `Result::Err(...)` and maintain system stability.

---

## 3. Implementation Invariants (Rust / craft-testkit)

```rust
#[cfg(test)]
mod tests {
    use craft_testkit::hostile;

    /// Invariant: Document parser returns Err and never panics on corrupted file bytes.
    /// Breaking Change: Removing bounds check before reading slice length.
    /// Only This Test: No other test feeds truncated byte streams into this loader.
    #[test]
    fn document_loader_never_panics_on_corrupt_inputs() {
        let sample_bytes = include_bytes!("../fixtures/valid_document.craft");
        
        // Exercise 1,000 randomized hostile mutations
        let results = hostile::hammer(sample_bytes, 1000, |corrupted| {
            // Must return Err or Ok, but MUST NOT panic
            let _ = std::panic::catch_unwind(|| {
                crate::loader::parse_document(corrupted)
            }).expect("Hostile input caused a panic in document parser!");
        });

        assert_eq!(results.panics, 0);
    }
}
```

---

## 4. Verification & Automated Testing

Every pull request across the ArtCraft ecosystem MUST pass:
1. `cargo test --workspace`: Zero failures across all suites.
2. `cargo xtask audit`: Validates that no unlinked `#[ignore]` attributes exist without a corresponding GitHub issue reference.
3. Hostile fuzzing sweeps under `craft-testkit` reporting 0 panics across $\ge 1,000$ iterations per codec.
