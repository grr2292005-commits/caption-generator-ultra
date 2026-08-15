// Caption Generator ULTRA - Host Script
if (typeof $._PPP_ === "undefined") {
    $._PPP_ = {};
}

function parseJsonSafe(str) {
    if (!str || typeof str !== "string") return null;
    var trimmed = str.replace(/^\s+|\s+$/g, "");
    if (trimmed.length === 0) return null;

    if (typeof JSON !== "undefined" && JSON && typeof JSON.parse === "function") {
        try {
            return JSON.parse(trimmed);
        } catch(eJson) {}
    }

    var rx_one = /^[\],:{}\s]*$/;
    var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
    var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
    var rx_four = /(?:^|:|,)(?:\s*\[)+/g;

    var sanitized = trimmed
        .replace(rx_two, "@")
        .replace(rx_three, "]")
        .replace(rx_four, "");

    if (rx_one.test(sanitized)) {
        try {
            return eval("(" + trimmed + ")");
        } catch(eEval) {
            return null;
        }
    }
    return null;
}

$._PPP_.testConnection = function() {
    return "OK|Host ready";
};

$._PPP_.getProjectDetails = function() {
    try {
        var name = "UntitledProject";
        var path = "";
        if (app && app.project) {
            if (app.project.path && app.project.path.length > 0) {
                var f = new File(app.project.path);
                path = f.parent.fsName.replace(/\\/g, "/");
                name = f.name.replace(/\.[^\.]+$/, "");
            } else if (app.project.file) {
                path = app.project.file.parent.fsName.replace(/\\/g, "/");
                name = app.project.file.name.replace(/\.[^\.]+$/, "");
            }
        }
        return "OK|" + name + "|" + path;
    } catch (e) {
        return "OK|UntitledProject|";
    }
};

$._PPP_.setPlayhead = function(seconds) {
    try {
        if (!app || !app.project || !app.project.activeSequence) {
            return "ERR|No active sequence";
        }
        var seq = app.project.activeSequence;
        var sec = parseFloat(seconds);
        if (isNaN(sec) || sec < 0) sec = 0;
        var ticks = String(Math.round(sec * 254016000000));
        seq.setPlayerPosition(ticks);
        return "OK|" + sec;
    } catch (e) {
        return "ERR|" + e.toString();
    }
};

$._PPP_.getPlayhead = function() {
    try {
        if (!app || !app.project || !app.project.activeSequence) {
            return "ERR|No active sequence";
        }
        var seq = app.project.activeSequence;
        var pos = seq.getPlayerPosition();
        var sec = 0;
        if (pos && pos.seconds) {
            sec = parseFloat(pos.seconds);
        } else if (pos && !isNaN(pos)) {
            sec = parseFloat(pos) / 254016000000;
        }
        return "OK|" + sec.toFixed(3);
    } catch (e) {
        return "ERR|" + e.toString();
    }
};

