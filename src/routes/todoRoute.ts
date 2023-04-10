import express from "express";
import TodoController from "../controller/todoCtrl";

const router = express.Router();

// Define the routes
router.post("/", TodoController.createTodo);

router.get("/", TodoController.getAllTodo);

router.get("/:id", TodoController.getOneTodo);

router.patch("/:id", TodoController.updateTodo);

router.delete("/:id", TodoController.deleteTodo);

export default router;
