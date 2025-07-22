"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorInterceptor = errorInterceptor;
function errorInterceptor(err, req, res, next) {
    if (err.status && err.message) {
        res.status(err.status).json({ error: err.message });
    }
    else {
        res.status(500).json({ error: "Internal server error" });
    }
}
//# sourceMappingURL=error.middleware.js.map