$._PPP_.rippleDeleteRanges = function(rangesJson) {
    try {
        if (!app || !app.project) {
            return "ERR|No project is currently open in Premiere Pro.";
        }
        if (!app.project.activeSequence) {
            return "ERR|No active sequence selected in Premiere Pro. Please click on your timeline sequence.";
        }
        var seq = app.project.activeSequence;

        // Check for locked tracks with exact track names
        var vTracks = seq.videoTracks;
        var aTracks = seq.audioTracks;
        if (vTracks) {
            for (var v = 0; v < vTracks.numTracks; v++) {
                if (vTracks[v].isLocked && vTracks[v].isLocked()) {
                    return "ERR|Video Track " + (v + 1) + " ('" + (vTracks[v].name || ("V" + (v + 1))) + "') is locked. Please unlock all tracks before ripple editing.";
                }
            }
        }
        if (aTracks) {
            for (var a = 0; a < aTracks.numTracks; a++) {
                if (aTracks[a].isLocked && aTracks[a].isLocked()) {
                    return "ERR|Audio Track " + (a + 1) + " ('" + (aTracks[a].name || ("A" + (a + 1))) + "') is locked. Please unlock all tracks before ripple editing.";
                }
            }
        }

        var rawList = parseJsonSafe(rangesJson);
        if (!rawList || !(rawList instanceof Array)) {
            return "ERR|Failed to parse cut ranges payload. Expected a valid JSON array.";
        }

        if (rawList.length === 0) {
            return "ERR|No cut ranges provided for timeline ripple edit.";
        }

        // Calculate sequence FPS for timecode conversions
        var fps = 29.97;
        try {
            if (seq.timebase) {
                var tb = parseFloat(seq.timebase);
                if (tb > 0) fps = 254016000000 / tb;
            }
        } catch (eFps) {}

        function secToTC(seconds) {
            var totalFrames = Math.max(0, Math.floor(seconds * fps));
            var f = totalFrames % Math.round(fps);
            var totalSecs = Math.floor(seconds);
            var s = totalSecs % 60;
            var totalMins = Math.floor(totalSecs / 60);
            var m = totalMins % 60;
            var h = Math.floor(totalMins / 60);

            function pad(n) { return (n < 10 ? "0" : "") + n; }
            return pad(h) + ":" + pad(m) + ":" + pad(s) + ":" + pad(f);
        }

        // Filter and clean ranges (skip ranges < 1 frame)
        var minDur = 1.0 / fps;
        var validRanges = [];
        var totalSec = 0;

        for (var i = 0; i < rawList.length; i++) {
            var item = rawList[i];
            var s = parseFloat(item.start);
            var e = parseFloat(item.end);
            if (!isNaN(s) && !isNaN(e) && (e - s) >= minDur) {
                validRanges.push({ start: s, end: e, dur: (e - s) });
                totalSec += (e - s);
            }
        }

        if (validRanges.length === 0) {
            return "ERR|All requested cut ranges were smaller than 1 video frame (" + (minDur * 1000).toFixed(1) + "ms).";
        }

        // Sort descending (latest timestamp to earliest timestamp)
        validRanges.sort(function(a, b) {
            return b.start - a.start;
        });

        // Initialize QE DOM
        var qeAvailable = false;
        var qeSeq = null;
        try {
            if (typeof app.enableQE === "function") {
                app.enableQE();
            }
            if (typeof qe !== "undefined" && qe.project) {
                qeAvailable = true;
                qeSeq = qe.project.getActiveSequence();
            }
        } catch (eInitQE) {
            qeAvailable = false;
        }

        var cutCount = 0;
        var diagnosticErrors = [];

        for (var k = 0; k < validRanges.length; k++) {
            var rng = validRanges[k];
            var cutStart = rng.start;
            var cutEnd = rng.end;
            var inTicks = String(Math.round(cutStart * 254016000000));
            var outTicks = String(Math.round(cutEnd * 254016000000));
            var tcIn = secToTC(cutStart);
            var tcOut = secToTC(cutEnd);

            var cutExecuted = false;

            // Strategy A: In/Out Extraction via QE Sequence
            if (qeSeq) {
                // Set In Point on both standard and QE
                try { seq.setInPoint(cutStart); } catch(eInA) {}
                try { seq.setInPoint(inTicks); } catch(eInB) {}
                try { qeSeq.setInPoint(tcIn); } catch(eInC) {}
                try { qeSeq.setInPoint(cutStart); } catch(eInD) {}

                // Set Out Point on both standard and QE
                try { seq.setOutPoint(cutEnd); } catch(eOutA) {}
                try { seq.setOutPoint(outTicks); } catch(eOutB) {}
                try { qeSeq.setOutPoint(tcOut); } catch(eOutC) {}
                try { qeSeq.setOutPoint(cutEnd); } catch(eOutD) {}

                // Try A1: qeSeq.extract()
                if (typeof qeSeq.extract === "function") {
                    try {
                        qeSeq.extract();
                        cutExecuted = true;
                    } catch (eExt) {
                        diagnosticErrors.push("A1 (extract): " + eExt.toString());
                    }
                }

                // Try A2: qeSeq.rippleDelete(true)
                if (!cutExecuted && typeof qeSeq.rippleDelete === "function") {
                    try {
                        qeSeq.rippleDelete(true);
                        cutExecuted = true;
                    } catch (eRD1) {
                        try {
                            qeSeq.rippleDelete();
                            cutExecuted = true;
                        } catch (eRD2) {
                            diagnosticErrors.push("A2 (rippleDelete): " + eRD2.toString());
                        }
                    }
                }
            }

            // Strategy B: Razor at Start and End on all tracks, then ripple delete
            if (!cutExecuted && qeSeq) {
                try {
                    // Razor video tracks
                    var numV = qeSeq.numVideoTracks || (seq.videoTracks ? seq.videoTracks.numTracks : 0);
                    for (var vt = 0; vt < numV; vt++) {
                        try {
                            var vTrk = qeSeq.getVideoTrackAt(vt);
                            if (vTrk && typeof vTrk.razor === "function") {
                                vTrk.razor(tcIn);
                                vTrk.razor(tcOut);
                            }
                        } catch (eRazV) {}
                    }

                    // Razor audio tracks
                    var numA = qeSeq.numAudioTracks || (seq.audioTracks ? seq.audioTracks.numTracks : 0);
                    for (var at = 0; at < numA; at++) {
                        try {
                            var aTrk = qeSeq.getAudioTrackAt(at);
                            if (aTrk && typeof aTrk.razor === "function") {
                                aTrk.razor(tcIn);
                                aTrk.razor(tcOut);
                            }
                        } catch (eRazA) {}
                    }

                    // Perform extract after razor
                    if (typeof qeSeq.extract === "function") {
                        qeSeq.extract();
                        cutExecuted = true;
                    } else if (typeof qeSeq.rippleDelete === "function") {
                        qeSeq.rippleDelete(true);
                        cutExecuted = true;
                    }
                } catch (eStratB) {
                    diagnosticErrors.push("Strategy B (razor+extract): " + eStratB.toString());
                }
            }

            // Strategy C: Native Premiere Pro sequence ripple/extract if available in DOM
            if (!cutExecuted) {
                try {
                    if (typeof seq.extract === "function") {
                        seq.extract();
                        cutExecuted = true;
                    } else if (typeof seq.rippleDelete === "function") {
                        seq.rippleDelete();
                        cutExecuted = true;
                    }
                } catch (eStratC) {
                    diagnosticErrors.push("Strategy C (seq.extract): " + eStratC.toString());
                }
            }

            if (cutExecuted) {
                cutCount++;
            }
        }

        // Clear In/Out markers
        try {
            if (typeof seq.clearInPoint === "function") seq.clearInPoint();
            if (typeof seq.clearOutPoint === "function") seq.clearOutPoint();
        } catch (eClear) {}

        if (cutCount === 0) {
            var diag = diagnosticErrors.length > 0 ? ("\n\nTechnical details:\n" + diagnosticErrors.join("\n")) : "";
            if (!qeAvailable) {
                return "ERR|QE DOM could not be enabled in this Premiere Pro version." + diag;
            }
            return "ERR|Timeline ripple edit failed to execute across all fallback methods." + diag;
        }

        return "OK|" + cutCount + "|" + totalSec.toFixed(2);
    } catch (eGlobal) {
        return "ERR|Host rippleDeleteRanges uncaught error: " + eGlobal.toString();
    }
};

