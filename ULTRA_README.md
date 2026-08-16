# Caption Generator ULTRA

## Overview
Caption Generator ULTRA is the local AI transcription, text-based editing, and captioning suite for Adobe Premiere Pro and Adobe After Effects.

## Core Features

### Premiere Pro (ULTRA)
- **Local Whisper AI Transcription**: Embedded offline Whisper models (Tiny, Base, Small, Medium, Large-v3) with word-level timestamps.
- **Flexible Scope Control**: Transcribe the full active sequence ("All Clips") or only the clips currently selected in the timeline ("Selected Clips").
- **Text-Based Video Editing**: Ripple cut pauses, filler words, and highlighted word selections directly on the active Premiere sequence timeline.
- **Interactive Transcript Tools**: Real-time pause threshold slider, word search and replace, custom censorship, and click-to-playhead navigation.
- **Adobe Premiere Native Transcript Export**: Generates official static transcript format (`.json`) for review and playhead navigation in Premiere Pro's Text panel.
- **Captions & SRT Export**: In-panel subtitle editor with line metrics (CPL/CPS) and direct `.srt` file export.

### After Effects (ULTRA)
- **Local Whisper AI Transcription**: Embedded offline Whisper speech recognition for active compositions.
- **Composition Scope Control**: Transcribe Full Composition, Work Area, or Selected Layers (with selection caching and single-media fallback).
- **Captions Review & Text Layers**: In-panel cue review, typography customization (font size, color, stroke, alignment, position), and one-click creation of native text layers in your active comp.
- **SRT Export**: Export subtitle cues directly to standard `.srt` format.

---

## Applications & Side-by-Side Installation

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
