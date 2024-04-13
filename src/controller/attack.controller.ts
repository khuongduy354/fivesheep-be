import { Request, Response } from "express";
const minAttackDelay = 10 * 60; // 10 minutes
const percent = 60 / 100; // 60%

const generateAttack = (req: Request, res: Response) => {
  // get last attacked time
  // if last attacked time is less than delay
  return res.status(200).json({ message: "Attacked 10 min", attack: null });

  //
  if (generateOnPercent(percent)) {
    // target can be facebook, google, email
    const attack = { type: "phishing", target: "facebook" };
    return res.status(200).json({ message: "Attacked", attack: attack });
  } else {
    return res.status(200).json({ message: "Attacked", attack: null });
  }
};

const attackCb = (req: Request, res: Response) => {
  // update last attacked time
  if (req.body.attacked) {
    // update last attacked time
  }
  return res.status(200).json({ message: "Update user's attack status" });
};

const generateOnPercent = (n: number) => {
  return Math.random() < n;
};

export const AttackController = {
  generateAttack,
  attackCb,
};
