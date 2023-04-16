import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoute";
import todoRoutes from "./routes/todoRoute";
import { TryDBConnect } from "./helper";

dotenv.config();
const PORT = process.env.PORT || 9000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/todo", todoRoutes);
app.use(async (_req: Request, res: Response, next) => {
  await TryDBConnect(() => {
    console.log(res);
    res.json({
      error: "Database connection error, please try again later",
    });
  }, next);
});
app.get("/", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Health check => `Server is Up`.",
  });
});

app.listen(PORT, () => {
  console.log(`CONNECTED TO DB AND SERVER START ON ${PORT}`);
});

module.exports = app;