$._PPP_.getActiveSequenceInfo = function() {
    try {
        if (!app || !app.project) {
            return "ERR|No project open";
        }
        var seq = app.project.activeSequence;
        if (!seq && app.project.sequences && app.project.sequences.numSequences > 0) {
            seq = app.project.sequences[0];
        }
        if (!seq) {
            return "ERR|No active sequence";
        }

        var seqName = seq.name || "Untitled Sequence";
        var seqId = seq.sequenceID || seq.id || "";
        var endTicks = seq.end || 0;
        var durationSeconds = 0;
        if (endTicks && endTicks.seconds) {
            durationSeconds = parseFloat(endTicks.seconds);
        }

        var seenKeys = {};
        var clipCount = 0;

        function scanTracksForUniqueClips(tracks) {
            if (!tracks) return;
            var numTracks = tracks.numTracks;
            for (var t = 0; t < numTracks; t++) {
                var track = tracks[t];
                if (!track || !track.clips) continue;
                var numItems = track.clips.numItems;
                for (var c = 0; c < numItems; c++) {
                    var item = track.clips[c];
                    if (!item || !item.projectItem) continue;
                    var mp = item.projectItem.getMediaPath ? item.projectItem.getMediaPath() : "";
                    var startSec = item.start ? parseFloat(item.start.seconds) : 0;
                    
                    var key = mp + "_" + startSec.toFixed(2);
                    if (!seenKeys[key] && mp && mp.length > 0) {
                        seenKeys[key] = true;
                        clipCount++;
                    }
                }
            }
        }

        scanTracksForUniqueClips(seq.audioTracks);
        if (clipCount === 0) {
            scanTracksForUniqueClips(seq.videoTracks);
        }

        return "OK|" + seqName + "|" + durationSeconds.toFixed(2) + "|" + clipCount + "|" + seqId;
    } catch (e) {
        return "ERR|" + e.toString();
    }
};

