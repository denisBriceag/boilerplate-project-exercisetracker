import { Request, Response } from "express";
import { Exercise, User } from "@entities";
import { appDataSource } from "@configs";

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
      console.error("Create user error:", error);
      res.status(500).json({ error: "Internal server error", details: error });
    }
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const userRepository = appDataSource.getRepository(User);
      const users = await userRepository.find();

      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  }

  async addExercise(req: Request, res: Response): Promise<void> {
    try {
      console.log(" addExercise route hit");
      const userRepository = appDataSource.getRepository(User);
      const exerciseRepository = appDataSource.getRepository(Exercise);

      const user = await userRepository.findOneByOrFail({
        id: parseInt(req.params._id as string),
      });

      if (!user) res.status(404).json({ error: "User not found" });

      const { description, duration, date } = req.body;

      const exercise = new Exercise();
      exercise.description = description;
      exercise.duration = duration;
      exercise.date = date ? new Date(date) : new Date();
      exercise.user = user;

      await exerciseRepository.save(exercise);

      res.json({
        userId: user.id,
        exerciseId: exercise.id,
        description: exercise.description,
        duration: exercise.duration,
        date: exercise.date,
      });
    } catch (error) {
      console.log(error, "AAAAAAA");
    }
  }

  async getUserLogs(req: Request, res: Response): Promise<void> {
    const userRepository = appDataSource.getRepository(User);
    const exerciseRepository = appDataSource.getRepository(Exercise);

    const { from, to, limit } = req.query;
    const userId = parseInt(req.params._id as string);

    const user = await userRepository.findOneByOrFail({ id: userId });

    if (!user) res.status(404).json({ error: "User not found" });

    let query = exerciseRepository
      .createQueryBuilder("exercise")
      .where("exercise.userId = :userId", { userId });

    if (from) query = query.andWhere("exercise.date >= :from", { from });
    if (to) query = query.andWhere("exercise.date <= :to", { to });

    if (limit) query = query.limit(Number(limit));

    const exercises = await query.getMany();

    res.json({
      id: user.id,
      username: user.username,
      count: exercises.length,
      logs: exercises.map(({ id, description, duration, date }) => ({
        id,
        description,
        duration,
        date,
      })),
    });
  }
}
