import { Request, Response, NextFunction } from "express";
export declare function validateRequest<T>(dto: new () => T): (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=validate-request.middleware.d.ts.map