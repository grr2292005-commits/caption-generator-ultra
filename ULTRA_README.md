# Caption Generator ULTRA

## Overview
Caption Generator ULTRA is the local AI transcription, text-based editing, and captioning suite for Adobe Premiere Pro and Adobe After Effects.

---

## Core Capabilities by Host

### Premiere Pro (ULTRA)
- **Local Whisper Transcription**: Embedded offline Whisper models (Tiny, Base, Small, Medium, Large-v3) with word-level timestamps.
- **Scope Options**: Transcribe the full active sequence ("All Clips") or selected timeline clip(s) ("Selected Clips").
- **Interactive Transcript & Ripple Editing**: Interactive word chips, silence pause removal (`[..]`), filler word removal, highlighted text selection ripple cuts, and playhead sync.
- **Captions & SRT Export**: Full in-panel subtitle cue editor with CPL/CPS metrics and standard `.srt` export.
- **Static JSON Export**: Exports static transcript `.json` formatted for Premiere Pro's Text panel for review and navigation only (does not support Premiere native text-based ripple cuts).

### After Effects (ULTRA)
- **Local Whisper Transcription**: Embedded offline Whisper speech recognition for active compositions.
- **Scope Options**: Full Composition, Work Area, or Selected Layers (with focus snapshot caching and single-media fallback).
- **Captions & Timed Text Layers**: In-panel cue editor to review/edit subtitles, format typography (font size, color, stroke, alignment, position), and create basic timed text layers directly in your active comp.
- **SRT Export**: Export subtitle cues directly to `.srt` format.
- *Note:* Does not include text animation presets (pop, scale, bounce, karaoke).

---

## Installation Paths

### 1. Adobe Premiere Pro Extension
- **Source Directory**: `Premiere Pro/`
- **Install Path**: `%APPDATA%\Adobe\CEP\extensions\CaptionGeneratorUltra`
- **Bundle ID**: `com.captiongenerator.ultra`
- **Host App Menu**: **Window > Extensions > Caption Generator ULTRA**

### 2. Adobe After Effects Extension
- **Source Directory**: `After Effects/`
- **Install Path**: `%APPDATA%\Adobe\CEP\extensions\CaptionGeneratorUltraAE`
- **Bundle ID**: `com.captiongenerator.ultra.ae`
- **Host App Menu**: **Window > Extensions > Caption Generator ULTRA**
