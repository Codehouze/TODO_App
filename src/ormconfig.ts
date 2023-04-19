require("dotenv").config();
import { ConnectionOptions, createConnection } from "typeorm";
import path from "path";
import User from "./database/entity/User";
import Todo from "./database/entity/Todo";

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD } = process.env;

const isCompiled = path.extname(__filename).includes("js");
const ormConnection: ConnectionOptions = {
  type: "postgres",
  host: DB_HOST,
  port: 5438,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_USERNAME,
  synchronize: true,
  entities: [User, Todo],
};

createConnection(ormConnection)
  .then((connection) => {
    console.log("TypeORM connected successfully");
  })
  .catch((error) => {
    console.log("TypeORM connection error:", error);
  });
export default ormConnection;
