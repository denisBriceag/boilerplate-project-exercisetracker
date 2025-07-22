import { DataSource } from "typeorm";
import { Exercise, User } from "@entities";

export const appDataSource = new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  synchronize: true,
  entities: [User, Exercise],
});
