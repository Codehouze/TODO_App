"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
const config_1 = __importDefault(require("../../config"));
const typeorm_1 = require("typeorm");
const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME } = config_1.default;
const DB_CONFIG = {
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
exports.DB = new typeorm_1.DataSource(DB_CONFIG);
//# sourceMappingURL=index.js.map