import { Request, Response } from "express";
import { QueryFailedError } from "typeorm";

import { Exercise, User } from "@entities";
import { appDataSource } from "@configs";
import { SQLITE_ERROR_MAP } from "@constants";
import {
  CreatedExerciseResponse,
  HttpError,
  HttpSuccess,
  UserExerciseLog,
} from "@models";

export class UserService {
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userRepository = appDataSource.getRepository(User);
      const { username } = req.body;
      const user = new User();

      user.username = username;

      await userRepository.save(user);

      res.status(201).json({ username: user.username, id: user.id });
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        SQLITE_ERROR_MAP[error.driverError.code]
      ) {
        res
          .status(500)
          .json(
            new HttpError(
              SQLITE_ERROR_MAP[error.driverError.code] as string,
              500,
            ),
          );

        return;
      }

      res.status(500).json(new HttpError(error as string, 500));
    }
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const userRepository = appDataSource.getRepository(User);
      const users = await userRepository.find();

      if (users.length === 0) {
        res.status(404).json(new HttpError("No users we found", 404));
      }

      res.status(200).json(
        new HttpSuccess(
          users.map(({ id, username }) => ({ id, username })),
          200,
        ),
      );
    } catch (error) {
      res.status(500).json(new HttpError("Internal server error", 500));
    }
  }

  async addExercise(req: Request, res: Response) {
    try {
      const userRepository = appDataSource.getRepository(User);
      const exerciseRepository = appDataSource.getRepository(Exercise);

      const userId = parseInt(req.params._id as string, 10);
      const user = await userRepository.findOneBy({ id: userId });

      if (!user) {
        return res
          .status(404)
          .json(new HttpError(`No user with id ${userId}`, 404));
      }

      const { description, duration, date } = req.body;

      const exercise = new Exercise();
      exercise.description = description;
      exercise.duration = duration;
      exercise.date = date ? new Date(date) : new Date();
      exercise.user = user;

      await exerciseRepository.save(exercise);

      return res.json(
        new HttpSuccess<CreatedExerciseResponse>(
          {
            userId: user.id,
            exerciseId: exercise.id,
            description: exercise.description,
            duration: exercise.duration,
            date: exercise.date,
          },
          201,
        ),
      );
    } catch (error) {
      return res.status(500).json(new HttpError("Internal server error", 500));
    }
  }

  async getUserLogs(req: Request, res: Response) {
    try {
      const userRepository = appDataSource.getRepository(User);
      const exerciseRepository = appDataSource.getRepository(Exercise);

      const { from, to, limit } = req.query;
      const userId = parseInt(req.params._id as string);

      const user = await userRepository.findOneByOrFail({ id: userId });

      if (!user)
        res.status(404).json(new HttpError(`No user with id ${userId}`, 404));

      let query = exerciseRepository
        .createQueryBuilder("exercise")
        .where("exercise.userId = :userId", { userId });

      if (from) query = query.andWhere("exercise.date >= :from", { from });
      if (to) query = query.andWhere("exercise.date <= :to", { to });

      if (limit) query = query.limit(Number(limit));

      const exercises = await query.getMany();

      res.status(200).json(
        new HttpSuccess<UserExerciseLog>(
          {
            id: user.id,
            username: user.username,
            count: exercises.length,
            logs: exercises.map(({ id, description, duration, date }) => ({
              id,
              description,
              duration,
              date,
            })),
          },
          200,
        ),
      );
    } catch {
      return res.status(500).json(new HttpError("Internal server error", 500));
    }
  }
}
