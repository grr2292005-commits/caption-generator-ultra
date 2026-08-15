# Caption Generator ULTRA

## Overview
Caption Generator ULTRA is the local AI text-based editing and captioning suite for Adobe Premiere Pro and Adobe After Effects.

## Core Features
- **Local Whisper AI Transcription**: Embedded, fully offline Whisper speech-to-text models (Tiny, Base, Small, Medium, Large-v3) with word-level timestamps.
- **Flexible Scope Control (Premiere)**: Transcribe the full active sequence ("All Clips") or only the clips currently selected in the timeline ("Selected Clips").
- **Text-Based Video Editing (Premiere)**: Ripple cut pauses, filler words, and highlighted text selections directly on the active Premiere sequence.
- **After Effects Text Animation & Subtitles**: Generate text layers directly in active comp or pre-comp, with keyframe preset alignment and layout tools.
- **Adobe Premiere Native Integration**: Generates official Adobe Static Transcript format (`.json`) for review and playhead navigation in Premiere Pro's Text panel.
- **Caption Generation & SRT Export**: In-panel subtitle editor with line metrics (CPL/CPS) and `.srt` file export.
- **No External Cloud Dependencies**: 100% local Python and FFmpeg runtime with zero subscription or API requirements.

## Applications & Installation Paths

### 1. Adobe Premiere Pro Extension
- Source Directory: `Premiere Pro/`
- Install Path: `%APPDATA%\Adobe\CEP\extensions\CaptionGeneratorUltra`
- Bundle ID: `com.captiongenerator.ultra`
- Menu: **Window > Extensions > Caption Generator ULTRA**

### 2. Adobe After Effects Extension
- Source Directory: `After Effects/`
- Install Path: `%APPDATA%\Adobe\CEP\extensions\CaptionGeneratorUltraAE`
- Bundle ID: `com.captiongenerator.ultra.ae`
- Menu: **Window > Extensions > Caption Generator ULTRA**
