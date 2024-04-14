import { NextFunction, Request, Response } from "express";
import { supabase } from "../helper/supabase";

export const isAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //extract token
  const token = req.header("Authorization");
  if (!token || !token.startsWith("Bearer ")) {
    console.log("Token invalid");
    return res.status(401).json({ message: "Token invalid" });
  }

  // get id from token
  const supa_user = (await supabase.auth.getUser(token.substring(7))).data.user;
  if (!supa_user) {
    console.log("Can't validate token");
    return res.status(401).json({ message: "Can't validate token" });
  }

  // find in database
  const { data, error } = await supabase
    .from("User")
    .select()
    .eq("id", supa_user.id);
  // // if (error) return res.status(404).json({ message: "Unauthorized" });

  //if not exist, create
  if (!data || data.length === 0) {
    const { error } = await supabase
      .from("User")
      .insert([{ id: supa_user.id, email: supa_user.email }]);
    if (error) {
      console.log("Can't create auth user entry: ", error);
    }
  }

  //  add user into req object
  req.user = supa_user;
  req.user.id = supa_user.id;
  next();
};
