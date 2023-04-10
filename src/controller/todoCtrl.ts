import { NextFunction, Request, Response } from "express";
import TodoService from "../service/todoService";

class TodoController {
  static async createTodo(req: any, res: Response, next: NextFunction) {
    try {
      const {
        body: { title },
      } = req;
      const createTodo = await TodoService.createTodo(title);
      return res.json({ message: "Todo created successfully!" });
    } catch (err) {
      next(err);
    }
  }

  static async updateTodo(req: any, res: Response, next: NextFunction) {
    try {
      const {
        params: { id },
        body: { title },
      } = req;
      const updateTodo = await TodoService.updateTodo(id, title);
      return res.json({ message: "Todo updated successfully!" });
    } catch (err) {
      next(err);
    }
  }

  static async getAllTodo(req: any, res: Response, next: NextFunction) {
    try {
      const getAllTodo = await TodoService.getAllTodo();
      return getAllTodo;
    } catch (err) {
      next(err);
    }
  }

  static async getOneTodo(req: any, res: Response, next: NextFunction) {
    try {
      const {
        params: { id },
      } = req;
      const getOneTodo = await TodoService.getOneTodo(id);
      return getOneTodo;
    } catch (err) {
      next(err);
    }
  }

  static async deleteTodo(req: any, res: Response, next: NextFunction) {
    try {
      const {
        params: { id },
      } = req;
      const deleteTodo = await TodoService.deleteTodo(id);
      return res.json({ message: "Todo deleted successfully!" });
    } catch (err) {
      next(err);
    }
  }

  static async completeTodo(req: any, res: Response, next: NextFunction) {
    try {
      const {
        params: { id },
        body: { completed },
      } = req;

      const completeTodo = await TodoService.completeTodo(id, completed);
      return res.json({ message: "Todo updated successfully!" });
    } catch (err) {
      next(err);
    }
  }
}
// Define the routes

export default TodoController;