function stringifyJson(obj) {
    if (typeof obj === "string") return '"' + obj.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r") + '"';
    if (typeof obj === "number" || typeof obj === "boolean") return String(obj);
    if (obj instanceof Array) {
        var arrStr = [];
        for (var a = 0; a < obj.length; a++) arrStr.push(stringifyJson(obj[a]));
        return "[" + arrStr.join(",") + "]";
    }
    if (typeof obj === "object" && obj !== null) {
        var objStr = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                objStr.push('"' + key + '":' + stringifyJson(obj[key]));
            }
        }
        return "{" + objStr.join(",") + "}";
    }
    return "null";
}

function isTrackItemSelected(item) {
    if (!item) return false;
    try {
        if (typeof item.isSelected === "function") {
            return item.isSelected() === true;
        } else if (typeof item.isSelected === "boolean") {
            return item.isSelected === true;
        } else if (typeof item.selected === "boolean") {
            return item.selected === true;
        }
    } catch(eSel) {}
    return false;
}

$._PPP_.getSelectedClipsInfo = function() {
    try {
        var seq = null;
        if (app && app.project) {
            if (app.project.activeSequence) {
                seq = app.project.activeSequence;
            } else if (app.project.sequences && app.project.sequences.numSequences > 0) {
                seq = app.project.sequences[0];
            }
        }

        if (!seq) {
            return "ERR|No active sequence found.";
        }

        var selectedClips = [];
        var seenMediaMap = {};

        function scanTrackForSelection(tracks, typePrefix) {
            if (!tracks) return;
            for (var t = 0; t < tracks.numTracks; t++) {
                var track = tracks[t];
                if (!track || !track.clips) continue;
                for (var c = 0; c < track.clips.numItems; c++) {
                    var item = track.clips[c];
                    if (!item) continue;
                    if (isTrackItemSelected(item)) {
                        var mp = (item.projectItem && item.projectItem.getMediaPath) ? item.projectItem.getMediaPath() : "";
                        if (!mp || mp.length === 0) continue;

                        var f = new File(mp);
                        if (!f.exists) continue;

                        var cStart = item.start ? parseFloat(item.start.seconds) : 0;
                        var cEnd = item.end ? parseFloat(item.end.seconds) : 0;
                        var cIn = item.inPoint ? parseFloat(item.inPoint.seconds) : 0;
                        var dur = cEnd - cStart;

                        if (dur > 0.05) {
                            var timeKey = Math.round(cStart * 100) + "_" + Math.round(cEnd * 100);
                            if (!seenMediaMap[timeKey]) {
                                seenMediaMap[timeKey] = true;
                                selectedClips.push({
                                    trackName: typePrefix + (t + 1),
                                    trackIndex: t,
                                    trackType: typePrefix === "A" ? "audio" : "video",
                                    name: item.name || (item.projectItem ? item.projectItem.name : "Selected_Clip"),
                                    start: Math.round(cStart * 1000) / 1000,
                                    end: Math.round(cEnd * 1000) / 1000,
                                    duration: Math.round(dur * 1000) / 1000,
                                    inPoint: Math.round(cIn * 1000) / 1000,
                                    mediaPath: mp.replace(/\\/g, "/")
                                });
                            }
                        }
                    }
                }
            }
        }

        scanTrackForSelection(seq.audioTracks, "A");
        if (selectedClips.length === 0) {
            scanTrackForSelection(seq.videoTracks, "V");
        }

        selectedClips.sort(function(a, b) {
            return a.start - b.start;
        });

        var totalDur = 0;
        for (var k = 0; k < selectedClips.length; k++) {
            totalDur += selectedClips[k].duration;
        }

        var resultObj = {
            selectedCount: selectedClips.length,
            totalDuration: Math.round(totalDur * 1000) / 1000,
            clips: selectedClips
        };

        return "OK|" + stringifyJson(resultObj);
    } catch(e) {
        return "ERR|" + e.toString();
    }
};

