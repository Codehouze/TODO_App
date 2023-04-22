import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoute";
import todoRoutes from "./routes/todoRoute";
import ConnectDb from "../src/database/config/index";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 9000;

const initializeServer = async () => {
  await ConnectDb();
  console.log("========> start <=========");
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use("/api/v1/user", userRoutes);
  app.use("/api/v1/todo", todoRoutes);

  app.get("/", (_, res) => {
    res.status(200).json({
      success: true,
      message: "Health check => Server is Up!!!",
    });
  });
  app.listen(PORT, () => {
    console.log(`CONNECTED TO DB AND SERVER START ON ${PORT}`);
  });
};
// initializeServer();
console.log("========> end <=========");
export default app;
