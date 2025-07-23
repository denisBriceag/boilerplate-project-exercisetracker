import { Request, Response } from "express";
import { HttpSuccess } from "@models";
export declare class UserService {
    createUser(req: Request, res: Response): Promise<void>;
    getUsers(req: Request, res: Response): Promise<void>;
    addExercise(req: Request, res: Response): Promise<Response<any, Record<string, any>> | HttpSuccess<{
        userId: number;
        exerciseId: number;
        description: string;
        duration: number;
        date: Date;
    }>>;
    getUserLogs(req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=user.service.d.ts.map