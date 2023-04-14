import Todo from "../entity/Todo";
import { ITodo } from "../Interface/index";
import { getRepository } from "typeorm";

class TodoService {
  static async createTodo(data: ITodo): Promise<any> {
    const todoRepo = getRepository(Todo);
    const { title } = data;
    const todo = new Todo();
    todo.title = title;
    return await todoRepo.save(todo);
  }

  static async updateTodo(id: number, data: ITodo): Promise<any> {
    const { title } = data;
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
    const updateTodo = await Todo.update(id, { completed: true });
    if (updateTodo) {
      return updateTodo;
    }
  }
}
export default TodoService;
