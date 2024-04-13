import { AttackController } from "../controller/attack.controller";
import { Router } from "express";
import { isAuth } from "../middleware/isAuth";

export const AttackRoute = Router();
// request attack
AttackRoute.post("/attack", isAuth, AttackController.generateAttack);

// attacked callback
AttackRoute.post("/attack/attacked", isAuth, AttackController.attackCb);
