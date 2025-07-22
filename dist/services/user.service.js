"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const _entities_1 = require("@entities");
const _configs_1 = require("@configs");
class UserService {
    async createUser(req, res) {
        try {
            const userRepository = _configs_1.appDataSource.getRepository(_entities_1.User);
            const { username } = req.body;
            const user = new _entities_1.User();
            user.username = username;
            await userRepository.save(user);
            res.status(201).json({ username: user.username, id: user.id });
        }
        catch (error) {
            console.error("Create user error:", error);
            res.status(500).json({ error: "Internal server error", details: error });
        }
    }
    async getUsers(req, res) {
        try {
            const userRepository = _configs_1.appDataSource.getRepository(_entities_1.User);
            const users = await userRepository.find();
            res.status(200).json(users);
        }
        catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({ error: "Failed to fetch users" });
        }
    }
    async addExercise(req, res) {
        try {
            console.log(" addExercise route hit");
            const userRepository = _configs_1.appDataSource.getRepository(_entities_1.User);
            const exerciseRepository = _configs_1.appDataSource.getRepository(_entities_1.Exercise);
            const user = await userRepository.findOneByOrFail({
                id: parseInt(req.params._id),
            });
            if (!user)
                res.status(404).json({ error: "User not found" });
            const { description, duration, date } = req.body;
            const exercise = new _entities_1.Exercise();
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
        }
        catch (error) {
            console.log(error, "AAAAAAA");
        }
    }
    async getUserLogs(req, res) {
        const userRepository = _configs_1.appDataSource.getRepository(_entities_1.User);
        const exerciseRepository = _configs_1.appDataSource.getRepository(_entities_1.Exercise);
        const { from, to, limit } = req.query;
        const userId = parseInt(req.params._id);
        const user = await userRepository.findOneByOrFail({ id: userId });
        if (!user)
            res.status(404).json({ error: "User not found" });
        let query = exerciseRepository
            .createQueryBuilder("exercise")
            .where("exercise.userId = :userId", { userId });
        if (from)
            query = query.andWhere("exercise.date >= :from", { from });
        if (to)
            query = query.andWhere("exercise.date <= :to", { to });
        if (limit)
            query = query.limit(Number(limit));
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
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map