# Caption Generator ULTRA

> **Local AI Text-Based Editing and Caption Generation Extension for Adobe Premiere Pro**

Caption Generator ULTRA is an Adobe CEP extension for Premiere Pro that brings lightning-fast offline AI transcription, interactive text-based video editing, silent pause removal, filler word removal, and stylized caption generation directly to your timeline.

---

## Features

- **Interactive Transcript Editor**:
  - Offline local Whisper AI transcription with word-level timestamps.
  - Active sequence detection and real-time playhead tracking.
  - Natural paragraph grouping and speaker separation.

- **Text-Based Sequence Ripple Cutting**:
  - **Single Pause Removal**: Click any `[..]` pause marker to ripple delete pauses directly on the sequence timeline.
  - **Bulk Pause Deletion**: Delete all silent pauses above your customizable threshold (e.g. `0.50s`) in one click.
  - **Filler Word Deletion**: Automatically identify and cut filler words (`um`, `uh`, `like`, `you know`, etc.).
  - **Text Selection Ripple Cut**: Select words in the transcript and ripple cut the corresponding footage.
  - **Non-Destructive & Safe**: Fully compatible with Premiere Pro's native Undo (`Ctrl+Z` / `Cmd+Z`).

- **Transcript Tools**:
  - **Find & Replace**: Search words with case-sensitivity and whole-word matching; replace single or all instances in transcript and captions.
  - **Custom Censorship**: Highlight and manage customized lists of censored words.
  - **Adjustable Pause Precision**: Live slider to recalculate pause tokens without re-transcription.

- **Captioning & Export**:
  - Synchronized subtitle editor with CPL and CPS line metrics.
  - Export to Adobe Premiere Pro Text Panel format (`.json`), SRT (`.srt`), and Plain Text (`.txt`).

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
│   └── host/
│       └── index.jsx            # ExtendScript Premiere Pro host engine & QE ripple delete
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