$._PPP_.exportAudio = function(targetWavPath, scopeMode) {
    try {
        var seq = null;
        if (app && app.project) {
            if (app.project.activeSequence) {
                seq = app.project.activeSequence;
            } else if (app.project.sequences && app.project.sequences.numSequences > 0) {
                seq = app.project.sequences[0];
            }
        }

        if (!seq) {
            return "ERR|Could not read the active sequence. Make sure a sequence is open.";
        }

        var isSelectedScope = (scopeMode === "selected");
        var clipsToProcess = [];
        var minClipStart = 999999;
        var maxClipEnd = 0;

        function scanTrackClips(tracks, typePrefix, onlySelected) {
            if (!tracks) return;
            for (var t = 0; t < tracks.numTracks; t++) {
                var track = tracks[t];
                if (!track || !track.clips) continue;
                for (var c = 0; c < track.clips.numItems; c++) {
                    var item = track.clips[c];
                    if (!item || !item.projectItem) continue;

                    if (onlySelected && !isTrackItemSelected(item)) {
                        continue;
                    }

                    var mp = item.projectItem.getMediaPath ? item.projectItem.getMediaPath() : "";
                    if (!mp || mp.length === 0) continue;

                    var f = new File(mp);
                    if (!f.exists) continue;

                    var cStart = item.start ? parseFloat(item.start.seconds) : 0;
                    var cEnd = item.end ? parseFloat(item.end.seconds) : 0;
                    var cIn = item.inPoint ? parseFloat(item.inPoint.seconds) : 0;

                    if (cEnd > cStart) {
                        if (cStart < minClipStart) minClipStart = cStart;
                        if (cEnd > maxClipEnd) maxClipEnd = cEnd;

                        clipsToProcess.push({
                            mediaPath: mp.replace(/\\/g, "/"),
                            clipStart: cStart,
                            clipEnd: cEnd,
                            clipIn: cIn,
                            clipName: item.name || item.projectItem.name || ("Clip_" + (clipsToProcess.length + 1)),
                            trackIndex: t,
                            trackName: typePrefix + (t + 1)
                        });
                    }
                }
            }
        }

        if (isSelectedScope) {
            // Scan only selected clips
            scanTrackClips(seq.audioTracks, "A", true);
            if (clipsToProcess.length === 0) {
                scanTrackClips(seq.videoTracks, "V", true);
            }

            if (clipsToProcess.length === 0) {
                return "ERR|No clips are currently selected on the sequence timeline. Please select one or more clips in Premiere Pro.";
            }
        } else {
            // Scan all clips
            scanTrackClips(seq.audioTracks, "A", false);
            if (clipsToProcess.length === 0) {
                scanTrackClips(seq.videoTracks, "V", false);
            }

            if (clipsToProcess.length === 0) {
                return "ERR|No valid audio or video clips found in active sequence.";
            }
        }

        // Sort chronologically by sequence start time
        clipsToProcess.sort(function(a, b) {
            return a.clipStart - b.clipStart;
        });

        var exportStart = 0;
        var exportEnd = 0;
        var activeManifestClips = [];

        if (isSelectedScope) {
            exportStart = clipsToProcess[0].clipStart;
            exportEnd = clipsToProcess[clipsToProcess.length - 1].clipEnd;
            for (var k = 0; k < clipsToProcess.length; k++) {
                if (clipsToProcess[k].clipEnd > exportEnd) {
                    exportEnd = clipsToProcess[k].clipEnd;
                }
            }

            for (var i = 0; i < clipsToProcess.length; i++) {
                var sItem = clipsToProcess[i];
                var sDur = sItem.clipEnd - sItem.clipStart;
                var sRelStart = sItem.clipStart - exportStart;

                activeManifestClips.push({
                    clipName: sItem.clipName,
                    trackIndex: sItem.trackIndex,
                    mediaPath: sItem.mediaPath,
                    mediaCutIn: Math.round(sItem.clipIn * 1000) / 1000,
                    cutDuration: Math.round(sDur * 1000) / 1000,
                    relSeqStart: Math.round(sRelStart * 1000) / 1000
                });
            }
        } else {
            // Determine export range for full sequence
            var inPoint = 0;
            var outPoint = 0;
            var hasWorkArea = false;

            try {
                var seqIn = seq.getInPoint();
                var seqOut = seq.getOutPoint();
                if (seqIn !== undefined && seqOut !== undefined && parseFloat(seqOut) > parseFloat(seqIn)) {
                    inPoint = parseFloat(seqIn);
                    outPoint = parseFloat(seqOut);
                    hasWorkArea = true;
                }
            } catch(eWork) {}

            exportStart = hasWorkArea ? inPoint : minClipStart;
            exportEnd = hasWorkArea ? outPoint : maxClipEnd;
            if (exportEnd <= exportStart) {
                exportStart = minClipStart;
                exportEnd = maxClipEnd;
            }

            for (var i = 0; i < clipsToProcess.length; i++) {
                var item = clipsToProcess[i];
                if (item.clipEnd > exportStart && item.clipStart < exportEnd) {
                    var effStart = Math.max(item.clipStart, exportStart);
                    var effEnd = Math.min(item.clipEnd, exportEnd);
                    var dur = effEnd - effStart;
                    var trimHead = effStart - item.clipStart;

                    var mediaCutIn = item.clipIn + trimHead;
                    var relSeqStart = effStart - exportStart;

                    activeManifestClips.push({
                        clipName: item.clipName,
                        trackIndex: item.trackIndex,
                        mediaPath: item.mediaPath,
                        mediaCutIn: Math.round(mediaCutIn * 1000) / 1000,
                        cutDuration: Math.round(dur * 1000) / 1000,
                        relSeqStart: Math.round(relSeqStart * 1000) / 1000
                    });
                }
            }
        }

        if (activeManifestClips.length === 0) {
            return "ERR|No audio clips found within the selected range.";
        }

        var tempDir = Folder.temp.fsName.replace(/\\/g, "/");
        var manifestPath = tempDir + "/cgp_sequence_manifest.json";
        var manifestFile = new File(manifestPath);

        var manifestData = {
            sequenceName: seq.name || "Active Sequence",
            exportStart: Math.round(exportStart * 1000) / 1000,
            exportEnd: Math.round(exportEnd * 1000) / 1000,
            duration: Math.round((exportEnd - exportStart) * 1000) / 1000,
            clips: activeManifestClips
        };

        manifestFile.encoding = "UTF-8";
        manifestFile.open("w");
        var jsonText = stringifyJson(manifestData);
        manifestFile.write(jsonText);
        manifestFile.close();

        // Verify write on disk
        manifestFile = new File(manifestFile.fsName);
        if (!manifestFile.exists || manifestFile.length === 0) {
            return "ERR|Failed to write sequence manifest JSON to disk. File size is 0 bytes.";
        }

        var finalPath = manifestFile.fsName.replace(/\\/g, "/");
        return "OK|" + finalPath + "|" + Math.round(exportStart * 1000) / 1000;
    } catch (e) {
        return "ERR|" + e.toString();
    }
};

