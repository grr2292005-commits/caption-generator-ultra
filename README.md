# Caption Generator ULTRA

> **Local AI Text-Based Editing and Caption Generation Extension for Adobe Premiere Pro**

Caption Generator ULTRA is an Adobe CEP extension for Premiere Pro that brings local offline AI transcription, interactive text-based video editing, silent pause removal, filler word removal, and synchronized caption generation directly to your timeline.

---

## Key Capabilities

- **Local Offline Speech AI**:
  - Embedded offline Whisper transcription (Tiny, Base, Small, Medium, Large-v3) with word-level timestamps.
  - Sequence media extraction via bundled local FFmpeg runtime with zero cloud dependencies or recurring API costs.

- **Flexible Transcription Scope**:
  - **All Clips (Full Sequence)**: Transcribes the entire active sequence media range.
  - **Selected Clips (Timeline Selection)**: Transcribes only the clip(s) currently selected in the Premiere sequence timeline, mapping words with accurate sequence timeline offsets and time order.

- **Text-Based Sequence Ripple Cutting (inside ULTRA)**:
  - **Single Pause Deletion**: Click any `[..]` pause marker to ripple delete silence directly on the sequence timeline.
  - **Bulk Pause Deletion**: Delete all silent pauses above your customizable threshold (e.g. `0.30s` - `1.50s`) in one click.
  - **Filler Word Deletion**: Identify and cut filler words (`um`, `uh`, `like`, `you know`, etc.).
  - **Text Selection Ripple Cut**: Select any word range in the transcript and ripple cut the corresponding footage.
  - **Non-Destructive**: Fully compatible with Premiere Pro's native Undo (`Ctrl+Z` / `Cmd+Z`).

- **Interactive Transcript Tools**:
  - **Live Pause Precision**: Real-time slider to recalculate pause tokens without re-transcribing.
  - **Find & Replace**: Search words with case-sensitivity and whole-word matching; replace single or all instances.
  - **Custom Censorship**: Highlight and manage customized lists of censored words.
  - **Interactive Playhead Navigation**: Click any word to jump Premiere's playhead directly to that moment.

- **Captions & SRT Export**:
  - Subtitle cues formatting with CPL (Characters Per Line) and CPS (Characters Per Second) metrics.
  - Subtitle timing and text editor with direct `.srt` file export.

- **Premiere Pro Integration**:
  - Export static transcript `.json` formatted for Premiere Pro's native Text & Transcript panel.
  - *Note:* Imported static transcripts in Premiere Pro are designed for review and navigation. For reliable text-based ripple cuts on your sequence, use ULTRA's built-in timeline editing tools.

---

## Extension Structure

```
CaptionGeneratorUltra/
├── Premiere Pro/
│   ├── CSXS/
│   │   └── manifest.xml         # Extension manifest (com.captiongenerator.ultra)
│   ├── client/                  # CEP Panel UI (HTML/CSS/JS)
│   │   ├── index.html
│   │   ├── css/
│   │   └── js/
│   ├── host/
│   │   └── index.jsx            # ExtendScript Premiere Pro host engine & QE ripple cutting
│   └── backend/
│       └── engine.py            # Local Whisper AI transcription and silence analysis
└── README.md
```

---

## Installation

1. Copy the `Premiere Pro/` folder to your Adobe CEP extensions directory:
   - **Windows**: `%APPDATA%\Adobe\CEP\extensions\CaptionGeneratorUltra`
   - **macOS**: `~/Library/Application Support/Adobe/CEP/extensions/CaptionGeneratorUltra`

2. Enable PlayerDebugMode in CEP:
   - **Windows (Registry)**: Set `PlayerDebugMode` to `1` in `HKEY_CURRENT_USER\Software\Adobe\CSXS.11` (or your version).
   - **macOS (Terminal)**: `defaults write com.adobe.CSXS.11 PlayerDebugMode 1`

3. Restart Premiere Pro and open the panel from **Window > Extensions > Caption Generator ULTRA**.

---

## License

All rights reserved.
