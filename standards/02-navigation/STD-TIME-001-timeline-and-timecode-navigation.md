---
id: STD-TIME-001
title: Timeline Navigation, JKL Scrubbing, and Timecode Invariants
category: navigation
status: active
canonical_crate: craft-libs::craft-ui
wiki_reference: https://craft.wiki/apps/anicraft/the-timeline/
affected_apps: [filmcraft, effectcraft, anicraft, soundcraft]
---

# STD-TIME-001: Timeline Navigation, JKL Scrubbing, and Timecode Invariants

## 1. Abstract
As documented on [Craft Wiki: The Timeline](https://craft.wiki/apps/anicraft/the-timeline/), video, motion graphics, and audio suites share fundamental temporal playback conventions. This standard defines universal keyboard scrubbing chords, frame stepping, and SMPTE timecode formatting across `FilmCraft`, `EffectCraft`, `AniCraft`, and `SoundCraft`.

---

## 2. Normative Behavioral Requirements

### 2.1 The Universal JKL Playback Chords
* **`L` (Play Forward / Speed Up):**
  * Press once: Play forward at $1\times$ real-time speed.
  * Press repeatedly: Doubles forward playback speed ($2\times, 4\times, 8\times, 16\times$).
* **`J` (Play Backward / Reverse Speed Up):**
  * Press once: Play in reverse at $1\times$ speed.
  * Press repeatedly: Doubles reverse playback speed ($2\times, 4\times, 8\times, 16\times$).
* **`K` (Stop / Pause):**
  * Stops playback instantly and parks the playhead at the current frame/sample.
* **`K + L` (Slow-Motion Forward):** Plays forward at $0.5\times$ slow-motion speed while held.
* **`K + J` (Slow-Motion Backward):** Plays in reverse at $0.5\times$ slow-motion speed while held.

### 2.2 Frame Stepping Invariants
* **Left Arrow / Right Arrow:** Steps the playhead backward / forward by exactly **1 frame**.
* **`Shift` + Left Arrow / Right Arrow:** Steps the playhead by **10 frames** (or 1 second depending on user preferences).
* **`Home` / `End`:** Jumps playhead to the In-Point (start of timeline/work area) / Out-Point (end of timeline).

### 2.3 Timecode Formatting & Parsing
* Timecode display follows standard SMPTE non-drop frame / drop frame format:
  $$\text{HH}:\text{MM}:\text{SS}:\text{FF}$$
  *(Hours : Minutes : Seconds : Frames)*
* Applications must support direct numeric entry (e.g. typing `1200` in the timecode field jumps playhead to `00:00:12:00`).
