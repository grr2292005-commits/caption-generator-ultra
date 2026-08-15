// Caption Generator ULTRA - After Effects Host Script
if (typeof $._PPP_ === "undefined") {
    $._PPP_ = {};
}
if (typeof $._AE_ === "undefined") {
    $._AE_ = $._PPP_;
}
if (typeof $._AE_CGP_ === "undefined") {
    $._AE_CGP_ = $._PPP_;
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

function isCompItem(item) {
    if (!item) return false;
    try {
        if (typeof CompItem !== "undefined" && item instanceof CompItem) return true;
        if (item.typeName === "Composition") return true;
        if (typeof item.numLayers !== "undefined") return true;
    } catch(e) {}
    return false;
}

function isTextLayer(layer) {
    if (!layer) return false;
    try {
        if (typeof TextLayer !== "undefined" && layer instanceof TextLayer) return true;
        if (layer.property && layer.property("Source Text") !== null) return true;
    } catch(e) {}
    return false;
}

$._PPP_.testConnection = function() {
    return "OK|After Effects Host ready";
};

$._PPP_.getProjectDetails = function() {
    try {
        var name = "UntitledAEProject";
        var path = "";
        if (app && app.project && app.project.file && app.project.file.parent) {
            path = app.project.file.parent.fsName.replace(/\\/g, "/");
            name = app.project.file.name.replace(/\.[^\.]+$/, "");
        }
        var compName = "NoActiveComp";
        if (app && app.project && app.project.activeItem && isCompItem(app.project.activeItem)) {
            compName = app.project.activeItem.name || "NoActiveComp";
        }
        return "OK|" + name + "|" + path + "|" + compName;
    } catch (e) {
        return "OK|UntitledAEProject||";
    }
};

function resolveFilePath(f) {
    if (!f) return "";
    try {
        if (typeof f === "string") return f.replace(/\\/g, "/");
        if (f.fsName && f.fsName.length > 0) return f.fsName.replace(/\\/g, "/");
        if (f.fullName && f.fullName.length > 0) return f.fullName.replace(/\\/g, "/");
        if (f.absoluteURI && f.absoluteURI.length > 0) {
            return decodeURIComponent(f.absoluteURI).replace(/^file:\/\/\//i, "").replace(/^file:\/\//i, "").replace(/\\/g, "/");
        }
        if (f.path && f.name) return (f.path + "/" + f.name).replace(/\\/g, "/");
    } catch(e) {}
    return "";
}

function getLayerSourceFile(layer) {
    if (!layer) return null;
    try {
        // 1. Direct file property on layer
        if (layer.file) return layer.file;

        // 2. Direct layer source
        if (layer.source) {
            var src = layer.source;
            if (src.mainSource && src.mainSource.file) {
                return src.mainSource.file;
            }
            if (src.file) {
                return src.file;
            }
            if (src.typeName === "Composition" || (typeof CompItem !== "undefined" && src instanceof CompItem)) {
                for (var p = 1; p <= src.numLayers; p++) {
                    var pl = src.layer(p);
                    if (pl && pl.enabled) {
                        var plFile = getLayerSourceFile(pl);
                        if (plFile) return plFile;
                    }
                }
            }
        }

        // 3. Search project items by name matching layer or layer source
        if (app && app.project) {
            var searchName = layer.name || "";
            var srcName = (layer.source && layer.source.name) ? layer.source.name : "";
            for (var i = 1; i <= app.project.numItems; i++) {
                var pItem = app.project.item(i);
                if (pItem) {
                    if ((searchName && pItem.name === searchName) || (srcName && pItem.name === srcName)) {
                        if (pItem.mainSource && pItem.mainSource.file) return pItem.mainSource.file;
                        if (pItem.file) return pItem.file;
                    }
                }
            }
        }
    } catch (e) {}
    return null;
}

function checkLayerHasAudio(layer) {
    if (!layer) return false;
    try {
        if (typeof layer.hasAudio !== "undefined" && layer.hasAudio !== null) {
            if (layer.hasAudio === true) {
                return (typeof layer.audioEnabled !== "undefined" && layer.audioEnabled !== null) ? layer.audioEnabled : true;
            }
            if (layer.hasAudio === false) {
                return false;
            }
        }
        if (layer.source) {
            var src = layer.source;
            if (src && typeof src.hasAudio !== "undefined" && src.hasAudio === true) return true;
            if (src && src.mainSource && typeof src.mainSource.hasAudio !== "undefined" && src.mainSource.hasAudio === true) return true;
        }
    } catch (e) {}
    return true;
}

function getCompSelectedLayers(comp) {
    var list = [];
    if (!comp) return list;

    // Method 1: comp.selectedLayers
    try {
        if (comp.selectedLayers && comp.selectedLayers.length > 0) {
            for (var s = 0; s < comp.selectedLayers.length; s++) {
                if (comp.selectedLayers[s]) list.push(comp.selectedLayers[s]);
            }
        }
    } catch(e1) {}

    // Method 2: iterate all comp layers and test layer.selected
    try {
        if (comp.numLayers > 0) {
            for (var i = 1; i <= comp.numLayers; i++) {
                var lyr = comp.layer(i);
                if (lyr && lyr.selected === true) {
                    list.push(lyr);
                }
            }
        }
    } catch(e2) {}

    // Deduplicate by layer index
    var unique = [];
    var seen = {};
    for (var u = 0; u < list.length; u++) {
        var l = list[u];
        var idx = l.index || (u + 1);
        if (!seen[idx]) {
            seen[idx] = true;
            unique.push(l);
        }
    }
    return unique;
}

function getActiveComp() {
    if (!app || !app.project) return null;

    // 1. Check app.project.activeItem
    try {
        if (app.project.activeItem && isCompItem(app.project.activeItem)) {
            return app.project.activeItem;
        }
    } catch(e1) {}

    // 2. Check activeViewer if it's a composition viewer
    try {
        if (app.activeViewer && app.activeViewer.type === ViewerType.VIEWER_COMPOSITION) {
            if (app.project.activeItem && isCompItem(app.project.activeItem)) {
                return app.project.activeItem;
            }
        }
    } catch(e2) {}

    // 3. Search all comps to find one that currently has selected layers
    try {
        for (var c = 1; c <= app.project.numItems; c++) {
            var cItem = app.project.item(c);
            if (isCompItem(cItem)) {
                var selLayers = getCompSelectedLayers(cItem);
                if (selLayers && selLayers.length > 0) {
                    return cItem;
                }
            }
        }
    } catch(e3) {}

    // 4. Check selected comp in project panel
    try {
        for (var i = 1; i <= app.project.numItems; i++) {
            var item = app.project.item(i);
            if (isCompItem(item) && item.selected) {
                return item;
            }
        }
    } catch(e4) {}

    // 5. Fallback to first comp in project
    try {
        for (var j = 1; j <= app.project.numItems; j++) {
            var item2 = app.project.item(j);
            if (isCompItem(item2)) {
                return item2;
            }
        }
    } catch(e5) {}

    return null;
}

$._PPP_.getActiveCompInfo = function() {
    try {
        var comp = getActiveComp();
        if (!comp) {
            return "ERR|No active composition found in After Effects.";
        }
        var compName = comp.name || "Active Comp";
        var duration = parseFloat(comp.duration) || 0;
        var layerCount = parseInt(comp.numLayers, 10) || 0;
        var workStart = parseFloat(comp.workAreaStart) || 0;
        var workDur = parseFloat(comp.workAreaDuration) || duration;
        var compId = comp.id || 0;

        return "OK|" + compName + "|" + duration.toFixed(2) + "|" + layerCount + "|" + workStart.toFixed(2) + "|" + workDur.toFixed(2) + "|" + compId;
    } catch(e) {
        return "ERR|" + e.toString();
    }
};

$._PPP_.getSelectedLayersInfo = function() {
    try {
        var comp = getActiveComp();
        if (!comp) {
            return "ERR|No active composition found.";
        }

        var rawSelected = getCompSelectedLayers(comp);
        var selectedLayers = [];
        var seenIndices = {};

        for (var i = 0; i < rawSelected.length; i++) {
            var layer = rawSelected[i];
            if (!layer) continue;

            var f = getLayerSourceFile(layer);
            var filePath = resolveFilePath(f);

            var lIn = parseFloat(layer.inPoint) || 0;
            var lOut = parseFloat(layer.outPoint) || (parseFloat(layer.inPoint) + 0.1);
            var dur = lOut - lIn;
            if (dur <= 0) {
                dur = parseFloat(comp.duration) || 1.0;
                lOut = lIn + dur;
            }

            var idx = layer.index || (i + 1);
            if (!seenIndices[idx]) {
                seenIndices[idx] = true;
                selectedLayers.push({
                    index: idx,
                    name: layer.name || ("Layer " + idx),
                    start: Math.round(lIn * 1000) / 1000,
                    end: Math.round(lOut * 1000) / 1000,
                    duration: Math.round(dur * 1000) / 1000,
                    hasAudio: checkLayerHasAudio(layer),
                    mediaPath: filePath || ""
                });
            }
        }

        selectedLayers.sort(function(a, b) {
            return a.start - b.start;
        });

        var totalDur = 0;
        for (var k = 0; k < selectedLayers.length; k++) {
            totalDur += selectedLayers[k].duration;
        }

        var resObj = {
            totalSelectedLayers: selectedLayers.length,
            selectedCount: selectedLayers.length,
            totalDuration: Math.round(totalDur * 1000) / 1000,
            layers: selectedLayers
        };

        return "OK|" + stringifyJson(resObj);
    } catch(e) {
        return "ERR|" + e.toString();
    }
};

$._PPP_.exportAudio = function(targetWavPath, scopeMode) {
    try {
        var comp = getActiveComp();
        if (!comp) {
            return "ERR|Could not read the active composition. Make sure a composition is open in After Effects.";
        }

        var isSelected = (scopeMode === "selected");
        var isWorkArea = (scopeMode === "workarea");

        var exportStart = 0;
        var exportEnd = comp.duration;

        if (isWorkArea) {
            exportStart = parseFloat(comp.workAreaStart) || 0;
            exportEnd = exportStart + (parseFloat(comp.workAreaDuration) || comp.duration);
        }

        var clipsToProcess = [];
        var minLayerIn = 999999;
        var maxLayerOut = 0;
        var totalEnabledLayers = 0;
        var unresolvedMediaLayers = 0;

        var layerList = [];
        if (isSelected) {
            layerList = getCompSelectedLayers(comp);
        } else {
            for (var i = 1; i <= comp.numLayers; i++) {
                layerList.push(comp.layer(i));
            }
        }

        if (isSelected && layerList.length === 0) {
            return "ERR|No layers currently selected in timeline. Please select one or more audio/video layers.";
        }

        for (var l = 0; l < layerList.length; l++) {
            var layer = layerList[l];
            if (!layer) continue;
            totalEnabledLayers++;

            var f = getLayerSourceFile(layer);
            var filePath = resolveFilePath(f);
            if (!filePath) {
                unresolvedMediaLayers++;
                continue;
            }

            var lIn = parseFloat(layer.inPoint) || 0;
            var lOut = parseFloat(layer.outPoint) || 0;
            var lStart = parseFloat(layer.startTime) || 0;

            if (lOut > lIn) {
                if (lIn < minLayerIn) minLayerIn = lIn;
                if (lOut > maxLayerOut) maxLayerOut = lOut;

                clipsToProcess.push({
                    mediaPath: filePath,
                    clipStart: lIn,
                    clipEnd: lOut,
                    startTime: lStart,
                    hasAudio: checkLayerHasAudio(layer),
                    clipName: layer.name || ("Layer_" + layer.index),
                    trackIndex: layer.index
                });
            }
        }

        if (clipsToProcess.length === 0) {
            if (isSelected) {
                return "ERR|Selected layers do not contain valid audio or video media files.";
            } else if (totalEnabledLayers > 0 && unresolvedMediaLayers > 0) {
                return "ERR|Found audio/video layers but could not resolve media file path.";
            } else {
                return "ERR|No audio or video layers found in active composition.";
            }
        }

        // Sort chronologically by sequence start
        clipsToProcess.sort(function(a, b) {
            return a.clipStart - b.clipStart;
        });

        if (isSelected) {
            exportStart = clipsToProcess[0].clipStart;
            exportEnd = clipsToProcess[clipsToProcess.length - 1].clipEnd;
            for (var c = 0; c < clipsToProcess.length; c++) {
                if (clipsToProcess[c].clipEnd > exportEnd) {
                    exportEnd = clipsToProcess[c].clipEnd;
                }
            }
        } else if (!isWorkArea) {
            exportStart = minLayerIn < 999999 ? minLayerIn : 0;
            exportEnd = maxLayerOut > 0 ? maxLayerOut : comp.duration;
        }

        var activeManifestClips = [];
        for (var k = 0; k < clipsToProcess.length; k++) {
            var item = clipsToProcess[k];
            if (item.clipEnd > exportStart && item.clipStart < exportEnd) {
                var effStart = Math.max(item.clipStart, exportStart);
                var effEnd = Math.min(item.clipEnd, exportEnd);
                var dur = effEnd - effStart;
                var trimHead = effStart - item.clipStart;

                // Source cut-in formula: (inPoint - startTime) + trimHead
                var mediaCutIn = (item.clipStart - item.startTime) + trimHead;
                var relSeqStart = effStart - exportStart;

                activeManifestClips.push({
                    clipName: item.clipName,
                    trackIndex: item.trackIndex,
                    mediaPath: item.mediaPath,
                    mediaCutIn: Math.max(0, Math.round(mediaCutIn * 1000) / 1000),
                    cutDuration: Math.round(dur * 1000) / 1000,
                    relSeqStart: Math.round(relSeqStart * 1000) / 1000
                });
            }
        }

        if (activeManifestClips.length === 0) {
            return "ERR|No audio layers found within active comp range.";
        }

        var tempDir = Folder.temp.fsName.replace(/\\/g, "/");
        var manifestPath = tempDir + "/cgp_ae_comp_manifest.json";
        var manifestFile = new File(manifestPath);

        var manifestData = {
            sequenceName: comp.name || "Active Comp",
            exportStart: Math.round(exportStart * 1000) / 1000,
            exportEnd: Math.round(exportEnd * 1000) / 1000,
            duration: Math.round((exportEnd - exportStart) * 1000) / 1000,
            clips: activeManifestClips
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

        manifestFile.encoding = "UTF-8";
        manifestFile.open("w");
        var jsonText = stringifyJson(manifestData);
        manifestFile.write(jsonText);
        manifestFile.close();

        // Verify write on disk
        manifestFile = new File(manifestFile.fsName);
        if (!manifestFile.exists || manifestFile.length === 0) {
            return "ERR|Failed to write comp manifest JSON to disk. File size is 0 bytes.";
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

function removeExistingSubtitleLayers(targetComp) {
    if (!targetComp) return;
    for (var i = targetComp.numLayers; i >= 1; i--) {
        var l = targetComp.layer(i);
        if (l && l.comment === "CGP_SUBTITLE") {
            l.remove();
        }
    }
}

$._PPP_.importSubtitles = function(srtPath, jsonPath, importMethod, replaceExisting) {
    try {
        if (!app || !app.project || !app.project.activeItem || !isCompItem(app.project.activeItem)) {
            return "ERR|Could not read the active composition. Make sure a composition is open.";
        }

        var comp = app.project.activeItem;
        var srtFile = new File(srtPath);
        if (!srtFile.exists) {
            return "ERR|Subtitle file missing. Please try transcribing again.";
        }

        srtFile.open("r");
        var content = srtFile.read();
        srtFile.close();

        var cues = parseSRTText(content);
        if (cues.length === 0) {
            return "ERR|No subtitles found in file.";
        }

        app.beginUndoGroup("Create Subtitles - Caption Generator Pro");

        var targetComp = comp;
        var isPrecomp = (importMethod === "precomp");

        if (isPrecomp) {
            if (replaceExisting) {
                for (var p = comp.numLayers; p >= 1; p--) {
                    var pl = comp.layer(p);
                    if (pl && pl.name === "Subtitles Precomp") {
                        pl.remove();
                    }
                }
            }

            var precompItem = app.project.items.addComp("Subtitles Precomp", comp.width, comp.height, comp.pixelAspect, comp.duration, comp.frameRate);
            comp.layers.add(precompItem);
            targetComp = precompItem;
        } else {
            if (replaceExisting) {
                removeExistingSubtitleLayers(targetComp);
            }
        }

        var compWidth = targetComp.width;
        var compHeight = targetComp.height;

        for (var i = 0; i < cues.length; i++) {
            var cue = cues[i];
            var txt = cue.text;

            var textLayer = targetComp.layers.addText(txt);
            textLayer.comment = "CGP_SUBTITLE";
            textLayer.name = txt;

            textLayer.inPoint = cue.start;
            textLayer.outPoint = cue.end;

            var textProp = textLayer.property("Source Text");
            var textDocument = textProp.value;

            textDocument.fontSize = compHeight * 0.045;
            textDocument.fillColor = [1, 1, 1];
            textDocument.applyFill = true;
            textDocument.strokeColor = [0, 0, 0];
            textDocument.strokeWidth = compHeight * 0.004;
            textDocument.applyStroke = true;
            textDocument.font = "Arial-BoldMT";
            textDocument.justification = ParagraphJustification.CENTER_JUSTIFY;

            textProp.setValue(textDocument);

            var bounds = textLayer.sourceRectAtTime(cue.start, false);
            var anchorX = bounds.left + bounds.width / 2;
            var anchorY = bounds.top + bounds.height / 2;

            textLayer.property("Anchor Point").setValue([anchorX, anchorY]);
            textLayer.property("Position").setValue([compWidth / 2, compHeight * 0.85]);
        }

        app.endUndoGroup();

        return "OK|Subtitles created successfully in active comp!|Count:" + cues.length;
    } catch (e) {
        return "ERR|" + e.toString();
    }
};

function hexToRgb(hex) {
    if (!hex) return [1, 1, 1];
    var c = hex.replace("#", "");
    if (c.length === 3) c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
    if (c.length !== 6) return [1, 1, 1];
    var r = parseInt(c.substring(0, 2), 16) / 255.0;
    var g = parseInt(c.substring(2, 4), 16) / 255.0;
    var b = parseInt(c.substring(4, 6), 16) / 255.0;
    return [r, g, b];
}

function padNum(n) {
    return n < 10 ? "00" + n : (n < 100 ? "0" + n : "" + n);
}

$._PPP_.importStyledSubtitles = function(jsonPath, importMethod, replaceExisting) {
    try {
        var comp = getActiveComp();
        if (!comp) {
            return "ERR|Could not read the active composition. Make sure a composition is open in After Effects.";
        }
        var jsonFile = new File(jsonPath);
        if (!jsonFile.exists) {
            return "ERR|Styled subtitle payload file missing on disk.";
        }

        jsonFile.open("r");
        var content = jsonFile.read();
        jsonFile.close();

        var payload = parseJsonSafe(content);
        if (!payload) {
            return "ERR|Failed to safely parse styled subtitle JSON payload.";
        }

        var style = payload.style || {};
        var captions = payload.captions || [];
        var words = payload.words || [];

        var isPrecomp = (importMethod === "precomp");
        app.beginUndoGroup("Create Subtitles - Caption Generator ULTRA");

        var targetComp = comp;
        if (isPrecomp) {
            if (replaceExisting) {
                for (var p = comp.numLayers; p >= 1; p--) {
                    var pl = comp.layer(p);
                    if (pl && pl.name === "Subtitles Precomp") {
                        pl.remove();
                    }
                }
            }
            var precompItem = app.project.items.addComp("Subtitles Precomp", comp.width, comp.height, comp.pixelAspect, comp.duration, comp.frameRate);
            comp.layers.add(precompItem);
            targetComp = precompItem;
        } else {
            if (replaceExisting) {
                for (var r = targetComp.numLayers; r >= 1; r--) {
                    var rl = targetComp.layer(r);
                    if (rl && (rl.comment === "CGP_SUBTITLE" || (rl.name && rl.name.indexOf("CGP_Caption_") === 0))) {
                        rl.remove();
                    }
                }
            }
        }

        var compWidth = targetComp.width;
        var compHeight = targetComp.height;

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
                    text: words[w].word || words[w].text,
                    start: words[w].start,
                    end: words[w].end
                });
            }
        }

        if (items.length === 0) {
            app.endUndoGroup();
            return "ERR|No caption or word items available to generate text layers.";
        }

        var primaryRgb = hexToRgb(style.textColor || style.primaryColor || "#FFFFFF");
        var strokeRgb = hexToRgb(style.strokeColor || "#000000");

        var posVert = style.position || "bottom";
        var alignHoriz = style.align || "center";

        var posY = (posVert === "top") ? (compHeight * 0.15) : ((posVert === "center") ? (compHeight * 0.5) : (compHeight * 0.85));
        var posX = (alignHoriz === "left") ? (compWidth * 0.15) : ((alignHoriz === "right") ? (compWidth * 0.85) : (compWidth * 0.5));

        var fontSizePx = style.fontSize ? parseFloat(style.fontSize) : 48;
        if (isNaN(fontSizePx) || fontSizePx < 8) fontSizePx = 48;

        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var txt = item.text;

            var textLayer = targetComp.layers.addText(txt);
            textLayer.comment = "CGP_SUBTITLE";
            textLayer.name = "CGP_Caption_" + padNum(i + 1);

            textLayer.inPoint = item.start;
            textLayer.outPoint = item.end;

            var textProp = textLayer.property("Source Text");
            var textDocument = textProp.value;

            textDocument.fontSize = fontSizePx;
            textDocument.fillColor = primaryRgb;
            textDocument.applyFill = true;

            if (style.enableStroke !== false) {
                textDocument.strokeColor = strokeRgb;
                textDocument.strokeWidth = Math.max(1, Math.round(fontSizePx * 0.06));
                textDocument.applyStroke = true;
            } else {
                textDocument.applyStroke = false;
            }

            textDocument.font = "Arial-BoldMT";

            if (alignHoriz === "left") {
                textDocument.justification = ParagraphJustification.LEFT_JUSTIFY;
            } else if (alignHoriz === "right") {
                textDocument.justification = ParagraphJustification.RIGHT_JUSTIFY;
            } else {
                textDocument.justification = ParagraphJustification.CENTER_JUSTIFY;
            }

            textProp.setValue(textDocument);

            var bounds = textLayer.sourceRectAtTime(item.start, false);
            var anchorX = bounds.left + bounds.width / 2;
            var anchorY = bounds.top + bounds.height / 2;

            textLayer.property("Anchor Point").setValue([anchorX, anchorY]);
            textLayer.property("Position").setValue([posX, posY]);
        }

        app.endUndoGroup();

        return "OK|Created " + items.length + " caption text layers in active comp!|Count:" + items.length;

    } catch (e) {
        return "ERR|" + e.toString();
    }
};

$._PPP_.scanUserPresets = function() {
    try {
        var presets = [];
        var docsFolder = Folder.myDocuments;
        if (docsFolder && docsFolder.exists) {
            var adobeFolder = new Folder(docsFolder.fsName.replace(/\\/g, "/") + "/Adobe");
            if (adobeFolder.exists) {
                var aeFolders = adobeFolder.getFiles(function(f) {
                    return f instanceof Folder && f.name.indexOf("After Effects") !== -1;
                });
                for (var i = 0; i < aeFolders.length; i++) {
                    var userPresetsFolder = new Folder(aeFolders[i].fsName.replace(/\\/g, "/") + "/User Presets");
                    if (userPresetsFolder.exists) {
                        scanFfxFiles(userPresetsFolder, presets);
                    }
                }
            }
        }
        return "OK|" + stringifyJson(presets);
    } catch(e) {
        return "ERR|" + e.toString();
    }
};

function scanFfxFiles(folder, resultArr) {
    if (!folder || !folder.exists) return;
    try {
        var files = folder.getFiles();
        for (var i = 0; i < files.length; i++) {
            var item = files[i];
            if (item instanceof Folder) {
                scanFfxFiles(item, resultArr);
            } else if (item instanceof File && item.name.match(/\.ffx$/i)) {
                var cleanName = item.name.replace(/\.ffx$/i, "");
                resultArr.push({
                    name: cleanName,
                    path: item.fsName.replace(/\\/g, "/")
                });
            }
        }
    } catch(eScan) {}
}

function removeAllTextAnimators(textLayer) {
    if (!textLayer) return;
    try {
        var textGroup = textLayer.property("Text");
        if (textGroup && textGroup.numProperties) {
            for (var i = textGroup.numProperties; i >= 1; i--) {
                var prop = textGroup.property(i);
                if (prop && prop.name !== "Source Text" && prop.matchName !== "ADBE Text Document") {
                    try { prop.remove(); } catch(eRem) {}
                }
            }
        }
    } catch(e) {}
}

function resetPropKeyframes(prop) {
    if (prop && prop.numKeys > 0) {
        for (var k = prop.numKeys; k >= 1; k--) {
            try { prop.removeKey(k); } catch(eK) {}
        }
    }
}

function collectKeyframedProperties(container, outArr) {
    if (!container) return;
    try {
        if (container.numProperties) {
            for (var i = 1; i <= container.numProperties; i++) {
                var prop = container.property(i);
                if (prop) {
                    if (prop.numKeys && prop.numKeys > 0) {
                        outArr.push(prop);
                    }
                    if (prop.numProperties) {
                        collectKeyframedProperties(prop, outArr);
                    }
                }
            }
        }
    } catch(eColl) {}
}

function autoFitLayerKeyframes(layer, mode) {
    if (!layer || !mode || mode === "natural") return;
    try {
        var lIn = layer.inPoint;
        var lOut = layer.outPoint;
        var lDur = lOut - lIn;
        if (lDur <= 0) return;

        var keyProps = [];
        collectKeyframedProperties(layer, keyProps);
        if (keyProps.length === 0) return;

        var minT = 999999;
        var maxT = -999999;

        for (var i = 0; i < keyProps.length; i++) {
            var prop = keyProps[i];
            for (var k = 1; k <= prop.numKeys; k++) {
                var kt = prop.keyTime(k);
                if (kt < minT) minT = kt;
                if (kt > maxT) maxT = kt;
            }
        }

        if (minT >= 999999) return;
        var origSpan = maxT - minT;

        for (var p = 0; p < keyProps.length; p++) {
            var targetProp = keyProps[p];
            var keyData = [];
            for (var k2 = 1; k2 <= targetProp.numKeys; k2++) {
                var oldTime = targetProp.keyTime(k2);
                var val = targetProp.keyValue(k2);
                var newTime = oldTime;

                if (mode === "fit_duration") {
                    if (origSpan > 0) {
                        var rel = (oldTime - minT) / origSpan;
                        newTime = lIn + (rel * lDur);
                    } else {
                        newTime = lIn;
                    }
                } else if (mode === "start_only") {
                    newTime = lIn + (oldTime - minT);
                }
                keyData.push({ time: newTime, value: val });
            }

            resetPropKeyframes(targetProp);
            for (var kd = 0; kd < keyData.length; kd++) {
                try {
                    targetProp.setValueAtTime(keyData[kd].time, keyData[kd].value);
                } catch(eSet) {}
            }
        }
    } catch(eFit) {}
}

$._PPP_.applyPresetToLayers = function(jsonPath) {
    try {
        var targetComp = getActiveComp();
        if (!targetComp) {
            return "ERR|No active composition found. Please select or open a composition in After Effects.";
        }

        var jsonFile = new File(jsonPath);
        if (!jsonFile.exists) {
            return "ERR|Preset config file missing: " + jsonPath;
        }

        jsonFile.open("r");
        var jsonText = jsonFile.read();
        jsonFile.close();

        var payload = parseJsonSafe(jsonText);
        if (!payload) {
            return "ERR|Failed to safely parse preset JSON payload.";
        }

        var preset = payload.preset || "pop_in";
        var keyframeFit = payload.keyframeFit || "fit_duration";
        var style = payload.style || {};

        var targetLayers = [];
        if (targetComp.selectedLayers && targetComp.selectedLayers.length > 0) {
            for (var s = 0; s < targetComp.selectedLayers.length; s++) {
                if (isTextLayer(targetComp.selectedLayers[s])) {
                    targetLayers.push(targetComp.selectedLayers[s]);
                }
            }
        }

        if (targetLayers.length === 0) {
            return "ERR|No text layers selected. Please select one or more text layers in your timeline.";
        }

        app.beginUndoGroup("CGP Apply Preset To Layers");

        for (var i = 0; i < targetLayers.length; i++) {
            var textLayer = targetLayers[i];
            var start = textLayer.inPoint;
            var end = textLayer.outPoint;

            // 1. Wipe old animators to prevent animator stacking/clutter (e.g. 6 animators)
            removeAllTextAnimators(textLayer);

            // 2. Clear old Transform keyframes before applying new animation
            var scaleProp = textLayer.property("Scale");
            var opacProp = textLayer.property("Opacity");
            resetPropKeyframes(scaleProp);
            resetPropKeyframes(opacProp);

            // 3. Check if applying a .ffx user preset file vs built-in preset
            if (preset && (preset.indexOf("ffx:") === 0 || preset.indexOf(".ffx") !== -1 || preset.indexOf("/") !== -1 || preset.indexOf("\\") !== -1)) {
                var ffxPathClean = preset.replace(/^ffx:/, "");
                var ffxFile = new File(ffxPathClean);
                if (ffxFile.exists) {
                    try {
                        // Crucial ExtendScript Fix: Deselect all layers and select ONLY current textLayer
                        // to prevent After Effects applyPreset from applying multiple times to all selected layers
                        for (var d = 1; d <= targetComp.numLayers; d++) {
                            try { targetComp.layer(d).selected = false; } catch(eD) {}
                        }
                        textLayer.selected = true;

                        // Set current timeline time to layer inPoint so preset keyframes start at layer start
                        targetComp.time = start;
                        textLayer.applyPreset(ffxFile);
                    } catch(eFfx) {}
                }
            } else {
                // Apply built-in keyframe animation preset
                if (preset === "pop_in" || preset === "word_kinetic") {
                    scaleProp.setValueAtTime(start, [0, 0]);
                    scaleProp.setValueAtTime(start + 0.08, [125, 125]);
                    scaleProp.setValueAtTime(start + 0.15, [100, 100]);
                } else if (preset === "karaoke_highlight") {
                    scaleProp.setValueAtTime(start, [100, 100]);
                    scaleProp.setValueAtTime(start + 0.06, [118, 118]);
                    scaleProp.setValueAtTime(start + 0.14, [100, 100]);
                } else if (preset === "clean_fade") {
                    opacProp.setValueAtTime(start, 0);
                    opacProp.setValueAtTime(start + 0.15, 100);
                    opacProp.setValueAtTime(end - 0.15, 100);
                    opacProp.setValueAtTime(end, 0);
                } else if (preset === "lower_third_soft") {
                    opacProp.setValueAtTime(start, 0);
                    opacProp.setValueAtTime(start + 0.25, 100);
                    opacProp.setValueAtTime(end - 0.25, 100);
                    opacProp.setValueAtTime(end, 0);

                    scaleProp.setValueAtTime(start, [94, 94]);
                    scaleProp.setValueAtTime(start + 0.3, [100, 100]);
                }
            }

            // 4. Always apply keyframe alignment (Fit Keyframes to Layer Start/End, Start Only, Natural)
            autoFitLayerKeyframes(textLayer, keyframeFit);
        }

        // Restore active selection for all targeted layers
        for (var r = 0; r < targetLayers.length; r++) {
            try { targetLayers[r].selected = true; } catch(eR) {}
        }

        app.endUndoGroup();
        return "OK|Successfully applied preset '" + preset + "' to " + targetLayers.length + " text layers!";
    } catch(e) {
        return "ERR|" + e.toString();
    }
};

$._PPP_.applyAlignmentToLayers = function(jsonPath) {
    try {
        var targetComp = getActiveComp();
        if (!targetComp) {
            return "ERR|No active composition found. Please select or open a composition in After Effects.";
        }

        var jsonFile = new File(jsonPath);
        if (!jsonFile.exists) {
            return "ERR|Alignment config file missing: " + jsonPath;
        }

        jsonFile.open("r");
        var jsonText = jsonFile.read();
        jsonFile.close();

        var payload = parseJsonSafe(jsonText);
        if (!payload) {
            return "ERR|Failed to safely parse alignment JSON payload.";
        }

        var style = payload.style || {};
        var targetLayers = [];
        if (targetComp.selectedLayers && targetComp.selectedLayers.length > 0) {
            for (var s = 0; s < targetComp.selectedLayers.length; s++) {
                if (isTextLayer(targetComp.selectedLayers[s])) {
                    targetLayers.push(targetComp.selectedLayers[s]);
                }
            }
        }

        if (targetLayers.length === 0) {
            return "ERR|No text layers selected. Please select one or more text layers in your timeline.";
        }

        app.beginUndoGroup("CGP Apply Alignment To Layers");

        var compWidth = targetComp.width;
        var compHeight = targetComp.height;

        var posVert = style.position || "bottom";
        var alignHoriz = style.align || "center";

        var posY = (posVert === "top") ? (compHeight * 0.15) : ((posVert === "center") ? (compHeight * 0.5) : (compHeight * 0.85));
        var posX = (alignHoriz === "left") ? (compWidth * 0.2) : ((alignHoriz === "right") ? (compWidth * 0.8) : (compWidth * 0.5));

        for (var i = 0; i < targetLayers.length; i++) {
            var textLayer = targetLayers[i];
            var start = textLayer.inPoint;

            // 1. Update text justification without clearing or overwriting text string
            try {
                var textProp = textLayer.property("Source Text");
                if (textProp && textProp.value) {
                    var textDocument = textProp.value;
                    if (alignHoriz === "left") {
                        textDocument.justification = ParagraphJustification.LEFT_JUSTIFY;
                    } else if (alignHoriz === "right") {
                        textDocument.justification = ParagraphJustification.RIGHT_JUSTIFY;
                    } else {
                        textDocument.justification = ParagraphJustification.CENTER_JUSTIFY;
                    }
                    textProp.setValue(textDocument);
                }
            } catch(eText) {}

            // 2. Align Anchor Point & Position without touching keyframes or animators
            try {
                var bounds = textLayer.sourceRectAtTime(start, false);
                var anchorX = bounds.left + bounds.width / 2;
                var anchorY = bounds.top + bounds.height / 2;

                textLayer.property("Anchor Point").setValue([anchorX, anchorY]);
                textLayer.property("Position").setValue([posX, posY]);
            } catch(ePos) {}
        }

        app.endUndoGroup();
        return "OK|Successfully applied alignment to " + targetLayers.length + " text layers!";
    } catch(e) {
        return "ERR|" + e.toString();
    }
};
