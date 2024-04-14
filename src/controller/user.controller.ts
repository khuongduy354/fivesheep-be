import { Request, Response } from "express";
import { supabase } from "../helper/supabase";
import { getQuestionDataset } from "../helper/mongo";

const updateWool = async (req: Request, res: Response) => {
  const { wool } = req.body;
  const { error } = await supabase.rpc("add_wool", {
    extraWool: wool,
    userid: req.user.id,
  });
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(200).json({ message: "Wool added successfully" });
};
const getWool = async (req: Request, res: Response) => {
  const { data, error } = await supabase
    .from("User")
    .select("wool")
    .eq("id", req.user.id);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  if (data.length === 0)
    return res.status(404).json({ error: "User not found" });
  return res.status(200).json({ wool: data[0].wool });
};
const getLessons = async (req: Request, res: Response) => {
  const { q } = req.query;
  if (q === "all" || q === undefined) {
    const { data, error } = await supabase
      .from("LessonLearnt")
      .select(
        `
      Lesson (id ,title)
      `
      )
      .eq("user_id", req.user.id);

    if (error) return res.status(400).json({ error: error.message });

    // get latest unlocked lesson
    const unlockedLessonIdx = data.length;
    let { data: lessons, error: lessonError } = await supabase
      .from("Lesson")
      .select(
        `
      Lesson (id,title)
      `
      )
      .eq("id", unlockedLessonIdx);
    if (lessonError)
      return res.status(400).json({ error: lessonError.message });

    if (!lessons) {
      lessons = [];
    } else {
      data.push(lessons[0]);
    }

    // get mongodb data set here
    const dataset = await getQuestionDataset(0, data.length - 1);

    return res
      .status(200)
      .json({ lessons_meta_data: data, lessons_dataset: dataset });
  } else if (q === "learnt") {
    let { data, error } = await supabase
      .from("LessonLearnt")
      .select(
        `
        Lesson (id,title)
      `
      )
      .eq("user_id", req.user.id);

    if (!data) data = [];
    if (error) return res.status(400).json({ error: error.message });

    const dataset = await getQuestionDataset(0, data.length - 1);
    return res
      .status(200)
      .json({ lessons_metadata: data, lessons_dataset: dataset });
  }
};
const learntLesson = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { error } = await supabase.from("LearntLesson").insert({
    user_id: req.user.id,
    lesson_id: id,
  });
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(200).json({ message: "Lesson learnt successfully" });
};
export const UserController = { updateWool, getWool, getLessons, learntLesson };
