require("dotenv").config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD } = process.env;
console.log(DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD);

module.export = {
  type: "postgres",
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_USERNAME,
  synchronize: true,
  entities: ["src/entities/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
  cli: {
    entitiesDir: "src/database/entities",
    migrationsDir: "src/database/migrations",
  },

  seeds: ["src/seeds/**/*{.ts,.js}"],
  factories: ["src/factories/**/*{.ts,.js}"],
};
