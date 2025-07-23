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
  private readonly _routes: Router;

  constructor(private readonly _injector: Injector) {
    this._routes = Router();
    this._initializeRoutes();
  }

  getRouter(): Router {
    return this._routes;
  }

  private _initializeRoutes(): void {
    const userService = this._injector.get(UserService);

    this._routes.get("", userService.getUsers);

    this._routes.post(
      "",
      validateRequest(CreateUserDto, ValidationType.BODY),
      userService.createUser,
    );

    this._routes.post(
      "/:_id/exercises",
      validateRequest(UserIdParamDto, ValidationType.PARAMS),
      validateRequest(CreateExerciseDto, ValidationType.BODY),
      userService.addExercise,
    );

    this._routes.get(
      "/:_id/logs",
      validateRequest(UserIdParamDto, ValidationType.PARAMS),
      validateRequest(GetLogsQueryDto, ValidationType.QUERY),
      userService.getUserLogs,
    );
  }
}
