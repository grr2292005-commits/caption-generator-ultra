// Caption Styles Data Model & Presets
var CaptionStyles = {
    presets: {
        standard: {
            id: "standard",
            name: "Standard (Default)",
            description: "Clean classic subtitle layout",
            mode: "standard",
            fontSize: 24,
            primaryColor: "#FFFFFF",
            highlightColor: "#FFD700",
            position: "bottom",
            animation: "none"
        },
        clean_pro: {
            id: "clean_pro",
            name: "Clean Professional",
            description: "Modern minimalist lower-third captions",
            mode: "standard",
            fontSize: 26,
            primaryColor: "#FFFFFF",
            highlightColor: "#00E5FF",
            position: "bottom",
            animation: "none"
        },
        hormozi: {
            id: "hormozi",
            name: "Hormozi Pop",
            description: "Bold energetic centered text with pop animations",
            mode: "kinetic",
            fontSize: 32,
            primaryColor: "#FFFF00",
            highlightColor: "#FF0055",
            position: "center",
            animation: "pop"
        },
        karaoke: {
            id: "karaoke",
            name: "Karaoke Highlight",
            description: "Word-by-word active highlight glow",
            mode: "karaoke",
            fontSize: 28,
            primaryColor: "#FFFFFF",
            highlightColor: "#00FF66",
            position: "center",
            animation: "highlight"
        },
        podcast: {
            id: "podcast",
            name: "Podcast Soft",
            description: "Soft elegant subtitle layout for longform audio",
            mode: "standard",
            fontSize: 22,
            primaryColor: "#E0E0E0",
            highlightColor: "#BB86FC",
            position: "bottom",
            animation: "none"
        }
    },

    getStyle: function (id) {
        return this.presets[id] || this.presets.standard;
    }
};

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
    { code: "sw", name: "Swahili" },
    { code: "af", name: "Afrikaans" },
    { code: "sq", name: "Albanian" },
    { code: "am", name: "Amharic" },
    { code: "hy", name: "Armenian" },
    { code: "az", name: "Azerbaijani" },
    { code: "eu", name: "Basque" },
    { code: "be", name: "Belarusian" },
    { code: "bs", name: "Bosnian" },
    { code: "ca", name: "Catalan" },
    { code: "et", name: "Estonian" },
    { code: "gl", name: "Galician" },
    { code: "ka", name: "Georgian" },
    { code: "is", name: "Icelandic" },
    { code: "kk", name: "Kazakh" },
    { code: "km", name: "Khmer" },
    { code: "lo", name: "Lao" },
    { code: "lat", name: "Latin" },
    { code: "lv", name: "Latvian" },
    { code: "lt", name: "Lithuanian" },
    { code: "mk", name: "Macedonian" },
    { code: "mg", name: "Malagasy" },
    { code: "mt", name: "Maltese" },
    { code: "mi", name: "Maori" },
    { code: "mn", name: "Mongolian" },
    { code: "ne", name: "Nepali" },
    { code: "ps", name: "Pashto" },
    { code: "si", name: "Sinhala" },
    { code: "sl", name: "Slovenian" },
    { code: "so", name: "Somali" },
    { code: "tl", name: "Tagalog" },
    { code: "tg", name: "Tajik" },
    { code: "uz", name: "Uzbek" },
    { code: "cy", name: "Welsh" },
    { code: "yi", name: "Yiddish" }
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
    init: function (containerId, optionsList, onChangeCallback) {
        var container = document.getElementById(containerId);
        if (!container) return null;

        var inputDisplay = container.querySelector(".search-select-input");
        var hiddenVal = container.querySelector("input[type='hidden']");
        var dropdown = container.querySelector(".search-select-dropdown");
        var filterInput = container.querySelector(".search-select-filter");
        var optionsContainer = container.querySelector(".search-select-options");

        function renderOptions(filterText) {
            optionsContainer.innerHTML = "";
            var query = (filterText || "").toLowerCase().trim();
            var matches = 0;
            var currentVal = hiddenVal.value;

            optionsList.forEach(function (opt) {
                if (!query || opt.name.toLowerCase().indexOf(query) !== -1 || opt.code.toLowerCase().indexOf(query) !== -1) {
                    matches++;
                    var item = document.createElement("div");
                    item.className = "search-select-item" + (opt.code === currentVal ? " selected" : "");
                    item.innerText = opt.name;
                    item.addEventListener("click", function (e) {
                        e.stopPropagation();
                        setValue(opt.code, opt.name);
                        closeDropdown();
                        if (onChangeCallback) onChangeCallback(opt.code);
                    });
                    optionsContainer.appendChild(item);
                }
            });

            if (matches === 0) {
                var noMatch = document.createElement("div");
                noMatch.className = "search-select-empty";
                noMatch.innerText = "No language found";
                optionsContainer.appendChild(noMatch);
            }
        }

        function setValue(code, name) {
            hiddenVal.value = code;
            if (!name) {
                var found = optionsList.find(function (o) { return o.code === code; });
                inputDisplay.value = found ? found.name : code;
            } else {
                inputDisplay.value = name;
            }
        }

        function openDropdown() {
            document.querySelectorAll(".search-select-dropdown").forEach(function (d) {
                d.style.display = "none";
            });
            dropdown.style.display = "block";
            filterInput.value = "";
            renderOptions("");
            setTimeout(function () { filterInput.focus(); }, 50);
        }

        function closeDropdown() {
            dropdown.style.display = "none";
        }

        inputDisplay.addEventListener("click", function (e) {
            e.stopPropagation();
            if (dropdown.style.display === "block") {
                closeDropdown();
            } else {
                openDropdown();
            }
        });

        filterInput.addEventListener("input", function () {
            renderOptions(filterInput.value);
        });

        filterInput.addEventListener("click", function (e) {
            e.stopPropagation();
        });

        document.addEventListener("click", function () {
            closeDropdown();
        });

        return {
            getValue: function () { return hiddenVal.value; },
            setValue: setValue
        };
    }
};

// User Preferences Persistence (localStorage)
var UserPreferences = {
    STORAGE_KEY: "cgp_user_prefs",

    defaults: {
        model: "base",
        maxChars: 37,
        maxDur: 30,
        gapFrames: 0,
        lineMode: "double",
        removeFillers: true,
        sourceLang: "auto",
        targetLang: "none",
        versioning: true,
        hardware: "cuda",
        fontFamily: "Arial",
        fontWeight: "bold",
        fontSize: 24,
        textColor: "#FFFFFF",
        position: "bottom",
        align: "center"
    },

    load: function () {
        try {
            var stored = localStorage.getItem(this.STORAGE_KEY);
            if (stored) {
                return Object.assign({}, this.defaults, JSON.parse(stored));
            }
        } catch (e) { }
        return Object.assign({}, this.defaults);
    },

    save: function (prefs) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(prefs));
        } catch (e) { }
    },

    gather: function () {
        var prefs = {};
        var sel = document.getElementById("selectModel");
        if (sel) prefs.model = sel.value;
        var sChars = document.getElementById("sliderMaxChars");
        if (sChars) prefs.maxChars = parseInt(sChars.value, 10);
        var sDur = document.getElementById("sliderMaxDur");
        if (sDur) prefs.maxDur = parseInt(sDur.value, 10);
        var sGap = document.getElementById("sliderGapFrames");
        if (sGap) prefs.gapFrames = parseInt(sGap.value, 10);
        var radios = document.querySelectorAll('input[name="lineMode"]');
        radios.forEach(function (r) { if (r.checked) prefs.lineMode = r.value; });
        var chkFill = document.getElementById("chkRemoveFillers");
        if (chkFill) prefs.removeFillers = chkFill.checked;
        var selSrc = document.getElementById("selectSourceLang");
        if (selSrc) prefs.sourceLang = selSrc.value;
        var selTgt = document.getElementById("selectTargetLang");
        if (selTgt) prefs.targetLang = selTgt.value;
        var chkVer = document.getElementById("chkVersioning");
        if (chkVer) prefs.versioning = chkVer.checked;
        var selHw = document.getElementById("selectHardware");
        if (selHw) prefs.hardware = selHw.value;

        // Premiere Stylize tab options
        var sFont = document.getElementById("selectFontFamily");
        if (sFont) prefs.fontFamily = sFont.value;
        var sWeight = document.getElementById("selectFontWeight");
        if (sWeight) prefs.fontWeight = sWeight.value;
        var sFSize = document.getElementById("sliderStylizeFontSize");
        if (sFSize) prefs.fontSize = parseInt(sFSize.value, 10);
        var cText = document.getElementById("colorText");
        if (cText) prefs.textColor = cText.value;
        var sPos = document.getElementById("selectPosition");
        if (sPos) prefs.position = sPos.value;
        var sAlign = document.getElementById("selectAlign");
        if (sAlign) prefs.align = sAlign.value;

        return prefs;
    },

    restore: function (prefs) {
        var sel = document.getElementById("selectModel");
        if (sel) sel.value = prefs.model || this.defaults.model;
        var sChars = document.getElementById("sliderMaxChars");
        var lblChars = document.getElementById("lblMaxCharsVal");
        if (sChars) { sChars.value = prefs.maxChars; if (lblChars) lblChars.innerText = prefs.maxChars; }
        var sDur = document.getElementById("sliderMaxDur");
        var lblDur = document.getElementById("lblMaxDurVal");
        if (sDur) { sDur.value = prefs.maxDur; if (lblDur) lblDur.innerText = (prefs.maxDur / 10.0).toFixed(1) + "s"; }
        var sGap = document.getElementById("sliderGapFrames");
        var lblGap = document.getElementById("lblGapFramesVal");
        if (sGap) { sGap.value = prefs.gapFrames; if (lblGap) lblGap.innerText = prefs.gapFrames + " frames"; }
        var radios = document.querySelectorAll('input[name="lineMode"]');
        radios.forEach(function (r) { r.checked = (r.value === (prefs.lineMode || "double")); });
        var chkFill = document.getElementById("chkRemoveFillers");
        if (chkFill) chkFill.checked = prefs.removeFillers !== false;
        if (window.SourceLangSelect) {
            window.SourceLangSelect.setValue(prefs.sourceLang || "auto");
        } else {
            var selSrc = document.getElementById("selectSourceLang");
            if (selSrc) selSrc.value = prefs.sourceLang || "auto";
        }
        if (window.TargetLangSelect) {
            window.TargetLangSelect.setValue(prefs.targetLang || "none");
        } else {
            var selTgt = document.getElementById("selectTargetLang");
            if (selTgt) selTgt.value = prefs.targetLang || "none";
        }
        var chkVer = document.getElementById("chkVersioning");
        if (chkVer) chkVer.checked = prefs.versioning !== false;
        var selHw = document.getElementById("selectHardware");
        if (selHw) selHw.value = prefs.hardware || "cuda";

        // Premiere Stylize preferences restore
        var sFont = document.getElementById("selectFontFamily");
        if (sFont) sFont.value = prefs.fontFamily || "Arial";
        var sWeight = document.getElementById("selectFontWeight");
        if (sWeight) sWeight.value = prefs.fontWeight || "bold";
        var sFSize = document.getElementById("sliderStylizeFontSize");
        var lblFSize = document.getElementById("lblStylizeFontSizeVal");
        if (sFSize) { sFSize.value = prefs.fontSize || 24; if (lblFSize) lblFSize.innerText = (prefs.fontSize || 24) + "px"; }
        var cText = document.getElementById("colorText");
        if (cText) cText.value = prefs.textColor || "#FFFFFF";
        var sPos = document.getElementById("selectPosition");
        if (sPos) sPos.value = prefs.position || "bottom";
        var sAlign = document.getElementById("selectAlign");
        if (sAlign) sAlign.value = prefs.align || "center";

        updateStylizeSummary();
    },

    autoSave: function () {
        var self = this;
        this.save(this.gather());
        updateStylizeSummary();
    }
};

function updateStylizeSummary() {
    var summaryEl = document.getElementById("stylizeSummary");
    if (!summaryEl) return;
    var prefs = UserPreferences.gather();

    var pMap = { "bottom": "Bottom", "center": "Center", "top": "Top" };
    var alMap = { "center": "Center", "left": "Left", "right": "Right" };
    var wStr = prefs.fontWeight === "bold" ? "Bold" : "Regular";

    var txt = "Font: " + (prefs.fontFamily || "Arial") + " (" + wStr + ")" +
        " | Size: " + (prefs.fontSize || 24) + "px" +
        " | Align: " + (alMap[prefs.align] || "Center") +
        " | Pos: " + (pMap[prefs.position] || "Bottom");
    summaryEl.innerText = txt;
}

