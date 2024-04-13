import { Application } from "express";
import { AttackRoute } from "./attack.route";
import { UserRoute } from "./user.route";

export const SetupRoute = (app: Application) => {
  app.use(AttackRoute);
  app.use(UserRoute);
};