function parseSRTText(srtStr) {
    var cues = [];
    if (!srtStr) return cues;
    var cleanStr = srtStr.replace(/\r\n/g, "\n");
    var blocks = cleanStr.split("\n\n");
    for (var b = 0; b < blocks.length; b++) {
        var block = blocks[b];
        var lines = block.split("\n");
        if (lines.length >= 3) {
            var timeLine = lines[1];
            var parts = timeLine.split("-->");
            if (parts.length === 2) {
                var sSec = parseSrtTime(parts[0]);
                var eSec = parseSrtTime(parts[1]);
                var txt = lines.slice(2).join("\n").replace(/^\s+|\s+$/g, "");
                cues.push({ start: sSec, end: eSec, text: txt });
            }
        }
    }
    return cues;
}

function parseSrtTime(tStr) {
    if (!tStr) return 0;
    var clean = tStr.replace(/^\s+|\s+$/g, "").replace(",", ".");
    var parts = clean.split(":");
    if (parts.length === 3) {
        var h = parseFloat(parts[0]);
        var m = parseFloat(parts[1]);
        var s = parseFloat(parts[2]);
        return (h * 3600) + (m * 60) + s;
    }
    return 0;
}

function findProjectItem(bin, searchName, searchPath) {
    if (!bin || !bin.children) return null;
    var cleanPath = searchPath ? searchPath.replace(/\\/g, "/").toLowerCase() : "";
    var cleanName = searchName ? searchName.toLowerCase() : "";

    for (var i = 0; i < bin.children.numItems; i++) {
        var item = bin.children[i];
        if (!item) continue;

        if (item.getMediaPath) {
            var mp = item.getMediaPath();
            if (mp && mp.replace(/\\/g, "/").toLowerCase() === cleanPath) {
                return item;
            }
        }
        if (item.name && item.name.toLowerCase() === cleanName) {
            return item;
        }

        if (item.type === 2 || (item.children && item.children.numItems > 0)) { // 2 = BIN
            var subFound = findProjectItem(item, searchName, searchPath);
            if (subFound) return subFound;
        }
    }
    return null;
}

