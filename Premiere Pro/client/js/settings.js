// Caption Generator ULTRA - Settings & Model Manager
var SettingsManager = {
    settings: {
        hardware: "auto"
    },

    init: function() {
        var self = this;
        var selHw = document.getElementById("selectHardware");

        if (selHw) {
            selHw.value = this.settings.hardware;
            selHw.addEventListener("change", function() {
                self.settings.hardware = selHw.value;
                self.save();
                if (typeof UserPreferences !== "undefined") UserPreferences.autoSave();
            });
        }

        this.load();
        this.initLicenseSection();
        this.renderModelManager();

        // Update model storage path display to canonical %USERPROFILE%\.cache\whisper
        var lblPath = document.getElementById("lblModelPath");
        if (lblPath && typeof require !== "undefined") {
            try {
                var os = require("os");
                var path = require("path");
                var userProfile = process.env.USERPROFILE || os.homedir();
                var cacheDir = path.join(userProfile, ".cache", "whisper").replace(/\\/g, "/");
                lblPath.innerText = cacheDir;
            } catch(e) {}
        }
    },

    load: function() {
        try {
            var stored = localStorage.getItem("cgp_settings");
            if (stored) {
                this.settings = Object.assign(this.settings, JSON.parse(stored));
                var selHw = document.getElementById("selectHardware");
                if (selHw) selHw.value = this.settings.hardware;
            }
        } catch(e) {}
    },

    save: function() {
        try {
            localStorage.setItem("cgp_settings", JSON.stringify(this.settings));
        } catch(e) {}
    },

    renderRequirementsList: function(status) {
        var container = document.getElementById("requirementsListContainer");
        if (!container) return;

        container.innerHTML = "";

        var items = [
            {
                name: "Python 3.x Engine",
                ok: status.python === true,
                info: status.python ? "v" + status.python_version : "Python Not Found"
            },
            {
                name: "PyTorch AI Engine",
                ok: status.pytorch === true,
                info: status.pytorch ? "v" + status.pytorch_version + (status.cuda_available ? " (CUDA GPU)" : " (CPU Mode)") : "PyTorch Not Found"
            },
            {
                name: "OpenAI Whisper Engine",
                ok: status.whisper_pkg === true,
                info: status.whisper_pkg ? "Installed & Operational" : "Package Missing"
            },
            {
                name: "FFmpeg Audio Extractor",
                ok: status.ffmpeg === true,
                info: status.ffmpeg ? "Binary Ready" : "Binary Missing"
            },
            {
                name: "Model Storage Cache",
                ok: status.cache_ready === true,
                info: status.cache_ready ? (status.cache_dir || "~/.cache/whisper") : "Directory Error"
            }
        ];

        items.forEach(function(item) {
            var row = document.createElement("div");
            row.style.cssText = "display: flex; justify-content: space-between; align-items: center; background: var(--surface-elevated); border: 1px solid var(--border); padding: 6px 10px; border-radius: var(--radius-control);";

            var left = document.createElement("div");
            left.style.cssText = "display: flex; align-items: center; gap: 8px;";

            var icon = document.createElement("span");
            icon.style.cssText = `font-weight: 600; font-size: 10px; font-family: monospace; color: ${item.ok ? 'var(--success)' : 'var(--danger)'};`;
            icon.innerText = item.ok ? "[OK]" : "[FAIL]";

            var name = document.createElement("span");
            name.style.cssText = "font-weight: 500; color: var(--text-primary); font-size: 11px;";
            name.innerText = item.name;

            left.appendChild(icon);
            left.appendChild(name);

            var right = document.createElement("span");
            right.style.cssText = `font-size: 10px; color: ${item.ok ? 'var(--text-muted)' : 'var(--danger)'}; font-family: monospace;`;
            right.innerText = item.info;

            row.appendChild(left);
            row.appendChild(right);
            container.appendChild(row);
        });
    },

    renderModelManager: function() {
        var container = document.getElementById("modelListContainer");
        if (!container) return;

        container.innerHTML = '<div style="text-align: center; color: var(--text-muted); padding: 10px; font-size: 11px;">Checking dependencies and models...</div>';

        var self = this;
        DependencyInstaller.checkStatus(function(status) {
            self.renderRequirementsList(status);

            container.innerHTML = "";
            var models = status.models_detailed || [];

            if (models.length === 0) {
                container.innerHTML = '<div style="text-align: center; color: var(--text-muted); padding: 10px; font-size: 11px;">No models detected.</div>';
                return;
            }

            models.forEach(function(model) {
                var item = document.createElement("div");
                item.className = "model-row";
                item.style.cssText = "display: flex; justify-content: space-between; align-items: center; background: var(--surface-elevated); border: 1px solid var(--border); border-radius: var(--radius-control); padding: 8px 10px;";

                var left = document.createElement("div");
                left.style.cssText = "display: flex; flex-direction: column; gap: 2px;";

                var nameRow = document.createElement("div");
                nameRow.style.cssText = "display: flex; align-items: center; gap: 6px;";

                var nameLbl = document.createElement("span");
                nameLbl.style.cssText = "font-weight: 600; font-size: 11px; color: var(--text-primary);";
                nameLbl.innerText = `${model.name} (${model.size})`;

                var statusTag = document.createElement("span");
                statusTag.className = `badge-status ${model.installed ? 'transcribed' : 'untranscribed'}`;
                statusTag.innerText = model.installed ? "Installed" : "Not Installed";

                nameRow.appendChild(nameLbl);
                nameRow.appendChild(statusTag);

                var descLbl = document.createElement("div");
                descLbl.style.cssText = "font-size: 10px; color: var(--text-muted);";
                descLbl.innerText = model.desc;

                left.appendChild(nameRow);
                left.appendChild(descLbl);

                var right = document.createElement("div");

                if (model.installed) {
                    var btnDelete = document.createElement("button");
                    btnDelete.className = "btn-danger";
                    btnDelete.style.cssText = "padding: 4px 8px; font-size: 10px;";
                    btnDelete.innerText = "Delete";
                    btnDelete.addEventListener("click", function() {
                        if (confirm(`Are you sure you want to delete the ${model.name} model?`)) {
                            DependencyInstaller.deleteModel(model.key, function(success) {
                                self.renderModelManager();
                                if (typeof updateModelDropdown === "function") {
                                    DependencyInstaller.checkStatus(function(st) {
                                        updateModelDropdown(st.installed_models);
                                    });
                                }
                            });
                        }
                    });
                    right.appendChild(btnDelete);
                } else {
                    var btnDownload = document.createElement("button");
                    btnDownload.className = "btn-secondary";
                    btnDownload.style.cssText = "padding: 4px 10px; font-size: 10px;";
                    btnDownload.innerText = "Download";
                    btnDownload.addEventListener("click", function() {
                        showInstallerModalForModel(model.key);
                    });
                    right.appendChild(btnDownload);
                }

                item.appendChild(left);
                item.appendChild(right);
                container.appendChild(item);
            });
        });
    },

    initLicenseSection: function() {
        var inputKey = document.getElementById("licenseKeyInput");
        var btnActivate = document.getElementById("btnActivateLicense");
        var btnDeactivate = document.getElementById("btnDeactivateLicense");
        var lblStatus = document.getElementById("licenseStatus");

        if (!lblStatus) return;

        // Pre-fill input if key is stored
        if (inputKey && typeof LicenseManager !== "undefined") {
            var storedKey = LicenseManager.getStoredLicense();
            if (storedKey) inputKey.value = storedKey;
        }

        // 1. Initial Validation Check on Panel Load
        this.checkLicenseStatus();

        // 2. Activate Button Click
        if (btnActivate) {
            btnActivate.addEventListener("click", function() {
                var key = inputKey ? inputKey.value.trim() : "";
                if (!key) {
                    lblStatus.innerText = "Please enter a license key.";
                    lblStatus.style.color = "var(--danger)";
                    return;
                }

                btnActivate.disabled = true;
                lblStatus.innerText = "Checking...";
                lblStatus.style.color = "var(--text-secondary)";

                LicenseManager.activate(key, function(valid, message) {
                    btnActivate.disabled = false;
                    if (valid) {
                        lblStatus.innerText = "Activated";
                        lblStatus.style.color = "var(--success)";
                        if (typeof showAlertModal === "function") {
                            showAlertModal("License Activated", "Your license key has been successfully activated on this computer.");
                        }
                    } else {
                        lblStatus.innerText = message || "Invalid / already used on another computer";
                        lblStatus.style.color = "var(--danger)";
                        if (typeof showAlertModal === "function") {
                            showAlertModal("License Notice", message || "License activation failed.");
                        }
                    }
                });
            });
        }

        // 3. Deactivate Button Click
        if (btnDeactivate) {
            btnDeactivate.addEventListener("click", function() {
                if (typeof LicenseManager !== "undefined") {
                    btnDeactivate.disabled = true;
                    lblStatus.innerText = "Deactivating...";
                    LicenseManager.deactivate(function(success, msg) {
                        btnDeactivate.disabled = false;
                        if (inputKey) inputKey.value = "";
                        lblStatus.innerText = "Not activated";
                        lblStatus.style.color = "var(--text-secondary)";
                        if (typeof showAlertModal === "function") {
                            showAlertModal("License Deactivated", msg || "License key deactivated on this computer.");
                        }
                    });
                }
            });
        }
    },

    checkLicenseStatus: function() {
        var lblStatus = document.getElementById("licenseStatus");
        if (!lblStatus) return;

        if (typeof LicenseManager === "undefined") {
            lblStatus.innerText = "Not activated";
            lblStatus.style.color = "var(--text-secondary)";
            return;
        }

        var storedKey = LicenseManager.getStoredLicense();
        if (!storedKey) {
            lblStatus.innerText = "Not activated";
            lblStatus.style.color = "var(--text-secondary)";
            return;
        }

        lblStatus.innerText = "Checking...";
        lblStatus.style.color = "var(--text-secondary)";

        LicenseManager.validate(function(valid, message, data) {
            if (valid) {
                if (data && data.isOffline) {
                    lblStatus.innerText = "Activated (Offline Mode)";
                    lblStatus.style.color = "var(--warning)";
                } else {
                    lblStatus.innerText = "Activated";
                    lblStatus.style.color = "var(--success)";
                }
            } else {
                lblStatus.innerText = message || "Not activated";
                lblStatus.style.color = "var(--danger)";
            }
        });
    }
};
