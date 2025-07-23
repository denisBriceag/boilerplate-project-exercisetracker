import "reflect-metadata";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import hpp from "hpp";
import bodyParser from "body-parser";
import { ReflectiveInjector } from "injection-js";

import { UserRouter } from "@routes/users.routes";
import { errorInterceptor } from "@middleware";
import { UserService } from "@services/user.service";
import { appDataSource } from "@configs";

// Configure dotenv
dotenv.config();

export const injector = ReflectiveInjector.resolveAndCreate([
  UserService,
  UserRouter,
]);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/users", injector.get(UserRouter).getRouter());

app.use(morgan("dev"));

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https://cdn.freecodecamp.org"],
      },
    },
  }),
);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  }),
);

// Prevent params pollution
app.use(hpp());

// Public assets
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const PORT = process.env.PORT || 3000;

app.use(errorInterceptor);

appDataSource
  .initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(() => console.error("☹️ DB failed to start"));