$._PPP_.importSubtitles = function(srtPath, jsonPath, stylePreset) {
    try {
        // 1. Validate Active Sequence
        var seq = null;
        if (app && app.project) {
            if (app.project.activeSequence) {
                seq = app.project.activeSequence;
            } else if (app.project.sequences && app.project.sequences.numSequences > 0) {
                seq = app.project.sequences[0];
            }
        }

        if (!seq) {
            return "ERR|Could not read the active sequence. Make sure a sequence is open in Premiere Pro.";
        }

        // 2. Validate SRT File Exists
        var srtFile = new File(srtPath);
        if (!srtFile.exists) {
            return "ERR|Subtitle SRT file missing on disk: " + srtPath;
        }

        // 3. Import SRT File into Premiere Pro Project Bin
        var filePaths = [srtFile.fsName];
        var importSuccess = false;
        
        try {
            var targetBin = app.project.getInsertionBin();
            importSuccess = app.project.importFiles(filePaths, true, targetBin, false);
        } catch(e1) {
            try {
                importSuccess = app.project.importFiles(filePaths);
            } catch(e2) {
                importSuccess = false;
            }
        }

        if (!importSuccess) {
            return "ERR|Premiere Pro failed to import the SRT file into Project Panel.";
        }

        // 4. Locate the Imported ProjectItem in Project Panel
        var importedItem = findProjectItem(app.project.rootItem, srtFile.name, srtFile.fsName);
        if (!importedItem) {
            return "ERR|Imported SRT file could not be located in Project Panel.";
        }

        // 5. Add / Insert Subtitle Clip onto Active Sequence Timeline
        var addedToTimeline = false;

        // Try 5A: Premiere Pro Caption Track API (if supported)
        if (typeof seq.createCaptionTrack !== "undefined") {
            try {
                var capTrack = seq.createCaptionTrack(importedItem, 0, 0);
                if (capTrack) addedToTimeline = true;
            } catch(errCap) {}
        }

        // Try 5B: Insert onto top video track
        if (!addedToTimeline && seq.videoTracks && seq.videoTracks.numTracks > 0) {
            try {
                var targetTrack = seq.videoTracks[seq.videoTracks.numTracks - 1];
                if (!targetTrack) targetTrack = seq.videoTracks[0];

                if (targetTrack) {
                    var timePosition = 0;
                    if (typeof seq.getInPoint === "function") {
                        timePosition = seq.getInPoint();
                    }

                    if (typeof targetTrack.insertClip === "function") {
                        targetTrack.insertClip(importedItem, timePosition);
                        addedToTimeline = true;
                    } else if (typeof targetTrack.overwriteClip === "function") {
                        targetTrack.overwriteClip(importedItem, timePosition);
                        addedToTimeline = true;
                    }
                }
            } catch(errVideo) {}
        }

        // Try 5C: Fallback insert onto first video track
        if (!addedToTimeline && seq.videoTracks && seq.videoTracks.numTracks > 0) {
            try {
                var v1 = seq.videoTracks[0];
                if (v1 && typeof v1.insertClip === "function") {
                    v1.insertClip(importedItem, 0);
                    addedToTimeline = true;
                }
            } catch(errV1) {}
        }

        if (!addedToTimeline) {
            return "ERR|SRT file imported into Project Panel, but failed to insert clip onto sequence timeline.";
        }

        return "OK|Subtitles imported into Project Panel and added to active sequence timeline!";

    } catch (e) {
        return "ERR|" + e.toString();
    }
};

