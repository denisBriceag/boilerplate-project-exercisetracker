"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const user_service_1 = require("@services/user.service");
const _middleware_1 = require("@middleware");
const _dto_1 = require("@dto");
const injection_js_1 = require("injection-js");
let UserRouter = class UserRouter {
    _injector;
    routes;
    constructor(_injector) {
        this._injector = _injector;
        this.routes = (0, express_1.Router)();
        this._initializeRoutes();
    }
    getRouter() {
        return this.routes;
    }
    _initializeRoutes() {
        const userService = this._injector.get(user_service_1.UserService);
        this.routes.get("", userService.getUsers);
        this.routes.post("", (0, _middleware_1.validateRequest)(_dto_1.CreateUserDto), userService.createUser);
        this.routes.post("/:_id/exercises", (0, _middleware_1.validateRequest)(_dto_1.CreateExerciseDto), userService.addExercise);
        this.routes.get("/:_id/logs", userService.getUserLogs);
    }
};
exports.UserRouter = UserRouter;
exports.UserRouter = UserRouter = __decorate([
    (0, injection_js_1.Injectable)(),
    __metadata("design:paramtypes", [injection_js_1.Injector])
], UserRouter);
//# sourceMappingURL=users.routes.js.map