// Main Application Panel Controller
document.addEventListener("DOMContentLoaded", function () {
    // 0. Initialize Searchable Comboboxes for Languages
    window.SourceLangSelect = SearchableSelect.init("containerSourceLang", WHISPER_LANGUAGES_SOURCE, function () {
        UserPreferences.autoSave();
    });

    window.TargetLangSelect = SearchableSelect.init("containerTargetLang", WHISPER_LANGUAGES_TARGET, function () {
        UserPreferences.autoSave();
    });

    // 1. Tab Navigation Logic
    var tabs = document.querySelectorAll(".tab-btn");
    tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
            tabs.forEach(t => t.classList.remove("active"));
            document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

            tab.classList.add("active");
            var targetId = tab.getAttribute("data-tab");
            var target = document.getElementById(targetId);
            if (target) target.classList.add("active");

            if (targetId === "tab-transcribe") {
                SequenceStateManager.poll();
            }
        });
    });

    window.UltraTranscript = {
        words: [],
        paragraphs: [],
        pauseCount: 0,
        minPauseLength: 0.50,

        // Filters & View Options
        showFillers: true,
        showPauses: true,
        showCensored: true,
        activeFilter: "none", // "filler", "censored", "pauses", "none"
        selectedSpeaker: "all",

        // Search State
        searchQuery: "",
        searchCaseSensitive: false,
        searchWholeWord: false,
        searchMatchCount: 0,

        // Selection & Cut State
        selectedWordIndices: [],
        pendingCutAction: null,

        // Custom Words Lists
        censoredWords: ["damn", "shit", "fuck", "bitch", "crap", "ass", "bastard", "dick", "piss"],
        fillerWords: ["um", "uh", "uhh", "like", "you know", "er", "ah", "hmm"],

        // Auto-Scroll & Spellcheck
        autoScrollEnabled: false,
        autoScrollTimer: null,
        spellCheckEnabled: true,

        rawSilences: [],

        init: function() {
            var self = this;
            this.bindUI();
        },

        buildModel: function(rawWords, rawSilences) {
            this.words = [];
            this.paragraphs = [];
            this.rawSilences = Array.isArray(rawSilences) ? rawSilences : (this.rawSilences || []);
            this.pauseCount = 0;
            this.clearSelection();

            if (!rawWords || !Array.isArray(rawWords) || rawWords.length === 0) {
                return;
            }

            var normalizedWords = [];
            for (var i = 0; i < rawWords.length; i++) {
                var rw = rawWords[i];
                if (!rw) continue;
                var wText = (rw.text !== undefined) ? String(rw.text) : ((rw.word !== undefined) ? String(rw.word) : (rw.value || ""));
                var t = wText.trim();
                if (!t) continue;
                var s = parseFloat(rw.start) || 0;
                var e = (rw.end !== undefined) ? parseFloat(rw.end) : ((rw.duration !== undefined) ? (s + parseFloat(rw.duration)) : (s + 0.1));
                normalizedWords.push({
                    text: t,
                    start: Math.round(s * 1000) / 1000,
                    end: Math.round(e * 1000) / 1000,
                    speaker: rw.speaker || "Speaker 1"
                });
            }

            this.words = normalizedWords;
            if (this.words.length === 0) return;

            // Extract distinct speakers and populate speaker filter dropdown
            var speakersFound = {};
            for (var sIdx = 0; sIdx < normalizedWords.length; sIdx++) {
                var spk = normalizedWords[sIdx].speaker || "Speaker 1";
                speakersFound[spk] = true;
            }
            var speakerList = Object.keys(speakersFound);
            this.populateSpeakerFilter(speakerList);

            this.rebuildParagraphs();
        },

        populateSpeakerFilter: function(speakerList) {
            var sel = document.getElementById("selectSpeakerFilter");
            if (!sel) return;

            sel.innerHTML = "";
            var optAll = document.createElement("option");
            optAll.value = "all";
            optAll.innerText = "All Speakers";
            sel.appendChild(optAll);

            if (speakerList && speakerList.length > 0) {
                for (var i = 0; i < speakerList.length; i++) {
                    var opt = document.createElement("option");
                    opt.value = speakerList[i];
                    opt.innerText = speakerList[i];
                    sel.appendChild(opt);
                }
                sel.disabled = false;
            } else {
                sel.disabled = true;
            }

            this.selectedSpeaker = "all";
            sel.value = "all";
        },

        rebuildParagraphs: function() {
            this.paragraphs = [];
            if (!this.words || this.words.length === 0) return;

            var currentParagraph = {
                tokens: []
            };

            var pauses = 0;
            var minPause = this.minPauseLength;
            var silences = this.rawSilences || [];

            for (var j = 0; j < this.words.length; j++) {
                var currWord = this.words[j];
                var prevWord = (j > 0) ? this.words[j - 1] : null;

                if (j === 0) {
                    // Leading silence before the first word
                    var leadingGap = Math.round(currWord.start * 1000) / 1000;
                    var leadingSilence = null;
                    for (var s = 0; s < silences.length; s++) {
                        if (silences[s].start <= 0.1 && silences[s].end <= currWord.start + 0.1) {
                            leadingSilence = silences[s];
                            break;
                        }
                    }
                    var isLeadingPause = (leadingGap >= minPause) || (leadingSilence && leadingSilence.duration >= minPause);
                    if (isLeadingPause && leadingGap >= 0.05) {
                        var lStart = 0;
                        var lEnd = currWord.start;
                        var lDur = Math.round((lEnd - lStart) * 1000) / 1000;
                        if (lDur >= minPause) {
                            pauses++;
                            currentParagraph.tokens.push({
                                type: "pause",
                                text: "[..]",
                                start: lStart,
                                end: lEnd,
                                duration: Math.round(lDur * 100) / 100
                            });
                        }
                    }
                } else {
                    var gap = Math.round((currWord.start - prevWord.end) * 1000) / 1000;
                    var prevEos = /[.!?]$/.test(prevWord.text);

                    // Find overlapping or bridging silence from ffmpeg silencedetect
                    var matchedSilence = null;
                    for (var si = 0; si < silences.length; si++) {
                        var sil = silences[si];
                        // Silence falls in transition between prevWord and currWord
                        if (sil.start <= currWord.start + 0.08 && sil.end >= prevWord.end - 0.08 &&
                            sil.end > prevWord.start + 0.02 && sil.start < currWord.end - 0.02) {
                            if (!matchedSilence || sil.duration > matchedSilence.duration) {
                                matchedSilence = sil;
                            }
                        }
                    }

                    var isWordGapPause = (gap >= minPause);
                    var isSilencePause = (matchedSilence && matchedSilence.duration >= minPause);

                    if (isWordGapPause || isSilencePause) {
                        var pStart = prevWord.end;
                        var pEnd = currWord.start;

                        if (isSilencePause && matchedSilence) {
                            pStart = Math.min(pStart, matchedSilence.start);
                            pEnd = Math.max(pEnd, matchedSilence.end);
                        }

                        // Safety clamp so pause range never consumes word speech cores
                        pStart = Math.max(prevWord.start + 0.02, pStart);
                        pEnd = Math.min(currWord.end - 0.02, pEnd);

                        var pDur = Math.max(0.01, Math.round((pEnd - pStart) * 1000) / 1000);
                        if (pDur >= minPause) {
                            pauses++;
                            currentParagraph.tokens.push({
                                type: "pause",
                                text: "[..]",
                                start: Math.round(pStart * 1000) / 1000,
                                end: Math.round(pEnd * 1000) / 1000,
                                duration: Math.round(pDur * 100) / 100
                            });
                        }
                    }

                    // Paragraph boundary check: gap > 1.2s or (eos and gap > 0.6s) or long silence
                    var isLongBreak = (gap > 1.2) || (prevEos && gap > 0.6) || (matchedSilence && matchedSilence.duration > 1.2);
                    if (isLongBreak) {
                        if (currentParagraph.tokens.length > 0) {
                            this.paragraphs.push(currentParagraph);
                            currentParagraph = { tokens: [] };
                        }
                    }
                }

                currentParagraph.tokens.push({
                    type: "word",
                    text: currWord.text,
                    start: currWord.start,
                    end: currWord.end,
                    wordIdx: j,
                    speaker: currWord.speaker || "Speaker 1"
                });
            }

            if (currentParagraph.tokens.length > 0) {
                this.paragraphs.push(currentParagraph);
            }

            this.pauseCount = pauses;
        },

        setMinPauseLength: function(val) {
            var num = parseFloat(val);
            if (isNaN(num) || num < 0.05) num = 0.05;
            if (num > 2.00) num = 2.00;
            this.minPauseLength = Math.round(num * 100) / 100;

            var lbl = document.getElementById("lblMinPauseVal");
            if (lbl) lbl.innerText = this.minPauseLength.toFixed(2) + "s";

            // Live recalculate paragraphs & pause markers without re-transcribing!
            this.rebuildParagraphs();
            this.render();
        },

        isFiller: function(text) {
            var clean = (text || "").replace(/^[^\w]+|[^\w]+$/g, "").toLowerCase();
            return this.fillerWords.indexOf(clean) !== -1;
        },

        isCensored: function(text) {
            var clean = (text || "").replace(/^[^\w]+|[^\w]+$/g, "").toLowerCase();
            return this.censoredWords.indexOf(clean) !== -1;
        },

        matchesSearch: function(text) {
            if (!this.searchQuery) return false;
            var q = this.searchQuery;
            var t = text || "";
            if (!this.searchCaseSensitive) {
                q = q.toLowerCase();
                t = t.toLowerCase();
            }
            if (this.searchWholeWord) {
                var clean = t.replace(/^[^\w]+|[^\w]+$/g, "");
                return clean === q;
            }
            return t.indexOf(q) !== -1;
        },

        render: function() {
            var container = document.getElementById("transcriptBody");
            var statsEl = document.getElementById("lblTranscriptStats");
            var matchesEl = document.getElementById("lblSearchMatches");
            if (!container) return;

            container.innerHTML = "";

            if (this.words.length === 0) {
                container.innerHTML = '<div style="color: var(--text-secondary); text-align: center; padding: 20px;">No speech detected in this sequence.</div>';
                if (statsEl) statsEl.innerText = "0 words • 0 pauses • 0 paragraphs";
                if (matchesEl) matchesEl.innerText = "0 matches";
                return;
            }

            if (statsEl) {
                statsEl.innerText = this.words.length + " words • " + (this.pauseCount || 0) + " pauses • " + this.paragraphs.length + " paragraphs";
            }

            var self = this;
            var matchCount = 0;

            for (var p = 0; p < this.paragraphs.length; p++) {
                var para = this.paragraphs[p];
                var pDiv = document.createElement("div");
                pDiv.className = "transcript-paragraph";

                for (var t = 0; t < para.tokens.length; t++) {
                    var token = para.tokens[t];
                    if (token.type === "pause") {
                        if (!self.showPauses) continue;
                        if (self.activeFilter === "filler" || self.activeFilter === "censored") continue;

                        var pauseSpan = document.createElement("span");
                        pauseSpan.className = "transcript-pause";
                        if (self.activeFilter === "pauses") {
                            pauseSpan.classList.add("active-pause");
                        }
                        pauseSpan.innerText = "[..]";
                        pauseSpan.title = "Pause (" + token.duration.toFixed(2) + "s) - Click: playhead | Click [x]: Ripple Delete";
                        pauseSpan.setAttribute("data-start", token.start);

                        // Delete button on pause chip
                        var delBtn = document.createElement("span");
                        delBtn.className = "pause-del-btn";
                        delBtn.innerHTML = "&times;";
                        delBtn.title = "Ripple delete this pause (" + token.duration.toFixed(2) + "s)";

                        (function(startSec, el, curTok) {
                            el.addEventListener("click", function(e) {
                                e.stopPropagation();
                                self.jumpPlayhead(startSec, el, "active-pause");
                            });
                        })(token.start, pauseSpan, token);

                        (function(curTok) {
                            delBtn.addEventListener("click", function(e) {
                                e.stopPropagation();
                                self.promptDeleteSinglePause(curTok);
                            });
                        })(token);

                        pauseSpan.appendChild(delBtn);
                        pDiv.appendChild(pauseSpan);
                    } else {
                        var isFil = self.isFiller(token.text);
                        var isCen = self.isCensored(token.text);
                        var isMatch = self.matchesSearch(token.text);
                        var wIdx = token.wordIdx !== undefined ? token.wordIdx : -1;
                        var isSelected = self.selectedWordIndices.indexOf(wIdx) !== -1;

                        if (isMatch) matchCount++;

                        // Check visibility filters
                        if (isFil && !self.showFillers) continue;
                        if (isCen && !self.showCensored) continue;
                        if (self.selectedSpeaker && self.selectedSpeaker !== "all") {
                            var tSpk = (token.speaker || "Speaker 1").trim().toLowerCase();
                            var sSpk = (self.selectedSpeaker || "").trim().toLowerCase();
                            if (tSpk !== sSpk) continue;
                        }

                        var wordSpan = document.createElement("span");
                        wordSpan.className = "transcript-word";
                        wordSpan.innerText = token.text;
                        wordSpan.setAttribute("data-start", token.start);
                        wordSpan.setAttribute("data-end", token.end);
                        wordSpan.setAttribute("data-word-idx", wIdx);

                        if (isSelected) {
                            wordSpan.classList.add("word-selected");
                        }
                        if (isMatch) {
                            wordSpan.classList.add("word-search-match");
                        }
                        if (isFil && (self.activeFilter === "filler" || self.activeFilter === "none")) {
                            wordSpan.classList.add("word-filler");
                            wordSpan.title = "Filler word - " + token.text;
                        }
                        if (isCen && (self.activeFilter === "censored" || self.activeFilter === "none")) {
                            wordSpan.classList.add("word-censored");
                            wordSpan.title = "Censored word - " + token.text;
                        }

                        (function(startSec, el, idx) {
                            el.addEventListener("click", function(e) {
                                if (e.shiftKey) {
                                    e.stopPropagation();
                                    self.handleShiftSelect(idx);
                                } else {
                                    self.jumpPlayhead(startSec, el, "active-word");
                                }
                            });
                        })(token.start, wordSpan, wIdx);

                        pDiv.appendChild(wordSpan);
                        pDiv.appendChild(document.createTextNode(" "));
                    }
                }

                if (pDiv.childNodes.length > 0) {
                    container.appendChild(pDiv);
                }
            }

            this.searchMatchCount = matchCount;
            if (matchesEl) {
                if (this.searchQuery) {
                    matchesEl.innerText = matchCount + " match" + (matchCount === 1 ? "" : "es");
                    matchesEl.style.color = matchCount > 0 ? "var(--accent-blue)" : "#dc3545";
                } else {
                    matchesEl.innerText = "0 matches";
                    matchesEl.style.color = "var(--text-secondary)";
                }
            }
        },

        jumpPlayhead: function(seconds, element, highlightClass) {
            var sec = parseFloat(seconds) || 0;
            if (typeof ExtendScriptBridge !== "undefined" && ExtendScriptBridge.setPlayhead) {
                ExtendScriptBridge.setPlayhead(sec);
            }
            document.querySelectorAll(".active-word, .active-pause").forEach(function(el) {
                el.classList.remove("active-word", "active-pause");
            });
            if (element && highlightClass) {
                element.classList.add(highlightClass);
            }
        },

        // Text Selection Management
        handleShiftSelect: function(targetIdx) {
            if (this.selectedWordIndices.length === 0) {
                this.selectedWordIndices = [targetIdx];
            } else {
                var first = this.selectedWordIndices[0];
                var min = Math.min(first, targetIdx);
                var max = Math.max(first, targetIdx);
                var newSel = [];
                for (var i = min; i <= max; i++) {
                    newSel.push(i);
                }
                this.selectedWordIndices = newSel;
            }
            this.updateSelectionUI();
            this.render();
        },

        syncSelectionFromDOM: function() {
            var sel = window.getSelection();
            if (!sel || sel.rangeCount === 0 || sel.isCollapsed) return;

            var container = document.getElementById("transcriptBody");
            if (!container || !container.contains(sel.anchorNode)) return;

            var wordEls = container.querySelectorAll(".transcript-word");
            var selectedIndices = [];

            for (var i = 0; i < wordEls.length; i++) {
                var el = wordEls[i];
                if (sel.containsNode(el, true)) {
                    var idx = parseInt(el.getAttribute("data-word-idx"), 10);
                    if (!isNaN(idx) && idx >= 0) {
                        selectedIndices.push(idx);
                    }
                }
            }

            if (selectedIndices.length > 0) {
                this.selectedWordIndices = selectedIndices;
                this.updateSelectionUI();
            }
        },

        updateSelectionUI: function() {
            var bar = document.getElementById("transcriptSelectionBar");
            var lbl = document.getElementById("lblSelectionStats");
            if (!bar || !lbl) return;

            if (!this.selectedWordIndices || this.selectedWordIndices.length === 0) {
                bar.style.display = "none";
                return;
            }

            var selWords = [];
            for (var i = 0; i < this.selectedWordIndices.length; i++) {
                var w = this.words[this.selectedWordIndices[i]];
                if (w) selWords.push(w);
            }

            if (selWords.length === 0) {
                bar.style.display = "none";
                return;
            }

            var minStart = Math.min.apply(null, selWords.map(w => w.start));
            var maxEnd = Math.max.apply(null, selWords.map(w => w.end));
            var dur = Math.max(0.05, maxEnd - minStart);

            bar.style.display = "flex";
            lbl.innerText = selWords.length + " word" + (selWords.length === 1 ? "" : "s") + " selected (" + dur.toFixed(2) + "s)";
        },

        clearSelection: function() {
            this.selectedWordIndices = [];
            var bar = document.getElementById("transcriptSelectionBar");
            if (bar) bar.style.display = "none";
            document.querySelectorAll(".word-selected").forEach(function(el) {
                el.classList.remove("word-selected");
            });
            if (window.getSelection) {
                window.getSelection().removeAllRanges();
            }
        },

        // Action 1: Delete One Pause
        promptDeleteSinglePause: function(token) {
            var self = this;
            var ranges = [{ start: token.start, end: token.end }];
            this.showConfirmCutModal(
                "Delete Pause",
                "Delete pause [..] of " + token.duration.toFixed(2) + "s from the sequence timeline?",
                function() {
                    self.executeRippleCut(ranges, "Single Pause Cut");
                }
            );
        },

        // Action 2: Delete All Pauses
        promptDeleteAllPauses: function() {
            var self = this;
            if (!this.words || this.words.length === 0) {
                showAlertModal("Notice", "No transcript words available.");
                return;
            }

            var pauseRanges = [];
            for (var p = 0; p < this.paragraphs.length; p++) {
                var tokens = this.paragraphs[p].tokens || [];
                for (var t = 0; t < tokens.length; t++) {
                    if (tokens[t].type === "pause") {
                        pauseRanges.push({
                            start: tokens[t].start,
                            end: tokens[t].end
                        });
                    }
                }
            }

            if (pauseRanges.length === 0) {
                showAlertModal("Notice", "No pauses >= " + this.minPauseLength.toFixed(2) + "s found in sequence.");
                return;
            }

            var merged = this.mergeRanges(pauseRanges);
            var totalDur = merged.reduce((sum, r) => sum + (r.end - r.start), 0);

            this.showConfirmCutModal(
                "Delete All Pauses",
                "Delete " + merged.length + " pauses (total " + totalDur.toFixed(2) + "s) from the sequence timeline?",
                function() {
                    self.executeRippleCut(merged, "All Pauses Cut");
                }
            );
        },

        // Action 3: Delete All Fillers
        promptDeleteAllFillers: function() {
            var self = this;
            if (!this.words || this.words.length === 0) {
                showAlertModal("Notice", "No transcript words available.");
                return;
            }

            var fillerRanges = [];
            for (var i = 0; i < this.words.length; i++) {
                var w = this.words[i];
                if (self.isFiller(w.text)) {
                    fillerRanges.push({ start: w.start, end: w.end });
                }
            }

            if (fillerRanges.length === 0) {
                showAlertModal("Notice", "No filler words found in transcript.");
                return;
            }

            var merged = this.mergeRanges(fillerRanges);
            var totalDur = merged.reduce((sum, r) => sum + (r.end - r.start), 0);

            this.showConfirmCutModal(
                "Delete All Fillers",
                "Delete " + merged.length + " filler segments (" + totalDur.toFixed(2) + "s total) from the sequence timeline?",
                function() {
                    self.executeRippleCut(merged, "All Fillers Cut");
                }
            );
        },

        // Action 4: Select Transcript Text and Ripple Cut Selection
        promptRippleCutSelection: function() {
            var self = this;
            if (!this.selectedWordIndices || this.selectedWordIndices.length === 0) {
                showAlertModal("Notice", "No words selected. Please select words in the transcript to cut.");
                return;
            }

            var selWords = [];
            for (var i = 0; i < this.selectedWordIndices.length; i++) {
                var w = this.words[this.selectedWordIndices[i]];
                if (w) selWords.push(w);
            }

            var minStart = Math.min.apply(null, selWords.map(w => w.start));
            var maxEnd = Math.max.apply(null, selWords.map(w => w.end));
            var dur = Math.max(0.05, maxEnd - minStart);

            var ranges = [{ start: minStart, end: maxEnd }];

            this.showConfirmCutModal(
                "Ripple Cut Selection",
                "Ripple cut " + selWords.length + " selected words (" + dur.toFixed(2) + "s from " + minStart.toFixed(2) + "s to " + maxEnd.toFixed(2) + "s) from the sequence timeline?",
                function() {
                    self.executeRippleCut(ranges, "Selection Cut");
                }
            );
        },

        mergeRanges: function(ranges) {
            if (!ranges || ranges.length === 0) return [];
            var sorted = ranges.slice().sort(function(a, b) {
                return a.start - b.start;
            });

            var merged = [];
            var current = { start: sorted[0].start, end: sorted[0].end };

            for (var i = 1; i < sorted.length; i++) {
                var r = sorted[i];
                if (r.start <= current.end + 0.03) {
                    current.end = Math.max(current.end, r.end);
                } else {
                    merged.push(current);
                    current = { start: r.start, end: r.end };
                }
            }
            merged.push(current);
            return merged;
        },

        // Central Ripple Cut Executor
        executeRippleCut: function(ranges, label) {
            var self = this;
            if (!ranges || ranges.length === 0) return;

            // Preserve full transcript snapshot
            var snapshot = JSON.parse(JSON.stringify(this.words));
            var silSnapshot = JSON.parse(JSON.stringify(this.rawSilences || []));

            // Call ExtendScript Host Bridge
            ExtendScriptBridge.rippleDeleteRanges(ranges, function(res) {
                if (!res || !res.success) {
                    // On failure: never wipe transcript, restore snapshot, show exact error
                    self.words = snapshot;
                    self.rawSilences = silSnapshot;
                    self.rebuildParagraphs();
                    self.render();

                    var errMsg = (res && res.error) ? res.error : "ExtendScript timeline cut failed.";
                    showAlertModal("Ripple Cut Error", "Could not complete timeline ripple cut:\n\n" + errMsg);
                    return;
                }

                // On success: shift remaining word timings left, rebuild pauses & paragraphs
                self.applyRippleCut(ranges);
                self.clearSelection();

                showAlertModal(
                    "Ripple Cut Complete",
                    "Successfully removed " + res.count + " segment(s) (" + res.totalSeconds + "s total) from the sequence timeline.\n\nNote: You can press Ctrl+Z (Cmd+Z) in Premiere Pro to undo sequence edits."
                );
            });
        },

        applyRippleCut: function(cutRanges) {
            if (!cutRanges || cutRanges.length === 0) return;

            var sortedRanges = cutRanges.slice().sort(function(a, b) {
                return a.start - b.start;
            });

            var remainingWords = [];

            for (var i = 0; i < this.words.length; i++) {
                var w = this.words[i];

                // Check if word is deleted by being inside any cut range
                var isCut = false;
                for (var k = 0; k < sortedRanges.length; k++) {
                    var rng = sortedRanges[k];
                    if (w.start >= rng.start - 0.04 && w.end <= rng.end + 0.04) {
                        isCut = true;
                        break;
                    }
                }

                if (isCut) continue;

                // Calculate cumulative left time shift
                var shift = 0;
                for (var j = 0; j < sortedRanges.length; j++) {
                    var r = sortedRanges[j];
                    var dur = r.end - r.start;
                    if (w.start >= r.end) {
                        shift += dur;
                    } else if (w.start > r.start && w.start < r.end) {
                        shift += (w.start - r.start);
                    }
                }

                var newStart = Math.max(0, Math.round((w.start - shift) * 1000) / 1000);
                var newEnd = Math.max(newStart + 0.05, Math.round((w.end - shift) * 1000) / 1000);

                remainingWords.push({
                    text: w.text,
                    start: newStart,
                    end: newEnd,
                    speaker: w.speaker
                });
            }

            // Shift cached silence intervals
            if (this.rawSilences && this.rawSilences.length > 0) {
                var updatedSilences = [];
                for (var s = 0; s < this.rawSilences.length; s++) {
                    var sil = this.rawSilences[s];
                    var isSilCut = false;
                    for (var sk = 0; sk < sortedRanges.length; sk++) {
                        var srng = sortedRanges[sk];
                        if (sil.start >= srng.start - 0.04 && sil.end <= srng.end + 0.04) {
                            isSilCut = true;
                            break;
                        }
                    }
                    if (isSilCut) continue;

                    var shiftS = 0;
                    for (var sj = 0; sj < sortedRanges.length; sj++) {
                        var sr = sortedRanges[sj];
                        var sdur = sr.end - sr.start;
                        if (sil.start >= sr.end) {
                            shiftS += sdur;
                        } else if (sil.start > sr.start && sil.start < sr.end) {
                            shiftS += (sil.start - sr.start);
                        }
                    }

                    var newSStart = Math.max(0, Math.round((sil.start - shiftS) * 1000) / 1000);
                    var newSEnd = Math.max(newSStart + 0.05, Math.round((sil.end - shiftS) * 1000) / 1000);
                    updatedSilences.push({
                        start: newSStart,
                        end: newSEnd,
                        duration: Math.round((newSEnd - newSStart) * 1000) / 1000
                    });
                }
                this.rawSilences = updatedSilences;
            }

            this.words = remainingWords;
            this.rebuildParagraphs();
            this.render();

            // Refresh captions model for Captions tab
            this.syncCaptionsModel();
        },

        syncCaptionsModel: function() {
            var sChars = document.getElementById("sliderMaxChars");
            var maxChars = sChars ? parseInt(sChars.value, 10) : 37;
            if (isNaN(maxChars) || maxChars < 10) maxChars = 37;

            var sDur = document.getElementById("sliderMaxDur");
            var maxDur = sDur ? (parseFloat(sDur.value) / 10.0) : 3.0;
            if (isNaN(maxDur) || maxDur <= 0) maxDur = 3.0;

            var sGap = document.getElementById("sliderGapFrames");
            var gapSec = sGap ? (parseInt(sGap.value, 10) / 30.0) : 0.0;

            var lineModeRadio = document.querySelector('input[name="lineMode"]:checked');
            var isDouble = lineModeRadio ? (lineModeRadio.value === "double") : true;

            var captions = [];
            var curCue = null;
            for (var i = 0; i < this.words.length; i++) {
                var w = this.words[i];
                if (!curCue) {
                    curCue = { start: w.start, end: w.end, text: w.text };
                } else {
                    var gap = w.start - curCue.end;
                    var cueDur = w.end - curCue.start;
                    var newLen = curCue.text.length + 1 + w.text.length;
                    var limit = isDouble ? (maxChars * 2) : maxChars;

                    if (newLen > limit || cueDur > maxDur || gap > Math.max(0.6, gapSec + 0.05)) {
                        captions.push(curCue);
                        curCue = { start: w.start, end: w.end, text: w.text };
                    } else {
                        curCue.text += " " + w.text;
                        curCue.end = w.end;
                    }
                }
            }
            if (curCue) captions.push(curCue);

            if (typeof SubtitleEditor !== "undefined" && SubtitleEditor.loadCaptions) {
                SubtitleEditor.loadCaptions(captions, this.words);
            }
        },

        showConfirmCutModal: function(title, message, onConfirm) {
            var modal = document.getElementById("confirmCutModal");
            var titleEl = document.getElementById("confirmCutTitle");
            var msgEl = document.getElementById("confirmCutMessage");
            if (!modal || !titleEl || !msgEl) {
                if (onConfirm) onConfirm();
                return;
            }

            titleEl.innerText = title || "Confirm Ripple Cut";
            msgEl.innerText = message || "Proceed with timeline cut?";
            this.pendingCutAction = onConfirm;
            modal.style.display = "flex";
        },

        startAutoScrollWatcher: function() {
            var self = this;
            if (this.autoScrollTimer) clearInterval(this.autoScrollTimer);

            this.autoScrollTimer = setInterval(function() {
                if (!self.autoScrollEnabled || !self.words || self.words.length === 0) return;
                if (typeof ExtendScriptBridge !== "undefined" && ExtendScriptBridge.getPlayhead) {
                    ExtendScriptBridge.getPlayhead(function(res) {
                        if (!res || !res.success) return;
                        var curSec = res.seconds;

                        var wordEls = document.querySelectorAll(".transcript-word");
                        var activeEl = null;

                        for (var i = 0; i < wordEls.length; i++) {
                            var el = wordEls[i];
                            var s = parseFloat(el.getAttribute("data-start")) || 0;
                            var e = parseFloat(el.getAttribute("data-end")) || (s + 0.3);

                            if (curSec >= s && curSec <= e) {
                                activeEl = el;
                                break;
                            }
                        }

                        document.querySelectorAll(".word-playhead-active").forEach(function(el) {
                            if (el !== activeEl) el.classList.remove("word-playhead-active");
                        });

                        if (activeEl && !activeEl.classList.contains("word-playhead-active")) {
                            activeEl.classList.add("word-playhead-active");
                            activeEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
                        }
                    });
                }
            }, 400);
        },

        stopAutoScrollWatcher: function() {
            if (this.autoScrollTimer) {
                clearInterval(this.autoScrollTimer);
                this.autoScrollTimer = null;
            }
            document.querySelectorAll(".word-playhead-active").forEach(function(el) {
                el.classList.remove("word-playhead-active");
            });
        },

        replaceOne: function(replaceText) {
            if (!this.searchQuery) {
                showAlertModal("Notice", "Please enter a search word first.");
                return;
            }
            if (!this.words || this.words.length === 0) return;

            var targetIdx = -1;
            for (var i = 0; i < this.words.length; i++) {
                if (this.matchesSearch(this.words[i].text)) {
                    targetIdx = i;
                    break;
                }
            }

            if (targetIdx === -1) {
                showAlertModal("Notice", "No match found for '" + this.searchQuery + "'.");
                return;
            }

            this.words[targetIdx].text = replaceText;
            this.rebuildParagraphs();
            this.render();
            this.syncCaptionsModel();
        },

        replaceAll: function(replaceText) {
            if (!this.searchQuery) {
                showAlertModal("Notice", "Please enter a search word first.");
                return;
            }
            if (!this.words || this.words.length === 0) return;

            var count = 0;
            for (var i = 0; i < this.words.length; i++) {
                if (this.matchesSearch(this.words[i].text)) {
                    this.words[i].text = replaceText;
                    count++;
                }
            }

            if (count === 0) {
                showAlertModal("Notice", "No matches found for '" + this.searchQuery + "'.");
                return;
            }

            this.rebuildParagraphs();
            this.render();
            this.syncCaptionsModel();
            showAlertModal("Replace Complete", "Replaced " + count + " instance" + (count === 1 ? "" : "s") + " of '" + this.searchQuery + "' with '" + replaceText + "'.");
        },

        bindUI: function() {
            var self = this;

            // Search & Replace Box
            var searchInput = document.getElementById("txtTranscriptSearch");
            var btnClear = document.getElementById("btnClearSearch");
            var btnCase = document.getElementById("btnSearchCase");
            var btnWhole = document.getElementById("btnSearchWholeWord");
            var btnToggleRep = document.getElementById("btnToggleReplace");
            var rowReplace = document.getElementById("rowTranscriptReplace");
            var txtReplace = document.getElementById("txtTranscriptReplace");
            var btnRepOne = document.getElementById("btnReplaceOne");
            var btnRepAll = document.getElementById("btnReplaceAll");

            if (searchInput) {
                searchInput.addEventListener("input", function() {
                    self.searchQuery = searchInput.value.trim();
                    if (btnClear) btnClear.style.display = self.searchQuery ? "inline-block" : "none";
                    self.render();
                });
            }

            if (btnClear) {
                btnClear.addEventListener("click", function() {
                    if (searchInput) searchInput.value = "";
                    self.searchQuery = "";
                    btnClear.style.display = "none";
                    self.render();
                });
            }

            if (btnCase) {
                btnCase.addEventListener("click", function() {
                    self.searchCaseSensitive = !self.searchCaseSensitive;
                    btnCase.classList.toggle("active", self.searchCaseSensitive);
                    self.render();
                });
            }

            if (btnWhole) {
                btnWhole.addEventListener("click", function() {
                    self.searchWholeWord = !self.searchWholeWord;
                    btnWhole.classList.toggle("active", self.searchWholeWord);
                    self.render();
                });
            }

            if (btnToggleRep && rowReplace) {
                btnToggleRep.addEventListener("click", function() {
                    var isShown = rowReplace.style.display !== "none";
                    rowReplace.style.display = isShown ? "none" : "flex";
                    btnToggleRep.classList.toggle("active", !isShown);
                });
            }

            if (btnRepOne && txtReplace) {
                btnRepOne.addEventListener("click", function() {
                    self.replaceOne(txtReplace.value || "");
                });
            }

            if (btnRepAll && txtReplace) {
                btnRepAll.addEventListener("click", function() {
                    self.replaceAll(txtReplace.value || "");
                });
            }

            // Selection Bar Buttons
            var btnCutSelection = document.getElementById("btnRippleCutSelection");
            var btnClearSel = document.getElementById("btnClearSelection");
            var tBody = document.getElementById("transcriptBody");

            if (btnCutSelection) {
                btnCutSelection.addEventListener("click", function() {
                    self.promptRippleCutSelection();
                });
            }

            if (btnClearSel) {
                btnClearSel.addEventListener("click", function() {
                    self.clearSelection();
                });
            }

            if (tBody) {
                tBody.addEventListener("mouseup", function() {
                    setTimeout(function() {
                        self.syncSelectionFromDOM();
                    }, 50);
                });
            }

            // Keyboard shortcut for ripple cutting selected words
            document.addEventListener("keydown", function(e) {
                if ((e.key === "Delete" || e.key === "Backspace") && self.selectedWordIndices.length > 0) {
                    // Make sure not typing inside input/textarea
                    var tag = (e.target && e.target.tagName) ? e.target.tagName.toLowerCase() : "";
                    if (tag !== "input" && tag !== "textarea") {
                        e.preventDefault();
                        self.promptRippleCutSelection();
                    }
                }
            });

            // Confirm Cut Modal Buttons
            var btnExecCut = document.getElementById("btnExecuteCut");
            var btnCancelCut = document.getElementById("btnCancelCut");
            var btnCloseConfirmCut = document.getElementById("btnCloseConfirmCut");
            var cutModal = document.getElementById("confirmCutModal");

            var closeCutModal = function() {
                if (cutModal) cutModal.style.display = "none";
                self.pendingCutAction = null;
            };

            if (btnCloseConfirmCut) btnCloseConfirmCut.addEventListener("click", closeCutModal);
            if (btnCancelCut) btnCancelCut.addEventListener("click", closeCutModal);

            if (btnExecCut) {
                btnExecCut.addEventListener("click", function() {
                    var action = self.pendingCutAction;
                    closeCutModal();
                    if (typeof action === "function") {
                        action();
                    }
                });
            }

            // Filter Pills
            var pillFillers = document.getElementById("pillFilterFillers");
            var pillCensored = document.getElementById("pillFilterCensored");
            var pillPauses = document.getElementById("pillFilterPauses");
            var selectSpeaker = document.getElementById("selectSpeakerFilter");

            if (pillFillers) {
                pillFillers.addEventListener("click", function() {
                    if (self.activeFilter === "filler") {
                        self.activeFilter = "none";
                        pillFillers.classList.remove("active", "active-filler");
                    } else {
                        self.activeFilter = "filler";
                        pillFillers.classList.add("active", "active-filler");
                        if (pillCensored) pillCensored.classList.remove("active", "active-censored");
                        if (pillPauses) pillPauses.classList.remove("active", "active-pauses");
                    }
                    self.render();
                });
            }

            if (pillCensored) {
                pillCensored.addEventListener("click", function() {
                    if (self.activeFilter === "censored") {
                        self.activeFilter = "none";
                        pillCensored.classList.remove("active", "active-censored");
                    } else {
                        self.activeFilter = "censored";
                        pillCensored.classList.add("active", "active-censored");
                        if (pillFillers) pillFillers.classList.remove("active", "active-filler");
                        if (pillPauses) pillPauses.classList.remove("active", "active-pauses");
                    }
                    self.render();
                });
            }

            if (pillPauses) {
                pillPauses.addEventListener("click", function() {
                    if (self.activeFilter === "pauses") {
                        self.activeFilter = "none";
                        pillPauses.classList.remove("active", "active-pauses");
                    } else {
                        self.activeFilter = "pauses";
                        pillPauses.classList.add("active", "active-pauses");
                        if (pillFillers) pillFillers.classList.remove("active", "active-filler");
                        if (pillCensored) pillCensored.classList.remove("active", "active-censored");
                    }
                    self.render();
                });
            }

            if (selectSpeaker) {
                selectSpeaker.addEventListener("change", function() {
                    self.selectedSpeaker = selectSpeaker.value;
                    self.render();
                });
            }

            // Three-dot Menu Dropdown
            var btnMenu = document.getElementById("btnTranscriptMenu");
            var menuDropdown = document.getElementById("transcriptDropdownMenu");

            if (btnMenu && menuDropdown) {
                btnMenu.addEventListener("click", function(e) {
                    e.stopPropagation();
                    menuDropdown.classList.toggle("show");
                });

                document.addEventListener("click", function(e) {
                    if (!menuDropdown.contains(e.target) && e.target !== btnMenu) {
                        menuDropdown.classList.remove("show");
                    }
                });
            }

            // Dropdown Menu Items
            var mDelPauses = document.getElementById("menuDeleteAllPauses");
            var mDelFillers = document.getElementById("menuDeleteAllFillers");
            var mExportTXT = document.getElementById("menuExportTXT");
            var mExportJSON = document.getElementById("menuExportJSON");
            var mImportJSON = document.getElementById("menuImportJSON");
            var mViewOptions = document.getElementById("menuViewOptions");
            var mCensoredWords = document.getElementById("menuCensoredWords");
            var mToggleAutoScroll = document.getElementById("menuToggleAutoScroll");
            var mToggleSpellCheck = document.getElementById("menuToggleSpellCheck");
            var fileInput = document.getElementById("fileImportTranscriptJSON");

            if (mDelPauses) {
                mDelPauses.addEventListener("click", function() {
                    if (menuDropdown) menuDropdown.classList.remove("show");
                    self.promptDeleteAllPauses();
                });
            }

            if (mDelFillers) {
                mDelFillers.addEventListener("click", function() {
                    if (menuDropdown) menuDropdown.classList.remove("show");
                    self.promptDeleteAllFillers();
                });
            }

            if (mExportTXT) {
                mExportTXT.addEventListener("click", function() {
                    if (menuDropdown) menuDropdown.classList.remove("show");
                    exportTranscriptTXT();
                });
            }

            if (mExportJSON) {
                mExportJSON.addEventListener("click", function() {
                    if (menuDropdown) menuDropdown.classList.remove("show");
                    self.exportInternalJSON();
                });
            }

            if (mImportJSON && fileInput) {
                mImportJSON.addEventListener("click", function() {
                    if (menuDropdown) menuDropdown.classList.remove("show");
                    fileInput.value = "";
                    fileInput.click();
                });

                fileInput.addEventListener("change", function(e) {
                    var files = e.target.files;
                    if (files && files.length > 0) {
                        self.importInternalJSON(files[0]);
                    }
                });
            }

            if (mViewOptions) {
                mViewOptions.addEventListener("click", function() {
                    if (menuDropdown) menuDropdown.classList.remove("show");
                    var modal = document.getElementById("modalViewOptions");
                    var range = document.getElementById("rangeMinPauseLength");
                    var lbl = document.getElementById("lblMinPauseVal");
                    if (range) range.value = self.minPauseLength;
                    if (lbl) lbl.innerText = self.minPauseLength.toFixed(2) + "s";
                    var chkF = document.getElementById("chkShowFillers");
                    if (chkF) chkF.checked = self.showFillers;
                    var chkP = document.getElementById("chkShowPauses");
                    if (chkP) chkP.checked = self.showPauses;
                    var chkC = document.getElementById("chkShowCensored");
                    if (chkC) chkC.checked = self.showCensored;
                    var chkA = document.getElementById("chkAutoScrollToggle");
                    if (chkA) chkA.checked = self.autoScrollEnabled;
                    if (modal) modal.style.display = "flex";
                });
            }

            if (mCensoredWords) {
                mCensoredWords.addEventListener("click", function() {
                    if (menuDropdown) menuDropdown.classList.remove("show");
                    var modal = document.getElementById("modalCensoredWords");
                    var txt = document.getElementById("txtCensoredWordsList");
                    if (txt) txt.value = self.censoredWords.join(", ");
                    if (modal) modal.style.display = "flex";
                });
            }

            if (mToggleAutoScroll) {
                mToggleAutoScroll.addEventListener("click", function() {
                    if (menuDropdown) menuDropdown.classList.remove("show");
                    self.toggleAutoScroll(!self.autoScrollEnabled);
                });
            }

            if (mToggleSpellCheck) {
                mToggleSpellCheck.addEventListener("click", function() {
                    if (menuDropdown) menuDropdown.classList.remove("show");
                    self.spellCheckEnabled = !self.spellCheckEnabled;
                    var tBody = document.getElementById("transcriptBody");
                    if (tBody) tBody.setAttribute("spellcheck", self.spellCheckEnabled ? "true" : "false");
                    var lbl = document.getElementById("lblSpellCheckCheck");
                    if (lbl) lbl.innerText = self.spellCheckEnabled ? "ON" : "OFF";
                });
            }

            // View Options Modal Controls
            var rangePause = document.getElementById("rangeMinPauseLength");
            var chkFillers = document.getElementById("chkShowFillers");
            var chkPauses = document.getElementById("chkShowPauses");
            var chkCensored = document.getElementById("chkShowCensored");
            var chkAutoScroll = document.getElementById("chkAutoScrollToggle");
            var btnCloseViewOpt = document.getElementById("btnCloseViewOptions");
            var btnDoneViewOpt = document.getElementById("btnDoneViewOptions");

            if (rangePause) {
                rangePause.addEventListener("input", function() {
                    self.setMinPauseLength(rangePause.value);
                });
            }

            if (chkFillers) {
                chkFillers.addEventListener("change", function() {
                    self.showFillers = chkFillers.checked;
                    self.render();
                });
            }

            if (chkPauses) {
                chkPauses.addEventListener("change", function() {
                    self.showPauses = chkPauses.checked;
                    self.render();
                });
            }

            if (chkCensored) {
                chkCensored.addEventListener("change", function() {
                    self.showCensored = chkCensored.checked;
                    self.render();
                });
            }

            if (chkAutoScroll) {
                chkAutoScroll.addEventListener("change", function() {
                    self.toggleAutoScroll(chkAutoScroll.checked);
                });
            }

            var closeViewOptModal = function() {
                var modal = document.getElementById("modalViewOptions");
                if (modal) modal.style.display = "none";
            };

            if (btnCloseViewOpt) btnCloseViewOpt.addEventListener("click", closeViewOptModal);
            if (btnDoneViewOpt) btnDoneViewOpt.addEventListener("click", closeViewOptModal);

            // Censored Words Modal Controls
            var btnCloseCen = document.getElementById("btnCloseCensoredWords");
            var btnSaveCen = document.getElementById("btnSaveCensoredWords");
            var btnResetCen = document.getElementById("btnResetCensoredWords");

            var closeCenModal = function() {
                var modal = document.getElementById("modalCensoredWords");
                if (modal) modal.style.display = "none";
            };

            if (btnCloseCen) btnCloseCen.addEventListener("click", closeCenModal);

            if (btnSaveCen) {
                btnSaveCen.addEventListener("click", function() {
                    var txt = document.getElementById("txtCensoredWordsList");
                    if (txt) {
                        var raw = txt.value.split(",");
                        var cleanList = [];
                        for (var i = 0; i < raw.length; i++) {
                            var item = raw[i].trim().toLowerCase();
                            if (item.length > 0 && cleanList.indexOf(item) === -1) {
                                cleanList.push(item);
                            }
                        }
                        self.censoredWords = cleanList;
                        self.render();
                        showAlertModal("Censored Words Updated", cleanList.length + " words configured for censorship highlighting.");
                    }
                    closeCenModal();
                });
            }

            if (btnResetCen) {
                btnResetCen.addEventListener("click", function() {
                    self.censoredWords = ["damn", "shit", "fuck", "bitch", "crap", "ass", "bastard", "dick", "piss"];
                    var txt = document.getElementById("txtCensoredWordsList");
                    if (txt) txt.value = self.censoredWords.join(", ");
                    self.render();
                });
            }
        },

        toggleAutoScroll: function(enabled) {
            this.autoScrollEnabled = !!enabled;
            var lbl = document.getElementById("lblAutoScrollCheck");
            if (lbl) lbl.innerText = this.autoScrollEnabled ? "ON" : "OFF";
            var chk = document.getElementById("chkAutoScrollToggle");
            if (chk) chk.checked = this.autoScrollEnabled;

            if (this.autoScrollEnabled) {
                this.startAutoScrollWatcher();
            } else {
                this.stopAutoScrollWatcher();
            }
        },

        exportInternalJSON: function() {
            var self = this;
            ensureLicensedAction("export", function () {
                if (!self.words || self.words.length === 0) {
                    showAlertModal("No Transcript", "No transcript available to export. Please transcribe first.");
                    return;
                }

                var os = require("os");
                var path = require("path");
                var fs = require("fs");
                var desktopPath = path.join(os.homedir(), "Desktop");

                var sequenceName = document.getElementById("lblActiveSeqName") ? document.getElementById("lblActiveSeqName").innerText : "Sequence";
                if (sequenceName === "Loading..." || sequenceName === "None open" || !sequenceName) sequenceName = "Sequence";
                var safeSeqName = sequenceName.replace(/[^a-z0-9]/gi, "_").toLowerCase();
                var tempPath = path.join(desktopPath, safeSeqName + "_ultra_transcript_model.json");

                var payload = {
                    version: "ultra-1.0",
                    sequenceName: sequenceName,
                    exportedAt: new Date().toISOString(),
                    minPauseLength: self.minPauseLength,
                    words: self.words
                };

                try {
                    fs.writeFileSync(tempPath, JSON.stringify(payload, null, 2), "utf8");
                    showAlertModal("Internal JSON Exported", "Transcript model JSON exported successfully to your Desktop.");
                    revealInExplorer(tempPath);
                } catch (e) {
                    showAlertModal("Export Error", "Failed to write file: " + e.message);
                }
            });
        },

        importInternalJSON: function(file) {
            var self = this;
            if (!file) return;

            var reader = new FileReader();
            reader.onload = function(e) {
                try {
                    var parsed = JSON.parse(e.target.result);
                    var words = parsed.words || (Array.isArray(parsed) ? parsed : []);
                    if (!words || words.length === 0) {
                        showAlertModal("Invalid Transcript", "The selected JSON file does not contain a valid word array.");
                        return;
                    }

                    self.buildModel(words);
                    self.render();

                    // Reconstruct captions for SubtitleEditor
                    var captions = [];
                    var curCue = null;
                    for (var i = 0; i < self.words.length; i++) {
                        var w = self.words[i];
                        if (!curCue) {
                            curCue = { start: w.start, end: w.end, text: w.text };
                        } else {
                            var gap = w.start - curCue.end;
                            if (curCue.text.length + w.text.length > 37 || gap > 0.8) {
                                captions.push(curCue);
                                curCue = { start: w.start, end: w.end, text: w.text };
                            } else {
                                curCue.text += " " + w.text;
                                curCue.end = w.end;
                            }
                        }
                    }
                    if (curCue) captions.push(curCue);

                    if (typeof SubtitleEditor !== "undefined" && SubtitleEditor.loadCaptions) {
                        SubtitleEditor.loadCaptions(captions, self.words);
                    }

                    var successContainer = document.getElementById("transcribeSuccessContainer");
                    if (successContainer) successContainer.style.display = "block";

                    if (window.SequenceStateManager) {
                        window.SequenceStateManager.transcribedSequenceKey = window.SequenceStateManager.currentKey;
                        window.SequenceStateManager.status = "Transcribed";
                        window.SequenceStateManager.updateUI(window.SequenceStateManager.lastResult);
                    }

                    showAlertModal("Transcript Imported", "Imported " + self.words.length + " words and " + captions.length + " subtitle cues.");
                } catch (err) {
                    showAlertModal("Import Error", "Failed to parse JSON file: " + err.message);
                }
            };
            reader.readAsText(file);
        }
    };

    // Initialize UltraTranscript UI listeners
    UltraTranscript.init();

    window.SequenceStateManager = {
        currentKey: "",
        status: "Checking...",
        lastResult: null,
        isTranscribing: false,
        isChecking: false,
        transcribedSequenceKey: "",

        updateUI: function(res) {
            var lblName = document.getElementById("lblActiveSeqName");
            var lblDur = document.getElementById("lblActiveSeqDur");
            var lblClips = document.getElementById("lblActiveSeqClips");
            var lblStatus = document.getElementById("lblActiveSeqStatus");
            var lblBadge = document.getElementById("lblSeqStatusBadge");
            var btnTranscribe = document.getElementById("btnTranscribe");

            var selScope = document.getElementById("selectTranscribeScope");
            var lblClipBadge = document.getElementById("lblClipCountBadge");

            if (this.isTranscribing) {
                this.status = "Transcribing";
                if (lblStatus) lblStatus.innerText = "Transcribing";
                if (lblBadge) {
                    lblBadge.innerText = "Transcribing";
                    lblBadge.className = "badge-status transcribing";
                }
                if (btnTranscribe) {
                    btnTranscribe.disabled = true;
                    btnTranscribe.innerText = "Transcribing Speech AI...";
                }
                return;
            }

            if (!res || !res.success) {
                this.currentKey = "";
                this.status = "No Sequence";
                if (lblName) lblName.innerText = "None";
                if (lblDur) lblDur.innerText = "0.00s";
                if (lblClips) lblClips.innerText = "0";
                if (lblStatus) lblStatus.innerText = "No Sequence";
                if (lblBadge) {
                    lblBadge.innerText = "No Sequence";
                    lblBadge.className = "badge-status no-sequence";
                }
                if (selScope) {
                    selScope.innerHTML = '<option value="all" disabled>No sequence</option>';
                    selScope.disabled = true;
                }
                if (lblClipBadge) lblClipBadge.innerText = "No sequence";
                if (btnTranscribe) {
                    btnTranscribe.disabled = true;
                    btnTranscribe.innerText = "Transcribe Sequence (No Sequence)";
                }
                return;
            }

            var newKey = (res.name || "Seq") + "_" + (res.id || "") + "_" + (res.duration || 0).toFixed(1);
            if (newKey !== this.currentKey) {
                this.currentKey = newKey;
                // If sequence switched and is not the transcribed sequence, clear interactive transcript
                if (this.transcribedSequenceKey !== newKey) {
                    var successContainer = document.getElementById("transcribeSuccessContainer");
                    if (successContainer) successContainer.style.display = "none";
                    if (window.UltraTranscript) {
                        window.UltraTranscript.buildModel([]);
                        window.UltraTranscript.render();
                    }
                    if (SubtitleEditor && SubtitleEditor.loadCaptions) {
                        SubtitleEditor.loadCaptions([], []);
                    }
                }
            }

            if (lblName) lblName.innerText = res.name || "Sequence";
            if (lblDur) lblDur.innerText = (res.duration || 0).toFixed(2) + "s";
            if (lblClips) lblClips.innerText = (res.clipCount || 0).toString();

            if (res.clipCount === 0) {
                this.status = "No Media";
                if (lblStatus) lblStatus.innerText = "No Media";
                if (lblBadge) {
                    lblBadge.innerText = "No Media";
                    lblBadge.className = "badge-status no-sequence";
                }
                if (selScope) {
                    selScope.innerHTML = '<option value="all" disabled>No media clips</option>';
                    selScope.disabled = true;
                }
                if (lblClipBadge) lblClipBadge.innerText = "0 clips";
                if (btnTranscribe) {
                    btnTranscribe.disabled = true;
                    btnTranscribe.innerText = "Transcribe Sequence (No Media Found)";
                }
            } else {
                // Populate Transcription Scope dropdown with clips
                if (typeof ExtendScriptBridge !== "undefined" && ExtendScriptBridge.getSequenceClips) {
                    ExtendScriptBridge.getSequenceClips(function(clipsRes) {
                        if (clipsRes && clipsRes.success && clipsRes.clips && clipsRes.clips.length > 0) {
                            if (selScope) {
                                var prevVal = selScope.value;
                                var html = '<option value="all">Entire Active Sequence (' + (res.duration || 0).toFixed(1) + 's)</option>';
                                for (var c = 0; c < clipsRes.clips.length; c++) {
                                    var cl = clipsRes.clips[c];
                                    var clLabel = '[' + cl.trackName + '] ' + cl.name + ' (' + cl.start.toFixed(1) + 's - ' + cl.end.toFixed(1) + 's)';
                                    html += '<option value="' + cl.index + '">' + clLabel + '</option>';
                                }
                                selScope.innerHTML = html;
                                if (prevVal && (prevVal === "all" || parseInt(prevVal, 10) < clipsRes.clips.length)) {
                                    selScope.value = prevVal;
                                } else {
                                    selScope.value = "all";
                                }
                                selScope.disabled = false;
                            }
                            if (lblClipBadge) {
                                lblClipBadge.innerText = clipsRes.clips.length + (clipsRes.clips.length === 1 ? " clip" : " clips");
                            }
                        } else {
                            if (selScope) {
                                selScope.innerHTML = '<option value="all">Entire Active Sequence (' + (res.duration || 0).toFixed(1) + 's)</option>';
                                selScope.disabled = false;
                            }
                            if (lblClipBadge) lblClipBadge.innerText = "Entire Sequence";
                        }
                    });
                }

                var isScopeSingle = selScope && selScope.value !== "all";

                if (this.transcribedSequenceKey === newKey && window.UltraTranscript && window.UltraTranscript.words && window.UltraTranscript.words.length > 0) {
                    this.status = "Transcribed";
                    if (lblStatus) lblStatus.innerText = "Transcribed";
                    if (lblBadge) {
                        lblBadge.innerText = "Transcribed";
                        lblBadge.className = "badge-status transcribed";
                    }
                    if (btnTranscribe) {
                        btnTranscribe.disabled = false;
                        btnTranscribe.innerText = isScopeSingle ? "Transcribe Selected Clip" : "Re-transcribe Sequence";
                    }
                } else {
                    this.status = "Untranscribed";
                    if (lblStatus) lblStatus.innerText = "Untranscribed";
                    if (lblBadge) {
                        lblBadge.innerText = "Untranscribed";
                        lblBadge.className = "badge-status untranscribed";
                    }
                    if (btnTranscribe) {
                        btnTranscribe.disabled = false;
                        btnTranscribe.innerText = isScopeSingle ? "Transcribe Selected Clip" : "Transcribe Sequence";
                    }
                }
            }
        },

        poll: function() {
            if (this.isTranscribing || this.isChecking) return;
            this.isChecking = true;
            var self = this;

            var safetyTimer = setTimeout(function() {
                self.isChecking = false;
            }, 1500);

            if (typeof ExtendScriptBridge !== "undefined" && ExtendScriptBridge.getActiveSequenceInfo) {
                ExtendScriptBridge.getActiveSequenceInfo(function(res) {
                    clearTimeout(safetyTimer);
                    self.isChecking = false;
                    self.lastResult = res;
                    self.updateUI(res);
                });
            } else {
                clearTimeout(safetyTimer);
                self.isChecking = false;
            }
        },

        startWatcher: function() {
            var self = this;
            self.poll();
            setInterval(function() {
                self.poll();
            }, 1000);
        }
    };

    // Start 1-second active sequence watcher
    SequenceStateManager.startWatcher();

    // 2. Restore saved preferences BEFORE setting up listeners
    var savedPrefs = UserPreferences.load();
    UserPreferences.restore(savedPrefs);

    // 3. Transcribe Sliders with auto-save
    var sChars = document.getElementById("sliderMaxChars");
    var lblChars = document.getElementById("lblMaxCharsVal");
    if (sChars && lblChars) {
        sChars.addEventListener("input", function () {
            lblChars.innerText = sChars.value;
            UserPreferences.autoSave();
        });
    }

    var sDur = document.getElementById("sliderMaxDur");
    var lblDur = document.getElementById("lblMaxDurVal");
    if (sDur && lblDur) {
        sDur.addEventListener("input", function () {
            lblDur.innerText = (parseFloat(sDur.value) / 10.0).toFixed(1) + "s";
            UserPreferences.autoSave();
        });
    }

    var sGap = document.getElementById("sliderGapFrames");
    var lblGap = document.getElementById("lblGapFramesVal");
    if (sGap && lblGap) {
        sGap.addEventListener("input", function () {
            lblGap.innerText = sGap.value + " frames";
            UserPreferences.autoSave();
        });
    }

    // Reset Buttons for Sliders (also auto-save)
    var rChars = document.getElementById("resetMaxChars");
    if (rChars && sChars && lblChars) {
        rChars.addEventListener("click", function () {
            sChars.value = 37;
            lblChars.innerText = "37";
            UserPreferences.autoSave();
        });
    }

    var rDur = document.getElementById("resetMaxDur");
    if (rDur && sDur && lblDur) {
        rDur.addEventListener("click", function () {
            sDur.value = 30;
            lblDur.innerText = "3.0s";
            UserPreferences.autoSave();
        });
    }

    var rGap = document.getElementById("resetGapFrames");
    if (rGap && sGap && lblGap) {
        rGap.addEventListener("click", function () {
            sGap.value = 0;
            lblGap.innerText = "0 frames";
            UserPreferences.autoSave();
        });
    }

    // Auto-save on model, radio, and checkbox changes
    var selectModel = document.getElementById("selectModel");
    if (selectModel) selectModel.addEventListener("change", function () { UserPreferences.autoSave(); });

    // Stylize controls change listeners
    var sFontSize = document.getElementById("sliderStylizeFontSize");
    var lblFontSize = document.getElementById("lblStylizeFontSizeVal");
    if (sFontSize && lblFontSize) {
        sFontSize.addEventListener("input", function () {
            lblFontSize.innerText = sFontSize.value + "px";
            UserPreferences.autoSave();
        });
    }

    var stylizeControlIds = [
        "selectFontFamily", "selectFontWeight", "selectPosition", "selectAlign", "colorText"
    ];
    stylizeControlIds.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) {
            el.addEventListener("change", function () { UserPreferences.autoSave(); });
            if (el.tagName === "INPUT" && el.type === "color") {
                el.addEventListener("input", function () { UserPreferences.autoSave(); });
            }
        }
    });

    var radios = document.querySelectorAll('input[name="lineMode"]');
    radios.forEach(function (r) { r.addEventListener("change", function () { UserPreferences.autoSave(); }); });

    var chkIds = ["chkRemoveFillers", "chkVersioning"];
    chkIds.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener("change", function () { UserPreferences.autoSave(); });
    });

    // 4. Initialize Sub-Managers
    SubtitleEditor.init();
    SettingsManager.init();

    // 5. UI Buttons
    var btnTranscribe = document.getElementById("btnTranscribe");
    var btnCancelTranscribe = document.getElementById("btnCancelTranscribe");
    var btnApplyEdits = document.getElementById("btnApplyEdits");
    var btnApplyStylized = document.getElementById("btnApplyStylized");
    var btnExportSRT = document.getElementById("btnExportSRT");
    var btnModalCancel = document.getElementById("btnModalCancel");
    var btnModalClose = document.getElementById("btnModalClose");

    if (btnCancelTranscribe) {
        btnCancelTranscribe.addEventListener("click", function () {
            cancelTranscribeWorkflow();
        });
    }

    if (btnApplyStylized) {
        btnApplyStylized.addEventListener("click", function () {
            applyStylizedCaptionsFromTab();
        });
    }

    if (btnTranscribe) {
        btnTranscribe.addEventListener("click", function () {
            runTranscribeWorkflow();
        });
    }

    var selTransScope = document.getElementById("selectTranscribeScope");
    if (selTransScope) {
        selTransScope.addEventListener("change", function () {
            var btnTrans = document.getElementById("btnTranscribe");
            if (btnTrans && !btnTrans.disabled) {
                if (selTransScope.value === "all") {
                    btnTrans.innerText = (SequenceStateManager.transcribedSequenceKey === SequenceStateManager.currentKey) ? "Re-transcribe Sequence" : "Transcribe Sequence";
                } else {
                    btnTrans.innerText = "Transcribe Selected Clip";
                }
            }
        });
    }

    if (btnApplyEdits) {
        btnApplyEdits.addEventListener("click", function () {
            console.log("[CaptionGeneratorPro] #btnApplyEdits clicked");
            importSubtitlesToSequence();
        });
    }

    var btnRefreshCues = document.getElementById("btnRefreshCues");
    if (btnRefreshCues) {
        btnRefreshCues.addEventListener("click", function () {
            if (window.UltraTranscript && window.UltraTranscript.words && window.UltraTranscript.words.length > 0) {
                window.UltraTranscript.syncCaptionsModel();
                showAlertModal("Captions Refreshed", "Generated subtitle cues from the current transcript model.");
            } else {
                showAlertModal("No Transcript", "No transcript data available. Please transcribe a sequence in the Transcript tab first.");
            }
        });
    }

    if (btnExportSRT) {
        btnExportSRT.addEventListener("click", function () {
            exportSRTFile();
        });
    }

    var btnExportStatic = document.getElementById("btnExportStatic");
    if (btnExportStatic) {
        btnExportStatic.addEventListener("click", function () {
            exportStaticTranscript();
        });
    }

    var btnExportTXT = document.getElementById("btnExportTXT");
    if (btnExportTXT) {
        btnExportTXT.addEventListener("click", function () {
            exportTranscriptTXT();
        });
    }

    var linkHowToImport = document.getElementById("linkHowToImport");
    if (linkHowToImport) {
        linkHowToImport.addEventListener("click", function (e) {
            e.preventDefault();
            document.getElementById("importGuideModal").style.display = "flex";
        });
    }

    var btnCloseImportGuide = document.getElementById("btnCloseImportGuide");
    if (btnCloseImportGuide) {
        btnCloseImportGuide.addEventListener("click", function () {
            document.getElementById("importGuideModal").style.display = "none";
        });
    }

    var btnDismissImportGuide = document.getElementById("btnDismissImportGuide");
    if (btnDismissImportGuide) {
        btnDismissImportGuide.addEventListener("click", function () {
            document.getElementById("importGuideModal").style.display = "none";
        });
    }

    if (btnModalCancel) {
        btnModalCancel.addEventListener("click", function () {
            DependencyInstaller.cancelDownload();
            document.getElementById("statusLog").innerText = "Download cancelled by user.";
            btnModalCancel.style.display = "none";
            btnModalClose.style.display = "inline-block";
        });
    }

    if (btnModalClose) {
        btnModalClose.addEventListener("click", function () {
            document.getElementById("installerModal").style.display = "none";
        });
    }

    // 6. Silent background dependency check (populates installed model dropdown)
    DependencyInstaller.checkStatus(function (status) {
        if (status && status.installed_models) {
            updateModelDropdown(status.installed_models);
            // Re-apply saved model selection after dropdown is populated
            var savedModel = UserPreferences.load().model;
            var sel = document.getElementById("selectModel");
            if (sel && savedModel) sel.value = savedModel;
        }
    });
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

    ALL_MODELS_ORDER.forEach(function (m) {
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
        if (typeof showAlertModal === "function") {
            showAlertModal("License Required", "License not activated. Please activate your license in Settings.");
        }
        return;
    }

    LicenseManager.validate(function (valid, message) {
        if (valid) {
            callback();
        } else {
            if (typeof showAlertModal === "function") {
                showAlertModal("License Required", "License not activated. Please activate your license in Settings.");
            }
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
        } catch (e) {
            console.warn("Error killing Python process:", e);
        }
        activePythonProcess = null;
    }

    var btn = document.getElementById("btnTranscribe");
    var btnCancel = document.getElementById("btnCancelTranscribe");
    if (btn) {
        btn.disabled = false;
        btn.innerText = "Transcribe Sequence";
    }
    if (btnCancel) {
        btnCancel.style.display = "none";
    }
    var progressContainer = document.getElementById("transcribeProgressContainer");
    if (progressContainer) progressContainer.style.display = "none";

    if (window.SequenceStateManager) {
        window.SequenceStateManager.isTranscribing = false;
        window.SequenceStateManager.poll();
    }

    showAlertModal("Transcription Cancelled", "Transcription cancelled by user.");
}

function runTranscribeWorkflow() {
    ensureLicensedAction("transcribe", function () {
        var btn = document.getElementById("btnTranscribe");
        var btnCancel = document.getElementById("btnCancelTranscribe");
        if (!btn || btn.disabled) return;

        isTranscriptionCancelled = false;
        var originalText = "Transcribe Sequence";
        btn.disabled = true;
        btn.innerText = "Checking Engine...";

        if (window.SequenceStateManager) {
            window.SequenceStateManager.isTranscribing = true;
            window.SequenceStateManager.updateUI(window.SequenceStateManager.lastResult);
        }

        // Pre-flight dependency check in strict order (A -> B -> C -> D -> E)
        DependencyInstaller.checkStatus(function(status) {
            if (status && status.installed_models) {
                updateModelDropdown(status.installed_models);
            }

            // Check B: Bundled AI runtime readiness
            if (!status || !status.python || !status.whisper_pkg || !status.pytorch) {
                btn.disabled = false;
                btn.innerText = originalText;
                if (btnCancel) btnCancel.style.display = "none";
                if (window.SequenceStateManager) {
                    window.SequenceStateManager.isTranscribing = false;
                    window.SequenceStateManager.poll();
                }
                showAlertModal("AI Runtime Error", "AI runtime not found. Please reinstall using install.bat.");
                return;
            }

            // Check C: Selected model installed
            var selModelEl = document.getElementById("selectModel");
            var selectedModel = selModelEl ? selModelEl.value : "base";
            var installedModels = (status && status.installed_models) ? status.installed_models : [];

            if (installedModels.indexOf(selectedModel) === -1) {
                btn.disabled = false;
                btn.innerText = originalText;
                if (btnCancel) btnCancel.style.display = "none";
                if (window.SequenceStateManager) {
                    window.SequenceStateManager.isTranscribing = false;
                    window.SequenceStateManager.poll();
                }
                showAlertModal("Model Required", "Selected model is not installed. Please download it from Settings → Speech Models Manager.");
                return;
            }

            // Check D: FFmpeg binary missing
            if (!status.ffmpeg) {
                btn.disabled = false;
                btn.innerText = originalText;
                if (btnCancel) btnCancel.style.display = "none";
                if (window.SequenceStateManager) {
                    window.SequenceStateManager.isTranscribing = false;
                    window.SequenceStateManager.poll();
                }
                showAlertModal("FFmpeg Error", "FFmpeg is missing. Please reinstall Caption Generator Pro.");
                return;
            }

            var progressContainer = document.getElementById("transcribeProgressContainer");
            var statusText = document.getElementById("transcribeStatusText");
            var progressBar = document.getElementById("transcribeProgressBar");
            var successContainer = document.getElementById("transcribeSuccessContainer");

            btn.innerText = "Processing...";
            if (btnCancel) btnCancel.style.display = "inline-block";
            if (progressContainer) progressContainer.style.display = "block";
            if (successContainer) successContainer.style.display = "none";
            if (progressBar) progressBar.style.width = "10%";
            if (statusText) statusText.innerText = "Extracting sequence data...";

            var proceedWithAudioPath = function (audioPath, exportStart, projectDetails) {
                if (isTranscriptionCancelled) return;
                btn.innerText = "Transcribing Speech AI...";
                if (progressBar) progressBar.style.width = "40%";
                if (statusText) statusText.innerText = "Transcribing with AI engine...";
                runPythonBackend(audioPath, projectDetails, function (backendRes) {
                    if (btnCancel) btnCancel.style.display = "none";
                    if (isTranscriptionCancelled) return;

                    if (!backendRes || !backendRes.success) {
                        btn.disabled = false;
                        btn.innerText = originalText;
                        if (progressContainer) progressContainer.style.display = "none";
                        if (window.SequenceStateManager) {
                            window.SequenceStateManager.isTranscribing = false;
                            window.SequenceStateManager.poll();
                        }
                        var rawErr = (backendRes && backendRes.error) ? backendRes.error : "Unknown backend engine error";
                        console.error("Transcription Engine Technical Log:", rawErr);
                        if (backendRes && backendRes.stderr) console.error("Backend Stderr:", backendRes.stderr);
                        if (backendRes && backendRes.stdout) console.error("Backend Stdout:", backendRes.stdout);

                        if (rawErr.toLowerCase().indexOf("model") !== -1 && rawErr.toLowerCase().indexOf("not found") !== -1) {
                            showAlertModal("Model Required", "Selected model is not installed. Please download it from Settings → Speech Models Manager.");
                        } else {
                            showAlertModal("Transcription Error", "Transcription failed.\n\nTechnical details:\n" + rawErr);
                        }
                        return;
                    }

                    btn.disabled = false;
                    if (progressBar) progressBar.style.width = "100%";
                    if (statusText) statusText.innerText = "Done!";
                    
                    setTimeout(function() {
                        if (progressContainer) progressContainer.style.display = "none";
                        if (successContainer) successContainer.style.display = "block";
                    }, 500);

                    var offset = parseFloat(exportStart) || 0;
                    var finalCaptions = backendRes.captions || [];
                    var finalWords = backendRes.words || [];

                    if (offset > 0) {
                        finalCaptions = finalCaptions.map(function (c) {
                            return Object.assign({}, c, {
                                start: Math.round((c.start + offset) * 1000) / 1000,
                                end: Math.round((c.end + offset) * 1000) / 1000
                            });
                        });
                        finalWords = finalWords.map(function (w) {
                            return Object.assign({}, w, {
                                start: Math.round((w.start + offset) * 1000) / 1000,
                                end: Math.round((w.end + offset) * 1000) / 1000
                            });
                        });
                    }

                    // Run ffmpeg silencedetect pass on sequence audio to augment pause recognition
                    runSilenceDetection(audioPath, offset, function (silences) {
                        // Build interactive transcript model & render on Transcript tab
                        if (window.UltraTranscript) {
                            window.UltraTranscript.buildModel(finalWords, silences);
                            window.UltraTranscript.render();
                        }

                        // Keep captions data available for Captions tab from same result
                        if (typeof SubtitleEditor !== "undefined" && SubtitleEditor.loadCaptions) {
                            SubtitleEditor.loadCaptions(finalCaptions, finalWords);
                        }

                        if (window.SequenceStateManager) {
                            window.SequenceStateManager.isTranscribing = false;
                            window.SequenceStateManager.transcribedSequenceKey = window.SequenceStateManager.currentKey;
                            window.SequenceStateManager.updateUI(window.SequenceStateManager.lastResult);
                        }

                        if (backendRes.warning) {
                            showAlertModal("Translation Warning", backendRes.warning);
                        }
                    });
                });
            };

            ExtendScriptBridge.getProjectDetails(function (projectDetails) {
                if (isTranscriptionCancelled) return;
                var tempAudioPath = getTempAudioPath();

                var selScopeEl = document.getElementById("selectTranscribeScope");
                var selectedScope = selScopeEl ? selScopeEl.value : "all";

                ExtendScriptBridge.exportAudio(tempAudioPath, selectedScope, function (exportRes) {
                    if (isTranscriptionCancelled) return;

                    // Check E: No active sequence / comp media
                    if (!exportRes || !exportRes.success) {
                        btn.disabled = false;
                        btn.innerText = originalText;
                        if (btnCancel) btnCancel.style.display = "none";
                        if (progressContainer) progressContainer.style.display = "none";
                        if (window.SequenceStateManager) {
                            window.SequenceStateManager.isTranscribing = false;
                            window.SequenceStateManager.poll();
                        }
                        var errMsg = (exportRes && exportRes.error) ? exportRes.error : "No audio/video found on the active sequence or selected clip.";
                        showAlertModal("Media Export Notice", errMsg);
                        return;
                    }

                    proceedWithAudioPath(exportRes.audioPath, exportRes.exportStart || 0, projectDetails);
                });
            });
        });
    });
}

function runSilenceDetection(audioPath, offset, callback) {
    if (typeof require === "undefined" || !audioPath) {
        if (callback) callback([]);
        return;
    }

    var fs = require("fs");
    if (!fs.existsSync(audioPath)) {
        if (callback) callback([]);
        return;
    }

    var cp = require("child_process");
    var ffmpegExe = (typeof DependencyInstaller !== "undefined" && DependencyInstaller.getFfmpegExecutable) ? DependencyInstaller.getFfmpegExecutable() : "ffmpeg";

    var args = [
        "-nostats",
        "-i", audioPath,
        "-af", "silencedetect=noise=-30dB:d=0.05",
        "-f", "null",
        "-"
    ];

    try {
        var proc = cp.spawn(ffmpegExe, args, {
            windowsHide: true
        });
        var stderrData = "";

        proc.stderr.on("data", function(data) {
            stderrData += data.toString();
        });

        proc.on("error", function(err) {
            console.warn("[CaptionGeneratorUltra] Silence detection spawn error:", err);
            if (callback) callback([]);
        });

        proc.on("close", function(code) {
            var silences = [];
            var lines = stderrData.split(/\r?\n/);
            var currentSilenceStart = null;

            for (var i = 0; i < lines.length; i++) {
                var line = lines[i];
                var startMatch = line.match(/silence_start:\s*([0-9.]+)/);
                if (startMatch) {
                    currentSilenceStart = parseFloat(startMatch[1]);
                }

                var endMatch = line.match(/silence_end:\s*([0-9.]+)\s*\|\s*silence_duration:\s*([0-9.]+)/);
                if (endMatch) {
                    var sEnd = parseFloat(endMatch[1]);
                    var sDur = parseFloat(endMatch[2]);
                    var sStart = (currentSilenceStart !== null) ? currentSilenceStart : Math.max(0, sEnd - sDur);

                    var finalStart = Math.round((sStart + offset) * 1000) / 1000;
                    var finalEnd = Math.round((sEnd + offset) * 1000) / 1000;
                    var finalDur = Math.round((finalEnd - finalStart) * 1000) / 1000;

                    if (finalDur >= 0.05) {
                        silences.push({
                            start: finalStart,
                            end: finalEnd,
                            duration: finalDur
                        });
                    }
                    currentSilenceStart = null;
                }
            }
            console.log("[CaptionGeneratorUltra] Silence detection found " + silences.length + " silence intervals.");
            if (callback) callback(silences);
        });
    } catch(e) {
        console.warn("[CaptionGeneratorUltra] Silence detection failed:", e);
        if (callback) callback([]);
    }
}

function runPythonBackend(audioPath, projectDetails, callback) {
    if (typeof require === "undefined") {
        // Preview mode mock response
        setTimeout(function () {
            callback({
                success: true,
                files: { srt: "mock.srt", json: "mock.json" },
                captions: [
                    { start: 0.5, end: 3.0, text: "Welcome to Caption Generator Pro." },
                    { start: 3.2, end: 6.0, text: "Edit your subtitle cues here before importing." }
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
            error: "Bundled Python runtime not found at:\n" + path.join(baseDir, "runtime") + "\n\nPlease reinstall Caption Generator Pro using install.bat."
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
    var hardware = SettingsManager.settings ? SettingsManager.settings.hardware : "cuda";

    var args = [
        pyScript,
        "--audio", audioPath,
        "--model", model,
        "--device", hardware,
        "--language", sourceLang,
        "--target_language", targetLang,
        "--project_path", projectDetails.path || "",
        "--project_name", projectDetails.name || "UntitledProject",
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

    proc.stdout.on("data", function (data) {
        if (isTranscriptionCancelled) return;
        stdoutData += data.toString();
    });

    proc.stderr.on("data", function (data) {
        if (isTranscriptionCancelled) return;
        var str = data.toString();
        stderrData += str;
        console.warn("Backend log:", str);
    });

    proc.on("close", function (code) {
        activePythonProcess = null;
        if (isTranscriptionCancelled) {
            console.log("[CGP] Process closed after user cancellation.");
            return;
        }

        var parsed = null;
        try {
            var jsonMatch = stdoutData.match(/---RESULT_JSON_START---\s*([\s\S]*?)\s*---RESULT_JSON_END---/);
            if (jsonMatch && jsonMatch[1]) {
                parsed = JSON.parse(jsonMatch[1]);
            }
        } catch (e) {
            console.error("JSON parse error:", e);
        }

        if (code === 0 && parsed && parsed.success) {
            callback(parsed);
            return;
        }

        var errDetails = (parsed && parsed.error) ? parsed.error : (stderrData.trim() || stdoutData.trim() || ("Engine process exited with code " + code));
        console.error("Backend Technical Error Details:", errDetails);
        callback({ success: false, error: errDetails, stdout: stdoutData, stderr: stderrData });
    });
}

var importCounter = 1;

function importSubtitlesToSequence() {
    console.log("[CaptionGeneratorPro] importSubtitlesToSequence() triggered.");

    var captions = SubtitleEditor.captions;
    var words = SubtitleEditor.words || [];
    if (!captions || captions.length === 0) {
        console.warn("[CaptionGeneratorPro] importSubtitlesToSequence: captions list is empty.");
        showAlertModal("No Subtitles", "No subtitles available. Please transcribe first.");
        return;
    }

    ensureLicensedAction("import", function () {
        var btn = document.getElementById("btnApplyEdits");
        var originalText = "Create Subtitles";

        if (btn) {
            btn.disabled = true;
            btn.innerText = "Processing...";
        }

        var currentStyleId = UserPreferences.load().captionStyle || "standard";
        var styleObj = (typeof CaptionStyles !== "undefined") ? CaptionStyles.getStyle(currentStyleId) : { id: "standard", name: "Standard" };

        if (typeof require !== "undefined") {
            var fs = require("fs");
            var path = require("path");

            var now = new Date();
            var pad = function (n) { return n < 10 ? '0' + n : String(n); };
            var timeStr = pad(now.getHours()) + pad(now.getMinutes()) + pad(now.getSeconds());

            var filename = "Sub_v" + importCounter + "_" + timeStr;
            importCounter++;

            var tempSrt = path.join(getTempFolder(), filename + ".srt");
            var tempJson = path.join(getTempFolder(), filename + ".json");
            var tempStyledJson = path.join(getTempFolder(), filename + "_styled.json");

            // Write updated SRT
            var srtContent = "";
            captions.forEach(function (cap, i) {
                srtContent += `${i + 1}\n${fmtTime(cap.start, "srt")} --> ${fmtTime(cap.end, "srt")}\n${cap.text}\n\n`;
            });
            fs.writeFileSync(tempSrt, srtContent, "utf-8");

            // Write updated JSON
            fs.writeFileSync(tempJson, JSON.stringify(captions, null, 4), "utf-8");

            var handleResult = function (res) {
                if (btn) btn.disabled = false;
                if (!res || !res.success) {
                    if (btn) btn.innerText = originalText;
                    var rawErr = (res && res.error) ? res.error : "Unknown import error";
                    console.error("Subtitle import technical error:", rawErr);
                    showAlertModal("Import Notice", "Could not create subtitles on the timeline: " + rawErr);
                    return;
                }

                if (btn) {
                    btn.innerText = "Done!";
                    setTimeout(function () {
                        btn.innerText = originalText;
                    }, 1800);
                }

                showAlertModal("Subtitles Created", "Subtitles created successfully on your sequence (" + styleObj.name + ")!");
            };

            if (currentStyleId === "standard") {
                console.log("[CaptionGeneratorPro] Standard mode: Invoking ExtendScriptBridge.importSubtitles with:", tempSrt);
                ExtendScriptBridge.importSubtitles(tempSrt, tempJson, "standard", handleResult);
            } else {
                console.log("[CaptionGeneratorPro] Styled mode (" + currentStyleId + "): Invoking ExtendScriptBridge.importStyledSubtitles");
                var styledPayload = {
                    style: styleObj,
                    captions: captions,
                    words: words
                };
                fs.writeFileSync(tempStyledJson, JSON.stringify(styledPayload, null, 4), "utf-8");
                ExtendScriptBridge.importStyledSubtitles(tempStyledJson, handleResult);
            }
        } else {
            if (btn) {
                btn.disabled = false;
                btn.innerText = "Done!";
                setTimeout(function () {
                    btn.innerText = originalText;
                }, 1800);
            }
            showAlertModal("Preview Mode", "Subtitles created on sequence (Preview Mode - " + styleObj.name + ").");
        }
    });
}

function exportSRTFile() {
    ensureLicensedAction("export", function () {
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
            captions.forEach(function (cap, i) {
                srtContent += `${i + 1}\n${fmtTime(cap.start, "srt")} --> ${fmtTime(cap.end, "srt")}\n${cap.text}\n\n`;
            });

            try {
                fs.writeFileSync(desktopPath, srtContent, "utf-8");
                showAlertModal("SRT Exported", "Subtitle file (.srt) exported successfully to your Desktop:\n" + desktopPath.replace(/\\/g, "/"));
            } catch (e) {
                var tempPath = path.join(getTempFolder(), "captions.srt");
                fs.writeFileSync(tempPath, srtContent, "utf-8");
                showAlertModal("SRT Exported", "Subtitle file (.srt) exported to:\n" + tempPath.replace(/\\/g, "/"));
            }
        } else {
            showAlertModal("SRT Exported", "Subtitle file (.srt) exported (Preview Mode).");
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
    lines.forEach(function (line) {
        var trimmed = line.trim();
        if (trimmed.indexOf("/") !== -1 || trimmed.indexOf("\\") !== -1 || trimmed.indexOf(".srt") !== -1) {
            html += `<div style="background-color: var(--bg-dark); border: 1px solid var(--border-color); border-radius: 4px; padding: 6px 8px; font-family: monospace; font-size: 10px; color: var(--accent-blue); margin-top: 4px; word-break: break-all; user-select: all;">${line.replace(/\\/g, "/")}</div>`;
        } else if (trimmed.length > 0) {
            html += `<div style="margin-bottom: 4px; font-size: 11px;">${line}</div>`;
        }
    });
    divBody.innerHTML = html;

    modal.style.display = "flex";

    var closeModal = function () {
        modal.style.display = "none";
    };

    if (btnOk) btnOk.onclick = closeModal;
    if (btnClose) btnClose.onclick = closeModal;
}

function getTempAudioPath() {
    if (typeof require !== "undefined") {
        var os = require("os");
        var path = require("path");
        return path.join(os.tmpdir(), "cgp_timeline_audio.wav");
    }
    return "cgp_timeline_audio.wav";
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
    var sep = fmt === "srt" ? "," : ".";

    return `${h < 10 ? '0' : ''}${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}${sep}${ms < 100 ? (ms < 10 ? '00' : '0') : ''}${ms}`;
}

function applyStylizedCaptionsFromTab() {
    ensureLicensedAction("stylize", function () {
        var captions = SubtitleEditor.captions || [];

        if (!captions || captions.length === 0) {
            showAlertModal("No Captions Found", "Please transcribe timeline audio first in the Transcribe tab.");
            return;
        }

        var btn = document.getElementById("btnApplyStylized");
        var originalText = "Apply Subtitles to Sequence";
        if (btn) { btn.disabled = true; btn.innerText = "Applying Subtitles..."; }

        var prefs = UserPreferences.gather();
        var styleConfig = {
            fontFamily: prefs.fontFamily || "Arial",
            fontWeight: prefs.fontWeight || "bold",
            fontSize: parseInt(prefs.fontSize, 10) || 24,
            textColor: prefs.textColor || "#FFFFFF",
            position: prefs.position || "bottom",
            align: prefs.align || "center"
        };

        var finalItems = captions.map(function (c) {
            return { text: c.text, start: c.start, end: c.end };
        });

        var payload = {
            style: styleConfig,
            captions: finalItems
        };

        if (typeof require !== "undefined") {
            var fs = require("fs");
            var path = require("path");
            var tempFolder = getTempFolder();
            var jsonPath = path.join(tempFolder, "cgp_stylize_payload.json");
            var srtPath = path.join(tempFolder, "cgp_stylize_payload.srt");

            fs.writeFileSync(jsonPath, JSON.stringify(payload, null, 4), "utf-8");

            // Generate SRT file from finalItems for sequence caption track creation
            var srtContent = "";
            for (var k = 0; k < finalItems.length; k++) {
                var itm = finalItems[k];
                var tStart = fmtTime(itm.start, "srt");
                var tEnd = fmtTime(itm.end, "srt");
                srtContent += (k + 1) + "\n" + tStart + " --> " + tEnd + "\n" + itm.text + "\n\n";
            }
            fs.writeFileSync(srtPath, srtContent, "utf-8");

            ExtendScriptBridge.importStyledSubtitles(jsonPath, function (res) {
                if (btn) { btn.disabled = false; btn.innerText = originalText; }
                if (!res || !res.success) {
                    var err = (res && res.error) ? res.error : "Failed to apply subtitles to sequence.";
                    showAlertModal("Notice", err);
                } else {
                    showAlertModal("Success", "Subtitles created and applied to active sequence timeline!");
                }
            });
        } else {
            if (btn) { btn.disabled = false; btn.innerText = originalText; }
            showAlertModal("Success", "Subtitles applied (Browser Preview Mode)!");
        }
    });
}

function revealInExplorer(filePath) {
    if (typeof require !== "undefined") {
        try {
            var cp = require("child_process");
            var os = require("os");
            var isWin = os.platform() === "win32";
            if (isWin) {
                cp.exec("explorer.exe /select,\"" + filePath.replace(/\//g, "\\\\") + "\"");
            } else {
                cp.exec("open -R \"" + filePath + "\"");
            }
        } catch (e) {
            console.error("Failed to reveal file", e);
        }
    }
}

function buildAdobeTranscriptJSON(words, languageCode) {
    if (!words || !Array.isArray(words)) words = [];
    
    var lang = "en-us";
    if (typeof languageCode === "string" && languageCode.trim().length > 0) {
        var cleanLang = languageCode.trim().toLowerCase();
        var langMap = {
            "en": "en-us", "en-us": "en-us", "en-gb": "en-gb",
            "es": "es-es", "es-es": "es-es",
            "fr": "fr-fr", "de": "de-de", "it": "it-it",
            "pt": "pt-br", "ja": "ja-jp", "ko": "ko-kr", "zh": "zh-cn"
        };
        lang = langMap[cleanLang] || (cleanLang.indexOf("-") === -1 ? cleanLang + "-" + cleanLang : cleanLang);
    }

    var speakerId = "631fbbc0-9c02-47c4-bb8c-732c020fa24f";
    var fillerList = ["um", "uh", "uhh", "like", "you know"];

    var segments = [];
    var currentSegment = null;

    for (var i = 0; i < words.length; i++) {
        var w = words[i];
        if (!w) continue;

        var rawText = (w.text !== undefined) ? String(w.text) : ((w.word !== undefined) ? String(w.word) : ((w.value !== undefined) ? String(w.value) : ""));
        var trimmedText = rawText.trim();
        if (trimmedText.length === 0) continue;

        var start = parseFloat(w.start) || 0;
        var end = (w.end !== undefined) ? parseFloat(w.end) : ((w.duration !== undefined) ? (start + parseFloat(w.duration)) : (start + 0.1));
        var duration = Math.max(0.01, Math.round((end - start) * 1000) / 1000);
        
        var isEos = /[.!?]$/.test(trimmedText);
        
        var cleanWord = trimmedText.replace(/[.,!?]$/, "").trim().toLowerCase();
        var isFiller = w.isFiller === true || fillerList.indexOf(cleanWord) !== -1;

        var wordObj = {
            confidence: 1.0,
            duration: duration,
            eos: isEos,
            start: Math.round(start * 1000) / 1000,
            tags: isFiller ? ["filler"] : [],
            text: trimmedText,
            type: "word"
        };

        var startNewSegment = false;
        if (!currentSegment) {
            startNewSegment = true;
        } else {
            var lastWord = currentSegment.words[currentSegment.words.length - 1];
            var gap = wordObj.start - (lastWord.start + lastWord.duration);
            if (gap > 0.80 || (lastWord.eos && gap > 0.35)) {
                startNewSegment = true;
            }
        }

        if (startNewSegment) {
            if (currentSegment && currentSegment.words.length > 0) {
                var lastW = currentSegment.words[currentSegment.words.length - 1];
                currentSegment.duration = Math.max(0.01, Math.round(((lastW.start + lastW.duration) - currentSegment.start) * 1000) / 1000);
                segments.push(currentSegment);
            }
            currentSegment = {
                duration: duration,
                language: lang,
                speaker: speakerId,
                start: wordObj.start,
                words: []
            };
        }

        currentSegment.words.push(wordObj);
    }

    if (currentSegment && currentSegment.words.length > 0) {
        var finalW = currentSegment.words[currentSegment.words.length - 1];
        currentSegment.duration = Math.max(0.01, Math.round(((finalW.start + finalW.duration) - currentSegment.start) * 1000) / 1000);
        segments.push(currentSegment);
    }

    return {
        language: lang,
        speakers: [
            {
                id: speakerId,
                name: "Speaker 1"
            }
        ],
        segments: segments
    };
}

function exportStaticTranscript() {
    ensureLicensedAction("export", function () {
        var words = (window.UltraTranscript && window.UltraTranscript.words && window.UltraTranscript.words.length > 0) 
            ? window.UltraTranscript.words 
            : (SubtitleEditor.words || []);

        if (!words || words.length === 0) {
            showAlertModal("No Transcript", "No transcript available to export. Please transcribe first.");
            return;
        }

        var os = require("os");
        var path = require("path");
        var fs = require("fs");
        var desktopPath = path.join(os.homedir(), "Desktop");

        var sequenceName = document.getElementById("lblActiveSeqName") ? document.getElementById("lblActiveSeqName").innerText : "Sequence";
        if (sequenceName === "Loading..." || sequenceName === "None open" || !sequenceName) sequenceName = "Sequence";
        var safeSeqName = sequenceName.replace(/[^a-z0-9]/gi, "_").toLowerCase();
        var tempPath = path.join(desktopPath, safeSeqName + "_static_transcript.json");

        var langSelect = window.SourceLangSelect;
        var selectedLang = (langSelect && typeof langSelect.getValue === "function") ? langSelect.getValue() : "en-us";

        var exportData = buildAdobeTranscriptJSON(words, selectedLang);

        try {
            fs.writeFileSync(tempPath, JSON.stringify(exportData, null, 2), "utf8");
            showAlertModal("Transcript Exported", "Static Transcript (.json) exported successfully to your Desktop.");
            revealInExplorer(tempPath);
        } catch (e) {
            showAlertModal("Export Error", "Failed to write file: " + e.message);
        }
    });
}

function exportTranscriptTXT() {
    ensureLicensedAction("export", function () {
        var words = (window.UltraTranscript && window.UltraTranscript.words && window.UltraTranscript.words.length > 0) 
            ? window.UltraTranscript.words 
            : (SubtitleEditor.words || []);

        if (!words || words.length === 0) {
            showAlertModal("No Transcript", "No transcript available to export. Please transcribe first.");
            return;
        }

        var os = require("os");
        var path = require("path");
        var fs = require("fs");
        var desktopPath = path.join(os.homedir(), "Desktop");

        var sequenceName = document.getElementById("lblActiveSeqName") ? document.getElementById("lblActiveSeqName").innerText : "Sequence";
        if (sequenceName === "Loading..." || sequenceName === "None open" || !sequenceName) sequenceName = "Sequence";
        var safeSeqName = sequenceName.replace(/[^a-z0-9]/gi, "_").toLowerCase();
        var tempPath = path.join(desktopPath, safeSeqName + "_transcript.txt");

        var textWords = [];
        for (var i = 0; i < words.length; i++) {
            var w = words[i];
            var wordText = (w.text !== undefined) ? w.text : ((w.word !== undefined) ? w.word : (w.value || ""));
            if (wordText) textWords.push(wordText);
        }

        var textData = textWords.join(" ");

        try {
            fs.writeFileSync(tempPath, textData, "utf8");
            showAlertModal("Text Exported", "Plain Transcript (.txt) exported successfully to your Desktop.");
            revealInExplorer(tempPath);
        } catch (e) {
            showAlertModal("Export Error", "Failed to write file: " + e.message);
        }
    });
}

