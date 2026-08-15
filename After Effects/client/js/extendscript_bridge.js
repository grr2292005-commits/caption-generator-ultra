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

    getActiveCompInfo: function(callback) {
        this.loadHost(function(ok, err) {
            if (!ok) {
                if (callback) callback({ success: false, error: err });
                return;
            }
            ExtendScriptBridge.csInterface.evalScript("$._PPP_.getActiveCompInfo()", function(result) {
                if (!result || result.indexOf("OK|") !== 0) {
                    var errStr = (result && result.indexOf("ERR|") === 0) ? result.substring(4) : (result || "No active composition found");
                    if (callback) callback({ success: false, error: errStr });
                    return;
                }
                var parts = result.split("|");
                if (callback) {
                    callback({
                        success: true,
                        compName: parts[1] || "Active Comp",
                        duration: parseFloat(parts[2]) || 0,
                        layerCount: parseInt(parts[3], 10) || 0,
                        workStart: parseFloat(parts[4]) || 0,
                        workDur: parseFloat(parts[5]) || 0,
                        compId: parts[6] || "0"
                    });
                }
            });
        });
    },

    getSelectedLayersInfo: function(callback) {
        this.loadHost(function(ok, err) {
            if (!ok) {
                if (callback) callback({ success: false, error: err });
                return;
            }
            ExtendScriptBridge.csInterface.evalScript("$._PPP_.getSelectedLayersInfo()", function(result) {
                if (!result || result.indexOf("OK|") !== 0) {
                    var errStr = (result && result.indexOf("ERR|") === 0) ? result.substring(4) : (result || "Error reading selected layers");
                    if (callback) callback({ success: false, error: errStr, selectedCount: 0, totalDuration: 0, layers: [] });
                    return;
                }
                try {
                    var jsonStr = result.substring(3);
                    var data = JSON.parse(jsonStr);
                    if (callback) callback(Object.assign({ success: true }, data));
                } catch(eJson) {
                    if (callback) callback({ success: false, error: "JSON parse error: " + eJson.toString(), selectedCount: 0, totalDuration: 0, layers: [] });
                }
            });
        });
    },

    exportAudio: function(targetPath, scopeMode, callback) {
        if (typeof scopeMode === "function") {
            callback = scopeMode;
            scopeMode = "full";
        }
        scopeMode = scopeMode || "full";

        this.loadHost(function(ok, err) {
            if (!ok) {
                if (callback) callback({ success: false, error: "Host script failed to load: " + (err || "unknown error") });
                return;
            }

            var cmd = '$._PPP_.exportAudio("", "' + scopeMode + '")';
            ExtendScriptBridge.csInterface.evalScript(cmd, function(result) {
                if (!result || result === "EvalScript error.") {
                    if (callback) callback({ success: false, error: "ExtendScript evaluation failed. Result: " + result });
                    return;
                }
                if (result.indexOf("OK|") === 0) {
                    var parts = result.split("|");
                    var aPath = parts[1] || "";
                    var expStart = parseFloat(parts[2]) || 0;
                    if (callback) callback({ success: true, audioPath: aPath, exportStart: expStart });
                } else if (result.indexOf("ERR|") === 0) {
                    if (callback) callback({ success: false, error: result.substring(4) });
                } else {
                    if (callback) callback({ success: false, error: result });
                }
            });
        });
    },

    getProjectDetails: function(callback) {
        this.loadHost(function(ok, err) {
            if (!ok) {
                if (callback) callback({ name: "UntitledProject", path: "", error: err });
                return;
            }
            ExtendScriptBridge.csInterface.evalScript("$._PPP_.getProjectDetails()", function(result) {
                var name = "UntitledProject", path = "";
                if (result && result.indexOf("OK|") === 0) {
                    var parts = result.split("|");
                    name = parts[1] || name;
                    path = parts[2] || "";
                }
                if (callback) callback({ name: name, path: path });
            });
        });
    },

    setPlayhead: function(seconds, callback) {
        this.loadHost(function(ok) {
            if (!ok) {
                if (callback) callback(false);
                return;
            }
            var s = parseFloat(seconds) || 0;
            ExtendScriptBridge.csInterface.evalScript("$._PPP_.setPlayhead(" + s + ")", function(res) {
                if (callback) callback(res && res.indexOf("OK|") === 0);
            });
        });
    },

    getPlayhead: function(callback) {
        this.loadHost(function(ok) {
            if (!ok) {
                if (callback) callback(0);
                return;
            }
            ExtendScriptBridge.csInterface.evalScript("$._PPP_.getPlayhead()", function(res) {
                if (res && res.indexOf("OK|") === 0) {
                    var t = parseFloat(res.substring(3)) || 0;
                    if (callback) callback(t);
                } else {
                    if (callback) callback(0);
                }
            });
        });
    },

    importStyledSubtitles: function(jsonPath, importMethod, replaceExisting, callback) {
        this.loadHost(function(ok, err) {
            if (!ok) {
                if (callback) callback({ success: false, error: err });
                return;
            }
            var cleanJsonPath = jsonPath.replace(/\\/g, "/");
            var cleanMethod = importMethod || "direct";
            var cleanReplace = replaceExisting ? "true" : "false";

            var scriptCall = '$._PPP_.importStyledSubtitles("' + cleanJsonPath + '", "' + cleanMethod + '", ' + cleanReplace + ')';

            ExtendScriptBridge.csInterface.evalScript(scriptCall, function(result) {
                if (!result) {
                    if (callback) callback({ success: false, error: "Empty response from host" });
                    return;
                }
                if (result.indexOf("OK|") === 0) {
                    if (callback) callback({ success: true, message: result.substring(3) });
                } else {
                    var errTxt = result.indexOf("ERR|") === 0 ? result.substring(4) : result;
                    if (callback) callback({ success: false, error: errTxt });
                }
            });
        });
    },

    importSubtitles: function(srtPath, jsonPath, importMethod, replaceExisting, callback) {
        this.loadHost(function(ok, err) {
            if (!ok) {
                if (callback) callback({ success: false, error: err });
                return;
            }
            var cleanSrtPath = srtPath.replace(/\\/g, "/");
            var cleanMethod = importMethod || "direct";
            var cleanReplace = replaceExisting ? "true" : "false";

            var scriptCall = '$._PPP_.createSubtitles("' + cleanSrtPath + '", "' + cleanMethod + '", ' + cleanReplace + ')';

            ExtendScriptBridge.csInterface.evalScript(scriptCall, function(result) {
                if (!result) {
                    if (callback) callback({ success: false, error: "Empty response from host" });
                    return;
                }
                if (result.indexOf("OK|") === 0) {
                    if (callback) callback({ success: true, message: result.substring(3) });
                } else {
                    var errTxt = result.indexOf("ERR|") === 0 ? result.substring(4) : result;
                    if (callback) callback({ success: false, error: errTxt });
                }
            });
        });
    },

    applyAlignmentToLayers: function(jsonPath, callback) {
        this.loadHost(function(ok, err) {
            if (!ok) {
                if (callback) callback({ success: false, error: err });
                return;
            }
            var cleanJsonPath = jsonPath.replace(/\\/g, "/");
            var scriptCall = '$._PPP_.applyAlignmentToLayers("' + cleanJsonPath + '")';

            ExtendScriptBridge.csInterface.evalScript(scriptCall, function(result) {
                if (!result) {
                    if (callback) callback({ success: false, error: "Empty response from host" });
                    return;
                }
                if (result.indexOf("OK|") === 0) {
                    if (callback) callback({ success: true, message: result.substring(3) });
                } else {
                    var errTxt = result.indexOf("ERR|") === 0 ? result.substring(4) : result;
                    if (callback) callback({ success: false, error: errTxt });
                }
            });
        });
    }
};
