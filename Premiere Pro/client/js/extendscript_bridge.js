var ExtendScriptBridge = {
    csInterface: new CSInterface(),
    hostLoaded: false,

    loadHost: function(callback) {
        if (this.hostLoaded) {
            if (callback) callback(true);
            return;
        }

        var extPath = this.csInterface.getSystemPath(SystemPath.EXTENSION);
        var jsxPath = (extPath + "/host/index.jsx").replace(/\\/g, "/");

        // Use $.evalFile with proper escaping
        var loadCmd = 'try { $.evalFile("' + jsxPath + '"); typeof $._PPP_ !== "undefined" ? "OK" : "MISSING"; } catch(e) { "ERROR:" + e.toString(); }';

        var self = this;
        this.csInterface.evalScript(loadCmd, function(result) {
            if (result === "OK") {
                self.hostLoaded = true;
                if (callback) callback(true);
            } else {
                if (callback) callback(false, "Load failed: " + result + " | Path: " + jsxPath);
            }
        });
    },

    exportAudio: function(targetPath, callback) {
        if (typeof targetPath === "function") {
            callback = targetPath;
        }

        this.loadHost(function(ok, err) {
            if (!ok) {
                callback({ success: false, error: "Host script failed to load: " + (err || "unknown error") });
                return;
            }

            ExtendScriptBridge.csInterface.evalScript("$._PPP_.exportAudio()", function(result) {
                if (!result || result === "EvalScript error.") {
                    callback({ success: false, error: "ExtendScript evaluation failed. Result: " + result });
                    return;
                }
                if (result.indexOf("OK|") === 0) {
                    var parts = result.split("|");
                    var aPath = parts[1] || "";
                    var expStart = parseFloat(parts[2]) || 0;
                    callback({ success: true, audioPath: aPath, exportStart: expStart });
                } else if (result.indexOf("ERR|") === 0) {
                    callback({ success: false, error: result.substring(4) });
                } else {
                    callback({ success: false, error: result });
                }
            });
        });
    },

    getProjectDetails: function(callback) {
        this.loadHost(function(ok, err) {
            if (!ok) {
                if (callback) callback({ success: false, name: "Unknown", path: "" });
                return;
            }
            ExtendScriptBridge.csInterface.evalScript("$._PPP_.getProjectDetails()", function(res) {
                if (res && res.indexOf("OK|") === 0) {
                    var parts = res.split("|");
                    if (callback) callback({ success: true, name: parts[1] || "UntitledProject", path: parts[2] || "" });
                } else {
                    if (callback) callback({ success: false, name: "Unknown", path: "" });
                }
            });
        });
    },

    getActiveSequenceInfo: function(callback) {
        var completed = false;
        var timeoutTimer = setTimeout(function() {
            if (!completed) {
                completed = true;
                if (callback) callback({ success: false, error: "Host timeout" });
            }
        }, 1200);

        this.loadHost(function(ok, err) {
            if (!ok) {
                if (!completed) {
                    completed = true;
                    clearTimeout(timeoutTimer);
                    if (callback) callback({ success: false, error: err });
                }
                return;
            }
            ExtendScriptBridge.csInterface.evalScript("$._PPP_.getActiveSequenceInfo()", function(res) {
                if (!completed) {
                    completed = true;
                    clearTimeout(timeoutTimer);
                    if (res && res.indexOf("OK|") === 0) {
                        var parts = res.split("|");
                        if (callback) callback({ 
                            success: true, 
                            name: parts[1] || "Sequence", 
                            duration: parseFloat(parts[2]) || 0,
                            clipCount: parseInt(parts[3]) || 0,
                            id: parts[4] || ""
                        });
                    } else {
                        if (callback) callback({ success: false, error: res });
                    }
                }
            });
        });
    },

    importSubtitles: function(srtPath, jsonPath, stylePreset, callback) {
        var cleanPath = srtPath.replace(/\\/g, "/");
        this.loadHost(function(ok, err) {
            if (!ok) {
                callback({ success: false, error: err });
                return;
            }
            var script = "$._PPP_.importSubtitles('" + cleanPath + "')";
            ExtendScriptBridge.csInterface.evalScript(script, function(result) {
                if (result && result.indexOf("OK|") === 0) {
                    callback({ success: true, message: result.substring(3) });
                } else if (result && result.indexOf("ERR|") === 0) {
                    callback({ success: false, error: result.substring(4) });
                } else {
                    callback({ success: false, error: result || "Import failed" });
                }
            });
        });
    },

    importStyledSubtitles: function(jsonPath, callback) {
        var cleanPath = jsonPath.replace(/\\/g, "/");
        this.loadHost(function(ok, err) {
            if (!ok) {
                callback({ success: false, error: err });
                return;
            }
            var script = "$._PPP_.importStyledSubtitles('" + cleanPath + "')";
            ExtendScriptBridge.csInterface.evalScript(script, function(result) {
                if (result && result.indexOf("OK|") === 0) {
                    callback({ success: true, message: result.substring(3) });
                } else if (result && result.indexOf("ERR|") === 0) {
                    callback({ success: false, error: result.substring(4) });
                } else {
                    callback({ success: false, error: result || "Styled subtitle creation failed." });
                }
            });
        });
    },

    setPlayhead: function(seconds, callback) {
        var sec = parseFloat(seconds) || 0;
        this.loadHost(function(ok) {
            if (!ok) {
                if (callback) callback({ success: false });
                return;
            }
            ExtendScriptBridge.csInterface.evalScript("$._PPP_.setPlayhead(" + sec + ")", function(result) {
                if (callback) callback({ success: result && result.indexOf("OK|") === 0 });
            });
        });
    },

    getPlayhead: function(callback) {
        this.loadHost(function(ok) {
            if (!ok) {
                if (callback) callback({ success: false, seconds: 0 });
                return;
            }
            ExtendScriptBridge.csInterface.evalScript("$._PPP_.getPlayhead()", function(result) {
                if (result && result.indexOf("OK|") === 0) {
                    var sec = parseFloat(result.substring(3)) || 0;
                    if (callback) callback({ success: true, seconds: sec });
                } else {
                    if (callback) callback({ success: false, seconds: 0 });
                }
            });
        });
    },

    rippleDeleteRanges: function(ranges, callback) {
        if (!ranges || !Array.isArray(ranges) || ranges.length === 0) {
            if (callback) callback({ success: false, error: "No ranges to delete." });
            return;
        }

        var jsonStr = JSON.stringify(ranges);
        var escaped = jsonStr.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

        this.loadHost(function(ok) {
            if (!ok) {
                if (callback) callback({ success: false, error: "Host ExtendScript bridge not ready." });
                return;
            }

            var script = '$._PPP_.rippleDeleteRanges("' + escaped + '")';
            ExtendScriptBridge.csInterface.evalScript(script, function(result) {
                if (result && result.indexOf("OK|") === 0) {
                    var parts = result.split("|");
                    var count = parseInt(parts[1], 10) || 0;
                    var sec = parseFloat(parts[2]) || 0;
                    if (callback) callback({ success: true, count: count, totalSeconds: sec });
                } else if (result && result.indexOf("ERR|") === 0) {
                    if (callback) callback({ success: false, error: result.substring(4) });
                } else {
                    if (callback) callback({ success: false, error: result || "Ripple delete execution failed." });
                }
            });
        });
    },

    testEvalScript: function(callback) {
        this.csInterface.evalScript('1+1', function(result) {
            if (callback) callback("1+1 result: " + result);
        });
    }
};


