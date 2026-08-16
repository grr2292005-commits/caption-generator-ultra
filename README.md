# Caption Generator ULTRA

> **Local AI Transcription, Text-Based Editing, and Caption Generation Suite for Adobe Premiere Pro & After Effects**

Caption Generator ULTRA is an Adobe CEP extension suite that brings local offline AI speech-to-text transcription, interactive sequence editing, and synchronized caption generation directly to your Adobe timeline.

---

## Key Capabilities by Host Application

### Adobe Premiere Pro (ULTRA)
- **Local Offline Speech AI**:
  - Embedded offline Whisper speech models (Tiny, Base, Small, Medium, Large-v3) with word-level timestamps.
  - Media extraction via bundled local FFmpeg runtime with zero cloud dependencies and no recurring API costs.
- **Flexible Scope Control**:
  - **All Clips (Full Sequence)**: Transcribes the entire active sequence media range.
  - **Selected Clips**: Transcribes only the clip(s) currently selected in the Premiere timeline, mapping words with accurate sequence timeline offsets.
- **Interactive Transcript & Text-Based Video Editing**:
  - **Silent Pause Deletion**: Delete individual `[..]` pause markers or bulk delete all pauses exceeding your customizable threshold (e.g. `0.30s` to `1.50s`).
  - **Filler Word Deletion**: Highlight and ripple cut filler words (`um`, `uh`, `like`, `you know`, etc.).
  - **Word Range Ripple Cut**: Select any word sequence in the transcript and ripple delete the corresponding footage from the active timeline.
  - **Playhead Navigation**: Click any transcript word to position the sequence playhead at that exact timestamp.
  - **Find & Replace**: Search words with case-sensitivity and whole-word matching; replace single or all instances.
- **Captions & SRT Export**:
  - Subtitle cues editor with CPL (Characters Per Line) and CPS (Characters Per Second) metrics.
  - Direct `.srt` subtitle file export to Desktop.
- **Native Premiere Transcript Integration**:
  - Export static transcript `.json` formatted for Premiere Pro's native Text & Transcript panel.
  - *Note on Static Transcript Import:* Imported static JSON transcripts in Premiere Pro's native Text panel are designed for review and navigation. For reliable sequence ripple cuts, use ULTRA's built-in timeline editing tools.

---

### Adobe After Effects (ULTRA)
- **Local Offline Speech AI**:
  - Embedded Whisper speech recognition directly on active composition audio.
  - 100% private and offline execution.
- **Composition Scope Control**:
  - **Full Composition**: Transcribes the entire active comp duration.
  - **Work Area**: Transcribes within the defined composition work area start and duration.
  - **Selected Layers**: Transcribes selected timeline footage/AV layers with smart focus-loss selection caching and single-media layer fallback.
- **Captions Review & Text Layer Generation**:
  - Review, edit, split, and merge transcribed subtitle cues in the **Captions** tab.
  - Customize font size, color, stroke, text alignment (Left, Center, Right), and screen positioning (Top, Middle, Bottom).
  - One-click creation of native text layers directly in your active composition.
  - Export standard `.srt` subtitle files directly to Desktop.

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