$._PPP_.importStyledSubtitles = function(jsonPath) {
    try {
        var seq = null;
        if (app && app.project) {
            if (app.project.activeSequence) {
                seq = app.project.activeSequence;
            } else if (app.project.sequences && app.project.sequences.numSequences > 0) {
                seq = app.project.sequences[0];
            }
        }

        if (!seq) {
            return "ERR|Could not read active sequence. Make sure a sequence is open in Premiere Pro.";
        }

        var jsonFile = new File(jsonPath);
        if (!jsonFile.exists) {
            return "ERR|Styled subtitle payload missing on disk: " + jsonPath;
        }

        jsonFile.open("r");
        var jsonText = jsonFile.read();
        jsonFile.close();

        var payload = parseJsonSafe(jsonText);
        if (!payload) {
            return "ERR|Failed to parse styled subtitle JSON payload. Expected valid JSON.";
        }

        var style = payload.style || {};
        var captions = payload.captions || [];
        var words = payload.words || [];

        // Prefer payload.captions (which contains pre-chunked items from Stylize tab)
        var items = [];
        if (captions && captions.length > 0) {
            for (var c = 0; c < captions.length; c++) {
                items.push({
                    text: captions[c].text,
                    start: captions[c].start,
                    end: captions[c].end
                });
            }
        } else if (words && words.length > 0) {
            for (var w = 0; w < words.length; w++) {
                items.push({
                    text: words[w].word,
                    start: words[w].start,
                    end: words[w].end
                });
            }
        }

        if (items.length === 0) {
            return "ERR|No caption or word items available to create styled subtitles.";
        }

        var targetTrack = null;
        if (seq.videoTracks && seq.videoTracks.numTracks > 0) {
            targetTrack = seq.videoTracks[seq.videoTracks.numTracks - 1];
            if (!targetTrack) targetTrack = seq.videoTracks[0];
        }

        if (!targetTrack) {
            return "ERR|No video tracks available in active sequence.";
        }

        var createdCount = 0;
        var fontFamily = style.fontFamily || "Arial";
        var fontSize = style.fontSize || 24;
        var fontColor = style.textColor || "#FFFFFF";
        var styleName = "Font: " + fontFamily + " (" + (style.fontWeight === "bold" ? "Bold" : "Regular") + "), Size: " + fontSize + "px";

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var titleName = "CGP_Cap_" + (i + 1);
            var titleItem = null;

            if (typeof app.project.createNewTitle === "function") {
                try {
                    titleItem = app.project.createNewTitle(titleName, item.text, fontFamily, fontSize, fontColor);
                } catch(eTitle) {}
            }

            if (titleItem && typeof targetTrack.insertClip === "function") {
                try {
                    targetTrack.insertClip(titleItem, item.start);
                    createdCount++;
                } catch(eIns) {}
            }
        }

        if (createdCount > 0) {
            return "OK|Created " + createdCount + " stylized subtitle elements on active sequence (" + styleName + ")!";
        }

        // Fallback: If title creation API is restricted in current Premiere version, fallback to SRT import
        var srtPath = jsonPath.replace("_styled.json", ".srt").replace("cgp_stylize_payload.json", "cgp_stylize_payload.srt");
        var srtFile = new File(srtPath);
        if (srtFile.exists) {
            var srtRes = $._PPP_.importSubtitles(srtFile.fsName);
            if (srtRes && srtRes.indexOf("OK|") === 0) {
                return "OK|Applied subtitles to active sequence timeline (" + styleName + ")!";
            }
            return srtRes;
        }

        return "ERR|Could not create graphic title clips on sequence video track. Make sure a sequence is active.";

    } catch (e) {
        return "ERR|" + e.toString();
    }
};
