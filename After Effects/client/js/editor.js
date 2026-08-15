// Subtitle Cue Editor for After Effects ULTRA
var SubtitleEditor = {
    captions: [],
    words: [],
    
    init: function() {
        var self = this;
        var btn = document.getElementById("btnAddCue");
        if (btn) {
            btn.addEventListener("click", function() {
                self.addCue();
            });
        }

        var btnRefresh = document.getElementById("btnRefreshCues");
        if (btnRefresh) {
            btnRefresh.addEventListener("click", function() {
                self.regenerateFromTranscript();
            });
        }
    },

    loadCaptions: function(captionsList, wordsList) {
        this.captions = captionsList || [];
        this.words = wordsList || [];
        this.render();
    },

    regenerateFromTranscript: function() {
        if (!this.words || this.words.length === 0) {
            if (typeof showAlertModal === "function") {
                showAlertModal("No Transcript", "No transcript words available to regenerate cues from.");
            }
            return;
        }

        var wordsPerLayer = document.getElementById("selectWordsPerLayer") ? document.getElementById("selectWordsPerLayer").value : "phrase";
        var maxChars = parseInt(document.getElementById("sliderMaxChars").value, 10) || 37;
        var maxDur = (parseFloat(document.getElementById("sliderMaxDur").value) / 10.0) || 3.0;
        var gapFrames = parseInt(document.getElementById("sliderGapFrames").value, 10) || 0;
        var lineModeRadio = document.querySelector('input[name="lineMode"]:checked');
        var lineMode = lineModeRadio ? lineModeRadio.value : "double";

        var newCues = [];

        if (wordsPerLayer === "1" || wordsPerLayer === "2") {
            var chunkSize = parseInt(wordsPerLayer, 10);
            for (var i = 0; i < this.words.length; i += chunkSize) {
                var chunk = this.words.slice(i, i + chunkSize);
                var text = chunk.map(function(w) { return (w.word || w.text || "").trim(); }).join(" ").trim();
                var s = parseFloat(chunk[0].start) || 0;
                var e = parseFloat(chunk[chunk.length - 1].end) || (s + 0.3);
                if (e <= s) e = s + 0.2;

                newCues.push({
                    start: Math.round(s * 1000) / 1000,
                    end: Math.round(e * 1000) / 1000,
                    text: text
                });
            }
        } else {
            // Phrase / natural sentence chunking
            var curWords = [];
            var curLen = 0;
            var curStart = 0;

            for (var w = 0; w < this.words.length; w++) {
                var item = this.words[w];
                var wordStr = (item.word || item.text || "").trim();
                if (!wordStr) continue;

                if (curWords.length === 0) {
                    curStart = parseFloat(item.start) || 0;
                }

                var itemEnd = parseFloat(item.end) || (curStart + 0.3);
                var durationSoFar = itemEnd - curStart;

                var isPunctuationEnd = /[.!?]$/.test(wordStr);
                var willExceedChars = (curLen + wordStr.length + 1) > maxChars;
                var willExceedDur = durationSoFar > maxDur;

                curWords.push(wordStr);
                curLen += wordStr.length + 1;

                if (isPunctuationEnd || willExceedChars || willExceedDur || w === this.words.length - 1) {
                    var chunkTxt = curWords.join(" ");
                    if (lineMode === "double" && chunkTxt.length > 25 && chunkTxt.indexOf(" ") !== -1) {
                        var mid = Math.floor(chunkTxt.length / 2);
                        var spaceIdx = chunkTxt.indexOf(" ", mid);
                        if (spaceIdx === -1) spaceIdx = chunkTxt.lastIndexOf(" ", mid);
                        if (spaceIdx !== -1) {
                            chunkTxt = chunkTxt.substring(0, spaceIdx) + "\n" + chunkTxt.substring(spaceIdx + 1);
                        }
                    }

                    newCues.push({
                        start: Math.round(curStart * 1000) / 1000,
                        end: Math.round(itemEnd * 1000) / 1000,
                        text: chunkTxt
                    });

                    curWords = [];
                    curLen = 0;
                }
            }
        }

        this.captions = newCues;
        this.render();

        if (typeof showAlertModal === "function") {
            showAlertModal("Cues Refreshed", "Generated " + newCues.length + " subtitle cues from the transcript.");
        }
    },

    addCue: function() {
        var lastEnd = 0;
        if (this.captions.length > 0) {
            lastEnd = this.captions[this.captions.length - 1].end || 0;
        }
        this.captions.push({
            start: Math.round(lastEnd * 1000) / 1000,
            end: Math.round((lastEnd + 2.5) * 1000) / 1000,
            text: "New subtitle line"
        });
        this.render();
    },

    deleteCue: function(index) {
        if (index >= 0 && index < this.captions.length) {
            this.captions.splice(index, 1);
            this.render();
        }
    },

    render: function() {
        var container = document.getElementById("cueList");
        var counter = document.getElementById("cueCounter");
        if (!container || !counter) return;

        container.innerHTML = "";
        var total = this.captions.length;
        counter.innerText = total + (total === 1 ? " Subtitle" : " Subtitles");

        if (total === 0) {
            container.innerHTML = '<div style="text-align: center; color: var(--text-muted); margin-top: 20px; padding: 24px 16px; background: var(--surface-elevated); border: 1px dashed var(--border); border-radius: var(--radius-card); font-size: 11px; line-height: 1.6;">' +
                '<div style="font-weight: 600; color: var(--text-primary); margin-bottom: 4px; font-size: 12px;">No captions generated yet.</div>' +
                '<div>Transcribe an active composition in the Transcript tab to generate subtitle cues.</div>' +
                '</div>';
            return;
        }

        var self = this;
        this.captions.forEach(function(cue, index) {
            var row = document.createElement("div");
            row.className = "cue-row";

            var header = document.createElement("div");
            header.className = "cue-header";

            var leftGroup = document.createElement("div");
            leftGroup.style.cssText = "display: flex; align-items: center; gap: 6px;";

            var numSpan = document.createElement("span");
            numSpan.style.cssText = "font-size: 10px; font-weight: 600; color: var(--text-muted); width: 22px;";
            numSpan.innerText = "#" + (index + 1);

            // Playhead Jump Button
            var btnPlay = document.createElement("button");
            btnPlay.className = "btn-secondary";
            btnPlay.style.cssText = "padding: 2px 7px; font-size: 10px; line-height: 1.2;";
            btnPlay.innerText = "Jump";
            btnPlay.title = "Jump comp playhead to start timecode";
            btnPlay.addEventListener("click", function() {
                if (typeof ExtendScriptBridge !== "undefined" && ExtendScriptBridge.setPlayhead) {
                    ExtendScriptBridge.setPlayhead(cue.start);
                }
            });

            // Start Time
            var lblStart = document.createElement("span");
            lblStart.innerText = "In:";
            lblStart.style.cssText = "font-size: 10px; color: var(--text-secondary);";

            var inputStart = document.createElement("input");
            inputStart.type = "number";
            inputStart.step = "0.1";
            inputStart.min = "0";
            inputStart.title = "Start time (seconds)";
            inputStart.value = (parseFloat(cue.start) || 0).toFixed(2);
            inputStart.style.cssText = "width: 58px; background-color: var(--surface); border: 1px solid var(--border); color: var(--accent); padding: 2px 4px; font-size: 10px; font-family: monospace; border-radius: 4px; outline: none;";
            inputStart.addEventListener("input", function(e) {
                var val = parseFloat(e.target.value);
                if (!isNaN(val)) {
                    self.captions[index].start = val;
                    self.updateMetrics(row, index);
                }
            });

            // End Time
            var lblEnd = document.createElement("span");
            lblEnd.innerText = "Out:";
            lblEnd.style.cssText = "font-size: 10px; color: var(--text-secondary);";

            var inputEnd = document.createElement("input");
            inputEnd.type = "number";
            inputEnd.step = "0.1";
            inputEnd.min = "0";
            inputEnd.title = "End time (seconds)";
            inputEnd.value = (parseFloat(cue.end) || 0).toFixed(2);
            inputEnd.style.cssText = "width: 58px; background-color: var(--surface); border: 1px solid var(--border); color: var(--accent); padding: 2px 4px; font-size: 10px; font-family: monospace; border-radius: 4px; outline: none;";
            inputEnd.addEventListener("input", function(e) {
                var val = parseFloat(e.target.value);
                if (!isNaN(val)) {
                    self.captions[index].end = val;
                    self.updateMetrics(row, index);
                }
            });

            leftGroup.appendChild(numSpan);
            leftGroup.appendChild(btnPlay);
            leftGroup.appendChild(lblStart);
            leftGroup.appendChild(inputStart);
            leftGroup.appendChild(lblEnd);
            leftGroup.appendChild(inputEnd);

            // Right Group: Delete button
            var btnDel = document.createElement("button");
            btnDel.className = "btn-danger";
            btnDel.style.cssText = "padding: 2px 6px; font-size: 11px; line-height: 1; border-radius: 4px;";
            btnDel.innerHTML = "&times;";
            btnDel.title = "Delete this cue";
            btnDel.addEventListener("click", function() {
                self.deleteCue(index);
            });

            header.appendChild(leftGroup);
            header.appendChild(btnDel);

            // Text Input
            var textInput = document.createElement("textarea");
            textInput.className = "cue-text-input";
            textInput.rows = 2;
            textInput.value = cue.text || "";
            textInput.style.cssText = "width: 100%; resize: vertical; min-height: 38px; font-family: inherit; font-size: 11px; line-height: 1.4;";
            textInput.addEventListener("input", function(e) {
                self.captions[index].text = e.target.value;
                self.updateMetrics(row, index);
            });

            // Metrics footer (CPL & CPS)
            var metricsFooter = document.createElement("div");
            metricsFooter.className = "cue-metrics-footer";
            metricsFooter.style.cssText = "display: flex; justify-content: flex-end; gap: 10px; font-size: 10px; color: var(--text-muted); font-variant-numeric: tabular-nums;";

            row.appendChild(header);
            row.appendChild(textInput);
            row.appendChild(metricsFooter);

            self.updateMetrics(row, index);
            container.appendChild(row);
        });
    },

    updateMetrics: function(rowEl, index) {
        var cue = this.captions[index];
        if (!cue) return;
        var footer = rowEl.querySelector(".cue-metrics-footer");
        if (!footer) return;

        var text = (cue.text || "").replace(/\n/g, " ");
        var len = text.length;
        var dur = Math.max(0.1, (parseFloat(cue.end) || 0) - (parseFloat(cue.start) || 0));
        var cps = (len / dur).toFixed(1);

        footer.innerHTML = `<span>Chars: <strong>${len}</strong></span><span>Dur: <strong>${dur.toFixed(1)}s</strong></span><span>CPS: <strong>${cps}</strong></span>`;
    }
};
