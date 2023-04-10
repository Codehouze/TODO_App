"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { env } = process;
exports.default = {
    DB_HOST: env.DB_HOST || "127.0.0.1",
    DB_PORT: Number(env.DB_PORT) || 5432,
    DB_NAME: env.DB_NAME,
    DB_USERNAME: env.DB_USERNAME,
    DB_PASSWORD: env.DB_PASSWORD,
    APP_SECRET: env.APP_SECRET,
};
//# sourceMappingURL=index.js.map