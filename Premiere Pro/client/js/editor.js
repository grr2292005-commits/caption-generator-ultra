// Caption Generator ULTRA - In-Panel Subtitle Cue Editor with Editable Timestamps
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
    },

    loadCaptions: function(captionsList, wordsList) {
        this.captions = captionsList || [];
        this.words = wordsList || [];
        this.render();
    },

    render: function() {
        var container = document.getElementById("cueList");
        var counter = document.getElementById("cueCounter");
        var badge = document.getElementById("styleBadge");
        if (!container || !counter) return;

        if (badge && typeof UserPreferences !== "undefined" && typeof CaptionStyles !== "undefined") {
            var currentStyleId = UserPreferences.load().captionStyle || "standard";
            var currentStyleObj = CaptionStyles.getStyle(currentStyleId);
            badge.innerText = currentStyleObj.name;
        }

        container.innerHTML = "";
        var total = this.captions.length;
        counter.innerText = total + (total === 1 ? " Subtitle" : " Subtitles");

        if (total === 0) {
            container.innerHTML = '<div style="text-align: center; color: var(--text-secondary); margin-top: 15px; padding: 24px 16px; background: var(--surface); border: 1px dashed var(--border); border-radius: var(--radius-card); font-size: 11px; line-height: 1.6;">' +
                '<div style="font-weight: 600; color: var(--text-primary); margin-bottom: 4px; font-size: 12px;">No transcript data</div>' +
                '<div>Transcribe a sequence in the Transcript tab first to generate and edit captions.</div>' +
                '</div>';
            return;
        }

        var self = this;
        this.captions.forEach(function(cue, index) {
            var row = document.createElement("div");
            row.className = "cue-row";

            var header = document.createElement("div");
            header.className = "cue-header";

            var timeGroup = document.createElement("div");
            timeGroup.style.cssText = "display: flex; align-items: center; gap: 6px;";

            // Playhead Jump
            var btnPlay = document.createElement("button");
            btnPlay.className = "btn-secondary";
            btnPlay.style.cssText = "padding: 2px 7px; font-size: 10px; height: 22px;";
            btnPlay.innerText = "Jump";
            btnPlay.title = "Jump timeline playhead to start";
            btnPlay.addEventListener("click", function() {
                if (typeof ExtendScriptBridge !== "undefined" && ExtendScriptBridge.setPlayhead) {
                    ExtendScriptBridge.setPlayhead(cue.start);
                }
            });

            // Start Time Editable Input
            var lblStart = document.createElement("span");
            lblStart.innerText = "In:";
            lblStart.style.cssText = "font-size: 10px; color: var(--text-muted); font-weight: 500;";

            var inputStart = document.createElement("input");
            inputStart.type = "number";
            inputStart.step = "0.1";
            inputStart.min = "0";
            inputStart.title = "Start time (seconds)";
            inputStart.value = (parseFloat(cue.start) || 0).toFixed(1);
            inputStart.style.cssText = "width: 58px; height: 22px; padding: 2px 4px; font-size: 10px; font-family: monospace; color: var(--accent);";
            inputStart.addEventListener("input", function(e) {
                var val = parseFloat(e.target.value);
                if (!isNaN(val)) {
                    self.captions[index].start = val;
                }
            });

            var lblEnd = document.createElement("span");
            lblEnd.innerText = "Out:";
            lblEnd.style.cssText = "font-size: 10px; color: var(--text-muted); font-weight: 500; margin-left: 2px;";

            // End Time Editable Input
            var inputEnd = document.createElement("input");
            inputEnd.type = "number";
            inputEnd.step = "0.1";
            inputEnd.min = "0";
            inputEnd.title = "End time (seconds)";
            inputEnd.value = (parseFloat(cue.end) || 0).toFixed(1);
            inputEnd.style.cssText = "width: 58px; height: 22px; padding: 2px 4px; font-size: 10px; font-family: monospace; color: var(--accent);";
            inputEnd.addEventListener("input", function(e) {
                var val = parseFloat(e.target.value);
                if (!isNaN(val)) {
                    self.captions[index].end = val;
                }
            });

            timeGroup.appendChild(btnPlay);
            timeGroup.appendChild(lblStart);
            timeGroup.appendChild(inputStart);
            timeGroup.appendChild(lblEnd);
            timeGroup.appendChild(inputEnd);

            var btnDel = document.createElement("button");
            btnDel.className = "btn-danger";
            btnDel.innerText = "Delete";
            btnDel.style.cssText = "padding: 2px 8px; font-size: 10px; height: 22px;";
            btnDel.addEventListener("click", function() {
                self.deleteCue(index);
            });

            header.appendChild(timeGroup);
            header.appendChild(btnDel);

            var input = document.createElement("input");
            input.type = "text";
            input.className = "cue-text-input";
            input.value = cue.text;
            input.addEventListener("input", function(e) {
                self.captions[index].text = e.target.value;
            });

            row.appendChild(header);
            row.appendChild(input);
            container.appendChild(row);
        });
    },

    addCue: function() {
        var lastEnd = this.captions.length > 0 ? parseFloat(this.captions[this.captions.length - 1].end) || 0 : 0;
        this.captions.push({
            start: parseFloat((lastEnd + 0.1).toFixed(1)),
            end: parseFloat((lastEnd + 2.5).toFixed(1)),
            text: "New Subtitle Cue"
        });
        this.render();
    },

    deleteCue: function(index) {
        this.captions.splice(index, 1);
        this.render();
    }
};
