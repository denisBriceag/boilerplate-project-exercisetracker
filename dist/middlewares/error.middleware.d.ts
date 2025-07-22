import { Request, Response, NextFunction } from "express";
export declare function errorInterceptor(err: {
    status: number;
    message: string;
}, req: Request, res: Response, next: NextFunction): void;
//# sourceMappingURL=error.middleware.d.ts.map