import { Router } from "express";
import { Injector } from "injection-js";
export declare const userRoutes: import("express-serve-static-core").Router;
export declare class UserRouter {
    private readonly _injector;
    routes: Router;
    constructor(_injector: Injector);
    getRouter(): Router;
    private _initializeRoutes;
}
//# sourceMappingURL=users.routes.d.ts.map