import config from "../../config";
import { DataSource, DataSourceOptions } from "typeorm";
const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } = config;

const DB_CONFIG: DataSourceOptions = {
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  synchronize: true,
  ssl: true,
  // seeds: [__dirname + "./seeds/*.seed{.ts,.js}"],
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  entities: [__dirname + "/../entity/*{.ts,.js}"],
  migrations: [__dirname + "./migrations/*{.js,.ts}"],
};

export const DB = new DataSource(DB_CONFIG);
