import IDatabaseConnector from "./IDatabaseConnector";

export interface ITodo {
  title: string;
  completed: boolean;
}

export interface IUser {
  username: string;
  password: string;
}

export { IDatabaseConnector };
