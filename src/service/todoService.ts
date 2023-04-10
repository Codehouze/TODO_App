import Todo from "../database/entities/Todo";
import { ITodo } from "../Interface/index";
import { getRepository } from "typeorm";
import { DB } from "../database/config";

class TodoService {
  static async createTodo(data: ITodo): Promise<any> {
    const todoRepository = DB.getRepository(Todo);
    const { title } = data;
    const todo = new Todo();
    todo.title = title;
    return await todoRepository.save(todo);
  }

  static async updateTodo(id: number, data: ITodo): Promise<any> {
    const { title, completed } = data;
    const todo = await this.getOneTodo(id);
    todo.title = title;
    return await Todo.update(id, todo);
  }

  static async getAllTodo(): Promise<any> {
    const todo = await Todo.find();
    if (!todo) {
      throw new Error("Todo not found");
    }
    return todo;
  }

  static async getOneTodo(id: number): Promise<ITodo> {
    const todo = await Todo.findOne({ where: { id } });
    if (!todo) {
      throw new Error("Todo not found");
    }
    return todo;
  }

  static async deleteTodo(id: number): Promise<any> {
    const getOneTodo = await this.getOneTodo(id);
    if (getOneTodo) {
    }
  }
  static async completeTodo(id: number, completed: boolean): Promise<any> {
    const getOneTodo = await this.getOneTodo(id);
    if (getOneTodo) {
    }
  }
}
export default TodoService;
