"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = (req, resp, next) => {
    console.log(`[logger.middleware]:: url: ${req.url}; body: ${JSON.stringify(req.body)}; `);
    return next();
};
//# sourceMappingURL=logger.middleware.js.map