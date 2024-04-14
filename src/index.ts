import express from "express";
import cors from "cors";
import "dotenv/config";
import { SetupRoute } from "./routes/index.route";

const app = express();
const PORT = (process.env.PORT as string) || 8000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});

SetupRoute(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
