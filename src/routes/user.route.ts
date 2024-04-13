import { UserController } from "../controller/user.controller";
import { Router } from "express";
import { isAuth } from "../middleware/isAuth";

export const UserRoute = Router();
UserRoute.patch("/me/wool", isAuth, UserController.updateWool);
UserRoute.get("/me/wool", isAuth, UserController.getWool);

// query string: ?q=all|learn
UserRoute.get("/me/lessons", isAuth, UserController.getLessons);
UserRoute.post("/me/lessons/:id/learnt", isAuth, UserController.learntLesson);
