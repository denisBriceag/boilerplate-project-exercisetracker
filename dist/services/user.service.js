"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const typeorm_1 = require("typeorm");
const _entities_1 = require("@entities");
const _configs_1 = require("@configs");
const _constants_1 = require("@constants");
const _models_1 = require("@models");
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
            if (error instanceof typeorm_1.QueryFailedError &&
                _constants_1.SQLITE_ERROR_MAP[error.driverError.code]) {
                res
                    .status(500)
                    .json(new _models_1.HttpError(_constants_1.SQLITE_ERROR_MAP[error.driverError.code], 500));
                return;
            }
            res.status(500).json(new _models_1.HttpError(error, 500));
        }
    }
    async getUsers(req, res) {
        try {
            const userRepository = _configs_1.appDataSource.getRepository(_entities_1.User);
            const users = await userRepository.find();
            res.status(200).json(new _models_1.HttpSuccess(users, 200));
        }
        catch (error) {
            res.status(500).json(new _models_1.HttpError("Failed to get users", 500));
        }
    }
    async addExercise(req, res) {
        try {
            const userRepository = _configs_1.appDataSource.getRepository(_entities_1.User);
            const exerciseRepository = _configs_1.appDataSource.getRepository(_entities_1.Exercise);
            const userId = parseInt(req.params._id, 10);
            const user = await userRepository.findOneBy({ id: userId });
            if (!user) {
                return res.status(404).json(new _models_1.HttpError("User not found", 404));
            }
            const { description, duration, date } = req.body;
            const exercise = new _entities_1.Exercise();
            exercise.description = description;
            exercise.duration = duration;
            exercise.date = date ? new Date(date) : new Date();
            exercise.user = user;
            await exerciseRepository.save(exercise);
            return new _models_1.HttpSuccess({
                userId: user.id,
                exerciseId: exercise.id,
                description: exercise.description,
                duration: exercise.duration,
                date: exercise.date,
            }, 201);
        }
        catch (error) {
            return res.status(500).json(new _models_1.HttpError("Failed to add exercise", 500));
        }
    }
    async getUserLogs(req, res) {
        const userRepository = _configs_1.appDataSource.getRepository(_entities_1.User);
        const exerciseRepository = _configs_1.appDataSource.getRepository(_entities_1.Exercise);
        const { from, to, limit } = req.query;
        const userId = parseInt(req.params._id);
        const user = await userRepository.findOneByOrFail({ id: userId });
        if (!user)
            res.status(404).json(new _models_1.HttpError(`No user with id ${userId}`, 404));
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
        res.status(200).json(new _models_1.HttpSuccess({
            id: user.id,
            username: user.username,
            count: exercises.length,
            logs: exercises.map(({ id, description, duration, date }) => ({
                id,
                description,
                duration,
                date,
            })),
        }, 200));
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map