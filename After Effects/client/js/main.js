// Caption Generator ULTRA - After Effects Main Controller

// Comprehensive Whisper-supported Language Lists
var WHISPER_LANGUAGES_SOURCE = [
    { code: "auto", name: "Auto (Detect Automatically)" },
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "hi", name: "Hindi" },
    { code: "ta", name: "Tamil" },
    { code: "te", name: "Telugu" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "pt", name: "Portuguese" },
    { code: "ar", name: "Arabic" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "zh", name: "Chinese" },
    { code: "ru", name: "Russian" },
    { code: "it", name: "Italian" },
    { code: "nl", name: "Dutch" },
    { code: "tr", name: "Turkish" },
    { code: "pl", name: "Polish" },
    { code: "uk", name: "Ukrainian" },
    { code: "sv", name: "Swedish" },
    { code: "vi", name: "Vietnamese" },
    { code: "id", name: "Indonesian" },
    { code: "th", name: "Thai" },
    { code: "bn", name: "Bengali" },
    { code: "mr", name: "Marathi" },
    { code: "gu", name: "Gujarati" },
    { code: "kn", name: "Kannada" },
    { code: "ml", name: "Malayalam" },
    { code: "pa", name: "Punjabi" },
    { code: "fa", name: "Persian" },
    { code: "he", name: "Hebrew" },
    { code: "el", name: "Greek" },
    { code: "cs", name: "Czech" },
    { code: "ro", name: "Romanian" },
    { code: "hu", name: "Hungarian" },
    { code: "da", name: "Danish" },
    { code: "fi", name: "Finnish" },
    { code: "no", name: "Norwegian" },
    { code: "sk", name: "Slovak" },
    { code: "bg", name: "Bulgarian" },
    { code: "hr", name: "Croatian" },
    { code: "sr", name: "Serbian" },
    { code: "ms", name: "Malay" },
    { code: "ur", name: "Urdu" },
    { code: "sw", name: "Swahili" }
];

var WHISPER_LANGUAGES_TARGET = [
    { code: "none", name: "None (Original Language)" },
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "hi", name: "Hindi" },
    { code: "ta", name: "Tamil" },
    { code: "te", name: "Telugu" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "pt", name: "Portuguese" },
    { code: "ar", name: "Arabic" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "zh", name: "Chinese" },
    { code: "ru", name: "Russian" },
    { code: "it", name: "Italian" },
    { code: "nl", name: "Dutch" },
    { code: "tr", name: "Turkish" },
    { code: "pl", name: "Polish" },
    { code: "uk", name: "Ukrainian" },
    { code: "sv", name: "Swedish" },
    { code: "vi", name: "Vietnamese" },
    { code: "id", name: "Indonesian" },
    { code: "th", name: "Thai" },
    { code: "bn", name: "Bengali" },
    { code: "mr", name: "Marathi" },
    { code: "gu", name: "Gujarati" },
    { code: "kn", name: "Kannada" },
    { code: "ml", name: "Malayalam" },
    { code: "pa", name: "Punjabi" },
    { code: "fa", name: "Persian" },
    { code: "he", name: "Hebrew" },
    { code: "el", name: "Greek" },
    { code: "cs", name: "Czech" },
    { code: "ro", name: "Romanian" },
    { code: "hu", name: "Hungarian" },
    { code: "da", name: "Danish" },
    { code: "fi", name: "Finnish" },
    { code: "no", name: "Norwegian" },
    { code: "sk", name: "Slovak" },
    { code: "bg", name: "Bulgarian" },
    { code: "hr", name: "Croatian" },
    { code: "sr", name: "Serbian" },
    { code: "ms", name: "Malay" },
    { code: "ur", name: "Urdu" },
    { code: "sw", name: "Swahili" }
];

var SearchableSelect = {
    init: function(containerId, optionsList, onChangeCallback) {
        var container = document.getElementById(containerId);
        if (!container) return null;

        var input = container.querySelector(".search-select-input");
        var hidden = container.querySelector("input[type='hidden']");
        var dropdown = container.querySelector(".search-select-dropdown");
        var filter = container.querySelector(".search-select-filter");
        var optionsContainer = container.querySelector(".search-select-options");

        if (!input || !dropdown || !optionsContainer) return null;

        var renderOptions = function(query) {
            optionsContainer.innerHTML = "";
            var q = (query || "").toLowerCase();
            var filtered = optionsList.filter(function(opt) {
                return !q || opt.name.toLowerCase().indexOf(q) !== -1 || opt.code.toLowerCase().indexOf(q) !== -1;
            });

            if (filtered.length === 0) {
                var empty = document.createElement("div");
                empty.className = "search-select-empty";
                empty.innerText = "No matches found";
                optionsContainer.appendChild(empty);
                return;
            }

            filtered.forEach(function(opt) {
                var item = document.createElement("div");
                item.className = "search-select-item" + (hidden && hidden.value === opt.code ? " selected" : "");
                item.innerText = opt.name;
                item.addEventListener("click", function(e) {
                    e.stopPropagation();
                    if (hidden) hidden.value = opt.code;
                    input.value = opt.name;
                    dropdown.style.display = "none";
                    if (onChangeCallback) onChangeCallback(opt.code, opt.name);
                });
                optionsContainer.appendChild(item);
            });
        };

        input.addEventListener("click", function(e) {
            e.stopPropagation();
            document.querySelectorAll(".search-select-dropdown").forEach(function(d) {
                if (d !== dropdown) d.style.display = "none";
            });
            var isVisible = dropdown.style.display === "block";
            dropdown.style.display = isVisible ? "none" : "block";
            if (!isVisible) {
                if (filter) {
                    filter.value = "";
                    filter.focus();
                }
                renderOptions("");
            }
        });

        if (filter) {
            filter.addEventListener("input", function() {
                renderOptions(filter.value);
            });
            filter.addEventListener("click", function(e) {
                e.stopPropagation();
            });
        }

        document.addEventListener("click", function(e) {
            if (!container.contains(e.target)) {
                dropdown.style.display = "none";
            }
        });

        renderOptions("");

        return {
            setValue: function(code) {
                var found = optionsList.find(function(o) { return o.code === code; });
                if (found) {
                    if (hidden) hidden.value = found.code;
                    input.value = found.name;
                }
            }
        };
    }
};

