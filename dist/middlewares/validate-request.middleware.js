"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = validateRequest;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const _utils_1 = require("@utils");
const _models_1 = require("@models");
function validateRequest(dto) {
    return async (req, res, next) => {
        try {
            const instance = (0, class_transformer_1.plainToInstance)(dto, req.body, {
                enableImplicitConversion: true,
            });
            const errors = await (0, class_validator_1.validate)(instance, {
                whitelist: true,
            });
            if (errors.length > 0) {
                return res
                    .status(400)
                    .json(new _models_1.HttpError((0, _utils_1.mapValidationErrors)(errors), 400));
            }
            req.body = (0, class_transformer_1.instanceToPlain)(instance);
            next();
        }
        catch (error) {
            res.status(500).json(new _models_1.HttpError("Internal validation error", 500));
        }
    };
}
//# sourceMappingURL=validate-request.middleware.js.map