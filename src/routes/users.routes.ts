import { Router } from "express";
import { UserService } from "@services/user.service";
import { validateRequest } from "@middleware";
import {
  CreateExerciseDto,
  CreateUserDto,
  GetLogsQueryDto,
  UserIdParamDto,
} from "@dto";
import { Injectable, Injector } from "injection-js";
import { ValidationType } from "../enums/validation-type.enum";

@Injectable()
export class UserRouter {
  routes: Router;

  constructor(private readonly _injector: Injector) {
    this.routes = Router();
    this._initializeRoutes();
  }

  getRouter(): Router {
    return this.routes;
  }

  private _initializeRoutes(): void {
    const userService = this._injector.get(UserService);

    this.routes.get("", userService.getUsers);
    this.routes.post(
      "",
      validateRequest(CreateUserDto, ValidationType.BODY),
      userService.createUser,
    );
    this.routes.post(
      "/:_id/exercises",
      validateRequest(UserIdParamDto, ValidationType.PARAMS),
      validateRequest(CreateExerciseDto, ValidationType.BODY),
      userService.addExercise,
    );
    this.routes.get(
      "/:_id/logs",
      validateRequest(UserIdParamDto, ValidationType.PARAMS),
      validateRequest(GetLogsQueryDto, ValidationType.QUERY),
      userService.getUserLogs,
    );
  }
}