var UserPreferences = {
    STORAGE_KEY: "cgp_ae_user_prefs_v2",

    defaults: {
        model: "base",
        sourceLang: "auto",
        targetLang: "none",
        removeFillers: true,
        versioning: true,
        maxChars: 37,
        maxDur: 30,
        gapFrames: 0,
        lineMode: "double",
        wordsPerLayer: "phrase",
        fontSize: 48,
        textColor: "#FFFFFF",
        position: "bottom",
        align: "center",
        importMethod: "direct",
        removeOldSubtitles: true,
        scope: "full",
        minPauseLength: 30
    },

    load: function() {
        try {
            var raw = localStorage.getItem(this.STORAGE_KEY);
            if (raw) return Object.assign({}, this.defaults, JSON.parse(raw));
        } catch(e) {}
        return Object.assign({}, this.defaults);
    },

    save: function(prefs) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(prefs));
        } catch(e) {}
    },

    gather: function() {
        var p = {};
        var selModel = document.getElementById("selectModel");
        if (selModel) p.model = selModel.value;

        var selSrc = document.getElementById("selectSourceLang");
        if (selSrc) p.sourceLang = selSrc.value;

        var selTgt = document.getElementById("selectTargetLang");
        if (selTgt) p.targetLang = selTgt.value;

        var chkFill = document.getElementById("chkRemoveFillers");
        if (chkFill) p.removeFillers = chkFill.checked;

        var chkVer = document.getElementById("chkVersioning");
        if (chkVer) p.versioning = chkVer.checked;

        var slChars = document.getElementById("sliderMaxChars");
        if (slChars) p.maxChars = parseInt(slChars.value, 10);

        var slDur = document.getElementById("sliderMaxDur");
        if (slDur) p.maxDur = parseInt(slDur.value, 10);

        var slGap = document.getElementById("sliderGapFrames");
        if (slGap) p.gapFrames = parseInt(slGap.value, 10);

        var radLine = document.querySelector('input[name="lineMode"]:checked');
        if (radLine) p.lineMode = radLine.value;

        var selWpl = document.getElementById("selectWordsPerLayer");
        if (selWpl) p.wordsPerLayer = selWpl.value;

        var slFont = document.getElementById("sliderFontSize");
        if (slFont) p.fontSize = parseInt(slFont.value, 10);

        var colTxt = document.getElementById("colorText");
        if (colTxt) p.textColor = colTxt.value;

        var inPos = document.getElementById("selectPosition");
        if (inPos) p.position = inPos.value;

        var inAlign = document.getElementById("selectAlign");
        if (inAlign) p.align = inAlign.value;

        var selImp = document.getElementById("selectImportMethod");
        if (selImp) p.importMethod = selImp.value;

        var chkRem = document.getElementById("chkRemoveOldSubtitles");
        if (chkRem) p.removeOldSubtitles = chkRem.checked;

        var selScope = document.getElementById("selectTranscribeScope");
        if (selScope) p.scope = selScope.value;

        var slMinPause = document.getElementById("sliderMinPause");
        if (slMinPause) p.minPauseLength = parseInt(slMinPause.value, 10);

        return p;
    },

    restore: function(prefs) {
        prefs = prefs || this.load();

        var selModel = document.getElementById("selectModel");
        if (selModel && prefs.model) selModel.value = prefs.model;

        if (window.SourceLangSelect && prefs.sourceLang) window.SourceLangSelect.setValue(prefs.sourceLang);
        if (window.TargetLangSelect && prefs.targetLang) window.TargetLangSelect.setValue(prefs.targetLang);

        var chkFill = document.getElementById("chkRemoveFillers");
        if (chkFill) chkFill.checked = (prefs.removeFillers !== false);

        var chkVer = document.getElementById("chkVersioning");
        if (chkVer) chkVer.checked = (prefs.versioning !== false);

        var slChars = document.getElementById("sliderMaxChars");
        if (slChars && prefs.maxChars) {
            slChars.value = prefs.maxChars;
            var lblC = document.getElementById("lblMaxCharsVal");
            if (lblC) lblC.innerText = prefs.maxChars;
        }

        var slDur = document.getElementById("sliderMaxDur");
        if (slDur && prefs.maxDur) {
            slDur.value = prefs.maxDur;
            var lblD = document.getElementById("lblMaxDurVal");
            if (lblD) lblD.innerText = (prefs.maxDur / 10.0).toFixed(1) + "s";
        }

        var slGap = document.getElementById("sliderGapFrames");
        if (slGap && prefs.gapFrames !== undefined) {
            slGap.value = prefs.gapFrames;
            var lblG = document.getElementById("lblGapFramesVal");
            if (lblG) lblG.innerText = prefs.gapFrames + " frames";
        }

        if (prefs.lineMode) {
            var rad = document.querySelector('input[name="lineMode"][value="' + prefs.lineMode + '"]');
            if (rad) rad.checked = true;
        }

        var selWpl = document.getElementById("selectWordsPerLayer");
        if (selWpl && prefs.wordsPerLayer) selWpl.value = prefs.wordsPerLayer;

        var slFont = document.getElementById("sliderFontSize");
        if (slFont && prefs.fontSize) {
            slFont.value = prefs.fontSize;
            var lblF = document.getElementById("lblFontSizeVal");
            if (lblF) lblF.innerText = prefs.fontSize + "px";
        }

        var colTxt = document.getElementById("colorText");
        if (colTxt && prefs.textColor) colTxt.value = prefs.textColor;

        if (prefs.position) {
            var inPos = document.getElementById("selectPosition");
            if (inPos) inPos.value = prefs.position;
            document.querySelectorAll("#groupPosition .icon-toggle-btn").forEach(function(b) {
                b.classList.toggle("active", b.getAttribute("data-val") === prefs.position);
            });
        }

        if (prefs.align) {
            var inAlign = document.getElementById("selectAlign");
            if (inAlign) inAlign.value = prefs.align;
            document.querySelectorAll("#groupAlign .icon-toggle-btn").forEach(function(b) {
                b.classList.toggle("active", b.getAttribute("data-val") === prefs.align);
            });
        }

        var selImp = document.getElementById("selectImportMethod");
        if (selImp && prefs.importMethod) selImp.value = prefs.importMethod;

        var chkRem = document.getElementById("chkRemoveOldSubtitles");
        if (chkRem) chkRem.checked = (prefs.removeOldSubtitles !== false);

        var selScope = document.getElementById("selectTranscribeScope");
        if (selScope && prefs.scope) selScope.value = prefs.scope;

        var slMinPause = document.getElementById("sliderMinPause");
        if (slMinPause && prefs.minPauseLength) {
            slMinPause.value = prefs.minPauseLength;
            var lblP = document.getElementById("lblMinPauseVal");
            if (lblP) lblP.innerText = (prefs.minPauseLength / 100.0).toFixed(2) + "s";
        }
    },

    autoSave: function() {
        this.save(this.gather());
    }
};

function setupIconToggleGroups() {
    function bindGroup(groupId, hiddenInputId) {
        var group = document.getElementById(groupId);
        var hiddenInput = document.getElementById(hiddenInputId);
        if (!group || !hiddenInput) return;

        var btns = group.querySelectorAll(".icon-toggle-btn");
        btns.forEach(function(btn) {
            btn.addEventListener("click", function(e) {
                e.preventDefault();
                btns.forEach(function(b) { b.classList.remove("active"); });
                btn.classList.add("active");
                hiddenInput.value = btn.getAttribute("data-val");
                UserPreferences.autoSave();
            });
        });
    }

    bindGroup("groupPosition", "selectPosition");
    bindGroup("groupAlign", "selectAlign");
}

// Active Comp & Scope Manager
var ActiveCompState = {
    compName: "No Active Comp",
    duration: 0,
    layerCount: 0,
    workStart: 0,
    workDur: 0,
    hasComp: false,
    selectedLayersCount: 0,
    selectedLayersDuration: 0,
    selectedLayersNames: ""
};

function pollActiveCompInfo() {
    ExtendScriptBridge.getActiveCompInfo(function(res) {
        var lblName = document.getElementById("lblActiveCompName");
        var lblDur = document.getElementById("lblActiveCompDur");
        var lblLayers = document.getElementById("lblActiveCompLayers");
        var badge = document.getElementById("lblCompStatusBadge");

        if (res && res.success) {
            ActiveCompState.hasComp = true;
            ActiveCompState.compName = res.compName;
            ActiveCompState.duration = res.duration;
            ActiveCompState.layerCount = res.layerCount;
            ActiveCompState.workStart = res.workStart;
            ActiveCompState.workDur = res.workDur;

            if (lblName) lblName.innerText = res.compName;
            if (lblDur) lblDur.innerText = fmtTime(res.duration, "display");
            if (lblLayers) lblLayers.innerText = res.layerCount + " Layers in Timeline";

            if (badge) {
                badge.className = "badge-status " + (SubtitleEditor.captions.length > 0 ? "transcribed" : "untranscribed");
                badge.innerText = (SubtitleEditor.captions.length > 0 ? "Transcribed" : "Untranscribed");
            }
        } else {
            ActiveCompState.hasComp = false;
            if (lblName) lblName.innerText = "No Composition Open";
            if (lblDur) lblDur.innerText = "--:--";
            if (lblLayers) lblLayers.innerText = "Open a comp in After Effects";
            if (badge) {
                badge.className = "badge-status no-sequence";
                badge.innerText = "No Comp";
            }
        }

        updateScopeUI();
    });
}

