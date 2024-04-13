import express from "express";
import "dotenv/config";
import { isAuth } from "../middleware/isAuth";
import { supabase } from "../helper/supabase";

const app = express();
const PORT = (process.env.PORT as string) || 8000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/me/wool", isAuth, async (req, res) => {
  const user_id = req.user.id;
  const { data } = await supabase.from("User").select("wool").eq("id", user_id);
  if (!data) return res.status(404).json({ message: "Not Found" });

  res.status(200).json({ wool: data[0].wool });
});

app.patch("/me/wool", isAuth, async (req, res) => {
  const { newWool } = req.body;
  const user_id = req.user.id;
  const { error } = await supabase
    .from("User")
    .update({ wool: newWool })
    .eq("id", user_id);

  if (error) return res.status(400).json({ message: "Bad Request" });
  res.status(200).json({ message: "Updated" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
