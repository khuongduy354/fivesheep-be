import { MongoClient } from "mongodb";

// Replace the uri string with your connection string.
const uri = process.env.MONGODB_STRING as string;

const client = new MongoClient(uri, { monitorCommands: true });
export const Lesson = client.db("FiveSheep").collection("Lesson");

export const getQuestionDataset = async (start = 0, end: number) => {
  const questions = await Lesson.find({})
    .limit(end - start + 1)
    .toArray();
  return questions;
};