function updateScopeUI() {
    var selScope = document.getElementById("selectTranscribeScope");
    var badge = document.getElementById("lblScopeBadge");
    var statusText = document.getElementById("lblScopeStatus");
    var notice = document.getElementById("scopeSelectionNotice");
    var btn = document.getElementById("btnTranscribe");

    if (!selScope) return;
    var scopeVal = selScope.value || "full";

    if (scopeVal === "full") {
        if (badge) badge.innerText = "Full Comp";
        if (statusText) statusText.innerText = "Scope: Full Composition (" + fmtTime(ActiveCompState.duration, "display") + ")";
        if (notice) notice.style.display = "none";
        if (btn) {
            btn.disabled = !ActiveCompState.hasComp;
            btn.innerText = "Transcribe Active Comp";
        }
    } else if (scopeVal === "workarea") {
        if (badge) badge.innerText = "Work Area";
        if (statusText) statusText.innerText = "Scope: Work Area (" + fmtTime(ActiveCompState.workStart, "display") + " to " + fmtTime(ActiveCompState.workStart + ActiveCompState.workDur, "display") + ")";
        if (notice) notice.style.display = "none";
        if (btn) {
            btn.disabled = !ActiveCompState.hasComp;
            btn.innerText = "Transcribe Work Area";
        }
    } else if (scopeVal === "selected") {
        if (badge) badge.innerText = "Selected Layers";
        ExtendScriptBridge.getSelectedLayersInfo(function(selRes) {
            var count = (selRes && selRes.selectedCount) ? selRes.selectedCount : 0;
            var dur = (selRes && selRes.totalDuration) ? selRes.totalDuration : 0;
            var names = (selRes && selRes.layers) ? selRes.layers.map(function(l) { return l.name; }).join(", ") : "";

            ActiveCompState.selectedLayersCount = count;
            ActiveCompState.selectedLayersDuration = dur;
            ActiveCompState.selectedLayersNames = names;

            if (count === 0) {
                if (statusText) statusText.innerText = "No layers selected in timeline.";
                if (notice) notice.style.display = "block";
                if (btn) {
                    btn.disabled = true;
                    btn.innerText = "Select Layer(s) in Timeline";
                }
            } else {
                if (statusText) statusText.innerText = "Scope: Selected Layers (" + count + " selected: " + names + " - " + dur.toFixed(1) + "s total)";
                if (notice) notice.style.display = "none";
                if (btn) {
                    btn.disabled = false;
                    btn.innerText = "Transcribe Selected Layers (" + count + ")";
                }
            }
        });
    }
}

