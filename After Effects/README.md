# Caption Generator ULTRA - After Effects Extension Panel

**Caption Generator ULTRA (AE)** is a local offline AI transcription and caption layer creation extension for **Adobe After Effects**. It automates speech transcription, transcript navigation, and timed text layer creation directly inside your active composition.

---

## Key Capabilities for After Effects

- **Active Composition AI Audio Extractor**:
  - Automatically scans active composition audio and video layers with zero cloud dependencies.
  - Supports **Full Composition**, **Work Area**, and **Selected Layers** transcription scopes.
- **Interactive Transcript & Navigation**:
  - Word-level timestamps and interactive pause tokens `[..]`.
  - Click any word or pause marker to jump the After Effects composition playhead to that exact frame.
  - Find & Replace tools and filter pills (Fillers, Censored, Pauses).
  - Minimum pause length threshold slider ($0.05\text{s} - 2.00\text{s}$).
- **Timed Text Layer Creation**:
  - Creates readable, precisely timed text layers (`CGP_Caption_001`, `CGP_Caption_002`...) matching cue start and end times.
  - Basic appearance controls: Font size, text color, vertical position (Top, Center, Bottom), horizontal alignment (Left, Center, Right).
  - Configurable words-per-layer: Standard Phrase/Cue, 1 Word Per Layer, 2 Words Per Layer.
  - Direct comp text layers or isolated pre-comp subtitle layer creation.
- **Shared Speech Models Cache**:
  - Shares downloaded Whisper models (`tiny`, `base`, `small`, `medium`, `large-v3`) with the Premiere Pro extension via `%USERPROFILE%/.cache/whisper`.
- **In-Panel Subtitle Cue Editor**:
  - Review subtitle cues, edit text inline, adjust In/Out timecodes, and export `.srt` files.

---

## Installation

1. Copy the `After Effects/` directory to:
   - **Windows**: `%APPDATA%\Adobe\CEP\extensions\CaptionGeneratorUltraAE`
   - **macOS**: `~/Library/Application Support/Adobe/CEP/extensions/CaptionGeneratorUltraAE`
2. Launch **Adobe After Effects**.
3. Open **Window > Extensions > Caption Generator ULTRA**.
