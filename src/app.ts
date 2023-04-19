import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoute";
import todoRoutes from "./routes/todoRoute";
import { DB } from "../src/database/config/index";

dotenv.config();
const PORT = process.env.PORT || 9000;
const app = express();

const initializeDB = async () => {
  await DB.initialize();
};

const initializeServer = async () => {
  initializeDB();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use("/api/v1/user", userRoutes);
  app.use("/api/v1/todo", todoRoutes);

  app.get("/", (_, res) => {
    res.status(200).json({
      success: true,
      message: "Health check => `Server is Up`.",
    });
  });
  console.log("=========>start<========");
  app.listen(PORT, () => {
    console.log(`CONNECTED TO DB AND SERVER START ON ${PORT}`);
  });
};
initializeServer();
console.log("=========>end<========");
export default app;