// Interactive Transcript Viewer Controller
var TranscriptViewer = {
    words: [],
    minPauseLength: 0.30,
    showFillers: false,
    showCensored: false,
    showPauses: true,
    searchQuery: "",
    matchCase: false,
    wholeWord: false,

    render: function(wordsList) {
        try {
            this.words = wordsList || [];
            var container = document.getElementById("transcriptBody");
            var wordCountBadge = document.getElementById("lblWordCountBadge");
            var statsEl = document.getElementById("lblTranscriptStats");
            var successContainer = document.getElementById("transcribeSuccessContainer");
            var debugBanner = document.getElementById("transcriptDebugBanner");

            if (successContainer) {
                successContainer.style.removeProperty("display");
                successContainer.style.setProperty("display", "flex", "important");
                successContainer.style.setProperty("visibility", "visible", "important");
                successContainer.style.setProperty("opacity", "1", "important");
            }

            if (!container) {
                console.error("Transcript container #transcriptBody not found in DOM");
                if (debugBanner) {
                    debugBanner.style.display = "block";
                    debugBanner.innerText = `[Error] #transcriptBody element missing in DOM!`;
                }
                return;
            }

            container.innerHTML = "";
            var totalWords = this.words.length;
            if (wordCountBadge) wordCountBadge.innerText = totalWords + (totalWords === 1 ? " Word" : " Words");

            if (totalWords === 0) {
                container.innerHTML = '<div style="text-align: center; color: var(--text-muted); padding: 24px; font-size: 11px;">Transcription finished but no words were parsed.</div>';
                if (statsEl) statsEl.innerText = "0 words • 0 pauses • 0 paragraphs";
                if (debugBanner) {
                    debugBanner.style.display = "block";
                    debugBanner.innerHTML = `<div style="margin-bottom: 2px;">[Transcript Loaded] Words: 0 | Captions: ${SubtitleEditor.captions.length} | Status: Empty</div>` +
                        `<div>[DOM Diagnostic] transcriptBody childCount: ${container.children.length} | textLength: ${(container.innerText || "").length}</div>`;
                }
                return;
            }

            var self = this;
            var pDiv = document.createElement("div");
            pDiv.className = "transcript-paragraph";

            var pauseCount = 0;
            var paragraphCount = 1;

            for (var i = 0; i < this.words.length; i++) {
                var item = this.words[i];
                var wordStr = (item.word !== undefined ? item.word : (item.text !== undefined ? item.text : (item.value || ""))).trim();
                if (!wordStr) continue;

                // Word span
                var wordSpan = document.createElement("span");
                wordSpan.className = "transcript-word";
                wordSpan.innerText = wordStr + " ";
                wordSpan.dataset.start = item.start;
                wordSpan.dataset.end = item.end;
                wordSpan.dataset.index = i;

                if (self.searchQuery && self.matchesSearch(wordStr)) {
                    wordSpan.classList.add("word-search-match");
                }

                if (self.showFillers && item.is_filler) {
                    wordSpan.classList.add("word-filler");
                }

                if (self.showCensored && item.is_censored) {
                    wordSpan.classList.add("word-censored");
                }

                (function(startSec, spanEl) {
                    spanEl.addEventListener("click", function() {
                        ExtendScriptBridge.setPlayhead(startSec);
                        document.querySelectorAll(".transcript-word").forEach(function(w) { w.classList.remove("word-playhead-active"); });
                        spanEl.classList.add("word-playhead-active");
                    });
                })(item.start, wordSpan);

                pDiv.appendChild(wordSpan);

                // Check for pause or paragraph break to next word
                if (i < this.words.length - 1) {
                    var nextItem = this.words[i + 1];
                    var gap = (parseFloat(nextItem.start) || 0) - (parseFloat(item.end) || 0);

                    if (gap >= self.minPauseLength && self.showPauses) {
                        pauseCount++;
                        var pauseSpan = document.createElement("span");
                        pauseSpan.className = "transcript-pause";
                        pauseSpan.innerText = `[${gap.toFixed(2)}s]`;
                        pauseSpan.title = `Pause: ${gap.toFixed(2)}s. Click to jump playhead.`;

                        (function(pStart) {
                            pauseSpan.addEventListener("click", function() {
                                ExtendScriptBridge.setPlayhead(pStart);
                            });
                        })(item.end);

                        pDiv.appendChild(pauseSpan);
                        pDiv.appendChild(document.createTextNode(" "));
                    }

                    // Break into paragraphs for natural sentence breaks
                    var isPunctuationEnd = /[.!?]$/.test(wordStr);
                    if (gap >= 2.0 || (isPunctuationEnd && gap >= 0.8)) {
                        container.appendChild(pDiv);
                        pDiv = document.createElement("div");
                        pDiv.className = "transcript-paragraph";
                        paragraphCount++;
                    }
                }
            }

            if (pDiv.childNodes.length > 0) {
                container.appendChild(pDiv);
            }

            if (statsEl) {
                statsEl.innerText = `${totalWords} words • ${pauseCount} pauses • ${paragraphCount} paragraphs`;
            }

            if (debugBanner) {
                var childCount = container ? container.children.length : 0;
                var textLen = container ? (container.innerText || "").length : 0;
                debugBanner.style.display = "block";
                debugBanner.innerHTML = `<div style="margin-bottom: 2px;">[Transcript Loaded] Words: ${this.words.length} | Captions: ${SubtitleEditor.captions.length} | Status: Visible</div>` +
                    `<div>[DOM Diagnostic] transcriptBody childCount: ${childCount} | textLength: ${textLen}</div>`;
            }

            this.updateSearchMatches();
        } catch(renderErr) {
            console.error("TranscriptViewer.render error:", renderErr);
            var dbg = document.getElementById("transcriptDebugBanner");
            if (dbg) {
                dbg.style.display = "block";
                dbg.style.color = "var(--danger)";
                dbg.innerText = "[Render Error] " + renderErr.toString();
            }
        }
    },

    matchesSearch: function(text) {
        if (!this.searchQuery) return false;
        var q = this.matchCase ? this.searchQuery : this.searchQuery.toLowerCase();
        var t = this.matchCase ? text : text.toLowerCase();
        if (this.wholeWord) {
            return t.replace(/[.,!?;:"]/g, "") === q;
        }
        return t.indexOf(q) !== -1;
    },

    updateSearchMatches: function() {
        var lbl = document.getElementById("lblSearchMatches");
        if (!lbl) return;
        if (!this.searchQuery) {
            lbl.innerText = "";
            return;
        }
        var matches = document.querySelectorAll(".word-search-match").length;
        lbl.innerText = matches + " found";
    },

    replaceOne: function(replaceText) {
        var match = document.querySelector(".word-search-match");
        if (match) {
            var idx = parseInt(match.dataset.index, 10);
            if (!isNaN(idx) && this.words[idx]) {
                this.words[idx].word = replaceText;
                this.render(this.words);
                SubtitleEditor.loadCaptions(SubtitleEditor.captions, this.words);
            }
        }
    },

    replaceAll: function(replaceText) {
        var self = this;
        var count = 0;
        this.words.forEach(function(item) {
            var wordStr = (item.word || item.text || "").trim();
            if (self.matchesSearch(wordStr)) {
                item.word = replaceText;
                count++;
            }
        });
        if (count > 0) {
            this.render(this.words);
            SubtitleEditor.loadCaptions(SubtitleEditor.captions, this.words);
        }
    }
};

// Main DOM Ready Setup
document.addEventListener("DOMContentLoaded", function() {
    // 1. Language Searchable Selects
    window.SourceLangSelect = SearchableSelect.init("containerSourceLang", WHISPER_LANGUAGES_SOURCE, function() {
        UserPreferences.autoSave();
    });

    window.TargetLangSelect = SearchableSelect.init("containerTargetLang", WHISPER_LANGUAGES_TARGET, function() {
        UserPreferences.autoSave();
    });

    // 2. Tab Navigation (3 Tabs)
    var tabs = document.querySelectorAll(".tab-btn");
    tabs.forEach(function(tab) {
        tab.addEventListener("click", function() {
            tabs.forEach(t => t.classList.remove("active"));
            document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

            tab.classList.add("active");
            var targetId = tab.getAttribute("data-tab");
            var target = document.getElementById(targetId);
            if (target) target.classList.add("active");

            // Refresh settings whenever user enters Settings tab
            if (targetId === "tab-settings" && typeof SettingsManager !== "undefined") {
                SettingsManager.checkLicenseStatus();
                SettingsManager.renderModelManager();
            }

            // Ensure transcript container and words stay rendered when switching to Transcript tab
            if (targetId === "tab-transcribe") {
                if (TranscriptViewer.words && TranscriptViewer.words.length > 0) {
                    var sc = document.getElementById("transcribeSuccessContainer");
                    if (sc) {
                        sc.style.removeProperty("display");
                        sc.style.setProperty("display", "flex", "important");
                        sc.style.setProperty("visibility", "visible", "important");
                        sc.style.setProperty("opacity", "1", "important");
                    }
                    TranscriptViewer.render(TranscriptViewer.words);
                }
            }
        });
    });

    // 3. Setup Icon Toggles & Preferences
    setupIconToggleGroups();
    SubtitleEditor.init();

    var savedPrefs = UserPreferences.load();
    UserPreferences.restore(savedPrefs);

    // 4. Initialize Settings Manager
    if (typeof SettingsManager !== "undefined") {
        SettingsManager.init();
    }

    // 5. Bind Form Sliders & Controls
    var sliderChars = document.getElementById("sliderMaxChars");
    if (sliderChars) {
        sliderChars.addEventListener("input", function() {
            var lbl = document.getElementById("lblMaxCharsVal");
            if (lbl) lbl.innerText = sliderChars.value;
            UserPreferences.autoSave();
        });
    }

    var sliderDur = document.getElementById("sliderMaxDur");
    if (sliderDur) {
        sliderDur.addEventListener("input", function() {
            var lbl = document.getElementById("lblMaxDurVal");
            if (lbl) lbl.innerText = (parseFloat(sliderDur.value) / 10.0).toFixed(1) + "s";
            UserPreferences.autoSave();
        });
    }

    var sliderGap = document.getElementById("sliderGapFrames");
    if (sliderGap) {
        sliderGap.addEventListener("input", function() {
            var lbl = document.getElementById("lblGapFramesVal");
            if (lbl) lbl.innerText = sliderGap.value + " frames";
            UserPreferences.autoSave();
        });
    }

    var sliderFont = document.getElementById("sliderFontSize");
    if (sliderFont) {
        sliderFont.addEventListener("input", function() {
            var lbl = document.getElementById("lblFontSizeVal");
            if (lbl) lbl.innerText = sliderFont.value + "px";
            UserPreferences.autoSave();
        });
    }

    var colText = document.getElementById("colorText");
    if (colText) {
        colText.addEventListener("change", function() { UserPreferences.autoSave(); });
    }

    var selWpl = document.getElementById("selectWordsPerLayer");
    if (selWpl) {
        selWpl.addEventListener("change", function() {
            UserPreferences.autoSave();
            SubtitleEditor.regenerateFromTranscript();
        });
    }

    var selScope = document.getElementById("selectTranscribeScope");
    if (selScope) {
        selScope.addEventListener("change", function() {
            UserPreferences.autoSave();
            updateScopeUI();
        });
    }

    // 6. Transcript Search & Filter Controls
    var searchInput = document.getElementById("transcriptSearchInput");
    var btnClearSearch = document.getElementById("btnClearSearch");
    var btnMatchCase = document.getElementById("btnMatchCase");
    var btnWholeWord = document.getElementById("btnWholeWord");

    if (searchInput) {
        searchInput.addEventListener("input", function() {
            TranscriptViewer.searchQuery = searchInput.value;
            if (btnClearSearch) btnClearSearch.style.display = searchInput.value ? "inline-block" : "none";
            TranscriptViewer.render(TranscriptViewer.words);
        });
    }

    if (btnClearSearch) {
        btnClearSearch.addEventListener("click", function() {
            if (searchInput) searchInput.value = "";
            TranscriptViewer.searchQuery = "";
            btnClearSearch.style.display = "none";
            TranscriptViewer.render(TranscriptViewer.words);
        });
    }

    if (btnMatchCase) {
        btnMatchCase.addEventListener("click", function() {
            TranscriptViewer.matchCase = !TranscriptViewer.matchCase;
            btnMatchCase.classList.toggle("active", TranscriptViewer.matchCase);
            TranscriptViewer.render(TranscriptViewer.words);
        });
    }

    if (btnWholeWord) {
        btnWholeWord.addEventListener("click", function() {
            TranscriptViewer.wholeWord = !TranscriptViewer.wholeWord;
            btnWholeWord.classList.toggle("active", TranscriptViewer.wholeWord);
            TranscriptViewer.render(TranscriptViewer.words);
        });
    }

    var btnReplaceOne = document.getElementById("btnReplaceOne");
    if (btnReplaceOne) {
        btnReplaceOne.addEventListener("click", function() {
            var rep = document.getElementById("inputReplaceText");
            if (rep) TranscriptViewer.replaceOne(rep.value);
        });
    }

    var btnReplaceAll = document.getElementById("btnReplaceAll");
    if (btnReplaceAll) {
        btnReplaceAll.addEventListener("click", function() {
            var rep = document.getElementById("inputReplaceText");
            if (rep) TranscriptViewer.replaceAll(rep.value);
        });
    }

    var pillFillers = document.getElementById("pillFillerWords");
    if (pillFillers) {
        pillFillers.addEventListener("click", function() {
            TranscriptViewer.showFillers = !TranscriptViewer.showFillers;
            pillFillers.classList.toggle("active-filler", TranscriptViewer.showFillers);
            TranscriptViewer.render(TranscriptViewer.words);
        });
    }

    var pillCensored = document.getElementById("pillCensoredWords");
    if (pillCensored) {
        pillCensored.addEventListener("click", function() {
            TranscriptViewer.showCensored = !TranscriptViewer.showCensored;
            pillCensored.classList.toggle("active-censored", TranscriptViewer.showCensored);
            TranscriptViewer.render(TranscriptViewer.words);
        });
    }

    var pillPauses = document.getElementById("pillPauses");
    if (pillPauses) {
        pillPauses.addEventListener("click", function() {
            TranscriptViewer.showPauses = !TranscriptViewer.showPauses;
            pillPauses.classList.toggle("active-pauses", TranscriptViewer.showPauses);
            TranscriptViewer.render(TranscriptViewer.words);
        });
    }

    var btnTranscriptOpts = document.getElementById("btnTranscriptOptions");
    var menuOpts = document.getElementById("transcriptOptionsMenu");
    if (btnTranscriptOpts && menuOpts) {
        btnTranscriptOpts.addEventListener("click", function(e) {
            e.stopPropagation();
            menuOpts.classList.toggle("show");
        });
        document.addEventListener("click", function(e) {
            if (!menuOpts.contains(e.target)) menuOpts.classList.remove("show");
        });
    }

    var sliderMinPause = document.getElementById("sliderMinPause");
    if (sliderMinPause) {
        sliderMinPause.addEventListener("input", function() {
            var sec = parseFloat(sliderMinPause.value) / 100.0;
            var lbl = document.getElementById("lblMinPauseVal");
            if (lbl) lbl.innerText = sec.toFixed(2) + "s";
            TranscriptViewer.minPauseLength = sec;
            TranscriptViewer.render(TranscriptViewer.words);
            UserPreferences.autoSave();
        });
    }

    // 7. Action Buttons
    var btnTranscribe = document.getElementById("btnTranscribe");
    var btnCancelTranscribe = document.getElementById("btnCancelTranscribe");
    var btnApplyEdits = document.getElementById("btnApplyEdits");
    var btnExportSRT = document.getElementById("btnExportSRT");
    var btnTranscriptCreateLayers = document.getElementById("btnTranscriptCreateLayers");
    var btnExportTranscriptTXT = document.getElementById("btnExportTranscriptTXT");
    var btnExportTranscriptJSON = document.getElementById("btnExportTranscriptJSON");

    if (btnTranscribe) {
        btnTranscribe.addEventListener("click", function() {
            runTranscribeWorkflow();
        });
    }

    if (btnCancelTranscribe) {
        btnCancelTranscribe.addEventListener("click", function() {
            cancelTranscribeWorkflow();
        });
    }

    if (btnApplyEdits) {
        btnApplyEdits.addEventListener("click", function() {
            importSubtitlesToSequence();
        });
    }

    if (btnTranscriptCreateLayers) {
        btnTranscriptCreateLayers.addEventListener("click", function() {
            importSubtitlesToSequence();
        });
    }

    if (btnExportTranscriptTXT) {
        btnExportTranscriptTXT.addEventListener("click", function() {
            exportTranscriptTXT();
        });
    }

    if (btnExportTranscriptJSON) {
        btnExportTranscriptJSON.addEventListener("click", function() {
            exportTranscriptJSON();
        });
    }

    if (btnExportSRT) {
        btnExportSRT.addEventListener("click", function() {
            exportSRTFile();
        });
    }

    // 8. Modals
    var btnModalCancel = document.getElementById("btnModalCancel");
    var btnModalClose = document.getElementById("btnModalClose");
    if (btnModalCancel) {
        btnModalCancel.addEventListener("click", function() {
            DependencyInstaller.cancelDownload();
            var log = document.getElementById("statusLog");
            if (log) log.innerText = "Download cancelled by user.";
            btnModalCancel.style.display = "none";
            if (btnModalClose) btnModalClose.style.display = "inline-block";
        });
    }
    if (btnModalClose) {
        btnModalClose.addEventListener("click", function() {
            var modal = document.getElementById("installerModal");
            if (modal) modal.style.display = "none";
        });
    }

    // 9. Background Check & Model Dropdown
    DependencyInstaller.checkStatus(function(status) {
        if (status && status.installed_models) {
            updateModelDropdown(status.installed_models);
            var savedModel = UserPreferences.load().model;
            var sel = document.getElementById("selectModel");
            if (sel && savedModel) sel.value = savedModel;
        }
    });

    // 10. Active Composition Polling Loop
    pollActiveCompInfo();
    setInterval(pollActiveCompInfo, 2000);
});

var ALL_MODELS_ORDER = [
    { key: "tiny", name: "Tiny (75 MB)" },
    { key: "base", name: "Base (145 MB)" },
    { key: "small", name: "Small (480 MB)" },
    { key: "medium", name: "Medium (1.5 GB)" },
    { key: "large-v3", name: "Large-v3 (3.0 GB)" }
];

function updateModelDropdown(installedModels) {
    var select = document.getElementById("selectModel");
    if (!select) return;

    installedModels = installedModels || [];
    var currentVal = select.value || "base";

    select.innerHTML = "";

    ALL_MODELS_ORDER.forEach(function(m) {
        var opt = document.createElement("option");
        opt.value = m.key;
        var isInstalled = installedModels.indexOf(m.key) !== -1;
        opt.innerText = m.name + (isInstalled ? " [Installed]" : "");
        select.appendChild(opt);
    });

    if (installedModels.indexOf(currentVal) !== -1) {
        select.value = currentVal;
    } else if (installedModels.length > 0) {
        select.value = installedModels[0];
    } else {
        select.value = "base";
    }
}

function showInstallerModalForModel(modelKey) {
    var modal = document.getElementById("installerModal");
    var title = document.getElementById("installerModalTitle");
    var statusLog = document.getElementById("statusLog");
    var statusMetrics = document.getElementById("statusMetrics");
    var fill = document.getElementById("progressFill");
    var cancelBtn = document.getElementById("btnModalCancel");
    var closeBtn = document.getElementById("btnModalClose");

    if (!modal) return;

    if (title) title.innerText = "Downloading " + modelKey.toUpperCase() + " Speech Model";
    modal.style.display = "flex";
    fill.style.width = "0%";
    statusLog.innerText = "Connecting to server...";
    if (statusMetrics) {
        statusMetrics.style.display = "none";
        statusMetrics.innerText = "";
    }
    cancelBtn.style.display = "inline-block";
    closeBtn.style.display = "none";

    DependencyInstaller.installModel(modelKey,
        function (percent, msg) {
            fill.style.width = percent + "%";

            if (msg && msg.indexOf(" | Speed:") !== -1) {
                var parts = msg.split(" | ");
                statusLog.innerText = "Downloading file: " + parts[0];
                if (statusMetrics) {
                    statusMetrics.style.display = "block";
                    statusMetrics.innerText = parts[1] + "  |  " + parts[2];
                }
            } else {
                statusLog.innerText = msg;
                if (statusMetrics) statusMetrics.style.display = "none";
            }
        },
        function (err, res) {
            cancelBtn.style.display = "none";
            closeBtn.style.display = "inline-block";
            if (err) {
                statusLog.innerText = "Download error: " + err;
                if (statusMetrics) statusMetrics.style.display = "none";
            } else {
                statusLog.innerText = "Model installed successfully!";
                if (statusMetrics) statusMetrics.style.display = "none";
                fill.style.width = "100%";
                DependencyInstaller.checkStatus(function (status) {
                    if (status && status.installed_models) {
                        updateModelDropdown(status.installed_models);
                    }
                    if (SettingsManager) {
                        SettingsManager.renderModelManager();
                    }
                });
            }
        }
    );
}

function ensureLicensedAction(actionName, callback) {
    if (typeof LicenseManager === "undefined") {
        showAlertModal("License Required", "License not activated. Please activate your license in Settings.");
        return;
    }

    LicenseManager.validate(function(valid) {
        if (valid) {
            callback();
        } else {
            showAlertModal("License Required", "License not activated. Please activate your license in Settings.");
        }
    });
}

var activePythonProcess = null;
var isTranscriptionCancelled = false;

function cancelTranscribeWorkflow() {
    isTranscriptionCancelled = true;
    if (activePythonProcess) {
        try {
            var pid = activePythonProcess.pid;
            if (process.platform === "win32") {
                var cp = require("child_process");
                cp.exec("taskkill /F /T /PID " + pid, function () {});
            } else {
                activePythonProcess.kill("SIGKILL");
            }
        } catch (e) {}
        activePythonProcess = null;
    }

    var btn = document.getElementById("btnTranscribe");
    var btnCancel = document.getElementById("btnCancelTranscribe");
    var prog = document.getElementById("transcribeProgressContainer");

    if (btn) {
        btn.disabled = false;
        btn.innerText = "Transcribe Active Comp";
    }
    if (btnCancel) btnCancel.style.display = "none";
    if (prog) prog.style.display = "none";

    showAlertModal("Transcription Cancelled", "Transcription cancelled by user.");
}

function runTranscribeWorkflow() {
    ensureLicensedAction("transcribe", function() {
        var btn = document.getElementById("btnTranscribe");
        var btnCancel = document.getElementById("btnCancelTranscribe");
        var prog = document.getElementById("transcribeProgressContainer");
        var statusLog = document.getElementById("transcribeStatusLog");
        var progFill = document.getElementById("transcribeProgressFill");
        var progPct = document.getElementById("transcribePercentVal");

        if (!btn || btn.disabled) return;

        var selScope = document.getElementById("selectTranscribeScope");
        var scopeMode = selScope ? selScope.value : "full";

        if (scopeMode === "selected" && ActiveCompState.selectedLayersCount === 0) {
            showAlertModal("No Layers Selected", "Please select one or more layers in the After Effects timeline before transcribing.");
            return;
        }

        isTranscriptionCancelled = false;
        var originalText = btn.innerText;
        btn.disabled = true;
        btn.innerText = "Checking Engine...";

        DependencyInstaller.checkStatus(function(status) {
            if (status && status.installed_models) {
                updateModelDropdown(status.installed_models);
            }

            if (!status || !status.python || !status.whisper_pkg || !status.pytorch) {
                btn.disabled = false;
                btn.innerText = originalText;
                showAlertModal("AI Runtime Error", "Bundled AI runtime not found. Please reinstall using install.bat.");
                return;
            }

            var selModelEl = document.getElementById("selectModel");
            var selectedModel = selModelEl ? selModelEl.value : "base";
            var installedModels = (status && status.installed_models) ? status.installed_models : [];

            if (installedModels.indexOf(selectedModel) === -1) {
                btn.disabled = false;
                btn.innerText = originalText;
                showAlertModal("Model Required", "Selected model is not installed. Please download it from Settings -> Speech Models Manager.");
                return;
            }

            if (!status.ffmpeg) {
                btn.disabled = false;
                btn.innerText = originalText;
                showAlertModal("FFmpeg Error", "FFmpeg is missing from bin folder.");
                return;
            }

            btn.innerText = "Extracting Audio...";
            if (btnCancel) btnCancel.style.display = "inline-block";
            if (prog) prog.style.display = "block";
            if (statusLog) statusLog.innerText = "Extracting composition audio...";
            if (progFill) progFill.style.width = "20%";
            if (progPct) progPct.innerText = "20%";

            ExtendScriptBridge.getProjectDetails(function(projectDetails) {
                if (isTranscriptionCancelled) return;
                var tempAudioPath = getTempAudioPath();

                ExtendScriptBridge.exportAudio(tempAudioPath, scopeMode, function(exportRes) {
                    if (isTranscriptionCancelled) return;

                    if (!exportRes || !exportRes.success) {
                        btn.disabled = false;
                        btn.innerText = originalText;
                        if (btnCancel) btnCancel.style.display = "none";
                        if (prog) prog.style.display = "none";
                        showAlertModal("Composition Error", exportRes ? exportRes.error : "No audio/video found on the active composition.");
                        return;
                    }

                    if (statusLog) statusLog.innerText = "Transcribing with Whisper AI...";
                    if (progFill) progFill.style.width = "50%";
                    if (progPct) progPct.innerText = "50%";

                    runPythonBackend(exportRes.audioPath, projectDetails, function(backendRes) {
                        if (btnCancel) btnCancel.style.display = "none";
                        if (prog) prog.style.display = "none";
                        if (isTranscriptionCancelled) return;

                        if (!backendRes || !backendRes.success) {
                            btn.disabled = false;
                            btn.innerText = originalText;
                            var rawErr = (backendRes && backendRes.error) ? backendRes.error : "Unknown backend engine error";
                            showAlertModal("Transcription Error", "Transcription failed.\n\nDetails:\n" + rawErr);
                            return;
                        }

                        if (progFill) progFill.style.width = "100%";
                        if (progPct) progPct.innerText = "100%";
                        btn.disabled = false;
                        btn.innerText = "Done!";
                        setTimeout(function () {
                            btn.innerText = originalText;
                        }, 1800);

                        var offset = parseFloat(exportRes.exportStart) || 0;
                        var rawCaptions = backendRes.captions || backendRes.cues || backendRes.subtitles || [];
                        var rawWords = backendRes.words || backendRes.words_list || backendRes.word_timestamps || backendRes.tokens || [];

                        // 1. Normalize captions with offset
                        var finalCaptions = rawCaptions.map(function(c) {
                            var s = parseFloat(c.start !== undefined ? c.start : c.startTime) || 0;
                            var e = parseFloat(c.end !== undefined ? c.end : c.endTime) || (s + 1.0);
                            return {
                                start: Math.round((s + offset) * 1000) / 1000,
                                end: Math.round((e + offset) * 1000) / 1000,
                                text: (c.text !== undefined ? c.text : (c.caption || c.content || "")).trim()
                            };
                        });

                        // 2. Normalize words with offset
                        var finalWords = [];
                        if (rawWords && rawWords.length > 0) {
                            finalWords = rawWords.map(function(w) {
                                var s = parseFloat(w.start !== undefined ? w.start : w.startTime) || 0;
                                var e = parseFloat(w.end !== undefined ? w.end : w.endTime) || (s + 0.2);
                                var wStr = (w.word !== undefined ? w.word : (w.text !== undefined ? w.text : (w.value || ""))).trim();
                                return {
                                    word: wStr,
                                    start: Math.round((s + offset) * 1000) / 1000,
                                    end: Math.round((e + offset) * 1000) / 1000,
                                    is_filler: Boolean(w.is_filler),
                                    is_censored: Boolean(w.is_censored)
                                };
                            }).filter(function(w) { return Boolean(w.word); });
                        }

                        // 3. Fallback: If words array is empty, derive directly from caption cues
                        if (finalWords.length === 0 && finalCaptions.length > 0) {
                            finalCaptions.forEach(function(cap) {
                                var capText = (cap.text || "").trim();
                                if (!capText) return;
                                var tokens = capText.split(/\s+/);
                                var cStart = parseFloat(cap.start) || 0;
                                var cEnd = parseFloat(cap.end) || (cStart + 1.0);
                                var cDur = Math.max(0.05, cEnd - cStart);
                                var durPer = cDur / Math.max(1, tokens.length);

                                tokens.forEach(function(tStr, tIdx) {
                                    if (!tStr.trim()) return;
                                    var s = cStart + (tIdx * durPer);
                                    var e = s + durPer;
                                    finalWords.push({
                                        word: tStr.trim(),
                                        start: Math.round(s * 1000) / 1000,
                                        end: Math.round(e * 1000) / 1000,
                                        is_filler: false,
                                        is_censored: false
                                    });
                                });
                            });
                        }

                        // 4. Populate Subtitle Editor (Captions Tab)
                        SubtitleEditor.loadCaptions(finalCaptions, finalWords);

                        // 5. Force Display and Render Interactive Transcript (Transcript Tab)
                        var successContainer = document.getElementById("transcribeSuccessContainer");
                        if (successContainer) {
                            successContainer.style.removeProperty("display");
                            successContainer.style.setProperty("display", "flex", "important");
                            successContainer.style.setProperty("visibility", "visible", "important");
                            successContainer.style.setProperty("opacity", "1", "important");
                        }

                        TranscriptViewer.render(finalWords);

                        if (successContainer) {
                            try {
                                successContainer.scrollIntoView({ behavior: "smooth", block: "start" });
                            } catch(eSc) {}
                        }

                        // 6. Update active comp status badge
                        var compBadge = document.getElementById("lblCompStatusBadge");
                        if (compBadge) {
                            compBadge.className = "badge-status transcribed";
                            compBadge.innerText = "Transcribed";
                        }

                        if (backendRes.warning) {
                            showAlertModal("Notice", backendRes.warning);
                        }
                    });
                });
            });
        });
    });
}

function runPythonBackend(audioPath, projectDetails, callback) {
    if (typeof require === "undefined") {
        setTimeout(function() {
            callback({
                success: true,
                captions: [
                    { start: 0.5, end: 3.0, text: "Welcome to Caption Generator ULTRA for After Effects." },
                    { start: 3.2, end: 6.0, text: "Review your subtitle cues and create text layers in your comp." }
                ],
                words: [
                    { start: 0.5, end: 0.9, word: "Welcome" },
                    { start: 0.9, end: 1.1, word: "to" },
                    { start: 1.1, end: 1.6, word: "Caption" },
                    { start: 1.6, end: 2.2, word: "Generator" },
                    { start: 2.2, end: 2.7, word: "ULTRA" },
                    { start: 2.7, end: 3.0, word: "for" },
                    { start: 3.0, end: 3.5, word: "After" },
                    { start: 3.5, end: 4.0, word: "Effects." }
                ]
            });
        }, 1200);
        return;
    }

    var cp = require("child_process");
    var path = require("path");

    var baseDir = DependencyInstaller.getExtensionPath();
    var pythonExe = DependencyInstaller.getPythonExecutable();

    if (!pythonExe) {
        callback({
            success: false,
            error: "Bundled Python runtime not found at:\n" + path.join(baseDir, "runtime")
        });
        return;
    }

    var pyScript = path.join(baseDir, "backend", "engine.py");

    var model = document.getElementById("selectModel").value;
    var removeFillers = document.getElementById("chkRemoveFillers").checked;
    var sourceLangEl = document.getElementById("selectSourceLang");
    var sourceLang = sourceLangEl ? sourceLangEl.value : "auto";
    var targetLangEl = document.getElementById("selectTargetLang");
    var targetLang = targetLangEl ? targetLangEl.value : "none";
    var versioning = document.getElementById("chkVersioning").checked;
    var maxChars = document.getElementById("sliderMaxChars").value;
    var maxDur = (parseFloat(document.getElementById("sliderMaxDur").value) / 10.0).toFixed(1);
    var gapFrames = document.getElementById("sliderGapFrames").value;
    var lineModeRadio = document.querySelector('input[name="lineMode"]:checked');
    var lineMode = lineModeRadio ? lineModeRadio.value : "double";
    var hardware = (SettingsManager && SettingsManager.settings) ? SettingsManager.settings.hardware : "cuda";

    var args = [
        pyScript,
        "--audio", audioPath,
        "--model", model,
        "--device", hardware,
        "--language", sourceLang,
        "--target_language", targetLang,
        "--project_path", projectDetails.path || "",
        "--project_name", projectDetails.name || "UntitledComp",
        "--max_chars", maxChars.toString(),
        "--max_dur", maxDur.toString(),
        "--gap_frames", gapFrames.toString(),
        "--line_mode", lineMode
    ];

    if (removeFillers) args.push("--remove_fillers");
    if (versioning) args.push("--enable_versioning");

    var proc = cp.spawn(pythonExe, args, {
        cwd: baseDir,
        env: Object.assign({}, process.env, {
            PYTHONIOENCODING: "utf-8",
            PYTHONUTF8: "1",
            PYTHONNOUSERSITE: "1"
        })
    });
    activePythonProcess = proc;
    var stdoutData = "";
    var stderrData = "";

    proc.stdout.on("data", function(data) {
        if (isTranscriptionCancelled) return;
        stdoutData += data.toString();
    });

    proc.stderr.on("data", function(data) {
        if (isTranscriptionCancelled) return;
        var str = data.toString();
        stderrData += str;
    });

    proc.on("close", function(code) {
        activePythonProcess = null;
        if (isTranscriptionCancelled) return;

        var parsed = null;
        try {
            var jsonMatch = stdoutData.match(/---RESULT_JSON_START---\s*([\s\S]*?)\s*---RESULT_JSON_END---/);
            if (jsonMatch && jsonMatch[1]) {
                parsed = JSON.parse(jsonMatch[1]);
            }
        } catch (e) {}

        if (code === 0 && parsed && parsed.success) {
            callback(parsed);
            return;
        }

        var errDetails = (parsed && parsed.error) ? parsed.error : (stderrData.trim() || stdoutData.trim() || ("Engine process exited with code " + code));
        callback({ success: false, error: errDetails, stdout: stdoutData, stderr: stderrData });
    });
}

function importSubtitlesToSequence() {
    ensureLicensedAction("import", function() {
        var btn = document.getElementById("btnApplyEdits");
        var btnTrans = document.getElementById("btnTranscriptCreateLayers");
        var originalText = "Create Text Layers in Comp";

        var captions = SubtitleEditor.captions;
        var words = SubtitleEditor.words || [];
        if (!captions || captions.length === 0) {
            showAlertModal("No Subtitles", "No subtitles available to create. Transcribe a composition first.");
            return;
        }

        if (btn) {
            btn.disabled = true;
            btn.innerText = "Creating Text Layers...";
        }
        if (btnTrans) {
            btnTrans.disabled = true;
            btnTrans.innerText = "Creating...";
        }

        var methodSelect = document.getElementById("selectImportMethod");
        var importMethod = methodSelect ? methodSelect.value : "direct";

        var chkRemove = document.getElementById("chkRemoveOldSubtitles");
        var replaceExisting = chkRemove ? chkRemove.checked : true;

        var prefs = UserPreferences.gather();
        var styleConfig = {
            fontSize: parseInt(prefs.fontSize, 10) || 48,
            textColor: prefs.textColor || "#FFFFFF",
            position: prefs.position || "bottom",
            align: prefs.align || "center",
            enableStroke: true,
            strokeColor: "#000000"
        };

        var payload = {
            style: styleConfig,
            captions: captions,
            words: words
        };

        if (typeof require !== "undefined") {
            var fs = require("fs");
            var path = require("path");
            var tempFolder = getTempFolder();
            var jsonPath = path.join(tempFolder, "cgp_ae_subtitle_payload.json");
            fs.writeFileSync(jsonPath, JSON.stringify(payload, null, 4), "utf-8");

            ExtendScriptBridge.importStyledSubtitles(jsonPath, importMethod, replaceExisting, function(res) {
                if (btn) {
                    btn.disabled = false;
                    btn.innerText = originalText;
                }
                if (btnTrans) {
                    btnTrans.disabled = false;
                    btnTrans.innerText = "Create Text Layers in Comp";
                }
                if (!res || !res.success) {
                    var rawErr = (res && res.error) ? res.error : "Unknown error";
                    showAlertModal("Subtitle Error", "Could not create text layers: " + rawErr);
                } else {
                    showAlertModal("Subtitles Created", "Created " + captions.length + " text layers in your active composition!");
                }
            });
        } else {
            if (btn) {
                btn.disabled = false;
                btn.innerText = originalText;
            }
            if (btnTrans) {
                btnTrans.disabled = false;
                btnTrans.innerText = "Create Text Layers in Comp";
            }
            showAlertModal("Preview Mode", "Created " + captions.length + " text layers in active comp (Browser Preview Mode).");
        }
    });
}

function exportTranscriptTXT() {
    ensureLicensedAction("export", function() {
        if (!TranscriptViewer.words || TranscriptViewer.words.length === 0) {
            showAlertModal("No Transcript", "No transcript words available to export.");
            return;
        }

        var fullText = TranscriptViewer.words.map(function(w) {
            return (w.word !== undefined ? w.word : (w.text || "")).trim();
        }).join(" ");

        if (typeof require !== "undefined") {
            var fs = require("fs");
            var path = require("path");
            var os = require("os");
            var desktopPath = path.join(os.homedir(), "Desktop", "transcript.txt");

            try {
                fs.writeFileSync(desktopPath, fullText, "utf-8");
                showAlertModal("Transcript Exported", "Plain text transcript exported to your Desktop:\n" + desktopPath.replace(/\\/g, "/"));
            } catch(e) {
                var tempPath = path.join(getTempFolder(), "transcript.txt");
                fs.writeFileSync(tempPath, fullText, "utf-8");
                showAlertModal("Transcript Exported", "Plain text transcript exported to:\n" + tempPath.replace(/\\/g, "/"));
            }
        } else {
            showAlertModal("Transcript Exported", "Plain text transcript exported (Browser Preview Mode).");
        }
    });
}

function exportTranscriptJSON() {
    ensureLicensedAction("export", function() {
        if (!TranscriptViewer.words || TranscriptViewer.words.length === 0) {
            showAlertModal("No Transcript", "No transcript words available to export.");
            return;
        }

        var jsonPayload = {
            captions: SubtitleEditor.captions || [],
            words: TranscriptViewer.words || []
        };

        if (typeof require !== "undefined") {
            var fs = require("fs");
            var path = require("path");
            var os = require("os");
            var desktopPath = path.join(os.homedir(), "Desktop", "transcript.json");

            try {
                fs.writeFileSync(desktopPath, JSON.stringify(jsonPayload, null, 4), "utf-8");
                showAlertModal("JSON Exported", "Transcript JSON exported to your Desktop:\n" + desktopPath.replace(/\\/g, "/"));
            } catch(e) {
                var tempPath = path.join(getTempFolder(), "transcript.json");
                fs.writeFileSync(tempPath, JSON.stringify(jsonPayload, null, 4), "utf-8");
                showAlertModal("JSON Exported", "Transcript JSON exported to:\n" + tempPath.replace(/\\/g, "/"));
            }
        } else {
            showAlertModal("JSON Exported", "Transcript JSON exported (Browser Preview Mode).");
        }
    });
}

function exportSRTFile() {
    ensureLicensedAction("export", function() {
        var captions = SubtitleEditor.captions;
        if (!captions || captions.length === 0) {
            showAlertModal("No Subtitles", "No subtitles available to export.");
            return;
        }

        if (typeof require !== "undefined") {
            var fs = require("fs");
            var path = require("path");
            var os = require("os");
            var desktopPath = path.join(os.homedir(), "Desktop", "captions.srt");

            var srtContent = "";
            captions.forEach(function(cap, i) {
                srtContent += `${i + 1}\n${fmtTime(cap.start, "srt")} --> ${fmtTime(cap.end, "srt")}\n${cap.text}\n\n`;
            });

            try {
                fs.writeFileSync(desktopPath, srtContent, "utf-8");
                showAlertModal("SRT Exported", "Subtitle file (.srt) exported successfully to your Desktop:\n" + desktopPath.replace(/\\/g, "/"));
            } catch(e) {
                var tempPath = path.join(getTempFolder(), "captions.srt");
                fs.writeFileSync(tempPath, srtContent, "utf-8");
                showAlertModal("SRT Exported", "Subtitle file (.srt) exported to:\n" + tempPath.replace(/\\/g, "/"));
            }
        } else {
            showAlertModal("SRT Exported", "Subtitle file (.srt) exported (Browser Preview Mode).");
        }
    });
}

function showAlertModal(title, message) {
    var modal = document.getElementById("alertModal");
    var lblTitle = document.getElementById("alertModalTitle");
    var divBody = document.getElementById("alertModalBody");
    var btnOk = document.getElementById("btnAlertOk");
    var btnClose = document.getElementById("btnAlertClose");

    if (!modal || !lblTitle || !divBody) {
        alert(title + ": " + message);
        return;
    }

    lblTitle.innerText = title || "Notification";

    var lines = (message || "").split("\n");
    var html = "";
    lines.forEach(function(line) {
        var trimmed = line.trim();
        if (trimmed.indexOf("/") !== -1 || trimmed.indexOf("\\") !== -1 || trimmed.indexOf(".srt") !== -1 || trimmed.indexOf(".txt") !== -1 || trimmed.indexOf(".json") !== -1) {
            html += `<div style="background-color: var(--surface-elevated); border: 1px solid var(--border); border-radius: 4px; padding: 6px 8px; font-family: monospace; font-size: 10px; color: var(--accent); margin-top: 4px; word-break: break-all; user-select: all;">${line.replace(/\\/g, "/")}</div>`;
        } else if (trimmed.length > 0) {
            html += `<div style="margin-bottom: 4px; font-size: 11px;">${line}</div>`;
        }
    });
    divBody.innerHTML = html;

    modal.style.display = "flex";

    var closeModal = function() {
        modal.style.display = "none";
    };

    if (btnOk) btnOk.onclick = closeModal;
    if (btnClose) btnClose.onclick = closeModal;
}

function getTempAudioPath() {
    if (typeof require !== "undefined") {
        var os = require("os");
        var path = require("path");
        return path.join(os.tmpdir(), "cgp_ae_timeline_audio.wav");
    }
    return "cgp_ae_timeline_audio.wav";
}

function getTempFolder() {
    if (typeof require !== "undefined") {
        var os = require("os");
        return os.tmpdir();
    }
    return ".";
}

function fmtTime(seconds, fmt) {
    var sec = parseFloat(seconds) || 0;
    var h = Math.floor(sec / 3600);
    var m = Math.floor((sec % 3600) / 60);
    var s = Math.floor(sec % 60);
    var ms = Math.floor((sec - Math.floor(sec)) * 1000);

    if (fmt === "display") {
        if (h > 0) {
            return `${h < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}.${Math.floor(ms / 10)}s`;
        }
        return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}.${Math.floor(ms / 10)}s`;
    }

    var sep = fmt === "srt" ? "," : ".";
    return `${h < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}${sep}${ms < 100 ? (ms < 10 ? '00' : '0') : ''}${ms}`;
}
