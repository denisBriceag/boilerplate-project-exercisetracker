import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

import { mapValidationErrors } from "@utils";
import { HttpError } from "@models";
import { ValidationType } from "../enums/validation-type.enum";

export function validateRequest<T>(
  dto: new () => T,
  validationType: ValidationType,
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const instance = plainToInstance<T, unknown>(dto, req[validationType], {
        enableImplicitConversion: true,
      });

      const errors = await validate(instance as object, {
        whitelist: true,
      });

      if (errors.length > 0) {
        return res
          .status(400)
          .json(new HttpError(mapValidationErrors(errors), 400));
      }

      if (validationType === ValidationType.QUERY) {
        // request.query has only getter
        Object.assign(req[validationType], instance);
      } else {
        req[validationType] = instance;
      }
      next();
    } catch (error) {
      console.log(error);
      res.json(new HttpError("Internal validation error", 500));
    }
  };
}
