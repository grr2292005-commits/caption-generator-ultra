# Caption Generator ULTRA - Multicam Audio Architecture Plan

> **Scope**: Premiere Pro ULTRA only (Phase 1).  
> **Exclusions**: Caption Generator Pro is untouched. After Effects ULTRA is deferred to a future phase.

---

## 1. Overview
The upcoming Multicam Audio feature for **Caption Generator ULTRA (Premiere Pro)** enables intelligent speech transcription and text-based ripple editing across complex multi-camera and multi-track sequence setups.

---

## 2. Core Pillars

### A. Premiere-First Audio Multicam
- **Multi-Track Audio Extraction**: Support sequence transcription with multiple active audio tracks (e.g. Host on A1, Guest 1 on A2, Guest 2 on A3).
- **Targeted Track/Channel Selection**: Allow users to transcribe combined sequence mixdown or target specific speaker audio tracks.
- **Multicam Sequence Ripple Editing**: Ensure text-based ripple deletions (`[..]` pauses, filler words, and text selections) correctly cut and ripple all synchronized video and audio tracks in the active multicam sequence without causing sync drift.

### B. Strict Product Isolation (Caption Generator Pro Untouched)
- **Zero Modifications to Pro**: Caption Generator Pro (`Premiere Pro/` and `After Effects/`) remains strictly untouched and locked on its stable release.
- **No Shared Code Contamination**: All multicam logic, UI components, and ExtendScript helper methods will reside exclusively inside `CaptionGeneratorUltra/Premiere Pro/`.

### C. Host Scope Limitation
- **Premiere Pro ULTRA Focus**: All phase 1 design, implementation, and testing will target Premiere Pro's timeline and multicam architecture.
- **After Effects ULTRA Excluded**: After Effects does not use multicam editing paradigms and is excluded from this phase.

---

## 3. Implementation Workflow

1. **Host ExtendScript (`host/index.jsx`)**:
   - Inspect active sequence for multicam / multi-track audio configuration.
   - Extract multi-track or mixed audio safely to WAV for Whisper processing.
   - Execute synchronized multi-track ripple cuts across all active video & audio tracks.
2. **Backend Engine (`backend/engine.py`)**:
   - Transcribe sequence audio with accurate word-level timestamps.
3. **Client UI (`client/js/main.js` & `client/index.html`)**:
   - Provide clean track selection / multicam scope options in the Transcript tab.
   - Synchronize playhead navigation and ripple cuts seamlessly.
