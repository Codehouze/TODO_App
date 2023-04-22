import express from "express";
import validator from "../middleware/Validate";
import TodoController from "../controller/todoCtrl";
import verifyJwToken from "../middleware/Authenticate";

const router = express.Router();

// Define the routes
router.post(
  "/",
  verifyJwToken,
  validator.todoValidator,
  TodoController.createTodo
); //Add a to-do

router.get("/", verifyJwToken, TodoController.getAllTodo); // List all todos

router.get("/:id", verifyJwToken, TodoController.getOneTodo); // Return a todo

router.patch(
  "/:id",
  verifyJwToken,
  validator.todoValidator,
  TodoController.updateTodo
); // Change a to-do

router.delete("/:id", verifyJwToken, TodoController.deleteTodo); // Delete a to-do (do a soft delete)

export default router;
