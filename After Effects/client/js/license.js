// Supabase License Manager for Caption Generator ULTRA (After Effects)
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pb2R1c3lsbmFlYWF2Z3J0Z3B2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1NzgzOTYsImV4cCI6MjEwMTE1NDM5Nn0.Rs7Kf4ffx1AISLbMYnkz54aMSnxMlwpr_0sfBSjfbAM";

function generateMachineId() {
    if (typeof require !== "undefined") {
        try {
            var os = require("os");
            var crypto = require("crypto");
            var cpus = os.cpus();
            var cpuModel = (cpus && cpus.length > 0) ? cpus[0].model : "unknown-cpu";
            var raw = [
                os.hostname(),
                os.platform(),
                os.arch(),
                cpuModel,
                os.totalmem()
            ].join("|");
            return crypto.createHash("sha256").update(raw).digest("hex").substring(0, 32);
        } catch (e) {
            console.error("Machine ID generation error:", e);
        }
    }
    return "browser-client-id-32chars-fallback";
}

var LicenseManager = {
    PRODUCT_NAME: "Caption Generator ULTRA",
    REQUIRED_TIER: "ultra",
    STORAGE_KEY: "cgp_ultra_license_key",
    STORAGE_TIER_KEY: "cgp_ultra_license_tier",

    getStoredLicense: function() {
        try {
            return localStorage.getItem(this.STORAGE_KEY) || "";
        } catch (e) {
            return "";
        }
    },

    getStoredTier: function() {
        try {
            return localStorage.getItem(this.STORAGE_TIER_KEY) || "";
        } catch (e) {
            return "";
        }
    },

    saveLicense: function(key, tier) {
        try {
            localStorage.setItem(this.STORAGE_KEY, (key || "").trim());
            localStorage.setItem(this.STORAGE_TIER_KEY, (tier || "ultra").trim().toLowerCase());
        } catch (e) {}
    },

    clearLicense: function() {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
            localStorage.removeItem(this.STORAGE_TIER_KEY);
        } catch (e) {}
    },

    getMachineId: function() {
        return generateMachineId();
    },

    activate: function(licenseKey, callback) {
        var key = (licenseKey || "").trim();
        if (!key) {
            if (callback) callback(false, "License key cannot be empty.");
            return;
        }

        var machineId = this.getMachineId();
        var self = this;
        var url = "https://oiodusylnaeaavgrtgpv.supabase.co/functions/v1/activate-license";

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + SUPABASE_ANON_KEY,
                "apikey": SUPABASE_ANON_KEY
            },
            body: JSON.stringify({
                license_key: key,
                machine_id: machineId
            })
        })
        .then(function(res) {
            return res.json().then(function(data) {
                return { status: res.status, ok: res.ok, data: data };
            });
        })
        .then(function(resObj) {
            if (resObj.ok && resObj.data && resObj.data.valid) {
                var tier = (resObj.data.product_tier || "pro").toLowerCase();
                if (tier === "pro") {
                    self.clearLicense();
                    if (callback) callback(false, "This license is for Caption Generator Pro. ULTRA requires an ULTRA license.", resObj.data);
                    return;
                }
                if (tier !== "ultra") {
                    self.clearLicense();
                    if (callback) callback(false, "Invalid license tier for Caption Generator ULTRA.", resObj.data);
                    return;
                }

                self.saveLicense(key, tier);
                if (callback) callback(true, resObj.data.message || "ULTRA License activated successfully!", resObj.data);
            } else {
                var errMessage = (resObj.data && resObj.data.error) ? resObj.data.error : (resObj.data && resObj.data.message ? resObj.data.message : "License activation failed.");
                if (callback) callback(false, errMessage, resObj.data);
            }
        })
        .catch(function(err) {
            console.error("License activation network error:", err);
            if (callback) callback(false, "Network error during license activation. Please check internet connection.");
        });
    },

    validate: function(callback) {
        var key = this.getStoredLicense();
        if (!key) {
            if (callback) callback(false, "No stored license key.", { valid: false, reason: "no_key" });
            return;
        }

        var machineId = this.getMachineId();
        var self = this;
        var url = "https://oiodusylnaeaavgrtgpv.supabase.co/functions/v1/validate-license";

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + SUPABASE_ANON_KEY,
                "apikey": SUPABASE_ANON_KEY
            },
            body: JSON.stringify({
                license_key: key,
                machine_id: machineId
            })
        })
        .then(function(res) {
            return res.json().then(function(data) {
                return { status: res.status, ok: res.ok, data: data };
            }).catch(function() {
                return { status: res.status, ok: false, data: {} };
            });
        })
        .then(function(resObj) {
            if (resObj.ok && resObj.data && resObj.data.valid) {
                var tier = (resObj.data.product_tier || "pro").toLowerCase();
                if (tier === "pro") {
                    self.clearLicense();
                    if (callback) callback(false, "This license is for Caption Generator Pro. ULTRA requires an ULTRA license.", { valid: false, reason: "pro_tier" });
                    return;
                }
                if (tier !== "ultra") {
                    self.clearLicense();
                    if (callback) callback(false, "Invalid license tier for Caption Generator ULTRA.", { valid: false, reason: "invalid_tier" });
                    return;
                }

                self.saveLicense(key, tier);
                if (callback) callback(true, resObj.data.message || "ULTRA License is valid.", resObj.data);
            } else if (resObj.status === 400 || resObj.status === 401 || resObj.status === 403 || (resObj.data && resObj.data.valid === false)) {
                self.clearLicense();
                var errMessage = (resObj.data && resObj.data.error) ? resObj.data.error : (resObj.data && resObj.data.message ? resObj.data.message : "License is invalid or revoked.");
                if (callback) callback(false, errMessage, { valid: false, reason: "revoked" });
            } else {
                // Offline Grace Mode
                var cachedTier = self.getStoredTier();
                if (cachedTier === "pro") {
                    if (callback) callback(false, "This license is for Caption Generator Pro. ULTRA requires an ULTRA license.", { valid: false });
                    return;
                }
                if (callback) callback(true, "License active (Offline Grace Mode).", { valid: true, isOffline: true, product_tier: cachedTier || "ultra" });
            }
        })
        .catch(function(err) {
            console.error("License validation network error:", err);
            var cachedTier = self.getStoredTier();
            if (cachedTier === "pro") {
                if (callback) callback(false, "This license is for Caption Generator Pro. ULTRA requires an ULTRA license.", { valid: false });
                return;
            }
            if (callback) callback(true, "Network offline. License active (Offline Grace Mode).", { valid: true, isOffline: true, product_tier: cachedTier || "ultra" });
        });
    },

    deactivate: function(callback) {
        var key = this.getStoredLicense();
        var machineId = this.getMachineId();
        var self = this;

        if (!key) {
            this.clearLicense();
            if (callback) callback(true, "No license key was active.");
            return;
        }

        var url = "https://oiodusylnaeaavgrtgpv.supabase.co/functions/v1/deactivate-license";

        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + SUPABASE_ANON_KEY,
                "apikey": SUPABASE_ANON_KEY
            },
            body: JSON.stringify({
                license_key: key,
                machine_id: machineId
            })
        })
        .then(function(res) {
            return res.json().then(function(data) {
                return { status: res.status, ok: res.ok, data: data };
            }).catch(function() {
                return { status: res.status, ok: false, data: {} };
            });
        })
        .then(function(resObj) {
            self.clearLicense();
            if (resObj.ok) {
                if (callback) callback(true, (resObj.data && resObj.data.message) ? resObj.data.message : "Device deactivated successfully.");
            } else {
                var msg = (resObj.data && resObj.data.error) ? resObj.data.error : "Local activation removed.";
                if (callback) callback(true, msg);
            }
        })
        .catch(function(err) {
            console.error("Deactivate network error:", err);
            self.clearLicense();
            if (callback) callback(true, "Local activation removed.");
        });
    },

    isActivated: function(callback) {
        this.validate(function(valid) {
            if (callback) callback(valid);
        });
    }
};
