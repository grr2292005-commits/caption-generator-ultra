# Caption Generator ULTRA

> **Local AI Transcription, Text-Based Editing, and Caption Generation Suite for Adobe Premiere Pro & After Effects**

Caption Generator ULTRA is an Adobe CEP extension suite providing private, offline AI speech recognition, interactive text-based sequence editing, and synchronized caption creation directly inside Adobe Premiere Pro and Adobe After Effects.

---

## Key Capabilities by Host Application

### Adobe Premiere Pro (ULTRA)
- **Local Whisper AI Transcription**:
  - Embedded offline Whisper speech models (Tiny, Base, Small, Medium, Large-v3) with word-level timestamps.
  - Local audio extraction via bundled FFmpeg runtime with zero cloud dependencies or recurring API costs.
- **Transcription Scope**:
  - **All Clips**: Transcribes the entire active sequence media timeline.
  - **Selected Clips**: Transcribes only the clip(s) currently selected in the Premiere sequence timeline, preserving sequence time offsets.
- **Interactive Transcript & Text-Based Video Editing**:
  - **Silent Pause Deletion**: Delete individual `[..]` pause markers or bulk ripple delete all pauses exceeding your customizable threshold (e.g. `0.30s` to `1.50s`).
  - **Filler Word Deletion**: Highlight and ripple cut filler words (`um`, `uh`, `like`, `you know`, etc.).
  - **Word Range Ripple Cut**: Select any word sequence in the transcript and ripple cut the corresponding footage from the active timeline.
  - **Playhead Navigation**: Click any transcript word to position the sequence playhead at that exact timestamp.
  - **Find & Replace**: Search words with case-sensitivity and whole-word matching; replace single or all instances.
- **Captions & SRT Export**:
  - Subtitle cues editor with line metrics: CPL (Characters Per Line) and CPS (Characters Per Second).
  - Direct `.srt` subtitle file export to Desktop.
- **Static Premiere JSON Transcript Export**:
  - Exports static transcript `.json` formatted for Premiere Pro's native Text & Transcript panel.
  - *Important Notice:* Exported static transcripts imported into Premiere Pro's native Text panel are strictly for review and playhead navigation. Native text-based video editing (cutting timeline clips via text selection) is not supported by Premiere for static transcripts; all text-based ripple cuts must be performed using ULTRA's built-in editing tools.

---

### Adobe After Effects (ULTRA)
- **Local Whisper AI Transcription**:
  - Embedded offline Whisper speech recognition running directly on active composition audio.
  - 100% private and offline execution.
- **Composition Scope Control**:
  - **Full Composition**: Transcribes the full active composition duration.
  - **Work Area**: Transcribes within the defined composition work area range.
  - **Selected Layers**: Transcribes selected timeline footage/AV layers, featuring focus-loss snapshot caching and single-media layer fallback.
- **Captions Review & Timed Text Layers**:
  - In-panel subtitle cue editor to review, edit, split, and merge transcribed cues.
  - Customize basic text formatting: font size, text color, stroke, alignment (Left, Center, Right), and screen placement (Top, Middle, Bottom).
  - One-click creation of basic timed text layers directly in your active composition.
  - Direct `.srt` subtitle file export to Desktop.
- *Note:* AE ULTRA creates basic timed text layers in the composition and does not include text animation presets (such as pop, scale, bounce, or karaoke animation effects).

---

## Extension Structure

```
CaptionGeneratorUltra/
├── Premiere Pro/
│   ├── CSXS/
│   │   └── manifest.xml         # Premiere extension manifest (com.captiongenerator.ultra)
│   ├── client/                  # CEP Panel UI (HTML/CSS/JS)
│   ├── host/                    # ExtendScript Premiere host engine
│   └── backend/                 # Local Whisper AI transcription engine
├── After Effects/
│   ├── CSXS/
│   │   └── manifest.xml         # After Effects extension manifest (com.captiongenerator.ultra.ae)
│   ├── client/                  # CEP Panel UI (HTML/CSS/JS)
│   ├── host/                    # ExtendScript After Effects host engine
│   └── backend/                 # Local Whisper AI transcription engine
├── ULTRA_README.md
└── README.md
```

---

## Side-by-Side Installation

Both extensions install side-by-side without conflicts:

### 1. Premiere Pro Extension
Copy `Premiere Pro/` contents to:
- **Windows**: `%APPDATA%\Adobe\CEP\extensions\CaptionGeneratorUltra`
- **macOS**: `~/Library/Application Support/Adobe/CEP/extensions/CaptionGeneratorUltra`

### 2. After Effects Extension
Copy `After Effects/` contents to:
- **Windows**: `%APPDATA%\Adobe\CEP\extensions\CaptionGeneratorUltraAE`
- **macOS**: `~/Library/Application Support/Adobe/CEP/extensions/CaptionGeneratorUltraAE`

### 3. Enable Debug Mode in CEP
- **Windows (Registry)**: Set `PlayerDebugMode` to `1` in `HKEY_CURRENT_USER\Software\Adobe\CSXS.11` (or your version).
- **macOS (Terminal)**: `defaults write com.adobe.CSXS.11 PlayerDebugMode 1`

### 4. Open in Host Applications
- **Premiere Pro**: **Window > Extensions > Caption Generator ULTRA**
- **After Effects**: **Window > Extensions > Caption Generator ULTRA**

---

## License

All rights reserved.
