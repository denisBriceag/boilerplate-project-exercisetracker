import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

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
export function validateRequest(type: any) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const instance = plainToInstance(type, req.body);
    const errors = await validate(instance);

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
