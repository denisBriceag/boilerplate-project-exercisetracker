import { Request, Response, NextFunction } from "express";
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
export declare function validateRequest(type: any): (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=validate-request.middleware.d.ts.map