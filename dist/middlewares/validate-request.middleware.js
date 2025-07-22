"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = validateRequest;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
/**
 * @description Instantiate the request body as Dto instance
 * If body fails to validate - returns an error
 *
 * @example Sample error response:
 * {
 *   "error": "Validation failed",
 *   "details": [
 *     {
 *       "property": "username",
 *       "constraints": {
 *         "isLength": "username must be longer than or equal to 1 character"
 *       }
 *     }
 *   ]
 * }
 *
 * */
function validateRequest(type) {
    return async (req, res, next) => {
        const instance = (0, class_transformer_1.plainToInstance)(type, req.body);
        const errors = await (0, class_validator_1.validate)(instance);
        if (errors.length > 0) {
            return res.status(400).json({
                error: "Validation failed",
                details: errors.map((e) => ({
                    property: e.property,
                    constraints: e.constraints,
                })),
            });
        }
        req.body = instance;
        next();
    };
}
//# sourceMappingURL=validate-request.middleware.js.map