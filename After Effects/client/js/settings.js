// Settings & Model Manager for After Effects ULTRA
var SettingsManager = {
    settings: {
        hardware: "cuda"
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
        this.updateModelPathDisplay();
    },

    updateModelPathDisplay: function() {
        var lblPath = document.getElementById("lblModelPath");
        if (!lblPath) return;

        if (typeof require !== "undefined") {
            try {
                var os = require("os");
                var path = require("path");
                var userProfile = process.env.USERPROFILE || os.homedir();
                var cacheDir = path.join(userProfile, ".cache", "whisper").replace(/\\/g, "/");
                lblPath.innerText = cacheDir;
                return;
            } catch(e) {}
        }
        lblPath.innerText = "~/.cache/whisper";
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

        status = status || {};
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
            row.style.cssText = "display: flex; justify-content: space-between; align-items: center; background: var(--surface-elevated); border: 1px solid var(--border); padding: 5px 8px; border-radius: 4px;";

            var left = document.createElement("div");
            left.style.cssText = "display: flex; align-items: center; gap: 6px;";

            var icon = document.createElement("span");
            icon.style.cssText = `font-weight: 700; font-size: 10px; color: ${item.ok ? 'var(--success)' : 'var(--danger)'}; font-family: monospace;`;
            icon.innerText = item.ok ? "[OK]" : "[MISSING]";

            var name = document.createElement("span");
            name.style.cssText = "font-weight: 600; color: var(--text-primary); font-size: 11px;";
            name.innerText = item.name;

            left.appendChild(icon);
            left.appendChild(name);

            var right = document.createElement("span");
            right.style.cssText = `font-size: 10px; color: ${item.ok ? 'var(--text-secondary)' : 'var(--danger)'}; font-family: monospace;`;
            right.innerText = item.info;

            row.appendChild(left);
            row.appendChild(right);
            container.appendChild(row);
        });
    },

    renderModelManager: function() {
        var container = document.getElementById("modelListContainer");
        if (!container) return;

        container.innerHTML = '<div style="text-align: center; color: var(--text-secondary); padding: 10px; font-size: 11px;">Checking dependencies and speech models...</div>';

        var self = this;
        DependencyInstaller.checkStatus(function(status) {
            self.renderRequirementsList(status);
            self.updateModelPathDisplay();

            container.innerHTML = "";
            var models = (status && status.models_detailed) ? status.models_detailed : [];

            if (models.length === 0) {
                // Fallback default list if detailed models were empty
                models = [
                    { key: "tiny", name: "Tiny", size: "75 MB", desc: "Fastest execution, lower accuracy.", installed: (status && status.installed_models && status.installed_models.indexOf("tiny") !== -1) },
                    { key: "base", name: "Base", size: "145 MB", desc: "Fast and standard accuracy. Recommended.", installed: (status && status.installed_models && status.installed_models.indexOf("base") !== -1) },
                    { key: "small", name: "Small", size: "480 MB", desc: "Balanced speed and accuracy.", installed: (status && status.installed_models && status.installed_models.indexOf("small") !== -1) },
                    { key: "medium", name: "Medium", size: "1.5 GB", desc: "High accuracy for complex audio.", installed: (status && status.installed_models && status.installed_models.indexOf("medium") !== -1) },
                    { key: "large-v3", name: "Large-v3", size: "3.0 GB", desc: "Maximum accuracy across languages.", installed: (status && status.installed_models && status.installed_models.indexOf("large-v3") !== -1) }
                ];
            }

            models.forEach(function(model) {
                var item = document.createElement("div");
                item.className = "model-item";

                var header = document.createElement("div");
                header.className = "model-item-header";

                var nameLbl = document.createElement("span");
                nameLbl.className = "model-name";
                nameLbl.innerText = `${model.name} (${model.size})`;

                var statusTag = document.createElement("span");
                statusTag.className = `status-tag ${model.installed ? 'installed' : 'not-installed'}`;
                statusTag.innerText = model.installed ? "Installed" : "Not Installed";

                header.appendChild(nameLbl);
                header.appendChild(statusTag);

                var descLbl = document.createElement("div");
                descLbl.className = "model-desc";
                descLbl.innerText = model.desc;

                var actionsRow = document.createElement("div");
                actionsRow.className = "model-actions";

                if (model.installed) {
                    var btnDelete = document.createElement("button");
                    btnDelete.className = "btn-danger";
                    btnDelete.innerText = "Delete Model";
                    btnDelete.addEventListener("click", function() {
                        if (confirm(`Are you sure you want to delete the ${model.name} model?`)) {
                            DependencyInstaller.deleteModel(model.key, function(success) {
                                self.renderModelManager();
                                if (typeof updateModelDropdown === "function") {
                                    DependencyInstaller.checkStatus(function(st) {
                                        if (st && st.installed_models) updateModelDropdown(st.installed_models);
                                    });
                                }
                            });
                        }
                    });
                    actionsRow.appendChild(btnDelete);
                } else {
                    var btnDownload = document.createElement("button");
                    btnDownload.className = "btn-secondary";
                    btnDownload.innerText = "Download Model";
                    btnDownload.addEventListener("click", function() {
                        if (typeof showInstallerModalForModel === "function") {
                            showInstallerModalForModel(model.key);
                        }
                    });
                    actionsRow.appendChild(btnDownload);
                }

                item.appendChild(header);
                item.appendChild(descLbl);
                item.appendChild(actionsRow);
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
                        lblStatus.style.color = "var(--accent)";
                        if (typeof showAlertModal === "function") {
                            showAlertModal("License Activated", "Your license key has been successfully activated on this computer!");
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
                    lblStatus.style.color = "var(--accent)";
                }
            } else {
                lblStatus.innerText = message || "Not activated";
                lblStatus.style.color = "var(--danger)";
            }
        });
    }
};
