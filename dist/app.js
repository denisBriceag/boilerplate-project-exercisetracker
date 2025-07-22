"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.injector = void 0;
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const hpp_1 = __importDefault(require("hpp"));
const body_parser_1 = __importDefault(require("body-parser"));
const injection_js_1 = require("injection-js");
const users_routes_1 = require("@routes/users.routes");
const _middleware_1 = require("@middleware");
const user_service_1 = require("@services/user.service");
const _configs_1 = require("@configs");
// Configure dotenv
dotenv_1.default.config();
exports.injector = injection_js_1.ReflectiveInjector.resolveAndCreate([
    user_service_1.UserService,
    users_routes_1.UserRouter,
]);
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use("/api/users", users_routes_1.userRoutes);
console.log(exports.injector
    .get(users_routes_1.UserRouter)
    .getRouter()
    .stack.forEach((r, i) => console.log(`${i} - `, r.route?.path)));
app.use((0, morgan_1.default)("dev"));
app.use((0, helmet_1.default)({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https://cdn.freecodecamp.org"],
        },
    },
}));
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
}));
// Prevent params pollution
app.use((0, hpp_1.default)());
// Public assets
app.use(express_1.default.static("public"));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
});
const PORT = process.env.PORT || 3000;
app.use(_middleware_1.errorInterceptor);
_configs_1.appDataSource
    .initialize()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
})
    .catch(() => console.error("☹️ DB failed to start"));
//# sourceMappingURL=app.js.map