import express from "express";
import TodoController from "../controller/todoCtrl";

const router = express.Router();

// Define the routes
router.post("/", TodoController.createTodo); //Add a to-do

router.get("/", TodoController.getAllTodo); // List all todos

router.get("/:id", TodoController.getOneTodo); // Return a todo

router.patch("/:id", TodoController.updateTodo); // Change a to-do

router.delete("/:id", TodoController.deleteTodo); // Delete a to-do (do a soft delete)

export default router;







